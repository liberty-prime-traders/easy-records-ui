import {Pipe, PipeTransform} from '@angular/core'
import {MigrationStatus} from '../../../../api/platform-level/db-migration/migration-status.enum'
import {LibertySeverity} from '../../../../utils/types/severity'

@Pipe({
  name: 'migrationStatusSeverity'
})
export class MigrationStatusSeverityPipe implements PipeTransform {
  transform(status?: MigrationStatus): LibertySeverity {
    switch (status) {
    case MigrationStatus.SUCCESS:
      return LibertySeverity.SUCCESS
    case MigrationStatus.FAILURE:
      return LibertySeverity.DANGER
    case MigrationStatus.PARTIAL:
      return LibertySeverity.WARN
    default:
      return LibertySeverity.INFO
    }
  }
}
