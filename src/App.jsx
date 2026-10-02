import { useEffect, useState } from "react"
import Atmosphere from "./components/Atmosphere"
import Rail from "./components/Rail"
import Hero from "./components/screens/Hero"
import Intake from "./components/screens/Intake"
import Analysis from "./components/screens/Analysis"
import Match from "./components/screens/Match"
import Reinforce from "./components/screens/Reinforce"
import Timeline from "./components/screens/Timeline"
import Booking from "./components/screens/Booking"
import Pay from "./components/screens/Pay"
import Done from "./components/screens/Done"
import { BRAND } from "./data/agent"

export default function App() {
  const [step, setStep] = useState("hero")
  const [visited, setVisited] = useState(["hero"])
  const [order, setOrder] = useState(null)

  const go = (next) => {
    setStep(next)
    setVisited((v) => (v.includes(next) ? v : [...v, next]))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" })
  }, [step])

  const screens = {
    hero: <Hero onStart={() => go("intake")} />,
    intake: <Intake onNext={() => go("analysis")} />,
    analysis: <Analysis onNext={() => go("match")} />,
    match: <Match onNext={() => go("reinforce")} />,
    reinforce: <Reinforce onNext={() => go("timeline")} />,
    timeline: <Timeline onNext={() => go("booking")} />,
    booking: <Booking onNext={() => go("pay")} onOrder={setOrder} />,
    pay: <Pay order={order} onNext={() => go("done")} />,
    done: (
      <Done
        onRestart={() => { setOrder(null); go("hero") }}
        repoUrl="https://github.com/joeymilano/portfolio-os"
      />
    ),
  }

  const isHero = step === "hero"

  return (
    <div className="relative min-h-screen text-white">
      <Atmosphere />

      {/* 顶栏 */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${isHero ? "" : "lg:bg-ink/60 lg:backdrop-blur-xl lg:border-b lg:border-white/[0.05]"}`}>
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 ${isHero ? "py-5" : "py-4 lg:py-4 pt-16 lg:pt-4"}`}>
          <div className="flex items-center gap-3">
            <img src="./logo-mark.png" alt="1% Design Lab" className="w-8 h-8 rounded-[9px]" />
            <div className="leading-tight flex items-baseline gap-2.5">
              <span className="font-semibold text-[15px] tracking-[-0.03em]">1% Design Lab</span>
              <span className="font-mono text-[10px] text-fg2 tracking-[0.08em]">梦想管理局</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="tag !text-[10px] hidden sm:inline-flex">{BRAND.nameEN} · ACADEMY</span>
            <span className="tag tag-gold !text-[10px]">智能体涌现奖 · 参赛演示</span>
          </div>
        </div>
      </header>

      {!isHero && <Rail current={step} visited={visited} onJump={go} />}

      <main className={`relative z-10 px-6 md:px-10 ${isHero ? "" : "pt-28 lg:pt-28 pb-20 lg:pl-64"} transition-all`}>
        <div key={step} className="fade-up">
          {screens[step]}
        </div>
      </main>

      {/* 页脚 */}
      <footer className={`relative z-10 hairline mt-auto ${isHero ? "" : "lg:ml-64"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[9.5px] text-white/25">
            © 2026 {BRAND.org} · 本页面为「支付宝 · 智能体涌现奖」参赛演示，页面内学生、作品集与服务数据均为示例
          </span>
          <span className="font-mono text-[9.5px] text-white/25">支付环节为高保真模拟 · 不产生真实交易</span>
        </div>
      </footer>
    </div>
  )
}
