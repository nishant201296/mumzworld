import { Colors } from "@/app/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps {
  historyItems: string[];
  onSearchClick: (searchText: string) => void;
  onTextChange: (searchText: string) => void;
  onClearHistory: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  historyItems,
  onSearchClick,
  onTextChange,
  onClearHistory,
}) => {
  const [searchText, setSearchText] = useState("");

  const clearSearch = () => {
    setSearchText("");
    onTextChange("");
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchText(item);
    onSearchClick(item);
  };

  const handleSearch = () => {
    onSearchClick(searchText);
  };

  const onChangeText = (item: string) => {
    setSearchText(item);
    onTextChange(item);
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
          textAlign={I18nManager.isRTL ? "right" : "left"}
          style={styles.input}
          placeholder={"What are you looking for"}
          value={searchText}
          placeholderTextColor={Colors.semantic_fg_text_weak.color}
          onChangeText={onChangeText}
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
    backgroundColor: Colors.semantic_bg_white.color,
    borderRadius: 10,
    padding: 10,
    shadowColor: Colors.black.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.semantic_bg_muted.color,
  },
  historyContainer: {
    margin: 10,
  },
  historyItemContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.semantic_bg_muted.color,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: Colors.semantic_fg_text.color,
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
