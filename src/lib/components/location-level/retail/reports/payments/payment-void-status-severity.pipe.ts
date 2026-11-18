import {Pipe, PipeTransform} from '@angular/core'
import {PaymentVoidStatus} from '../../../../../api/location-level/retail/payment/payment-void-status.enum'
import {LibertySeverity} from '../../../../../utils/types/severity'

@Pipe({name: 'paymentVoidStatusSeverity', standalone: true})
export class PaymentVoidStatusSeverityPipe implements PipeTransform {
  transform(status?: PaymentVoidStatus): LibertySeverity {
    switch (status) {
      case PaymentVoidStatus.ACTIVE:
        return LibertySeverity.SUCCESS
      case PaymentVoidStatus.VOIDED:
        return LibertySeverity.DANGER
      default:
        return LibertySeverity.SECONDARY
    }
  }
}
