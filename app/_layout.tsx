import { Slot, Redirect } from "expo-router";
import { SessionProvider, useAuth } from "../context/authProvider";
import "../global.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



export default function Root() {
  const query = new QueryClient()
  return (
    <QueryClientProvider client={query}>
    <SessionProvider>
      <Slot />
     
    </SessionProvider>
    </QueryClientProvider>
  );
}
