import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import TournamentCard from '@/components/common/TournamentCard';
import { useRouter } from 'expo-router';
import { TOURNAMENTS } from '@/data/tournaments';
import { TEAMS } from '@/data/teams';
import { Calendar, Trophy, Users } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Get upcoming tournaments (limit to 3 for display)
  const upcomingTournaments = TOURNAMENTS
    .filter((tournament) => tournament.status === 'upcoming')
    .slice(0, 3);
  
  // Get ongoing tournaments (limit to 3 for display)
  const ongoingTournaments = TOURNAMENTS
    .filter((tournament) => tournament.status === 'ongoing')
    .slice(0, 3);
  
  // Get user's teams if any
  const userTeams = TEAMS.filter((team) => team.members.includes(user?.id || ''));
  
  const navigateToTournaments = () => {
    router.push('/tournaments');
  };
  
  const navigateToTeams = () => {
    router.push('/teams');
  };
  
  return (
    <View style={styles.container}>
      <Header 
        title="Dashboard" 
        showNotifications 
        onNotificationsPress={() => {}} 
      />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Image
            source={{ uri: user?.avatar || 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg' }}
            style={styles.avatar}
          />
          <View style={styles.welcomeText}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>{user?.username}</Text>
          </View>
        </View>
        
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card variant="elevated" style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Trophy size={24} color="#6D28D9" />
            </View>
            <Text style={styles.statTitle}>Tournaments</Text>
            <Text style={styles.statValue}>
              {TOURNAMENTS.filter(t => 
                (t.format === 'solo' && t.participants.includes(user?.id || '')) ||
                (t.format === 'team' && userTeams.some(team => 
                  t.participants.includes(team.id)
                ))
              ).length}
            </Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={24} color="#2563EB" />
            </View>
            <Text style={styles.statTitle}>Teams</Text>
            <Text style={styles.statValue}>{userTeams.length}</Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Calendar size={24} color="#10B981" />
            </View>
            <Text style={styles.statTitle}>Upcoming</Text>
            <Text style={styles.statValue}>{upcomingTournaments.length}</Text>
          </Card>
        </View>
        
        {/* Ongoing Tournaments */}
        {ongoingTournaments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ongoing Tournaments</Text>
              <TouchableOpacity onPress={navigateToTournaments}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {ongoingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </View>
        )}
        
        {/* Upcoming Tournaments */}
        {upcomingTournaments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Tournaments</Text>
              <TouchableOpacity onPress={navigateToTournaments}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {upcomingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </View>
        )}
        
        {/* Your Teams */}
        {userTeams.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Teams</Text>
              <TouchableOpacity onPress={navigateToTeams}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {userTeams.map((team) => (
              <TouchableOpacity 
                key={team.id} 
                onPress={() => router.push(`/teams/${team.id}`)}
                activeOpacity={0.8}
              >
                <Card variant="elevated" style={styles.teamCard}>
                  <Image
                    source={{ uri: team.logo }}
                    style={styles.teamLogo}
                  />
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{team.name}</Text>
                    <Text style={styles.teamMembers}>
                      {team.members.length} {team.members.length === 1 ? 'Member' : 'Members'}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Card variant="outlined" style={styles.emptyTeamCard}>
              <Text style={styles.emptyTeamTitle}>No Teams Yet</Text>
              <Text style={styles.emptyTeamText}>
                Join or create a team to participate in team tournaments
              </Text>
              <Button
                title="Explore Teams"
                onPress={navigateToTeams}
                style={styles.exploreButton}
              />
            </Card>
          </View>
        )}
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
    paddingBottom: 32,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6D28D9',
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  teamMembers: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emptyTeamCard: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTeamTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyTeamText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  exploreButton: {
    minWidth: 150,
  },
});