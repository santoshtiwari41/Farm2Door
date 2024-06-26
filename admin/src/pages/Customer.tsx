import api from "@/api";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export interface ICustomer {
  _id: string;
  name?: string;
  phone: number;
  address: string;
  orders: [];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const Customer = () => {
  const { pathname } = useLocation();
  const customerId = pathname.split("/")[2];

  const getCustomer = async () => {
    try {
      const res = await api.get(`/customers/${customerId}`);
      return res.data.customer;
    } catch (error) {
      console.log("Error");
    }
  };

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customersid"],
    queryFn: getCustomer,
  });

  if (isLoading || isError) {
    return <Loading />;
  }
  return (
    <div>
      <li className="bg-white p-4 rounded-md shadow-md">
        <p className="text-gray-600">Phone: {customer.phone}</p>
        <p className="text-gray-600"></p>
        <p className="text-gray-600">
          Verified: {customer.isVerified ? "Yes" : "No"}
        </p>
      </li>
    </div>
  );
};

export default Customer;
