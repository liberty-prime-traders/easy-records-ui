import {required, schema} from '@angular/forms/signals'
import {StockAdjustmentCategory} from '../../../../../api/location-level/retail/stock-adjustment/stock-adjustment-category.enum'
import {StockAdjustmentSearchParameters} from '../../../../../api/location-level/retail/stock-adjustment/stock-adjustment-search-parameters.model'
import {getToday, getTomorrow} from '../../../../../utils/dates'
import {ZonedDatesService} from '../../../../../utils/services/zoned-dates.service'

export namespace StockAdjustmentFilterFormDefinition {
  export interface StockAdjustmentFilterFormModel {
    adjustedFrom: Date | null
    adjustedBefore: Date | null
    locationProductIds: string[]
    categories: StockAdjustmentCategory[]
    adjustedByIds: string[]
  }

  export const createDefaultStockAdjustmentFilterFormModel = (): StockAdjustmentFilterFormModel => {
    const sevenDaysAgo = getToday()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return {
      adjustedFrom: sevenDaysAgo,
      adjustedBefore: getTomorrow(),
      locationProductIds: [],
      categories: [],
      adjustedByIds: []
    }
  }

  export const stockAdjustmentFilterFormSchema = schema<StockAdjustmentFilterFormModel>(path => {
    required(path.adjustedFrom)
    required(path.adjustedBefore)
  })

  export const convertToFilterParams = (
    formValue: StockAdjustmentFilterFormModel, zonedDatesService: ZonedDatesService
  ): StockAdjustmentSearchParameters | null => {
    const adjustedFrom = zonedDatesService.pickedDateAtOrgZone(formValue.adjustedFrom)
    const adjustedBefore = zonedDatesService.pickedDateAtOrgZone(formValue.adjustedBefore)
    if (!adjustedFrom || !adjustedBefore) {
      return null
    }
    return {
      adjustedFrom,
      adjustedBefore,
      locationProductIds: formValue.locationProductIds.length ? formValue.locationProductIds : undefined,
      categories: formValue.categories.length ? formValue.categories : undefined,
      adjustedByIds: formValue.adjustedByIds.length ? formValue.adjustedByIds : undefined
    }
  }
}
