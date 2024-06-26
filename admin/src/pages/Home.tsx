import CountDisplay from "@/components/count-chart";
import {
  Box,
  PersonStanding,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";

const Home = () => {
  const resourceEndpoints = [
    {
      endpoint: "customers",
      label: "Customers",
      description: "Total number of registered customers",
      Icon: PersonStanding,
    },
    {
      endpoint: "distributers",
      label: "Distributers",
      description: "Total number of registered distributers",
      Icon: Box,
    },
    {
      endpoint: "products",
      label: "Products",
      description: "Total number of registered products",
      Icon: ShoppingCart,
    },
    {
      endpoint: "orders",
      label: "Orders",
      description: "Total number of registered orders",
      Icon: ShoppingBasket, // You can change this icon as needed
    },
    {
      endpoint: "farmers",
      label: "Farmers",
      description: "Total number of registered farmers",
      Icon: User,
    },
  ];

  return (
    <section>
      <div className="grid sm:grid-cols-3 gap-4 m-4">
        {resourceEndpoints.map(({ endpoint, label, description, Icon }) => (
          <CountDisplay
            key={endpoint}
            endpoint={endpoint}
            label={label}
            description={description}
            Icon={Icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
