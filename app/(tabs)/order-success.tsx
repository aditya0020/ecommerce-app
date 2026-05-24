import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccessScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
      <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-6">
        <Text className="text-5xl">✅</Text>
      </View>
      <Text className="text-gray-400 text-center mb-8">
        Your order has been placed successfully. we'll deliver it soon!
      </Text>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/home")}
        className="bg-blue-500 py-4 rounded-2xl w-full mb-3"
      >
        <Text className="text-white text-center font-semibold">
          Continue Shopping
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/orders")}
        className="bg-orange-500 py-4 rounded-2xl w-full"
      >
        <Text className="text-white text-center font-semibold">
          View my Orders
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
