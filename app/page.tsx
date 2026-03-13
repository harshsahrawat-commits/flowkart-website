import { Hero } from '@/components/sections/Hero'
import { AgentWorkflow } from '@/components/sections/AgentWorkflow'
import { Services } from '@/components/sections/Services'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <AgentWorkflow />
        <Services />
      </main>
      <Footer />
    </>
  )
}
