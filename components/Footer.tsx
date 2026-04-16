'use client'


export default function Footer() {
  return (
    <footer className="relative border-t border-[#111] py-10 px-5 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Logo / name */}
        <div className="font-mono text-sm text-[#333] mb-3">
          <span className="text-accent">&gt;</span>{' '}
          AI_TRADING_LANDING <span className="text-accent">v0.1.0-beta</span>
        </div>

        <p className="text-xs text-[#444] max-w-sm mx-auto leading-relaxed mb-6">
          이 페이지는 AI 트레이딩 서비스 베타 테스터 모집을 위한 페이지입니다.
          수집된 연락처는 베타 출시 알림 발송 목적으로만 활용됩니다.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center mb-6">
          <div className="h-px flex-1 max-w-[80px] bg-[#1A1A1A]" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
          <div className="h-px flex-1 max-w-[80px] bg-[#1A1A1A]" />
        </div>

        <p className="text-xs text-[#333]">
          © 2025 AI Trading
        </p>
      </div>
    </footer>
  )
}
