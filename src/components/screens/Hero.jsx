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
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
        {/* ---------- 左侧 ---------- */}
        <div>
          {/* 1DL 式 meta 行 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-8 eyebrow"
          >
            <span><span className="dot-a">●</span> ACADEMY LINE · 作品集学院</span>
            <span className="text-fg3">ALIPAY AGENT AWARD · 消费新体验</span>
            <span className="text-fg3">SHANGHAI · 31.23N 121.47E</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.2, 0.7, 0, 1] }}
            className="display-hero text-white"
          >
            <span className="block text-[clamp(52px,8.2vw,118px)]">设计留学</span>
            <span className="block text-[clamp(52px,8.2vw,118px)]">
              智能规划师
              <span className="accent-text">.</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38 }}
            className="mt-6 font-mono text-[12px] md:text-[13px] tracking-[0.08em] text-fg2 uppercase"
          >
            PORTFOLIO OS <span className="text-fg3">—</span> AI-NATIVE DESIGN EDUCATION PLANNING AGENT
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46 }}
            className="mt-6 text-[15px] md:text-lg text-fg2 leading-relaxed max-w-xl"
          >
            把申请这整件事，交给一个智能体办完。
            <span className="block mt-1.5 text-fg3 text-sm md:text-[15px]">
              不是回答留学问题的聊天机器人，而是把诊断、规划、执行、交易跑完整闭环的
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
                <span className="tag tag-gold !normal-case">{p}</span>
                {i < PIPELINE.length - 1 && <span className="text-fg3 text-xs">→</span>}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <button className="btn-gold" onClick={onStart}>
              开始规划
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
            </button>
            <span className="font-mono text-[12px] text-fg3">全程演示约 3 分钟 · 数据为示例</span>
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
                <div className="font-medium text-lg md:text-xl text-fg tabular-nums tracking-tight">{s.v}</div>
                <div className="font-mono text-[10px] text-fg3 mt-0.5 tracking-[0.08em]">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------- 右侧：1DL door 式带框作品图 + 数据卡 ---------- */}
        <div className="relative hidden lg:block h-[520px]">
          {/* 主图：带框渲染（door-media.framed 风格） */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.2, 0.7, 0, 1] }}
            className="absolute right-4 top-0 w-[340px]"
          >
            <div
              className="rounded-xl p-5 border border-[rgba(237,237,232,0.12)]"
              style={{
                background: "radial-gradient(80% 70% at 70% 30%, #1a1c1b, #0b0b0a 70%)",
              }}
            >
              <img
                src="./assets/work/vehicle-lighting.webp"
                alt="学生作品 · 车载照明系统"
                className="w-full aspect-video object-cover rounded-md border border-[rgba(237,237,232,0.22)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] work-img"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="eyebrow">P1 · 候鸟计划</span>
                <span className="font-mono text-[10px] text-fg3">26 PAGES</span>
              </div>
            </div>
          </motion.div>

          {/* 数据卡：Gap 摘要 */}
          <FloatCard className="absolute left-0 top-64 w-60" delay={1.0} float="10s">
            <div className="eyebrow mb-3"><b>Gap Analysis</b></div>
            <div className="space-y-3">
              {[
                ["视觉表达", 88, "#57ffc3"],
                ["研究深度", 52, "#ff4a2e"],
                ["交互与服务", 46, "#ff4a2e"],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-fg2">{l}</span>
                    <span className="font-mono text-fg">{v}</span>
                  </div>
                  <div className="h-[5px] rounded-full bg-[rgba(237,237,232,0.08)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: c }}
                      initial={{ width: 0 }}
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 1.2, delay: 1.3, ease: [0.2, 0.7, 0, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="hairline mt-4 pt-3 font-mono text-[10px] text-fg3">
              INDEX 61 <span className="accent-text">B−</span> · vs UAL/RCA LINE
            </div>
          </FloatCard>

          <FloatCard className="absolute right-0 bottom-0 w-72 doorline overflow-hidden" delay={1.2} float="9s">
            <div className="eyebrow mb-2"><b>Countdown</b></div>
            <div className="font-medium text-4xl accent-text tracking-tight tabular-nums">105</div>
            <div className="font-mono text-[10px] text-fg3 mt-1 tracking-[0.08em]">
              DAYS TO SUBMIT WINDOW · 2027-01-15
            </div>
            <div className="mt-3 flex gap-1.5 flex-wrap">
              {["P2 重构", "新项目", "动效", "递交"].map((t, i) => (
                <span key={t} className={`tag !px-2 !py-0.5 !text-[10px] ${i === 0 ? "tag-gold" : ""}`}>{t}</span>
              ))}
            </div>
          </FloatCard>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-fg3/60"
      >
        AGENT EMERGENCE · 2026
      </motion.div>
    </div>
  )
}

function FloatCard({ className = "", delay = 0, float = "8s", children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.2, 0.7, 0, 1] }}
      className={className}
    >
      <div className="glass glass-hover p-5" style={{ animation: `floaty ${float} ease-in-out infinite` }}>
        <style>{`@keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
        {children}
      </div>
    </motion.div>
  )
}
