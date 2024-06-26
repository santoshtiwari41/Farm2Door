import { useQuery } from "@tanstack/react-query";

import api from "@/api";
import Loading from "@/components/loading";
import DistributerTable from "@/components/table/distributer-table";

export interface IDistributer {
  _id: string;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  orders: any[];
  products: any[];
  createdAt: string;
  updatedAt: string;
}

const Distributers = () => {
  const getDistributers = async () => {
    try {
      const res = await api.get("/distributers");
      return res.data;
    } catch (error) {
      console.log("Error");
    }
  };

  const {
    data: distributers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["distributers"],
    queryFn: getDistributers,
  });

  if (isLoading || isError) {
    return <Loading />;
  }

  return (
    <div className="mx-10 my-6">
      <DistributerTable distributer={distributers} />
    </div>
  );
};

export default Distributers;
