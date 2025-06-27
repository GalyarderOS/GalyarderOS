import { useState, useEffect, useCallback } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';
// import { SessionManager } from '@/utils/security';
// import { toast } from '@/hooks/use-toast';
import { Profile, User, Session } from './types';
import { fetchProfile, signOutUser } from './authService';

const mockUser: User = {
  id: 'galyarder-admin-id',
  email: 'galyarder.admin@example.com',
  user_metadata: { full_name: 'Galyarder Admin', avatar_url: 'https://i.pravatar.cc/150?u=galyarder.admin@example.com' },
  isAdmin: true,
};

const mockSession: Session = {
  access_token: 'mock-admin-access-token',
  refresh_token: 'mock-admin-refresh-token',
  user: mockUser,
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const signOut = useCallback(async () => {
    // TODO: Implement actual sign out logic with Bolt API
    await signOutUser();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  const reloadProfile = useCallback(async () => {
    if (user) {
    setLoadingProfile(true);
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    // TODO: Implement actual auth state management with Bolt API
    // For now, we'll simulate a logged-in admin user
    setLoading(true);
    setLoadingProfile(true);

    setTimeout(() => {
      setUser(mockUser);
      setSession(mockSession);
      fetchProfile(mockUser.id).then((profileData) => {
        setProfile(profileData);
        setLoadingProfile(false);
      });
      setLoading(false);
    }, 500); // Simulate network delay
  }, []);

  return {
    user,
    session,
    profile,
    loading,
    loadingProfile,
    signOut,
    reloadProfile,
  };
};
