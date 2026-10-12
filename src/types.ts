export interface BusRoute {
  company: 'BJC' | 'AC';
  time: string; // 24hr format HH:mm
  day?: string;
  terminal?: string;
  price?: number;
  seatsAvailable?: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  cover: string;
  description: string;
  pages: number;
  readTime: string;
  sampleExcerpt?: string;
}

export interface RoomOption {
  id: string;
  name: string;
  price: number;
  desc: string;
  features: string[];
  capacity: number;
  available: boolean;
}

export interface Hostel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: number;
  description: string;
  image: string;
  rooms: RoomOption[];
  amenities: string[];
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  start: string; // HH:mm
  end: string; // HH:mm
  room: string;
  building?: string;
  colorClass: string;
  code: string;
  description?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
}

export interface BusTicket {
  ticketId: string;
  company: string;
  time: string;
  day: string;
  seat: string;
  price: number;
  bookedAt: string;
  passengerName: string;
}

export interface HostelBooking {
  bookingId: string;
  hostelName: string;
  roomName: string;
  price: number;
  checkInDate: string;
  nights: number;
  guestName: string;
}
