import { iRatings } from './iratings';
import { iLocation } from './ilocation';
import { iReview } from './ireview';

export interface iApartment {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  location: string;
  rooms: number;
  services: string[];
  squaremeters: number;
  hostId: string;
  coverImage: string[];
  // otherImages: string[];
  reviews: iReview[];
  ratings: iRatings;
  category: string[];
}
