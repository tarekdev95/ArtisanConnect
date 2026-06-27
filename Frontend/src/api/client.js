const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Erreur réseau" }));
    throw new Error(error.detail || `Erreur ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  auth: {
    login: (data) =>
      request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    register: (data) =>
      request("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => request("/auth/me"),
  },

  artisans: {
    list: (params = {}) => {
      const query = new URLSearchParams();
      if (params.ville) query.set("ville", params.ville);
      if (params.specialite) query.set("specialite", params.specialite);
      if (params.skip != null) query.set("skip", params.skip);
      if (params.limit != null) query.set("limit", params.limit);
      const qs = query.toString();
      return request(`/artisans/${qs ? "?" + qs : ""}`);
    },
    get: (id) => request(`/artisans/${id}`),
  },

  reservations: {
    create: (data) =>
      request("/reservations/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => request("/reservations/me"),
  },

  avis: {
    forArtisan: (artisanId) => request(`/avis/artisan/${artisanId}`),
    create: (data) =>
      request("/avis/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
