import { addPrefix } from '../../../utils/helpers';
import { useSelector } from 'react-redux';

const Balance = () => {
  const { data } = useSelector((state) => state.transactions);

  const total = data.reduce((acc, item) => {
    if (item.expenseType.toLowerCase() === 'income') {
      acc += item.amount;
    } else {
      acc -= item.amount;
    }
    return acc;
  }, 0);

  const type = total > 0 ? 'income' : total < 0 ? 'expense' : 'zero';

  return (
    <div className="flex flex-col items-center gap-5">
      <h4 className="text-3xl">Your Total Balance</h4>
      <h1
        className={`text-2xl ${
          type === 'expense'
            ? 'text-red-600'
            : type === 'income'
            ? 'text-emerald-600'
            : 'text-black'
        }`}
      >
        {addPrefix(type, total)}
      </h1>
    </div>
  );
};

export default Balance;
