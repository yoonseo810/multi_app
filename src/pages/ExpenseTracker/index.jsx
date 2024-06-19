import Header from '../../components/common/Header';
import Balance from '../../components/ExpenseTracker/Balance';
import IncomeExpenses from '../../components/ExpenseTracker/IncomeExpenses';
import TransactionList from '../../components/ExpenseTracker/TransactionList';
import AddTransaction from '../../components/ExpenseTracker/AddTransaction';

const ExpenseTracker = () => {
  return (
    <>
      <div className="flex flex-col items-center m-0 gap-10">
        <Header title="Expense Tracker" />
        <div className="flex gap-40">
          <Balance />
          <IncomeExpenses />
        </div>

        <AddTransaction />

        <TransactionList />
      </div>
    </>
  );
};

export default ExpenseTracker;
