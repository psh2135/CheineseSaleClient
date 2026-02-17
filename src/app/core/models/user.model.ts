export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
    userName:string;
}
export interface Winner {
  giftId: number;
  giftTitle: string;
  price: number;
  winnerId: number;
  winnerName: string;
  email: string;
}
export interface Donor {
  id: number;
  userName: string;
  email: string;
}