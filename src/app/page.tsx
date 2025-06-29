import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to QuickTask</h1>
      <p className="text-lg mb-4 text-gray-600">Track your tasks and stay productive.</p>
      <Link href="/tasks" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        View Tasks
      </Link>
    </main>
  );

}

