"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Dashboard section — a scroll-driven control dashboard.
 *
 * Ported from `dashboard-section.html`. The scroll position drives the whole
 * reveal: the frame rotates and scales in, the counters run up, the chart bars
 * grow, the gauge fills, the meters slide out and the table rows arrive.
 *
 * Fonts come from the site design system — Orbitron for the heading, Inter for
 * the body, the system mono for the data cells. The source file's own Google
 * Fonts (Inter + JetBrains Mono) are deliberately not used.
 */

const ICONS: Record<string, string> = {
  inventory_2: "M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  dashboard: "M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z",
  apparel: "M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z",
  dry_cleaning: "M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z",
  styler: "M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z",
  checkroom: "M8 3L3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z",
  female: "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 13v8M9 18h6",
  warning: "M12 3l10 18H2zM12 10v5M12 18h.01",
  local_shipping:
    "M1 6h13v11H1zM14 9h4l4 4v4h-8zM6 19a2 2 0 1 0 .01 0M18 19a2 2 0 1 0 .01 0",
  account_balance_wallet:
    "M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l2-3h12M16 14h3",
  trending_up: "M3 17l6-6 4 4 8-8M15 7h6v6",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  south_west: "M18 6L6 18M6 9v9h9",
  north_east: "M6 18L18 6M9 6h9v9",
  monitor_heart: "M3 12h4l3-7 4 14 3-7h4",
  shopping_cart: "M3 4h3l3 12h10l2-8H7M10 21h.01M18 21h.01",
  straighten: "M3 8h18v8H3zM7 8v4M11 8v3M15 8v4M19 8v3",
  security: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z",
  assignment: "M8 4h8v3H8zM6 5H5v16h14V5h-1M9 12h6M9 16h6",
  add: "M12 5v14M5 12h14"
};

function Icon({ name, className = "", style }: { name: string; className?: string; style?: CSSProperties }) {
  return (
    <span className={`ed mi ${className}`} style={style}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICONS[name] ?? ""} />
      </svg>
    </span>
  );
}

const BARS: [number, number][] = [
  [65, 40],
  [80, 55],
  [45, 70],
  [90, 60],
  [75, 85],
  [50, 45],
  [35, 30]
];

const METERS: [string, number, string, string][] = [
  ["Stock Coverage", 85, "#69f6b8", "account_balance"],
  ["Sell-Through Rate", 72, "#3B82F6", "shopping_cart"],
  ["Size Range Coverage", 90, "#c084fc", "straighten"],
  ["Stockout Risk", 68, "#ffb148", "security"],
  ["Supplier Reliability", 55, "#22d3ee", "assignment"]
];

type Row = {
  name: string;
  category: string;
  tone: string;
  icon: string;
  sku: string;
  direction: "In" | "Out";
  quantity: string;
  value: string;
  date: string;
};

