import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Focus, Boxes, Clapperboard, Sparkles } from "lucide-react"
import { RADAR, VERDICT, FINDINGS } from "../../data/agent"
import { ScreenHead, AgentBar, Radar, ScoreBar, useCountUp } from "../ui"

const FINDING_ICONS = {
  focus: Focus,
  boxes: Boxes,
  clapper: Clapperboard,
  sparkles: Sparkles,
}

const LEVEL_STYLE = {
  critical: { tag: "tag-red", label: "关键", ring: "hover:border-red-300/30" },
  improve: { tag: "tag-gold", label: "提升", ring: "" },
  highlight: { tag: "tag-ice", label: "亮点", ring: "" },
}

// 阶段：analyzing（扫描 3.2s）→ results
export default function Analysis({ onNext }) {
  const [phase, setPhase] = useState("analyzing")
  useEffect(() => {
    const t = setTimeout(() => setPhase("results"), 3200)
    return () => clearTimeout(t)
  }, [])

  const show = phase === "results"
  const score = useCountUp(VERDICT.score, { duration: 1500, start: show })

  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 02 · PORTFOLIO GAP ANALYSIS"
        title="作品集 Gap 诊断"
        sub="对照 UAL / RCA 交互与服务方向 2026 录取模型，逐维度定位你与目标线的距离。"
      />

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* ---------- 雷达 + 维度条 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass relative overflow-hidden p-6 md:p-7"
        >
          {phase === "analyzing" && (
            <>
              <div className="scanline" />
              <div className="absolute inset-0 z-10 grid place-items-center bg-ink/40 backdrop-blur-[2px]">
                <AgentBar text="对照录取模型扫描 5 个维度 · 74 页证据加权…" />
              </div>
            </>
          )}

          <div className="flex items-center justify-between mb-2">
            <span className="eyebrow">Five-Axis Assessment</span>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span className="flex items-center gap-1.5 text-ice/80">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-ice/70" /> 当前
              </span>
              <span className="flex items-center gap-1.5 text-gold/80">
                <span className="w-2.5 h-[2px] bg-gold" /> 目标线
              </span>
            </div>
          </div>

          <div className="grid place-items-center py-2">
            <div className={phase === "analyzing" ? "opacity-25 transition-opacity duration-700" : "transition-opacity duration-700"}>
              <Radar axes={RADAR.axes} score={RADAR.score} target={RADAR.target} size={330} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-4">
            {RADAR.axes.map((a, i) => (
              <ScoreBar key={a} label={a} value={RADAR.score[i]} target={RADAR.target[i]} delay={0.2 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* ---------- 总判定 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          <div className="glass ring-gold p-6 md:p-7 relative overflow-hidden">
            <div
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(226,193,121,0.12), transparent 70%)" }}
            />
            <div className="flex items-start justify-between mb-4">
              <span className="eyebrow">Overall Verdict</span>
              {show && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="tag tag-gold"
                >
                  综合评级 {VERDICT.grade}
                </motion.span>
              )}
            </div>
            <div className="flex items-end gap-4">
              <span className="font-serif-display font-semibold text-[64px] leading-none text-hot tracking-tight">
                {Math.round(score)}
              </span>
              <span className="font-mono text-[11px] text-white/40 pb-2.5">/ 100 · PORTFOLIO INDEX</span>
            </div>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/80 font-medium">{VERDICT.headline}</p>
            <div className="hairline mt-4 pt-3 font-mono text-[11px] text-white/40">{VERDICT.percentile}</div>
          </div>

          {/* 摘要行 */}
          <div className="grid grid-cols-3 gap-4">
            {[
              ["关键差距", "2 项", "#ff4a2e"],
              ["可提升", "1 项", "#edede8"],
              ["优势", "1 项", "#57ffc3"],
            ].map(([l, v, c], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: show ? 0.9 + i * 0.12 : 99 }}
                className="glass p-4 text-center"
              >
                <div className="font-display font-bold text-xl" style={{ color: c }}>{v}</div>
                <div className="font-mono text-[10px] text-white/40 mt-1">{l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ---------- 诊断发现 ---------- */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {FINDINGS.map((f, i) => {
          const s = LEVEL_STYLE[f.level]
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 34 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`glass glass-hover p-6 ${f.level === "highlight" ? "ring-gold" : ""} ${s.ring}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = FINDING_ICONS[f.icon] || Sparkles
                    return (
                      <span className={`grid place-items-center w-9 h-9 rounded-xl border ${
                        f.level === "critical"
                          ? "border-red-300/25 bg-red-300/[0.06] text-red-300"
                          : f.level === "highlight"
                            ? "border-studio/25 bg-studio/[0.06] text-studio"
                            : "border-academy/25 bg-academy/[0.06] text-academy"
                      }`}>
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                    )
                  })()}
                  <div>
                    <div className={`tag ${s.tag} !text-[10px]`}>{f.levelText}</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-fg3">F{i + 1}</span>
              </div>

              <h3 className="text-[15.5px] font-semibold text-white/92 mb-2.5">{f.title}</h3>
              <p className="text-[13px] leading-[1.75] text-white/55 mb-4">{f.detail}</p>

              <div className="rounded-xl bg-ice/[0.045] border border-ice/15 px-4 py-3 mb-3">
                <div className="font-mono text-[9.5px] tracking-[0.2em] text-ice/70 mb-1.5">AGENT ACTION</div>
                <div className="text-[13px] leading-relaxed text-white/85">{f.action}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] text-gold/70">{f.gain}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 2.8 }}
        className="flex justify-end mt-8"
      >
        <button className="btn-gold" onClick={onNext}>
          查看匹配院校 →
        </button>
      </motion.div>
    </div>
  )
}
