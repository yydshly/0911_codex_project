"""Run pinned upstream Graphify; publish portable evidence for the static explorer."""
from pathlib import Path
import hashlib
import importlib.metadata
import json
import platform
import tempfile
import networkx as nx
from graphify.extract import extract
from graphify.build import build
from graphify.cluster import cluster
from graphify.export import to_json
from graphify.serve import _query_graph_text, _shortest_path_text
from graphify.affected import affected_nodes, resolve_seed, format_affected

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "sample"
OUT = ROOT / "app" / "dist"
SHA = "3f82bf7f837a07fb0f7668fbdbd5662801906942"


def main():
    assert importlib.metadata.version("graphifyy") == "0.9.57"
    OUT.mkdir(exist_ok=True, parents=True)
    paths = sorted(SOURCE.glob("*.py"))
    with tempfile.TemporaryDirectory(prefix="graphify-sample-") as cache:
        extracted = extract(paths, root=SOURCE, cache_root=Path(cache), parallel=False)
    assert not extracted.get("failed_sources"), extracted.get("failed_sources")
    graph = build([extracted], directed=True, root=SOURCE)
    communities = cluster(graph)
    to_json(graph, communities, str(OUT / "graph.json"), force=True, built_at_commit="local-sample")
    # The graph input is a local sample, not the upstream source tree.
    raw = json.loads((OUT / "graph.json").read_text(encoding="utf-8"))
    raw.pop("built_at_commit", None)
    for key in ("metadata", "graph"):
        if isinstance(raw.get(key), dict):
            raw[key].pop("built_at_commit", None)
    (OUT / "graph.json").write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
    nodes = [{"id": n, **dict(d)} for n, d in graph.nodes(data=True)]
    edges = [{"source": u, "target": v, **dict(d)} for u, v, d in graph.edges(data=True)]
    membership = {node: cid for cid, members in communities.items() for node in members}
    for node in nodes:
        node["community"] = membership.get(node["id"])
    files = {p.name: p.read_text(encoding="utf-8") for p in paths}
    evidence = {
        "query": _query_graph_text(graph, "create_order", depth=2, token_budget=2400),
        "path": _shortest_path_text(graph, {"source": "checkout", "target": "get_product"}),
        "affected": format_affected(graph, "get_product", depth=4),
    }
    payload = {"meta": {"version": "0.9.57", "commit": SHA, "python": platform.python_version(),
        "input": "本仓库原创五文件 Python 教学示例", "mode": "AST-only", "communityAlgorithm": "Louvain (NetworkX fallback)",
        "inputTokens": extracted.get("input_tokens", 0), "outputTokens": extracted.get("output_tokens", 0),
        "sourceHashes": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in paths}},
        "nodes": nodes, "edges": edges, "files": files, "evidence": evidence}
    (OUT / "data.js").write_text("window.GRAPHIFY_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    (OUT / "evidence.json").write_text(json.dumps(evidence, ensure_ascii=False, indent=2), encoding="utf-8")
    checks = {}
    for scope in ("all", "calls"):
        view = graph.copy()
        if scope == "calls":
            view.remove_edges_from([(u, v) for u, v, d in view.edges(data=True) if d.get("relation") != "calls"])
        checks[scope] = {"distances": {n: dict(nx.single_source_shortest_path_length(view, n)) for n in view},
                         "affected": {n: sorted(h.node_id for h in affected_nodes(view, n, depth=4)) for n in view}}
    (ROOT / "app" / "oracle.json").write_text(json.dumps(checks, indent=2), encoding="utf-8")
    (ROOT / "verification.json").write_text(json.dumps({**payload["meta"], "nodes": len(nodes), "edges": len(edges),
        "communities": len(communities), "confidence": {c: sum(e.get("confidence") == c for e in edges) for c in sorted({e.get("confidence", "unknown") for e in edges})}}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"nodes": len(nodes), "edges": len(edges), "labels": [n.get("label") for n in nodes], "evidence": evidence}, ensure_ascii=False))


if __name__ == "__main__":
    main()
