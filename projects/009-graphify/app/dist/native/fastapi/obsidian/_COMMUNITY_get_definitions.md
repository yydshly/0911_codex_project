---
type: community
cohesion: 0.36
members: 8
---

# get_definitions

**Cohesion:** 0.36 - loosely connected
**Members:** 8 nodes

## Members
- [[dot-bytes_schema()]] - code - _compat/v2.py
- [[CoreSchema]] - code
- [[GenerateJsonSchema]] - code - _compat/v2.py
- [[JsonSchemaValue]] - code
- [[ModelNameMap]] - code
- [[_has_computed_fields()]] - code - _compat/v2.py
- [[get_definitions()]] - code - _compat/v2.py
- [[get_schema_from_model_field()]] - code - _compat/v2.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get_definitions
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_v2.py]]
- 3 edges to [[_COMMUNITY_ModelField]]
- 3 edges to [[_COMMUNITY_Any_1]]
- 3 edges to [[_COMMUNITY_get_openapi_path]]
- 2 edges to [[_COMMUNITY__compat__init__.py]]
- 1 edge to [[_COMMUNITY_get_openapi]]

## Top bridge nodes
- [[get_definitions()]] - degree 11, connects to 3 communities
- [[get_schema_from_model_field()]] - degree 10, connects to 2 communities
- [[_has_computed_fields()]] - degree 4, connects to 1 community