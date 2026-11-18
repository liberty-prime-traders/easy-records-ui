import {Pipe, PipeTransform} from '@angular/core'
import {SyncStatus} from '../../../../api/location-level/retail/sync/sync-status.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({
  name: 'syncStatusSeverity',
  standalone: true
})
export class SyncStatusSeverityPipe implements PipeTransform {
  transform(status: SyncStatus): LibertySeverity {
    switch (status) {
      case SyncStatus.IN_PROGRESS: return LibertySeverity.INFO
      case SyncStatus.COMPLETED: return LibertySeverity.SUCCESS
      case SyncStatus.FAILED: return LibertySeverity.DANGER
      case SyncStatus.CANCELED: return LibertySeverity.SECONDARY
      case SyncStatus.CANCELLATION_REQUESTED: return LibertySeverity.WARN
      default: return LibertySeverity.INFO
    }
  }
}
