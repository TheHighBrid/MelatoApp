import { homeModules } from '@/src/content/home';

describe('Melato home editorial configuration', () => {
  it('starts with the current brand statement and a Shopify collection target', () => {
    const hero = homeModules[0];

    expect(hero).toMatchObject({
      type: 'hero',
      title: 'THE CULTURE WEARS US',
      primaryTarget: { kind: 'collection', handle: 'new-arrivals' },
    });
  });

  it('references current Shopify collections without embedding commercial data', () => {
    const collectionHandles = homeModules
      .flatMap((module) => [module.primaryTarget, module.secondaryTarget])
      .filter((target): target is { kind: 'collection'; handle: string } => target?.kind === 'collection')
      .map((target) => target.handle);

    expect(collectionHandles).toEqual(
      expect.arrayContaining(['new-arrivals', 'tracksuits', 'accessories']),
    );

    expect(JSON.stringify(homeModules)).not.toContain('price');
    expect(JSON.stringify(homeModules)).not.toContain('inventory');
  });
});
