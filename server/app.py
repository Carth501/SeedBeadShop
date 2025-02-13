from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from sqlalchemy.orm import Session
import os

from models import Product, SessionLocal

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/products', methods=['GET'])
def get_products():
    session = SessionLocal()
    products = session.query(Product).all()
    session.close()
    products_list = [
        {
            'images': product.images.split(','),
            'price': product.price,
            'label': product.label,
            'description': product.description,
            'inStock': product.inStock,
        }
        for product in products
    ]
    return jsonify(products_list)

@app.route('/api/assets/<path:filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets'), filename)

if __name__ == '__main__':
    app.run(debug=True)