import { useAuth } from "@/context/authProvider";
import { Redirect, Stack, Tabs, } from "expo-router";
import { CircleUserRound, House } from "lucide-react-native";
import React from "react";
import { View,Text } from "react-native";

const MainTabs = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index"  options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
           <View className="flex flex-row gap-1 align-center mt-2 w-full">
             <House color={focused ? "blue" : "#000"} size={25}/>
           </View>
          ),
          tabBarShowLabel:false
        }} />
      <Tabs.Screen name="profile" options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
           <View className="flex flex-row gap-1 align-center mt-2 w-full">
             <CircleUserRound  color={focused ? "blue" : "#000"} size={25}/>
           </View>
          ),
          tabBarShowLabel:false
        }} />
    </Tabs>
  );
};

export default function MainLayout() {
  const { authInfo } = useAuth();

  if (!authInfo.token) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return <MainTabs />;
}
