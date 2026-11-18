import {Pipe, PipeTransform} from '@angular/core'
import {TaxSourceType} from '../../../../api/location-level/core/tax-entry/tax-source-type.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({name: 'taxSourceTypeSeverity', standalone: true})
export class TaxSourceTypeSeverityPipe implements PipeTransform {
  transform(sourceType?: TaxSourceType): LibertySeverity {
    switch (sourceType) {
      case TaxSourceType.SALE:
        return LibertySeverity.SUCCESS
      case TaxSourceType.SALE_VOID:
        return LibertySeverity.DANGER
      case TaxSourceType.PURCHASE_DELIVERY:
        return LibertySeverity.INFO
      default:
        return LibertySeverity.SECONDARY
    }
  }
}
