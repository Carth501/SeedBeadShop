from models import Product, SessionLocal

def populate_db():
    session = SessionLocal()
    products = [
        Product(
            images='earrings_1.png',
            price='$10.00',
            label='Product 1',
            description='Description of product 1',
            inStock=False,
        ),
        Product(
            images='earrings_2.png',
            price='$20.00',
            label='Product 2',
            description='Description of product 2',
            inStock=False,
        ),
        Product(
            images='earrings_3.png,earrings_3_1.jpg,earrings_3_2.jpg,earrings_3_3.jpg',
            price='$30.00',
            label='Product 3',
            description='Description of product 3',
            inStock=False,
        ),
        Product(
            images='earrings_3.png,earrings_3_1.jpg,earrings_3_2.jpg,earrings_3_3.jpg',
            price='$30.00',
            label='Product 4',
            description='What is the meaning?',
            inStock=False,
        ),
    ]
    session.add_all(products)
    session.commit()
    session.close()

if __name__ == '__main__':
    populate_db()