import React, { useState, useEffect } from 'react';
import { schedulesAPI } from '../../utils/api';

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchSchedules();
  }, [currentMonth]);

  const fetchSchedules = async () => {
    try {
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      const { data } = await schedulesAPI.getByMonth(month, year);
      setSchedules(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getScheduleForDate = (day) => {
    return schedules.find(s => {
      const scheduleDate = new Date(s.date);
      return scheduleDate.getDate() === day;
    });
  };

  const monthName = currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">Jadwal Pengangkutan Sampah</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevMonth} className="btn btn-secondary text-sm">← Sebelumnya</button>
              <h2 className="text-2xl font-bold">{monthName}</h2>
              <button onClick={nextMonth} className="btn btn-secondary text-sm">Selanjutnya →</button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map(i => (
                <div key={`empty-${i}`} className="aspect-square bg-gray-100 rounded"></div>
              ))}

              {days.map(day => {
                const schedule = getScheduleForDate(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square p-2 rounded border-2 text-center text-sm font-semibold cursor-pointer transition ${
                      schedule
                        ? 'bg-primary text-white border-primary-dark hover:bg-primary-dark'
                        : 'bg-white border-gray-200 hover:border-primary'
                    }`}
                    title={schedule ? schedule.area : ''}
                  >
                    <div className="font-bold">{day}</div>
                    {schedule && <div className="text-xs">📍</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedules List */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">📋 Jadwal Bulan Ini</h2>
          <div className="space-y-3">
            {schedules.length > 0 ? (
              schedules.map(schedule => (
                <div key={schedule.id} className="border-l-4 border-primary pl-3 pb-3">
                  <p className="font-semibold text-sm text-primary">{schedule.area}</p>
                  <p className="text-xs text-gray-600">📅 {new Date(schedule.date).toLocaleDateString('id-ID')}</p>
                  <p className="text-xs text-gray-600">🕐 {schedule.time}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">Tidak ada jadwal untuk bulan ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
