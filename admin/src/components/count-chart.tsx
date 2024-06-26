import { useQuery } from "@tanstack/react-query";

import api from "@/api";
import Loading from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const getCountQuery = async (endpoint: string) => {
  try {
    const res = await api.get(`${endpoint}/count`);
    return res.data.count;
  } catch (error: any) {
    console.log(`Error fetching ${endpoint} count:`, error.message);
    throw error;
  }
};

const CountDisplay = ({
  endpoint,
  label,
  description,
  Icon,
}: {
  endpoint: string;
  label: string;
  description: string;
  Icon?: any;
}) => {
  const {
    data: count,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`${endpoint}-count`],
    queryFn: () => getCountQuery(`/${endpoint}`),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading {label} count</div>;
  }

  return (
    <Card className="hover:scale-105 transistion duration-300 ease-in-out cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total {label}</CardTitle>
        {Icon && <Icon className="h-6 w-6" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CountDisplay;
