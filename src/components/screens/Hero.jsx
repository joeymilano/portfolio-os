import { motion } from "motion/react"
import { BRAND } from "../../data/agent"

const PIPELINE = ["我能申请哪里", "作品集缺什么", "接下来做什么", "专业服务", "预约 · 支付"]

const STATS = [
  { v: "6", l: "目标院校库" },
  { v: "5 维", l: "评估模型" },
  { v: "105 天", l: "作战计划" },
  { v: "1 站式", l: "服务闭环" },
]

export default function Hero({ onStart }) {
  return (
    <div className="relative min-h-[100svh] flex items-center px-6 md:px-14 lg:px-24 pt-24 pb-16 lg:pt-16">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-8 items-center">
        {/* ---------- 左侧文案 ---------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2.5 mb-7"
          >
            <span className="tag tag-gold">支付宝 · 智能体涌现奖 参赛作品</span>
            <span className="tag">消费新体验赛道</span>
            <span className="tag">{BRAND.org} 出品</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="block text-[clamp(42px,8vw,82px)] gold-text">{BRAND.nameEN}</span>
            <span className="block mt-3 text-[6.4vw] lg:text-[34px] font-bold text-white/92">
              {BRAND.nameCN}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-6 text-[15px] md:text-lg text-white/60 leading-relaxed max-w-xl"
          >
            {BRAND.tagline}
            <span className="block mt-1.5 text-white/40 text-sm md:text-[15px]">
              不是回答留学问题的聊天机器人，而是一个把诊断、规划、执行、交易跑完整闭环的
              AI-native 设计教育智能体。
            </span>
          </motion.p>

          {/* 执行管线 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58 }}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {PIPELINE.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="tag tag-ice !text-[11.5px]">{p}</span>
                {i < PIPELINE.length - 1 && <span className="text-gold/50 text-xs">→</span>}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <button className="btn-gold" onClick={onStart}>
              开始规划
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-mono text-[12px] text-white/40">全程演示约 3 分钟 · 数据为示例</span>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="mt-12 grid grid-cols-4 gap-4 max-w-lg"
          >
            {STATS.map((s) => (
              <div key={s.l} className="hairline pt-3">
                <div className="font-display font-bold text-lg md:text-xl text-white/90">{s.v}</div>
                <div className="font-mono text-[10px] text-white/40 mt-0.5 tracking-wider">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------- 右侧浮空卡片 ---------- */}
        <div className="relative hidden lg:block h-[520px]">
          <FloatCard
            className="absolute right-6 top-2 w-64"
            delay={0.9}
            float="8s"
            tilt
          >
            <div className="eyebrow mb-3">Gap Analysis</div>
            <div className="space-y-3">
              {[
                ["视觉表达", 88, "#93e9d0"],
                ["研究深度", 52, "#e2c179"],
                ["交互与服务", 46, "#ff8a80"],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-white/60">{l}</span>
                    <span className="font-mono text-white/80">{v}</span>
                  </div>
                  <div className="h-[5px] rounded-full bg-white/[0.07] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: c }}
                      initial={{ width: 0 }}
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FloatCard>

          <FloatCard className="absolute left-0 top-44 w-60" delay={1.15} float="10s">
            <div className="eyebrow mb-3">Match · UAL LCC</div>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 64 64" className="w-14 h-14 -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <motion.circle
                    cx="32" cy="32" r="26" fill="none" stroke="#e2c179" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={163.4}
                    initial={{ strokeDashoffset: 163.4 }}
                    animate={{ strokeDashoffset: 163.4 * (1 - 0.85) }}
                    transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center font-mono text-[13px]">85</span>
              </div>
              <div>
                <div className="text-[13px] text-white/85 font-medium">MA Interaction Design</div>
                <div className="font-mono text-[10px] text-white/40 mt-1">匹配档位 · Match</div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="absolute right-2 bottom-6 w-72" delay={1.35} float="9s">
            <div className="eyebrow mb-2">Countdown</div>
            <div className="font-display font-extrabold text-4xl gold-text tracking-tight">105</div>
            <div className="font-mono text-[10px] text-white/40 mt-1 tracking-wider">
              DAYS TO SUBMIT WINDOW · 2027-01-15
            </div>
            <div className="mt-3 flex gap-1.5">
              {["P2 重构", "新项目", "动效", "递交"].map((t, i) => (
                <span key={t} className={`tag !px-2 !py-0.5 !text-[10px] ${i === 0 ? "tag-gold" : ""}`}>{t}</span>
              ))}
            </div>
          </FloatCard>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-white/25"
      >
        AGENT EMERGENCE · 2026
      </motion.div>
    </div>
  )
}

function FloatCard({ className = "", delay = 0, float = "8s", tilt = false, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div
        className={`glass glass-hover p-5 ${tilt ? "tilt-card" : ""}`}
        style={{ animation: `floaty ${float} ease-in-out infinite` }}
      >
        <style>{`@keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
        {children}
      </div>
    </motion.div>
  )
}
