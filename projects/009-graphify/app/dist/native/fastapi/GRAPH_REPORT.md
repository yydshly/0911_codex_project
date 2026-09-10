# Graph Report - fastapi  (2026-09-10)

## Corpus Check
- 48 files · ~67,676 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 747 nodes · 1971 edges · 46 communities
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 237 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50113da1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Any
- dependencies/utils.py
- _compat/__init__.py
- __init__.py
- exceptions.py
- openapi/models.py
- Example
- HTTPBase
- security/__init__.py
- routing.py
- APIKeyBase
- _FrontendRouteGroup
- Scope
- HTTPException
- get_openapi_path
- sse.py
- _DefaultLifespan
- responses.py
- get_openapi
- OpenIdConnect
- v2.py
- Any
- ModelField
- get_swagger_ui_html
- _EffectiveRouteContext
- .frontend
- Doc
- _RouterIncludeContext
- get_definitions
- EmailStr
- utils.py
- .__call__

## God Nodes (most connected - your core abstractions)
1. `ModelField` - 43 edges
2. `APIRouter` - 39 edges
3. `Response` - 38 edges
4. `Depends` - 38 edges
5. `APIRoute` - 35 edges
6. `FastAPI` - 33 edges
7. `Dependant` - 27 edges
8. `Example` - 25 edges
9. `lenient_issubclass()` - 24 edges
10. `BaseModelWithConfig` - 24 edges
11. `solve_dependencies()` - 23 edges
12. `HTTPException` - 22 edges
13. `_populate_api_route_state()` - 22 edges
14. `DefaultPlaceholder` - 20 edges
15. `get_request_handler()` - 18 edges
16. `get_openapi_path()` - 17 edges
17. `get_dependant()` - 15 edges
18. `analyze_param()` - 15 edges
19. `jsonable_encoder()` - 15 edges
20. `_FrontendRouteGroup` - 15 edges

## Surprising Connections (you probably didn't know these)
- `get_dependant()` --calls--> `get_path_param_names()`  [INFERRED]
  dependencies/utils.py → utils.py
- `FastAPI` --uses--> `HTTPException`  [INFERRED]
  applications.py → exceptions.py
- `FastAPI` --uses--> `RequestValidationError`  [INFERRED]
  applications.py → exceptions.py
- `FastAPI` --uses--> `WebSocketRequestValidationError`  [INFERRED]
  applications.py → exceptions.py
- `FastAPI` --uses--> `AsyncExitStackMiddleware`  [INFERRED]
  applications.py → middleware/asyncexitstack.py
- `_is_security_scheme()` --uses--> `SecurityBase`  [INFERRED]
  dependencies/models.py → security/base.py
- `_get_security_scheme()` --uses--> `SecurityBase`  [INFERRED]
  dependencies/models.py → security/base.py
- `_get_flat_fields_from_params()` --calls--> `lenient_issubclass()`  [INFERRED]
  dependencies/utils.py → _compat/shared.py
- `_get_flat_fields_from_params()` --calls--> `get_cached_model_fields()`  [INFERRED]
  dependencies/utils.py → _compat/v2.py
- `get_typed_annotation()` --calls--> `evaluate_forwardref()`  [INFERRED]
  dependencies/utils.py → _compat/v2.py
- `get_dependant()` --uses--> `DependencyScopeError`  [INFERRED]
  dependencies/utils.py → exceptions.py
- `add_non_field_param_to_dependency()` --uses--> `BackgroundTasks`  [INFERRED]
  dependencies/utils.py → background.py
- `add_non_field_param_to_dependency()` --calls--> `lenient_issubclass()`  [INFERRED]
  dependencies/utils.py → _compat/shared.py
- `add_non_field_param_to_dependency()` --uses--> `SecurityScopes`  [INFERRED]
  dependencies/utils.py → security/oauth2.py
- `analyze_param()` --uses--> `BackgroundTasks`  [INFERRED]
  dependencies/utils.py → background.py
- `analyze_param()` --uses--> `SecurityScopes`  [INFERRED]
  dependencies/utils.py → security/oauth2.py
- `SolvedDependency` --uses--> `BackgroundTasks`  [INFERRED]
  dependencies/utils.py → background.py
- `solve_dependencies()` --uses--> `BackgroundTasks`  [INFERRED]
  dependencies/utils.py → background.py
- `solve_dependencies()` --uses--> `SecurityScopes`  [INFERRED]
  dependencies/utils.py → security/oauth2.py
- `_get_multidict_value()` --calls--> `field_annotation_is_sequence()`  [INFERRED]
  dependencies/utils.py → _compat/shared.py

## Import Cycles
- None detected.

## Communities (46 total, 0 thin omitted)

