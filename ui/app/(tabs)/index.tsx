import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import list from '../../assets/data/list'
import images from '../../assets/data/images'
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from "@expo/vector-icons";
import api from "@/api";
import ProductsList from "@/components/products/ProductList";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
// import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

const Home = () => {
  const [selectedAddress, setSelectedAdress] = useState("");
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading || isError) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            // backgroundColor: "#AFEEEE",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />

          <Pressable>
            {selectedAddress ? (
              <Text>
                Deliver to {selectedAddress?.name} - {selectedAddress?.street}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Add a Address
              </Text>
            )}
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{
                margin: 10,
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 52, height: 52, resizeMode: "contain", borderRadius: 26 }}
                source={item.image}
              />

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor="#90A4AE"
          ImageComponentStyle={{ width: "100%" }}
        />
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        {products.length > 0 && <ProductsList products={products} />}
      </ScrollView>

    </SafeAreaView>
    {/* <BottomModal
    onBackdropPress={() => setModalVisible(!modalVisible)}
    swipeDirection={["up", "down"]}
    swipeThreshold={200}
    modalAnimation={
      new SlideAnimation({
        slideFrom: "bottom",
      })
    }
    onHardwareBackPress={() => setModalVisible(!modalVisible)}
    visible={modalVisible}
    onTouchOutside={() => setModalVisible(!modalVisible)}
  >
    <ModalContent style={{ width: "100%", height: 400 }}>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Choose your Location
        </Text>

        <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
          Select a delivery location to see product availabilty and delivery
          options
        </Text>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
          navigation.navigate("Address");
        }}
        style={{
          width: 140,
          height: 140,
          borderColor: "#D0D0D0",
          marginTop: 10,
          borderWidth: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#0066b2",
            fontWeight: "500",
          }}
        >
          Add an Address or pick-up point
        </Text>
      </Pressable>
      <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <Entypo name="location-pin" size={22} color="#0066b2" />
          <Text style={{ color: "#0066b2", fontWeight: "400" }}>
            Enter an  pincode
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <Ionicons name="locate-sharp" size={22} color="#0066b2" />
          <Text style={{ color: "#0066b2", fontWeight: "400" }}>
            Use My Currect location
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <AntDesign name="earth" size={22} color="#0066b2" />


        </View>
      </View>
    </ModalContent>
  </BottomModal> */}
    </>
    
  );
};

export default Home;

const styles = StyleSheet.create({});