const ROWS: Row[] = [
  {
    name: "Ankara Wrap Maxi Dress",
    category: "Ankara",
    tone: "pu",
    icon: "dry_cleaning",
    sku: "AD-2201",
    direction: "In",
    quantity: "+48",
    value: "₦888,000",
    date: "Apr 10, 2026"
  },
  {
    name: "Satin Evening Gown",
    category: "Evening Wear",
    tone: "rd",
    icon: "styler",
    sku: "EG-4477",
    direction: "Out",
    quantity: "-6",
    value: "₦372,000",
    date: "Apr 09, 2026"
  },
  {
    name: "Adire Print Two-Piece",
    category: "Traditional",
    tone: "g",
    icon: "checkroom",
    sku: "AT-3310",
    direction: "In",
    quantity: "+86",
    value: "₦2,365,000",
    date: "Apr 08, 2026"
  },
  {
    name: "Chop & Sew Blazer",
    category: "Tailored",
    tone: "bl",
    icon: "checkroom",
    sku: "CB-1189",
    direction: "Out",
    quantity: "-4",
    value: "₦380,000",
    date: "Apr 08, 2026"
  },
  {
    name: "Pleated Midi Skirt",
    category: "Separates",
    tone: "cy",
    icon: "female",
    sku: "PM-7752",
    direction: "In",
    quantity: "+64",
    value: "₦1,024,000",
    date: "Apr 07, 2026"
  }
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const segment = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function DashboardSection() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const fitRef = useRef(1);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const wrap = wrapRef.current;
    const arc = arcRef.current;
    if (!root || !frame || !wrap || !arc) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-to]"));
    const bars = Array.from(root.querySelectorAll<HTMLElement>(".ed-bg u"));
    const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
    const rows = Array.from(root.querySelectorAll<HTMLTableRowElement>("tr.r"));

    const render = (p: number) => {
      const f = ease(segment(p, 0, 0.22));
      frame.style.opacity = String(0.15 + 0.85 * f);
      frame.style.transform = `rotateX(${26 * (1 - f)}deg) translateY(${60 * (1 - f)}px) scale(${
        fitRef.current * (0.88 + 0.12 * f)
      })`;

      const k = ease(segment(p, 0.16, 0.4));
      nums.forEach((node) => {
        const to = Number(node.dataset.to);
        const dec = Number(node.dataset.dec) || 0;
        const value = to * k;
        node.textContent = node.dataset.fmt
          ? Math.round(value).toLocaleString("en-US")
          : value.toFixed(dec);
      });

      const b = segment(p, 0.3, 0.52);
      bars.forEach((bar, i) => {
        bar.style.transform = `scaleY(${ease(clamp01(b * 1.6 - i * 0.06))})`;
      });

      arc.style.strokeDashoffset = String(188.5 - (188.5 - 41.5) * ease(segment(p, 0.38, 0.6)));

      const mt = segment(p, 0.5, 0.7);
      fills.forEach((fill, i) => {
        fill.style.width = `${Number(fill.dataset.w) * ease(clamp01(mt * 1.5 - i * 0.12))}%`;
      });

      const r = segment(p, 0.62, 0.92);
      rows.forEach((row, i) => {
        const q = ease(clamp01(r * 2 - i * 0.28));
        row.style.opacity = String(q);
        row.style.transform = `translateX(${-24 * (1 - q)}px)`;
      });
    };

    const tick = () => {
      if (reduce) {
        render(1);
        return;
      }
      const rect = root.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      render(clamp01(-rect.top / travel));
    };

    const size = () => {
      const mobile = window.innerWidth <= 700;
      const width = mobile ? 980 : 1180;
      frame.style.width = `${width}px`;
      fitRef.current = Math.min(
        1,
        (wrap.clientWidth - 24) / width,
        (window.innerHeight - 150) / frame.offsetHeight
      );
      wrap.style.height = `${frame.offsetHeight * fitRef.current}px`;
      tick();
    };

    let queued = 0;
    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        tick();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    (document.fonts?.ready ?? Promise.resolve()).then(size);
    size();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      if (queued) cancelAnimationFrame(queued);
    };
  }, []);

  return (
    <section className="ed" id="dashboard" ref={rootRef}>
      <div className="ed-stage">
        <div className="ed-head">
          <h2 className="font-display font-black uppercase tracking-tight text-white">
            Monitor everything in one control dashboard
          </h2>
        </div>

        <div className="ed-wrap" ref={wrapRef}>
          <div className="ed-frame" ref={frameRef}>
            <div className="ed-bar">
              <i />
              <i />
              <i />
            </div>

            <div className="ed-body">
              <aside className="ed-side">
                <div className="ed-brand">
                  <div className="ed-logo">
                    <Icon name="inventory_2" />
                  </div>
                  <div>
                    <b>Ella</b>
                    <span>INVENTORY</span>
                  </div>
                </div>
                <div className="ed-act">
                  <Icon name="dashboard" />
                  Overview
                </div>
                <div className="ed-grp">CATALOG</div>
                <div className="ed-grp">STOCK</div>
                <div className="ed-grp">SALES</div>
                <div className="ed-grp">ANALYTICS</div>
                <div className="ed-grp">SYSTEM</div>
                <div className="ed-user">
                  <div className="ed-av">AM</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>Amara Mensah</div>
                    <div style={{ fontSize: 10, color: "#71717A" }}>amara@ella.io</div>
                  </div>
                </div>
              </aside>

              <div className="ed-main">
                <div className="ed-top">
                  <div>
                    <h3>Overview</h3>
                    <p>Live fashion inventory intelligence.</p>
                  </div>
                  <div className="ed-btns">
                    <div className="ed-btn">
                      <Icon name="south_west" className="g" />
                      Stock In
                    </div>
                    <div className="ed-btn">
                      <Icon name="north_east" className="rd" />
                      Stock Out
                    </div>
                    <div className="ed-btn p">
                      <Icon name="add" />
                      Product
                    </div>
                  </div>
                </div>

                <div className="ed-kpis">
                  <div className="ed-card">
                    <div className="ed-k">
                      <small>TOTAL PRODUCTS</small>
                      <div className="ed-ic" style={{ background: "rgba(59,130,246,.1)" }}>
                        <Icon name="apparel" className="bl" />
                      </div>
                    </div>
                    <div className="ed-n">
                      <span data-to="1246" data-fmt="n">
                        0
                      </span>
                    </div>
                    <div className="ed-sub">across 6 categories</div>
                  </div>

                  <div className="ed-card">
                    <div className="ed-k">
                      <small>LOW STOCK</small>
                      <div className="ed-ic" style={{ background: "rgba(245,158,11,.1)" }}>
                        <Icon name="warning" className="am" />
                      </div>
                    </div>
                    <div className="ed-n am">
                      <span data-to="34">0</span>
                    </div>
                    <div className="ed-sub">need replenishment</div>
                  </div>

                  <div className="ed-card">
                    <div className="ed-k">
                      <small>ACTIVE SUPPLIERS</small>
                      <div className="ed-ic" style={{ background: "rgba(6,182,212,.1)" }}>
                        <Icon name="local_shipping" className="cy" />
                      </div>
                    </div>
                    <div className="ed-n">
                      <span data-to="9">0</span>
                    </div>
                    <div className="ed-sub">3 pending orders</div>
                  </div>

                  <div className="ed-card">
                    <div className="ed-k">
                      <small>INVENTORY VALUE</small>
                      <div className="ed-ic" style={{ background: "rgba(105,246,184,.1)" }}>
                        <Icon name="account_balance_wallet" className="g" />
                      </div>
                    </div>
                    <div className="ed-n">
                      ₦<span data-to="218.6" data-dec="1">
                        0
                      </span>
                      M
                    </div>
                    <div className="ed-sub g">
                      <Icon name="trending_up" style={{ width: 13, height: 13, verticalAlign: -2 }} /> +9.4%
                      vs last month
                    </div>
                  </div>
                </div>

                <div className="ed-row">
                  <div
                    className="ed-card"
                    style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                  >
                    <div>
                      <h4>Quick Restock</h4>
                      <div className="ed-lbl" style={{ marginBottom: 10 }}>
                        PRIMARY VENDORS
                      </div>
                      <div style={{ display: "flex" }}>
                        {(
                          [
                            ["AM", "#1e293b", "-6px"],
                            ["ST", "#27272a", "-6px"],
                            ["LA", "#134e4a", "-6px"],
                            ["SR", "#3730a3", "0"]
                          ] as const
                        ).map(([initials, background, margin]) => (
                          <div
                            key={initials}
                            className="ed-av"
                            style={{ background, marginRight: margin, border: "2px solid #111" }}
                          >
                            {initials}
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          marginTop: 14,
                          padding: 10,
                          borderRadius: 8,
                          background: "#181818",
                          border: "1px solid rgba(255,255,255,.08)",
                          fontSize: 11,
                          color: "#A1A1AA",
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        Automated MOQ replenishment
                        <span className="g mono" style={{ fontSize: 10 }}>
                          OPTIMIZED
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: "1px solid rgba(255,255,255,.08)"
                      }}
                    >
                      <div
                        className="mono"
                        style={{
                          flex: 1,
                          height: 36,
                          borderRadius: 10,
                          background: "#181818",
                          border: "1px solid rgba(255,255,255,.08)",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 12px",
                          fontSize: 12
                        }}
                      >
                        ₦ 4,250,000
                      </div>
                      <div
                        style={{
                          height: 36,
                          padding: "0 14px",
                          borderRadius: 10,
                          background: "#FAFAFA",
                          color: "#0A0A0A",
                          fontWeight: 600,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          gap: 5
                        }}
                      >
                        <Icon name="bolt" style={{ width: 15, height: 15 }} />
                        Restock
                      </div>
                    </div>
                  </div>

                  <div className="ed-card">
                    <h4>Stock Movement</h4>
                    <div className="ed-pills">
                      <div
                        className="ed-pill"
                        style={{
                          background: "rgba(105,246,184,.1)",
                          border: "1px solid rgba(105,246,184,.2)"
                        }}
                      >
                        STOCK IN
                        <b className="g">
                          +<span data-to="842" data-fmt="n">
                            0
                          </span>
                        </b>
                      </div>
                      <div
                        className="ed-pill"
                        style={{
                          background: "rgba(255,113,108,.1)",
                          border: "1px solid rgba(255,113,108,.2)"
                        }}
                      >
                        STOCK OUT
                        <b className="rd">
                          -<span data-to="1206" data-fmt="n">
                            0
                          </span>
                        </b>
                      </div>
                    </div>
                    <div className="ed-chart">
                      {BARS.map((bar, i) => (
                        <div className="ed-bg" key={i}>
                          <u style={{ height: `${bar[0]}%`, background: "#FAFAFA" }} />
                          <u style={{ height: `${bar[1]}%`, background: "#3F3F46" }} />
                        </div>
                      ))}
                    </div>
                    <div className="ed-days">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  <div className="ed-card">
                    <h4>
                      <Icon
                        name="monitor_heart"
                        className="bl"
                        style={{ verticalAlign: -4, width: 17, height: 17 }}
                      />{" "}
                      Inventory Health
                    </h4>
                    <div className="ed-gauge">
                      <svg width="170" height="96" viewBox="0 0 160 90">
                        <defs>
                          <linearGradient id="edg" x1="0" x2="1">
                            <stop offset="0" stopColor="#3B82F6" />
                            <stop offset="1" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M20 80A60 60 0 0 1 140 80"
                          fill="none"
                          stroke="rgba(255,255,255,.08)"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path
                          ref={arcRef}
                          d="M20 80A60 60 0 0 1 140 80"
                          fill="none"
                          stroke="url(#edg)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray="188.5"
                          strokeDashoffset="188.5"
                        />
                      </svg>
                      <div className="ed-gnum">
                        <span data-to="78">0</span>
                        <small>Good</small>
                      </div>
                    </div>
                    <div>
                      {METERS.map(([label, value, colour, icon]) => (
                        <div className="ed-m" key={label}>
                          <Icon name={icon} style={{ color: colour }} />
                          <em>{label}</em>
                          <div className="t">
                            <i data-w={value} style={{ background: colour }} />
                          </div>
                          <b>{value}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ed-card">
                  <h4>Recent Stock Movements</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>SKU</th>
                        <th>TYPE</th>
                        <th className="rt">QUANTITY</th>
                        <th className="rt">VALUE</th>
                        <th className="rt">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROWS.map((row) => {
                        const isIn = row.direction === "In";
                        return (
                          <tr className="r" key={row.sku}>
                            <td>
                              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <Icon name={row.icon} className={row.tone} />
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 12 }}>{row.name}</div>
                                  <span className={row.tone} style={{ fontSize: 10 }}>
                                    {row.category}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="mono" style={{ color: "#71717A" }}>
                              {row.sku}
                            </td>
                            <td>
                              <span
                                className={`tag ${isIn ? "g" : "rd"}`}
                                style={{
                                  background: isIn ? "rgba(105,246,184,.15)" : "rgba(255,113,108,.15)"
                                }}
                              >
                                Stock {row.direction}
                              </span>
                            </td>
                            <td className={`rt mono ${isIn ? "g" : "rd"}`}>{row.quantity}</td>
                            <td className="rt mono">{row.value}</td>
                            <td className="rt" style={{ color: "#71717A" }}>
                              {row.date}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardSection;
