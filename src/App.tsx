import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Download, ShieldCheck } from 'lucide-react';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidNavBar } from './components/AndroidNavBar';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { BusTab } from './components/BusTab';
import { BooksTab } from './components/BooksTab';
import { HostelsTab } from './components/HostelsTab';
import { TimetableTab } from './components/TimetableTab';
import { SignupView } from './components/SignupView';
import { ApkModal } from './components/ApkModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Toast } from './components/Toast';
import { UserProfile, BusTicket, HostelBooking } from './types';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const { isInstallable, triggerInstall } = usePWAInstall();

  // App State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('tc_authenticated') === 'true';
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('tc_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState<TabType>('bus');
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(true);
  const [apkModalOpen, setApkModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tickets & Bookings state
  const [tickets, setTickets] = useState<BusTicket[]>([
    {
      ticketId: 'TC-849201',
      company: 'BJC',
      time: '08:15',
      day: 'Monday',
      seat: '12A',
      price: 12.50,
      bookedAt: 'Today',
      passengerName: 'Alex Johnson',
    },
  ]);

  const [hostelBookings, setHostelBookings] = useState<HostelBooking[]>([
    {
      bookingId: 'HB-391024',
      hostelName: 'The Urban Nomad',
      roomName: 'Mixed Dorm - 6 Beds',
      price: 70,
      checkInDate: 'Tomorrow',
      nights: 2,
      guestName: 'Alex Johnson',
    },
  ]);

  const showToast = (msg: string) => {
    // Trigger Android device vibration haptics if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (e) {
        // ignore
      }
    }
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleAuthSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('tc_authenticated', 'true');
    localStorage.setItem('tc_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('tc_authenticated');
    localStorage.removeItem('tc_user');
    setProfileModalOpen(false);
    showToast('Logged out');
  };

  const handleAddTicket = (ticket: BusTicket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const handleAddHostelBooking = (booking: HostelBooking) => {
    setHostelBookings((prev) => [booking, ...prev]);
  };

  // Switch Tab
  const handleTabChange = (tab: TabType) => {
    if (tab === 'apk') {
      setApkModalOpen(true);
      return;
    }
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center sm:p-4 text-slate-900 font-sans">
      {/* Top Desktop Helper Toolbar (Hidden on actual mobile screens) */}
      <aside aria-label="Device simulation controls" className="hidden sm:flex items-center justify-between w-full max-w-sm mb-3 px-3 py-2 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/60 text-white text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-200">Android App Container</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPhoneFrameMode(!phoneFrameMode)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-[11px] font-semibold text-slate-200 transition-colors"
            title="Toggle Device Frame"
          >
            {phoneFrameMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{phoneFrameMode ? 'Full View' : 'Phone Frame'}</span>
          </button>

          <button
            onClick={() => setApkModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-[11px] font-extrabold text-white transition-colors shadow-xs"
            title="Install APK"
          >
            <Download className="w-3.5 h-3.5" />
            <span>APK</span>
          </button>
        </div>
      </aside>

      {/* Main Container / Phone Mockup Frame */}
      <main className={`w-full bg-white flex flex-col relative transition-all duration-300 overflow-hidden ${
        phoneFrameMode
          ? 'sm:max-w-[400px] sm:h-[840px] sm:rounded-[48px] sm:shadow-[0_0_0_12px_#1e293b,0_30px_70px_rgba(0,0,0,0.6)] sm:border sm:border-slate-800'
          : 'max-w-2xl min-h-screen sm:min-h-[850px] sm:rounded-3xl shadow-2xl'
      }`}>
        {/* Android Punch-Hole Camera (Phone Frame mode) */}
        {phoneFrameMode && (
          <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border border-slate-800 z-40" />
        )}

        {/* Android Status Bar */}
        <AndroidStatusBar darkTheme={false} />

        {/* Content View */}
        {!isAuthenticated ? (
          <SignupView
            onSuccess={handleAuthSuccess}
            onShowToast={showToast}
          />
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden relative">
            {/* Header */}
            <Header
              user={user}
              onOpenApkModal={() => setApkModalOpen(true)}
              onOpenProfile={() => setProfileModalOpen(true)}
              onShowToast={showToast}
            />

            {/* PWA Install Banner (When Installable) */}
            {isInstallable && (
              <div className="bg-teal-700 text-white px-4 py-2 flex items-center justify-between text-xs font-semibold z-10 shadow-xs">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-teal-200" />
                  <span>Install as Native Android App</span>
                </div>
                <button
                  onClick={async () => {
                    const outcome = await triggerInstall();
                    if (outcome === 'accepted') showToast('Installing Travel Connect...');
                  }}
                  className="px-2.5 py-1 bg-white text-teal-800 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-teal-50"
                >
                  Install
                </button>
              </div>
            )}

            {/* Scrollable Tab Views */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
              {currentTab === 'bus' && (
                <BusTab
                  user={user}
                  onBookTicket={handleAddTicket}
                  onShowToast={showToast}
                />
              )}

              {currentTab === 'books' && (
                <BooksTab onShowToast={showToast} />
              )}

              {currentTab === 'hostels' && (
                <HostelsTab
                  user={user}
                  onBookHostel={handleAddHostelBooking}
                  onShowToast={showToast}
                />
              )}

              {currentTab === 'timetable' && (
                <TimetableTab onShowToast={showToast} />
              )}
            </div>

            {/* Bottom Android App Navigation */}
            <BottomNav
              currentTab={currentTab}
              onChangeTab={handleTabChange}
            />
          </div>
        )}

        {/* Android 3-Button Navigation Bar (Back, Home, Recents) */}
        {phoneFrameMode && (
          <AndroidNavBar
            onBack={() => {
              if (currentTab !== 'bus') {
                setCurrentTab('bus');
                showToast('Navigated Back');
              } else {
                showToast('Already on Home');
              }
            }}
            onHome={() => {
              setCurrentTab('bus');
              showToast('Returned Home');
            }}
            onRecents={() => {
              setProfileModalOpen(true);
              showToast('Viewing App Tasks & Dashboard');
            }}
          />
        )}
      </main>

      {/* APK & Android Installation Hub Modal */}
      <ApkModal
        isOpen={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
        onShowToast={showToast}
      />

      {/* User Profile & Bookings Dashboard Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        user={user}
        tickets={tickets}
        hostelBookings={hostelBookings}
        onClose={() => setProfileModalOpen(false)}
        onLogout={handleLogout}
        onShowToast={showToast}
        onOpenApkModal={() => {
          setProfileModalOpen(false);
          setApkModalOpen(true);
        }}
      />

      {/* Android Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
