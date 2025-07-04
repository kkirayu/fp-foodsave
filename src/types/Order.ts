import type { FoodItem } from './FoodItem';

export interface Order {
  orderId: string;
  item: FoodItem;
  quantity: number;
  notes: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'cancelled';
  orderDate: string;
}
