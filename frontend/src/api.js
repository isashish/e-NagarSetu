const API_BASE_URL = 'http://localhost:8080/api';

export const fetchComplaints = async () => {
  const response = await fetch(`${API_BASE_URL}/complaints`);
  if (!response.ok) throw new Error('Failed to fetch complaints');
  return response.json();
};

export const createComplaint = async (complaintData) => {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(complaintData),
  });
  if (!response.ok) throw new Error('Failed to create complaint');
  return response.json();
};

export const fetchNotices = async () => {
  const response = await fetch(`${API_BASE_URL}/notices`);
  if (!response.ok) throw new Error('Failed to fetch notices');
  return response.json();
};

export const fetchBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
};

export const fetchPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payments`);
  if (!response.ok) throw new Error('Failed to fetch payments');
  return response.json();
};

export const fetchDocuments = async (ownerId) => {
  const response = await fetch(`${API_BASE_URL}/vault/${ownerId}`);
  if (!response.ok) throw new Error('Failed to fetch documents');
  return response.json();
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};

export const makePayment = async (paymentData) => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  return response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Update failed');
  }
  return response.json();
};

export const fetchVehicles = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles`);
  if (!response.ok) throw new Error('Failed to fetch vehicles');
  return response.json();
};

export const updateVehicleLocation = async (vehicleId, lat, lng) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}/location?lat=${lat}&lng=${lng}`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Failed to update vehicle location');
  return response.json();
};

export const assignVehicle = async (userId, vehicleId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/assign-vehicle/${vehicleId}`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Failed to assign vehicle');
  return response.json();
};

export const fetchWastePickups = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/waste/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch waste pickups');
  return response.json();
};

export const createWastePickup = async (pickupData) => {
  const response = await fetch(`${API_BASE_URL}/waste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pickupData),
  });
  if (!response.ok) throw new Error('Failed to schedule waste pickup');
  return response.json();
};
