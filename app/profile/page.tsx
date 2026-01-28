"use client";

import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CartModal from "../components/cartModal/CartModal";
import { useEffect } from "react";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import AOS from "aos";
import "aos/dist/aos.css";

function ProfileContent() {
  const { user, logout, isLoading } = useLogin();
  const {
    userProfile,
    fetchUserProfile,
    isLoading: profileLoading,
  } = useProfile();
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  if (isLoading || profileLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-azul dark:border-verde mx-auto"></div>
          <p className="mt-4 text-cafe dark:text-blanco text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-transparent">
        <NavBar />

        <div className="w-full py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12" data-aos="fade-down">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-cafe dark:text-blanco mb-4 tracking-tight">
                My Profile
              </h1>
              <p className="text-lg md:text-xl text-azul dark:text-madera">
                Manage your account information
              </p>
            </div>

            {/* Profile Card */}
            <div
              className="bg-white/80 dark:bg-cafe/20 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-madera/20 dark:border-verde/20"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Profile Header with Avatar */}
              <div className="bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 p-8 text-white">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white/30 overflow-hidden">
                    {userProfile?.profilePicture ? (
                      <img
                        src={userProfile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.first_name?.[0]?.toUpperCase() ||
                      user.username?.[0]?.toUpperCase() ||
                      "U"
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {user.first_name || user.username}
                      {user.last_name && ` ${user.last_name}`}
                    </h2>
                    <p className="text-white/80 mt-1">{user.email}</p>
                    {user.role && (
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        {user.role.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8">
                <h3
                  className="text-2xl font-bold text-cafe dark:text-blanco mb-6"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      First Name
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {user.first_name || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="450"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Last Name
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {user.last_name || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Email Address
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Username */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="550"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Username
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {user.username}
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div
                    className="space-y-2 md:col-span-2"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Member Since
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20 flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-azul dark:text-verde"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-cafe dark:text-blanco font-medium">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Profile Information */}
                <h3
                  className="text-2xl font-bold text-cafe dark:text-blanco mb-6 mt-8 pt-8 border-t border-madera/20 dark:border-verde/20"
                  data-aos="fade-up"
                  data-aos-delay="650"
                >
                  Additional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bio */}
                  <div
                    className="space-y-2 md:col-span-2"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Bio
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {userProfile?.bio || "No bio added"}
                      </p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="750"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Phone Number
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {userProfile?.phoneNumber || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div
                    className="space-y-2"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <label className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                      Location
                    </label>
                    <div className="p-4 bg-madera/5 dark:bg-verde/5 rounded-xl border border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-medium">
                        {userProfile?.location || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="mt-8 pt-8 border-t border-madera/20 dark:border-verde/20 flex flex-col sm:flex-row gap-4"
                  data-aos="fade-up"
                  data-aos-delay="850"
                >
                  <button
                    onClick={() => router.push("/settings")}
                    className="flex-1 bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 border-2 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400 px-6 py-3 rounded-full font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="bg-white/80 dark:bg-cafe/20 backdrop-blur-sm rounded-xl p-6 border border-madera/20 dark:border-verde/20 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-azul/10 dark:bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-azul dark:text-verde"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-cafe dark:text-blanco">
                  0
                </p>
                <p className="text-sm text-cafe/60 dark:text-madera/60 mt-1">
                  Total Orders
                </p>
              </div>

              <div className="bg-white/80 dark:bg-cafe/20 backdrop-blur-sm rounded-xl p-6 border border-madera/20 dark:border-verde/20 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-azul/10 dark:bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-azul dark:text-verde"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-cafe dark:text-blanco">
                  0
                </p>
                <p className="text-sm text-cafe/60 dark:text-madera/60 mt-1">
                  Wishlist Items
                </p>
              </div>

              <div className="bg-white/80 dark:bg-cafe/20 backdrop-blur-sm rounded-xl p-6 border border-madera/20 dark:border-verde/20 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-azul/10 dark:bg-verde/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-azul dark:text-verde"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-cafe dark:text-blanco">
                  0
                </p>
                <p className="text-sm text-cafe/60 dark:text-madera/60 mt-1">
                  Reviews
                </p>
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

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}
