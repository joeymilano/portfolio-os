// ============================================================
// PORTFOLIO OS · Agent Intelligence Layer
// 模拟智能体的决策内容：学生画像、作品集解析、Gap 诊断、
// 院校匹配、补强方案、申请时间线、服务与预约。
// 内容按真实设计留学咨询逻辑编排（演示数据）。
// ============================================================

export const BRAND = {
  nameCN: "设计留学智能规划师",
  nameEN: "PORTFOLIO OS",
  org: "1% DESIGN LAB",
  tagline: "把申请这整件事，交给一个智能体办完。",
  version: "Agent v3 · 2027 Fall 申请季",
}

// ---------- 01 · 学生画像 ----------
export const STUDENT = {
  name: "林小舟",
  en: "Xiaozhou L.",
  school: "某美术学院 · 视觉传达设计",
  grade: "本科大三",
  gpa: "3.6 / 4.0",
  targetSeason: "2027 Fall",
  regions: ["英国", "美国"],
  // 智能体根据作品集自动锁定的方向
  direction: "交互与服务设计",
  directionEN: "Interaction & Service Design",
  detected: [
    { label: "作品集媒介构成", value: "平面 78% · 数字 22%" },
    { label: "叙事模式识别", value: "结果导向 > 过程导向" },
    { label: "适配方向推断", value: "交互与服务设计（置信度 91%）" },
  ],
}

// ---------- 02 · 作品集解析 ----------
export const PORTFOLIO = {
  file: "LIN_Xiaozhou_Portfolio_2026.pdf",
  size: "68.4 MB · 74 页 · 3 个完整项目",
  projects: [
    {
      id: "p1",
      name: "候鸟计划",
      type: "品牌视觉系统",
      pages: 26,
      img: "./assets/work/zeon-identity.webp",
      strengths: ["视觉完成度高", "系统性强", "适合作为开篇项目"],
      detected: ["Brand System", "Identity", "Guideline"],
      status: "core",
    },
    {
      id: "p2",
      name: "城市声音地图",
      type: "信息可视化",
      pages: 24,
      img: "./assets/work/spatial-audio.webp",
      strengths: ["选题有社会性", "数据维度丰富"],
      detected: ["Data Viz", "Field Research ⚠", "Iteration ✕"],
      status: "rework",
    },
    {
      id: "p3",
      name: "陶土",
      type: "实验字体",
      pages: 24,
      img: "./assets/work/atlantic-collage.webp",
      strengths: ["媒介实验性", "手工质感独特"],
      detected: ["Typography", "Experiment", "Process ✓"],
      status: "keep",
    },
  ],
}

// ---------- 03 · Gap Analysis（核心） ----------
// 五维评估：当前分 vs 目标院校参考线
export const RADAR = {
  axes: ["视觉表达", "研究深度", "交互与服务", "叙事完整性", "技术广度"],
  score: [88, 52, 46, 60, 55],
  target: [72, 78, 80, 76, 70], // UAL / RCA 交互与服务方向参考线
  max: 100,
}

export const VERDICT = {
  headline: "你的目标是 UAL / RCA，但作品集目前是一份「视觉作品集」，不是一份「过程作品集」。",
  score: 61,
  grade: "B−",
  percentile: "超过 62% 的申请者，距目标院校中位录取水平还差 1 个关键项目",
}

export const FINDINGS = [
  {
    id: "f1",
    level: "critical",
    levelText: "关键差距",
    title: "交互与服务设计维度明显缺位",
    detail:
      "UAL LCC 与 RCA 的评审均为 process-driven：他们要看你怎么研究、怎么迭代、怎么把洞察变成设计决策。你目前的 3 个项目全部偏平面与静态媒介，仅有《城市声音地图》包含田野记录，但没有形成「洞察 → 概念 → 迭代 → 交付」的完整链条。",
    action: "重构《城市声音地图》的 Research → Iteration → Outcome 叙事，补充 8–12 页过程稿（访谈摘录、现场照片、方案迭代对比）。",
    gain: "研究深度 +18 · 叙事完整性 +14",
    icon: "focus",
  },
  {
    id: "f2",
    level: "critical",
    levelText: "结构缺口",
    title: "缺 1 个强交互 / 服务设计项目",
    detail:
      "以你目前的背景直申交互与服务方向，作品集里没有任何一个可交互、可体验的项目是硬伤。Parsons DT 明确要求提交 video / prototype 证据，RCA Service Design 关注系统与服务流程的构建能力。",
    action: "新增 1 个 6–8 周的交互项目：建议由《城市声音地图》延伸，做一个参与式声音装置或城市服务 App 概念，覆盖完整双钻流程。",
    gain: "交互与服务 +26 · 匹配度 +12%",
    icon: "boxes",
  },
  {
    id: "f3",
    level: "improve",
    levelText: "可提升",
    title: "动态媒介与技术广度不足",
    detail:
      "目标项目普遍考察动效与原型能力。目前作品集 74 页全部为静态排版，缺少动态展示（Motion / Prototype / 可交互 Demo），这在面试环节也会成为短板。",
    action: "2 周内产出动态物料：为《候鸟计划》制作 30s 品牌动效，为新增交互项目制作 Figma 可点击原型。",
    gain: "技术广度 +15",
    icon: "clapper",
  },
  {
    id: "f4",
    level: "highlight",
    levelText: "优势亮点",
    title: "视觉表达位于申请者前 10%",
    detail:
      "《候鸟计划》品牌系统完成度极高，规范完整、落地案例真实。这是一个可以直接放进作品集第一位的开篇项目，也是你与纯技术背景申请者拉开差距的资本。",
    action: "保持现状，将其作为作品集封面项目，并延伸一套动态品牌应用。",
    gain: "无需补强 · 直接复用",
    icon: "sparkles",
  },
]

