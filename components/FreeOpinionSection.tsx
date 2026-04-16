'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { type OptionKey, recordOpinion, loadSignupPhone } from '@/lib/storage'

interface FreeOpinionSectionProps {
  selectedOptions: OptionKey[]
}

export default function FreeOpinionSection({ selectedOptions }: FreeOpinionSectionProps) {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const MAX = 300

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    recordOpinion({
      text: text.trim(),
      selectedOptions,
      timestamp: Date.now(),
      phone: loadSignupPhone() ?? undefined,
    })
    setSubmitted(true)
  }

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden border-t border-[#111]">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-accent/40" />
              <span className="tag text-accent">자유 의견</span>
              <div className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black">
              4가지 외에 원하는 기능이 있다면?
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              미발견 니즈를 발굴하고, 당신이 직접 서비스 설계에 참여합니다.
            </p>
          </div>

          {/* Textarea card */}
          <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1A1A1A] bg-[#0A0A0A]">
              <span className="tag text-[#555]">USER_INPUT.txt</span>
              <span className="ml-auto tag text-[#444]">{text.length}/{MAX}</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="text-2xl mb-3">💡</div>
                <p className="text-accent font-bold mb-1">감사합니다!</p>
                <p className="text-sm text-[#666]">
                  소중한 의견은 서비스 설계에 직접 반영됩니다.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX))}
                  placeholder="예) 손절 타이밍을 AI가 알려주면 좋겠어요 / 포트폴리오 리밸런싱 기능이 있으면..."
                  rows={5}
                  className="w-full px-5 py-4 bg-transparent text-sm text-[#CCC] placeholder:text-[#3A3A3A] resize-none border-0 focus:ring-0"
                />
                <div className="px-4 pb-4">
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className={`w-full py-3 rounded-lg text-sm font-bold transition-all
                      ${text.trim()
                        ? 'border border-accent text-accent hover:bg-accent hover:text-[#0A0A0A]'
                        : 'border border-[#222] text-[#444] cursor-not-allowed'
                      }`}
                  >
                    의견 남기기
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center text-xs text-[#444]">
            당신의 의견이 4가지 가설 외 숨겨진 니즈를 발굴하는 데 사용됩니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
