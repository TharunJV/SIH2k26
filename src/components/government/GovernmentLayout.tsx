import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GovernmentDashboard } from './GovernmentDashboard';
import { GovernmentChallengesPage } from './GovernmentChallengesPage';
import { GovernmentVerificationPage } from './GovernmentVerificationPage';
import { GovernmentAssignmentsPage } from './GovernmentAssignmentsPage';
import { GovernmentProjectsPage } from './GovernmentProjectsPage';
import { GovernmentAnalyticsPage } from './GovernmentAnalyticsPage';
import { GovernmentCollaborationsPage } from './GovernmentCollaborationsPage';
import { GovernmentReportsPage } from './GovernmentReportsPage';
import { GovernmentImpactPage } from './GovernmentImpactPage';
import { GovernmentDistrictsPage } from './GovernmentDistrictsPage';
import { GovernmentModerationPage } from './GovernmentModerationPage';
import { GovernmentNotificationsPage } from './GovernmentNotificationsPage';
import { GovernmentHelpPage } from './GovernmentHelpPage';
import { GovernmentSettingsPage } from './GovernmentSettingsPage';
import { ErrorBoundary } from '../common/ErrorBoundary';

import {
  LayoutDashboard,
  Compass,
  CheckCircle2,
  FileCheck,
  Rocket,
  BarChart3,
  Handshake,
  FileText,
  Globe2,
  MapPin,
  AlertTriangle,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  ExternalLink,
} from 'lucide-react';

