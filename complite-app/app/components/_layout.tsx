import { Stack } from "expo-router";

export default function ComponentLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="+not-found" />
      <Stack.Screen
        name="studSection"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="studLesson"
        options={{

        }}
      />
      <Stack.Screen
        name="studActivity"
        options={{

        }}
      />
    </Stack> 
  )
}
