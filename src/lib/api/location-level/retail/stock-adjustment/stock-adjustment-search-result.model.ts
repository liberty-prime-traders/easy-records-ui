import {PaginatedModel} from '../../../util/paginated-api/paginated.model'
import {StockAdjustment} from './stock-adjustment.model'

export interface StockAdjustmentSearchResult extends StockAdjustment, PaginatedModel {
}
