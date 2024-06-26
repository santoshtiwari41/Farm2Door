import {
  StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image, FlatList
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import data from "../assets/data/ProductData.js";
import offers from "../assets/data/Offers.js";
import list from "../assets/data/List.js";
import images from "../assets/data/Images.js";
import deals from "../assets/data/Deals.js";
import ProductItem from "../components/ProductItem.js"
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState("fruits");
  const [selectedAddress, setSelectedAdress] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Fruits", value: "fruits" },
    { label: "Stem", value: "Stem" },
    { label: "Leaves", value: "Leaves" },
    { label: "Roots", value: "Roots" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: 40,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>

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


          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("ProductInfo", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{

                  margin: 25,
                  marginVertical: 4,
                  height: 120,
                  width: 150,
                  padding: 20,
                  borderRadius: 10

                }}
              >
                <Image
                  style={{ width: 110, height: 90, }}
                  source={item?.image}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("ProductInfo", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={item?.image}
                />

                <View
                  style={{
                    backgroundColor: "#eeee",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      // color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
              marginBottom: 15
            }}
          />
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
              width: open ? 100 : 100
            }}
            open={open}
            value={category} //genderValue
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"


            // onChangeValue={onChange}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>

        </ScrollView>
      </SafeAreaView>
      <BottomModal
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
      </BottomModal>
    </>
  )
}
export default HomeScreen;