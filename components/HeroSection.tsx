'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const STATS = [
  { value: '73%', label: '개인 투자자 손실 비율' },
  { value: '2.4x', label: 'AI 평균 수익 우위' },
  { value: '91%', label: '뇌동매매 후 후회율' },
]

const TICKER_ITEMS = [
  { symbol: 'TSLA', change: '+4.2%', up: true },
  { symbol: 'NVDA', change: '-1.8%', up: false },
  { symbol: 'AAPL', change: '+0.9%', up: true },
  { symbol: 'BTC', change: '+6.1%', up: true },
  { symbol: 'ETH', change: '-2.3%', up: false },
  { symbol: 'AMZN', change: '+1.5%', up: true },
  { symbol: 'SPY', change: '+0.3%', up: true },
  { symbol: 'QQQ', change: '-0.7%', up: false },
]

export default function HeroSection() {
  const [time, setTime] = useState('')
  const [tickerPos, setTickerPos] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPos((p) => p - 1)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const scrollToVoting = () => {
    document.getElementById('voting')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden grid-bg">
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Top terminal bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 border-b border-[#1E1E1E] bg-[#0D0D0D]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          <span className="ml-3 tag text-muted">AI_TRADING_TERMINAL v0.1</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="tag text-accent font-mono">{time || '00:00:00'}</span>
        </div>
      </div>

      {/* Ticker tape */}
      <div className="relative z-20 overflow-hidden border-b border-[#1E1E1E] bg-[#0A0A0A] py-2">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{
            transform: `translateX(${tickerPos % (TICKER_ITEMS.length * 120)}px)`,
            transition: 'none',
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="tag flex items-center gap-1.5">
              <span className="text-[#888]">{item.symbol}</span>
              <span className={item.up ? 'text-accent' : 'text-[#FF4444]'}>{item.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="tag text-accent">베타 테스터 모집 중</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4"
        >
          뇌동매매로 날린 수익,
          <br />
          <span className="gradient-text text-glow">AI는 알고 있었습니다.</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#888] max-w-xl leading-relaxed"
        >
          정보는 있었는데 기준을 잃었고,<br className="hidden sm:block" />
          AI는 믿고 싶지만 통제권을 넘기기 두려웠다면.
        </motion.p>

        {/* Terminal log line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 px-4 py-2.5 bg-[#0D0D0D] border border-[#1E1E1E] rounded font-mono text-xs sm:text-sm text-left max-w-md w-full"
        >
          <span className="text-accent">$</span>{' '}
          <span className="text-[#888]">analyzing user_loss_pattern</span>
          <span className="text-accent">...</span>
          <br />
          <span className="text-[#888]">{'>'} </span>
          <span className="text-[#E8E8E8]">당신이 판 직후 상승한 횟수:</span>{' '}
          <span className="text-accent font-bold">17회</span>
          <span className="cursor-blink" />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg w-full"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
              <div className="mt-1 text-xs text-[#777] leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          onClick={scrollToVoting}
          className="mt-10 btn-pulse px-8 py-4 bg-accent text-[#0A0A0A] font-black text-sm sm:text-base rounded hover:bg-accent-dim transition-colors"
        >
          베타 테스터 신청하기 →
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-3 text-xs text-[#777]"
        >
          무료 · 가입 불필요 · 1분이면 충분
        </motion.p>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>
    </section>
  )
}
