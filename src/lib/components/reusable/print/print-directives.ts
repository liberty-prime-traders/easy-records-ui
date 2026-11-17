import {Directive, inject, TemplateRef} from '@angular/core'

/**
 * Marks an `<ng-template>` as the document header. Discovered by `esr-print-document` through a content query,
 * so it must be declared directly in the template that hosts `<esr-print-document>` (see README).
 */
@Directive({selector: 'ng-template[esrPrintHeader]'})
export class PrintHeaderDirective {
  readonly template = inject<TemplateRef<unknown>>(TemplateRef)
}

@Directive({selector: 'ng-template[esrPrintFooter]'})
export class PrintFooterDirective {
  readonly template = inject<TemplateRef<unknown>>(TemplateRef)
}

/** Hidden in printed output. In the on-screen preview it stays visible but dimmed, so users see what is omitted. */
@Directive({selector: '[esrPrintHide]', host: {class: 'esr-print-hide'}})
export class PrintHideDirective {}

/**
 * Visible in print output and in the preview (which represents the output), hidden everywhere else in the
 * application. Styling lives in `PrintDocumentComponent`.
 */
@Directive({selector: '[esrPrintOnly]', host: {class: 'esr-print-only'}})
export class PrintOnlyDirective {}

/** Best-effort `break-inside: avoid`; browsers ignore it for blocks taller than a page. */
@Directive({selector: '[esrPrintKeepTogether]', host: {class: 'esr-print-keep-together'}})
export class PrintKeepTogetherDirective {}

/** Starts a new page in PAGED layouts. No-op in continuous receipts, where a break would only waste paper. */
@Directive({selector: '[esrPrintBreakBefore]', host: {class: 'esr-print-break-before'}})
export class PrintBreakBeforeDirective {}

export const PRINT_DIRECTIVES = [
  PrintHeaderDirective,
  PrintFooterDirective,
  PrintHideDirective,
  PrintOnlyDirective,
  PrintKeepTogetherDirective,
  PrintBreakBeforeDirective
] as const
