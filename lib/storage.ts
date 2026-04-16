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
}

const KEYS = {
  clicks: 'ai_trading_clicks',
  signups: 'ai_trading_signups',
  opinions: 'ai_trading_opinions',
  selectedOptions: 'ai_trading_selected_options',
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
}

export function recordSignup(signup: NotificationSignup) {
  const ls = safeLocalStorage()
  if (!ls) return
  const existing: NotificationSignup[] = JSON.parse(ls.getItem(KEYS.signups) || '[]')
  existing.push(signup)
  ls.setItem(KEYS.signups, JSON.stringify(existing))
}

export function recordOpinion(opinion: FreeOpinion) {
  const ls = safeLocalStorage()
  if (!ls) return
  const existing: FreeOpinion[] = JSON.parse(ls.getItem(KEYS.opinions) || '[]')
  existing.push(opinion)
  ls.setItem(KEYS.opinions, JSON.stringify(existing))
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
