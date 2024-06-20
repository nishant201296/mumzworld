import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface SearchBarProps {
  historyItems: string[];
  onSearch: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  historyItems,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");

  const clearSearch = () => {
    setSearchText("");
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchText(item);
    onSearch(item);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={"What are you looking for"}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={historyItems}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHistoryItemPress(item)}>
            <Text style={styles.historyItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd", // Light grey border color
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    marginRight: 8,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