// ---------- 04 · 院校匹配 ----------
export const SCHOOLS = [
  {
    tier: "冲刺",
    tierEN: "Reach",
    name: "Royal College of Art",
    nameCN: "皇家艺术学院",
    program: "MA Service Design",
    location: "伦敦 · 英国",
    match: 74,
    req: ["强研究过程", "系统思维", "小组协作证据"],
    gap: "缺服务设计项目 · 需补 F2",
    note: "全球第 1 的艺术设计院校，服务设计看重公共/社会议题的系统性回应——《城市声音地图》的选题方向对口，但需要重构成完整服务叙事。",
    deadline: "Round 1 · 2027-01（以官网为准）",
  },
  {
    tier: "冲刺",
    tierEN: "Reach",
    name: "Parsons School of Design",
    nameCN: "帕森斯设计学院",
    program: "MFA Design & Technology",
    location: "纽约 · 美国",
    match: 76,
    req: ["原型 / 代码能力", "批判性思维", "Video 展示"],
    gap: "缺动态原型 · 需补 F3",
    note: "技术包容度高，欢迎平面背景转交互的申请者，但必须看到你「做出来」的证据——可交互原型比概念图更有说服力。",
    deadline: "Priority 2026-12-01 / Regular 2027-01-15（以官网为准）",
  },
  {
    tier: "匹配",
    tierEN: "Match",
    name: "University of the Arts London",
    nameCN: "伦敦艺术大学 · LCC",
    program: "MA Interaction Design",
    location: "伦敦 · 英国",
    match: 85,
    req: ["过程叙事", "用户研究", "跨媒介实验"],
    gap: "重构 P2 叙事 · 需补 F1",
    note: "LCC 交互方向对平面转交互背景最友好，明确考察 research-led design process。完成 F1 + F2 补强后，匹配度可提升至 91%。",
    deadline: "Rolling · 建议 2027-01 前递交（以官网为准）",
    primary: true,
  },
  {
    tier: "匹配",
    tierEN: "Match",
    name: "The New School · Parsons",
    nameCN: "（转申备选）Parsons PS",
    program: "MS Strategic Design & Mgmt",
    location: "纽约 · 美国",
    match: 81,
    req: ["策略思维", "案例研究", "职业规划清晰"],
    gap: "无需新项目 · 整理即可",
    note: "策略型方向，接受纯视觉背景。若你希望在设计之外保留商业路径，可作为组合中的稳定项。",
    deadline: "Regular 2027-01-15（以官网为准）",
  },
  {
    tier: "稳妥",
    tierEN: "Safe",
    name: "University of Edinburgh",
    nameCN: "爱丁堡大学 · ECA",
    program: "MA Design Informatics",
    location: "爱丁堡 · 英国",
    match: 88,
    req: ["数据意识", "实验态度", "基础编程（可学）"],
    gap: "现有作品集基本达标",
    note: "数据与设计交叉方向，《城市声音地图》直接对口。综合排名高，回国就业认可度好。",
    deadline: "分轮 · 建议 2027-02 前递交（以官网为准）",
  },
  {
    tier: "稳妥",
    tierEN: "Safe",
    name: "Goldsmiths, University of London",
    nameCN: "金史密斯学院",
    program: "MA Design: Expanded Practice",
    location: "伦敦 · 英国",
    match: 90,
    req: ["实验性", "思辨能力", "跨领域兴趣"],
    gap: "现有作品集达标",
    note: "方向极度包容，重视实验与思辨——《陶土》字体实验在此非常受欢迎。",
    deadline: "Rolling（以官网为准）",
  },
]

