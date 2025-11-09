"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-gray-200">
          <h2 className="text-2xl font-semibold text-red-600 mb-3">
            Bir şeyler ters gitti
          </h2>
          <p className="text-gray-600 mb-6">
            {error.message || "Beklenmeyen bir hata oluştu."}
          </p>
          <button
            onClick={reset}
            className="bg-[#00A651] text-white font-semibold px-5 py-2 rounded-md hover:bg-[#009640] transition"
          >
            Yeniden Dene
          </button>
        </div>
      </body>
    </html>
  );
}
