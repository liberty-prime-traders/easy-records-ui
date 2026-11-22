import {Pipe, PipeTransform} from '@angular/core'
import {ContactSubledgerDirection} from '../../../../../../api/organization-level/core/contact-opening-balance/contact-subledger-direction.enum'

@Pipe({
  name: 'contactSubledgerPaymentDirection',
  standalone: true
})
export class ContactSubledgerPaymentDirectionPipe implements PipeTransform {
  transform(value: ContactSubledgerDirection | null | undefined): string {
    switch (value) {
      case ContactSubledgerDirection.PAYABLE:
        return 'We paid them'
      case ContactSubledgerDirection.RECEIVABLE:
        return 'They paid us'
      default:
        return '--'
    }
  }
}
