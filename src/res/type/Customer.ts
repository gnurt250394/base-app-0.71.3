import {UserProfile} from './Auth';
import {Address} from './Home';

export interface UserCustomerPaginate {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: Address[];
  userId: string;
  user: UserProfile;
}
