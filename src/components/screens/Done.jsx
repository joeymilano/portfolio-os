import { motion } from "motion/react"
import { Check, RotateCcw, Code2 } from "lucide-react"
import { BRAND } from "../../data/agent"
import { STEPS } from "../Rail"

const DELIVERABLES = [
  { v: "1", l: "诊断报告", d: "五维模型 + 4 项发现" },
  { v: "6", l: "匹配院校", d: "冲稳妥三档" },
  { v: "11", l: "行动项", d: "含优先级与工期" },
  { v: "1", l: "作战时间线", d: "锚定递交窗口" },
  { v: "1", l: "预约", d: "导师 1v1 已确认" },
  { v: "1", l: "支付", d: "支付宝 · 已完成" },
]

const WORKS = [
  { src: "./assets/work/mars-modules.webp", cap: "Mars Modules · RCA" },
  { src: "./assets/work/sky-city.webp", cap: "Sky City · UAL" },
  { src: "./assets/work/realtime-visuals.webp", cap: "Realtime Visuals · Parsons" },
  { src: "./assets/work/wearable-memory.webp", cap: "Wearable Memory · ECA" },
  { src: "./assets/work/drone-render.webp", cap: "Drone Render · Goldsmiths" },
]

export default function Done({ onRestart, repoUrl }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0, 1] }}
        className="mt-6 mb-10"
      >
        <div className="eyebrow mb-5">MISSION COMPLETE</div>
        <h2 className="font-serif-display text-[30px] md:text-[44px] leading-[1.2] tracking-tight">
          <span className="text-fg">从上传作品集到锁定服务，</span>
          <br />
          <span className="text-hot">一个智能体办完了一整件事。</span>
        </h2>
        <p className="mt-5 text-[14px] text-fg2 max-w-lg mx-auto leading-relaxed">
          没有跳转 5 个网站、没有翻 30 篇攻略、没有加 8 个中介微信。
          诊断、规划、执行、交易——在一支对话流里闭环。
        </p>
      </motion.div>

      {/* 步骤回顾 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="glass p-6 md:p-7 mb-6"
      >
        <div className="eyebrow mb-5 text-left">Execution Trace</div>
        <div className="flex flex-wrap items-center gap-2">
          {STEPS.map((s, i) => (
            <span key={s.id} className="flex items-center gap-2">
              <span className="tag tag-ice !text-[11px] gap-1.5">
                <Check size={9} strokeWidth={2.6} /> {s.label}
              </span>
              {i < STEPS.length - 1 && <span className="text-white/20 text-[10px]">→</span>}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 交付物 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {DELIVERABLES.map((d, i) => (
          <motion.div
            key={d.l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="glass p-4"
          >
            <div className="font-serif-display font-semibold text-[22px] text-hot">{d.v}</div>
            <div className="text-[12px] text-fg mt-1">{d.l}</div>
            <div className="font-mono text-[9px] text-fg3 mt-0.5">{d.d}</div>
          </motion.div>
        ))}
      </div>

      {/* 学员作品横幅 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="text-left mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="eyebrow"><b>Selected Work</b> · 作品集学院 · 学员作品</span>
          <span className="font-mono text-[10px] text-fg3 tracking-[0.08em]">1% DESIGN LAB</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {WORKS.map((w, i) => (
            <motion.div
              key={w.src}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.08 }}
              className="relative overflow-hidden rounded-lg border border-[rgba(237,237,232,0.12)] group"
            >
              <img src={w.src} alt={w.cap} className="w-full h-24 md:h-28 object-cover work-img" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-1.5 left-2 right-2 font-mono text-[8.5px] text-fg2 tracking-[0.04em] truncate">
                {w.cap}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button className="btn-ghost gap-2" onClick={onRestart}>
          <RotateCcw size={13} strokeWidth={1.8} /> 重新演示
        </button>
        {repoUrl && (
          <a className="btn-ghost gap-2" href={repoUrl} target="_blank" rel="noreferrer">
            <Code2 size={13} strokeWidth={1.8} /> GitHub 源码
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-14 font-mono text-[10px] text-white/25 tracking-[0.25em]"
      >
        {BRAND.nameEN} · {BRAND.org} · ALIPAY AGENT EMERGENCE AWARD 2026
      </motion.div>
    </div>
  )
}
