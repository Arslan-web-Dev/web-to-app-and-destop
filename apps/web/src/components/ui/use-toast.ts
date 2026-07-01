'use client'

import * as React from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

type ToastInput = Omit<Toast, 'id'>

// Global state for toasts
let listeners: Array<(toasts: Toast[]) => void> = []
let toasts: Toast[] = []

function emitChange() {
  listeners.forEach((l) => l([...toasts]))
}

export function toast(input: ToastInput) {
  const id = Math.random().toString(36).slice(2)
  toasts = [...toasts, { ...input, id }]
  emitChange()
  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emitChange()
  }, 4000)
}

export function useToast() {
  const [state, setState] = React.useState<Toast[]>(toasts)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])

  return { toasts: state, toast }
}
