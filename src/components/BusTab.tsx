import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check, Ticket, MapPin, Clock } from 'lucide-react';
import { scheduleData } from '../data/mockData';
import { BusRoute, BusTicket, UserProfile } from '../types';

interface BusTabProps {
  user: UserProfile | null;
  onBookTicket: (ticket: BusTicket) => void;
  onShowToast: (msg: string) => void;
}

export const BusTab: React.FC<BusTabProps> = ({ user, onBookTicket, onShowToast }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [routeFilter, setRouteFilter] = useState<'all' | 'BJC' | 'AC'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<string>('12A');

  const days = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate current minutes from midnight
  const currentMinutes = useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  // Format 24h to 12h AM/PM
  const formatTime = (time24: string) => {
    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${mStr} ${ampm}`;
  };

  // Filtered and sorted routes
  const routes = useMemo(() => {
    let list: (BusRoute & { dayName?: string })[] = [];

    if (selectedDay === 'All Days') {
      Object.keys(scheduleData).forEach((d) => {
        scheduleData[d].forEach((r) => {
          list.push({ ...r, dayName: d });
        });
      });
    } else {
      list = (scheduleData[selectedDay] || []).map((r) => ({ ...r, dayName: selectedDay }));
    }

    if (routeFilter !== 'all') {
      list = list.filter((r) => r.company === routeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.company.toLowerCase().includes(q) ||
          (r.terminal && r.terminal.toLowerCase().includes(q))
      );
    }

    // Sort by time
    return list.sort((a, b) => {
      const [hA, mA] = a.time.split(':').map(Number);
      const [hB, mB] = b.time.split(':').map(Number);
      return hA * 60 + mA - (hB * 60 + mB);
    });
  }, [selectedDay, routeFilter, searchQuery]);

  // Find next upcoming bus
  const nextBusIndex = useMemo(() => {
    for (let i = 0; i < routes.length; i++) {
      const [h, m] = routes[i].time.split(':').map(Number);
      const busM = h * 60 + m;
      if (busM >= currentMinutes) {
        return i;
      }
    }
    return routes.length > 0 ? 0 : -1;
  }, [routes, currentMinutes]);

  const handleSelectRoute = (route: BusRoute) => {
    setSelectedRoute(route);
    setBookingModalOpen(true);
    onShowToast(`Selected ${route.company} at ${formatTime(route.time)}`);
  };

  const handleConfirmBooking = () => {
    if (!selectedRoute) return;
    const newTicket: BusTicket = {
      ticketId: 'TC-' + Math.floor(100000 + Math.random() * 900000),
      company: selectedRoute.company,
      time: selectedRoute.time,
      day: selectedDay === 'All Days' ? 'Today' : selectedDay,
      seat: selectedSeat,
      price: selectedRoute.price || 14.0,
      bookedAt: new Date().toLocaleDateString(),
      passengerName: user?.name || 'Guest Traveler',
    };
    onBookTicket(newTicket);
    setBookingModalOpen(false);
    onShowToast(`Ticket Confirmed! Seat ${selectedSeat} on ${selectedRoute.company}`);
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Top Banner with Illustration */}
      <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-2xl border border-teal-100">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Your <br />
            <span className="text-teal-600">Bus Route</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Real-time terminal timetable</p>
        </div>

        {/* Bus SVG Graphic */}
        <div className="w-24 h-16 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
            <rect x="120" y="40" width="15" height="50" fill="#B2EBF2" />
            <rect x="140" y="20" width="20" height="70" fill="#80DEEA" />
            <rect x="165" y="50" width="15" height="40" fill="#B2EBF2" />
            <rect x="100" y="60" width="15" height="30" fill="#B2EBF2" />
            <rect x="20" y="50" width="70" height="38" rx="8" fill="#00A99D" />
            <rect x="26" y="56" width="18" height="14" rx="2" fill="#E0F2F1" />
            <rect x="48" y="56" width="18" height="14" rx="2" fill="#E0F2F1" />
            <rect x="70" y="56" width="14" height="14" rx="2" fill="#E0F2F1" />
            <circle cx="36" cy="90" r="8" fill="#1E293B" />
            <circle cx="36" cy="90" r="3" fill="#E2E8F0" />
            <circle cx="74" cy="90" r="8" fill="#1E293B" />
            <circle cx="74" cy="90" r="3" fill="#E2E8F0" />
            <circle cx="100" cy="72" r="10" fill="#81C784" />
            <rect x="98" y="82" width="4" height="8" fill="#5D4037" />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search bus (e.g. BJC, AC terminal)..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
        />
      </div>

      {/* Day Picker Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {days.map((day) => {
          const isActive = selectedDay === day;
          const isAll = day === 'All Days';
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? isAll
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Dropdown & Filters Row */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
            routeFilter !== 'all'
              ? 'bg-teal-50 border-teal-200 text-teal-700'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <span>
            {routeFilter === 'all' ? 'All Routes (Both BJC & AC)' : `${routeFilter} Route`}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
            <div
              onClick={() => {
                setRouteFilter('all');
                setIsDropdownOpen(false);
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer hover:bg-teal-50 ${
                routeFilter === 'all' ? 'font-bold text-teal-700 bg-teal-50/60' : 'text-slate-700'
              }`}
            >
              <div>
                <p className="font-semibold">All Routes</p>
                <p className="text-[10px] text-slate-400">View both BJC & AC</p>
              </div>
              {routeFilter === 'all' && <Check className="w-3.5 h-3.5 text-teal-600" />}
            </div>

            <div
              onClick={() => {
                setRouteFilter('BJC');
                setIsDropdownOpen(false);
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer hover:bg-teal-50 ${
                routeFilter === 'BJC' ? 'font-bold text-teal-700 bg-teal-50/60' : 'text-slate-700'
              }`}
            >
              <div>
                <p className="font-semibold">BJC Route</p>
                <p className="text-[10px] text-slate-400">BJC Central Station</p>
              </div>
              {routeFilter === 'BJC' && <Check className="w-3.5 h-3.5 text-teal-600" />}
            </div>

            <div
              onClick={() => {
                setRouteFilter('AC');
                setIsDropdownOpen(false);
              }}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer hover:bg-teal-50 ${
                routeFilter === 'AC' ? 'font-bold text-teal-700 bg-teal-50/60' : 'text-slate-700'
              }`}
            >
              <div>
                <p className="font-semibold">AC Route</p>
                <p className="text-[10px] text-slate-400">AC North Terminal</p>
              </div>
              {routeFilter === 'AC' && <Check className="w-3.5 h-3.5 text-teal-600" />}
            </div>
          </div>
        )}
      </div>

      {/* Departures Table Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Departures ({routes.length})
          </h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse-glow" />
            Live Updates
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Bus Line</th>
                <th className="py-2.5 px-3">Departure Time</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {routes.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-400">
                    <p className="text-xs font-semibold">No bus departures found</p>
                    <p className="text-[10px] mt-0.5">Try changing the day or search filter</p>
                  </td>
                </tr>
              ) : (
                routes.map((route, idx) => {
                  const isNext = idx === nextBusIndex;
                  return (
                    <tr
                      key={`${route.company}-${route.time}-${idx}`}
                      onClick={() => handleSelectRoute(route)}
                      className={`cursor-pointer transition-colors ${
                        isNext
                          ? 'bg-teal-50/50 hover:bg-teal-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white ${
                              route.company === 'BJC' ? 'bg-indigo-600' : 'bg-teal-600'
                            }`}
                          >
                            {route.company}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800">{route.company} Bus</span>
                            <p className="text-[10px] text-slate-400 font-normal">
                              {route.terminal || 'Main Terminal'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isNext ? 'text-teal-700' : 'text-slate-800'}`}>
                            {formatTime(route.time)}
                          </span>
                          {isNext && (
                            <span className="px-1.5 py-0.5 rounded bg-teal-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                              Next
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRoute(route);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-bold shadow-xs active:scale-95 transition-all"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bus Booking Sheet / Modal */}
      {bookingModalOpen && selectedRoute && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end justify-center backdrop-blur-xs p-0">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-teal-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Book Bus Ticket - {selectedRoute.company}
                </h3>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Route:</span>
                <span className="font-bold text-slate-800">{selectedRoute.company} Express Line</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Terminal:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  {selectedRoute.terminal || 'Central Bus Station'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Departure Time:</span>
                <span className="font-semibold text-teal-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(selectedRoute.time)} ({selectedDay})
                </span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-200 pt-2">
                <span className="text-slate-500 font-medium">Fare:</span>
                <span className="font-extrabold text-teal-700 text-sm">
                  ${selectedRoute.price?.toFixed(2) || '14.00'}
                </span>
              </div>
            </div>

            {/* Seat Selector */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Select Your Seat:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {['04A', '08B', '12A', '15C', '19D'].map((seat) => (
                  <button
                    key={seat}
                    onClick={() => setSelectedSeat(seat)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSeat === seat
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 active:scale-95 transition-all"
              >
                Confirm & Issue Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
