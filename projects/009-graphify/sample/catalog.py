"""库存示例：使用内存数据，方便观察依赖关系。"""

PRODUCTS = {"book": {"price": 80, "stock": 5}}


def get_product(product_id):
    return PRODUCTS[product_id]


def check_stock(product_id, quantity):
    product = get_product(product_id)
    return product["stock"] >= quantity


def reserve_stock(product_id, quantity):
    if not check_stock(product_id, quantity):
        raise ValueError("库存不足")
    product = get_product(product_id)
    product["stock"] -= quantity
