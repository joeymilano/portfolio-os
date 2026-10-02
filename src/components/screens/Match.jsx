import { motion } from "motion/react"
import { SCHOOLS } from "../../data/agent"
import { ScreenHead, MatchRing } from "../ui"

const TIER_STYLE = {
  冲刺: { tag: "tag-red", ring: "#ff8a80" },
  匹配: { tag: "tag-gold", ring: "#e2c179" },
  稳妥: { tag: "tag-ice", ring: "#93e9d0" },
}

export default function Match({ onNext }) {
  const tiers = ["冲刺", "匹配", "稳妥"]
  let cardIndex = 0
  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 03 · SCHOOL MATCHING"
        title="院校与项目匹配"
        sub="基于 Gap 诊断结果与 1% DESIGN LAB 历年录取数据库，生成冲稳妥三档共 6 个项目。"
        right={
          <div className="font-mono text-[11px] text-white/40 leading-relaxed text-right hidden md:block">
            数据源 · 2026 录取季<br />背景相似样本 n = 412
          </div>
        }
      />

      {tiers.map((tier) => {
        const list = SCHOOLS.filter((s) => s.tier === tier)
        const st = TIER_STYLE[tier]
        return (
          <div key={tier} className="mb-9">
            <div className="flex items-center gap-3 mb-4">
              <span className={`tag ${st.tag}`}>{tier} {tier === "冲刺" ? "REACH" : tier === "匹配" ? "MATCH" : "SAFE"}</span>
              <div className="hairline flex-1 !opacity-60" />
              <span className="font-mono text-[10px] text-white/30">{list.length} programs</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {list.map((s) => {
                const idx = cardIndex++
                return (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 + idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    className={`glass glass-hover p-6 relative ${s.primary ? "ring-gold" : ""}`}
                  >
                    {s.primary && (
                      <span className="absolute -top-2.5 left-6 tag tag-gold !text-[10px] !py-1 shadow-lg shadow-black/40">
                        ★ 主推荐 · 性价比最高
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-display font-bold text-[17px] text-white leading-snug">{s.name}</div>
                        <div className="text-[12px] text-white/45 mt-0.5">{s.nameCN}</div>
                        <div className="mt-2.5 text-[13.5px] text-gold/90 font-medium">{s.program}</div>
                        <div className="font-mono text-[10.5px] text-white/35 mt-1">{s.location}</div>
                      </div>
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <MatchRing value={s.match} color={st.ring} delay={0.4 + idx * 0.14} />
                        <span className="font-mono text-[9px] text-white/35 tracking-wider">MATCH</span>
                      </div>
                    </div>

                    <p className="text-[12.5px] leading-[1.7] text-white/50 mt-4">{s.note}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {s.req.map((r) => (
                        <span key={r} className="tag !px-2 !py-0.5 !text-[10px]">{r}</span>
                      ))}
                      {s.gap && (
                        <span className={`tag !px-2 !py-0.5 !text-[10px] ${s.gap.includes("达标") ? "tag-ice" : "tag-red"}`}>
                          {s.gap}
                        </span>
                      )}
                    </div>

                    <div className="hairline mt-4 pt-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/40">⏱ {s.deadline}</span>
                      <span className="font-mono text-[10px] text-white/25">{s.tierEN}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex justify-end"
      >
        <button className="btn-gold" onClick={onNext}>生成补强方案 →</button>
      </motion.div>
    </div>
  )
}
