const API_URL = import.meta.env.VITE_API_URL;

const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) =>
    fetchWithCredentials(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    fetchWithCredentials(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchWithCredentials(`${API_URL}/auth/logout`, {
      method: "POST",
    }),

  getMe: () => fetchWithCredentials(`${API_URL}/auth/me`),
};

// Gigs API
export const gigsAPI = {
  getAll: (search = "") => {
    const url = search
      ? `${API_URL}/gigs?search=${encodeURIComponent(search)}`
      : `${API_URL}/gigs`;
    return fetchWithCredentials(url);
  },

  getById: (id) => fetchWithCredentials(`${API_URL}/gigs/${id}`),

  create: (gigData) =>
    fetchWithCredentials(`${API_URL}/gigs`, {
      method: "POST",
      body: JSON.stringify(gigData),
    }),

  getMyGigs: () => fetchWithCredentials(`${API_URL}/gigs/my-gigs`),
};

// Bids API
export const bidsAPI = {
  submit: (bidData) =>
    fetchWithCredentials(`${API_URL}/bids`, {
      method: "POST",
      body: JSON.stringify(bidData),
    }),

  getByGigId: (gigId) => fetchWithCredentials(`${API_URL}/bids/${gigId}`),

  getMyBids: () => fetchWithCredentials(`${API_URL}/bids/my-bids/all`),

  hire: (bidId) =>
    fetchWithCredentials(`${API_URL}/bids/${bidId}/hire`, {
      method: "PATCH",
    }),
};

// Default export for convenience
const api = {
  auth: authAPI,
  gigs: gigsAPI,
  bids: bidsAPI,
};

export default api;
