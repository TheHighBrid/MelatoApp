export type HomeTarget =
  | { kind: 'collection'; handle: string }
  | { kind: 'route'; pathname: string };

export type HomeModule = {
  id: string;
  type: 'hero' | 'collectionRail' | 'editorialFeature';
  eyebrow?: string;
  title: string;
  body?: string;
  primaryLabel: string;
  primaryTarget: HomeTarget;
  secondaryLabel?: string;
  secondaryTarget?: HomeTarget;
};

/**
 * Editorial layout only. Products, images, prices, availability, and copy
 * are resolved from Shopify at runtime; no commerce records live in this file.
 */
export const homeModules: readonly HomeModule[] = [
  {
    id: 'opening-statement',
    type: 'hero',
    eyebrow: 'Melato',
    title: 'THE CULTURE WEARS US',
    body: 'Tailored for movement, cut with intent.',
    primaryLabel: 'Shop the drop',
    primaryTarget: { kind: 'collection', handle: 'new-arrivals' },
    secondaryLabel: 'Living Lookbook',
    secondaryTarget: { kind: 'route', pathname: '/lookbook' },
  },
  {
    id: 'new-arrivals',
    type: 'collectionRail',
    eyebrow: 'Now',
    title: 'NEW ARRIVALS',
    primaryLabel: 'View new arrivals',
    primaryTarget: { kind: 'collection', handle: 'new-arrivals' },
  },
  {
    id: 'the-uniform',
    type: 'collectionRail',
    eyebrow: 'Signature',
    title: 'THE UNIFORM',
    primaryLabel: 'Shop the uniform',
    primaryTarget: { kind: 'collection', handle: 'tracksuits' },
  },
  {
    id: 'living-lookbook',
    type: 'editorialFeature',
    eyebrow: 'Editorial commerce',
    title: 'THE LIVING LOOKBOOK',
    body: 'A continuing study in clothing, context, and motion.',
    primaryLabel: 'Enter the lookbook',
    primaryTarget: { kind: 'route', pathname: '/lookbook' },
  },
  {
    id: 'objects',
    type: 'collectionRail',
    eyebrow: 'Finishing pieces',
    title: 'OBJECTS',
    primaryLabel: 'Shop accessories',
    primaryTarget: { kind: 'collection', handle: 'accessories' },
  },
  {
    id: 'melato-in-context',
    type: 'editorialFeature',
    eyebrow: 'About',
    title: 'MELATO, IN CONTEXT',
    body: 'The references, process, and decisions behind the work.',
    primaryLabel: 'Read the story',
    primaryTarget: { kind: 'route', pathname: '/me' },
  },
];
