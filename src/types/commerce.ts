export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ProductOption = {
  id?: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: Money;
  compareAtPrice?: Money | null;
  selectedOptions: { name: string; value: string }[];
  image?: Image | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  featuredImage?: Image | null;
  images: Image[];
  options: ProductOption[];
  variants: ProductVariant[];
  availableForSale: boolean;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: Image | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: Pick<Product, 'handle' | 'title' | 'featuredImage'>;
  };
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
};
