export const BASE_URL = 'http://localhost:3000';

export const endpoint = {
  getTransactions: '/transactions',
  getTransactionById: id => `/transactions/${id}`,
  getTransactionsByCategory: cat => `/transactions-by-category?cat=${cat}`,
  addTransaction: '/add-transaction',
  updateTransaction: id => `/update-transaction/${id}`,
  deleteTransaction: id => `/delete-transaction?id=${id}`,
  searchTransactionsByName: name => `/search-transactions?name=${name}`,
};
