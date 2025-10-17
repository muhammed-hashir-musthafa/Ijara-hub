import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/" 
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 hover:text-white transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}