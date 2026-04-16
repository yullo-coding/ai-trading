import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 투자 코칭',
  description: '뇌동매매로 날린 수익, AI는 알고 있었습니다. 당신에게 가장 필요한 AI 코칭을 선택하세요.',
  openGraph: {
    title: 'AI 투자 코칭',
    description: '뇌동매매로 날린 수익, AI는 알고 있었습니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
