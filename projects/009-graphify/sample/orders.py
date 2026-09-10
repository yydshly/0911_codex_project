"""订单处理：串联权限、库存与计价。"""
from auth import require_member
from catalog import reserve_stock
from pricing import calculate_total

ORDERS = []


def save_order(user, total):
    order = {"user": user["id"], "total": total}
    ORDERS.append(order)
    return order


def create_order(token, product_id, quantity):
    user = require_member(token)
    total = calculate_total(product_id, quantity)
    reserve_stock(product_id, quantity)
    return save_order(user, total)
