import {Component, input} from '@angular/core'
import {TruncatedListPipe} from '../../../utils/pipes/truncated-list.pipe'

@Component({
  selector: 'esr-truncated-list',
  imports: [
    TruncatedListPipe
  ],
  templateUrl: 'truncated-list.component.html'
})
export class TruncatedListComponent {
  readonly items = input.required<string[]>()
  readonly showCount = input(10)
}
