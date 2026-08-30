module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|@expo|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@shopify/checkout-sheet-kit)/)',
  ],
};
