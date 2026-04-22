"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CartModal from "../components/cartModal/CartModal";
import { useLogin } from "../context/LoginContext";
import { ProfileProvider, useProfile } from "../context/ProfileContext";
import { useErrorModal } from "../components/ErrorModal/ErrorModal";
import type { User } from "../interfaces/user";
import type { UserProfile } from "../interfaces/userProfile";

type ProfileFormState = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  bio: string;
  phone_number: string;
  location: string;
  profile_picture: string;
};

type StatusMessage = {
  type: "success" | "error" | "info";
  text: string;
};

const emptyFormState: ProfileFormState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  bio: "",
  phone_number: "",
  location: "",
  profile_picture: "",
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-madera/15 bg-white/85 px-4 py-3 text-sm text-cafe outline-none transition duration-300 placeholder:text-cafe/35 focus:border-azul/60 focus:ring-4 focus:ring-azul/10 dark:border-verde/20 dark:bg-cafe/60 dark:text-blanco dark:placeholder:text-blanco/35 dark:focus:border-verde/60 dark:focus:ring-verde/10";

function buildFormState(
  user: User | null,
  userProfile: UserProfile | null,
): ProfileFormState {
  return {
    first_name: userProfile?.first_name ?? user?.first_name ?? "",
    last_name: userProfile?.last_name ?? user?.last_name ?? "",
    email: userProfile?.email ?? user?.email ?? "",
    username: userProfile?.username ?? user?.username ?? "",
    bio: userProfile?.bio ?? user?.bio ?? "",
    phone_number: userProfile?.phone_number ?? "",
    location: userProfile?.location ?? user?.location ?? "",
    profile_picture: userProfile?.profile_picture ?? "",
  };
}

function getInitials(formData: ProfileFormState) {
  const source =
    formData.first_name ||
    formData.last_name ||
    formData.username ||
    formData.email ||
    "U";

  return source.trim().charAt(0).toUpperCase() || "U";
}

