import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Tournament } from '@/types';
import { Calendar, Users, Trophy } from 'lucide-react-native';
import Card from './Card';

// Game images mapping
const gameImages: Record<string, string> = {
  'League of Legends': 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
  'Counter-Strike': 'https://images.pexels.com/photos/7915527/pexels-photo-7915527.jpeg',
  'Fortnite': 'https://images.pexels.com/photos/6499007/pexels-photo-6499007.jpeg',
  'Valorant': 'https://images.pexels.com/photos/4009598/pexels-photo-4009598.jpeg',
  'default': 'https://images.pexels.com/photos/7862657/pexels-photo-7862657.jpeg',
};

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const router = useRouter();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#10B981'; // Green
      case 'ongoing':
        return '#F59E0B'; // Amber
      case 'completed':
        return '#6B7280'; // Gray
      case 'cancelled':
        return '#EF4444'; // Red
      default:
        return '#6B7280';
    }
  };
  
  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const handlePress = () => {
    router.push(`/tournaments/${tournament.id}`);
  };
  
  const gameImage = gameImages[tournament.game] || gameImages.default;
  
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Card variant="elevated" style={styles.card}>
        <Image
          source={{ uri: gameImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.statusBadge}>
          <Text style={[
            styles.statusText, 
            { color: getStatusColor(tournament.status) }
          ]}>
            {getStatusLabel(tournament.status)}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{tournament.name}</Text>
          <Text style={styles.game}>{tournament.game}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.infoText}>
                {formatDate(tournament.startDate)}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Users size={16} color="#6B7280" />
              <Text style={styles.infoText}>
                {tournament.currentParticipants}/{tournament.maxParticipants}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Trophy size={16} color="#6B7280" />
              <Text style={styles.infoText}>
                {tournament.format === 'solo' ? 'Solo' : 'Team'}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 140,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  game: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});

export default TournamentCard;