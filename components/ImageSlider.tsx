import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import PRODUCT1 from "@/assets/images/product-1.jpg";
import PRODUCT2 from "@/assets/images/product-2.jpg";
import PRODUCT3 from "@/assets/images/product-3.jpg";

const images = [
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// const images = [PRODUCT1, PRODUCT2, PRODUCT3];

const ImageSlider = () => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex((prev) => {
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, []);

  

  return (
    <View className="bg-[#e4eef8] p-1 rounded-xl items-center">
      <Image
        source={{ uri: images[imgIndex] }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};

export default React.memo(ImageSlider);