### Community 0 - "Any"
Cohesion: 0.07
Nodes (53): AbstractAsyncContextManager, FastAPI, Any, ASGIApp, BaseRoute, DecoratedCallable, deprecated, Doc (+45 more)

### Community 1 - "dependencies/utils.py"
Cohesion: 0.07
Nodes (61): AsyncExitStack, get_missing_field_error(), contextmanager_in_threadpool(), AbstractContextManager, _T, _CallIdentity, Dependant, _get_cache_key() (+53 more)

### Community 2 - "_compat/__init__.py"
Cohesion: 0.07
Nodes (46): _annotation_is_complex(), annotation_is_pydantic_v1(), _annotation_is_sequence(), field_annotation_is_complex(), field_annotation_is_scalar(), field_annotation_is_scalar_sequence(), field_annotation_is_sequence(), is_bytes_or_nonable_bytes_annotation() (+38 more)

### Community 3 - "__init__.py"
Cohesion: 0.13
Nodes (29): args, BackgroundTasks, Any, Doc, A collection of background tasks that will be called after a response has been…, Add a function to be called in the background after the response is sent. Read…, Default(), DefaultType (+21 more)

### Community 4 - "exceptions.py"
Cohesion: 0.09
Nodes (25): http_exception_handler(), JSONResponse, Request, WebSocket, request_validation_exception_handler(), websocket_request_validation_exception_handler(), DependencyScopeError, EndpointContext (+17 more)

### Community 5 - "openapi/models.py"
Cohesion: 0.12
Nodes (32): BaseModelWithConfig, Components, Contact, Discriminator, Encoding, ExternalDocumentation, Header, Info (+24 more)

### Community 6 - "Example"
Cohesion: 0.18
Nodes (21): FastAPIDeprecationWarning, A custom deprecation warning as DeprecationWarning is ignored Ref:…, Example, TypedDict, Body, Cookie, File, Form (+13 more)

### Community 7 - "HTTPBase"
Cohesion: 0.12
Nodes (17): HTTPBase, HTTPBearer, HTTPAuthorizationCredentials, HTTPBase, HTTPBasic, HTTPBasicCredentials, HTTPBearer, HTTPDigest (+9 more)

### Community 8 - "security/__init__.py"
Cohesion: 0.17
Nodes (15): OAuthFlows, OAuth2, OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer, OAuth2PasswordRequestForm, OAuth2PasswordRequestFormStrict, Any, Request (+7 more)

### Community 9 - "routing.py"
Cohesion: 0.12
Nodes (20): APIWebSocketRoute, _build_response_args(), get_websocket_app(), _is_frontend_navigation_request(), _iter_accept_media_types(), _iter_included_route_candidates(), iter_route_contexts(), _iter_routes_with_context() (+12 more)

### Community 10 - "APIKeyBase"
Cohesion: 0.18
Nodes (11): APIKeyIn, APIKeyBase, APIKeyCookie, APIKeyHeader, APIKeyQuery, Doc, Request, API key authentication using a header. This defines the name of the header that… (+3 more)

### Community 11 - "_FrontendRouteGroup"
Cohesion: 0.17
Nodes (6): SolvedDependency, Match, _frontend_path_specificity(), _FrontendRoute, _FrontendRouteGroup, URLPath

### Community 12 - "Scope"
Cohesion: 0.28
Nodes (9): _frontend_scope_specificity(), _get_fastapi_scope(), _get_scope_effective_route_context(), _get_scope_included_router(), Receive, Scope, Send, _restore_fastapi_scope_key() (+1 more)

### Community 13 - "HTTPException"
Cohesion: 0.19
Nodes (8): main(), ensure_multipart_is_installed(), HTTPException, An HTTP exception you can raise in your own code to show errors to the client.…, _FrontendStaticFiles, StaticFiles, RuntimeError, stat_result

### Community 14 - "get_openapi_path"
Cohesion: 0.22
Nodes (18): _get_flat_fields_from_params(), jsonable_encoder(), Doc, IncEx, Convert any object to something that can be encoded in JSON. This is used…, generate_operation_summary(), _get_openapi_dependency_data(), get_openapi_operation_metadata() (+10 more)

### Community 15 - "sse.py"
Cohesion: 0.15
Nodes (14): model_validator, _check_event_single_line(), _check_id_valid(), _check_single_line(), EventSourceResponse, format_sse_event(), BaseModel, Doc (+6 more)

### Community 16 - "_DefaultLifespan"
Cohesion: 0.14
Nodes (8): BaseException, _AsyncLiftContextManager, _DefaultLifespan, AbstractContextManager, _T, Wraps a synchronous context manager to make it async. This is vendored from…, Default lifespan context manager that runs on_startup and on_shutdown handlers.…, TracebackType

