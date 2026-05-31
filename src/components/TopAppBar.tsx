import React, { useState } from 'react';
import { Bell, CheckCircle2, Info, Check, Trash2, ShieldCheck } from 'lucide-react';
import { SystemNotification } from '../types';

interface TopAppBarProps {
  notifications: SystemNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onMarkAllAsRead: () => void;
}

export default function TopAppBar({
  notifications,
  onMarkAsRead,
  onClearAll,
  onMarkAllAsRead,
}: TopAppBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* Profile Avatar Wrapper */}
        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <img
            alt="User Profile"
            className="w-full h-full object-cover select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjxMOnCACfRz2yL9-MeupUG2jc3soaE1lMMF0X1j54ZanW6JW8cLcHhOkSV5VKMrKgIN89XvBG1mbIAVyEHKl5Wzc1lZeXPWa9ddm3Chlk7EjZk176UR8AMqBqeS47TWRODGtA3rKIKL8j0_lCIS7I3pZb19a0A74fZ19qfRdj6nfY3Ho04BaPY7xxMz1SQzqqhgfPhIEPYn_UKl20kCOGv5iOOoJ11OpRmYeJHywfmWBO8lsRpo1XoVE9dM6S8E3BIsH520HkDOmH"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="font-headline font-bold text-xl tracking-tight text-gray-900 select-none">EcoSync</span>
      </div>

      {/* Notification Controller */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="notif-bell-btn"
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/20"
          aria-label="Toggle notifications menu"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white ring-1 ring-green-400 animate-pulse" />
          )}
        </button>

        {isOpen && (
          <>
            {/* Overlay to close */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Popover Card */}
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-100 pt-4 pb-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="font-headline font-semibold text-gray-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-xs bg-green-50 text-green-700 font-bold rounded">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllAsRead}
                      className="text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Read all
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                      title="Clear notifications list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="py-8 px-4 text-center text-gray-400 text-sm">
                    <CheckCircle2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    No active updates or alerts
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 transition-colors flex gap-3 ${
                        notif.isRead ? 'bg-white opacity-80' : 'bg-green-50/20'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.type === 'success' ? (
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                        ) : (
                          <Info className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-xs text-gray-900 leading-tight">
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-650 leading-normal">{notif.message}</p>
                        {!notif.isRead && (
                          <button
                            onClick={() => onMarkAsRead(notif.id)}
                            className="text-[10px] text-green-700 font-semibold flex items-center gap-1 hover:underline pt-1"
                          >
                            <Check className="w-3 h-3 text-green-600" /> Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
