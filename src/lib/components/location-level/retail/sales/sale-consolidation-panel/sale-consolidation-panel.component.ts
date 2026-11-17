import {Component, computed, inject} from '@angular/core'
import {Badge} from 'primeng/badge'
import {ButtonDirective} from 'primeng/button'
import {Card} from 'primeng/card'
import {Tag} from 'primeng/tag'
import {SaleSessionService} from '../../../../../api/location-level/retail/sale_session/sale-session.service'
import {SaleFormContext} from '../form-utils/sale-form-context'

@Component({
  selector: 'rts-sale-consolidation-panel',
  templateUrl: 'sale-consolidation-panel.component.html',
  imports: [Card, Badge, ButtonDirective, Tag]
})
export class SaleConsolidationPanelComponent {
  private readonly context = inject(SaleFormContext)
  private readonly saleSessionService = inject(SaleSessionService)

  readonly saleSession = this.context.saleSession
  readonly issues = computed(() => this.saleSession().consolidationIssues)
  readonly blockingIssueCount = computed(() => this.issues().filter(issue => issue.blocking).length)
  readonly canGenerate = computed(() => this.saleSession().uiOptions.canGenerateConsolidatedSale)
  readonly failureMessages = this.saleSessionService.selectFailureMessages

  generate() {
    this.saleSessionService.generateConsolidatedSale({onSuccess: this.context.loadSession})
  }
}
