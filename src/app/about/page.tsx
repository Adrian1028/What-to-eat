import Link from "next/link";
import { Utensils, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Us | What to eat tonight?",
  description: "Learn about What to eat tonight? — a fun, gamified food roulette tool that helps you decide what to eat.",
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Roulette
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            About Us
          </h1>
        </div>

        <article className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-white">What to eat tonight?</strong> was born from a simple, universal frustration — the daily struggle of deciding what to eat. We believe that choosing your next meal should be fun, not stressful.
          </p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">Our Mission</h2>
          <p>
            Our mission is to eliminate decision fatigue around food by turning the mundane question of &quot;What should I eat?&quot; into an exciting, gamified experience. With a single spin of our interactive roulette wheel, you get a random food category suggestion — and a one-tap link to find the best nearby restaurants on Google Maps.
          </p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">How It Works</h2>
          <p>
            Our physics-based roulette wheel features 12 popular cuisine types — from Hot Pot and Steak to Japanese, Korean, Thai, and more. Simply tap &quot;Spin Now&quot;, watch the wheel spin with realistic deceleration and satisfying tick sounds, and let fate choose your next meal. Once the wheel stops, you can instantly search for nearby restaurants with one tap.
          </p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">Who We Are</h2>
          <p>
            We are a small team of food lovers and web developers based in Taiwan who got tired of spending 30 minutes every day scrolling through delivery apps. We built this tool for ourselves first — and now we are sharing it with the world.
          </p>

          <h2 className="text-xl font-bold text-gray-200 mt-8">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li><strong className="text-gray-300">Simplicity</strong> — No sign-up, no downloads. Just spin and eat.</li>
            <li><strong className="text-gray-300">Privacy</strong> — We respect your data. We don&apos;t track your location or store personal information.</li>
            <li><strong className="text-gray-300">Fun</strong> — Every meal decision should spark a little joy.</li>
          </ul>
        </article>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/about" className="text-yellow-400 font-medium">About Us</Link>
          <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact Us</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
