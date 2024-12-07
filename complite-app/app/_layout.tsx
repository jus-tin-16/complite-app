import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFAFA',
      },
      headerShadowVisible: true,
      headerTintColor: '#0D4DD6',
      headerShown: false,
    }}
    >
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="index" options={{ headerShown : false}} />
      <Stack.Screen name="(tabs1)" options={{ headerShown : false}} />
    </Stack> 
  )
}
