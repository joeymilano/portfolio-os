import { motion } from "motion/react"
import { BRAND } from "../data/agent"

export const STEPS = [
  { id: "intake", num: "01", label: "背景接入", desc: "画像 · 作品集" },
  { id: "analysis", num: "02", label: "Gap Analysis", desc: "五维诊断" },
  { id: "match", num: "03", label: "院校匹配", desc: "6 校 · 3 档" },
  { id: "reinforce", num: "04", label: "补强方案", desc: "3 条行动线" },
  { id: "timeline", num: "05", label: "申请时间线", desc: "105 天作战" },
  { id: "booking", num: "06", label: "服务预约", desc: "匹配推荐" },
  { id: "pay", num: "07", label: "支付确认", desc: "支付宝" },
]

export default function Rail({ current, visited, onJump }) {
  return (
    <>
      {/* 桌面端左侧导航 */}
      <aside className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 w-52">
        <div className="px-3 pb-4 flex items-center gap-2.5">
          <img src="./logo-mark.png" alt="1% Design Lab" className="w-7 h-7 rounded-[8px]" />
          <div>
            <div className="font-semibold text-[13px] tracking-tight">{BRAND.nameEN}</div>
            <div className="font-mono text-[9px] text-fg3 mt-0.5 tracking-[0.06em]">1% DESIGN LAB</div>
          </div>
        </div>
        {STEPS.map((s, i) => {
          const active = current === s.id
          const done = visited.includes(s.id) && !active
          return (
            <button
              key={s.id}
              onClick={() => done && onJump(s.id)}
              disabled={!done}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${
                active ? "bg-white/[0.05] border border-white/10" : done ? "hover:bg-white/[0.03] border border-transparent" : "opacity-35 border border-transparent cursor-default"
              }`}
            >
              <span
                className={`font-mono text-[11px] ${active ? "text-gold" : done ? "text-white/50" : "text-white/40"}`}
              >
                {done ? "✓" : s.num}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={`block text-[13px] truncate ${active ? "text-white font-medium" : "text-white/65"}`}
                >
                  {s.label}
                </span>
                <span className="block text-[10px] text-white/35 truncate font-mono">{s.desc}</span>
              </span>
              {active && (
                <motion.span
                  layoutId="rail-dot"
                  className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(255,74,46,0.8)]"
                />
              )}
            </button>
          )
        })}
      </aside>

      {/* 移动端顶部进度 */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 px-5 py-3 backdrop-blur-xl bg-ink/70 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <img src="./logo-mark.png" alt="" className="w-5 h-5 rounded-[5px]" />
          <span className="font-mono text-[11px] text-fg tracking-tight">{BRAND.nameEN}</span>
          <div className="flex-1 flex items-center gap-1 ml-2">
            {STEPS.map((s) => {
              const active = current === s.id
              const done = visited.includes(s.id) && !active
              return (
                <div
                  key={s.id}
                  className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
                    active ? "bg-gold" : done ? "bg-gold/40" : "bg-white/10"
                  }`}
                />
              )
            })}
          </div>
          <span className="font-mono text-[10px] text-white/50">
            {STEPS.findIndex((s) => s.id === current) + 1 || 1}/7
          </span>
        </div>
      </div>
    </>
  )
}
