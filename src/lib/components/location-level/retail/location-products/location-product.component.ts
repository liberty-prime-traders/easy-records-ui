import {Component} from '@angular/core'
import {provideLocationServices} from '../../../../api/cross-tier/retail/product/product-services-providers'
import {SchemaLevel} from '../../../../api/platform-level/table-registry/schema-level.enum'
import {ProductGeneralComponent} from '../../../cross-tier/retail/product/general-screen/product-general.component'

@Component({
  selector: 'esr-location-product',
  imports: [
    ProductGeneralComponent
  ],
  providers: provideLocationServices(),
  template: `<esr-product [schemaLevel]="SchemaLevel.LOCATION"/>`
})
export class LocationProductComponent {

  protected readonly SchemaLevel = SchemaLevel
}
