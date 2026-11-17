import {Pipe, PipeTransform} from '@angular/core'
import {PurchaseStatus} from '../../../../api/location-level/retail/purchase/purchase-status.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({name: 'purchaseStatusSeverity', standalone: true})
export class PurchaseStatusSeverityPipe implements PipeTransform {
  transform(purchaseStatus?: PurchaseStatus): LibertySeverity {
    switch (purchaseStatus) {
    case PurchaseStatus.DRAFT:
      return LibertySeverity.WARN
    case PurchaseStatus.ORDERED:
      return LibertySeverity.SECONDARY
    case PurchaseStatus.PARTIALLY_DELIVERED:
      return LibertySeverity.INFO
    case PurchaseStatus.FULLY_DELIVERED:
      return LibertySeverity.SUCCESS
    case PurchaseStatus.CANCELED:
      return LibertySeverity.DANGER
    default:
      return LibertySeverity.SECONDARY
    }
  }
}
