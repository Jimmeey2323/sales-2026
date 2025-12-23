"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProviderProps } from "next-themes/dist/types"

type Theme = "dark" | "light" | "system"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  value: _value,
  ...props
}: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return (savedTheme && (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system")
        ? (savedTheme as Theme)
        : defaultTheme) as Theme
    }
    return defaultTheme as Theme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const applyTheme = () => {
      const applied = themeState === "system"
        ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : themeState
      root.classList.remove("light", "dark")
      root.classList.add(applied)
    }

    applyTheme()

    // Listen for system theme changes when in system mode
    if (themeState === "system" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme()
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [themeState])

  const setThemeValue = (t: Theme) => {
    try {
      localStorage.setItem("theme", t)
    } catch (e) {
      // ignore
    }
    setThemeState(t)
  }

  const toggleTheme = () => {
    setThemeValue(themeState === 'dark' ? 'light' : 'dark')
  }

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch (e) {
      return false
    }
  }

  const value: ThemeContextType & { toggleTheme?: () => void; prefersReducedMotion?: () => boolean } = {
    theme: themeState,
    setTheme: setThemeValue,
    toggleTheme,
    prefersReducedMotion,
  }

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext) as any
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context as {
    theme: Theme
    setTheme: (t: Theme) => void
    toggleTheme: () => void
    prefersReducedMotion: () => boolean
  }
}
