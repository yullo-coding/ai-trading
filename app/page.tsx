'use client'

import { useState } from 'react'
import { type OptionKey } from '@/lib/storage'
import HeroSection from '@/components/HeroSection'
import EmpathySection from '@/components/EmpathySection'
import VotingSection from '@/components/VotingSection'
import NotificationForm from '@/components/NotificationForm'
import FreeOpinionSection from '@/components/FreeOpinionSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState<OptionKey[]>([])

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <EmpathySection />
      <VotingSection onOptionsChange={setSelectedOptions} />
      <NotificationForm selectedOptions={selectedOptions} />
      <FreeOpinionSection selectedOptions={selectedOptions} />
      <Footer />
    </main>
  )
}
