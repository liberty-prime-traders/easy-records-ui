import {EntityId} from '@ngrx/signals/entities'
import {CalculationMethod} from '../../platform-level/tax-type/calculation-method.enum'
import {BaseModel} from '../../util/base-api/base.model'
import {ProductQuantities} from '../product-lookup/product-with-availability.model'
import {PaymentStatus} from '../purchase/payment-status.enum'
import {SaleStatus} from '../sale-summary/sale-status.enum'

export enum SaleSessionKind {
  SALE = 'SALE',
  PENDING_CONSOLIDATION = 'PENDING_CONSOLIDATION'
}

export interface ConsolidationIssue {
  saleReferences: string
  description: string
  fix: string
}

export interface RemovedSaleLine {
  identity: SessionIdentity
  locationProductId: string
  productLabel: string
  quantity: number
  unitId: string
  unitPrice: number
  lineTotal: number
  sourceSaleReference: string
}

export interface SaleSession extends BaseModel {
  saleId: EntityId | null
  createdBy: string
  lastUpdatedAt: string
  lastAccessedBy: string
  lastAccessedAt: string
  contactId: string
  contactLabel: string
  walkInCustomer: boolean | null
  soldBy: string
  dateSold: string
  notes: string
  saleStatus: SaleStatus
  paymentStatus: PaymentStatus
  saleVoidInfo: SaleVoidInfo | null
  saleLines: SaleLine[]
  saleAdjustments: SaleAdjustment[]
  salePayments: SalePayment[]
  totals: SaleSessionTotals
  uiOptions: SaleSessionUiOptions
  kind: SaleSessionKind
  consolidationIssues: ConsolidationIssue[]
  removedSaleLines: RemovedSaleLine[]
}

export interface SaleVoidInfo {
  voidedBy: string
  voidedOn: string
  voidedReason: string
}

export enum SaleDiscardAction {
  DISCARD_DRAFT = 'DISCARD_DRAFT',
  VOID_SALE = 'VOID_SALE',
  DISCARD_PENDING_CONSOLIDATION = 'DISCARD_PENDING_CONSOLIDATION'
}

export interface SaleSessionUiOptions {
  canAddLines: boolean
  canEditLines: boolean
  canChangeContact: boolean
  canSaveDraft: boolean
  canConfirm: boolean
  saveDraftBlockers: string[]
  confirmBlockers: string[]
  allowedDiscardAction: SaleDiscardAction | null
  canCopySale: boolean
  canAddPaymentsToSale: boolean
  showActiveUserWarning: boolean
  showUnreservedChangesWarning: boolean
  canGenerateConsolidatedSale: boolean
}

export interface SessionIdentity {
  id?: string
  transientId?: string
}

export interface SalePayment {
  identity: SessionIdentity
  paymentMethod: string
  amount: number
  reference: string
  paymentDate: string
  voidedReason: string
}

export interface SaleLine extends ProductQuantities {
  identity: SessionIdentity
  locationProductId: string
  productLabel: string
  productPrintLabel: string
  quantity: number
  baseQuantity: number
  unitId: string
  baseUnitId: string
  conversionFactor: number
  unitPrice: number
  lineTotal: number
  unitPriceOverride: number
  netUnitPrice: number
  productActive: boolean
}

export enum AdjustmentDirection {
  DISCOUNT = 'DISCOUNT',
  SURCHARGE = 'SURCHARGE',
  BOTH = 'BOTH'
}

export interface SaleAdjustment {
  identity: SessionIdentity
  relatedSaleLineIdentity?: SessionIdentity
  adjustmentReasonId: string
  adjustmentReason?: string
  direction: AdjustmentDirection
  calculationMethod: CalculationMethod
  value: number
  calculatedAmount: number
  note?: string
  approvedBy?: string
}

export interface SaleSessionTotals {
  subtotal: number
  displaySubtotal: number
  lineLevelDiscountTotal: number
  orderLevelDiscountTotal: number
  lineLevelSurchargeTotal: number
  orderLevelSurchargeTotal: number
  paymentTotal: number
  receivableTotal: number
  balance: number
}
