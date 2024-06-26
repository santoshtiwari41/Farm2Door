import api from "@/api";
import Loading from "@/components/loading";
import OrdersTable from "@/components/table/orders-table";
import { useQuery } from "@tanstack/react-query";
import { ICustomer } from "./Customer";
import { Distributer } from "./Distributer";

export interface Product {
  product: any;
  quantity: number;
  _id: string;
}

export interface IOrder {
  _id: string;
  customer: ICustomer | null;
  distributer: Distributer | null;
  products: Product[];
  status: string;
  totalAmount: number;
  createdAt: string;
}

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  async function fetchOrders() {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching orders:", error.message);
      throw error;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading orders data</div>;
  }

  return (
    <section className="m-4 p-4">
      <OrdersTable orders={orders} />
    </section>
  );
};

export default Orders;
