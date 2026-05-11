import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ni_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('ni_token')
      localStorage.removeItem('ni_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api

// ─── Auth ───────────────────────────────────────
export const authAPI = {
  signup: (data: Record<string, string>) => api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data: Record<string, string>) => api.patch('/auth/update-profile', data),
}

// ─── Courses ─────────────────────────────────────
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getBySlug: (slug: string) => api.get(`/courses/${slug}`),
}

// ─── Batches ─────────────────────────────────────
export const batchesAPI = {
  getAll: (params?: Record<string, string>) => api.get('/batches', { params }),
}

// ─── Enrollments ─────────────────────────────────
export const enrollmentsAPI = {
  myEnrollments: () => api.get('/enrollments/my-enrollments'),
}

// ─── Payments ────────────────────────────────────
export const paymentsAPI = {
  createOrder: (data: Record<string, string>) => api.post('/payments/create-order', data),
  verify: (data: Record<string, string>) => api.post('/payments/verify', data),
  myPayments: () => api.get('/payments/my-payments'),
}

// ─── Testimonials ────────────────────────────────
export const testimonialsAPI = {
  getApproved: () => api.get('/testimonials'),
}

// ─── Admin ───────────────────────────────────────
export const adminAPI = {
  dashboard: () => api.get('/admin/dashboard'),
  students: (params?: Record<string, string>) => api.get('/admin/students', { params }),
  payments: (params?: Record<string, string>) => api.get('/admin/payments', { params }),
  allEnrollments: (params?: Record<string, string>) => api.get('/enrollments', { params }),
  settings: () => api.get('/admin/settings'),
  updateSetting: (data: Record<string, unknown>) => api.put('/admin/settings', data),
  allTestimonials: () => api.get('/admin/testimonials'),
  updateTestimonial: (id: string, data: Record<string, unknown>) => api.patch(`/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete(`/testimonials/${id}`),
  updateCourse: (id: string, data: Record<string, unknown>) => api.patch(`/courses/${id}`, data),
  createBatch: (data: Record<string, unknown>) => api.post('/batches', data),
  updateBatch: (id: string, data: Record<string, unknown>) => api.patch(`/batches/${id}`, data),
  deleteBatch: (id: string) => api.delete(`/batches/${id}`),
}
