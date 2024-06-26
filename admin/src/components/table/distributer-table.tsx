import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDistributer } from "@/pages/Distributers";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const DistributerTable = ({ distributer }: { distributer: IDistributer[] }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {distributer.map((c: IDistributer) => (
            <TableRow key={c._id}>
              <Link to={`/distributers/${c._id}`}>
                <TableCell className="font-medium underline">
                  {c.name}
                </TableCell>
              </Link>
              <TableCell>{c.location.coordinates}</TableCell>
              <TableCell>{c.products.length ?? 0}</TableCell>
              <TableCell>{c.orders.length ?? 0}</TableCell>
              <TableCell>
                {moment(c.createdAt).startOf("hour").fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DistributerTable;
