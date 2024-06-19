const formatNumber = (num) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

export const addPrefix = (type, amount) => {
  return `${
    type.toLowerCase() === 'expense'
      ? '-'
      : type.toLowerCase() === 'income'
      ? '+'
      : ''
  }$${formatNumber(amount)}`;
};

export const formattedName = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);
