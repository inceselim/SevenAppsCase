import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/global.css";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="video/[id]" />
          <Stack.Screen name="video/edit/[id]" />
          <Stack.Screen
            name="modal/crop"
            options={{
              presentation: "modal",
            }}
          />Bilbo Ayrikvadiyi geziyor
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}