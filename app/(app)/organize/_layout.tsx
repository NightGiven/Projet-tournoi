import { Stack } from 'expo-router';

export default function OrganizeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="create" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}