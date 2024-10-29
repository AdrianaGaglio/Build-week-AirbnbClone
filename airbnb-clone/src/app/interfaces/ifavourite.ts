import { iApartment } from './iapartment';

export interface iFavourite {
  id?: number;
  userId: string;
  apartments: iApartment[];
}
