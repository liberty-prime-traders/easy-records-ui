import {NgClass} from '@angular/common'
import {Component, input} from '@angular/core'
import {ProgressSpinner} from 'primeng/progressspinner'
import {RtsConstants} from '../../../utils/constants'

@Component({
  selector: 'esr-loading-container',
  styleUrl: 'loading-container.component.scss',
  host: {
    '[style.--esr-loading-backdrop-z-index]': 'ZIndexes.LOADING_BACKDROP',
    '[style.--esr-loading-overlay-z-index]': 'ZIndexes.LOADING_OVERLAY'
  },
  template: `
    <div class="loading-wrapper" [ngClass]="{'loading': loading()}">
      <ng-content/>

      @if (loading()) {
        <div class="loading-overlay">
          <p-progress-spinner class="loading-spinner"/>
          <span class="text-center">{{ loadingText() }}</span>
        </div>
      }
    </div>
  `,
  imports: [
    ProgressSpinner,
    NgClass
  ]
})
export class LoadingContainerComponent {
  readonly ZIndexes = RtsConstants.ZIndexes
  readonly loading = input(false)
  readonly loadingText = input('Loading')
}