export const GovernmentLayout: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    currentGovernmentMember,
    governmentMembers,
    switchGovernmentMember,
    notifications,
    logout,
    challenges,
    projects,
    projectReports,
    industrySubmissions,
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const pendingVerificationCount = challenges.filter(
    (c) => c.status === 'Submitted' || c.status === 'Under Review'
  ).length;

  const pendingAssignmentCount = challenges.filter(
    (c) =>
      c.status === 'Validated' ||
      (c.status === 'Assigned' && !c.officialAssignment)
  ).length;

  const reportsPendingReviewCount = projectReports.filter(
    (r) => !r.review_status || r.review_status === 'Under Review'
  ).length;

  const pendingIndustrySolutionsCount = industrySubmissions.filter(
    (s) => s.status === 'Submitted to Government'
  ).length;

  const accessLevel = currentGovernmentMember?.access_level || 'state';

  const navItems = [
    {
      id: 'government-dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      allowedLevels: ['state', 'department', 'district', 'monitoring'],
    },
    {
      id: 'government-challenges',
      label: 'Challenge Monitoring',
      icon: Compass,
      allowedLevels: ['state', 'department', 'district', 'monitoring'],
      badge: challenges.length,
    },
    {
      id: 'government-verification',
      label: 'Challenge Verification',
      icon: CheckCircle2,
      allowedLevels: ['state', 'department', 'district', 'monitoring'],
      badge:
        pendingVerificationCount > 0
          ? pendingVerificationCount
          : undefined,
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'government-assignments',
      label: 'Assignment Management',
      icon: FileCheck,
      allowedLevels: ['state', 'district'],
      badge:
        pendingAssignmentCount > 0
          ? pendingAssignmentCount
          : undefined,
      badgeColor: 'bg-violet-100 text-violet-700',
    },
    {
      id: 'government-projects',
      label: 'Project Monitoring',
      icon: Rocket,
      allowedLevels: ['state', 'department', 'district'],
      badge: projects.length,
    },
    {
      id: 'government-analytics',
      label: 'Progress & Analytics',
      icon: BarChart3,
      allowedLevels: ['state', 'department', 'district'],
    },
    {
      id: 'government-collaborations',
      label: 'Industry Collaboration',
      icon: Handshake,
      allowedLevels: ['state', 'department', 'district'],
      badge:
        pendingIndustrySolutionsCount > 0
          ? pendingIndustrySolutionsCount
          : undefined,
      badgeColor: 'bg-teal-100 text-teal-700',
    },
    {
      id: 'government-reports',
      label: 'Reports & Documents',
      icon: FileText,
      allowedLevels: ['state', 'department', 'district'],
      badge:
        reportsPendingReviewCount > 0
          ? reportsPendingReviewCount
          : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'government-impact',
      label: 'Impact & Outcomes',
      icon: Globe2,
      allowedLevels: ['state', 'department', 'district'],
    },
    {
      id: 'government-districts',
      label: 'District / State View',
      icon: MapPin,
      allowedLevels: ['state', 'department', 'district'],
    },
    {
      id: 'government-moderation',
      label: 'Issues & Moderation',
      icon: AlertTriangle,
      allowedLevels: ['state'],
    },
    {
      id: 'government-notifications',
      label: 'Notifications & Audit',
      icon: Bell,
      allowedLevels: [
        'state',
        'department',
        'district',
        'monitoring',
      ],
      badge: unreadNotifs > 0 ? unreadNotifs : undefined,
      badgeColor: 'bg-rose-100 text-rose-700',
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.allowedLevels.includes(accessLevel)
  );

  const renderActiveView = () => {
    const content = (() => {
      switch (currentView) {
        case 'government-dashboard':
          return <GovernmentDashboard />;

        case 'government-challenges':
          return <GovernmentChallengesPage />;

        case 'government-verification':
          return <GovernmentVerificationPage />;

        case 'government-assignments':
          return <GovernmentAssignmentsPage />;

        case 'government-projects':
          return <GovernmentProjectsPage />;

        case 'government-analytics':
          return <GovernmentAnalyticsPage />;

        case 'government-collaborations':
          return <GovernmentCollaborationsPage />;

        case 'government-reports':
          return <GovernmentReportsPage />;

        case 'government-impact':
          return <GovernmentImpactPage />;

        case 'government-districts':
          return <GovernmentDistrictsPage />;

        case 'government-moderation':
          return <GovernmentModerationPage />;

        case 'government-notifications':
          return <GovernmentNotificationsPage />;

        case 'government-help':
          return <GovernmentHelpPage />;

        case 'government-settings':
          return <GovernmentSettingsPage />;

        default:
          return <GovernmentDashboard />;
      }
    })();

    return (
      <div key={currentView} className="pt-page-enter">
        {content}
      </div>
    );
  };

  const accessLevelLabels: Record<
    string,
    {
      title: string;
      color: string;
      bg: string;
    }
  > = {
    state: {
      title: 'State Level (Statewide PMU)',
      color: 'text-violet-700',
      bg: 'bg-violet-50 border-violet-200',
    },
    department: {
      title: 'Department Level',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
    },
    district: {
      title: 'District Level',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    monitoring: {
      title: 'Monitoring Officer',
      color: 'text-purple-700',
      bg: 'bg-purple-50 border-purple-200',
    },
  };

  const currentLevelInfo =
    accessLevelLabels[accessLevel] || accessLevelLabels.state;

  return (
    <div className="h-screen bg-[#f8f9fc] flex flex-col overflow-hidden text-slate-900">

      {/* =========================================================
          TOP HEADER
          ========================================================= */}
      <header className="h-[72px] shrink-0 bg-white border-b border-slate-200/80 z-50">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Mobile menu + breadcrumb */}
          <div className="flex items-center min-w-0">

            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-3 p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center gap-2 text-sm min-w-0">
              <span className="text-slate-400 font-medium truncate">
                Government Portal
              </span>

              <span className="text-slate-300">/</span>

              <span className="font-semibold text-violet-600">
                Dashboard
              </span>
            </div>
          </div>

          {/* =====================================================
              TOP RIGHT CONTROLS
              ===================================================== */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setCurrentView('government-notifications')}
              className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-violet-50 hover:border-violet-200 flex items-center justify-center text-slate-500 hover:text-violet-600 transition-all"
              title="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />

              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                  {unreadNotifs > 9 ? '9+' : unreadNotifs}
                </span>
              )}
            </button>

            {/* Official Profile */}
            <div className="relative">

              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2.5 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >

                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-violet-600">
                    {currentGovernmentMember?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .slice(0, 1)
                      .join('') || 'P'}
                  </span>
                </div>

                <div className="hidden sm:block text-left min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[150px]">
                    {currentGovernmentMember.name}
                  </div>

                  <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                    {currentLevelInfo.title}
                  </div>
                </div>

                <ChevronDown
                  className={`hidden sm:block w-4 h-4 text-slate-400 transition-transform ${
                    roleDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* =================================================
                  PROFILE DROPDOWN
                  ================================================= */}
              {roleDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[330px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-[60]">

                  {/* Current user */}
                  <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
                        {currentGovernmentMember.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold text-sm text-slate-900 truncate">
                          {currentGovernmentMember.name}
                        </div>

                        <div className="text-xs text-slate-500 truncate">
                          {currentGovernmentMember.designation}
                        </div>

                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold ${currentLevelInfo.bg} ${currentLevelInfo.color}`}
                          >
                            {currentLevelInfo.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Switch official */}
                  <div className="px-4 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Switch Government Official
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {governmentMembers.map((member) => {
                        const isCurrent =
                          member.id === currentGovernmentMember.id;

                        return (
                          <button
                            key={member.id}
                            onClick={() => {
                              switchGovernmentMember(member.id);
                              setRoleDropdownOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                              isCurrent
                                ? 'bg-violet-50 border border-violet-100'
                                : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >

                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                isCurrent
                                  ? 'bg-violet-100 text-violet-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-900 truncate">
                                  {member.name}
                                </span>

                                <span
                                  className={`text-[9px] px-1.5 py-0.5 rounded-full border shrink-0 ${
                                    accessLevelLabels[
                                      member.access_level
                                    ]?.bg || 'bg-slate-50'
                                  } ${
                                    accessLevelLabels[
                                      member.access_level
                                    ]?.color || 'text-slate-600'
                                  }`}
                                >
                                  {member.access_level}
                                </span>
                              </div>

                              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                                {member.designation}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dropdown footer actions */}
                  <div className="border-t border-slate-100 p-2">

                    <button
                      onClick={() => {
                        setCurrentView('government-settings');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Official Settings
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('landing');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Public Portal
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN SHELL
          ========================================================= */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* =======================================================
            SIDEBAR
            ======================================================= */}
        <aside
          className={`
            fixed lg:static
            inset-y-0 left-0
            z-40
            w-[280px]
            bg-white
            border-r border-slate-200
            transform transition-transform duration-300
            lg:translate-x-0
            ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full'
            }
            flex flex-col
            overflow-hidden
          `}
        >

          {/* =====================================================
              BRAND
              ===================================================== */}
          <div className="h-[72px] shrink-0 px-5 flex items-center border-b border-slate-100">

            <button
              type="button"
              onClick={() => setCurrentView('government-dashboard')}
              className="flex items-center gap-3 text-left"
            >

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white shadow-sm shadow-violet-200">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <div className="text-[13px] font-extrabold tracking-wide text-slate-900">
                  JH INNOVATION CONNECT
                </div>

                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />

                  <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-violet-600">
                    Government Portal
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* =====================================================
              SIDEBAR SCROLL AREA
              ===================================================== */}
          <div className="flex-1 overflow-y-auto px-4 py-5">

            {/* Official Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-5">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                </div>

                <div className="min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-1">
                    Authorized Official
                  </div>

                  <div className="text-xs font-bold text-slate-900 truncate">
                    {currentGovernmentMember.name}
                  </div>

                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {currentGovernmentMember.designation}
                  </div>

                  <div className="text-[10px] text-violet-600 font-semibold truncate mt-1">
                    {currentGovernmentMember.department_name}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation label */}
            <div className="px-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Government Workspace
              </span>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">

              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as any);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full
                      flex items-center justify-between
                      px-3 py-2.5
                      rounded-xl
                      text-xs font-semibold
                      transition-all
                      ${
                        isActive
                          ? 'bg-violet-50 text-violet-700 shadow-sm ring-1 ring-violet-100'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div
                        className={`
                          w-7 h-7 rounded-lg
                          flex items-center justify-center
                          shrink-0
                          ${
                            isActive
                              ? 'bg-violet-100'
                              : 'bg-transparent'
                          }
                        `}
                      >
                        <Icon
                          className={`
                            w-[16px] h-[16px]
                            ${
                              isActive
                                ? 'text-violet-600'
                                : 'text-slate-400'
                            }
                          `}
                        />
                      </div>

                      <span className="truncate">
                        {item.label}
                      </span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`
                          min-w-[20px]
                          h-5
                          px-1.5
                          rounded-full
                          flex items-center justify-center
                          text-[9px]
                          font-bold
                          ${
                            item.badgeColor ||
                            (isActive
                              ? 'bg-violet-100 text-violet-700'
                              : 'bg-slate-100 text-slate-500')
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="my-5 border-t border-slate-100" />

            {/* Secondary */}
            <div className="px-2 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Support
              </span>
            </div>

            <div className="space-y-1">

              {/* Help */}
              <button
                onClick={() => {
                  setCurrentView('government-help');
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-2.5
                  rounded-xl
                  text-xs font-semibold
                  transition-colors
                  ${
                    currentView === 'government-help'
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <HelpCircle
                  className={`w-4 h-4 ${
                    currentView === 'government-help'
                      ? 'text-violet-600'
                      : 'text-slate-400'
                  }`}
                />

                <span>Help & SOPs</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  setCurrentView('government-settings');
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-2.5
                  rounded-xl
                  text-xs font-semibold
                  transition-colors
                  ${
                    currentView === 'government-settings'
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Settings
                  className={`w-4 h-4 ${
                    currentView === 'government-settings'
                      ? 'text-violet-600'
                      : 'text-slate-400'
                  }`}
                />

                <span>Official Settings</span>
              </button>
            </div>
          </div>

          {/* =====================================================
              SIDEBAR FOOTER
              ===================================================== */}
          <div className="shrink-0 p-4 border-t border-slate-100">

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">

              <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-violet-700">
                  {currentGovernmentMember.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 1)
                    .join('')}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 truncate">
                  {accessLevel === 'state'
                    ? 'State Official'
                    : currentLevelInfo.title}
                </div>

                <div className="text-[10px] text-slate-500 truncate">
                  {currentGovernmentMember.name}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setRoleDropdownOpen(true)}
                className="text-slate-400 hover:text-violet-600 transition-colors"
                title="Switch official"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* =======================================================
            MOBILE SIDEBAR BACKDROP
            ======================================================= */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/30 backdrop-blur-[2px] z-30 lg:hidden"
          />
        )}

        {/* =======================================================
            CONTENT
            ======================================================= */}
        <main className="flex-1 min-w-0 overflow-y-auto">

          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-7 pb-24 lg:pb-10">

            <ErrorBoundary>
              {renderActiveView()}
            </ErrorBoundary>

          </div>
        </main>
      </div>
    </div>
  );
};