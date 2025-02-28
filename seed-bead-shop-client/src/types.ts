export interface Product {
	id: number;
	images: string[];
	price: number;
	label: string;
	description: string;
	inStock: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}
