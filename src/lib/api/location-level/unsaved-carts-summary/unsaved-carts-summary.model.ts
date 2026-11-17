import {SaleSessionKind} from '../sale_session/sale-session.model'
import {BaseModel} from '../../util/base-api/base.model'

export interface UnsavedCartsSummary extends BaseModel {
  createdBy: string,
  createdAt: string,
  lastUpdatedAt: string,
  lastAccessedBy: string,
  lastAccessedAt: string,
  contactLabel: string,
  receivableTotal: number,
  kind: SaleSessionKind
  notes?: string
}
