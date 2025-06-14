import type { UserType } from "@/lib/db/schema";

export interface Entitlements {
  maxMessagesPerDay: number;
  canAccessPremiumModels: boolean;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  FREE: {
    maxMessagesPerDay: 10,
    canAccessPremiumModels: false,
  },
  PRO: {
    maxMessagesPerDay: 100,
    canAccessPremiumModels: true,
  },
  PREMIUM: {
    maxMessagesPerDay: 1000,
    canAccessPremiumModels: true,
  },
};
