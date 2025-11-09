"use client";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium">Yükleniyor, Lütfen Bekleyin...</p>
    </div>
  );
}
