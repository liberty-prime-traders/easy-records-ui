import {NgTemplateOutlet} from '@angular/common'
import {Component, computed, contentChild, ElementRef, inject, input, ViewEncapsulation} from '@angular/core'
import {PrintFooterDirective, PrintHeaderDirective} from './print-directives'
import {PrintLayout, PrintLayoutKind} from './print-layout.model'
import {assertValidPrintLayout, millimetresToCss, printableWidthMm, toCss} from './print-layout.util'

/**
 * Generic paper surface. It knows about paper, margins and print semantics; it knows nothing about what the
 * projected content represents.
 *
 * Styles are intentionally global (ViewEncapsulation.None) because they must reach elements rendered by
 * arbitrary projected components, and because `PrintService` copies the application's stylesheets into the print
 * frame. Every selector is rooted at `.esr-print-doc` (or a `.esr-print-*` marker class) so nothing else in the
 * application is affected.
 */
@Component({
  selector: 'esr-print-document',
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'esr-print-doc',
    '[class.esr-print-doc--paged]': 'isPaged()',
    '[class.esr-print-doc--receipt]': '!isPaged()',
    '[style]': 'cssVariables()'
  },
  template: `
    @if (header(); as header) {
      <header class="esr-print-doc__header">
        <ng-container [ngTemplateOutlet]="header.template" />
      </header>
    }

    <main class="esr-print-doc__body">
      <ng-content />
    </main>

    @if (footer(); as footer) {
      <footer class="esr-print-doc__footer">
        <ng-container [ngTemplateOutlet]="footer.template" />
      </footer>
    }
  `,
  styleUrl: 'print-document.component.scss'
})
export class PrintDocumentComponent {
  readonly layout = input.required<PrintLayout>()

  /**
   * Content queries only see templates declared in the consumer's own template, nested at any depth inside
   * `<esr-print-document>` - but not inside the views of child components.
   */
  protected readonly header = contentChild(PrintHeaderDirective)
  protected readonly footer = contentChild(PrintFooterDirective)

  /** The rendered surface, handed to `PrintService.print`. */
  readonly element: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement

  protected readonly isPaged = computed(() => this.layout().kind === PrintLayoutKind.PAGED)

  protected readonly cssVariables = computed(() => {
    const layout = assertValidPrintLayout(this.layout())
    const {margins, height} = layout
    return {
      '--esr-print-width': toCss(layout.width),
      '--esr-print-min-height': height ? toCss(height) : 'auto',
      '--esr-print-printable-width': millimetresToCss(printableWidthMm(layout)),
      '--esr-print-pad-top': toCss(margins.top),
      '--esr-print-pad-right': toCss(margins.right),
      '--esr-print-pad-bottom': toCss(margins.bottom),
      '--esr-print-pad-left': toCss(margins.left)
    }
  })
}
