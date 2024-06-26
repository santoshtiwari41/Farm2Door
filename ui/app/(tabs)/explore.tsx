import { useState } from "react";
import { Text ,View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import Distributers from "@/components/Distributers";
import { setSelectedDistributor } from '../../redux/distributorSlice';
import SelectDistributer from "@/components/SelectDistributer";

interface Distributor {
  label: string;
  value: string;
}

const Explore: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedDistributor, setSelectedDistributors] =
    useState<Distributor | null>(null);

  const handleDistributorSelect = (selectedItem: Distributor | null) => {
   dispatch(setSelectedDistributor(selectedItem))
    setSelectedDistributors(selectedItem);
    console.log(selectedItem);
  };

  return (
    <SafeAreaView style={{paddingTop:20}}>
      <View style={{borderColor:'black',borderWidth:0.2,margin:5,borderRadius:4}}><SelectDistributer onSelect={handleDistributorSelect} /></View>
      
      <Text style={{fontSize:15,margin:10,fontWeight:'bold'}}>Selected Distributor: {selectedDistributor?.label}</Text>
      <Distributers />
    </SafeAreaView>
  );
};

export default Explore;