import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { STUDENT, PORTFOLIO } from "../../data/agent"
import { ScreenHead, AgentBar } from "../ui"

// 解析状态机：idle → parsing → done
export default function Intake({ onNext }) {
  const [stage, setStage] = useState("idle") // idle | parsing | done
  const [parsed, setParsed] = useState(0) // 已解析项目数

  useEffect(() => {
    if (stage !== "parsing") return
    const timers = PORTFOLIO.projects.map((_, i) =>
      setTimeout(() => setParsed(i + 1), 900 + i * 1100)
    )
    const done = setTimeout(() => setStage("done"), 900 + PORTFOLIO.projects.length * 1100 + 600)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [stage])

  const allParsed = parsed >= PORTFOLIO.projects.length

  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 01 · INTAKE"
        title="接入你的背景与作品集"
        sub="智能体先建立学生画像，再逐页解析作品集结构——这一步决定后面所有诊断的精度。"
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        {/* ---------- 学生画像 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass p-6 md:p-7"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="eyebrow">Student Profile</span>
            <span className="tag tag-gold">2027 Fall</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-academy grid place-items-center font-medium text-xl text-ink">
              林
            </div>
            <div>
              <div className="text-white font-medium text-[15px]">
                {STUDENT.name} <span className="text-white/35 font-mono text-xs ml-1">{STUDENT.en}</span>
              </div>
              <div className="text-[12px] text-white/50 mt-0.5">{STUDENT.school}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              ["年级", STUDENT.grade],
              ["GPA", STUDENT.gpa],
              ["目标 season", STUDENT.targetSeason],
              ["意向地区", STUDENT.regions.join(" · ")],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-3">
                <div className="font-mono text-[10px] text-white/35 tracking-wider mb-1">{k}</div>
                <div className="text-[13px] text-white/85">{v}</div>
              </div>
            ))}
          </div>

          {/* 方向锁定 */}
          <div className="rounded-xl border border-ice/20 bg-ice/[0.04] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-ice/80 tracking-wider">AI 方向推断 · 已锁定</span>
              <span className="font-mono text-[10px] text-white/35">置信度 91%</span>
            </div>
            <div className="text-[15px] text-white font-medium mb-3">
              {STUDENT.direction}
              <span className="text-white/35 text-xs font-mono ml-2">{STUDENT.directionEN}</span>
            </div>
            <div className="space-y-1.5">
              {STUDENT.detected.map((d) => (
                <div key={d.label} className="flex justify-between text-[11.5px]">
                  <span className="text-white/45">{d.label}</span>
                  <span className="text-white/75 font-mono">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- 作品集上传 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass p-6 md:p-7 flex flex-col"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="eyebrow">Portfolio Upload</span>
            {stage === "done" && <span className="tag tag-ice">解析完成</span>}
          </div>

          {stage === "idle" && (
            <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.015] py-12 px-6 text-center cursor-pointer hover:border-gold/40 hover:bg-gold/[0.02] transition-all duration-300">
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-gold/15 blur-xl" />
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="relative">
                  <path d="M12 16V4m0 0 4 4m-4-4L8 8" stroke="#e2c179" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-white/75 text-sm mb-1.5">拖入作品集 PDF，或点击上传</div>
              <div className="font-mono text-[11px] text-white/35">支持 PDF / 图片合集 · ≤ 200MB</div>
              <button className="btn-gold !py-3 !px-8 !text-sm mt-7" onClick={() => setStage("parsing")}>
                使用示例作品集演示
              </button>
            </div>
          )}

          {stage !== "idle" && (
            <div className="flex-1 flex flex-col">
              {/* 文件头 */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-400/20 grid place-items-center font-mono text-[10px] text-red-300">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-white/85 truncate">{PORTFOLIO.file}</div>
                  <div className="font-mono text-[10px] text-white/35 mt-0.5">{PORTFOLIO.size}</div>
                </div>
                {stage === "done" && (
                  <span className="text-ice text-lg">✓</span>
                )}
              </div>

              {/* 逐项目解析 */}
              <div className="space-y-3 flex-1">
                {PORTFOLIO.projects.map((p, i) => {
                  const state = parsed > i ? "done" : stage === "done" ? "done" : "pending"
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.25 }}
                      className={`rounded-xl border px-4 py-3.5 transition-all duration-500 ${
                        state === "done"
                          ? "border-white/[0.09] bg-white/[0.03]"
                          : "border-white/[0.05] bg-transparent opacity-45"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={p.img}
                          alt={`作品集项目《${p.name}》`}
                          className="w-16 h-11 object-cover rounded-md border border-[rgba(237,237,232,0.14)] work-img"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] text-fg3">P{i + 1}</span>
                            <span className="text-[13px] text-fg truncate">《{p.name}》</span>
                            <span className="text-[11px] text-fg3">{p.type}</span>
                          </div>
                        </div>
                        <AnimatePresence mode="wait">
                          {state === "done" ? (
                            <motion.span
                              key="done"
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="tag tag-ice !text-[10px]"
                            >
                              {p.pages} 页 · 已解析
                            </motion.span>
                          ) : (
                            <motion.span
                              key="pending"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="font-mono text-[10px] text-academy cursor-blink"
                            >
                              解析中
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {state === "done" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {p.detected.map((d) => (
                                <span
                                  key={d}
                                  className={`tag !px-2 !py-0.5 !text-[10px] ${
                                    d.includes("⚠") || d.includes("✕")
                                      ? "tag-red"
                                      : d.includes("✓")
                                        ? "tag-ice"
                                        : ""
                                  }`}
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>

              {/* agent 状态 + CTA */}
              <div className="mt-5">
                <AnimatePresence mode="wait">
                  {stage === "parsing" ? (
                    <motion.div key="bar" exit={{ opacity: 0 }}>
                      <AgentBar text="正在逐页解析 74 页版面 · 识别项目结构与证据类型…" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="font-mono text-[11px] text-white/45 leading-relaxed">
                        检出 3 个完整项目<br />
                        <span className="text-red-300/80">2 处研究过程缺失 · 0 个交互原型</span>
                      </div>
                      <button className="btn-gold !text-sm shrink-0" onClick={onNext} disabled={!allParsed}>
                        开始 Gap Analysis →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
