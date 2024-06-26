import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import api from "@/api";
import Loading from "@/components/loading";

export interface Distributer {
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

const Distributer = () => {
  const { pathname } = useLocation();
  const distributerId = pathname.split("/")[2];

  const getDistributer = async () => {
    try {
      const res = await api.get(`distributers/${distributerId}`);
      return res.data;
    } catch (error) {
      console.log("Error");
    }
  };

  const {
    data: distributer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["distributerid"],
    queryFn: getDistributer,
  });

  if (isLoading || isError) {
    return <Loading />;
  }
  return (
    <div className="mx-10">
      <strong className="block text-xl mb-2">{distributer.name}</strong>
      <p className="text-gray-600">
        Coordinates: {distributer.location.coordinates.join(", ")}
      </p>
    </div>
  );
};

export default Distributer;
