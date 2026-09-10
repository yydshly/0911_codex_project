---
type: community
cohesion: 0.32
members: 12
---

# v2.py

**Cohesion:** 0.32 - loosely connected
**Members:** 12 nodes

## Members
- [[TODO remove after setting the min Pydantic to v2.12.3]] - rationale - _compat/v2.py
- [[TODO remove when dropping support for Pydantic  v2.12.3]] - rationale - _compat/v2.py
- [[TODO remove when this is merged (or equivalent)…]] - rationale - _compat/v2.py
- [[TypeModelOrEnum]] - code
- [[TypeModelSet]] - code
- [[get_flat_models_from_annotation()]] - code - _compat/v2.py
- [[get_flat_models_from_field()]] - code - _compat/v2.py
- [[get_flat_models_from_fields()]] - code - _compat/v2.py
- [[get_flat_models_from_model()]] - code - _compat/v2.py
- [[get_model_name_map()]] - code - _compat/v2.py
- [[normalize_name()]] - code - _compat/v2.py
- [[v2.py]] - code - _compat/v2.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/v2py
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY__compat__init__.py]]
- 7 edges to [[_COMMUNITY_ModelField]]
- 5 edges to [[_COMMUNITY_get_definitions]]
- 4 edges to [[_COMMUNITY_Any_1]]
- 2 edges to [[_COMMUNITY_get_openapi]]
- 1 edge to [[_COMMUNITY_dependenciesutils.py]]
- 1 edge to [[_COMMUNITY_utils.py]]

## Top bridge nodes
- [[v2.py]] - degree 26, connects to 5 communities
- [[get_flat_models_from_field()]] - degree 7, connects to 2 communities
- [[get_flat_models_from_annotation()]] - degree 6, connects to 2 communities
- [[get_flat_models_from_fields()]] - degree 8, connects to 1 community
- [[get_flat_models_from_model()]] - degree 6, connects to 1 community