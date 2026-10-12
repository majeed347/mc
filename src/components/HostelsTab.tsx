import React, { useState } from 'react';
import { Star, MapPin, Wifi, Coffee, Wind, Shield, Users, Check, Calendar } from 'lucide-react';
import { hostelsData } from '../data/mockData';
import { Hostel, RoomOption, HostelBooking, UserProfile } from '../types';

interface HostelsTabProps {
  user: UserProfile | null;
  onBookHostel: (booking: HostelBooking) => void;
  onShowToast: (msg: string) => void;
}

export const HostelsTab: React.FC<HostelsTabProps> = ({ user, onBookHostel, onShowToast }) => {
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
  const [nightsCount, setNightsCount] = useState<number>(2);
  const [bookingSheetOpen, setBookingSheetOpen] = useState<boolean>(false);

  const handleOpenRooms = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    setSelectedRoom(hostel.rooms[0]);
    setBookingSheetOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedHostel || !selectedRoom) return;

    const newBooking: HostelBooking = {
      bookingId: 'HB-' + Math.floor(100000 + Math.random() * 900000),
      hostelName: selectedHostel.name,
      roomName: selectedRoom.name,
      price: selectedRoom.price * nightsCount,
      checkInDate: new Date(Date.now() + 86400000).toLocaleDateString(),
      nights: nightsCount,
      guestName: user?.name || 'Guest Traveler',
    };

    onBookHostel(newBooking);
    setBookingSheetOpen(false);
    onShowToast(`Reservation confirmed at ${selectedHostel.name}!`);
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Hostels & Stays</h1>
        <p className="text-xs text-slate-500 font-medium">Find your home away from home</p>
      </div>

      {/* Hostels List */}
      <div className="space-y-4">
        {hostelsData.map((hostel) => (
          <div
            key={hostel.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Hostel Image */}
            <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
              <img
                src={hostel.image}
                alt={hostel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 text-xs font-bold text-slate-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{hostel.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({hostel.reviewsCount})</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {hostel.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{hostel.location}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
                {hostel.description}
              </p>

              {/* Amenities icons */}
              <div className="flex flex-wrap items-center gap-3 my-3 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-teal-600" /> WiFi
                </span>
                <span className="flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-teal-600" /> Breakfast
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-teal-600" /> AC
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-teal-600" /> Security
                </span>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-teal-700">${hostel.price}</span>
                  <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                </div>

                <button
                  onClick={() => handleOpenRooms(hostel)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
                >
                  View Rooms
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Selection & Booking Bottom Sheet Modal */}
      {bookingSheetOpen && selectedHostel && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end justify-center backdrop-blur-xs p-0">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-extrabold text-base text-slate-900">{selectedHostel.name}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-600" /> {selectedHostel.location}
                </p>
              </div>
              <button
                onClick={() => setBookingSheetOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2.5">
              Select Room Option:
            </h3>

            {/* Room Options Cards */}
            <div className="space-y-2.5 mb-4">
              {selectedHostel.rooms.map((room) => {
                const isSelected = selectedRoom?.id === room.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{room.name}</h4>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{room.desc}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Users className="w-3 h-3" /> Max {room.capacity}
                          </span>
                          {room.features.slice(0, 2).map((feat, i) => (
                            <span
                              key={i}
                              className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right pl-3">
                        <span className="font-extrabold text-teal-700 text-sm">${room.price}</span>
                        <p className="text-[9px] text-slate-400">/ night</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nights selector & Total */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" /> Duration of Stay:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-xs"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-900">{nightsCount} nights</span>
                  <button
                    onClick={() => setNightsCount(nightsCount + 1)}
                    className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                <span className="text-slate-600 font-medium">Estimated Total:</span>
                <span className="font-extrabold text-base text-teal-700">
                  ${(selectedRoom ? selectedRoom.price * nightsCount : 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Confirmation actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setBookingSheetOpen(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={handleConfirmReservation}
                className="flex-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 active:scale-95 transition-all"
              >
                Book This Room Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
