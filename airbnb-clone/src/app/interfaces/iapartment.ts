import { iLocation } from './ilocation';
import { iReview } from './ireview';

export interface iApartment {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  location: iLocation;
  rooms: number;
  services: string[];
  squaremeters: number;
  hostId: number;
  coverImage: string;
  otherImages: string[];
  reviews: iReview[];
  category: string[];
}
