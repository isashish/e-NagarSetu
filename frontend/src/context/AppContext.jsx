import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Initialize from localStorage for persistence
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ens_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [role, setRole] = useState(() => {
    return localStorage.getItem('ens_role') || null;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your complaint #C-2024 has been resolved', type: 'Complaint', isRead: false, time: '2 min ago' },
    { id: 2, message: 'Garbage pickup scheduled for tomorrow 7 AM', type: 'Alert', isRead: false, time: '1 hr ago' },
    { id: 3, message: 'Property tax payment successful - ₹2,500', type: 'Payment', isRead: true, time: '2 hrs ago' },
  ])

  // Persistence logic
  useEffect(() => {
    if (user) {
      localStorage.setItem('ens_user', JSON.stringify(user));
      localStorage.setItem('ens_role', role);
    } else {
      localStorage.removeItem('ens_user');
      localStorage.removeItem('ens_role');
    }
  }, [user, role]);

  const login = (userData, userRole) => {
    // Process user data to match frontend component expectations
    const processedUser = {
      ...userData,
      name: userData.fullName || userData.username || 'Citizen',
      role: userRole || userData.role?.toLowerCase() || 'citizen'
    };
    setUser(processedUser);
    setRole(processedUser.role);
  };

  const logout = () => {
    setUser(null)
    setRole(null)
    localStorage.removeItem('ens_user');
    localStorage.removeItem('ens_role');
  }

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const [envMetrics, setEnvMetrics] = useState({
    aqi: 72,
    aqiStatus: 'Fair',
    temp: 34,
    condition: 'Sunny',
    lastUpdated: '10 min ago'
  })

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Ward 5 Cleanliness Drive', content: 'Join us this Sunday at 7 AM at the Central Park for a community cleanup initiative.', date: 'Apr 24' },
    { id: 2, title: 'Sewerage Line Maintenance', content: 'Scheduled maintenance in Sector B from 10 AM to 2 PM on Tuesday. Water supply might be affected.', date: 'Apr 19' },
  ])

  const [notices, setNotices] = useState([
    { id: 101, title: '2024 Monsoon Preparedness', date: '5 days ago', category: 'Health' },
    { id: 102, title: 'Property Tax Rebate Extension', date: '1 week ago', category: 'Finance' },
  ])

  return (
    <AppContext.Provider value={{ user, role, notifications, envMetrics, announcements, notices, login, logout, markNotificationRead }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
