// Avatar.js
import React from "react";
import { View, Text, Image } from "react-native";

const Avatar = ({ name, email }: { name?: string; email?: string }) => {
  // Generate initials from name or email
  const getInitials = (nameOrEmail: string) => {
    if (!nameOrEmail) return "";
    const parts = nameOrEmail.split(" ");
    if (parts.length > 1) {
      return parts[0][0] + parts[1][0];
    }
    return nameOrEmail[0] + nameOrEmail.split("@")[0][1]; // For email
  };

  const initials = getInitials(name || email || "Unknown");

  return (
    <View
      className="flex-row items-center"
      style={{ backgroundColor: "black", borderRadius: 100, padding: 10 }}
    >
      <Text className="text-white text-sm font-bold">
        {initials.toUpperCase()}
      </Text>
    </View>
  );
};

export default Avatar;
