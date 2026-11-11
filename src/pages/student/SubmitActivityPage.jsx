import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivities } from '../../context/ActivityContext';
import { useToast } from '../../context/ToastContext';
import { ACTIVITY_CATEGORIES } from '../../data/mockData';
import {
  Upload,
  Calendar,
  MapPin,
  Leaf,
  FileText,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

export const SubmitActivityPage = () => {
  const { submitActivity } = useActivities();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(ACTIVITY_CATEGORIES[0].name);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [proofImage, setProofImage] = useState(
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'
  );
  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'
  );
  const [submitting, setSubmitting] = useState(false);

  // Preset sample photo evidence for testing ease
  const SAMPLE_PRESETS = [
    {
      name: 'Tree Planting',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Recycling Sort',
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Clean Energy / Solar',
      url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Cleanliness Drive',
      url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Water Conservation',
      url: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Handle local file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
        setImagePreview(reader.result);
        showToast('Image proof loaded successfully!', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please provide an activity title.', 'error');
      return;
    }
    if (!description.trim()) {
      showToast('Please provide a short description of the action.', 'error');
      return;
    }
    if (!location.trim()) {
      showToast('Please specify the campus location.', 'error');
      return;
    }
    if (!proofImage) {
      showToast('Please upload or select photo proof.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await submitActivity({
        title,
        category,
        description,
        date,
        location,
        proofImage,
      });

      // Navigate to My Activities to view the newly added Pending activity
      navigate('/student/activities');
    } catch (err) {
      showToast(err.message || 'Error submitting activity', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategoryObj = ACTIVITY_CATEGORIES.find((c) => c.name === category);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          Sustainability Action Logger
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Submit Sustainability Activity
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Upload verifiable evidence of your green action on campus to earn points upon admin approval.
        </p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/5 shadow-soft space-y-6">
        {/* Category Picker */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            1. Select Activity Category <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {ACTIVITY_CATEGORIES.map((cat) => {
              const isSelected = category === cat.name;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.name)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-forest-800 text-white border-forest-800 shadow-md ring-2 ring-forest-700/20'
                      : 'bg-gray-50/60 hover:bg-emerald-50/50 text-gray-700 border-gray-200'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{cat.name}</p>
                  <span className={`text-[11px] block mt-1 ${isSelected ? 'text-emerald-300' : 'text-gray-500'}`}>
                    +{cat.defaultPoints} pts base
                  </span>
                </button>
              );
            })}
          </div>
          {selectedCategoryObj && (
            <p className="text-xs text-gray-500 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{selectedCategoryObj.description}</span>
            </p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Activity Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Planted 15 Neem saplings at North Botanical Perimeter"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent"
          />
        </div>

        {/* Date & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              3. Date Performed <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              4. Campus Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Main Quadrangle / Hostel 3 Mess"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            5. Description & Environmental Impact <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what actions were taken, how many volunteers participated, quantities sorted or planted, and how it benefits the campus environment..."
            className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
          />
        </div>

        {/* Photo Proof Upload & Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            6. Photo Verification Proof <span className="text-rose-500">*</span>
          </label>

          {/* Upload Area / Image Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Upload Box */}
            <div className="md:col-span-7">
              <label className="border-2 border-dashed border-emerald-300 hover:border-forest-800 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50/70 transition group text-center h-48">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-forest-800 group-hover:scale-110 transition-transform mb-2">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-gray-900">
                  Click to upload photo evidence
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  PNG, JPG, or WEBP up to 10MB
                </p>
              </label>
            </div>

            {/* Live Preview Box */}
            <div className="md:col-span-5 h-48 rounded-2xl border border-gray-200 overflow-hidden relative bg-gray-100 flex items-center justify-center">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Proof Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                    Active Proof Preview
                  </span>
                </>
              ) : (
                <div className="text-center text-gray-400 space-y-1">
                  <ImageIcon className="w-8 h-8 mx-auto" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs text-gray-500 font-medium">
              Or pick a sample photo for demo testing:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => {
                    setProofImage(preset.url);
                    setImagePreview(preset.url);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                    imagePreview === preset.url
                      ? 'bg-emerald-100 border-emerald-300 text-forest-900 font-bold'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Entry will be saved to your dashboard with <strong>Pending Review</strong> status.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{submitting ? 'Submitting Activity...' : 'Submit Activity'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

