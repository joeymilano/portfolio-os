import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ShieldCheck, Wallet, CreditCard } from "lucide-react"
import { fmtPrice, orderNo } from "../../data/agent"
import { ScreenHead } from "../ui"

// 支付宝收银台（模拟）：确认 → 处理中 → 成功
export default function Pay({ order, onNext }) {
  const [phase, setPhase] = useState("confirm") // confirm | paying | success
  const [method, setMethod] = useState("yuebao")
  const [no] = useState(() => orderNo())

  useEffect(() => {
    if (phase !== "paying") return
    const t = setTimeout(() => setPhase("success"), 2200)
    return () => clearTimeout(t)
  }, [phase])

  if (!order) return null
  const { service, time } = order

  return (
    <div className="max-w-3xl mx-auto">
      <ScreenHead
        step="STEP 07 · ALIPAY CHECKOUT"
        title="支付宝确认支付"
        sub="预约信息已同步至服务方系统，在支付宝收银台完成最后一环。"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-[22px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]"
      >
        {/* 支付宝风格头 */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#1677FF]">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-6 h-6 rounded-[7px] bg-white text-[#1677FF] font-display font-extrabold text-[13px]">支</span>
            <span className="text-white text-[14px] font-medium">支付宝 · 收银台</span>
          </div>
          <span className="font-mono text-[10px] text-white/75 border border-white/35 rounded-full px-2 py-0.5">演示环境</span>
        </div>

        <div className="bg-[#0d0d15] p-6 md:p-8">
            {/* ---------- 确认页 ---------- */}
            {phase === "confirm" && (
              <div key="confirm" className="fade-up">
                {/* 金额 */}
                <div className="text-center py-4 mb-2">
                  <div className="font-mono text-[11px] text-white/40 mb-2">订单金额</div>
                  <div className="font-display font-extrabold text-[52px] leading-none text-white tracking-tight">
                    <span className="text-[24px] align-top mr-1 text-white/70">¥</span>
                    {service.price.toLocaleString("zh-CN")}
                  </div>
                </div>

                {/* 订单信息 */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] divide-y divide-white/[0.05] mb-6">
                  {[
                    ["商品名称", service.name],
                    ["预约时间", time],
                    ["导师", "1% DESIGN LAB · 顾问导师 Yao"],
                    ["订单号", no],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center px-4 py-3">
                      <span className="text-[12.5px] text-white/40">{k}</span>
                      <span className="text-[12.5px] text-white/80 font-mono">{v}</span>
                    </div>
                  ))}
                </div>

                {/* 支付方式 */}
                <div className="mb-7">
                  <div className="font-mono text-[10px] text-white/40 tracking-wider mb-2.5">支付方式</div>
                  {[
                    { id: "yuebao", name: "余额宝", desc: "可用额度充足 · 推荐", badge: "推荐", Icon: Wallet },
                    { id: "bank", name: "招商银行 (6688)", desc: "储蓄卡 · 单笔限额 50,000", Icon: CreditCard },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 mb-2 transition-all ${
                        method === m.id ? "border-[#1677FF]/60 bg-[#1677FF]/[0.07]" : "border-white/[0.07] hover:border-white/15"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 grid place-items-center ${method === m.id ? "border-[#4d9bff]" : "border-white/25"}`}>
                        {method === m.id && <span className="w-2 h-2 rounded-full bg-[#4d9bff]" />}
                      </span>
                      <m.Icon size={16} strokeWidth={1.7} className="text-white/70 shrink-0" />
                      <span className="text-[13.5px] text-white/85">{m.name}</span>
                      {m.badge && <span className="tag tag-blue !text-[9px] !py-0.5">{m.badge}</span>}
                      <span className="ml-auto text-[11px] text-white/35">{m.desc}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPhase("paying")}
                  className="w-full py-4 rounded-full bg-[#1677FF] hover:bg-[#2e87ff] active:scale-[0.99] text-white text-[16px] font-semibold transition-all shadow-[0_16px_44px_-16px_rgba(22,119,255,0.7)]"
                >
                  确认付款 {fmtPrice(service.price)}
                </button>
              </div>
            )}

            {/* ---------- 处理中 ---------- */}
            {phase === "paying" && (
              <div key="paying" className="py-24 flex flex-col items-center fade-up">
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1677FF] animate-spin" />
                  <span className="absolute inset-0 grid place-items-center text-[#4d9bff] text-xl">¥</span>
                </div>
                <div className="text-white/75 text-[14px]">正在通过支付宝安全验证…</div>
                <div className="font-mono text-[10.5px] text-white/30 mt-2">指纹校验 · SMS · 风控 3 要素</div>
              </div>
            )}

            {/* ---------- 成功 ---------- */}
            {phase === "success" && (
              <div key="success" className="py-6 flex flex-col items-center text-center fade-up">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 rounded-full grid place-items-center mb-5"
                  style={{
                    background: "radial-gradient(circle, rgba(87,255,195,0.16), rgba(87,255,195,0.04))",
                    border: "1.5px solid rgba(87,255,195,0.5)",
                    boxShadow: "0 0 50px -8px rgba(87,255,195,0.4)",
                  }}
                >
                  <motion.svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M4.5 12.5l5 5 10-11"
                      stroke="#57ffc3" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    />
                  </motion.svg>
                </motion.div>
                <div className="font-display font-bold text-[22px] text-white mb-1.5">支付成功</div>
                <div className="font-mono text-[11px] text-white/40 mb-1">{fmtPrice(service.price)} · {no}</div>
                <div className="font-mono text-[10px] text-white/25 mb-7">演示环境 · 未产生真实扣款</div>

                <div className="w-full rounded-xl border border-ice/18 bg-ice/[0.045] px-5 py-4 mb-7 text-left">
                  <div className="font-mono text-[9.5px] tracking-[0.22em] text-ice/70 mb-2">AGENT SYNCED</div>
                  <div className="text-[13px] text-white/80 leading-[1.8]">
                    预约已确认（{time}）。你的<span className="text-ice">申请作战包</span>已生成：
                    诊断报告 1 份 · 院校清单 6 所 · 行动项 11 项 · 倒计时计划 1 份，已推送至站内信与手机。
                  </div>
                </div>

                <button className="btn-gold w-full" onClick={onNext}>查看规划总览 →</button>
              </div>
            )}
        </div>
      </motion.div>

      {/* 安全提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-5 mt-5 font-mono text-[9.5px] text-white/25"
      >
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={11} strokeWidth={1.8} /> 支付宝安全控件
        </span>
        <span>PCI-DSS</span>
        <span>本页面为大赛演示 · 收银台为高保真模拟</span>
      </motion.div>
    </div>
  )
}
