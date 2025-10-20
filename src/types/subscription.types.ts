/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PlanType {
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export interface Plan {
  _id: string
  name: string
  type: PlanType
  price: number
  currency: string
  billingPeriod: string
  features: string[]
  limits: {
    appointments: number
    storage: number
    filesPerRecord: number
  }
  detailedLimits?: any
  isActive: boolean
  stripePriceId?: string
}

export interface Subscription {
  _id: string
  userId: string
  planType: PlanType
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  autoRenew: boolean
  paymentMethod: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  nextPaymentDate?: string
  metadata?: any
}

export interface Usage {
  _id: string
  userId: string
  period: {
    month: number
    year: number
  }
  usage: {
    appointments: {
      count: number
      limit: number
    }
    storage: {
      usedMB: number
      limitMB: number
    }
    apiCalls: {
      count: number
      limit: number
    }
  }
}

export interface LimitCheck {
  allowed: boolean
  current: number
  limit: number
  remaining: number
}
