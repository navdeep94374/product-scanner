import { useAuth } from "@/context/authProvider";
import { Redirect } from "expo-router";

export default function Index() {
  const { authInfo } = useAuth();
  if (authInfo.token) {
    return <Redirect href="/(main)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
