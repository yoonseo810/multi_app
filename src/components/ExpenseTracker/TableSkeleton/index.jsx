import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import PropTypes from 'prop-types';

const TableSkeleton = ({ column = 5, row = 3 }) => {
  return (
    <Table className="w-9/12" aria-label="transaction table loading">
      <TableHeader>
        {Array(column)
          .fill(0)
          .map((_, index) => (
            <TableColumn key={index}>
              <Skeleton className="rounded-lg m-3">
                <div className="h-5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </TableColumn>
          ))}
      </TableHeader>
      <TableBody>
        {Array(row)
          .fill(0)
          .map((_, index) => (
            <TableRow key={index}>
              {Array(column)
                .fill(0)
                .map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="rounded-lg m-3">
                      <div className="h-5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </TableCell>
                ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

TableSkeleton.propTypes = {
  column: PropTypes.number,
  row: PropTypes.number,
};
export default TableSkeleton;
