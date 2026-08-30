import type { Money } from '@/src/types/commerce';

export function formatMoney(money: Money, locale = 'en-CA'): string {
  const amount = Number(money.amount);

  if (!Number.isFinite(amount)) {
    return `${money.amount} ${money.currencyCode}`;
  }

  return new Intl.NumberFormat(locale, {
    currency: money.currencyCode,
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
  }).format(amount);
}
