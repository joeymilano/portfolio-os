import { motion } from "motion/react"
import { REINFORCE } from "../../data/agent"
import { ScreenHead } from "../ui"

export default function Reinforce({ onNext }) {
  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 04 · PORTFOLIO REINFORCEMENT"
        title="作品集补强方案"
        sub="把 3 项诊断翻译成可执行的行动线：做什么、做多久、对应哪所学校的要求。"
      />

      {/* 预计提升总览 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass ring-gold p-5 md:p-6 mb-6 flex flex-wrap items-center gap-x-8 gap-y-4"
      >
        <div>
          <div className="eyebrow mb-1.5">Projected Lift</div>
          <div className="text-[14px] text-white/75">
            完成全部行动后：综合分{" "}
            <span className="font-mono text-red-300/80">61</span>
            <span className="text-gold mx-2">→</span>
            <span className="font-mono text-ice font-bold text-lg">83</span>
            ，主推荐校匹配度 <span className="font-mono text-ice">85 → 91</span>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex gap-5 font-mono text-[10.5px] text-white/40">
          <span>总投入 ≈ 10–12 周</span>
          <span className="text-white/20">|</span>
          <span>并行 2 条行动线</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">
        {REINFORCE.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`glass glass-hover p-6 flex flex-col ${r.primary ? "ring-gold relative" : ""}`}
          >
            {r.primary && (
              <span className="absolute -top-2.5 left-5 tag tag-gold !text-[10px] !py-1 shadow-lg shadow-black/40">
                核心行动 · 直接补 F2
              </span>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className={`tag !text-[10.5px] ${r.priority.startsWith("P0") ? "tag-red" : "tag-gold"}`}>
                {r.priority}
              </span>
              <span className="font-mono text-[10.5px] text-white/45">⏱ {r.weeks}</span>
            </div>

            <h3 className="text-[15.5px] font-semibold text-white/92 leading-snug mb-4 min-h-[3em]">{r.title}</h3>

            <div className="space-y-2.5 flex-1">
              {r.items.map((item, j) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.18 + j * 0.14 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="mt-[3px] w-4 h-4 rounded-[5px] border border-ice/35 bg-ice/[0.08] grid place-items-center text-[9px] text-ice shrink-0">
                    ✓
                  </span>
                  <span className="text-[12.5px] leading-[1.65] text-white/62">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="hairline mt-5 pt-3.5 flex flex-wrap gap-1.5">
              {r.links.map((l) => (
                <span key={l} className="tag !px-2 !py-0.5 !text-[10px] tag-gold">{l}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex justify-end mt-8"
      >
        <button className="btn-gold" onClick={onNext}>生成申请时间线 →</button>
      </motion.div>
    </div>
  )
}
