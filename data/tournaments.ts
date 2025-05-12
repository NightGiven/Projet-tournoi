import { Tournament, Match, Prize } from '@/types';

// Helper function to create tournament matches
const createMatches = (tournamentId: string, numMatches: number): Match[] => {
  const matches: Match[] = [];
  
  for (let i = 1; i <= numMatches; i++) {
    matches.push({
      id: `${tournamentId}-match-${i}`,
      tournamentId,
      round: Math.ceil(i / 2),
      participant1: i % 3 === 0 ? '' : `player-${i * 2 - 1}`,
      participant2: i % 4 === 0 ? '' : `player-${i * 2}`,
      score1: i % 2 === 0 ? 3 : 0,
      score2: i % 2 === 0 ? 1 : 0,
      status: i <= numMatches / 2 ? 'completed' : i <= numMatches * 0.75 ? 'in_progress' : 'scheduled',
      winner: i % 2 === 0 ? `player-${i * 2 - 1}` : null,
      startTime: new Date(Date.now() + i * 86400000), // Each match one day apart
      reportedCheating: i % 7 === 0,
    });
  }
  
  return matches;
};

// Helper function to create prizes
const createPrizes = (positions: number): Prize[] => {
  const prizes: Prize[] = [];
  
  for (let i = 1; i <= positions; i++) {
    const value = i === 1 ? 5000 : i === 2 ? 2500 : i === 3 ? 1000 : 500;
    
    prizes.push({
      position: i,
      description: i === 1 ? 'First Place' : i === 2 ? 'Second Place' : i === 3 ? 'Third Place' : `Top ${i}`,
      value,
    });
  }
  
  return prizes;
};

// Create mock tournament data
export const TOURNAMENTS: Tournament[] = [
  {
    id: 'tour-001',
    name: 'Summer Championship',
    description: 'The ultimate test of skill for League of Legends players.',
    game: 'League of Legends',
    format: 'team',
    maxParticipants: 16,
    currentParticipants: 14,
    registrationDeadline: new Date(Date.now() + 7 * 86400000), // 7 days from now
    startDate: new Date(Date.now() + 14 * 86400000), // 14 days from now
    endDate: new Date(Date.now() + 16 * 86400000), // 16 days from now
    status: 'upcoming',
    organizer: '3', // Organizer user ID
    participants: ['team-1', 'team-2', 'team-3'], // Team IDs
    matches: createMatches('tour-001', 8),
    rules: 'Standard tournament rules apply. Best of 3 matches, double elimination.',
    prizes: createPrizes(3),
    createdAt: new Date(Date.now() - 30 * 86400000), // 30 days ago
  },
  {
    id: 'tour-002',
    name: 'Pro CS Tournament',
    description: 'Counter-Strike tournament for elite players.',
    game: 'Counter-Strike',
    format: 'team',
    maxParticipants: 8,
    currentParticipants: 8,
    registrationDeadline: new Date(Date.now() - 5 * 86400000), // 5 days ago
    startDate: new Date(Date.now() - 2 * 86400000), // 2 days ago
    endDate: new Date(Date.now() + 3 * 86400000), // 3 days from now
    status: 'ongoing',
    organizer: '3', // Organizer user ID
    participants: ['team-1', 'team-4', 'team-5', 'team-6'], // Team IDs
    matches: createMatches('tour-002', 12),
    rules: 'Standard competitive maps, knife round for side selection.',
    prizes: createPrizes(4),
    createdAt: new Date(Date.now() - 45 * 86400000), // 45 days ago
  },
  {
    id: 'tour-003',
    name: 'Fortnite Solo Cup',
    description: 'Battle royale tournament for solo players.',
    game: 'Fortnite',
    format: 'solo',
    maxParticipants: 100,
    currentParticipants: 76,
    registrationDeadline: new Date(Date.now() + 3 * 86400000), // 3 days from now
    startDate: new Date(Date.now() + 10 * 86400000), // 10 days from now
    endDate: new Date(Date.now() + 10 * 86400000), // Same day tournament
    status: 'upcoming',
    organizer: '3', // Organizer user ID
    participants: ['1', '5', '6', '7', '8'], // User IDs
    matches: createMatches('tour-003', 4),
    rules: 'Points system based on eliminations and placement.',
    prizes: createPrizes(5),
    createdAt: new Date(Date.now() - 15 * 86400000), // 15 days ago
  },
  {
    id: 'tour-004',
    name: 'Valorant Invitational',
    description: 'Exclusive tournament for top Valorant teams.',
    game: 'Valorant',
    format: 'team',
    maxParticipants: 12,
    currentParticipants: 12,
    registrationDeadline: new Date(Date.now() - 10 * 86400000), // 10 days ago
    startDate: new Date(Date.now() - 5 * 86400000), // 5 days ago
    endDate: new Date(Date.now() - 2 * 86400000), // 2 days ago
    status: 'completed',
    organizer: '3', // Organizer user ID
    participants: ['team-2', 'team-3', 'team-7'],
    matches: createMatches('tour-004', 10),
    rules: 'Standard tournament rules apply. Best of 3 matches.',
    prizes: createPrizes(3),
    createdAt: new Date(Date.now() - 60 * 86400000), // 60 days ago
  },
  {
    id: 'tour-005',
    name: 'Weekend Warrior Challenge',
    description: 'Casual tournament for weekend players.',
    game: 'League of Legends',
    format: 'solo',
    maxParticipants: 32,
    currentParticipants: 18,
    registrationDeadline: new Date(Date.now() + 5 * 86400000), // 5 days from now
    startDate: new Date(Date.now() + 12 * 86400000), // 12 days from now
    endDate: new Date(Date.now() + 13 * 86400000), // 13 days from now
    status: 'upcoming',
    organizer: '3', // Organizer user ID
    participants: ['1', '9', '10'],
    matches: [],
    rules: 'Friendly competition with relaxed ruleset.',
    prizes: createPrizes(2),
    createdAt: new Date(Date.now() - 10 * 86400000), // 10 days ago
  },
];