import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { QuickRoleBanner } from '../components/common/QuickRoleBanner';
import { ImpactMetricsGrid } from '../components/charts/ImpactMetricsGrid';
import { ACTIVITY_CATEGORIES, MOCK_GOALS } from '../data/mockData';
import {
  ArrowRight,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  TreePine,
  Sparkles,
  Users,
  BarChart3,
  Award,
  Globe2,
  Calendar,
  Flame,
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans">
      <QuickRoleBanner />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-forest-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-forest-900 border border-emerald-200 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                University Sustainability Initiative
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                Make Your Campus Greener,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-800 via-emerald-600 to-teal-700">
                  One Action at a Time.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Record your daily sustainability activities, earn eco-points, climb the campus leaderboard, and empower faculty administrators to verify measurable environmental progress.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-base shadow-lg shadow-forest-900/15 transition-all hover:scale-102"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-forest-900 font-bold text-base border border-emerald-950/10 shadow-soft transition-all"
                >
                  <span>Student & Admin Login</span>
                </Link>
              </div>

              {/* Key Highlights */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Photo Evidence
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Faculty Review Workflow
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Point Rewards
                </span>
              </div>
            </div>

            {/* Right Card / Interactive Visual */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-2xl relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-white">
                      <TreePine className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Live Campus Action Feed</h4>
                      <p className="text-xs text-gray-500">Real-time student impact</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                    <Flame className="w-3.5 h-3.5 text-emerald-600" /> Trending
                  </span>
                </div>

                {/* Sample Activity Preview Card */}
                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-forest-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      Tree Plantation
                    </span>
                    <span className="text-emerald-700 font-bold">+50 Points</span>
                  </div>
                  <h5 className="text-sm font-bold text-gray-900">
                    15 Neem Saplings Planted at North Campus Garden
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Aarav Sharma (2nd Year CS)</span>
                    <span>•</span>
                    <span>Verified by Dr. Rao</span>
                  </div>
                </div>

                {/* Progress Towards Campus Goal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">1,000 Campus Trees Goal</span>
                    <span className="font-bold text-forest-800">780 / 1000 (78%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-forest-800 to-emerald-500 h-full rounded-full transition-all" style={{ width: '78%' }} />
                  </div>
                </div>

                {/* Quick Access Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/student"
                    className="p-3 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-100 text-center transition group"
                  >
                    <p className="text-xs font-bold text-forest-900 group-hover:text-forest-800">Explore as Student</p>
                    <span className="text-[11px] text-gray-500">Aarav Sharma</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-center transition group"
                  >
                    <p className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800">Explore as Admin</p>
                    <span className="text-[11px] text-gray-500">Dr. Sunita Rao</span>
                  </Link>
                </div>
              </div>

              {/* Decorative Floating Pill */}
              <div className="absolute -bottom-6 -left-6 bg-forest-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-forest-700 hidden sm:flex">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <div className="text-xs">
                  <p className="font-bold">Campus Leaderboard</p>
                  <p className="text-emerald-300">Priya Patel leading with 580 pts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Statistics Section */}
      <section id="impact" className="py-16 bg-white border-y border-emerald-950/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase">
              Collective Achievement
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Real Environmental Impact Across Campus
            </h2>
            <p className="text-sm text-gray-600">
              Aggregated contributions from verified student actions throughout academic blocks, hostels, and sports complexes.
            </p>
          </div>

          <ImpactMetricsGrid />
        </div>
      </section>

      {/* Sustainability Activity Categories */}
      <section id="categories" className="py-20 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase">
              Action Areas
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              7 Sustainability Categories to Drive Change
            </h2>
            <p className="text-sm text-gray-600">
              Submit photo proof for any of our standardized sustainability tracks and get rewarded with campus credits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ACTIVITY_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: cat.bgColor, color: cat.color }}
                  >
                    <TreePine className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{cat.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-500">Reward</span>
                  <span className="font-bold text-forest-800">+{cat.defaultPoints} Points</span>
                </div>
              </div>
            ))}

            {/* Special Callout Card */}
            <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white rounded-2xl p-6 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Have a New Initiative?</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Propose custom clean energy, hydroponics, or zero-waste drives directly through the Other Eco-Friendly track.
                </p>
              </div>
              <Link
                to="/student/submit"
                className="mt-5 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs transition"
              >
                <span>Submit Custom Action</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white border-t border-emerald-950/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase">
              Why Join GreenCampus
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Benefits for Students & Colleges Alike
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-[#F8FAF9] border border-emerald-950/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Campus Recognition & Awards</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Earn university-certified sustainability badges, unlock exclusive green awards, and stand out on the institutional leaderboard.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF9] border border-emerald-950/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Faculty-Verified Credibility</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every activity is reviewed by faculty chairs with photo proof and geo-location logs, ensuring robust, audit-grade verification.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF9] border border-emerald-950/5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Institutional ESG Compliance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Generate real-time environmental reports for accreditation agencies (NAAC, NIRF, AASHE STARS) with exportable charts and metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Lead the Green Revolution on Campus?
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl mx-auto">
            Join hundreds of proactive classmates tracking eco-actions, restoring campus gardens, and cutting campus carbon footprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow-lg transition hover:scale-102"
            >
              Sign Up as Student or Admin
            </Link>
            <Link
              to="/student"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition"
            >
              Explore Demo Experience
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

