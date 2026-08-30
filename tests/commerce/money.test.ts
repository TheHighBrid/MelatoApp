import { formatMoney } from '@/src/lib/money';

describe('formatMoney', () => {
  it('formats Shopify decimal strings in the cart currency', () => {
    expect(formatMoney({ amount: '175.00', currencyCode: 'CAD' })).toBe('$175.00');
  });

  it('falls back to the raw amount when the money value is malformed', () => {
    expect(formatMoney({ amount: 'not-a-number', currencyCode: 'CAD' })).toBe('not-a-number CAD');
  });
});
