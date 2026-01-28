import api from "./axios";
import { UserProfile } from "../interfaces/userProfile";

export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await api.get(`/users/profile/`, {
    withCredentials: true,
  });
  return res.data;
};

export async function updateUserProfile(
  profileData: Partial<UserProfile>,
): Promise<UserProfile> {
  const res = await api.patch(`/users/profile/`, profileData, {
    withCredentials: true,
  });
  return res.data;
}
