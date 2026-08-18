import { globalActions, primaryTabs } from '@/src/content/navigation';

describe('Melato navigation contract', () => {
  it('keeps the five approved destinations in the required order', () => {
    expect(primaryTabs.map((tab) => tab.label)).toEqual([
      'Home',
      'Shop',
      'Lookbook',
      'Saved',
      'Me',
    ]);
  });

  it('keeps the bag globally reachable instead of making it a tab', () => {
    expect(globalActions).toContainEqual({ label: 'Bag', pathname: '/cart' });
    expect(primaryTabs.map((tab) => tab.label)).not.toContain('Bag');
  });
});
