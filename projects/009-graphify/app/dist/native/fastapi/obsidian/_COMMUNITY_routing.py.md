---
type: community
cohesion: 0.12
members: 22
---

# routing.py

**Cohesion:** 0.12 - loosely connected
**Members:** 22 nodes

## Members
- [[TODO Replace or deprecate this no-scope hook so included-route]] - rationale - routing.py
- [[TODO deprecate this once the lifespan (or alternative) interface is improved]] - rationale - routing.py
- [[TODO probably move this out of the Route  Route Group, same in APIRoute]] - rationale - routing.py
- [[TODO remove this once the lifespan (or alternative) interface is improved]] - rationale - routing.py
- [[dot-__init__()_20]] - code - routing.py
- [[APIWebSocketRoute]] - code - routing.py
- [[ASGIApp_2]] - code
- [[Starlette]] - code
- [[Takes a coroutine `func(session)`, and returns an ASGI application.]] - rationale - routing.py
- [[Takes a function or coroutine `func(request) - response`, and returns an ASGI…]] - rationale - routing.py
- [[WebSocket_2]] - code
- [[_build_response_args()]] - code - routing.py
- [[_is_frontend_navigation_request()]] - code - routing.py
- [[_iter_accept_media_types()]] - code - routing.py
- [[_iter_included_route_candidates()]] - code - routing.py
- [[_iter_routes_with_context()]] - code - routing.py
- [[get_websocket_app()]] - code - routing.py
- [[iter_route_contexts()]] - code - routing.py
- [[request_response()]] - code - routing.py
- [[routing.py]] - code - routing.py
- [[run_endpoint_function()]] - code - routing.py
- [[websocket_session()]] - code - routing.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/routingpy
SORT file.name ASC
```

## Connections to other communities
- 23 edges to [[_COMMUNITY_Any]]
- 11 edges to [[_COMMUNITY_Scope]]
- 5 edges to [[_COMMUNITY__EffectiveRouteContext]]
- 4 edges to [[_COMMUNITY_dependenciesutils.py]]
- 4 edges to [[_COMMUNITY_exceptions.py]]
- 4 edges to [[_COMMUNITY__FrontendRouteGroup]]
- 4 edges to [[_COMMUNITY_dot-frontend]]
- 2 edges to [[_COMMUNITY___init__.py]]
- 2 edges to [[_COMMUNITY_get_openapi_path]]
- 2 edges to [[_COMMUNITY__DefaultLifespan]]
- 2 edges to [[_COMMUNITY_HTTPException]]
- 2 edges to [[_COMMUNITY_get_openapi]]
- 2 edges to [[_COMMUNITY__RouterIncludeContext]]
- 1 edge to [[_COMMUNITY__compat__init__.py]]
- 1 edge to [[_COMMUNITY_utils.py]]

## Top bridge nodes
- [[routing.py]] - degree 52, connects to 13 communities
- [[get_websocket_app()]] - degree 8, connects to 4 communities
- [[request_response()]] - degree 9, connects to 3 communities
- [[dot-__init__()_20]] - degree 6, connects to 2 communities
- [[_iter_routes_with_context()]] - degree 6, connects to 2 communities