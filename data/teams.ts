import { Team } from '@/types';

export const TEAMS: Team[] = [
  {
    id: 'team-1',
    name: 'Phoenix Risers',
    logo: 'https://images.pexels.com/photos/6542325/pexels-photo-6542325.jpeg?auto=compress',
    ownerId: '2', // User ID of team manager
    members: ['2', '5', '6', '7', '8'],
    pendingInvites: ['9', '10'],
    tournaments: ['tour-001', 'tour-002'],
    createdAt: new Date(Date.now() - 120 * 86400000), // 120 days ago
  },
  {
    id: 'team-2',
    name: 'Digital Dragons',
    logo: 'https://images.pexels.com/photos/5915200/pexels-photo-5915200.jpeg?auto=compress',
    ownerId: '11',
    members: ['11', '12', '13', '14', '15'],
    pendingInvites: [],
    tournaments: ['tour-001', 'tour-004'],
    createdAt: new Date(Date.now() - 90 * 86400000), // 90 days ago
  },
  {
    id: 'team-3',
    name: 'Velocity Vipers',
    logo: 'https://images.pexels.com/photos/844573/pexels-photo-844573.jpeg?auto=compress',
    ownerId: '16',
    members: ['16', '17', '18', '19', '20'],
    pendingInvites: ['21'],
    tournaments: ['tour-001', 'tour-004'],
    createdAt: new Date(Date.now() - 75 * 86400000), // 75 days ago
  },
  {
    id: 'team-4',
    name: 'Tactical Titans',
    logo: 'https://images.pexels.com/photos/13440140/pexels-photo-13440140.jpeg?auto=compress',
    ownerId: '22',
    members: ['22', '23', '24', '25', '26'],
    pendingInvites: [],
    tournaments: ['tour-002'],
    createdAt: new Date(Date.now() - 60 * 86400000), // 60 days ago
  },
  {
    id: 'team-5',
    name: 'Voltage Warriors',
    logo: 'https://images.pexels.com/photos/11117169/pexels-photo-11117169.jpeg?auto=compress',
    ownerId: '27',
    members: ['27', '28', '29', '30', '31'],
    pendingInvites: ['32'],
    tournaments: ['tour-002'],
    createdAt: new Date(Date.now() - 45 * 86400000), // 45 days ago
  },
];