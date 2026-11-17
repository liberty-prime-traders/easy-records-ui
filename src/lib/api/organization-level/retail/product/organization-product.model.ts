import {ProductDetail} from '../../../cross-tier/retail/product/product-detail.model'
import {Tag} from '../../core/tag/tag.model'

export interface OrganizationProduct extends ProductDetail {
  baseUnitId?: string
  activeTags?: TagSummary[]
  tagsToAdd?: string[]
  tagsToRemove?: string[]
}

export type TagSummary = Pick<Tag, 'id' | 'tagName'>
