import {Pipe, PipeTransform} from '@angular/core'
import {BalanceEffect} from './balance-effect.enum'

@Pipe({name: 'nonZeroBalanceEffect', standalone: true})
export class NonZeroBalanceEffectPipe implements PipeTransform {
  transform(amount: number, effectWhenNonZero: BalanceEffect): BalanceEffect {
    return amount === 0 ? BalanceEffect.ZERO : effectWhenNonZero
  }
}
