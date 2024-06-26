import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICustomer } from "@/pages/Customer";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const CustomersTable = ({ customers }: { customers: ICustomer[] }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>orders</TableHead>
            <TableHead>created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c: ICustomer) => (
            <TableRow key={c._id}>
              <TableCell className="font-medium underline">
                <Link to={`/customers/${c._id}`}>
                  {c.name ?? "Sugam Adhikari"}
                </Link>
              </TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.address ?? "Waling Syanja"}</TableCell>
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

export default CustomersTable;
