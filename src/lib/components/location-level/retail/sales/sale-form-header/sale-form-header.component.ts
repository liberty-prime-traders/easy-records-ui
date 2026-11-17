import {DatePipe} from '@angular/common'
import {Component, computed, inject, model} from '@angular/core'
import {ButtonDirective} from 'primeng/button'
import {Card} from 'primeng/card'
import {Dialog} from 'primeng/dialog'
import {InputText} from 'primeng/inputtext'
import {Tag} from 'primeng/tag'
import {SaleStatus} from '../../../../../api/location-level/retail/sale-summary/sale-status.enum'
import {SaleDiscardAction} from '../../../../../api/location-level/retail/sale_session/sale-session.model'
import {SaleSessionService} from '../../../../../api/location-level/retail/sale_session/sale-session.service'
import {NullSafePipe} from '../../../../../utils/pipes/null-safe.pipe'
import {PrettifyEnumPipe} from '../../../../../utils/pipes/prettify-enum.pipe'
import {PaymentStatusSeverityPipe} from '../../../../../api/cross-tier/payment-status-severity.pipe'
import {SaleFormContext} from '../form-utils/sale-form-context'
import {SaleFormNavigator} from '../form-utils/sale-form-navigator'
import {SalePrintActionsComponent} from '../sale-print/sale-print-actions.component'
import {SaleStatusSeverityPipe} from '../sale-status-severity.pipe'

@Component({
  selector: 'esr-sale-form-header',
  imports: [
    Card,
    ButtonDirective,
    Tag,
    PaymentStatusSeverityPipe,
    SaleStatusSeverityPipe,
    PrettifyEnumPipe,
    DatePipe,
    NullSafePipe,
    Dialog,
    InputText,
    SalePrintActionsComponent
  ],
  templateUrl: 'sale-form-header.component.html'
})
export class SaleFormHeaderComponent {
  private readonly context = inject(SaleFormContext)
  private readonly navigator = inject(SaleFormNavigator)
  readonly showVoidSaleScreen = model(false)
  private readonly saleSessionService = inject(SaleSessionService)

  readonly saleStatus = computed(() => this.saleSession().saleStatus)
  readonly saleSession = this.context.saleSession

  readonly saleIsBeyondDraft = computed(() =>
    this.saleStatus() && [SaleStatus.CONFIRMED, SaleStatus.VOIDED].includes(this.saleStatus()!)
  )

  readonly allowedDiscardAction = computed(() => this.saleSession().uiOptions.allowedDiscardAction)
  readonly canDiscardSale = computed(() => !!this.allowedDiscardAction())
  readonly isVoidingConfirmedSale = computed(() => this.allowedDiscardAction() === SaleDiscardAction.VOID_SALE)
  readonly isDiscardingPendingConsolidation = computed(() =>
    this.allowedDiscardAction() === SaleDiscardAction.DISCARD_PENDING_CONSOLIDATION
  )

  readonly discardSaleLabel = computed(() => {
    switch (this.allowedDiscardAction()) {
      case SaleDiscardAction.VOID_SALE:
        return 'Void Sale'
      case SaleDiscardAction.DISCARD_PENDING_CONSOLIDATION:
        return 'Discard Consolidation'
      default:
        return 'Discard Draft'
    }
  })

  readonly canCopySale = computed(() => this.saleSession().uiOptions.canCopySale)

  readonly startFreshFormAfterPrint = this.context.startFreshFormAfterPrint
  readonly autoPrintAfterConfirm = this.context.autoPrintAfterConfirm
  readonly markAutoPrinted = this.context.markAutoPrinted

  hideSaleForm() {
    this.navigator.backFromForm()
  }

  copySale() {
    this.navigator.openForCopyOfSale(this.saleSession().saleId!)
  }

  startSaleVoid() {
    this.showVoidSaleScreen.set(true)
  }

  confirmSaleVoid(voidReason: string) {
    const voidingConfirmedSale = this.isVoidingConfirmedSale()
    this.saleSessionService.discardOrVoidSale(
      voidReason,
      {
        onSuccess: (sale) => {
          this.showVoidSaleScreen.set(false)
          if (voidingConfirmedSale) {
            this.context.loadSession(sale)
          } else {
            this.navigator.backFromForm()
          }
        }
      }
    )
  }
}
