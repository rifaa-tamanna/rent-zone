export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "succeeded" | "failed";

export interface BookingItem {
  _id: string;
  equipmentId: string;
  equipmentName?: string;
  equipmentImage?: string;
  equipmentCategory?: string;
  customerId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  additionalNotes?: string;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  rentalType: string;
  rentalDuration?: string;
  totalDays: number;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus | string;
  bookingStatus: BookingStatus | string;
  transactionId?: string;
  createdAt: string;
  updatedAt?: string;
}

export type RentalItem = BookingItem;

