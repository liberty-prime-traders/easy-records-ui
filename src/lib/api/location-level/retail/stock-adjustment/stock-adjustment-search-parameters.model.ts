import {StockAdjustmentCategory} from './stock-adjustment-category.enum'

export interface StockAdjustmentSearchParameters {
  adjustedFrom: string
  adjustedBefore: string
  locationProductIds?: string[]
  categories?: StockAdjustmentCategory[]
  adjustedByIds?: string[]
}
