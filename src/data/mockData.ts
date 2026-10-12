import { BusRoute, Book, Hostel, Course } from '../types';

export const scheduleData: Record<string, BusRoute[]> = {
  Monday: [
    { company: 'BJC', time: '08:15', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 14 },
    { company: 'AC', time: '10:45', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 8 },
    { company: 'BJC', time: '13:30', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 22 },
    { company: 'AC', time: '16:20', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 5 },
    { company: 'BJC', time: '19:45', terminal: 'BJC Central Station', price: 14.00, seatsAvailable: 18 },
    { company: 'AC', time: '22:10', terminal: 'AC North Terminal', price: 16.50, seatsAvailable: 12 }
  ],
  Tuesday: [
    { company: 'AC', time: '07:30', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 19 },
    { company: 'BJC', time: '09:50', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 7 },
    { company: 'AC', time: '12:15', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 11 },
    { company: 'BJC', time: '15:40', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 25 },
    { company: 'AC', time: '18:20', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 16 },
    { company: 'BJC', time: '21:00', terminal: 'BJC Central Station', price: 14.00, seatsAvailable: 20 }
  ],
  Wednesday: [
    { company: 'BJC', time: '06:45', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 15 },
    { company: 'AC', time: '08:55', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 9 },
    { company: 'BJC', time: '11:25', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 21 },
    { company: 'AC', time: '14:10', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 14 },
    { company: 'BJC', time: '17:35', terminal: 'BJC Central Station', price: 14.00, seatsAvailable: 6 },
    { company: 'AC', time: '20:50', terminal: 'AC North Terminal', price: 16.50, seatsAvailable: 23 }
  ],
  Thursday: [
    { company: 'AC', time: '07:10', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 18 },
    { company: 'BJC', time: '09:40', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 12 },
    { company: 'AC', time: '12:05', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 8 },
    { company: 'BJC', time: '15:30', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 17 },
    { company: 'AC', time: '18:15', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 22 },
    { company: 'BJC', time: '21:20', terminal: 'BJC Central Station', price: 14.00, seatsAvailable: 10 }
  ],
  Friday: [
    { company: 'BJC', time: '06:30', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 20 },
    { company: 'AC', time: '08:45', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 13 },
    { company: 'BJC', time: '11:15', terminal: 'BJC Central Station', price: 12.50, seatsAvailable: 16 },
    { company: 'AC', time: '14:00', terminal: 'AC North Terminal', price: 15.00, seatsAvailable: 9 },
    { company: 'BJC', time: '17:20', terminal: 'BJC Central Station', price: 14.00, seatsAvailable: 4 },
    { company: 'AC', time: '20:10', terminal: 'AC North Terminal', price: 16.50, seatsAvailable: 11 }
  ],
  Saturday: [
    { company: 'AC', time: '08:00', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 15 },
    { company: 'BJC', time: '10:30', terminal: 'BJC Central Station', price: 13.50, seatsAvailable: 22 },
    { company: 'AC', time: '13:15', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 18 },
    { company: 'BJC', time: '16:45', terminal: 'BJC Central Station', price: 13.50, seatsAvailable: 14 },
    { company: 'AC', time: '19:30', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 7 },
    { company: 'BJC', time: '22:00', terminal: 'BJC Central Station', price: 15.00, seatsAvailable: 25 }
  ],
  Sunday: [
    { company: 'BJC', time: '09:15', terminal: 'BJC Central Station', price: 13.50, seatsAvailable: 21 },
    { company: 'AC', time: '11:50', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 19 },
    { company: 'BJC', time: '14:30', terminal: 'BJC Central Station', price: 13.50, seatsAvailable: 16 },
    { company: 'AC', time: '17:10', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 10 },
    { company: 'BJC', time: '20:00', terminal: 'BJC Central Station', price: 15.00, seatsAvailable: 12 },
    { company: 'AC', time: '22:30', terminal: 'AC North Terminal', price: 16.00, seatsAvailable: 28 }
  ]
};

