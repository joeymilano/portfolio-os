import { useMemo, useState } from "react"
import { motion } from "motion/react"
import { SERVICES, MENTOR, fmtPrice } from "../../data/agent"
import { ScreenHead } from "../ui"

const WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

function nextDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  })
}

export default function Booking({ onNext, onOrder }) {
  const [service, setService] = useState(SERVICES.find((s) => s.primary))
  const days = useMemo(() => nextDays(7), [])
  const [dayIdx, setDayIdx] = useState(1)
  const [slot, setSlot] = useState(null)

  const chosen = `${days[dayIdx].getMonth() + 1}月${days[dayIdx].getDate()}日（${WEEK[days[dayIdx].getDay()]}）${slot ?? ""}`

  const ready = slot !== null

  return (
    <div className="max-w-5xl mx-auto">
      <ScreenHead
        step="STEP 06 · SERVICE MATCHING & BOOKING"
        title="匹配服务与预约"
        sub="智能体只推荐与诊断结果直接对应的服务——不是卖课，是补缺口。"
      />

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
        {/* ---------- 服务选择 ---------- */}
        <div className="space-y-4">
          {SERVICES.map((s, i) => {
            const sel = service.id === s.id
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.14 }}
                onClick={() => setService(s)}
                className={`glass w-full text-left p-5 md:p-6 relative transition-all duration-300 ${
                  sel ? "ring-gold !border-gold/35" : "glass-hover"
                }`}
              >
                {s.primary && (
                  <span className="absolute -top-2.5 left-5 tag tag-gold !text-[10px] !py-1 shadow-lg shadow-black/40">
                    {s.badge}
                  </span>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className={`w-4 h-4 rounded-full border grid place-items-center shrink-0 transition-all ${
                          sel ? "border-gold bg-gold/20" : "border-white/25"
                        }`}
                      >
                        {sel && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                      </span>
                      <span className="text-[15px] font-semibold text-white/92">{s.name}</span>
                      {!s.primary && <span className="tag !text-[9.5px]">{s.badge}</span>}
                    </div>
                    <p className="text-[12.5px] leading-[1.7] text-white/52 pl-6.5">{s.desc}</p>
                    {s.matchNote && sel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6.5 mt-3 rounded-lg border border-ice/20 bg-ice/[0.05] px-3 py-2 text-[11.5px] text-ice/85">
                          ⚡ {s.matchNote}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-bold text-[19px] gold-text">{fmtPrice(s.price)}</div>
                    <div className="font-mono text-[9.5px] text-white/35 mt-1">{s.unit}</div>
                  </div>
                </div>
              </motion.button>
            )
          })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-mono text-[10.5px] text-white/30 px-1"
          >
            * 服务由 1% DESIGN LAB 真实交付 · 智能体抽取诊断结论自动匹配
          </motion.div>
        </div>

        {/* ---------- 预约 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass p-6 h-fit lg:sticky lg:top-24"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="eyebrow">Book Consultation</span>
            <span className="tag tag-ice !text-[10px]">1v1 · 线上</span>
          </div>

          {/* 导师 */}
          <div className="flex items-center gap-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] p-3.5 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ice/25 to-ice/5 border border-ice/20 grid place-items-center font-display font-bold text-ice">
              Y
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] text-white/90 font-medium">{MENTOR.name}</div>
              <div className="text-[11px] text-white/45 mt-0.5">{MENTOR.cred}</div>
            </div>
          </div>

          {/* 日期 */}
          <div className="font-mono text-[10px] text-white/40 tracking-wider mb-2.5">选择日期</div>
          <div className="grid grid-cols-7 gap-1.5 mb-5">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setDayIdx(i)}
                className={`rounded-lg py-2 text-center border transition-all duration-200 ${
                  dayIdx === i
                    ? "border-gold/50 bg-gold/[0.09] text-gold"
                    : "border-white/[0.07] text-white/55 hover:border-white/20"
                }`}
              >
                <div className="text-[9px] font-mono text-white/35">{WEEK[d.getDay()].slice(1)}</div>
                <div className="text-[14px] font-medium font-mono mt-0.5">{d.getDate()}</div>
              </button>
            ))}
          </div>

          {/* 时段 */}
          <div className="font-mono text-[10px] text-white/40 tracking-wider mb-2.5">选择时段（UTC+8）</div>
          <div className="grid grid-cols-3 gap-1.5 mb-6">
            {MENTOR.slots.map((t) => (
              <button
                key={t}
                onClick={() => setSlot(t)}
                className={`rounded-lg py-2.5 font-mono text-[12.5px] border transition-all duration-200 ${
                  slot === t
                    ? "border-ice/50 bg-ice/[0.09] text-ice"
                    : "border-white/[0.07] text-white/55 hover:border-white/20"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 订单摘要 */}
          <div className="hairline pt-4 space-y-2 mb-5">
            <div className="flex justify-between text-[12px]">
              <span className="text-white/45">服务</span>
              <span className="text-white/80">{service.name}</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-white/45">时间</span>
              <span className="text-white/80 font-mono">{ready ? chosen : "待选择"}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-white/45 text-[12px]">合计</span>
              <span className="font-display font-bold text-[22px] gold-text">{fmtPrice(service.price)}</span>
            </div>
          </div>

          <button
            className="btn-gold w-full"
            disabled={!ready}
            style={!ready ? { opacity: 0.4, cursor: "not-allowed", transform: "none" } : {}}
            onClick={() => { onOrder({ service, time: chosen }); onNext() }}
          >
            {ready ? "确认并支付（支付宝）" : "请先选择咨询时段"}
          </button>
          <div className="text-center font-mono text-[9.5px] text-white/25 mt-3">
            演示环境 · 模拟支付，不产生真实扣款
          </div>
        </motion.div>
      </div>
    </div>
  )
}
