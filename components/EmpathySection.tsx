'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const CARDS = [
  {
    icon: '📊',
    code: '문제1',
    title: '정보는 충분한데\n결국 뇌동매매',
    desc: '"이미 다 알고 있었어. RSI도 봤고, 뉴스도 읽었어. 근데 결국 손에 땀 쥐고 눌러버렸어."',
    highlight: '정보 ≠ 실행력',
  },
  {
    icon: '🤖',
    code: '문제2',
    title: 'AI 믿고 싶은데\n블랙박스라서 못 믿겠어',
    desc: '"알고리즘이 왜 샀는지 모르겠는데 내 돈을 맡길 수 있나? 근거가 없으면 신뢰도 없어."',
    highlight: '근거 없는 신뢰 = 도박',
  },
  {
    icon: '🔄',
    code: '문제3',
    title: '"한 번만 더"\n반복되는 패턴',
    desc: '"분명히 이번엔 다를 거야 했는데... 또 같은 실수. 매수 직후 하락, 매도 직후 상승."',
    highlight: '알고도 못 막는 심리',
  },
]

function EmpathyCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="card-hover relative group rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] p-5 sm:p-6 overflow-hidden flex flex-col"
    >
      {/* Card glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ boxShadow: 'inset 0 0 40px rgba(0, 255, 136, 0.04)' }}
      />

      {/* Error code badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="tag text-[#FF4444] px-2 py-0.5 border border-[#FF4444]/30 rounded bg-[#FF4444]/5">
          {card.code}
        </span>
        <span className="text-2xl">{card.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold leading-snug mb-3 whitespace-pre-line">
        {card.title}
      </h3>

      {/* Quote */}
      <p className="text-sm text-[#777] leading-relaxed mb-4 italic">
        &quot;{card.desc}&quot;
      </p>

      {/* Bottom */}
      <div className="flex items-center justify-end pt-3 border-t border-[#1A1A1A] mt-auto">
        <span className="tag text-accent bg-accent/10 px-2 py-0.5 rounded">
          {card.highlight}
        </span>
      </div>
    </motion.div>
  )
}

export default function EmpathySection() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="tag text-accent">공감하시나요?</span>
            <div className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
            알고도 못 하는 투자, 믿고 싶어도 못 믿는 AI
          </h2>
          <p className="mt-3 text-[#666] text-sm sm:text-base max-w-md mx-auto">
            정보 부족이 문제가 아니었습니다.<br />
            심리적 저항과 신뢰 부재가 진짜 문제입니다.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <EmpathyCard key={i} card={card} index={i} />
          ))}
        </div>

        {/* Connector */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-accent/40" />
            <div className="px-4 py-2 border border-accent/30 rounded-full bg-accent/5">
              <span className="tag text-accent">그래서 만들고 있습니다</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
