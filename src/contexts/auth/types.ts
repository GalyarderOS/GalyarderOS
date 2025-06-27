// import { User, Session } from '@supabase/supabase-js';
// import { Tables } from '@/integrations/supabase/types';

export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
  isAdmin?: boolean; // Added isAdmin property
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url?: string | null;
  has_completed_onboarding: boolean;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  loadingProfile: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  reloadProfile: () => Promise<void>;
  updateProfile: (userId: string, updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  uploadAvatar: (userId: string, file: File) => Promise<{ data: { publicUrl: string | null }, error: Error | null }>;
}

