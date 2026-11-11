import React, { useState } from 'react';
import { StatusBadge, CategoryBadge } from '../common/Badge';
import {
  X,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ActivityDetailModal = ({
  activity,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const { isAdmin } = useAuth();
  const [pointsInput, setPointsInput] = useState(activity?.points || 30);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !activity) return null;

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await onApprove(activity.id, pointsInput);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please specify a rejection reason or feedback for the student.');
      return;
    }
    setSubmitting(true);
    try {
      await onReject(activity.id, rejectionReason.trim());
      setShowRejectForm(false);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-950/10 overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-50/40">
          <div className="flex items-center gap-3">
            <CategoryBadge category={activity.category} />
            <StatusBadge status={activity.status} />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Photo Proof */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 relative max-h-72">
            <img
              src={activity.proofImage}
              alt="Verification Proof"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white text-xs font-medium flex items-center gap-1.5">
              <span>Verified Photo Evidence</span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
              {activity.title}
            </h2>

            {/* Student & Date Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={activity.studentAvatar}
                  alt={activity.studentName}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <p className="font-bold text-gray-900">{activity.studentName}</p>
                  <p className="text-gray-500">{activity.studentEmail}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Activity Date: {new Date(activity.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="truncate">{activity.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Student Description & Impact
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/20 p-4 rounded-2xl border border-emerald-950/5">
              {activity.description}
            </p>
          </div>

          {/* Rejection Alert if rejected */}
          {activity.status === 'Rejected' && activity.rejectionReason && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Admin Feedback / Reason for Revision:</span>
              </div>
              <p className="text-rose-700 pl-6">{activity.rejectionReason}</p>
            </div>
          )}

          {/* Points display */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-forest-50 border border-forest-100">
            <div className="flex items-center gap-2 text-forest-900">
              <Award className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold text-forest-700">Sustainability Value</p>
                <p className="text-sm font-bold text-forest-900">
                  {activity.points > 0 ? `${activity.points} Points Earned` : 'Points Pending Evaluation'}
                </p>
              </div>
            </div>
            <span className="text-xs text-forest-700 font-medium">
              Submitted: {new Date(activity.submissionDate).toLocaleDateString()}
            </span>
          </div>

          {/* Admin Action Review Panel */}
          {isAdmin && (
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Admin Evaluation Console
                </h4>
                <span className="text-xs text-gray-500">Live Verification</span>
              </div>

              {!showRejectForm ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="text-xs font-semibold text-gray-700 sm:whitespace-nowrap">
                      Assign Points:
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="200"
                      step="5"
                      value={pointsInput}
                      onChange={(e) => setPointsInput(Number(e.target.value))}
                      className="w-full sm:w-32 px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold text-forest-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                    <span className="text-xs text-gray-500 sm:flex-1">
                      (Recommended default: {activity.points || 30} pts)
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleApprove}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm shadow-md transition disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      Approve & Credit {pointsInput} Points
                    </button>

                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => setShowRejectForm(true)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-sm border border-rose-200 transition"
                    >
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Reject / Request Revision
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-rose-200">
                  <label className="block text-xs font-bold text-rose-900">
                    Specify Rejection Reason or Missing Evidence:
                  </label>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g., Photo does not clearly show the campus recycling location. Please re-upload with student badge visible."
                    className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectForm(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleReject}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

