import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield, Globe, Award, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-forest-950 text-emerald-100/80 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-700 to-emerald-400 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Green<span className="text-emerald-400">Campus</span>
              </span>
            </Link>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Empowering university students and administrative councils to track sustainability initiatives, cultivate eco-habits, and drive carbon-neutral campus milestones.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>100% Student-Driven Impact</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition">Home</Link>
              </li>
              <li>
                <a href="#impact" className="hover:text-emerald-300 transition">Campus Impact Metrics</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-emerald-300 transition">Sustainability Categories</a>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-emerald-300 transition">Top Students Leaderboard</Link>
              </li>
            </ul>
          </div>

          {/* Platform Access */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Portals & Roles
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/student" className="hover:text-emerald-300 transition flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Student Action Portal
                </Link>
              </li>
              <li>
                <Link to="/student/submit" className="hover:text-emerald-300 transition">Log Eco Activity</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-300 transition flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Faculty & Admin Verification
                </Link>
              </li>
              <li>
                <Link to="/admin/reports" className="hover:text-emerald-300 transition">Impact & Audit Reports</Link>
              </li>
            </ul>
          </div>

          {/* Campus Sustainability Mission */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Green Goal 2030
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Targeting zero-landfill campus status and a 50% carbon footprint reduction across academic, housing, and cafeteria facilities by 2030.
            </p>
            <div className="p-3 rounded-xl bg-forest-900/80 border border-forest-800 text-xs text-emerald-300">
              <span className="font-semibold block text-white">Need support or have an idea?</span>
              greencampus@university.edu
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} GreenCampus Action Tracker. Built for university sustainability.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> for a greener tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

