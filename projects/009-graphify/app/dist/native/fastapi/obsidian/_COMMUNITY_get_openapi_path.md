---
type: community
cohesion: 0.22
members: 19
---

# get_openapi_path

**Cohesion:** 0.22 - loosely connected
**Members:** 19 nodes

## Members
- [[TODO probably make status_code a default class attribute for all]] - rationale - openapi/utils.py
- [[Any_11]] - code
- [[Convert any object to something that can be encoded in JSON. This is used…]] - rationale - encoders.py
- [[Doc_3]] - code
- [[IncEx_2]] - code
- [[ModelNameMap_1]] - code
- [[_APIRouteLike]] - code - routing.py
- [[_OpenAPIDependencyData]] - code - openapi/utils.py
- [[_get_flat_fields_from_params()]] - code - dependencies/utils.py
- [[_get_openapi_dependency_data()]] - code - openapi/utils.py
- [[_get_openapi_operation_parameters()]] - code - openapi/utils.py
- [[_get_openapi_security_definitions()]] - code - openapi/utils.py
- [[generate_operation_summary()]] - code - openapi/utils.py
- [[get_openapi_operation_metadata()]] - code - openapi/utils.py
- [[get_openapi_operation_request_body()]] - code - openapi/utils.py
- [[get_openapi_path()]] - code - openapi/utils.py
- [[jsonable_encoder()]] - code - encoders.py
- [[openapiutils.py]] - code - openapi/utils.py
- [[serialize_response()]] - code - routing.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/get_openapi_path
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_dependenciesutils.py]]
- 8 edges to [[_COMMUNITY_get_openapi]]
- 7 edges to [[_COMMUNITY_ModelField]]
- 6 edges to [[_COMMUNITY__compat__init__.py]]
- 5 edges to [[_COMMUNITY_exceptions.py]]
- 5 edges to [[_COMMUNITY_Any]]
- 4 edges to [[_COMMUNITY_utils.py]]
- 3 edges to [[_COMMUNITY_get_definitions]]
- 2 edges to [[_COMMUNITY_Example]]
- 2 edges to [[_COMMUNITY_routing.py]]
- 1 edge to [[_COMMUNITY_get_swagger_ui_html]]
- 1 edge to [[_COMMUNITY__RouterIncludeContext]]

## Top bridge nodes
- [[get_openapi_path()]] - degree 17, connects to 5 communities
- [[_get_openapi_operation_parameters()]] - degree 12, connects to 4 communities
- [[_APIRouteLike]] - degree 10, connects to 3 communities
- [[get_openapi_operation_request_body()]] - degree 8, connects to 3 communities
- [[serialize_response()]] - degree 7, connects to 3 communities