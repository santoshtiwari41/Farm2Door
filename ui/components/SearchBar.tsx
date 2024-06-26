import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchFields}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Restaurants, groceries, dishes"
        />
      </View>
      <Link href={"/"} asChild>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={25} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchFields: {
    flex: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default SearchBar;
