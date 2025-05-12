import { Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { user } = useAuth();
  
  // If user is already authenticated, redirect to main app
  if (user) {
    return <Redirect href="/(app)" />;
  }
  
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#F9FAFB' }
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}