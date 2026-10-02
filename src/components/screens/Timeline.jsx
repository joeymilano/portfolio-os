import { motion } from "motion/react"
import { Flag } from "lucide-react"
import { TIMELINE, daysUntil } from "../../data/agent"
import { ScreenHead, useCountUp } from "../ui"

export default function Timeline({ onNext }) {
  const days = Math.min(daysUntil(TIMELINE.submitWindow), 120)
  const shown = useCountUp(days, { duration: 1600 })

  const stats = TIMELINE.stats.map((s) =>
    s.value === "DYNAMIC_DAYS" ? { ...s, value: String(days) } : s
  )

  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 05 · APPLICATION TIMELINE"
        title="申请倒计时与作战计划"
        sub="智能体把补强方案展开成以递交窗口为锚点的阶段计划，任务精确到周。"
      />

      {/* 倒计时横幅 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="glass ring-gold relative overflow-hidden p-7 md:p-9 mb-8"
      >
        <div
          className="absolute -right-24 -top-24 w-72 h-72 rounded-full pointer-events-none drift-a"
          style={{ background: "radial-gradient(circle, rgba(226,193,121,0.13), transparent 70%)" }}
        />
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          <div>
            <div className="eyebrow mb-2">{TIMELINE.windowLabel}</div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif-display font-semibold text-[72px] md:text-[86px] leading-none text-hot tracking-tight tabular-nums">
                {Math.round(shown)}
              </span>
              <div className="pb-2">
                <div className="text-white/80 font-medium">天</div>
                <div className="font-mono text-[11px] text-white/40 mt-0.5">until {TIMELINE.submitWindow}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5 flex-1 min-w-[260px]">
            {stats.slice(1).map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                <div className="font-display font-bold text-[26px] text-white/92">
                  {s.value}
                  <span className="text-[13px] text-white/40 font-normal ml-1">{s.unit}</span>
                </div>
                <div className="font-mono text-[10px] text-white/40 mt-1 tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 阶段时间轴 */}
      <div className="relative pl-2">
        {/* 主轴线 */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-[rgba(237,237,232,0.12)] to-[rgba(237,237,232,0.08)]" />

        {TIMELINE.phases.map((p, i) => {
          const isDeadline = p.status === "deadline"
          const isActive = p.status === "active"
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 pb-7 last:pb-0"
            >
              {/* 节点 */}
              <span
                className={`absolute left-0 top-1.5 grid place-items-center w-[15px] h-[15px] rounded-full border-2 ${
                  isDeadline
                    ? "border-gold bg-gold/25 shadow-[0_0_14px_rgba(255,74,46,0.5)]"
                    : isActive
                      ? "border-ice bg-ice/25 shadow-[0_0_12px_rgba(147,233,208,0.4)]"
                      : "border-white/25 bg-ink"
                }`}
              >
                {isActive && <span className="live-dot !w-2 !h-2" />}
              </span>

              <div className={`glass p-5 md:p-6 ${isActive ? "border-ice/20" : ""} ${isDeadline ? "ring-gold" : ""}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] text-gold/80 tracking-wider">{p.month}</span>
                  <span className="text-[15px] font-semibold text-white/92">{p.title}</span>
                  {isActive && (
                    <span className="tag tag-ice !text-[10px] gap-1.5">
                      <span className="live-dot !w-1.5 !h-1.5" /> 进行中
                    </span>
                  )}
                  {isDeadline && (
                    <span className="tag tag-gold !text-[10px] gap-1.5">
                      <Flag size={9} strokeWidth={2.2} /> 递交窗口
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tasks.map((t) => (
                    <span
                      key={t}
                      className={`tag !text-[11px] ${isActive ? "border-ice/25 text-ice/85" : ""}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex items-center justify-between mt-8 gap-4 flex-wrap"
      >
        <span className="font-mono text-[11px] text-white/35"> deadlines 以各校官网为准 · 智能体持续监控变动</span>
        <button className="btn-gold" onClick={onNext}>查看推荐服务 →</button>
      </motion.div>
    </div>
  )
}
