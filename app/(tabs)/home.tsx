import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useApp } from "@/context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/ProductCard";

export default function HomeScreen() {
  const {
    products,
    isAuth,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    setSortByPrice,
    addToCart,
  } = useApp();
  return (
    <SafeAreaView>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        ListHeaderComponent={
          <View>
            <Text className="text-2xl font-bold text-gray-900 mt-4 mb-4">
              Discover 📔
            </Text>

            <View className="bg-white flex-row items-center border border-gray-200 rounded-2xl px-4 mb-4 shadow-sm">
              <Text className="text-gray-400 mr-2">🔍</Text>
              <TextInput
                placeholder="search Products..."
                value={search}
                onChangeText={setSearch}
                className="flex-1 py-3 text-gray-800 "
                placeholderTextColor={"#9ca3af"}
              />
            </View>
            <FlatList
              data={["All", ...categories]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setCategory(item === "All" ? "" : item)}
                  className={`px-4 py-2 mr-2 rounded-full border ${
                    category === (item === "All" ? "" : item)
                      ? "bg-sky-500 border-sky-500"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      category === (item === "All" ? "" : item)
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              className="mb-4"
            />

            {/* sort */}
            <View className="flex-row mb-4 gap-2">
              {[
                ["lowToHigh", "⬆️ Low to High"],
                ["hightToLow", "⬆️ High to Low"],
              ].map(([val, label]) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setSortByPrice(val as any)}
                  className="flex-1 bg-white border border-gray-200 py-2.5 rounded-xl shadow-sm"
                >
                  <Text className="text-center text-sm text-gray-700 font-medium">
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard item={item} isAuth={isAuth} addToCart={addToCart} />
        )}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
      />
    </SafeAreaView>
  );
}
