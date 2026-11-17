import {Provider} from '@angular/core'
import {ProductFilterService} from '../../../../components/cross-tier/retail/product/product-filter.service'
import {
  LocationProductFilterService
} from '../../../../components/location-level/retail/location-products/location-product-filter.service'
import {
  OrganizationProductFilterService
} from '../../../../components/organization-level/retail/products/organization-product-filter.service'
import {
  LocationProductPaginatedSearchService
} from '../../../location-level/retail/location-product/location-product-paginated-search.service'
import {OrganizationProductSearchService} from '../../../organization-level/retail/product/organization-product-search.service'
import {PaginatedBaseService} from '../../../util/paginated-api/paginated-base.service'

export const provideLocationServices = (): Provider[] => [
  {provide: PaginatedBaseService, useExisting: LocationProductPaginatedSearchService},
  {provide: ProductFilterService, useExisting: LocationProductFilterService}
]

export const provideOrganizationServices = (): Provider[] => [
  {provide: PaginatedBaseService, useExisting: OrganizationProductSearchService},
  {provide: ProductFilterService, useExisting: OrganizationProductFilterService}
]
