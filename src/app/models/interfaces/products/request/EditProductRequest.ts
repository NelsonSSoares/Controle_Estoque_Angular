export interface EditProductRequest {
  product_id: string;
  name: string;
  description: string;
  price: string;
  category_id: string;
  amount: number;
}
