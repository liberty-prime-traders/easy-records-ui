import {Pipe, PipeTransform} from '@angular/core'
import {JoinRequestStatus} from '../../api/util/join-request/join-request-status.enum'
import {LibertySeverity} from '../types/severity'

@Pipe({name: 'joinRequestStatusSeverity'})
export class JoinRequestStatusSeverityPipe implements PipeTransform {
  transform(status?: JoinRequestStatus): LibertySeverity {
    switch (status) {
    case JoinRequestStatus.PENDING:
      return LibertySeverity.WARN
    case JoinRequestStatus.APPROVED:
      return LibertySeverity.SUCCESS
    case JoinRequestStatus.DENIED:
      return LibertySeverity.DANGER
    default:
      return LibertySeverity.INFO
    }
  }
}
