"""Product Details microservice for the IBM microservices final project."""
from flask import Flask, jsonify

app = Flask(__name__)

PRODUCTS = {
    1: {"id": 1, "name": "Laptop", "price": 899.99, "currency": "USD", "in_stock": True},
    2: {"id": 2, "name": "Wireless Mouse", "price": 24.99, "currency": "USD", "in_stock": True},
}


@app.get("/health")
def health():
    """Return the service health status."""
    return jsonify({"status": "ok", "service": "product-details"})


@app.get("/products")
def list_products():
    """Return the available products."""
    return jsonify(list(PRODUCTS.values()))


@app.get("/products/<int:product_id>")
def get_product(product_id):
    """Return a product or a 404 error."""
    product = PRODUCTS.get(product_id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
