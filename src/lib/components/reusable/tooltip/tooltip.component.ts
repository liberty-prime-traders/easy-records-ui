import {Component, input} from '@angular/core'
import {Tooltip} from 'primeng/tooltip'

@Component({
  selector: 'esr-tooltip',
  templateUrl: 'tooltip.component.html',
  imports: [
    Tooltip
  ]
})
export class TooltipComponent {
  readonly messages = input([''])
}
