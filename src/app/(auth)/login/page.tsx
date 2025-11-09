"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import Image from "next/image";
import Illustration from "@/assets/images/Login.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/loginSchema";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    try {
      const response = await api.post("/auth/login", data);
      const userData = {
        ...response.data,
        token: response.data.token,
      };
      login(userData);
      router.push("/products");
    } catch (err: any) {
      setServerError("Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="lg:col-span-7 col-span-12 bg-login-gray flex flex-col justify-between p-10">
        <div className="relative w-[235px] h-[46px] mb-8">
          <Image
            src="/octopus-logo.svg"
            alt="Octopus Logo"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="relative w-full max-w-[411px] aspect-square mx-auto mb-16">
            <Image
              src={Illustration}
              alt="Login Illustration"
              className="mx-auto w-full h-full object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            Let Free Your Creativity with Our Intuitive Content Creator
          </h2>
          <p className="text-gray-500 text-base leading-[100%]">
            No design degree is required! Effortlessly craft and design stunning
            and captivating content using our user-friendly creative editor.
            With our drag-and-drop technology, anyone can create amazing
            marketing materials in.
          </p>
        </div>
      </div>
      <div className="lg:col-span-5 col-span-12 flex flex-col justify-center bg-white px-[90px] lg:py-0 py-8">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome Octopus!
          </h1>
          <p className="text-gray-400 text-sm font-normal mb-8 text-center">
            Manage your smart signage, watch your company grow.
          </p>

          {serverError && (
            <div className="mb-5 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm text-center animate-fadeIn shadow-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                User Name*
              </label>
              <input
                {...register("username")}
                type="text"
                autoComplete="username"
                className={`w-full bg-gray-100 text-sm text-gray-500 placeholder:text-gray-500 ${
                  errors.username ? "border-red-400" : "border-gray-300"
                } rounded-lg px-4 py-3 focus:ring-1 ${
                  errors.username ? "focus:ring-red-400" : "focus:ring-primary"
                } focus:outline-none transition focus:text-gray-500`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1 animate-fadeIn">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Password*
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`w-full bg-gray-100 text-sm text-gray-500 placeholder:text-gray-500 ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  } rounded-lg px-4 py-3 pr-10 focus:ring-1 ${
                    errors.password
                      ? "focus:ring-red-400"
                      : "focus:ring-primary"
                  } focus:outline-none transition focus:text-gray-500`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 animate-fadeIn">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className={`w-full py-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
