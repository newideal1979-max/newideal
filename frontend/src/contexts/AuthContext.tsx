'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authAPI } from '@/lib/api'

interface User {
  _id: string
  name: string
  email: string
  phone?: string
  role: 'student' | 'admin'
  city?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: Record<string, string>) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('ni_token')
    const storedUser = localStorage.getItem('ni_user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await authAPI.login({ email, password })
    if (!data.success) throw new Error(data.message)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('ni_token', data.token)
    localStorage.setItem('ni_user', JSON.stringify(data.user))
  }

  const signup = async (formData: Record<string, string>) => {
    const { data } = await authAPI.signup(formData)
    if (!data.success) throw new Error(data.message)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('ni_token', data.token)
    localStorage.setItem('ni_user', JSON.stringify(data.user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ni_token')
    localStorage.removeItem('ni_user')
  }

  const updateUser = (data: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem('ni_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
