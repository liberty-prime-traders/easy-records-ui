import {Pipe, PipeTransform} from '@angular/core'
import {PaymentStatus} from '../location-level/retail/purchase/payment-status.enum'
import {LibertySeverity} from '../../utils/types/severity'

@Pipe({name: 'paymentStatusSeverity', standalone: true})
export class PaymentStatusSeverityPipe implements PipeTransform {
  transform(paymentStatus?: PaymentStatus): LibertySeverity {
    switch (paymentStatus) {
      case PaymentStatus.UNPAID:
        return LibertySeverity.SECONDARY
      case PaymentStatus.PARTIALLY_SETTLED:
        return LibertySeverity.INFO
      case PaymentStatus.FULLY_SETTLED:
        return LibertySeverity.SUCCESS
      case PaymentStatus.OVERPAID:
        return LibertySeverity.DANGER
      default:
        return LibertySeverity.SECONDARY
    }
  }
}
