import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/common/Header';
import Button from '@/components/common/Button';
import { Plus } from 'lucide-react-native';

export default function OrganizeScreen() {
  const router = useRouter();

  const handleCreateTournament = () => {
    router.push('/organize/create');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Organize" 
        showNotifications
        rightComponent={
          <Button
            title="Create"
            onPress={handleCreateTournament}
            style={styles.createButton}
            textStyle={styles.createButtonText}
            size="small"
          />
        }
      />
      <View style={styles.content}>
        <Text style={styles.title}>Your Tournaments</Text>
        {/* Tournament list will be added here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#6D28D9',
    paddingHorizontal: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
  },
});