"use client";
import type {
  UserProfile,
  UserProfileContextType,
} from "../interfaces/userProfile";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getUserProfile, updateUserProfile } from "../lib/userProfileApi";

const ProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const profileData = await getUserProfile();
      setUserProfile(profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfileData = async (profileData: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      const updateProfile = await updateUserProfile(profileData);
      setUserProfile(updateProfile);
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        isLoading,
        fetchUserProfile,
        updateUserProfile: updateUserProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return ctx;
}
