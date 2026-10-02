import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

// ---------- 数字滚动 ----------
export function useCountUp(target, { duration = 1200, start = true } = {}) {
  const [val, setVal] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration, start])
  return val
}

// ---------- 屏幕标题 ----------
export function ScreenHead({ step, title, sub, right }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-end justify-between gap-4 mb-8"
    >
      <div>
        <div className="eyebrow mb-3">{step}</div>
        <h2 className="font-display text-3xl md:text-[40px] font-bold leading-tight tracking-tight text-white">
          {title}
        </h2>
        {sub && <p className="mt-2 text-sm md:text-[15px] text-white/55 max-w-xl leading-relaxed">{sub}</p>}
      </div>
      {right}
    </motion.div>
  )
}

// ---------- 智能体思考条 ----------
export function AgentBar({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl"
    >
      <span className="live-dot" />
      <span className="font-mono text-[12px] text-white/65 cursor-blink">{text}</span>
    </motion.div>
  )
}

// ---------- 雷达图 ----------
export function Radar({ axes, score, target, max = 100, size = 300 }) {
  const cx = size / 2
  const cy = size / 2
  const R = size / 2 - 46
  const n = axes.length
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = (v / max) * R
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const poly = (arr) => arr.map((v, i) => pt(i, v).join(",")).join(" ")
  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {rings.map((f, ri) => (
        <polygon
          key={ri}
          points={poly(axes.map(() => max * f))}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {axes.map((label, i) => {
        const [x, y] = pt(i, max)
        const [lx, ly] = pt(i, max * 1.22)
        return (
          <g key={label}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white/55"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
            >
              {label}
            </text>
          </g>
        )
      })}

      {/* 目标参考线（金色虚线） */}
      <motion.polygon
        points={poly(target)}
        fill="rgba(226,193,121,0.05)"
        stroke="rgba(226,193,121,0.55)"
        strokeWidth="1.5"
        strokeDasharray="6 5"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* 当前得分（冰青实面） */}
      <motion.polygon
        points={poly(score)}
        fill="rgba(147,233,208,0.14)"
        stroke="rgba(147,233,208,0.9)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {score.map((v, i) => {
        const [x, y] = pt(i, v)
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill="#93e9d0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1 }}
          />
        )
      })}
    </svg>
  )
}

// ---------- 匹配度圆环 ----------
export function MatchRing({ value, size = 64, color = "#93e9d0", delay = 0 }) {
  const r = size / 2 - 5
  const c = 2 * Math.PI * r
  const shown = useCountUp(value, { duration: 1400 })
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="absolute font-mono text-[13px] font-medium text-white/90">{Math.round(shown)}</span>
    </div>
  )
}

// ---------- 分数条 ----------
export function ScoreBar({ label, value, target, delay = 0 }) {
  const v = useCountUp(value, { duration: 1100 })
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13px] text-white/70">{label}</span>
        <span className="font-mono text-[13px] text-white/85">
          {Math.round(v)}
          <span className="text-white/35"> / {target}</span>
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-white/[0.06] overflow-hidden relative">
        {/* target mark */}
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-gold/80 rounded"
          style={{ left: `${target}%` }}
        />
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              value + 8 >= target
                ? "linear-gradient(90deg,#4fbfa3,#93e9d0)"
                : value + 18 >= target
                  ? "linear-gradient(90deg,#d9b26a,#e2c179)"
                  : "linear-gradient(90deg,#c96a5a,#ff8a80)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
