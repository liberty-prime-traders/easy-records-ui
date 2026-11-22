import {computed, effect, inject, Injectable, signal, untracked} from '@angular/core'
import {form} from '@angular/forms/signals'
import {LocationMembershipUserService} from '../../../../../api/location-level/core/membership/location-membership-user.service'
import {ProductForPurchase} from '../../../../../api/location-level/retail/product-lookup/product-for-purchase.model'
import {StockAdjustmentSearchResultService} from '../../../../../api/location-level/retail/stock-adjustment/stock-adjustment-search-result.service'
import {ProductLabelPipe} from '../../../../../utils/pipes/product-label.pipe'
import {ZonedDatesService} from '../../../../../utils/services/zoned-dates.service'
import {debouncedSignal} from '../../../../../utils/signals'
import {StockAdjustmentFilterFormDefinition} from './stock-adjustment-filter-form.definition'

const FILTER_DEBOUNCE_IN_MS = 1500

@Injectable({providedIn: 'root'})
export class StockAdjustmentFilterState {
  private readonly locationMembershipUserService = inject(LocationMembershipUserService)
  private readonly stockAdjustmentSearchResultService = inject(StockAdjustmentSearchResultService)
  private readonly zonedDatesService = inject(ZonedDatesService)

  readonly users = this.locationMembershipUserService.selectAll

  readonly filterFormValue = signal(StockAdjustmentFilterFormDefinition.createDefaultStockAdjustmentFilterFormModel())
  readonly filterForm = form(this.filterFormValue, StockAdjustmentFilterFormDefinition.stockAdjustmentFilterFormSchema)

  // Chips show product labels, so the labels are kept as products are picked, not looked up later.
  private readonly productLabelsById = signal(new Map<string, string>())

  readonly selectedProducts = computed(() =>
    this.filterFormValue().locationProductIds.map(id => ({id, label: this.productLabelsById().get(id) ?? id}))
  )

  private readonly debouncedFilterFormValue = debouncedSignal(this.filterFormValue, FILTER_DEBOUNCE_IN_MS)

  readonly filterParams = computed(() =>
    StockAdjustmentFilterFormDefinition.convertToFilterParams(this.debouncedFilterFormValue(), this.zonedDatesService)
  )

  private readonly refetchOnFilterChange = effect(() => {
    const filterParams = this.filterParams()
    untracked(() => {
      if (filterParams) {
        this.stockAdjustmentSearchResultService.refetch(filterParams)
      }
    })
  })

  addLocationProduct(product: ProductForPurchase) {
    const locationProductId = String(product.id)
    const locationProductIds = this.filterForm.locationProductIds().value
    if (locationProductIds().includes(locationProductId)) {
      return
    }
    this.productLabelsById.update(labels => new Map(labels).set(locationProductId, ProductLabelPipe.prototype.transform(product)))
    locationProductIds.set([...locationProductIds(), locationProductId])
  }

  removeLocationProduct(locationProductId: string) {
    const locationProductIds = this.filterForm.locationProductIds().value
    locationProductIds.set(locationProductIds().filter(id => id !== locationProductId))
  }

  resetFilters() {
    this.filterFormValue.set(StockAdjustmentFilterFormDefinition.createDefaultStockAdjustmentFilterFormModel())
  }

  refreshResults() {
    const filterParams = this.filterParams()
    if (filterParams) {
      this.stockAdjustmentSearchResultService.forceRefetch(filterParams)
    }
  }
}
