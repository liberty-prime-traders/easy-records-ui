import {Injectable} from '@angular/core'
import {PaginatedBaseService} from '../../../util/paginated-api/paginated-base.service'
import {StockAdjustmentSearchParameters} from './stock-adjustment-search-parameters.model'
import {StockAdjustmentSearchResult} from './stock-adjustment-search-result.model'
import {StockAdjustmentSearchResultStore} from './stock-adjustment-search-result.store'

@Injectable({providedIn: 'root'})
export class StockAdjustmentSearchResultService
  extends PaginatedBaseService<StockAdjustmentSearchResult, StockAdjustmentSearchParameters> {
  protected override readonly defaultCursor = ''

  constructor(protected override readonly store: StockAdjustmentSearchResultStore) {
    super(store)
  }
}
