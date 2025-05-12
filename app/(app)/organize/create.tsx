import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Picker } from '@/components/common/Picker';

const GAMES = [
  { label: 'Valorant', value: 'valorant' },
  { label: 'League of Legends', value: 'lol' },
];

const TOURNAMENT_TYPES = [
  { label: 'Single Elimination', value: 'single' },
  { label: 'Double Elimination', value: 'double' },
];

const RULES = [
  { label: '2v2', value: '2v2' },
  { label: '4v4', value: '4v4' },
  { label: '5v5', value: '5v5' },
];

export default function CreateTournamentScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [type, setType] = useState('');
  const [rules, setRules] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleValidate = async () => {
    if (!name || !game || !type || !rules) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement tournament creation logic
      router.back();
    } catch (err) {
      setError('Failed to create tournament');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Create Tournament" 
        showBack
      />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        <View style={styles.organizerInfo}>
          <Text style={styles.organizerLabel}>Organizer</Text>
          <Text style={styles.organizerName}>{user?.username}</Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Input
          label="Tournament Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter tournament name"
        />

        <Picker
          label="Game"
          selectedValue={game}
          onValueChange={setGame}
          items={GAMES}
        />

        <Picker
          label="Tournament Type"
          selectedValue={type}
          onValueChange={setType}
          items={TOURNAMENT_TYPES}
        />

        <Picker
          label="Rules"
          selectedValue={rules}
          onValueChange={setRules}
          items={RULES}
        />

        <Button
          title="Create Tournament"
          onPress={handleValidate}
          loading={isLoading}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  organizerInfo: {
    marginBottom: 24,
  },
  organizerLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  organizerName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
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
  submitButton: {
    marginTop: 24,
  },
});