import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  getKeyValue,
  Spinner,
} from '@nextui-org/react';
import { transactionColumns } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import { addPrefix } from '../../../utils/helpers';
import { useThunk } from '../../../hooks/useThunk';
import { fetchTransactions, deleteTransaction } from '../../../store';
import { useSelector } from 'react-redux';
import TableSkeleton from '../TableSkeleton';

const TransactionList = () => {
  const [doFetchTransactions] = useThunk(fetchTransactions);

  const [doDeleteTransaction, isDeleteLoading] = useThunk(deleteTransaction);

  const [selectedId, setSelectedId] = useState('');

  const { data, isLoading } = useSelector((state) => state.transactions);

  useEffect(() => {
    doFetchTransactions();
  }, [doFetchTransactions]);

  const handleDelete = (id) => {
    setSelectedId(id);
    doDeleteTransaction(id);
  };

  const parsedData = data.map((transaction) => {
    return {
      ...transaction,
      color:
        transaction.expenseType.toLowerCase() === 'expense'
          ? 'text-red-600'
          : 'text-emerald-600',
      amount: addPrefix(transaction.expenseType, transaction.amount),
      delete: (
        <Button
          onPress={() => handleDelete(transaction._id)}
          color="danger"
          variant="ghost"
        >
          {selectedId === transaction._id && isDeleteLoading ? (
            <Spinner color="default" />
          ) : (
            'Delete'
          )}
        </Button>
      ),
    };
  });

  if (!isDeleteLoading && isLoading) {
    return <TableSkeleton />;
  }

  // console.log(parsedData);

  return (
    <Table className="w-9/12" aria-label="transaction table">
      <TableHeader columns={transactionColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={parsedData}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className={columnKey === 'amount' && item.color}>
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
