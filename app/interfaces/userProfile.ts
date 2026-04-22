export interface UserProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  bio?: string;
  profile_picture?: string;
  phone_number?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}
