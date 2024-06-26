import api from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/pages/Orders";
import moment from "moment";
import { useState } from "react";
import Dropdown from "../dropdown";
import { Card } from "../ui/card";

const OrdersTable = ({ orders }: { orders: IOrder[] }) => {
  const [orderStatuses, setOrderStatuses] = useState<string[]>(
    orders.map((o) => o.status)
  );

  const handleStatusChange = async (
    index: number,
    status: string,
    id: string
  ) => {
    const newStatuses = [...orderStatuses];
    newStatuses[index] = status;
    setOrderStatuses(newStatuses);
    api.patch(`/orders/${id}`, { status });
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case "Pending":
        return "text-yellow-600"; // Set the desired class for Pending status
      case "Delivered":
        return "text-green-600"; // Set the desired class for Delivered status
      case "Cancelled":
        return "text-red-600"; // Set the desired class for Cancelled status
      default:
        return "text-black"; // Default class
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Distributor Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Total Products</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Order Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((o: IOrder, index: number) => (
            <TableRow key={o._id}>
              <TableCell className="font-medium">{o?.customer?.name}</TableCell>
              <TableCell>{o?.distributer?.name}</TableCell>
              <TableCell>$ {o.totalAmount}</TableCell>
              <TableCell>{o.products.length ?? 0}</TableCell>
              <TableCell>
                {moment(o.createdAt).startOf("hour").fromNow()}
              </TableCell>
              <TableCell
                className={`flex items-center justify-around ${getStatusClass(
                  orderStatuses[index]
                )}`}
              >
                {orderStatuses[index]}
                <Dropdown
                  onStatusChange={(selectedStatus) =>
                    handleStatusChange(index, selectedStatus, o._id)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default OrdersTable;
