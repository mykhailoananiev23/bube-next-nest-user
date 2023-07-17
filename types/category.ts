export interface Category {
  id: number;
  name: string;
  isActive: boolean;
  subCategories: {
    id: number;
    name: string;
    isActive: boolean;
  }[];
}
