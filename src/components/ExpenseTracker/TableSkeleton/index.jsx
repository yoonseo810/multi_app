import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

const TableSkeleton = () => {
  return (
    <Table className="w-9/12" aria-label="transaction table loading">
      <TableHeader>
        {Array(5)
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
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <TableRow key={index}>
              {Array(5)
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

export default TableSkeleton;
