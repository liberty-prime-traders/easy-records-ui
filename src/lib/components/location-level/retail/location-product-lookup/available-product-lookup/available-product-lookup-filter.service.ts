import {inject, Injectable} from '@angular/core'
import {
  AvailableProductLookupQuickSearchService
} from '../../../../../api/location-level/retail/product-lookup/available-product-lookup-quick-search.service'
import {ProductWithAvailability} from '../../../../../api/location-level/retail/product-lookup/product-with-availability.model'
import {ProductLookupFilterService} from '../product-lookup-filter.service'

@Injectable()
export class AvailableProductLookupFilterService extends ProductLookupFilterService<ProductWithAvailability> {
  constructor() {
    super(inject(AvailableProductLookupQuickSearchService))
  }
}
