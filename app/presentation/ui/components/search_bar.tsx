import { Colors } from "@/app/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

interface SearchBarProps {
  historyItems: string[];
  onSearch: (searchText: string) => void;
  onClearHistory: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  historyItems,
  onSearch,
  onClearHistory,
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

  const renderHistory = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleHistoryItemPress(item)}>
      <View style={styles.historyItemContainer}>
        <Ionicons name="time-outline" size={20} />
        <Text style={styles.historyItem}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item: string, index: number) => `${item}-${index}`;

  const shouldShowClearHistory = () => historyItems.length > 0 && !searchText;

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={"What are you looking for"}
          value={searchText}
          placeholderTextColor={Colors.semantic_fg_text_weak.color}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity
            onPress={clearSearch}
            style={styles.clearSearchButton}
          >
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity disabled={!searchText} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      {!searchText && (
        <FlatList
          style={styles.historyContainer}
          data={historyItems}
          keyExtractor={keyExtractor}
          renderItem={renderHistory}
        />
      )}

      {shouldShowClearHistory() && (
        <Pressable onPress={onClearHistory}>
          <Text style={styles.clearHistory}>{`Clear history`}</Text>
        </Pressable>
      )}
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
    borderColor: "#ddd",
  },
  historyContainer: {
    margin: 10,
  },
  historyItemContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: "#333",
  },
  clearSearchButton: {
    marginRight: 8,
  },
  historyItem: {
    padding: 10,
    color: Colors.semantic_fg_text_weak.color,
  },
  clearHistory: {
    position: "absolute",
    paddingHorizontal: 10,
    color: Colors.semantic_fg_error.color,
  },
});
