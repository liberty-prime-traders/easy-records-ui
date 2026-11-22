import {Injectable} from '@angular/core'
import {createPaginatedBaseStore, PaginatedBaseStore} from '../../../util/paginated-api/paginated-base.store'
import {StockAdjustmentSearchParameters} from './stock-adjustment-search-parameters.model'
import {StockAdjustmentSearchResult} from './stock-adjustment-search-result.model'

@Injectable({providedIn: 'root'})
export class StockAdjustmentSearchResultStore
  extends createPaginatedBaseStore<StockAdjustmentSearchResult, StockAdjustmentSearchParameters>()
  implements PaginatedBaseStore<StockAdjustmentSearchResult, StockAdjustmentSearchParameters> {

  readonly basePath = 'stock-adjustments'
}
