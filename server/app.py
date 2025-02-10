from flask import Flask, jsonify, request
from flask_cors import CORS

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
            'images': ['earrings_1'],
            'price': '$10.00',
            'label': 'Product 1',
            'description': 'Description of product 1',
            'inStock': False,
        },
        {
            'images': ['earrings_2'],
            'price': '$20.00',
            'label': 'Product 2',
            'description': 'Description of product 2',
            'inStock': False,
        },
        {
            'images': ['earrings_3', 'earrings_3_1', 'earrings_3_2', 'earrings_3_3'],
            'price': '$30.00',
            'label': 'Product 3',
            'description': 'Description of product 3',
            'inStock': False,
        },
        {
            'images': ['earrings_3', 'earrings_3_1', 'earrings_3_2', 'earrings_3_3'],
            'price': '$30.00',
            'label': 'Product 4',
            'description': 'What is the meaning?',
            'inStock': False,
        },
    ]
    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)