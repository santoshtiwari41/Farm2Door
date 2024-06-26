import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartReducer";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const dispatch = useDispatch();
  const [addedToCartItems, setAddedToCartItems] = useState<{ [key: string]: boolean }>({});

  const addItemToCart = (item: Product) => {
    setAddedToCartItems((prevItems) => ({ ...prevItems, [item._id]: true }));
    dispatch(addToCart(item));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20, marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          margin: 0,
        }}
      >
        {products?.map((item, index) => (
          <Pressable
            style={{ marginHorizontal: 10, marginVertical: 25 }}
            key={index}
          >
            <Image
              source={{ uri: `${item.images[0]}` }}
              style={styles.productImage}
            />

            <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
              {item?.name}
            </Text>

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                ₹{item?.price}
              </Text>

            </View>

            <Pressable
              onPress={() => addItemToCart(item)}
              style={{
                backgroundColor: "#dddd",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              {
                addedToCartItems[item._id] ? (
                  <View>
                    <Text style={{ color: "#8b2ff5", fontWeight: "bold" }}>
                      Added to Cart
                    </Text>
                  </View>
                ) : (
                  <Text>Add to Cart</Text>
                )
              }
            </Pressable >
          </Pressable >
        ))}
      </View >
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {},
  productContainer: {
    flexDirection: "column",
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    width: 200,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    padding: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 14,
    color: "#555",
  },
});

export default ProductsList;
