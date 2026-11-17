import {inject, Injectable} from '@angular/core'
import {
  OrganizationProductSearchService
} from '../../../../api/organization-level/retail/product/organization-product-search.service'
import {OrganizationProduct} from '../../../../api/organization-level/retail/product/organization-product.model'
import {ProductFilterService} from '../../../cross-tier/retail/product/product-filter.service'

@Injectable({providedIn: 'root'})
export class OrganizationProductFilterService extends ProductFilterService<OrganizationProduct> {
  constructor() {
    super(inject(OrganizationProductSearchService))
  }
}
