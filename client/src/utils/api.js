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
    fetchWithCredentials(`/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    fetchWithCredentials(`/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchWithCredentials(`/auth/logout`, {
      method: "POST",
    }),

  getMe: () => fetchWithCredentials(`/auth/me`),
};

// Gigs API
export const gigsAPI = {
  getAll: (search = "") => {
    const url = search
      ? `/gigs?search=${encodeURIComponent(search)}`
      : `/gigs`;
    return fetchWithCredentials(url);
  },

  getById: (id) => fetchWithCredentials(`/gigs/${id}`),

  create: (gigData) =>
    fetchWithCredentials(`/gigs`, {
      method: "POST",
      body: JSON.stringify(gigData),
    }),

  getMyGigs: () => fetchWithCredentials(`/gigs/my-gigs`),
};

// Bids API
export const bidsAPI = {
  submit: (bidData) =>
    fetchWithCredentials(`/bids`, {
      method: "POST",
      body: JSON.stringify(bidData),
    }),

  getByGigId: (gigId) => fetchWithCredentials(`/bids/${gigId}`),

  getMyBids: () => fetchWithCredentials(`/bids/my-bids/all`),

  hire: (bidId) =>
    fetchWithCredentials(`/bids/${bidId}/hire`, {
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
