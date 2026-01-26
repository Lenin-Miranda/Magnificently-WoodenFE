export default interface UserProfile {
  id: number;
  userId: number;
  bio?: string;
  profilePicture?: string;
  phoneNumber?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export default interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  fetchUserProfile: (userId: number) => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}
