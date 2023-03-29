import Statistics from "./statistics";
import Pie from "./pie";
import RecordTable from "./recordTable";

export default function TokenTable() {
  return (
    <div className="text-white bx">
      <Statistics />
      <Pie />
      <RecordTable />
    </div>
  );
}
