import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '@/components/common/Header';
import TournamentCard from '@/components/common/TournamentCard';
import { TOURNAMENTS } from '@/data/tournaments';
import { Search, Trophy, Calendar, MoveHorizontal as MoreHorizontal, Plus } from 'lucide-react-native';
import Input from '@/components/common/Input';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

type FilterStatus = 'all' | 'upcoming' | 'ongoing' | 'completed';

export default function TournamentsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  
  const isOrganizer = user?.role === 'organizer' || user?.role === 'admin';
  
  const filteredTournaments = TOURNAMENTS.filter(tournament => {
    // Filter by status
    if (activeFilter !== 'all' && tournament.status !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      return tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });
  
  const handleCreateTournament = () => {
    router.push('/organize');
  };
  
  return (
    <View style={styles.container}>
      <Header 
        title="Tournaments" 
        showNotifications
        rightComponent={isOrganizer ? (
          <TouchableOpacity onPress={handleCreateTournament} style={styles.createButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : undefined}
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <Input
            placeholder="Search tournaments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.searchInputWrapper}
            style={styles.searchInput}
          />
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
            onPress={() => setActiveFilter('all')}
          >
            <MoreHorizontal size={16} color={activeFilter === 'all' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'upcoming' && styles.activeFilter]}
            onPress={() => setActiveFilter('upcoming')}
          >
            <Calendar size={16} color={activeFilter === 'upcoming' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.filterText, activeFilter === 'upcoming' && styles.activeFilterText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'ongoing' && styles.activeFilter]}
            onPress={() => setActiveFilter('ongoing')}
          >
            <Trophy size={16} color={activeFilter === 'ongoing' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.filterText, activeFilter === 'ongoing' && styles.activeFilterText]}>
              Ongoing
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'completed' && styles.activeFilter]}
            onPress={() => setActiveFilter('completed')}
          >
            <Trophy size={16} color={activeFilter === 'completed' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.filterText, activeFilter === 'completed' && styles.activeFilterText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Trophy size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No tournaments found</Text>
            <Text style={styles.emptyDescription}>
              {searchQuery 
                ? "We couldn't find any tournaments matching your search." 
                : "There are no tournaments available at the moment."}
            </Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputWrapper: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: '#F3F4F6',
  },
  activeFilter: {
    backgroundColor: '#6D28D9',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#4B5563',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});