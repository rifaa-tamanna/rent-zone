export interface RentalPrice {
  daily?: number | null;
  weekly?: number | null;
  monthly?: number | null;
  [key: string]: number | null | undefined;
}

export interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rentalTypes: string[];
  rentalPrice: RentalPrice;
  availableQuantity: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  images?: string[];
  rentalTerms?: string[] | string;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  status: "pending" | "approved" | "rejected" | string;
  createdAt: string;
  updatedAt?: string;
}

export type Equipment = EquipmentItem;
export type EquipmentDetail = EquipmentItem;

export interface EquipmentPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