export const booksData: Book[] = [
  {
    id: 'book-1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    pages: 288,
    readTime: '4.5 hrs',
    sampleExcerpt: 'Between life and death there is a library, said Mrs. Elm. And within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices...'
  },
  {
    id: 'book-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'An easy & proven way to build good habits and break bad ones. Small changes make a big difference in long-term personal success.',
    pages: 320,
    readTime: '5.2 hrs',
    sampleExcerpt: 'Habits are the compound interest of self-improvement. Getting 1 percent better every day counts for a lot in the long run. If you can get 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.'
  },
  {
    id: 'book-3',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
    pages: 208,
    readTime: '3.5 hrs',
    sampleExcerpt: 'And, when you want something, all the universe conspires in helping you to achieve it. It’s what you have always wanted to accomplish. Everyone, when they are young, knows what their Personal Legend is.'
  },
  {
    id: 'book-4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'History',
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution, from fire to biotechnology.',
    pages: 443,
    readTime: '8.0 hrs',
    sampleExcerpt: 'One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one: Homo sapiens. What happened to the others? And what may happen to us?'
  },
  {
    id: 'book-5',
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Memoir',
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    pages: 352,
    readTime: '6.0 hrs',
    sampleExcerpt: 'You can love someone and still choose to say goodbye to them, says Westover. You can miss a person every day, and still be glad that they are no longer in your life.'
  },
  {
    id: 'book-6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A timeless fantasy adventure about Bilbo Baggins, a peaceful hobbit who is whisked away into an epic quest across Middle-earth.',
    pages: 310,
    readTime: '5.5 hrs',
    sampleExcerpt: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.'
  },
  {
    id: 'book-7',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Self-Help',
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Rules for focused success in a distracted world. Master the ability to focus without distraction on cognitively demanding tasks.',
    pages: 304,
    readTime: '5.0 hrs',
    sampleExcerpt: 'Deep work is the ability to focus without distraction on a cognitively demanding task. It is a skill that allows you to quickly master complicated information and produce better results in less time.'
  },
  {
    id: 'book-8',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    category: 'Spiritual',
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A guide to spiritual enlightenment that emphasizes the importance of living in the present moment rather than dwelling on the past or future.',
    pages: 236,
    readTime: '4.0 hrs',
    sampleExcerpt: 'Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life. Life is now. There was never a time when your life was not now, nor will there ever be.'
  }
];

