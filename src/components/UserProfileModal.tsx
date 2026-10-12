import React, { useState } from 'react';
import { User, Ticket, Building, LogOut, CheckCircle, Smartphone, QrCode } from 'lucide-react';
import { UserProfile, BusTicket, HostelBooking } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  tickets: BusTicket[];
  hostelBookings: HostelBooking[];
  onClose: () => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
  onOpenApkModal: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  tickets,
  hostelBookings,
  onClose,
  onLogout,
  onShowToast,
  onOpenApkModal,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tickets' | 'stays'>('profile');
  const [viewTicketQr, setViewTicketQr] = useState<BusTicket | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 max-h-[88vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">User Dashboard</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl my-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'profile' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'tickets' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'
            }`}
          >
            Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('stays')}
            className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 'stays' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500'
            }`}
          >
            Stays ({hostelBookings.length})
          </button>
        </div>

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                  {user?.name || 'Traveler'}
                </h3>
                <p className="text-xs text-slate-500">{user?.email || 'traveler@travelconnect.app'}</p>
                <p className="text-[10px] text-teal-700 font-semibold mt-0.5">
                  Member since {user?.joinedDate || 'Today'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenApkModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-xs font-bold text-teal-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-600" />
                  <span>Android App & APK Settings</span>
                </div>
                <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full">
                  Manage
                </span>
              </button>

              <button
                onClick={() => onShowToast('Haptic touch vibration enabled')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>Haptic Feedback on Android</span>
                <span className="text-teal-600 font-bold text-[11px]">Enabled</span>
              </button>

              <button
                onClick={() => onShowToast('Offline cached bus routes & timetable up to date')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>Offline Cache Status</span>
                <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Ready
                </span>
              </button>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors mt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Tickets Content */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {tickets.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Ticket className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-bold text-slate-700">No tickets booked yet</p>
                <p className="text-[10px] text-slate-500">
                  Select a bus in the Bus tab to book your boarding pass
                </p>
              </div>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.ticketId}
                  className="p-3.5 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50/50 to-white relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                        {t.ticketId}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 mt-1">
                        {t.company} Express
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Departure: <span className="font-bold text-slate-800">{t.time}</span> ({t.day})
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Seat: <span className="font-bold text-teal-700">{t.seat}</span> • Fare: ${t.price}
                      </p>
                    </div>

                    <button
                      onClick={() => setViewTicketQr(t)}
                      className="p-2 bg-white rounded-xl border border-slate-200 hover:border-teal-500 shadow-2xs flex flex-col items-center gap-1 text-[9px] font-bold text-slate-700"
                    >
                      <QrCode className="w-5 h-5 text-teal-600" />
                      <span>QR Pass</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Stays Content */}
        {activeTab === 'stays' && (
          <div className="space-y-3">
            {hostelBookings.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Building className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-bold text-slate-700">No hostel bookings yet</p>
                <p className="text-[10px] text-slate-500">
                  Explore available hostels and reserve a room in the Hostels tab
                </p>
              </div>
            ) : (
              hostelBookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        {b.bookingId}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 mt-1">{b.hostelName}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 font-medium">{b.roomName}</p>
                      <p className="text-[11px] text-slate-500">
                        Check-in: {b.checkInDate} • {b.nights} nights
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-teal-700 text-sm">${b.price}</span>
                      <p className="text-[9px] text-emerald-600 font-bold">Confirmed</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Boarding Pass QR Modal */}
        {viewTicketQr && (
          <div className="fixed inset-0 bg-slate-900/70 z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-2xl">
              <h3 className="font-extrabold text-sm text-slate-900 mb-1">
                Boarding Pass - {viewTicketQr.company}
              </h3>
              <p className="text-xs text-slate-500 mb-3">Ticket ID: {viewTicketQr.ticketId}</p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block mb-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    viewTicketQr.ticketId + '-' + viewTicketQr.seat
                  )}`}
                  alt="Boarding Pass QR Code"
                  className="w-36 h-36 mx-auto"
                />
              </div>

              <div className="text-xs text-slate-700 mb-4 font-semibold">
                Seat {viewTicketQr.seat} • {viewTicketQr.time}
              </div>

              <button
                onClick={() => setViewTicketQr(null)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
              >
                Close Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
