'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { type OptionKey, recordClick, saveSelectedOptions, loadSelectedOptions } from '@/lib/storage'

export const OPTIONS: Record<OptionKey, {
  label: string
  tag: string
  icon: string
  desc: string
  detail: string
  color: string
}> = {
  A: {
    label: '판단 로그',
    tag: 'OPTION_A',
    icon: '📋',
    desc: '왜 이런 선택을 했는지를 다 알려주는 투명한 AI',
    detail: 'RSI, 거래량, 뉴스 데이터를 근거로 AI가 어떤 판단을 내렸는지 실시간으로 보여줍니다. 블랙박스가 아닌, 설명 가능한 AI.',
    color: 'from-blue-500/10 to-transparent',
  },
  B: {
    label: 'AI 배틀',
    tag: 'OPTION_B',
    icon: '⚔️',
    desc: '내 실력과 AI를 매일 비교하는 수익률 배틀',
    detail: '같은 종목, 같은 날짜 기준으로 내 예측과 AI 예측을 나란히 기록합니다. 기간 종료 후 수익률로 승패를 가립니다.',
    color: 'from-yellow-500/10 to-transparent',
  },
  C: {
    label: '카피 트레이딩',
    tag: 'OPTION_C',
    icon: '📑',
    desc: '검증된 고수의 전략을 그대로 복사하는 카피 트레이딩',
    detail: '고수익 전략(또는 특정 퍼르소나 AI)의 매매 히스토리를 랭킹 시스템으로 공개합니다. 믿을 수 있는 성과 기록으로 판단하세요.',
    color: 'from-purple-500/10 to-transparent',
  },
  D: {
    label: '반자동 모드',
    tag: 'OPTION_D',
    icon: '🎛️',
    desc: '내가 승인해야만 주문이 나가는 반자동 제어',
    detail: "AI가 신호를 주면 내가 '승인' 버튼을 눌러야 주문이 실행됩니다. 통제권은 항상 내 손에. 완전 자동화의 불안 없이.",
    color: 'from-green-500/10 to-transparent',
  },
}

const RANK_LABELS = ['1순위', '2순위', '3순위', '4순위']

function VoteCard({
  optionKey,
  rank,       // null = 미선택, 1~4 = 선택 순위
  onSelect,
  index,
}: {
  optionKey: OptionKey
  rank: number | null
  onSelect: (key: OptionKey) => void
  index: number
}) {
  const option = OPTIONS[optionKey]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const hoverStart = useRef<number>(0)
  const isSelected = rank !== null

  const handleSelect = () => {
    const hoverDuration = hoverStart.current ? Date.now() - hoverStart.current : undefined
    recordClick({ option: optionKey, timestamp: Date.now(), hoverDuration })
    onSelect(optionKey)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        onClick={handleSelect}
        onMouseEnter={() => { hoverStart.current = Date.now() }}
        className={`w-full text-left rounded-xl border transition-all duration-300 overflow-hidden group relative
          ${isSelected
            ? 'border-accent glow-green bg-[#0D1A12]'
            : 'border-[#1E1E1E] bg-[#0D0D0D] hover:border-accent/40 hover:bg-[#0D1209]'
          }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-100' : ''}`} />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <span className={`tag font-bold ${isSelected ? 'text-accent' : 'text-[#666]'}`}>
                  {option.tag}
                </span>
                <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${isSelected ? 'text-accent' : 'text-white'}`}>
                  {option.label}
                </h3>
              </div>
            </div>

            {/* 순위 배지 */}
            <AnimatePresence mode="wait">
              {isSelected ? (
                <motion.div
                  key="rank"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-full bg-accent border-2 border-accent"
                >
                  <span className="text-[#0A0A0A] font-black text-base leading-none">{rank}</span>
                  <span className="text-[#0A0A0A] font-bold leading-none" style={{ fontSize: '0.6rem' }}>순위</span>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#333] flex items-center justify-center"
                >
                  <span className="text-[#444] text-xs font-bold">+</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className={`text-sm sm:text-base font-medium mb-3 ${isSelected ? 'text-[#E8E8E8]' : 'text-[#CCC]'}`}>
            "{option.desc}"
          </p>

          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            {option.detail}
          </p>

          {isSelected && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
            />
          )}
        </div>
      </button>
    </motion.div>
  )
}

interface VotingSectionProps {
  onOptionsChange: (keys: OptionKey[]) => void
}

export default function VotingSection({ onOptionsChange }: VotingSectionProps) {
  // 배열 순서 = 우선순위 (index 0 = 1순위)
  const [selected, setSelected] = useState<OptionKey[]>([])
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const hasScrolled = useRef(false)

  useEffect(() => {
    const saved = loadSelectedOptions()
    if (saved.length > 0) {
      setSelected(saved)
      onOptionsChange(saved)
    }
  }, [onOptionsChange])

  const handleSelect = (key: OptionKey) => {
    setSelected(prev => {
      const isSelected = prev.includes(key)
      const next = isSelected ? prev.filter(k => k !== key) : [...prev, key]
      saveSelectedOptions(next)
      onOptionsChange(next)

      if (!hasScrolled.current && next.length === 1) {
        hasScrolled.current = true
        setTimeout(() => {
          document.getElementById('notification')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 700)
      }

      return next
    })
  }

  const getRank = (key: OptionKey): number | null => {
    const idx = selected.indexOf(key)
    return idx === -1 ? null : idx + 1
  }

  return (
    <section id="voting" className="relative py-16 sm:py-24 px-5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="tag text-accent">베타 기능 선택</span>
            <div className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            어떤 기능이 있으면{' '}
            <span className="gradient-text">바로 써보겠어요?</span>
          </h2>
          <p className="mt-3 text-[#666] text-sm sm:text-base max-w-lg mx-auto">
            원하는 기능을 <span className="text-white font-medium">클릭한 순서가 우선순위</span>가 됩니다.
            여러 개 선택 가능하고, 다시 누르면 해제됩니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(OPTIONS) as OptionKey[]).map((key, i) => (
            <VoteCard
              key={key}
              optionKey={key}
              rank={getRank(key)}
              onSelect={handleSelect}
              index={i}
            />
          ))}
        </div>

        {/* 우선순위 요약 */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 p-4 rounded-xl border border-[#1E1E1E] bg-[#0D0D0D]"
            >
              <p className="tag text-[#555] mb-3">내 우선순위</p>
              <div className="flex flex-col gap-2">
                {selected.map((key, i) => (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[#0A0A0A] font-black text-xs">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-[#E8E8E8]">{OPTIONS[key].label}</span>
                    <span className="text-xs text-[#555]">{RANK_LABELS[i]}</span>
                    <button
                      onClick={() => handleSelect(key)}
                      className="ml-auto text-[#444] hover:text-[#888] transition-colors text-xs"
                    >
                      해제
                    </button>
                  </motion.div>
                ))}
              </div>
              {selected.length < 4 && (
                <p className="mt-3 text-xs text-[#555]">
                  나머지 기능도 선택하면 우선순위를 더 정확히 알 수 있어요.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
