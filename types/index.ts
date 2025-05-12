export type UserRole = 'player' | 'team_manager' | 'organizer' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  teams?: string[]; // IDs of teams the user belongs to
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  ownerId: string; // User ID of the team owner/manager
  members: string[]; // User IDs of team members
  pendingInvites: string[]; // User IDs of invited players
  tournaments: string[]; // Tournament IDs the team is registered for
  createdAt: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  game: string;
  format: 'solo' | 'team';
  maxParticipants: number;
  currentParticipants: number;
  registrationDeadline: Date;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string; // User ID of the organizer
  participants: string[]; // User or Team IDs depending on format
  matches: Match[];
  rules: string;
  prizes: Prize[];
  createdAt: Date;
}

export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  participant1: string; // User or Team ID
  participant2: string; // User or Team ID
  score1: number;
  score2: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  winner: string | null; // User or Team ID of the winner
  startTime: Date;
  endTime?: Date;
  reportedCheating: boolean;
}

export interface Prize {
  position: number;
  description: string;
  value?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}