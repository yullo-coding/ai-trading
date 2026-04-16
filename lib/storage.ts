import { getSupabase } from './supabase'

export type OptionKey = 'A' | 'B' | 'C' | 'D'

export interface ClickEvent {
  option: OptionKey
  timestamp: number
  hoverDuration?: number
}

export interface NotificationSignup {
  phone: string
  selectedOptions: OptionKey[]
  optionLabels: string[]
  timestamp: number
}

export interface FreeOpinion {
  text: string
  selectedOptions: OptionKey[]
  timestamp: number
  phone?: string
}

const KEYS = {
  clicks: 'ai_trading_clicks',
  signups: 'ai_trading_signups',
  opinions: 'ai_trading_opinions',
  selectedOptions: 'ai_trading_selected_options',
  signupPhone: 'ai_trading_signup_phone',
}

function safeLocalStorage() {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

export function recordClick(event: ClickEvent) {
  const ls = safeLocalStorage()
  if (!ls) return
  const existing: ClickEvent[] = JSON.parse(ls.getItem(KEYS.clicks) || '[]')
  existing.push(event)
  ls.setItem(KEYS.clicks, JSON.stringify(existing))

  getSupabase()?.from('clicks').insert({
    option: event.option,
    timestamp: event.timestamp,
    hover_duration: event.hoverDuration ?? null,
  }).then(({ error }: { error: unknown }) => { if (error) console.error('[supabase] clicks:', error) })
}

export function recordSignup(signup: NotificationSignup) {
  const ls = safeLocalStorage()
  if (!ls) return
  const existing: NotificationSignup[] = JSON.parse(ls.getItem(KEYS.signups) || '[]')
  existing.push(signup)
  ls.setItem(KEYS.signups, JSON.stringify(existing))

  getSupabase()?.from('signups').insert({
    phone: signup.phone,
    selected_options: signup.selectedOptions,
    option_labels: signup.optionLabels,
    timestamp: signup.timestamp,
  }).then(({ error }: { error: unknown }) => { if (error) console.error('[supabase] signups:', error) })
}

export function recordOpinion(opinion: FreeOpinion) {
  const ls = safeLocalStorage()
  if (!ls) return
  const existing: FreeOpinion[] = JSON.parse(ls.getItem(KEYS.opinions) || '[]')
  existing.push(opinion)
  ls.setItem(KEYS.opinions, JSON.stringify(existing))

  getSupabase()?.from('opinions').insert({
    text: opinion.text,
    selected_options: opinion.selectedOptions,
    timestamp: opinion.timestamp,
    phone: opinion.phone ?? null,
  }).then(({ error }: { error: unknown }) => { if (error) console.error('[supabase] opinions:', error) })
}

export function saveSignupPhone(phone: string) {
  const ls = safeLocalStorage()
  if (!ls) return
  ls.setItem(KEYS.signupPhone, phone)
}

export function loadSignupPhone(): string | null {
  const ls = safeLocalStorage()
  if (!ls) return null
  return ls.getItem(KEYS.signupPhone)
}

export function saveSelectedOptions(options: OptionKey[]) {
  const ls = safeLocalStorage()
  if (!ls) return
  ls.setItem(KEYS.selectedOptions, JSON.stringify(options))
}

export function loadSelectedOptions(): OptionKey[] {
  const ls = safeLocalStorage()
  if (!ls) return []
  return JSON.parse(ls.getItem(KEYS.selectedOptions) || '[]') as OptionKey[]
}

export function getAllData() {
  const ls = safeLocalStorage()
  if (!ls) return null
  return {
    clicks: JSON.parse(ls.getItem(KEYS.clicks) || '[]') as ClickEvent[],
    signups: JSON.parse(ls.getItem(KEYS.signups) || '[]') as NotificationSignup[],
    opinions: JSON.parse(ls.getItem(KEYS.opinions) || '[]') as FreeOpinion[],
    selectedOptions: loadSelectedOptions(),
  }
}
