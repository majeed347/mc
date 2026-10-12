import React, { useState, useMemo } from 'react';
import { Clock, MapPin, User, BookOpen, Bell } from 'lucide-react';
import { timetableData } from '../data/mockData';
import { Course } from '../types';

interface TimetableTabProps {
  onShowToast: (msg: string) => void;
}

export const TimetableTab: React.FC<TimetableTabProps> = ({ onShowToast }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [remindersEnabled, setRemindersEnabled] = useState<Record<string, boolean>>({});

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const courses = useMemo(() => {
    return timetableData[selectedDay] || [];
  }, [selectedDay]);

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

  // Find next upcoming course
  const nextCourseIndex = useMemo(() => {
    for (let i = 0; i < courses.length; i++) {
      const [h, m] = courses[i].start.split(':').map(Number);
      const courseM = h * 60 + m;
      if (courseM >= currentMinutes) {
        return i;
      }
    }
    return -1;
  }, [courses, currentMinutes]);

  const toggleReminder = (courseId: string) => {
    setRemindersEnabled((prev) => {
      const next = !prev[courseId];
      onShowToast(next ? 'Reminder set 15m before class' : 'Reminder turned off');
      return { ...prev, [courseId]: next };
    });
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Timetable</h1>
        <p className="text-xs text-slate-500 font-medium">Your weekly academic & training schedule</p>
      </div>

      {/* Day Picker Scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {days.map((day) => {
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {courses.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-slate-700">No classes scheduled</p>
            <p className="text-[10px] text-slate-500">Enjoy your rest day!</p>
          </div>
        ) : (
          courses.map((course, index) => {
            const isNext = index === nextCourseIndex;
            const startTime = formatTime(course.start);
            const endTime = formatTime(course.end);
            const hasReminder = !!remindersEnabled[course.id];

            return (
              <div
                key={`${course.code}-${index}`}
                onClick={() => setActiveCourse(course)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 relative active:scale-[0.99] ${
                  isNext
                    ? 'border-teal-500 bg-teal-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Course color badge */}
                <div
                  className={`w-11 h-11 rounded-xl ${course.colorClass} text-white flex flex-col items-center justify-center font-extrabold text-xs shadow-xs flex-shrink-0`}
                >
                  <span className="text-[10px] opacity-80 leading-none">C{index + 1}</span>
                  <span className="text-[11px] leading-tight font-black">{course.code.slice(0, 3)}</span>
                </div>

                {/* Course info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs text-slate-900 truncate">{course.name}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                    <User className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span>{course.instructor}</span>
                  </p>

                  <div className="flex items-center gap-3 mt-1.5 text-[10px]">
                    <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {startTime} - {endTime}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {course.room}
                    </span>
                  </div>
                </div>

                {/* Next badge indicator */}
                {isNext && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-teal-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                    Next
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Course Detail Modal */}
      {activeCourse && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end justify-center backdrop-blur-xs p-0">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${activeCourse.colorClass} text-white flex items-center justify-center font-bold text-xs`}
                >
                  {activeCourse.code}
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {activeCourse.name}
                  </h2>
                  <p className="text-xs text-slate-500">{activeCourse.instructor}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Day & Time:</span>
                <span className="font-bold text-slate-800">
                  {selectedDay}, {formatTime(activeCourse.start)} - {formatTime(activeCourse.end)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-800">
                  {activeCourse.building || 'Campus'} - {activeCourse.room}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course Code:</span>
                <span className="font-bold text-teal-700">{activeCourse.code}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-800 mb-1">Topics & Syllabus</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {activeCourse.description ||
                  'Comprehensive lecture on core frameworks, hands-on lab exercises, and assignment debrief.'}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleReminder(activeCourse.id)}
                className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  remindersEnabled[activeCourse.id]
                    ? 'bg-teal-50 border-teal-300 text-teal-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>
                  {remindersEnabled[activeCourse.id] ? 'Reminder Set' : 'Set Class Alert'}
                </span>
              </button>

              <button
                onClick={() => {
                  onShowToast(`Downloading lecture materials for ${activeCourse.name}...`);
                  setTimeout(() => onShowToast(`Lecture notes saved!`), 800);
                }}
                className="flex-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 active:scale-95 transition-all"
              >
                Download Lecture Slides
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
