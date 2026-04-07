"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLogin } from "../context/LoginContext";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";
import AOS from "aos";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get("mode");
  const [mode, setMode] = useState<"login" | "register">(
    urlMode === "register" ? "register" : "login",
  );
  const [email, setEmail] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useLogin();
  const router = useRouter();

  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Detectar cambios en el parámetro de la URL
  useEffect(() => {
    if (urlMode === "register") {
      setMode("register");
    } else if (urlMode === "login") {
      setMode("login");
    }
  }, [urlMode]);

  // Validar email o username
  const validateEmailOrUsername = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Si parece un email, validar como email
    if (input.includes("@")) {
      return emailRegex.test(input);
    }
    // Si no, validar como username (al menos 3 caracteres, alfanumérico)
    return input.length >= 3 && /^[a-zA-Z0-9_]+$/.test(input);
  };

  // Validar contraseña
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Manejar cambio de email/username
  const handleEmailOrUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (mode === "login") {
      setEmailOrUsername(value);
      if (value && !validateEmailOrUsername(value)) {
        setEmailError("Please enter a valid email or username");
      } else {
        setEmailError("");
      }
    } else {
      setEmail(value);
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  // Validar email para registro
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar cambio de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    // Validaciones antes de enviar
    if (mode === "login") {
      if (!validateEmailOrUsername(emailOrUsername)) {
        setEmailError("Please enter a valid email or username");
        return;
      }
    } else {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (mode === "register" && !username.trim()) {
      setError("Please enter a username");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        // For login, convert emailOrUsername to lowercase
        await login(emailOrUsername.toLowerCase(), password);
        router.push("/"); // Redirect to home after successful login
      } else {
        // For register, convert both username and email to lowercase
        await register(username.toLowerCase(), email.toLowerCase(), password);
        router.push("/"); // Redirect to home after successful register
      }
    } catch (error: unknown) {
      // Manejo de errores más específico
      const err = error as {
        response?: { status: number; data?: { message?: string } };
      };
      if (err.response?.status === 401) {
        if (mode === "login") {
          setError(
            "Invalid credentials. Please check your email/username and password.",
          );
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else if (err.response?.status === 400) {
        const errorMsg = err.response?.data?.message;
        if (typeof errorMsg === "string") {
          setError(errorMsg);
        } else if (err.response?.data) {
          setError(
            "This email is already registered. Please try logging in instead.",
          );
        } else {
          setError("Invalid input. Please check your information.");
        }
      } else if (err.response?.status === 429) {
        setError("Too Many Attempts please try again later");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if ((error as { code?: string }).code === "ERR_NETWORK") {
        setError("Network error. Please check your connection.");
      } else {
        setError(
          mode === "login"
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again.",
        );
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blanco via-azul/15 to-blanco dark:from-madera dark:via-cafe/95 dark:to-madera">
      <NavBar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-once="true"
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-blanco/80 dark:bg-cafe/80 rounded-3xl shadow-xl border border-madera/20 dark:border-verde/20 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-display font-bold text-cafe dark:text-madera mb-2">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-cafe/70 dark:text-blanco/70 font-medium">
                    {mode === "login"
                      ? "Sign in to your account"
                      : "Join our wooden craftsmanship family"}
                  </p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    >
                      <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {mode === "register" && (
                    <div className="space-y-2 overflow-hidden transition-all duration-300">
                      <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-cafe dark:text-blanco"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={mode === "register"}
                        autoComplete="username"
                        className="w-full px-4 py-3 rounded-xl border border-madera/30 dark:border-verde/30 bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium"
                        placeholder="Enter your username"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-cafe dark:text-blanco"
                    >
                      {mode === "login" ? "Email or Username" : "Email Address"}
                    </label>
                    <input
                      type={mode === "login" ? "text" : "email"}
                      id="email"
                      value={mode === "login" ? emailOrUsername : email}
                      onChange={handleEmailOrUsernameChange}
                      required
                      autoComplete={mode === "login" ? "username" : "email"}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        emailError
                          ? "border-red-500 dark:border-red-400"
                          : "border-madera/30 dark:border-verde/30"
                      } bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium`}
                      placeholder={
                        mode === "login"
                          ? "Enter your email or username"
                          : "Enter your email"
                      }
                    />
                    {emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 dark:text-red-400 text-sm font-medium"
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-cafe dark:text-blanco"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        autoComplete={
                          mode === "login" ? "current-password" : "new-password"
                        }
                        className={`w-full pl-4 pr-12 py-3 rounded-xl border ${
                          passwordError
                            ? "border-red-500 dark:border-red-400"
                            : "border-madera/30 dark:border-verde/30"
                        } bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium`}
                        placeholder="Enter your password"
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-azul dark:text-verde hover:opacity-80 transition-opacity"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {passwordError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 dark:text-red-400 text-sm font-medium"
                      >
                        {passwordError}
                      </motion.p>
                    )}
                    {mode === "register" &&
                      !passwordError &&
                      password.length > 0 && (
                        <p className="text-cafe/60 dark:text-blanco/60 text-xs">
                          Password strength:{" "}
                          {password.length >= 12
                            ? "Strong"
                            : password.length >= 10
                            ? "Good"
                            : "Fair"}
                        </p>
                      )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !!emailError || !!passwordError}
                    className="w-full font-semibold py-4 px-6 rounded-xl bg-azul dark:bg-verde shadow-lg hover:shadow-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2  border-blanco/30 border-t-blanco rounded-full animate-spin"></div>
                        {mode === "login"
                          ? "Signing in..."
                          : "Creating account..."}
                      </div>
                    ) : mode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* Mode Toggle */}
                <div className="mt-8 text-center">
                  <p className="text-cafe/70 dark:text-blanco/70">
                    {mode === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      onClick={() => {
                        setMode(mode === "login" ? "register" : "login");
                        setError("");
                      }}
                      className="text-azul dark:text-verde font-semibold cursor-pointer hover:text-azul/60 dark:hover:text-verde/60 transition-all duration-300"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Welcome Content */}
            <div
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="150"
              data-aos-once="true"
              className="hidden md:block"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-5xl lg:text-6xl font-display font-bold text-cafe dark:text-madera mb-6 leading-tight">
                  {mode === "login"
                    ? "Welcome to Magnificently Wooden"
                    : "Join Our Craftsmanship Family"}
                </h2>

                <p className="text-xl text-cafe/80 dark:text-blanco/80 mb-8 leading-relaxed">
                  {mode === "login"
                    ? "Discover our collection of handcrafted wooden airplanes, each piece telling a unique story of artistry and precision."
                    : "Become part of our community and explore exclusive handcrafted wooden airplanes made with passion and precision."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
