export interface UserProfile {
  id: number;
  bio?: string;
  profilePicture?: string;
  phoneNumber?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}
