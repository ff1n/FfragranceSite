// routes/login.tsx
import { h } from "preact";

export default function Login() {
  return (
    <div class="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div class="max-w-md w-full text-center bg-white p-8 rounded shadow-md">
        <h1 class="text-2xl font-extrabold text-gray-800 mb-4">Sign In</h1>
        <p class="text-gray-600 mb-6">Please sign in to access ffragrance.</p>
        <a
          href="/auth/google"
          class="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );
}