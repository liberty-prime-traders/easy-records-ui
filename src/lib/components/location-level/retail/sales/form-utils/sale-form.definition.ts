import {applyEach, applyWhen, disabled, required, RootFieldContext, schema} from '@angular/forms/signals'
import {SaleSession} from '../../../../api/location-level/sale_session/sale-session.model'
import {SaleLineFormDefinition} from './sale-line-form.definition'

export namespace SaleFormDefinition {

  export interface SaleFormModel {
    contactId: string
    walkInCustomer: boolean | null
    saleLines: SaleLineFormDefinition.SaleLineFormModel[]
    canEditLines: boolean
  }


  export const fieldMap: Map<string, string> = new Map([
    ['contactId', 'Customer'],
    ['walkInCustomer', 'Walk-in Customer'],
    ['saleLines', 'Sale Lines']
  ])

  export const createDefault = (): SaleFormModel => ({
    contactId: '',
    walkInCustomer: null,
    saleLines: [],
    canEditLines: true
  })

  export const saleFormSchema = schema<SaleFormModel>((salePath) => {
    applyEach(salePath.saleLines, (linePath) => {
      applyWhen(
        linePath,
        ({valueOf}) => valueOf(salePath.canEditLines),
        SaleLineFormDefinition.saleLineSchema
      )
    })

    required(
      salePath.contactId,
      {when: ({valueOf}) => !valueOf(salePath.walkInCustomer)}
    )

    disabled(
      salePath.contactId,
      {when: ({valueOf}: RootFieldContext<string>) => !!valueOf(salePath.walkInCustomer)}
    )
  })

  export const convertToFormModel = (sale: SaleSession): SaleFormModel => {
    return {
      contactId: sale.contactId,
      walkInCustomer: sale.walkInCustomer ?? null,
      saleLines: SaleLineFormDefinition.mapSaleLines(sale.saleLines),
      canEditLines: sale.uiOptions.canEditLines
    }
  }

}
