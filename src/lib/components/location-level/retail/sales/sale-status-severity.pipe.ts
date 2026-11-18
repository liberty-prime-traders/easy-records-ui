import {Pipe, PipeTransform} from '@angular/core'
import {SaleStatus} from '../../../../api/location-level/retail/sale-summary/sale-status.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({name: 'saleStatusSeverity', standalone: true})
export class SaleStatusSeverityPipe implements PipeTransform {
  transform(status?: SaleStatus): LibertySeverity {
    switch (status) {
      case SaleStatus.DRAFT:
        return LibertySeverity.SECONDARY
      case SaleStatus.CONFIRMED:
        return LibertySeverity.SUCCESS
      case SaleStatus.VOIDED:
        return LibertySeverity.DANGER
      case SaleStatus.DISCARDED:
        return LibertySeverity.DANGER
      default:
        return LibertySeverity.SECONDARY
      }
  }
}
