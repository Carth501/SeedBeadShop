from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# Define a GET endpoint for products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = [
        {
            'images': ['earrings_1.png'],
            'price': '$10.00',
            'label': 'Product 1',
            'description': 'Description of product 1',
            'inStock': False,
        },
        {
            'images': ['earrings_2.png'],
            'price': '$20.00',
            'label': 'Product 2',
            'description': 'Description of product 2',
            'inStock': False,
        },
        {
            'images': ['earrings_3.png', 'earrings_3_1.jpg', 'earrings_3_2.jpg', 'earrings_3_3.jpg'],
            'price': '$30.00',
            'label': 'Product 3',
            'description': 'Description of product 3',
            'inStock': False,
        },
        {
            'images': ['earrings_3.png', 'earrings_3_1.jpg', 'earrings_3_2.jpg', 'earrings_3_3.jpg'],
            'price': '$30.00',
            'label': 'Product 4',
            'description': 'What is the meaning?',
            'inStock': False,
        },
    ]
    return jsonify(products)

# Endpoint to serve images
@app.route('/api/assets/<path:filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets'), filename)

if __name__ == '__main__':
    app.run(debug=True)