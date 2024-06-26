import { useState } from "react";
import { Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import api from "@/api";
import { useQuery } from "@tanstack/react-query";

interface SelectDistributerProps {
  onSelect: (selectedItem: { label: string; value: string } | null) => void;
}

const SelectDistributer: React.FC<SelectDistributerProps> = ({ onSelect }) => {
  const getDistributers = async () => {
    try {
      const res = await api.get("/distributers");
      return res.data;
    } catch (error) {
      console.log("Error while fetching distributers", error);
      return [];
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

  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(
    null
  );

  if (isLoading || isError) {
    return <Text>Loading...</Text>;
  }

  const pickerItems = distributers.map((distributor: any) => ({
    label: distributor.name,
    value: distributor._id,
  }));

  return (
    <RNPickerSelect
      placeholder={{
        label: "Select your distributor",
        value: null,
        color: "green",
        
      }}
      onValueChange={(value) => {
        setSelectedDistributor(value);
        onSelect &&
          onSelect(
            pickerItems.find((item: any) => item.value === value) || null
          );
      }}
      items={pickerItems}
      value={selectedDistributor}
    />
  );
};

export default SelectDistributer;
