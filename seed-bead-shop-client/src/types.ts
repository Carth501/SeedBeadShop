export interface Product {
	id: number;
	images: string[];
	price: number;
	label: string;
	description: string;
	inStock: boolean;
	category: string;
	color: string;
}

export interface CartItem {
	product: Product;
	quantity: number;
}
