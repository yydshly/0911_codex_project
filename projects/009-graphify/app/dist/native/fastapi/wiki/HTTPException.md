# HTTPException

> 19 nodes · cohesion 0.19

## Key Concepts

- **HTTPException** (22 connections) — `exceptions.py`
- **_FrontendStaticFiles** (14 connections) — `routing.py`
- **.get_response()** (9 connections) — `routing.py`
- **._fallback_response()** (6 connections) — `routing.py`
- **.__init__()** (6 connections) — `routing.py`
- **RuntimeError** (6 connections)
- **.get_response_for_scope()** (5 connections) — `routing.py`
- **._check_fallback_file()** (4 connections) — `routing.py`
- **.get_path()** (4 connections) — `routing.py`
- **._get_resolved_directory()** (4 connections) — `routing.py`
- **._lookup_path()** (4 connections) — `routing.py`
- **._lookup_static_resource()** (4 connections) — `routing.py`
- **ensure_multipart_is_installed()** (3 connections) — `dependencies/utils.py`
- **main()** (2 connections) — `cli.py`
- **._fallback_file_exists()** (2 connections) — `routing.py`
- **stat_result** (2 connections)
- **cli.py** (1 connections) — `cli.py`
- **An HTTP exception you can raise in your own code to show errors to the client.…** (1 connections) — `exceptions.py`
- **StaticFiles** (1 connections)

## Relationships

- [Scope](Scope.md) (5 shared connections)
- [Any](Any.md) (4 shared connections)
- [.frontend](frontend.md) (3 shared connections)
- [exceptions.py](exceptions.py.md) (1 shared connections)
- [routing.py](routing.py.md) (1 shared connections)

## Source Files

- `cli.py`
- `dependencies/utils.py`
- `exceptions.py`
- `routing.py`

## Audit Trail

- EXTRACTED: 38 (83%)
- INFERRED: 8 (17%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*