"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CartModal from "../components/cartModal/CartModal";
import { useLogin } from "../context/LoginContext";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import { updateUserRequest } from "../lib/authApi";

function SettingsContent() {
  const { user, isLoading, refreshUser } = useLogin();
  const router = useRouter();
  const {
    userProfile,
    fetchUserProfile,
    updateUserProfile,
    isLoading: profileLoading,
  } = useProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Fetch profile when user is available
  useEffect(() => {
    if (user) {
      fetchUserProfile();
      setFirstName(user.first_name ?? "");
      setLastName(user.last_name ?? "");
      setEmail(user.email ?? "");
      setUsername(user.username ?? "");
    }
  }, [user]);

  // Initialize form fields from profile
  useEffect(() => {
    if (userProfile) {
      setBio(userProfile.bio ?? "");
      setPhoneNumber(userProfile.phoneNumber ?? "");
      setLocation(userProfile.location ?? "");
      setProfilePicture(userProfile.profilePicture ?? "");
    }
  }, [userProfile]);

  console.log("User Profile:", userProfile);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    try {
      // Update user data
      await updateUserRequest({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
      });
      // Update profile data
      await updateUserProfile({ bio, phoneNumber, location, profilePicture });
      // Refresh user data in context
      if (refreshUser) await refreshUser();
      setMessage("Profile updated successfully.");
    } catch (e) {
      console.error(e);
      setMessage("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || (!user && !message)) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-azul dark:border-verde mx-auto"></div>
          <p className="mt-4 text-cafe dark:text-blanco text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-transparent">
        <NavBar />

        <div className="w-full py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-cafe dark:text-blanco">
                Settings
              </h1>
              <p className="text-lg text-azul dark:text-madera mt-2">
                Update your profile information
              </p>
            </div>

            <div className="bg-white/80 dark:bg-cafe/20 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-madera/20 dark:border-verde/20">
              <div className="p-8 space-y-6">
                {/* Account Information Section */}
                <h3 className="text-xl font-bold text-cafe dark:text-blanco border-b border-madera/20 dark:border-verde/20 pb-3">
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Last Name
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                      placeholder="Last name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                      placeholder="username"
                    />
                  </div>
                </div>

                {/* Profile Information Section */}
                <h3 className="text-xl font-bold text-cafe dark:text-blanco border-b border-madera/20 dark:border-verde/20 pb-3 mt-8">
                  Profile Information
                </h3>

                <div>
                  <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                    Phone Number
                  </label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                    placeholder="e.g. +1 555 123 4567"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                    Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                    Profile Picture URL
                  </label>
                  <input
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="mt-2 w-full p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 text-cafe dark:text-blanco"
                    placeholder="https://..."
                  />
                </div>

                {message && (
                  <div className="text-center text-sm text-azul dark:text-verde">
                    {message}
                  </div>
                )}

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving || profileLoading}
                    className="bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <CartModal />
      </main>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProfileProvider>
      <SettingsContent />
    </ProfileProvider>
  );
}
