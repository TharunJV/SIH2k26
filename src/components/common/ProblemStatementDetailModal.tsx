import React from 'react';
import { createPortal } from 'react-dom';
import { Challenge } from '../../types';
import { DownloadReportButton } from './DownloadReportButton';
import {
  X,
  MapPin,
  Users,
  AlertTriangle,
  Calendar,
  User,
  FileText,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Clock,
} from 'lucide-react';

interface ProblemStatementDetailModalProps {
  challenge: Challenge;
  onClose: () => void;
  /** Optional footer action slot (e.g. an "Accept" or "Assign" button) */
  footerAction?: React.ReactNode;
}

/**
 * Shared "Problem Statement Details" modal used across all non-citizen roles.
 * Shows: ID, Title, Description, Category, Location, Affected Citizens,
 * Urgency, AI Match, Posted by (actual submitter), Submitted on (IST),
 * Evidence/Attachments.
 *
 * DO NOT use this on the Citizen-side UI. The Citizen side has its own
 * CitizenChallengeDetail which must remain unchanged.
 */
export const ProblemStatementDetailModal: React.FC<ProblemStatementDetailModalProps> = ({
  challenge,
  onClose,
  footerAction,
}) => {
  // IST timestamp formatting — same logic as CitizenChallengeDetail / E-Tracking page.
  // DO NOT add +05:30 manually; let the browser convert from UTC using timeZone: 'Asia/Kolkata'.
  const formatFullDateTime = (dateVal?: string | Date | null): string | null => {
    if (!dateVal) return null;
    const d = new Date(dateVal as string);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
  };

  const submittedOnIST =
    formatFullDateTime(challenge.submittedAt) || challenge.submittedAt || '—';

  const postedBy =
    challenge.submittedBy?.userName ||
    challenge.submittedBy?.organization ||
    'Citizen';

  const urgencyColors: Record<string, string> = {
    Critical: 'bg-rose-100 text-rose-800 border-rose-200',
    High: 'bg-amber-100 text-amber-900 border-amber-200',
    Medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  const urgencyClass = urgencyColors[challenge.urgency] || urgencyColors.Low;

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl w-[min(860px,95vw)] max-h-[92vh] overflow-y-auto overflow-x-hidden shadow-2xl border border-slate-200 my-auto flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {challenge.trackingId || challenge.id}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${urgencyClass}`}>
                {challenge.urgency} Urgency
              </span>
              {challenge.trustStatus === 'Verified' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Govt Verified
                </span>
              )}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {challenge.category}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2 leading-snug">
              {challenge.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 flex-1">

          {/* Full Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Full Problem Description
            </h4>
            <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Posted by + Submitted on */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <User className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">
                  Posted by
                </span>
                <span className="font-bold text-slate-900 text-sm">{postedBy}</span>
                {challenge.submittedBy?.userRole && (
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Role: {challenge.submittedBy.userRole.replace(/_/g, ' ')}
                  </span>
                )}
                {challenge.submittedBy?.organization && (
                  <span className="text-[11px] text-slate-500 block">
                    Org: {challenge.submittedBy.organization}
                  </span>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
                  Submitted on (IST)
                </span>
                <span className="font-bold text-slate-900 text-sm">{submittedOnIST}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Asia/Kolkata (UTC +05:30)
                </span>
              </div>
            </div>
          </div>

          {/* Location + Affected Citizens + Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </span>
              <span className="font-semibold text-slate-900 text-xs block">
                {challenge.village ? `${challenge.village}, ` : ''}
                {challenge.block}, {challenge.district}
              </span>
              {challenge.gpsCoordinates && (
                <span className="font-mono text-[10px] text-slate-500 block mt-0.5">
                  {challenge.gpsCoordinates.lat.toFixed(4)}° N,{' '}
                  {challenge.gpsCoordinates.lng.toFixed(4)}° E
                </span>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Affected Citizens
              </span>
              <span className="font-bold text-slate-900 text-lg">
                {(challenge.affectedPopulation || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">people affected</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Urgency / Priority
              </span>
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${urgencyClass}`}>
                {challenge.urgency}
              </span>
              {challenge.frequency && (
                <span className="text-[10px] text-slate-500 block mt-1">
                  Frequency: {challenge.frequency}
                </span>
              )}
            </div>
          </div>

          {/* AI Domain Match */}
          {challenge.aiAnalysis && (
            <div className="p-3.5 bg-[#f0f9f4] rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  AI Domain Match &amp; Triage
                </span>
                <span className="ml-auto font-black text-emerald-700 text-sm">
                  {challenge.aiAnalysis.priorityScore}/100
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                {challenge.aiAnalysis.reasoning && (
                  <p className="leading-relaxed">{challenge.aiAnalysis.reasoning}</p>
                )}
                {challenge.aiAnalysis.recommendedDisciplines &&
                  challenge.aiAnalysis.recommendedDisciplines.length > 0 && (
                    <p>
                      <span className="font-semibold text-slate-800">Recommended disciplines: </span>
                      {challenge.aiAnalysis.recommendedDisciplines.join(', ')}
                    </p>
                  )}
                {challenge.aiAnalysis.potentialImpactAssessment && (
                  <p>
                    <span className="font-semibold text-slate-800">Impact: </span>
                    {challenge.aiAnalysis.potentialImpactAssessment}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {challenge.additionalInformation && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Additional Information
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {challenge.additionalInformation}
              </p>
            </div>
          )}

          {/* Expected Impact */}
          {challenge.expectedImpact && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Expected Impact
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {challenge.expectedImpact}
              </p>
            </div>
          )}

          {/* Evidence / Attachments */}
          {challenge.evidence && challenge.evidence.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Evidence &amp; Attachments ({challenge.evidence.length} artifacts)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {challenge.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col"
                  >
                    <div className="h-28 bg-slate-100 flex items-center justify-center overflow-hidden">
                      {ev.type === 'image' ? (
                        <img
                          src={ev.url}
                          alt={ev.caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : ev.type === 'video' ? (
                        <video
                          src={ev.url}
                          controls
                          className="w-full h-full object-cover bg-black"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="p-2 space-y-1">
                      <p className="text-[10px] font-semibold text-slate-800 line-clamp-2">
                        {ev.caption || 'Evidence'}
                      </p>
                      {ev.geotagLocation && (
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {ev.geotagLocation}
                        </p>
                      )}
                      {ev.timestamp && (
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {ev.timestamp}
                        </p>
                      )}
                      {ev.url && ev.url !== '#' && (
                        <a
                          href={ev.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 underline"
                        >
                          Open <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {challenge.tags && challenge.tags.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {challenge.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
          <DownloadReportButton challenge={challenge} size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Close
            </button>
            {footerAction}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
};
