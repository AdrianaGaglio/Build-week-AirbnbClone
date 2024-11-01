import { iRatings } from './iratings';
import { iReview } from './ireview';

export interface iUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImg: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
  num_of_apartments: number;
  ratings: iRatings;
  role: string;
  reviews: iReview[];
}
