import type { FoodItem } from './FoodItem';

export interface Order {
  orderId: string;
  item: FoodItem;
  quantity: number;
  notes: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'picked_up' | 'cancelled'; 
  orderDate: string;
  customerName: string; 
  pickupCode: string; 
}
