import { addPrefix } from '../../../utils/helpers';
import { useSelector } from 'react-redux';

const IncomeExpenses = () => {
  const { data } = useSelector((state) => state.transactions);

  const totalIncome = data.reduce((acc, item) => {
    if (item.expenseType.toLowerCase() === 'income') {
      acc += item.amount;
    }
    return acc;
  }, 0);

  const totalExpense = data.reduce((acc, item) => {
    if (item.expenseType.toLowerCase() === 'expense') {
      acc += item.amount;
    }
    return acc;
  }, 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl flex gap-10 text-emerald-600">
        Income
        <span>{addPrefix('income', totalIncome)}</span>
      </div>
      <div className="text-xl flex gap-10 text-red-600">
        Expense
        <span>{addPrefix('expense', totalExpense)}</span>
      </div>
    </div>
  );
};

export default IncomeExpenses;
