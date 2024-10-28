import { iRatings } from './iratings';
import { iReview } from './ireview';

export interface iUser {
  id: number;
  firstName: string;
  lastName: string;
  profileImg: string;
  email: string;
  password: string;
  num_of_apartments: number;
  ratings: iRatings;
  role: string;
  reviews: iReview[];
}
