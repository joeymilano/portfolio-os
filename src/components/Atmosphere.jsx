// 全局氛围层：ink 画廊底 + 极淡双色角光（academy vermilion / studio mint）+ 颗粒
export default function Atmosphere() {
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden bg-ink" aria-hidden="true">
        <div
          className="aurora-blob drift-a"
          style={{
            width: "46vw",
            height: "46vw",
            left: "-16vw",
            top: "-18vw",
            background:
              "radial-gradient(circle, rgba(255,74,46,0.055) 0%, rgba(255,74,46,0.02) 45%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob drift-b"
          style={{
            width: "40vw",
            height: "40vw",
            right: "-12vw",
            bottom: "-10vw",
            background:
              "radial-gradient(circle, rgba(87,255,195,0.045) 0%, rgba(87,255,195,0.015) 50%, transparent 72%)",
          }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 95% at 50% 0%, transparent 55%, rgba(11,11,10,0.9) 100%)",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
