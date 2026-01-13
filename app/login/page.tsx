"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar/NavBar";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { login, register } = useLogin();
  const router = useRouter();

  // Validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar contraseña
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Manejar cambio de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
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

  // Detectar modo dark
  useEffect(() => {
    const checkDarkMode = () => {
      // Verificar tanto la clase 'dark' como el media query
      const hasDarkClass = document.documentElement.classList.contains("dark");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = hasDarkClass || prefersDark;
      setIsDarkMode(isDark);
    };

    // Verificar inmediatamente
    checkDarkMode();

    // Observer para cambios en la clase
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Listener para cambios en el media query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkDarkMode);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    // Validaciones antes de enviar
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (mode === "register" && !name.trim()) {
      setError("Please enter your full name");
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/"); // Redirect to home after successful login
      } else {
        await register(name, email, password);
        router.push("/"); // Redirect to home after successful register
      }
    } catch (error: any) {
      // Manejo de errores más específico
      if (error.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (error.response?.status === 400) {
        const errorMsg =
          error.response?.data?.detail || error.response?.data?.message;
        if (typeof errorMsg === "string") {
          setError(errorMsg);
        } else if (error.response?.data?.email) {
          setError("This email is already registered");
        } else if (error.response?.data?.username) {
          setError("This username is already taken");
        } else {
          setError("Invalid input. Please check your information.");
        }
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error. Please check your connection.");
      } else {
        setError(
          mode === "login"
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again."
        );
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-blanco via-madera/5 to-blanco dark:from-cafe dark:via-cafe/95 dark:to-cafe">
      <NavBar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-blanco/80 dark:bg-cafe/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-madera/20 dark:border-verde/20 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.h1
                    key={mode}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-display font-bold text-cafe dark:text-madera mb-2"
                  >
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </motion.h1>
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {mode === "register" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-cafe dark:text-blanco"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={mode === "register"}
                          autoComplete="name"
                          className="w-full px-4 py-3 rounded-xl border border-madera/30 dark:border-verde/30 bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium"
                          placeholder="Enter your full name"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-cafe dark:text-blanco"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        emailError
                          ? "border-red-500 dark:border-red-400"
                          : "border-madera/30 dark:border-verde/30"
                      } bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium`}
                      placeholder="Enter your email"
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
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      autoComplete={
                        mode === "login" ? "current-password" : "new-password"
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        passwordError
                          ? "border-red-500 dark:border-red-400"
                          : "border-madera/30 dark:border-verde/30"
                      } bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300 font-medium`}
                      placeholder="Enter your password"
                      minLength={8}
                    />
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

                  <motion.button
                    type="submit"
                    disabled={isLoading || !!emailError || !!passwordError}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      backgroundColor: isDarkMode ? "#355e3b" : "#00337c",
                      color: "white",
                    }}
                    className="w-full font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  </motion.button>
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
                      className="text-azul  dark:text-verde font-semibold hover:underline transition-all duration-300"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Welcome Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="text-center lg:text-left">
                <motion.h2
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl lg:text-6xl font-display font-bold text-cafe dark:text-madera mb-6 leading-tight"
                >
                  {mode === "login"
                    ? "Welcome to Magnificently Wooden"
                    : "Join Our Craftsmanship Family"}
                </motion.h2>

                <motion.p
                  key={`${mode}-desc`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-cafe/80 dark:text-blanco/80 mb-8 leading-relaxed"
                >
                  {mode === "login"
                    ? "Discover our collection of handcrafted wooden airplanes, each piece telling a unique story of artistry and precision."
                    : "Become part of our community and explore exclusive handcrafted wooden airplanes made with passion and precision."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 gap-6 text-center"
                >
                  <div className="bg-blanco/60 dark:bg-cafe/60 backdrop-blur-sm rounded-2xl p-6 border border-madera/20 dark:border-verde/20">
                    <div className="text-3xl font-bold text-azul dark:text-verde mb-2">
                      100+
                    </div>
                    <div className="text-cafe dark:text-blanco font-medium">
                      Handcrafted Models
                    </div>
                  </div>
                  <div className="bg-blanco/60 dark:bg-cafe/60 backdrop-blur-sm rounded-2xl p-6 border border-madera/20 dark:border-verde/20">
                    <div className="text-3xl font-bold text-azul dark:text-verde mb-2">
                      5★
                    </div>
                    <div className="text-cafe dark:text-blanco font-medium">
                      Customer Rating
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
