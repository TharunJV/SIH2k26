import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Building2,
  FileText,
  FileCheck,
  Rocket,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Layers,
  Handshake,
  CheckCircle,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export const GovernmentDashboard: React.FC = () => {
  const {
    currentGovernmentMember,
    challenges,
    projects,
    collaborations,
    projectReports,
    supportActions,
    setCurrentView,
    setSelectedChallengeId,
    setSelectedProjectId,
    showToast,
  } = useApp();

  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');

  // ============================================================
  // REAL DATABASE DERIVED DATA
  // ============================================================

  const totalChallenges = challenges.length;

  const openChallenges = challenges.filter(
    (c) => c.status !== 'Implemented' && c.status !== 'Rejected'
  ).length;

  const activeProjects = projects.filter(
    (p) => p.currentStage !== 'Scale-up & Policy Integration'
  ).length;

  const completedProjects = projects.filter(
    (p) => p.currentStage === 'Scale-up & Policy Integration'
  ).length;

  const projectsNeedingAttention = projects.filter((p) => {
    const hasOpenAction = supportActions.some(
      (a) => a.project_id === p.id && a.status === 'Open'
    );

    const hasPendingMilestones = p.milestones.some(
      (m) => m.status === 'Delayed'
    );

    return hasOpenAction || hasPendingMilestones;
  });

  const activeCollaborationsCount = collaborations.length;

  const pendingVerification = challenges.filter(
    (c) => c.status === 'Submitted' || c.status === 'Under Review'
  );

  const pendingAssignment = challenges.filter(
    (c) =>
      c.status === 'Validated' ||
      (c.status === 'Assigned' && !c.officialAssignment)
  );

  const pendingReports = projectReports.filter(
    (r) => !r.review_status || r.review_status === 'Under Review'
  );

  const districtCounts = challenges.reduce((acc, c) => {
    acc[c.district] = (acc[c.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // ============================================================
  // EXPORT
  // ============================================================

  const handleExportBrief = () => {
    showToast(
      'success',
      'Policy Brief Generated',
      'Official Government of Jharkhand Societal Innovation & Capstone Policy Brief exported with real platform metrics.'
    );
  };

  return (
    <div className="space-y-5">

      {/* ========================================================
          GOVERNMENT HERO
          ======================================================== */}

      <section className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/80 shadow-sm">

        {/* Decorative background */}
        <div className="absolute right-0 top-0 h-full w-[42%] pointer-events-none overflow-hidden">
          <div className="absolute right-[-90px] top-[-100px] h-[300px] w-[300px] rounded-full bg-violet-100/50 blur-3xl" />

          <Building2
            className="absolute right-10 bottom-[-45px] h-52 w-52 text-violet-100/70"
            strokeWidth={1}
          />
        </div>

        <div className="relative px-6 py-6 sm:px-8 sm:py-7">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            {/* LEFT SIDE */}
            <div className="flex items-start gap-4 min-w-0">

              {/* Shield */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center">
                <ShieldCheck
                  className="w-8 h-8 sm:w-9 sm:h-9 text-violet-600"
                  strokeWidth={2}
                />
              </div>

              <div className="min-w-0">

                {/* Badge row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">

                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-[11px] font-bold">
                    Government of Jharkhand
                  </span>

                  <span className="text-xs text-slate-500 font-medium">
                    {currentGovernmentMember.department_name}
                  </span>

                </div>

                {/* Welcome */}
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                  Welcome, {currentGovernmentMember.name}
                </h1>

                <p className="mt-1.5 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-500">
                  Real-time oversight over citizen challenges, academic R&D
                  assignments, industry co-funding, and pilot deployment
                  across Jharkhand's 24 districts.
                </p>

                {/* Meta pills */}
                <div className="flex flex-wrap items-center gap-2.5 mt-4">

                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                    <Building2 className="w-3.5 h-3.5 text-violet-600" />
                    State Level (PMU)
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-violet-600" />
                    HQ: Jharkhand, Jharkhand
                  </div>

                </div>
              </div>
            </div>

            {/* ==================================================
                EXPORT BUTTON - TOP RIGHT
                ================================================== */}

            <div className="shrink-0 lg:pt-1 lg:ml-auto">

              <button
                onClick={handleExportBrief}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 px-5 py-3 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export State Policy Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          STATEWIDE PLATFORM METRICS
          ======================================================== */}

      <section>

        <div className="flex items-end justify-between mb-3 px-1">

          <div>
            <h2 className="text-sm font-black text-slate-900">
              Statewide Platform Metrics
            </h2>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Live database records
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Synchronization
          </div>

        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

          {/* Total */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">
                Total Challenges
              </span>

              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <Layers className="w-4 h-4 text-violet-600" />
              </div>
            </div>

            <div className="text-2xl font-black text-slate-950 mt-2">
              {totalChallenges}
            </div>

            <div className="text-[10px] text-slate-400 mt-1">
              Reported by citizens
            </div>
          </div>


          {/* Open */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-600">
                Open Challenges
              </span>

              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
            </div>

            <div className="text-2xl font-black text-amber-800 mt-2">
              {openChallenges}
            </div>

            <div className="text-[10px] text-amber-600 mt-1">
              Awaiting solution/pilot
            </div>
          </div>


          {/* Active */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-indigo-600">
                Active Projects
              </span>

              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-indigo-600" />
              </div>
            </div>

            <div className="text-2xl font-black text-indigo-700 mt-2">
              {activeProjects}
            </div>

            <div className="text-[10px] text-indigo-500 mt-1">
              Under university teams
            </div>
          </div>


          {/* Completed */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-600">
                Completed Projects
              </span>

              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <div className="text-2xl font-black text-emerald-700 mt-2">
              {completedProjects}
            </div>

            <div className="text-[10px] text-emerald-600 mt-1">
              Impact measured/scaled
            </div>
          </div>


          {/* Attention */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-rose-600">
                Needs Attention
              </span>

              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-rose-600" />
              </div>
            </div>

            <div className="text-2xl font-black text-rose-700 mt-2">
              {projectsNeedingAttention.length}
            </div>

            <div className="text-[10px] text-rose-500 mt-1">
              Stalled / interventions
            </div>
          </div>


          {/* Industry */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-teal-600">
                Industry Collabs
              </span>

              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                <Handshake className="w-4 h-4 text-teal-600" />
              </div>
            </div>

            <div className="text-2xl font-black text-teal-700 mt-2">
              {activeCollaborationsCount}
            </div>

            <div className="text-[10px] text-teal-600 mt-1">
              CSR / test facilities
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          ACTION QUEUES
          ======================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


        {/* ======================================================
            VERIFICATION
            ====================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-5 pt-5 pb-3">

            <div className="flex items-start justify-between gap-3">

              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  Verification Queue
                </h3>

                <p className="text-[10px] text-slate-400 mt-1">
                  Challenges awaiting official state verification
                </p>
              </div>

              <span className="shrink-0 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-[10px] font-bold text-violet-700">
                {pendingVerification.length} Pending
              </span>

            </div>

          </div>


          <div className="px-4 pb-4">

            <div className="border border-slate-200 rounded-xl overflow-hidden">

              {pendingVerification.slice(0, 3).map((ch) => (

                <div
                  key={ch.id}
                  onClick={() => {
                    setSelectedChallengeId(ch.id);
                    setCurrentView('government-verification');
                  }}
                  className="px-3.5 py-3 border-b border-slate-100 last:border-b-0 hover:bg-violet-50/40 cursor-pointer transition-colors group"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">

                      <div className="text-[10px] font-mono font-bold text-slate-500">
                        {ch.id}
                      </div>

                      <div className="text-xs font-bold text-slate-800 group-hover:text-violet-700 truncate mt-0.5">
                        {ch.title}
                      </div>

                      <div className="flex items-center gap-1.5 mt-1 text-[9px] text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {ch.district}, {ch.block}
                      </div>

                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 shrink-0" />

                  </div>

                </div>

              ))}


              {pendingVerification.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  All submitted challenges have been verified.
                </div>
              )}

            </div>


            {/* Violet button */}
            <button
              onClick={() => setCurrentView('government-verification')}
              className="w-full mt-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              Go to Verification Desk
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </section>


        {/* ======================================================
            ASSIGNMENT
            ====================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-5 pt-5 pb-3">

            <div className="flex items-start justify-between gap-3">

              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-violet-600" />
                  Assignment Management
                </h3>

                <p className="text-[10px] text-slate-400 mt-1">
                  Verified challenges awaiting assignment
                </p>
              </div>

              <span className="shrink-0 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-[10px] font-bold text-violet-700">
                {pendingAssignment.length} Ready
              </span>

            </div>

          </div>


          <div className="px-4 pb-4">

            <div className="border border-slate-200 rounded-xl overflow-hidden">

              {pendingAssignment.slice(0, 3).map((ch) => (

                <div
                  key={ch.id}
                  onClick={() => {
                    setSelectedChallengeId(ch.id);
                    setCurrentView('government-assignments');
                  }}
                  className="px-3.5 py-3 border-b border-slate-100 last:border-b-0 hover:bg-violet-50/40 cursor-pointer transition-colors group"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">

                      <div className="text-[10px] font-mono font-bold text-slate-500 truncate">
                        {ch.id}
                      </div>

                      <div className="text-xs font-bold text-slate-800 group-hover:text-violet-700 truncate mt-0.5">
                        {ch.title}
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400">
                        <span>Target: {ch.district}</span>
                        <span>•</span>
                        <span>
                          {ch.expressionsOfInterest?.length || 0} Universities
                        </span>
                      </div>

                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 shrink-0" />

                  </div>

                </div>

              ))}


              {pendingAssignment.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  No verified challenges pending assignment.
                </div>
              )}

            </div>


            <button
              onClick={() => setCurrentView('government-assignments')}
              className="w-full mt-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              Go to Assignment Console
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </section>


        {/* ======================================================
            REPORTS
            ====================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-5 pt-5 pb-3">

            <div className="flex items-start justify-between gap-3">

              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-600" />
                  Reports & Documents
                </h3>

                <p className="text-[10px] text-slate-400 mt-1">
                  Milestone reports submitted by universities
                </p>
              </div>

              <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700">
                {pendingReports.length} Submitted
              </span>

            </div>

          </div>


          <div className="px-4 pb-4">

            <div className="border border-slate-200 rounded-xl overflow-hidden">

              {pendingReports.slice(0, 3).map((r) => (

                <div
                  key={r.id}
                  onClick={() => setCurrentView('government-reports')}
                  className="px-3.5 py-3 border-b border-slate-100 last:border-b-0 hover:bg-violet-50/40 cursor-pointer transition-colors group"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">

                      <div className="text-[10px] font-mono font-bold text-slate-500 truncate">
                        {r.id}
                      </div>

                      <div className="text-xs font-bold text-slate-800 group-hover:text-violet-700 truncate mt-0.5">
                        {r.title}
                      </div>

                      <div className="text-[9px] text-slate-400 mt-1 truncate">
                        {r.university_name}
                      </div>

                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 shrink-0" />

                  </div>

                </div>

              ))}


              {pendingReports.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  All submitted reports have been reviewed.
                </div>
              )}

            </div>


            <button
              onClick={() => setCurrentView('government-reports')}
              className="w-full mt-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              Review Reports & Documents
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </section>

      </div>


      {/* ========================================================
          ACTIVE PROJECTS
          ======================================================== */}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

            <div>

              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-violet-600" />
                Active University Capstone & R&D Projects
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                Live project status, milestones, and industry co-development
              </p>

            </div>

            <button
              onClick={() => setCurrentView('government-projects')}
              className="text-[11px] font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer"
            >
              View All Projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          {projects.map((p) => {

            const completedMilestones = p.milestones.filter(
              (m) => m.status === 'Completed'
            ).length;

            const progressPercent = Math.round(
              (completedMilestones / (p.milestones.length || 1)) * 100
            );

            return (

              <div
                key={p.id}
                className="px-5 sm:px-6 py-4 hover:bg-violet-50/20 transition-colors"
              >

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="font-mono text-[10px] font-bold text-slate-500">
                        {p.id}
                      </span>

                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                        {p.currentStage}
                      </span>

                      {p.industryPartners &&
                        p.industryPartners.length > 0 && (
                          <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center gap-1">
                            <Handshake className="w-3 h-3" />
                            {p.industryPartners[0].partnerName}
                          </span>
                        )}

                    </div>


                    <h4 className="text-sm font-black text-slate-900 mt-2">
                      {p.title}
                    </h4>


                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] text-slate-500">

                      <span className="font-semibold text-violet-700">
                        {p.universityName || p.university?.name}
                      </span>

                      <span>•</span>

                      <span>
                        Mentor:{' '}
                        {p.leadFaculty ||
                          p.team?.leadFaculty?.name ||
                          'Faculty Team'}
                      </span>

                      <span>•</span>

                      <span>
                        Challenge: {p.challengeId}
                      </span>

                    </div>

                  </div>


                  <div className="flex items-center gap-4 shrink-0">

                    <div className="w-32 sm:w-40">

                      <div className="flex justify-between text-[9px] font-bold text-slate-500 mb-1">

                        <span>Progress</span>

                        <span>{progressPercent}%</span>

                      </div>

                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-violet-600 rounded-full transition-all"
                          style={{
                            width: `${progressPercent}%`,
                          }}
                        />

                      </div>

                      <div className="text-[9px] text-slate-400 mt-1">
                        {completedMilestones} of {p.milestones.length} delivered
                      </div>

                    </div>


                    <button
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setCurrentView('government-projects');
                      }}
                      className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      View
                      <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
                    </button>

                  </div>

                </div>

              </div>

            );
          })}


          {projects.length === 0 && (
            <div className="py-12 text-center text-xs text-slate-400">
              No active university projects available.
            </div>
          )}

        </div>

      </section>


      {/* ========================================================
          DISTRICT FOOTPRINT
          ======================================================== */}

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-5 sm:px-6 py-5">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">

            <div>

              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-600" />
                District Problem Density
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                Live reports mapped to respective districts
              </p>

            </div>

            <button
              onClick={() => setCurrentView('government-districts')}
              className="text-[11px] font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 cursor-pointer"
            >
              Open District Map
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

          </div>


          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">

            {Object.entries(districtCounts).map(([district, count]) => (

              <div
                key={district}
                onClick={() => {
                  setSelectedDistrictFilter(district);
                  setCurrentView('government-challenges');
                }}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-violet-50 hover:border-violet-200 cursor-pointer transition-all"
              >

                <div className="text-[10px] font-bold text-slate-700 truncate">
                  {district}
                </div>

                <div className="text-lg font-black text-violet-700 mt-1">
                  {count}
                </div>

                <div className="text-[9px] text-slate-400 mt-0.5">
                  Active challenges
                </div>

              </div>

            ))}


            {Object.keys(districtCounts).length === 0 && (
              <div className="col-span-full py-8 text-center text-xs text-slate-400">
                No district reports available.
              </div>
            )}

          </div>

        </div>

      </section>

    </div>
  );
};