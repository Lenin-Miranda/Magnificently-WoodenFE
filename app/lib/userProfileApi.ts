import api from "./axios";
import UserProfile from "../interfaces/userProfile";
import { User } from "../interfaces/user";
import { profile } from "console";

export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const res = await api.get(`/profile/${userId}/`, {
    withCredentials: true,
  });
  return res.data as UserProfile;
};

export async function updateUserProfile(
  userId: number,
  profileData: Partial<UserProfile>,
): Promise<UserProfile> {
  const res = await api.put(`/profile/${userId}/`, profileData, {
    withCredentials: true,
  });
  return res.data as UserProfile;
}
