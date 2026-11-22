import {CurrencyPipe, DatePipe} from '@angular/common'
import {Component, effect, inject, viewChild} from '@angular/core'
import {Skeleton} from 'primeng/skeleton'
import {Table, TableModule} from 'primeng/table'
import {TableLazyLoadEvent} from 'primeng/types/table'
import {StockAdjustmentSearchResultService} from '../../../../../api/location-level/retail/stock-adjustment/stock-adjustment-search-result.service'
import {loadNextOnLazyLoad} from '../../../../../api/util/paginated-api/paginated-lazy-load.util'
import {NullSafePipe} from '../../../../../utils/pipes/null-safe.pipe'
import {PrettifyEnumPipe} from '../../../../../utils/pipes/prettify-enum.pipe'
import {resetVirtualScrollOnSearch} from '../../../../../utils/primeng-table.util'
import {AutoStretchDirective} from '../../../../reusable/auto-stretch.directive'
import {EmptyRowComponent} from '../../../../reusable/empty-row/empty-row.component'

@Component({
  selector: 'esr-location-stock-adjustment-grid',
  templateUrl: 'stock-adjustment-grid.component.html',
  imports: [
    AutoStretchDirective,
    TableModule,
    Skeleton,
    EmptyRowComponent,
    CurrencyPipe,
    DatePipe,
    NullSafePipe,
    PrettifyEnumPipe
  ]
})
export class StockAdjustmentGridComponent {
  private readonly stockAdjustmentSearchResultService = inject(StockAdjustmentSearchResultService)

  private readonly table = viewChild(Table)

  readonly stockAdjustments = this.stockAdjustmentSearchResultService.selectAll
  readonly loading = this.stockAdjustmentSearchResultService.selectLoading

  readonly $resetScrollOnSearch = effect(() => {
    this.stockAdjustmentSearchResultService.freshLoadCompleted()
    const table = this.table()
    if (table) {
      resetVirtualScrollOnSearch(table)
    }
  })

  onLazyLoad(lazyLoadEvent: TableLazyLoadEvent): void {
    loadNextOnLazyLoad(this.stockAdjustmentSearchResultService, lazyLoadEvent.last)
  }
}
