import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { LogOut, User, Shield, Mail, Calendar, CreditCard as Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  
  const handleSignOut = () => {
    if (Platform.OS === 'web') {
      const confirmLogout = confirm('Are you sure you want to sign out?');
      if (confirmLogout) {
        signOut();
      }
    } else {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            onPress: () => signOut(),
            style: 'destructive',
          },
        ]
      );
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'player':
        return 'Player';
      case 'team_manager':
        return 'Team Manager';
      case 'organizer':
        return 'Tournament Organizer';
      case 'admin':
        return 'Administrator';
      default:
        return 'Player';
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Profile" showNotifications />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit2 size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user?.username}</Text>
            <View style={styles.roleBadge}>
              <Shield size={14} color="#6D28D9" />
              <Text style={styles.roleText}>{getRoleLabel(user?.role || 'player')}</Text>
            </View>
          </View>
        </View>
        
        <Card variant="elevated" style={styles.infoCard}>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Mail size={20} color="#6B7280" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <User size={20} color="#6B7280" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Username</Text>
                <Text style={styles.infoValue}>{user?.username}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <Calendar size={20} color="#6B7280" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Joined</Text>
                <Text style={styles.infoValue}>{formatDate(user?.createdAt || new Date())}</Text>
              </View>
            </View>
          </View>
          
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={() => {}}
            style={styles.editButton}
          />
        </Card>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <User size={20} color="#1F2937" />
            <Text style={styles.menuItemText}>Personal Information</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="#1F2937" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Mail size={20} color="#1F2937" />
            <Text style={styles.menuItemText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        
        <Button 
          title="Sign Out" 
          variant="outline" 
          onPress={handleSignOut}
          style={styles.signOutButton}
          textStyle={styles.signOutText}
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
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  roleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6D28D9',
    marginLeft: 4,
  },
  infoCard: {
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  editButton: {
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  signOutButton: {
    borderColor: '#EF4444',
  },
  signOutText: {
    color: '#EF4444',
  },
});