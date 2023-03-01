import {RoleType} from 'common/Constants';
import {Address} from './Home';

export interface UserRegisterProps {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
}
export interface Role {
  id: string;
  name: RoleType;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}
export interface UserCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: Address[];
  userId: string;
  user: UserProfile;
}
export interface Permission {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
}

export interface Bank {
  isDefault: boolean;
  bankAccountId: string;
  bankAccountName: string;
  bankName: string;
}
export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  address: Address[];
  deliveryLocation: string;
  roleId: string;
  role: Role;
  permissionId: string[];
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  isDel: boolean;
  isWholeSale: boolean;
  isRequestingWholeSale: boolean;
  bank: Bank[];
  referrerPhone: string;
  referrer: UserProfile;
  customerIds: string[];
  customers: UserCustomer[];
}
