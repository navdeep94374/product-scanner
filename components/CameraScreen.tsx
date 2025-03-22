import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Aperture, SwitchCamera } from "lucide-react-native";
import { PropsWithChildren, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View,Image, Button } from "react-native";

type Props = PropsWithChildren<{
  onClose: () => void;
}>;


export default function CameraScreen({onClose}:Props) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 flex justify-center items-center gap-2 w-full">
        <Text className="text-center pb-2 text-white text-lg">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity className="w-[55%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" onPress={requestPermission}>
            <Text className="text-white text-center text-lg">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    setUri(photo?.uri!)
  };

  const analyzePicture = ()=>{
    setUri(null);
    onClose();
    router.push("/(main)/profile")
  }

  const renderCamera = ()=>{
    return   <CameraView className="flex-1 h-full" facing={facing} style={{height:"100%"}} ref={cameraRef}>
    <View className="flex-1 flex-row bg-transparent mx-16 mb-16 justify-center gap-5">
      <TouchableOpacity
        className="flex items-center self-end bg-black rounded-full p-4 opacity-70"
        onPress={toggleCameraFacing}
      >
       <SwitchCamera color={"#fff"} size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        className="flex items-center self-end bg-black rounded-full p-4 opacity-70"
        onPress={takePicture}
      >
       <Aperture  color={"#fff"} size={30} />
      </TouchableOpacity>
    </View>
  </CameraView>
  }

  const renderPicture = () => {
    return (
      <View className="flex-1 h-full">
        <Image
          source={{ uri:uri! }}
          resizeMode="cover"
         className="w-full h-full"
        />
        
        <View className="flex flex-row justify-between relative bottom-[10%]">
        <TouchableOpacity className=" w-[45%] mx-auto bg-black opacity-75 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" onPress={() => setUri(null)}><Text className="text-center text-white">Take another picture</Text></TouchableOpacity>
        <TouchableOpacity className=" w-[45%] mx-auto bg-black opacity-75 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" onPress={analyzePicture}><Text className="text-center text-white">Analyze</Text></TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center h-full">
     {uri ? renderPicture() : renderCamera()}
    </View>
  );
}