### Community 17 - "responses.py"
Cohesion: 0.19
Nodes (10): _OrjsonModule, ORJSONResponse, Any, deprecated, JSONResponse, Protocol, JSON response using the ujson library to serialize data to JSON.…, JSON response using the orjson library to serialize data to JSON.… (+2 more)

### Community 18 - "get_openapi"
Cohesion: 0.19
Nodes (6): get_flat_params(), _get_api_route_for_openapi(), get_fields_from_routes(), get_openapi(), BaseRoute, RouteContext

### Community 19 - "OpenIdConnect"
Cohesion: 0.16
Nodes (9): APIKey, OAuth2, OpenIdConnect, SecurityBase, SecurityBase, OpenIdConnect, Doc, Request (+1 more)

### Community 20 - "v2.py"
Cohesion: 0.32
Nodes (11): get_flat_models_from_annotation(), get_flat_models_from_field(), get_flat_models_from_fields(), get_flat_models_from_model(), get_model_name_map(), normalize_name(), # TODO: remove after setting the min Pydantic to v2.12.3, # TODO: remove when this is merged (or equivalent):… (+3 more)

### Community 21 - "Any"
Cohesion: 0.21
Nodes (6): asdict(), evaluate_forwardref(), Any, FieldInfo, IncEx, _regenerate_error_with_loc()

### Community 22 - "ModelField"
Cohesion: 0.24
Nodes (8): create_body_model(), get_cached_model_fields(), get_model_fields(), ModelField, BaseModel, _get_body_field(), get_validation_alias(), Get a ModelField representing the request body for a path operation, combining…

### Community 23 - "get_swagger_ui_html"
Cohesion: 0.24
Nodes (11): HTMLResponse, get_redoc_html(), get_swagger_ui_html(), get_swagger_ui_oauth2_redirect_html(), _html_safe_json(), Any, Doc, Serialize a value to JSON with HTML special characters escaped. This prevents… (+3 more)

### Community 24 - "_EffectiveRouteContext"
Cohesion: 0.30
Nodes (3): _EffectiveRouteContext, _frontend_dependency_endpoint(), _IncludedRouter

### Community 25 - ".frontend"
Cohesion: 0.27
Nodes (7): PathLike, _get_resolved_absolute_path(), _join_frontend_paths(), _normalize_frontend_path(), PathLike, Serve a static frontend build as low-priority routes. Use this for frontend…, _resolve_frontend_check_dir()

### Community 26 - "Doc"
Cohesion: 0.36
Nodes (4): json_schema_extra, OAuthFlowsModel, pattern, Doc

### Community 27 - "_RouterIncludeContext"
Cohesion: 0.28
Nodes (6): Protocol, _RouterIncludeContext, _RouteWithPath, get_value_or_default(), DefaultType, Pass items or `DefaultPlaceholder`s by descending priority. The first one to…

### Community 28 - "get_definitions"
Cohesion: 0.36
Nodes (7): GenerateJsonSchema, get_definitions(), get_schema_from_model_field(), _has_computed_fields(), ModelNameMap, CoreSchema, JsonSchemaValue

### Community 29 - "EmailStr"
Cohesion: 0.36
Nodes (4): EmailStr, Any, GetJsonSchemaHandler, str

### Community 30 - "utils.py"
Cohesion: 0.25
Nodes (6): generate_operation_id(), deep_dict_update(), generate_operation_id_for_path(), get_path_param_names(), is_body_allowed_for_status_code(), Any

### Community 31 - ".__call__"
Cohesion: 0.50
Nodes (3): Receive, Scope, Send

## Knowledge Gaps
- **2 isolated node(s):** `Color`, `PyExtraColor`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 178 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `APIRoute` connect `Any` to `dependencies/utils.py`, `_FrontendRouteGroup`, `Scope`, `HTTPException`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `_EffectiveRouteContext` connect `_EffectiveRouteContext` to `Any`, `dependencies/utils.py`, `_RouterIncludeContext`, `_FrontendRouteGroup`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `_populate_api_route_state()` connect `Any` to `dependencies/utils.py`, `_compat/__init__.py`, `get_openapi_path`, `sse.py`, `ModelField`, `utils.py`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `APIRouter` (e.g. with `DefaultPlaceholder` and `FastAPIError`) actually correct?**
  _`APIRouter` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Color`, `PyExtraColor` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Any` be split into smaller, more focused modules?**
  _Cohesion score 0.0706959706959707 - nodes in this community are weakly interconnected._
- **Should `dependencies/utils.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06583850931677018 - nodes in this community are weakly interconnected._