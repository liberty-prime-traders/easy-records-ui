import {Component, computed, inject} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {TableModule} from 'primeng/table'
import {
  UnitConversionGraphService
} from '../../../../api/organization-level/unit-conversion/unit-conversion-graph.service'
import {LoadingContainerComponent} from '../../../reusable/loading-container/loading-container.component'
import {SaleFormContext} from '../form-utils/sale-form-context'
import {EditableSaleLinesComponent} from './editable-sale-lines/editable-sale-lines.component'
import {ReadOnlySaleLinesComponent} from './read-only-sale-lines/read-only-sale-lines.component'

@Component({
  selector: 'rts-sale-lines',
  templateUrl: 'sale-lines.component.html',
  styleUrl: 'sale-lines.component.scss',
  imports: [
    TableModule,
    FormsModule,
    EditableSaleLinesComponent,
    ReadOnlySaleLinesComponent,
    LoadingContainerComponent
  ]
})
export class SaleLinesComponent {
  private readonly context = inject(SaleFormContext)
  private readonly unitConversionGraphService = inject(UnitConversionGraphService)

  readonly saleSession = this.context.saleSession
  readonly unitConversionGraphIsLoading = this.unitConversionGraphService.isLoading

  readonly canEditLines = computed(() => this.saleSession().uiOptions.canEditLines)

  readonly saleLines = computed(() =>
    this.unitConversionGraphIsLoading() ? [] : this.context.saleLines()
  )

}
