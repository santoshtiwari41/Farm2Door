import { useQuery } from "@tanstack/react-query";

import api from "@/api";
import Loading from "@/components/loading";
import CustomersTable from "@/components/table/customers-table";

const Customers = () => {
  const getCustomers = async () => {
    try {
      const res = await api.get("/customers");
      return res.data.customers;
    } catch (error: any) {
      console.log("Error fetching customers:", error.message);
      throw error;
    }
  };

  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading customers data</div>;
  }

  return (
    <section className="m-4 p-4">
      <CustomersTable customers={customers} />
    </section>
  );
};

export default Customers;
