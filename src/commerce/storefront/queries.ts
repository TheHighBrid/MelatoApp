export const IMAGE_FIELDS = `
  url
  altText
  width
  height
`;

export const MONEY_FIELDS = `
  amount
  currencyCode
`;

export const PRODUCT_CARD_FIELDS = `
  id
  handle
  title
  availableForSale
  featuredImage { ${IMAGE_FIELDS} }
  variants(first: 1) {
    nodes {
      id
      title
      availableForSale
      price { ${MONEY_FIELDS} }
      selectedOptions { name value }
    }
  }
`;

export const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { ${MONEY_FIELDS} }
    totalAmount { ${MONEY_FIELDS} }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost { totalAmount { ${MONEY_FIELDS} } }
      merchandise {
        ... on ProductVariant {
          id
          title
          availableForSale
          price { ${MONEY_FIELDS} }
          selectedOptions { name value }
          image { ${IMAGE_FIELDS} }
          product {
            handle
            title
            featuredImage { ${IMAGE_FIELDS} }
          }
        }
      }
    }
  }
`;

export const COLLECTION_QUERY = `
  query Collection($handle: String!, $cursor: String) @inContext(country: CA) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { ${IMAGE_FIELDS} }
      products(first: 24, after: $cursor, sortKey: COLLECTION_DEFAULT) {
        nodes { ${PRODUCT_CARD_FIELDS} }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query Product($handle: String!) @inContext(country: CA) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      productType
      tags
      availableForSale
      featuredImage { ${IMAGE_FIELDS} }
      images(first: 12) { nodes { ${IMAGE_FIELDS} } }
      options { id name values }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          price { ${MONEY_FIELDS} }
          compareAtPrice { ${MONEY_FIELDS} }
          selectedOptions { name value }
          image { ${IMAGE_FIELDS} }
        }
      }
    }
  }
`;

export const SEARCH_QUERY = `
  query Search($query: String!, $cursor: String) @inContext(country: CA) {
    search(query: $query, first: 24, after: $cursor, types: PRODUCT, sortKey: RELEVANCE) {
      nodes {
        ... on Product { ${PRODUCT_CARD_FIELDS} }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export const PREDICTIVE_SEARCH_QUERY = `
  query PredictiveSearch($query: String!) @inContext(country: CA) {
    predictiveSearch(query: $query, limit: 8, types: [PRODUCT, COLLECTION]) {
      products { ${PRODUCT_CARD_FIELDS} }
      collections {
        id
        handle
        title
        image { ${IMAGE_FIELDS} }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput) @inContext(country: CA) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message code }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) @inContext(country: CA) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message code }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) @inContext(country: CA) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message code }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) @inContext(country: CA) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message code }
    }
  }
`;
