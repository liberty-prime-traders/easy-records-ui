import {Pipe, PipeTransform} from '@angular/core'
import {StockTransferStatus} from '../../../../api/cross-tier/retail/stock-transfer/stock-transfer-status.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({name: 'stockTransferStatusSeverity', standalone: true})
export class StockTransferStatusSeverityPipe implements PipeTransform {
  transform(status?: StockTransferStatus): LibertySeverity {
    switch (status) {
    case StockTransferStatus.DRAFT:
      return LibertySeverity.WARN
    case StockTransferStatus.DISPATCHED:
      return LibertySeverity.INFO
    case StockTransferStatus.COMPLETED:
      return LibertySeverity.SUCCESS
    case StockTransferStatus.CANCELLED:
      return LibertySeverity.DANGER
    default:
      return LibertySeverity.SECONDARY
    }
  }
}
