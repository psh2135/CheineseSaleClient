export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  export interface Ticket {
    id: number;
    giftId: number;
    giftName: string;
  }
  
 export interface Order {
  id: number;
  idStr?: string; 
  status: string;
  createdAt: string;
  totalPrice: number;
  tickets: Ticket[];
}