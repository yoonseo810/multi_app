import MemoTable from '../../components/Memo/MemoTable';
import Header from '../../components/common/Header';
import CreateMemo from '../../components/Memo/CreateMemo';

const Memo = () => {
  return (
    <div className="flex flex-col items-center m-0 pb-10 gap-5">
      <Header title="Memo" />
      <CreateMemo />
      <MemoTable />
    </div>
  );
};

export default Memo;
