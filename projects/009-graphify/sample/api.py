"""教学接口函数：未启动服务器，不处理真实请求。"""
from auth import require_member
from orders import create_order
from pricing import calculate_total


def checkout(token, product_id, quantity):
    return create_order(token, product_id, quantity)


def preview_price(token, product_id, quantity):
    require_member(token)
    return calculate_total(product_id, quantity)
