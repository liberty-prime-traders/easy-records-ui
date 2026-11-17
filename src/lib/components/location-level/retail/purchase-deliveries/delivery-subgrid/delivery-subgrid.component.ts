import {CurrencyPipe} from '@angular/common'
import {Component, input, signal} from '@angular/core'
import {ButtonDirective} from 'primeng/button'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs'
import {TableModule} from 'primeng/table'
import {Tag} from 'primeng/tag'
import {PurchaseDelivery, PurchaseDeliveryLine} from '../../../../../api/location-level/retail/delivery/purchase-delivery.model'
import {
  PurchaseDeliveryLineStatus
} from '../../../../../api/location-level/retail/product-purchases-report/purchase-delivery-line-status.enum'
import {
  UnitDescriptionPipe
} from '../../../../../api/organization-level/retail/unit-conversion/pipes/unit-description.pipe'
import {ProductLabelPipe} from '../../../../../utils/pipes/product-label.pipe'
import {KafkaEventLogComponent} from '../../../core/kafka-event-log/kafka-event-log.component'
import {DeliveryLineRevisionFormComponent} from '../delivery-revision/delivery-line-revision-form.component'

@Component({
  selector: 'esr-delivery-subgrid',
  templateUrl: 'delivery-subgrid.component.html',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TableModule,
    ButtonDirective,
    CurrencyPipe,
    Tag,
    ProductLabelPipe,
    KafkaEventLogComponent,
    UnitDescriptionPipe,
    DeliveryLineRevisionFormComponent
  ]
})
export class DeliverySubgridComponent {
  readonly delivery = input.required<PurchaseDelivery>()

  readonly PurchaseDeliveryLineStatus = PurchaseDeliveryLineStatus
  readonly revisingLine = signal<PurchaseDeliveryLine | undefined>(undefined)
}
