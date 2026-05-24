import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useApp } from "@/context/AppContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const { isAuth, user, logoutUser } = useApp();
  const router = useRouter();

  const firstLetter = user?.name?.charAt(0).toUpperCase();
  const isAdmin = user?.role === "admin";
  return (
    <ProtectedRoute isLoggedIn={isAuth}>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="flex-1 bg-gray-50 px-5">
        <Text className="text-3xl font-bold text-gray-900 mt-6 mb-8">
          Account
        </Text>

        <View className="bg-white rounded-3xl p-5 flex-row items-center mb-3 shadow-sm">
          <View className="h-14 w-14 rounded-2xl bg-sky-500 items-center justify-center">
            <Text className="text-white text-xl font-bold">{firstLetter}</Text>
          </View>

          <View className="ml-4 flex-1">
            <Text className="text-base font-semibold text-gray-900">
              {user?.name}
            </Text>
            <Text className="text-sm text-gray-400 mt-0.5">{user?.email}</Text>
          </View>

          {isAdmin && (
            <View className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-orange-500 text-xs font-bold">ADMIN</Text>
            </View>
          )}
        </View>
        <View className="bg-white rounded-3xl overflow-hidden mb-5 shadow-sm">
          <TouchableOpacity
            className="flex-row items-center px-5 py-4 border-b border-gray-100"
            onPress={() => router.push("/orders")}
          >
            <Text className="text-base items-center px-5 py-4">My Orders</Text>
            <Text className="text-gray-400 text-3xl mb-3">→</Text>
          </TouchableOpacity>

          {isAdmin && (
            <TouchableOpacity
              className="flex-row items-center px-5 py-4"
              onPress={() => router.push("/admin")}
            >
              <Text className="text-base items-center px-5 py-4">
                Admin Dashboard
              </Text>
              <Text className="text-gray-400 text-3xl mb-3">→</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={async () => {
            await logoutUser();
            router.replace("/login");
          }}
          className="bg-red-50 py-4 rounded-2xl"
        >
          <Text className="text-red-500 text-center font-semibold">Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
