export interface Product {
	id: number;
	images: string[];
	price: string;
	label: string;
	description: string;
	inStock: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}
