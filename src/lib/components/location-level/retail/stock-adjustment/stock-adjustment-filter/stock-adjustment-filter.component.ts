import {Component, inject, OnInit} from '@angular/core'
import {FormField} from '@angular/forms/signals'
import {ButtonDirective} from 'primeng/button'
import {Checkbox} from 'primeng/checkbox'
import {Chip} from 'primeng/chip'
import {DatePicker} from 'primeng/datepicker'
import {Fieldset} from 'primeng/fieldset'
import {Select} from 'primeng/select'
import {LocationMembershipUserService} from '../../../../../api/location-level/core/membership/location-membership-user.service'
import {StockAdjustmentCategory} from '../../../../../api/location-level/retail/stock-adjustment/stock-adjustment-category.enum'
import {EnumToDropdownPipe} from '../../../../../utils/pipes/enum-to-dropdown.pipe'
import {FormFieldLayout} from '../../../../reusable/form-field/form-field-layout'
import {FormFieldComponent} from '../../../../reusable/form-field/form-field.component'
import {PurchaseProductLookupComponent} from '../../location-product-lookup/purchase-product-lookup/purchase-product-lookup.component'
import {StockAdjustmentFilterState} from './stock-adjustment-filter.state'

@Component({
  selector: 'esr-stock-adjustment-filter',
  templateUrl: 'stock-adjustment-filter.component.html',
  imports: [
    ButtonDirective,
    Checkbox,
    Chip,
    DatePicker,
    Fieldset,
    FormField,
    Select,
    EnumToDropdownPipe,
    PurchaseProductLookupComponent,
    FormFieldComponent
  ]
})
export class StockAdjustmentFilterComponent implements OnInit {
  private readonly locationMembershipUserService = inject(LocationMembershipUserService)

  readonly state = inject(StockAdjustmentFilterState)

  readonly FormFieldLayout = FormFieldLayout
  readonly StockAdjustmentCategory = StockAdjustmentCategory

  ngOnInit() {
    this.locationMembershipUserService.fetch()
  }
}
