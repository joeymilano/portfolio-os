// 全局氛围层：Aurora 光晕 + 蓝图网格 + 胶片颗粒
export default function Atmosphere() {
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* aurora blobs */}
        <div
          className="aurora-blob drift-a"
          style={{
            width: "44vw",
            height: "44vw",
            left: "-12vw",
            top: "-16vw",
            background:
              "radial-gradient(circle, rgba(226,193,121,0.16) 0%, rgba(226,193,121,0.05) 45%, transparent 70%)",
          }}
        />
        <div
          className="aurora-blob drift-b"
          style={{
            width: "38vw",
            height: "38vw",
            right: "-10vw",
            bottom: "-8vw",
            background:
              "radial-gradient(circle, rgba(147,233,208,0.10) 0%, rgba(147,233,208,0.03) 50%, transparent 72%)",
          }}
        />
        <div
          className="aurora-blob drift-c"
          style={{
            width: "30vw",
            height: "30vw",
            left: "34vw",
            top: "30vh",
            background:
              "radial-gradient(circle, rgba(122,90,255,0.07) 0%, transparent 68%)",
          }}
        />
        <div className="blueprint" />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 90% at 50% 0%, transparent 55%, rgba(7,7,11,0.85) 100%)",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
