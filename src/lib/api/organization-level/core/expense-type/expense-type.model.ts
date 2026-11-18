import {ExpenseSourceType} from '../../../cross-tier/core/expense/expense-source-type.enum'
import {BaseModel} from '../../../util/base-api/base.model'
import {ContactType} from '../contact/contact-type.enum'

export interface ExpenseType extends BaseModel {
  code?: string
  name: string
  expenseAccountCode: string
  eligiblePayeeTypes: ContactType[]
  eligibleSourceTypes: ExpenseSourceType[]
  systemDefined: boolean
}
