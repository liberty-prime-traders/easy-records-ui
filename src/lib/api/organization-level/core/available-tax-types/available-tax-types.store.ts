import {Injectable} from '@angular/core'
import {LibertyTreeNode} from '../../../../utils/types/liberty-tree-node'
import {TaxRecoveryType} from '../../../platform-level/tax-type/tax-recovery-type.enum'
import {BaseStore, createBaseStore} from '../../../util/base-api/base.store'

@Injectable({providedIn: 'root'})
export class AvailableTaxTypesStore
  extends createBaseStore<LibertyTreeNode.EntityTreeNode<TaxRecoveryType>>(LibertyTreeNode.TREE_NODE_ID_SELECTOR)
  implements BaseStore<LibertyTreeNode.EntityTreeNode<TaxRecoveryType>> {

  readonly basePath = 'org-tax-types/available'

}
