import type { Cart, CartLine, Image, Product, ProductVariant } from '@/src/types/commerce';

type ImageNode = Image | null | undefined;

type VariantNode = ProductVariant;

export type StorefrontProductNode = Omit<Product, 'images' | 'variants'> & {
  images: { nodes: Image[] };
  variants: { nodes: ProductVariant[] };
};

type CartNode = Omit<Cart, 'lines'> & {
  lines: { nodes: (Omit<CartLine, 'merchandise'> & { merchandise: CartLine['merchandise'] | null })[] };
};

function mapImage(image: ImageNode): Image | null {
  return image ?? null;
}

function mapVariant(variant: VariantNode): ProductVariant {
  return {
    ...variant,
    compareAtPrice: variant.compareAtPrice ?? null,
    image: mapImage(variant.image),
  };
}

export function mapProduct(node: StorefrontProductNode): Product {
  return {
    ...node,
    featuredImage: mapImage(node.featuredImage),
    images: node.images.nodes.map((image) => ({ ...image })),
    options: node.options.map((option) => ({ ...option, values: [...option.values] })),
    variants: node.variants.nodes.map(mapVariant),
  };
}

export function mapCart(node: CartNode): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity,
    cost: node.cost,
    lines: node.lines.nodes.flatMap((line) => {
      if (!line.merchandise) {
        return [];
      }

      return [{ ...line, merchandise: { ...line.merchandise, image: mapImage(line.merchandise.image) } }];
    }),
  };
}
