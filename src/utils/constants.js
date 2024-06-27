// export const navBarItemsForUsers = [
//   {
//     id: 'movies',
//     label: 'Movies',
//     linkTo: '/movies',
//   },
//   {
//     id: 'books',
//     label: 'Books',
//     linkTo: '/books',
//   },
//   {
//     id: 'expense',
//     label: 'Expense Tracker',
//     linkTo: '/expense',
//   },
// ];

export const navBarItemsForUsers = [
  {
    id: 'memo',
    label: 'Memo',
    linkTo: '/memo',
  },
  {
    id: 'expense',
    label: 'Expense Tracker',
    linkTo: '/expense',
  },
  {
    id: 'pokedex',
    label: 'Pokedex',
    linkTo: '/pokedex',
  },
  // {
  //   id: 'tvSeries',
  //   label: 'TV Series',
  //   linkTo: '/tvSeries',
  // },
  // {
  //   id: 'favourites',
  //   label: 'Favourites',
  //   linkTo: '/favourites',
  // },
  // {
  //   id: 'rated',
  //   label: 'Rated',
  //   linkTo: '/rated',
  // },
];

export const navBarItemsForNonUsers = [
  {
    id: 'login',
    label: 'Login',
    linkTo: '/login',
  },
  {
    id: 'register',
    label: 'Register',
    linkTo: '/register',
  },
];

export const transactionColumnHeaders = [
  'Category',
  'Description',
  'Income/Expense',
  'Amount',
  'Delete',
];

export const transactionColumns = [
  {
    key: 'category',
    label: 'CATEGORY',
  },
  {
    key: 'description',
    label: 'DESCRIPTION',
  },
  {
    key: 'expenseType',
    label: 'INCOME/EXPENSE',
  },
  {
    key: 'amount',
    label: 'AMOUNT',
  },
  {
    key: 'delete',
    label: 'DELETE',
  },
];

export const memoColumns = [
  {
    key: 'title',
    label: 'TITLE',
  },
  {
    key: 'content',
    label: 'CONTENT',
  },
  {
    key: 'edit',
    label: 'EDIT',
  },
  {
    key: 'delete',
    label: 'DELETE',
  },
];

export const memoDummyData = [
  {
    _id: '1',
    title: 'TEST1',
    content: 'content for test 1',
  },
  {
    _id: '2',
    title: 'TEST2',
    content: 'content for test 2',
  },
  {
    _id: '3',
    title: 'TEST3',
    content: 'content for test 3',
  },
];

export const dummyTransactions = [
  {
    category: 'Food',
    description: 'Dinner with friends',
    type: 'Expense',
    amount: 300,
  },
  {
    category: 'Salary',
    description: 'Paycheck',
    type: 'Income',
    amount: 1500,
  },
  {
    category: 'Household',
    description: 'Rental',
    type: 'Expense',
    amount: 2000,
  },
  {
    category: 'Other',
    description: 'Cash win from Casino',
    type: 'Income',
    amount: 3000,
  },
];

export const incomeCategories = [
  {
    value: 'Allowance',
    label: 'Allowance',
  },
  {
    value: 'Salary',
    label: 'Salary',
  },
  {
    value: 'Petty Cash',
    label: 'Petty Cash',
  },
  {
    value: 'Bonus',
    label: 'Bonus',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export const expenseCategories = [
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Social Life',
    label: 'Social Life',
  },
  {
    value: 'Pets',
    label: 'Pets',
  },
  {
    value: 'Transport',
    label: 'Transport',
  },
  {
    value: 'Culture',
    label: 'Culture',
  },
  {
    value: 'Household',
    label: 'Household',
  },
  {
    value: 'Apparel',
    label: 'Apparel',
  },
  {
    value: 'Beauty',
    label: 'Beauty',
  },
  {
    value: 'Health',
    label: 'Health',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Gift',
    label: 'Gift',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export const actions = {
  GET_TRANSACTIONS: 'GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS: 'GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_ERROR: 'GET_TRANSACTIONS_ERROR',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  DELETE_TRANSACTION_SUCCESSS: 'DELETE_TRANSACTION_SUCCESSS',
  DELETE_TRANSACTION_ERROR: 'DELETE_TRANSACTION_ERROR',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  ADD_TRANSACTION_SUCCESS: 'ADD_TRANSACTION_SUCCESS',
  ADD_TRANSACTION_ERROR: 'ADD_TRANSACTION_ERROR',
};

export const BASE_URL = 'https://notes-app-server-swart.vercel.app';

export const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonTypeColors = {
  electric: 'bg-yellow-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  poison: 'bg-purple-500',
  flying: 'bg-cyan-300',
  ground: 'bg-amber-500',
  fairy: 'bg-pink-400',
  bug: 'bg-green-700',
  default: '',
};

export const pokemonStatsConfig = {
  hp: 'success',
  attack: 'danger',
  defense: 'default',
  ['special-attack']: 'secondary',
  ['special-defense']: 'warning',
  speed: 'default',
};
