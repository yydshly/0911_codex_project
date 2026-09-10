---
type: community
cohesion: 0.07
members: 70
---

# dependencies/utils.py

**Cohesion:** 0.07 - loosely connected
**Members:** 70 nodes

## Members
- [[TODO remove this parameter later, no longer used, not removing it yet as some]] - rationale - dependencies/utils.py
- [[dot-__call__()_1]] - code - middleware/asyncexitstack.py
- [[dot-__eq__()_1]] - code - dependencies/models.py
- [[dot-__hash__()_1]] - code - dependencies/models.py
- [[dot-__init__()_2]] - code - dependencies/models.py
- [[dot-__init__()_9]] - code - middleware/asyncexitstack.py
- [[ASGIApp_1]] - code
- [[AbstractContextManager]] - code
- [[Any_5]] - code
- [[Any_6]] - code
- [[AsyncExitStack]] - code
- [[AsyncExitStackMiddleware]] - code - middleware/asyncexitstack.py
- [[Check if field type is a Union where all members are BaseModel subclasses.]] - rationale - dependencies/utils.py
- [[Dependant]] - code - dependencies/models.py
- [[DependencyCacheKey]] - code
- [[DependencyCacheKey_1]] - code
- [[FormData]] - code
- [[Headers]] - code
- [[ParamDetails]] - code - dependencies/utils.py
- [[QueryParams]] - code
- [[Receive_1]] - code
- [[Request_1]] - code
- [[Scope_1]] - code
- [[Send_1]] - code
- [[Signature]] - code
- [[WebSocket]] - code
- [[_CallIdentity]] - code - dependencies/models.py
- [[_T_1]] - code
- [[_UsesScopesCache]] - code
- [[_UsesScopesCache_1]] - code
- [[_build_dependant_with_parameterless_dependencies()]] - code - routing.py
- [[_get_cache_key()]] - code - dependencies/models.py
- [[_get_computed_scope()]] - code - dependencies/models.py
- [[_get_flat_body_params()]] - code - dependencies/utils.py
- [[_get_multidict_value()]] - code - dependencies/utils.py
- [[_get_oauth_scopes()]] - code - dependencies/models.py
- [[_get_security_scheme()]] - code - dependencies/models.py
- [[_get_signature()]] - code - dependencies/utils.py
- [[_impartial()]] - code - dependencies/models.py
- [[_is_async_gen_callable()]] - code - dependencies/models.py
- [[_is_async_gen_callable_cached()]] - code - dependencies/models.py
- [[_is_coroutine_callable()]] - code - dependencies/models.py
- [[_is_coroutine_callable_cached()]] - code - dependencies/models.py
- [[_is_gen_callable()]] - code - dependencies/models.py
- [[_is_gen_callable_cached()]] - code - dependencies/models.py
- [[_is_json_field()]] - code - dependencies/utils.py
- [[_is_security_scheme()]] - code - dependencies/models.py
- [[_should_embed_body_fields()]] - code - dependencies/utils.py
- [[_solve_generator()]] - code - dependencies/utils.py
- [[_unwrapped_call()]] - code - dependencies/models.py
- [[_uses_scopes()]] - code - dependencies/models.py
- [[_validate_value_with_model_field()]] - code - dependencies/utils.py
- [[add_non_field_param_to_dependency()]] - code - dependencies/utils.py
- [[add_param_to_fields()]] - code - dependencies/utils.py
- [[asyncexitstack.py]] - code - middleware/asyncexitstack.py
- [[concurrency.py]] - code - concurrency.py
- [[contextmanager_in_threadpool()]] - code - concurrency.py
- [[dependenciesmodels.py]] - code - dependencies/models.py
- [[dependenciesutils.py]] - code - dependencies/utils.py
- [[get_dependant()]] - code - dependencies/utils.py
- [[get_missing_field_error()]] - code - _compat/v2.py
- [[get_parameterless_sub_dependant()]] - code - dependencies/utils.py
- [[get_stream_item_type()]] - code - dependencies/utils.py
- [[get_typed_annotation()]] - code - dependencies/utils.py
- [[get_typed_return_annotation()]] - code - dependencies/utils.py
- [[get_typed_signature()]] - code - dependencies/utils.py
- [[is_union_of_base_models()]] - code - dependencies/utils.py
- [[request_body_to_args()]] - code - dependencies/utils.py
- [[request_params_to_args()]] - code - dependencies/utils.py
- [[solve_dependencies()]] - code - dependencies/utils.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/dependencies/utilspy
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY__compat__init__.py]]
- 16 edges to [[_COMMUNITY_ModelField]]
- 13 edges to [[_COMMUNITY_Any]]
- 9 edges to [[_COMMUNITY_get_openapi_path]]
- 4 edges to [[_COMMUNITY_routing.py]]
- 3 edges to [[_COMMUNITY_get_openapi]]
- 3 edges to [[_COMMUNITY__FrontendRouteGroup]]
- 3 edges to [[_COMMUNITY__EffectiveRouteContext]]
- 3 edges to [[_COMMUNITY_Scope]]
- 2 edges to [[_COMMUNITY_Any_1]]
- 2 edges to [[_COMMUNITY_OpenIdConnect]]
- 2 edges to [[_COMMUNITY___init__.py]]
- 2 edges to [[_COMMUNITY_security__init__.py]]
- 1 edge to [[_COMMUNITY_v2.py]]
- 1 edge to [[_COMMUNITY_HTTPException]]
- 1 edge to [[_COMMUNITY_exceptions.py]]
- 1 edge to [[_COMMUNITY_utils.py]]

## Top bridge nodes
- [[dependenciesutils.py]] - degree 29, connects to 6 communities
- [[solve_dependencies()]] - degree 23, connects to 4 communities
- [[get_dependant()]] - degree 15, connects to 3 communities
- [[add_non_field_param_to_dependency()]] - degree 7, connects to 3 communities
- [[_build_dependant_with_parameterless_dependencies()]] - degree 13, connects to 2 communities