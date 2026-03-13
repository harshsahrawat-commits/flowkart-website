export default function Home() {
  return (
    <main id="main-content">
      <section className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center px-6">
          <p className="font-mono text-teal text-sm uppercase tracking-[0.12em] mb-4">
            AI Native Agency
          </p>
          <h1 className="font-display text-navy text-5xl font-semibold tracking-tight leading-none mb-6">
            We build AI teams
            <br />
            that run your <span className="text-teal">business</span>.
          </h1>
          <p className="font-body text-sienna text-lg max-w-xl mx-auto">
            Custom multi-agent orchestration with LangChain &amp; LangGraph.
          </p>
        </div>
      </section>
    </main>
  )
}
