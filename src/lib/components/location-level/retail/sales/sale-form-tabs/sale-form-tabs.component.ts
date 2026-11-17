import {CurrencyPipe} from '@angular/common'
import {Component, computed, inject, linkedSignal} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {Badge} from 'primeng/badge'
import {ButtonDirective} from 'primeng/button'
import {Textarea} from 'primeng/textarea'
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs'
import {RemovedSaleLine, SaleSessionKind} from '../../../../api/location-level/sale_session/sale-session.model'
import {SaleSessionService} from '../../../../api/location-level/sale_session/sale-session.service'
import {SaleFormContext} from '../form-utils/sale-form-context'
import {SaleLinesComponent} from '../sale-lines/sale-lines.component'

@Component({
  selector: 'rts-sale-form-tabs',
  templateUrl: 'sale-form-tabs.component.html',
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel, Badge, ButtonDirective, CurrencyPipe, SaleLinesComponent, Textarea, FormsModule]
})
export class SaleFormTabsComponent {
  private readonly context = inject(SaleFormContext)
  private readonly saleSessionService = inject(SaleSessionService)

  readonly saleSession = this.context.saleSession
  readonly saleLineCount = computed(() => this.saleSession().saleLines.length)
  readonly isPendingConsolidation = computed(() => this.saleSession().kind === SaleSessionKind.PENDING_CONSOLIDATION)
  readonly notesText = linkedSignal(() => this.saleSession().notes ?? '')
  readonly removedLines = computed(() => this.saleSession().removedSaleLines)

  restore(removedLine: RemovedSaleLine) {
    this.saleSessionService.restoreRemovedLine(removedLine.identity, {onSuccess: this.context.loadSession})
  }

  saveNotes() {
    const trimmedNotes = this.notesText().trim()
    this.notesText.set(trimmedNotes)
    if (trimmedNotes === (this.saleSession().notes ?? '')) return
    this.saleSessionService.updateHeader({notes: trimmedNotes}, {onSuccess: this.context.loadSession})
  }
}