// ---------- 05 · 补强方案 ----------
export const REINFORCE = [
  {
    id: "r1",
    priority: "P0 · 立即开始",
    weeks: "2 周",
    title: "重构《城市声音地图》过程叙事",
    items: [
      "补充 6 段田野访谈摘录与现场影像",
      "绘制 Insight → Concept 的推导链路图",
      "增加 2 轮方案迭代对比（before / after）",
      "以「研究页占比 40%」重排 24 页结构",
    ],
    links: ["F1 研究深度", "UAL LCC", "RCA"],
  },
  {
    id: "r2",
    priority: "P0 · 核心投入",
    weeks: "6–8 周",
    title: "新增交互项目《声域 Sphere》（建议）",
    items: [
      "由城市声音数据延伸的参与式声音装置 / App 概念",
      "完整双钻流程：Discover → Define → Develop → Deliver",
      "产出 Figma 可点击原型 + 60s 概念视频",
      "同步成为 Parsons DT 的 video 提交素材",
    ],
    links: ["F2 结构缺口", "F3 技术广度", "Parsons DT"],
    primary: true,
  },
  {
    id: "r3",
    priority: "P1 · 穿插进行",
    weeks: "2 周",
    title: "动态物料与《候鸟计划》动效",
    items: [
      "30s 品牌动效（After Effects）",
      "作品集 PDF 增加动态页二维码",
      "面试用交互式作品集网页（1 页即可）",
    ],
    links: ["F3 技术广度", "面试环节"],
  },
]

// ---------- 06 · 申请时间线 ----------
export const TIMELINE = {
  submitWindow: "2027-01-15",
  windowLabel: "建议统一递交窗口",
  stats: [
    { label: "距递交窗口", value: "DYNAMIC_DAYS", unit: "天" },
    { label: "待完成任务", value: "11", unit: "项" },
    { label: "需产出项目", value: "1.5", unit: "个" },
    { label: "关键里程碑", value: "4", unit: "个" },
  ],
  phases: [
    {
      id: "t1",
      month: "2026 · 10",
      title: "叙事重构期",
      status: "active",
      tasks: ["重构 P2 过程叙事（F1）", "确定新交互项目选题", "联系推荐人（2 位）"],
    },
    {
      id: "t2",
      month: "2026 · 11",
      title: "新项目 Sprint 1",
      status: "upcoming",
      tasks: ["《声域 Sphere》调研与定义", "Parsons priority 材料检查", "个人陈述初稿"],
    },
    {
      id: "t3",
      month: "2026 · 12",
      title: "新项目 Sprint 2 + 动态物料",
      status: "upcoming",
      tasks: ["原型开发与用户测试", "60s 概念视频拍摄剪辑", "作品集整体排版 v2"],
    },
    {
      id: "t4",
      month: "2027 · 01",
      title: "递交窗口",
      status: "deadline",
      tasks: ["PS / CV / RL 终稿", "按校递交（rolling 优先）", "语言成绩送分确认"],
    },
    {
      id: "t5",
      month: "2027 · 02 – 04",
      title: "面试与结果期",
      status: "upcoming",
      tasks: ["RCA / Parsons 面试准备", "作品集讲述演练（EN）", "Argue 奖学金"],
    },
  ],
}

// ---------- 07 · 服务与预约 ----------
export const SERVICES = [
  {
    id: "s2",
    name: "项目辅导计划 · 交互专项",
    desc: "6–8 周导师 1v1 带做新交互项目，直接对应你的 F2 结构缺口，产出可递交完整项目。",
    price: 12800,
    unit: "／ 8 周 · 16 次课",
    badge: "与诊断结果匹配",
    matchNote: "智能体推荐：直接解决 F2（缺强交互项目）",
    primary: true,
  },
  {
    id: "s1",
    name: "作品集深度诊断",
    desc: "90 分钟资深导师逐页诊断 + 书面报告，适合先验证本智能体的补强方案。",
    price: 1280,
    unit: "／ 1 次 · 90 min",
    badge: "轻量入口",
  },
  {
    id: "s3",
    name: "全程申请规划",
    desc: "完整申请周期陪伴：选校、作品集、文书、递交、面试全流程管理。",
    price: 19800,
    unit: "／ 完整周期",
    badge: "省心之选",
  },
]

export const MENTOR = {
  name: "顾问导师 · Yao",
  org: "1% DESIGN LAB",
  cred: "UAL / RCA 背景 · 7 年设计留学辅导",
  slots: ["10:00", "11:00", "14:00", "16:00", "19:00"],
}

// ---------- 工具 ----------
export function fmtPrice(n) {
  return "¥" + n.toLocaleString("zh-CN")
}

export function daysUntil(dateStr) {
  const target = new Date(dateStr + "T23:59:59")
  const now = new Date()
  return Math.max(0, Math.ceil((target - now) / 86400000))
}

export function orderNo() {
  const d = new Date()
  const p = (x) => String(x).padStart(2, "0")
  return `PO${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${String(d.getSeconds()).padStart(2, "0")}`
}
