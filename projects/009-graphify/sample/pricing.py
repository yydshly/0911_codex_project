"""计价示例；没有接入真实支付。"""
from catalog import get_product


def member_discount(total):
    return round(total * 0.9, 2)


def calculate_total(product_id, quantity):
    product = get_product(product_id)
    return member_discount(product["price"] * quantity)
