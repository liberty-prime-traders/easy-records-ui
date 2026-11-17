import {Component} from '@angular/core'
import {provideOrganizationServices} from '../../../../api/cross-tier/retail/product/product-services-providers'
import {SchemaLevel} from '../../../../api/platform-level/table-registry/schema-level.enum'
import {ProductGeneralComponent} from '../../../cross-tier/retail/product/general-screen/product-general.component'

@Component({
  selector: 'rts-organization-product',
  imports: [
    ProductGeneralComponent
  ],
  providers: provideOrganizationServices(),
  template: `<rts-product [schemaLevel]="SchemaLevel.ORGANIZATION"></rts-product>`
})
export class OrganizationProductComponent {

  protected readonly SchemaLevel = SchemaLevel
}
