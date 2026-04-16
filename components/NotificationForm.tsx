'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { type OptionKey, recordSignup, saveSignupPhone } from '@/lib/storage'
import { OPTIONS } from './VotingSection'

interface NotificationFormProps {
  selectedOptions: OptionKey[]
}

type FormState = 'idle' | 'submitting' | 'success'

export default function NotificationForm({ selectedOptions }: NotificationFormProps) {
  const [phone, setPhone] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [agreed, setAgreed] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 3) return digits
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  const isValidPhone = phone.replace(/\D/g, '').length === 11
  const hasSelection = selectedOptions.length > 0
  const canSubmit = isValidPhone && agreed && hasSelection && formState !== 'submitting'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setFormState('submitting')
    await new Promise(resolve => setTimeout(resolve, 800))

    const digits = phone.replace(/\D/g, '')
    recordSignup({
      phone: digits,
      selectedOptions,
      optionLabels: selectedOptions.map(k => OPTIONS[k].label),
      timestamp: Date.now(),
    })
    saveSignupPhone(digits)

    setFormState('success')
  }

  const selectionText = selectedOptions.length === 0
    ? null
    : selectedOptions.length === 1
      ? OPTIONS[selectedOptions[0]].label
      : `${selectedOptions.map(k => OPTIONS[k].label).join(', ')}`

  return (
    <section id="notification" className="relative py-16 sm:py-24 px-5 overflow-hidden">
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-accent/20 to-transparent" />

      <div className="max-w-lg mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="tag text-accent">베타 테스터 신청</span>
            </div>

            <AnimatePresence mode="wait">
              {selectionText ? (
                <motion.h2
                  key={selectionText}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl font-black"
                >
                  <span className="gradient-text">{selectionText}</span>
                  {selectedOptions.length === 1 ? ' 기능이' : ' 기능들이'} 나오면
                  <br className="hidden sm:block" /> 가장 먼저 써보세요!
                </motion.h2>
              ) : (
                <motion.h2
                  key="no-option"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl sm:text-2xl font-black text-[#888]"
                >
                  위에서 원하는 기능을 먼저 선택해주세요
                </motion.h2>
              )}
            </AnimatePresence>

            <p className="mt-2 text-sm text-[#666]">
              {hasSelection
                ? `베타 출시 시 문자로 먼저 알려드립니다. 광고 없이 딱 한 번만 연락드려요.`
                : '관심 있는 기능을 선택하면 맞춤 베타 알림을 드립니다.'}
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-6">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-bold text-accent mb-2">베타 신청 완료!</h3>
                  <p className="text-sm text-[#777] mb-4">
                    출시되면 제일 먼저 연락드리겠습니다.
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {selectedOptions.map(k => (
                      <span key={k} className="tag px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent">
                        {OPTIONS[k].label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block tag text-[#666] mb-2">휴대폰 번호</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder="010-0000-0000"
                        disabled={!hasSelection}
                        className={`w-full px-4 py-3 rounded-lg font-mono text-sm placeholder:text-[#444]
                          disabled:opacity-40 disabled:cursor-not-allowed
                          ${!hasSelection ? 'border-[#1A1A1A]' : 'border-[#2A2A2A]'}`}
                      />
                      {isValidPhone && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 inset-y-0 flex items-center text-accent leading-none"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="sr-only"
                        disabled={!hasSelection}
                      />
                      <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-all
                        ${agreed ? 'border-accent bg-accent' : 'border-[#333] bg-transparent'}
                        ${!hasSelection ? 'opacity-40' : ''}`}
                      >
                        {agreed && (
                          <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#666] leading-relaxed">
                      베타 출시 알림 발송을 위한 연락처 수집에 동의합니다.
                      수집된 정보는 알림 발송 목적으로만 사용되며, 출시 알림 후 즉시 삭제됩니다.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all duration-300
                      ${canSubmit
                        ? 'bg-accent text-[#0A0A0A] hover:bg-accent-dim btn-pulse'
                        : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
                      }`}
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        처리중...
                      </span>
                    ) : hasSelection ? (
                      `베타 출시 알림 받기 (${selectedOptions.length}개 선택) →`
                    ) : (
                      '위에서 기능을 선택하세요'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
