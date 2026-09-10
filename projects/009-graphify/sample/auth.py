"""教学用权限模块；不是生产认证实现。"""


def resolve_user(token):
    return {"id": "reader", "role": "member"} if token == "demo" else None


def require_member(token):
    user = resolve_user(token)
    if user is None:
        raise PermissionError("请先登录")
    return user