export const hostelsData: Hostel[] = [
  {
    id: 1,
    name: 'The Urban Nomad',
    location: 'Shoreditch, London',
    rating: 4.8,
    reviewsCount: 342,
    price: 35,
    description: 'A vibrant hostel in the heart of East London. Perfect for digital nomads and creatives, featuring coworking pods and rooftop terrace.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    amenities: ['High-speed WiFi', 'Free Breakfast', 'AC & Climate', '24/7 Reception', 'Coworking Lounge', 'Keyless Entry'],
    rooms: [
      { id: 'un-1', name: 'Mixed Dorm - 6 Beds', price: 35, desc: 'Shared bathroom, individual privacy pod, lockable storage, reading light', features: ['Privacy Curtain', 'Power Outlets', 'Personal Locker'], capacity: 6, available: true },
      { id: 'un-2', name: 'Female Dorm - 4 Beds', price: 40, desc: 'Women only, ensuite bathroom, makeup mirror, security access', features: ['Ensuite Bath', 'Hair Dryer', 'Secure Entry'], capacity: 4, available: true },
      { id: 'un-3', name: 'Private Ensuite Pod', price: 85, desc: 'Private bathroom, double bed, dedicated desk, panoramic window', features: ['Double Bed', 'Private Bath', 'Work Desk'], capacity: 2, available: true }
    ]
  },
  {
    id: 2,
    name: 'Backpackers Paradise',
    location: 'Camden Town, London',
    rating: 4.5,
    reviewsCount: 518,
    price: 28,
    description: 'Famous for its lively atmosphere, weekly pub crawls, social kitchen, and friendly multilingual staff near the Camden canal.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    amenities: ['High-speed WiFi', 'Social Bar', 'AC & Climate', 'Luggage Storage', 'Free City Tour', 'Common Kitchen'],
    rooms: [
      { id: 'bp-1', name: 'Mixed Dorm - 8 Beds', price: 28, desc: 'Shared bathroom, sturdy timber bunk, free luggage locker, power sockets', features: ['Under-bed Locker', 'Bunk Light', 'Linen Included'], capacity: 8, available: true },
      { id: 'bp-2', name: 'Mixed Dorm - 4 Beds', price: 38, desc: 'Spacious 4-bed dorm with orthopaedic mattress and reading lamp', features: ['Spacious Layout', 'Personal Light', 'Daily Housekeeping'], capacity: 4, available: true },
      { id: 'bp-3', name: 'Private Twin Room', price: 75, desc: 'Shared bathroom, two comfortable single beds, smart mirror', features: ['Two Single Beds', 'Camden Street View', 'Wardrobe'], capacity: 2, available: true }
    ]
  },
  {
    id: 3,
    name: 'The Royal Stay',
    location: 'Westminster, London',
    rating: 4.9,
    reviewsCount: 689,
    price: 55,
    description: 'Luxury boutique hostel experience with premium amenities, soundproof rooms, and a stunning 360-degree city skyline terrace.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    amenities: ['High-speed WiFi', 'Gourmet Breakfast', 'AC & Climate', 'Rooftop Bar', 'Rainfall Showers', 'Concierge Service'],
    rooms: [
      { id: 'rs-1', name: 'Deluxe Dorm - 4 Beds', price: 55, desc: 'Ensuite marble bathroom, acoustic curtains, premium memory foam mattress', features: ['Ensuite Marble Bath', 'Memory Foam', 'Silent Pods'], capacity: 4, available: true },
      { id: 'rs-2', name: 'Private Luxury Ensuite', price: 120, desc: 'King size bed, marble bathroom, skyline view, ergonomic workstation', features: ['King Bed', 'City Skyline View', 'Nespresso Machine'], capacity: 2, available: true },
      { id: 'rs-3', name: 'Rooftop Penthouse Suite', price: 180, desc: 'Private terrace access, king bed, lounge area, complimentary mini bar', features: ['Private Terrace', 'Lounge Area', 'VIP Lounge Access'], capacity: 2, available: true }
    ]
  },
  {
    id: 4,
    name: 'Cozy Corner Hostel',
    location: 'Notting Hill, London',
    rating: 4.6,
    reviewsCount: 275,
    price: 32,
    description: 'A peaceful, charming townhouse hostel surrounded by pastel houses and cozy cafes, ideal for unwinding after busy travels.',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    amenities: ['High-speed WiFi', 'Free Organic Breakfast', 'Garden Patio', 'Book Exchange Library', 'Tea & Coffee Bar'],
    rooms: [
      { id: 'cc-1', name: 'Mixed Dorm - 6 Beds', price: 32, desc: 'Garden facing, wooden bunks, secure personal locker, organic tea bar', features: ['Garden View', 'Locker', 'Free Morning Tea'], capacity: 6, available: true },
      { id: 'cc-2', name: 'Female Dorm - 6 Beds', price: 35, desc: 'Quiet floor, vanity mirror, shared modern bath, premium cotton sheets', features: ['Female Only', 'Vanity Mirror', 'Quiet Hours'], capacity: 6, available: true },
      { id: 'cc-3', name: 'Private Double Room', price: 80, desc: 'Double bed, courtyard view, private coffee maker, high ceilings', features: ['Double Bed', 'Courtyard View', 'Espresso Machine'], capacity: 2, available: true }
    ]
  }
];

