from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from sqlalchemy.orm import Session
import os

from models import Panel, Product, SessionLocal

app = Flask(__name__, static_folder='../seed-bead-shop-client/dist', static_url_path='/')
CORS(app)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    session = SessionLocal()
    products = session.query(Product).all()
    session.close()
    products_list = []
    for product in products:
        product_dict = {
            'id': product.id,
            'images': product.images.split(','),
            'price': product.price,
            'label': product.label,
            'description': product.description,
            'inStock': product.inStock,
            'category': product.category,
            'color': product.color,
        }
        products_list.append(product_dict)
    return jsonify(products_list)

@app.route('/api/product', methods=['GET'])
def get_product():
    product_id = request.args.get('id')
    if not product_id:
        return jsonify({'error': 'Product ID is required'}), 400

    session = SessionLocal()
    product = session.query(Product).filter(Product.id == product_id).first()
    session.close()

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product_dict = {
        'id': product.id,
        'images': product.images.split(','),
        'price': product.price,
        'label': product.label,
        'description': product.description,
        'inStock': product.inStock,
    }

    return jsonify(product_dict)

@app.route('/api/showcase', methods=['GET'])
def get_showcase():
    session = SessionLocal()
    showcase = session.query(Panel).all()
    session.close()
    showcase_list = [
        {
            'image': product.image,
            'label': product.label,
            'description': product.description,
        }
        for product in showcase
    ]
    return jsonify(showcase_list)

@app.route('/api/assets/<path:filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets'), filename)

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)