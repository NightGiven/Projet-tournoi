import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Lock, Mail } from 'lucide-react-native';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const success = await signIn(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setIsLoading(true);
    let email = '';
    
    switch (role) {
      case 'player':
        email = 'player@example.com';
        break;
      case 'team_manager':
        email = 'team@example.com';
        break;
      case 'organizer':
        email = 'organizer@example.com';
        break;
      case 'admin':
        email = 'admin@example.com';
        break;
      default:
        email = 'player@example.com';
    }
    
    try {
      await signIn(email, 'password123');
    } catch (err) {
      setError('An error occurred during demo login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg' }}
            style={styles.logo}
          />
          <Text style={styles.appName}>E-Sports Tournaments</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.inputContainer}>
            <Mail size={20} color="#6B7280" style={styles.inputIcon} />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              containerStyle={styles.inputWrapper}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color="#6B7280" style={styles.inputIcon} />
            <Input
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              containerStyle={styles.inputWrapper}
            />
          </View>
          
          <Button 
            title="Login" 
            onPress={handleLogin} 
            loading={isLoading} 
            style={styles.loginButton}
          />
          
          <Text style={styles.orText}>or</Text>
          
          <View style={styles.demoContainer}>
            <Text style={styles.demoText}>Try Demo Accounts:</Text>
            <View style={styles.demoButtons}>
              <Button
                title="Player"
                onPress={() => handleDemoLogin('player')}
                variant="outline"
                size="small"
                style={styles.demoButton}
                disabled={isLoading}
              />
              <Button
                title="Team"
                onPress={() => handleDemoLogin('team_manager')}
                variant="outline"
                size="small"
                style={styles.demoButton}
                disabled={isLoading}
              />
              <Button
                title="Organizer"
                onPress={() => handleDemoLogin('organizer')}
                variant="outline"
                size="small"
                style={styles.demoButton}
                disabled={isLoading}
              />
              <Button
                title="Admin"
                onPress={() => handleDemoLogin('admin')}
                variant="outline"
                size="small"
                style={styles.demoButton}
                disabled={isLoading}
              />
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    marginBottom: 0,
  },
  input: {
    flex: 1,
  },
  loginButton: {
    marginTop: 16,
  },
  orText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginVertical: 16,
  },
  demoContainer: {
    marginTop: 8,
  },
  demoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  demoButton: {
    marginHorizontal: 4,
    minWidth: 70,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  registerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6D28D9',
  },
});