export const timetableData: Record<string, Course[]> = {
  Monday: [
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '08:00', end: '09:30', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'React, TypeScript, PWA, and modern responsive mobile interfaces.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '09:45', end: '11:15', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Statistical analysis, Python, machine learning algorithms and pipelines.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '11:30', end: '13:00', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'UI/UX design systems, typography hierarchy, mobile user flows.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '14:00', end: '15:30', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Growth marketing, search optimization, mobile app acquisition channels.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '15:45', end: '17:15', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Forecasting, quantitative models, decision support systems.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '17:30', end: '19:00', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Android native architecture, Kotlin, Jetpack, WebAPK and PWAs.' }
  ],
  Tuesday: [
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '08:30', end: '10:00', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Exploratory data analysis and clustering techniques.' },
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '10:15', end: '11:45', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'State management and client routing.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '12:00', end: '13:30', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Social media campaigns and funnel analytics.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '14:30', end: '16:00', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'Design tokens and vector iconography.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '16:15', end: '17:45', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Lifecycle handling and persistent background storage.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '18:00', end: '19:30', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Executive metric dashboards.' }
  ],
  Wednesday: [
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '08:00', end: '09:30', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'Motion graphics and micro-interactions.' },
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '09:45', end: '11:15', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'Service workers and offline caching strategies.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '11:30', end: '13:00', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Predictive customer churn analysis.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '14:00', end: '15:30', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Deep learning introduction and PyTorch.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '15:45', end: '17:15', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Email automation and audience retargeting.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '17:30', end: '19:00', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Push notifications and offline sync.' }
  ],
  Thursday: [
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '08:30', end: '10:00', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Native hardware sensors and GPS location.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '10:15', end: '11:45', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'Branding kits and style guide documentation.' },
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '12:00', end: '13:30', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'Web performance auditing and Lighthouse scores.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '14:30', end: '16:00', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'A/B landing page conversion tests.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '16:15', end: '17:45', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Natural language processing fundamentals.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '18:00', end: '19:30', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Financial modeling and scenario planning.' }
  ],
  Friday: [
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '08:00', end: '09:30', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Capstone case study review.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '09:45', end: '11:15', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Publishing to Google Play Store and APK signing.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '11:30', end: '13:00', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Project presentation and model evaluation.' },
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '14:00', end: '15:30', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'Full-stack demo and deployment pipeline.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '15:45', end: '17:15', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'Design portfolio critique.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '17:30', end: '19:00', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Live ad campaign analysis and review.' }
  ],
  Saturday: [
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '09:00', end: '10:30', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Weekend workshop: Influencer partnership tactics.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '10:45', end: '12:15', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'SQL advanced queries & database optimization.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '12:30', end: '14:00', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'Cross-platform tools and hybrid frameworks.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '14:30', end: '16:00', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: '3D UI elements and spatial interface trends.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '16:15', end: '17:45', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Big data tools: Spark and distributed pipelines.' },
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '18:00', end: '19:30', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'Hackathon coding session & peer code review.' }
  ],
  Sunday: [
    { id: 'c1', code: 'CS301', name: 'Web Development', instructor: 'Dr. Sarah Smith', start: '10:00', end: '11:30', room: 'Room 101', building: 'Tech Hall A', colorClass: 'bg-blue-600', description: 'Open mentoring hour & architecture design questions.' },
    { id: 'c6', code: 'MA220', name: 'Mobile App Dev', instructor: 'Prof. Robert Brown', start: '11:45', end: '13:15', room: 'Room 108', building: 'Tech Hall B', colorClass: 'bg-rose-600', description: 'App store optimization (ASO) & monetization models.' },
    { id: 'c3', code: 'GD102', name: 'Graphic Design', instructor: 'Ms. Emily Chen', start: '13:30', end: '15:00', room: 'Studio 3', building: 'Arts Wing', colorClass: 'bg-pink-600', description: 'Color theory and accessibility WCAG standards.' },
    { id: 'c2', code: 'DS204', name: 'Data Science', instructor: 'Prof. James Lee', start: '15:15', end: '16:45', room: 'Lab 202', building: 'Science Center', colorClass: 'bg-purple-600', description: 'Research symposium & paper reading group.' },
    { id: 'c5', code: 'BA401', name: 'Business Analytics', instructor: 'Dr. Maria Garcia', start: '17:00', end: '18:30', room: 'Lab 204', building: 'Business School', colorClass: 'bg-emerald-600', description: 'Case study: Scaling startups with data metrics.' },
    { id: 'c4', code: 'MK305', name: 'Digital Marketing', instructor: 'Mr. David Kim', start: '18:45', end: '20:15', room: 'Room 105', building: 'Business School', colorClass: 'bg-amber-600', description: 'Future trends in AI-driven programmatic advertising.' }
  ]
};
