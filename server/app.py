import stripe
import os
from sqlalchemy.orm import Session
from models import Panel, Product, SessionLocal
from flask_cors import CORS
from flask import Flask, jsonify, redirect, request, send_from_directory
from dotenv import load_dotenv

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
        	'id': product.productID,
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




stripe.api_key = os.getenv('STRIPE_KEY')

YOUR_DOMAIN = 'http://localhost:5000'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1R3iYtPLm1BrafkvrQOjpOQx',
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)

if __name__ == '__main__':
    app.run(port=5000)