function formatJoinDate(date: string | undefined) {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-cafe/75 dark:text-madera/80">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-2 block text-xs text-cafe/45 dark:text-blanco/45">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

function InsightCard({
  title,
  value,
  caption,
}: {
  title: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-3xl border border-madera/15 bg-white/70 p-4 shadow-[0_18px_45px_-30px_rgba(61,42,31,0.5)] dark:border-verde/15 dark:bg-cafe/45">
      <p className="text-xs uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
        {title}
      </p>
      <p className="mt-3 text-2xl font-bold text-cafe dark:text-blanco">
        {value}
      </p>
      <p className="mt-2 text-sm text-cafe/60 dark:text-madera/70">{caption}</p>
    </div>
  );
}

function ProfileContent() {
  const { user, logout, isLoading, refreshUser } = useLogin();
  const {
    userProfile,
    fetchUserProfile,
    updateUserProfile,
    isLoading: profileLoading,
  } = useProfile();
  const { showError } = useErrorModal();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormState>(emptyFormState);
  const [initialData, setInitialData] =
    useState<ProfileFormState>(emptyFormState);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<StatusMessage | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
    // `fetchUserProfile` is context-provided and intentionally runs when auth state resolves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const nextState = buildFormState(user, userProfile);
    setFormData(nextState);
    setInitialData(nextState);
  }, [user, userProfile]);

  const filledFields = [
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.username,
    formData.bio,
    formData.phone_number,
    formData.location,
    formData.profile_picture,
  ].filter((value) => value.trim().length > 0).length;

  const profileCompletion = Math.round((filledFields / 8) * 100);
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
  const canSave = hasChanges && !saving && !profileLoading;
  const displayName =
    [formData.first_name, formData.last_name].filter(Boolean).join(" ") ||
    formData.username ||
    "Your profile";

  const handleChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setFormData((current) => ({
        ...current,
        [field]: nextValue,
      }));

      if (message) {
        setMessage(null);
      }
    };

  const handleSave = async () => {
    const trimmedEmail = formData.email.trim();
    const trimmedUsername = formData.username.trim();

    if (!trimmedEmail || !trimmedUsername) {
      setMessage({
        type: "error",
        text: "Email and username are required to save your profile.",
      });
      return;
    }

    const profilePayload: Partial<UserProfile> = {};

    if (formData.first_name.trim() !== initialData.first_name.trim()) {
      profilePayload.first_name = formData.first_name.trim();
    }

    if (formData.last_name.trim() !== initialData.last_name.trim()) {
      profilePayload.last_name = formData.last_name.trim();
    }

    if (trimmedEmail !== initialData.email.trim()) {
      profilePayload.email = trimmedEmail;
    }

    if (trimmedUsername !== initialData.username.trim()) {
      profilePayload.username = trimmedUsername;
    }

    if (formData.bio !== initialData.bio) {
      profilePayload.bio = formData.bio;
    }

    if (formData.phone_number.trim() !== initialData.phone_number.trim()) {
      profilePayload.phone_number = formData.phone_number.trim();
    }

    if (formData.location.trim() !== initialData.location.trim()) {
      profilePayload.location = formData.location.trim();
    }

    if (
      formData.profile_picture.trim() !== initialData.profile_picture.trim()
    ) {
      profilePayload.profile_picture = formData.profile_picture.trim();
    }

    if (Object.keys(profilePayload).length === 0) {
      setMessage({
        type: "info",
        text: "There are no pending changes to save.",
      });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await updateUserProfile(profilePayload);

      if (refreshUser) {
        await refreshUser();
      }
      await fetchUserProfile();

      setMessage({
        type: "success",
        text: "Your profile was updated successfully.",
      });
    } catch (error: unknown) {
      console.error(error);

      const errorCode =
        (
          error as { response?: { status?: number } }
        )?.response?.status?.toString() ||
        (error as { message?: string })?.message ||
        "default";

      showError(errorCode);
      setMessage({
        type: "error",
        text: "We could not save your profile information.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isLoading || profileLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(31,119,164,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(151,113,74,0.2),_transparent_30%),linear-gradient(135deg,_#f7f1ea,_#fff8f2)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(121,195,126,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(151,113,74,0.15),_transparent_25%),linear-gradient(135deg,_#332118,_#1d140f)]">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-azul dark:border-verde"></div>
          <p className="mt-4 text-lg text-cafe dark:text-blanco">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(31,119,164,0.14),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(151,113,74,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,251,247,1)_0%,_rgba(249,242,234,1)_100%)] font-sans dark:bg-[radial-gradient(circle_at_top_left,_rgba(121,195,126,0.15),_transparent_26%),radial-gradient(circle_at_80%_20%,_rgba(151,113,74,0.14),_transparent_24%),linear-gradient(180deg,_rgba(43,29,21,1)_0%,_rgba(27,20,16,1)_100%)]">
      <main className="flex min-h-screen w-full flex-col">
        <NavBar />

        <section className="relative overflow-hidden px-4 pb-20 pt-12 md:px-8 lg:px-12">
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-azul dark:text-verde">
                  Profile
                </p>
                <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-cafe dark:text-blanco md:text-6xl">
                  Edit your information in one place
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-cafe/70 dark:text-madera/80 md:text-lg">
                  You can now update your account details and public profile
                  from this page, with a live preview and a cleaner editing
                  flow.
                </p>
              </div>

              <div className="rounded-full border border-madera/20 bg-white/70 px-4 py-2 text-sm font-medium text-cafe/75 shadow-sm dark:border-verde/15 dark:bg-cafe/40 dark:text-blanco/80">
                {hasChanges
                  ? "You have unsaved changes"
                  : "Everything is in sync"}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="space-y-6">
                <div className="overflow-hidden rounded-[2rem] border border-madera/20 bg-white/75 shadow-[0_25px_80px_-35px_rgba(61,42,31,0.45)] dark:border-verde/15 dark:bg-cafe/45">
                  <div className="bg-[linear-gradient(135deg,_rgba(31,119,164,0.98),_rgba(31,119,164,0.78),_rgba(151,113,74,0.7))] p-7 text-white dark:bg-[linear-gradient(135deg,_rgba(121,195,126,0.95),_rgba(121,195,126,0.72),_rgba(151,113,74,0.55))]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex px-4 py-4 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/15 text-xl font-bold shadow-inner">
                          {formData.profile_picture ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={formData.profile_picture}
                              alt="Profile picture"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(formData)
                          )}
                        </div>
                        <div className="min-w-0">
                          <h2 className="break-words text-2xl font-bold">
                            {displayName}
                          </h2>
                          <p className="mt-1 text-sm text-white/80">
                            {formData.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {user.role ? (
                        <span className="max-w-full self-start rounded-full border border-white/20 bg-white/15 px-3 py-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/90 sm:shrink-0">
                          {user.role}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-6 text-sm leading-6 text-white/85">
                      {formData.bio.trim() ||
                        "Add a short bio to make your profile feel more complete and personal."}
                    </p>
                  </div>

                  <div className="space-y-5 p-7">
                    <div>
                      <div className="flex items-center justify-between text-sm text-cafe/70 dark:text-madera/75">
                        <span>Profile completion</span>
                        <span className="font-semibold">
                          {profileCompletion}%
                        </span>
                      </div>
                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-madera/10 dark:bg-verde/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-azul via-azul/85 to-madera transition-all duration-500 dark:from-verde dark:via-verde/85 dark:to-madera"
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-2xl bg-madera/6 p-4 dark:bg-verde/7">
                        <p className="text-xs uppercase tracking-[0.2em] text-cafe/45 dark:text-blanco/45">
                          Location
                        </p>
                        <p className="mt-2 text-sm font-semibold text-cafe dark:text-blanco">
                          {formData.location.trim() || "Pending"}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-madera/6 p-4 dark:bg-verde/7">
                        <p className="text-xs uppercase tracking-[0.2em] text-cafe/45 dark:text-blanco/45">
                          Member since
                        </p>
                        <p className="mt-2 text-sm font-semibold text-cafe dark:text-blanco">
                          {formatJoinDate(user.created_at)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-madera/6 p-4 dark:bg-verde/7">
                        <p className="text-xs uppercase tracking-[0.2em] text-cafe/45 dark:text-blanco/45">
                          Contact
                        </p>
                        <p className="mt-2 text-sm font-semibold text-cafe dark:text-blanco">
                          {formData.phone_number.trim() || "No phone number"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={!canSave}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-azul to-madera px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 dark:from-verde dark:to-madera"
                      >
                        {saving ? "Saving..." : "Save changes"}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-full border border-red-500/70 px-5 py-3 text-sm font-semibold text-red-600 transition duration-300 hover:bg-red-50 dark:border-red-400/60 dark:text-red-300 dark:hover:bg-red-950/20"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <InsightCard
                    title="Bio"
                    value={formData.bio.trim() ? "Ready" : "Pending"}
                    caption="A short description helps personalize your account."
                  />
                  <InsightCard
                    title="Account"
                    value={formData.username.trim() || "No handle"}
                    caption="Your username is still the main account identifier."
                  />
                  <InsightCard
                    title="Visibility"
                    value={formData.location.trim() ? "Active" : "Basic"}
                    caption="Location and avatar make your profile feel more complete."
                  />
                </div>
              </aside>

              <div className="space-y-6">
                <div className="rounded-[2rem] border border-madera/20 bg-white/80 p-6 shadow-[0_25px_80px_-35px_rgba(61,42,31,0.45)] dark:border-verde/15 dark:bg-cafe/45 md:p-8">
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-azul dark:text-verde">
                        Account details
                      </p>
                      <h3 className="mt-2 text-3xl font-bold text-cafe dark:text-blanco">
                        Core information
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-cafe/60 dark:text-madera/75">
                      These fields power your account session, identity, and the
                      way your account is displayed.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="First name">
                      <input
                        value={formData.first_name}
                        onChange={handleChange("first_name")}
                        className={inputClassName}
                        placeholder="Your first name"
                      />
                    </Field>

                    <Field label="Last name">
                      <input
                        value={formData.last_name}
                        onChange={handleChange("last_name")}
                        className={inputClassName}
                        placeholder="Your last name"
                      />
                    </Field>

                    <Field
                      label="Email"
                      hint="Used for sign-in and important account communication."
                    >
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        className={inputClassName}
                        placeholder="email@example.com"
                      />
                    </Field>

                    <Field
                      label="Username"
                      hint="Keep it recognizable and unique."
                    >
                      <input
                        value={formData.username}
                        onChange={handleChange("username")}
                        className={inputClassName}
                        placeholder="your_username"
                      />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-madera/20 bg-white/80 p-6 shadow-[0_25px_80px_-35px_rgba(61,42,31,0.45)] dark:border-verde/15 dark:bg-cafe/45 md:p-8">
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-azul dark:text-verde">
                        Public profile
                      </p>
                      <h3 className="mt-2 text-3xl font-bold text-cafe dark:text-blanco">
                        Bio, location, and avatar
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-cafe/60 dark:text-madera/75">
                      Only the fields you actually change are sent when you
                      save.
                    </p>
                  </div>

                  <div className="grid gap-5">
                    <Field
                      label="Bio"
                      hint="A short, natural sentence usually works best."
                    >
                      <textarea
                        value={formData.bio}
                        onChange={handleChange("bio")}
                        className={`${inputClassName} min-h-32 resize-none`}
                        placeholder="Tell people a little about yourself"
                        rows={5}
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Phone number">
                        <input
                          value={formData.phone_number}
                          onChange={handleChange("phone_number")}
                          className={inputClassName}
                          placeholder="+52 55 1234 5678"
                        />
                      </Field>

                      <Field label="Location">
                        <input
                          value={formData.location}
                          onChange={handleChange("location")}
                          className={inputClassName}
                          placeholder="City, country"
                        />
                      </Field>
                    </div>

                    <Field
                      label="Profile picture URL"
                      hint="Paste a public image URL to preview it instantly."
                    >
                      <input
                        value={formData.profile_picture}
                        onChange={handleChange("profile_picture")}
                        className={inputClassName}
                        placeholder="https://..."
                      />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-madera/20 bg-white/70 p-5 dark:border-verde/15 dark:bg-cafe/40">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-cafe dark:text-blanco">
                        Save status
                      </p>
                      <p className="mt-1 text-sm text-cafe/60 dark:text-madera/75">
                        {message?.text ||
                          "Changes are saved when you press the main action button."}
                      </p>
                    </div>

                    <div
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        message?.type === "success"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/25 dark:text-green-300"
                          : message?.type === "error"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/25 dark:text-red-300"
                            : "bg-madera/10 text-cafe/70 dark:bg-verde/10 dark:text-madera/80"
                      }`}
                    >
                      {message?.type === "success"
                        ? "Saved"
                        : message?.type === "error"
                          ? "Needs review"
                          : hasChanges
                            ? "Pending"
                            : "No changes"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
