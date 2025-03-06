from models import Product, Panel, SessionLocal

def populate_db():
    session = SessionLocal()
    products = [
        Product(
            images='earrings_1.png',
            price=10.00,
            label='Product 1',
            description='Description of product 1',
            inStock=False,
            category='earring',
            color='orange',
        ),
        Product(
            images='earrings_2.png',
            price=20.00,
            label='Product 2',
            description='Description of product 2',
            inStock=False,
            category='earring',
            color='blue',
        ),
        Product(
            images='earrings_3.png,earrings_3_1.jpg,earrings_3_2.jpg,earrings_3_3.jpg',
            price=30.00,
            label='Product 3',
            description='Description of product 3',
            inStock=False,
            category='earring',
            color='red',
        ),
        Product(
            images='earrings_3.png,earrings_3_1.jpg,earrings_3_2.jpg,earrings_3_3.jpg',
            price=30.00,
            label='Product 4',
            description='What is the meaning?',
            inStock=False,
            category='earring',
            color='red',
        ),
    ]
    session.add_all(products)
    showcase = [
        Panel(
			image='earrings_1.png',
			label='Product 1',
			description='Description of product 1',
            productID='0',
		),
        Panel(
			image='earrings_2.png',
			label='Product 2',
			description='Description of product 2',
            productID='1',
		),
	]
    session.add_all(showcase)
    session.commit()
    session.close()

if __name__ == '__main__':
    populate_db()