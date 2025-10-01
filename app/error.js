"use client";

export default function GlobalError({ error, reset }) {
  console.error("Global error caught:", error);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="mt-4 text-gray-300">{error?.message || "Unknown error occurred."}</p>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
