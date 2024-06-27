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
import { memoColumns } from '../../../utils/constants';
import { useEffect, useState } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { deleteMemo, fetchMemos } from '../../../store';
import { useSelector } from 'react-redux';
import TableSkeleton from '../../ExpenseTracker/TableSkeleton';
import EditMemo from '../EditMemo';

const MemoTable = () => {
  const [selectedId, setSelectedId] = useState('');

  const [doFetchMemos] = useThunk(fetchMemos);

  const [doDeleteMemo, isDeleteLoading] = useThunk(deleteMemo);

  const { data = [], isLoading } = useSelector((state) => state.memos);

  useEffect(() => {
    doFetchMemos();
  }, [doFetchMemos]);

  // const handleEdit = (item) => {
  //   setSelectedId(item._id);
  //   console.log(item);
  // };

  const handleDelete = (id) => {
    setSelectedId(id);
    doDeleteMemo(id);
  };

  const parsedData = data?.length
    ? data.map((item) => {
        return {
          ...item,
          title: item.title.toUpperCase(),
          edit: <EditMemo fetchMemos={doFetchMemos} memo={item} />,
          delete: (
            <Button
              onPress={() => handleDelete(item._id)}
              color="danger"
              variant="shadow"
            >
              {selectedId === item._id && isDeleteLoading ? (
                <Spinner color="default" />
              ) : (
                'Delete'
              )}
            </Button>
          ),
        };
      })
    : [];

  if (!isDeleteLoading && isLoading) {
    return <TableSkeleton column={4} row={3} />;
  }
  return (
    <Table className="w-9/12" aria-label="memo table">
      <TableHeader columns={memoColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={'No data to display'} items={parsedData}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MemoTable;
