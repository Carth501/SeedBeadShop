from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from sqlalchemy.orm import Session
import os

from models import Panel, Product, SessionLocal

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
    products_list = []
    for product in products:
        product_dict = {
            'id': product.id,
            'images': product.images.split(','),
            'price': product.price,
            'label': product.label,
            'description': product.description,
            'inStock': product.inStock,
        }
        products_list.append(product_dict)
    return jsonify(products_list)

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

if __name__ == '__main__':
    app.run(debug=True)