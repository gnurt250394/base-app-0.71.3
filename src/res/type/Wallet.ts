import {UserProfile} from './Auth';

export interface Wallet {
  id: string;
  userId: string;
  user: UserProfile;
  capital: number;
  saleProfit: number;
  referralCommision: number;
  missionBonus: number;
  affiliateBonus: number;
  totalBalance: number;
  withdrew: number;
  isDel: boolean;
}

export interface WithdrawalRequest {
  id: string;
  code: number;
  userId: string;
  user: UserProfile;
  wallet: Wallet;
  balanceBefore: number;
  amount: number;
  status: string;
  reason: string;
  bankAccountId: string;
  bankAccountName: string;
  bankName: string;
  createdAt: string;
}
