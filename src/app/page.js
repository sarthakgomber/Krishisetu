"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import LanguageModal from "@/components/layout/LanguageModal";
import { useLanguage } from "@/context/LanguageContext";

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const step = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function useInView(threshold) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function StatNum({ target, suffix }) {
  const [ref, inView] = useInView(0.3);
  const n = useCountUp(target, 2000, inView);
  return <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-white">{n.toLocaleString("en-IN")}{suffix}</span>;
}

export default function HomePage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("farmer");
  const [statsRef] = useInView(0.3);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <LanguageModal />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at 70% 50%, rgba(42,123,40,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(208,138,46,0.08) 0%, transparent 50%)"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-leaf-50 text-leaf-700 border border-leaf-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full animate-pulse" />
              {t.tagline}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-earth leading-[1.05] mb-6">
              {t.heroTitle1}<br />
              <span className="text-leaf-600">{t.heroTitle2}</span><br />
              <span className="text-soil-500">{t.heroTitle3}</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">{t.heroDesc}</p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/register?role=FARMER" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-7 py-4 rounded-2xl hover:bg-leaf-700 active:scale-[0.98] transition-all text-base shadow-warm">
                {t.startSelling}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 bg-white text-earth font-semibold px-7 py-4 rounded-2xl border border-[var(--border)] hover:bg-soil-50 active:scale-[0.98] transition-all text-base">
                {t.browseProduce}
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2"><span className="text-amber-400">★★★★★</span><span>{t.verifiedFarmers}</span></div>
              <div className="w-px h-4 bg-[var(--border)]" />
              <span>{t.zeroCommission}</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden bg-leaf-100 aspect-[4/3] shadow-warm-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=85" alt="Farmer in field" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/30 to-transparent" />
            </div>
            <div className="absolute -left-12 bottom-16 bg-white rounded-2xl shadow-warm-lg p-4 w-56 animate-slide-up border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-leaf-100 rounded-full flex items-center justify-center text-sm">🌾</div>
                <span className="text-xs font-semibold text-earth">Ramesh Kumar</span>
                <span className="ml-auto text-[10px] text-leaf-600 bg-leaf-50 px-1.5 py-0.5 rounded-full">{t.meritBadges[0].tier}</span>
              </div>
              <p className="text-xs text-muted">&ldquo;{t.heroListingDesc}&rdquo;</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-bold text-earth">₹38<span className="text-xs font-normal text-muted">/kg</span></span>
                <span className="text-[10px] text-leaf-600 font-medium">{t.negotiable}</span>
              </div>
            </div>
            <div className="absolute -right-6 top-10 bg-white rounded-2xl shadow-warm-lg p-4 w-52 border border-[var(--border)]">
              <p className="text-[10px] text-muted mb-2 font-medium uppercase tracking-wide">{t.liveChat}</p>
              <div className="space-y-1.5">
                <div className="bg-leaf-600 text-white text-xs px-3 py-1.5 rounded-2xl rounded-bl-sm w-fit">{t.chatMsg1}</div>
                <div className="bg-soil-50 text-earth text-xs px-3 py-1.5 rounded-2xl rounded-br-sm ml-auto w-fit">{t.chatMsg2}</div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-[10px] text-muted">{t.farmerOnline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM BAND */}
      <section className="bg-earth py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-soil-200 text-base md:text-lg leading-relaxed">
            {t.problemText}{" "}
            <span className="text-amber-400 font-bold text-xl">10–23%</span>
            {" "}{t.problemText2}{" "}
            <a href="https://en.wikipedia.org/wiki/Agriculture_in_India" target="_blank" rel="noopener noreferrer" className="text-soil-400 text-sm underline underline-offset-2 hover:text-soil-200 transition-colors">{t.faoSource}</a>
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-leaf-700 py-20" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-leaf-300 text-sm font-semibold uppercase tracking-widest">{t.scaleLabel}</span>
            <h2 className="font-display text-4xl font-bold text-white mt-3">{t.statsTitle}<br />{t.statsTitle2}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { target:42, s:"%", l: t.stat1 },
              { target:18, s:"%", l: t.stat2 },
              { target:89, s:"%", l: t.stat3 },
              { target:11, s:"Cr+", l: t.stat4 },
            ].map((s,i) => (
              <div key={i} className="text-center">
                <StatNum target={s.target} suffix={s.s} />
                <p className="text-leaf-200 text-sm mt-2 leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-leaf-300">
            {[
              { label: t.statSource1Label, sub: t.statSource1Sub, u:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2034943" },
              { label: t.statSource2Label, sub: t.statSource2Sub, u:"https://www.pib.gov.in/PressReleasePage.aspx?PRID=2237739" },
              { label: t.statSource3Label, sub: t.statSource3Sub, u:"https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1910357" },
            ].map((s,i) => (
              <a key={i} href={s.u} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 bg-leaf-800/50 rounded-xl px-4 py-3 hover:bg-leaf-800 transition-colors group">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-leaf-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                <div>
                  <p className="text-leaf-200 group-hover:text-white transition-colors">{s.label}</p>
                  <p className="text-leaf-400 text-[10px] mt-0.5">{s.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.howLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-earth mt-3 mb-4">{t.howTitle}</h2>
            <p className="text-muted max-w-lg mx-auto">{t.howDesc}</p>
          </div>
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-soil-100 p-1.5 rounded-2xl gap-1">
              {["farmer","buyer"].map(tabKey => (
                <button key={tabKey} onClick={() => setTab(tabKey)} className={`px-8 py-3 rounded-xl text-sm font-semibold capitalize transition-all ${tab===tabKey?"bg-leaf-600 text-white shadow-warm":"text-muted hover:text-earth"}`}>
                  {tabKey === "farmer" ? t.iAmFarmer : t.iAmBuyer}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(tab==="farmer" ? t.farmerSteps : t.buyerSteps).map((step, i) => (
              <div key={i} className="relative card p-6 hover:shadow-warm-lg transition-all duration-200 group">
                <div className="absolute -top-3 left-5 bg-leaf-600 text-white text-xs font-bold px-3 py-1 rounded-full">0{i+1}</div>
                {i<3 && <div className="hidden lg:block absolute top-8 -right-3 z-10 text-soil-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>}
                <h3 className="font-display text-lg font-semibold text-earth mt-4 mb-2 group-hover:text-leaf-700 transition-colors">{step.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            {tab==="farmer"
              ? <Link href="/register?role=FARMER" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-leaf-700 transition-all text-base shadow-warm">{t.registerFarmerBtn} <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              : <Link href="/products" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-leaf-700 transition-all text-base shadow-warm">{t.browseNowBtn} <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            }
          </div>
        </div>
      </section>

      {/* WHY KRISHISETU */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.whyLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-earth mt-3 mb-4">{t.whyTitle}<br />{t.whyTitle2}</h2>
            <p className="text-muted max-w-xl mx-auto">{t.whyDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.advantages.map((a,i) => (
              <div key={i} className="group relative rounded-2xl border border-[var(--border)] bg-cream p-7 hover:border-leaf-300 hover:shadow-warm-lg transition-all duration-200">
                <div className="text-3xl mb-4">{a.i}</div>
                <h3 className="font-display text-xl font-semibold text-earth mb-2 group-hover:text-leaf-700 transition-colors">{a.t}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{a.d}</p>
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  <span className="text-red-400 text-xs mt-0.5">✗</span>
                  <span className="text-red-600 text-xs">{a.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.compLabel}</span>
            <h2 className="font-display text-4xl font-bold text-earth mt-3">{t.compTitle}</h2>
          </div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-leaf-600 text-white">
                    <th className="text-left px-6 py-4 font-semibold">{t.compFeature}</th>
                    <th className="px-4 py-4 font-semibold text-center"><span className="bg-white/20 px-3 py-1 rounded-full text-xs">KrishiSetu</span></th>
                    <th className="px-4 py-4 font-semibold text-center text-leaf-200 text-xs">Agrimp</th>
                    <th className="px-4 py-4 font-semibold text-center text-leaf-200 text-xs">KisanMandi</th>
                    <th className="px-4 py-4 font-semibold text-center text-leaf-200 text-xs">OFN India</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    [0, true,false,false,false],
                    [1, true,false,t.compBasic,false],
                    [2, true,false,t.compPartial,true],
                    [3, true,false,true,true],
                    [4, true,false,true,true],
                    [5, true,true,true,false],
                    [6, true,false,false,false],
                    [7, true,false,t.compPartial,true],
                  ].map(([rowIdx,...vals],i) => (
                    <tr key={i} className={i%2===0?"bg-white":"bg-soil-50/50"}>
                      <td className="px-6 py-4 font-medium text-earth">{t.compRows[rowIdx]}</td>
                      {vals.map((v,j) => (
                        <td key={j} className="px-4 py-4 text-center">
                          {v===true ? <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${j===0?"bg-leaf-100 text-leaf-700":"bg-green-50 text-green-600"}`}>✓</span>
                          : v===false ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-400">✗</span>
                          : <span className="text-xs text-muted bg-soil-100 px-2 py-0.5 rounded-full">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* MERIT SYSTEM */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.meritLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-earth mt-3 mb-6">{t.meritTitle}<br />{t.meritTitle2}</h2>
            <p className="text-muted leading-relaxed mb-8">{t.meritDesc}</p>
            <div className="space-y-5">
              {t.meritFactors.map(item => (
                <div key={item.l} className="flex gap-4 items-start">
                  <div className="text-2xl shrink-0 mt-0.5">{item.i}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-earth">{item.l}</span>
                      <span className="text-xs text-muted font-medium">{item.pct} {t.meritPoints}</span>
                    </div>
                    <div className="h-2 bg-soil-100 rounded-full overflow-hidden mb-1.5">
                      <div className={`h-full rounded-full ${item.pct===40?"bg-amber-400":item.pct===35?"bg-leaf-500":"bg-sky-400"}`} style={{width:`${item.pct}%`}} />
                    </div>
                    <p className="text-xs text-muted">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {t.meritBadges.map(badge => (
              <div key={badge.tier} className={`rounded-2xl border p-5 ${badge.cls}`}>
                <div className={`font-display text-lg font-bold mb-1 ${badge.txt}`}>{badge.tier}</div>
                <div className={`text-2xl font-bold mb-2 ${badge.txt}`}>{badge.range}</div>
                <p className="text-xs text-muted leading-relaxed">{badge.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCE GALLERY */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.galleryLabel}</span>
            <h2 className="font-display text-4xl font-bold text-earth mt-3">{t.galleryTitle}</h2>
            <p className="text-muted mt-3 max-w-lg mx-auto">{t.galleryDesc}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80",
              "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
              "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80",
              "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
            ].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square bg-soil-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={t.categories[i]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">{t.categories[i]}</p>
                <Link href="/products" className="absolute inset-0" aria-label={t.categories[i]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR FARMERS */}
      <section className="py-24 bg-earth relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-soil-400 text-sm font-semibold uppercase tracking-widest">{t.forFarmersLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-6">{t.forFarmersTitle}<br />{t.forFarmersTitle2}</h2>
            <p className="text-soil-300 leading-relaxed mb-8">{t.forFarmersDesc}</p>
            <ul className="space-y-4 mb-10">
              {t.farmerBenefits.map(item => (
                <li key={item} className="flex items-start gap-3 text-soil-200 text-sm"><span className="text-leaf-400 mt-0.5 shrink-0">✓</span>{item}</li>
              ))}
            </ul>
            <Link href="/register?role=FARMER" className="inline-flex items-center gap-2 bg-leaf-500 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-leaf-400 transition-all text-base">
              {t.joinFarmerBtn}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-warm-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=85" alt="Indian farmer with produce" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-warm-lg p-5 border border-[var(--border)]">
              <p className="text-xs text-muted mb-1">{t.meritScore}</p>
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-bold text-earth">87</span>
                <div>
                  <span className="text-amber-600 text-sm font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{t.meritBadges[0].tier}</span>
                  <p className="text-[10px] text-muted mt-1">42 {t.ordersCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR BUYERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-warm-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=85" alt="Fresh vegetables" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-warm-lg p-4 border border-[var(--border)] w-52">
              <p className="text-xs text-muted mb-3 font-medium">{t.priceComparison}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted">{t.retailStore}</span><span className="font-semibold text-red-500 line-through">₹60/kg</span></div>
                <div className="flex justify-between"><span className="text-muted">{t.vegVendor}</span><span className="font-semibold text-red-400 line-through">₹48/kg</span></div>
                <div className="flex justify-between bg-leaf-50 rounded-lg px-2 py-1"><span className="text-leaf-700 font-medium">KrishiSetu</span><span className="font-bold text-leaf-700">₹35/kg</span></div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-leaf-600 text-sm font-semibold uppercase tracking-widest">{t.forBuyersLabel}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-earth mt-3 mb-6">{t.forBuyersTitle}<br />{t.forBuyersTitle2}</h2>
            <p className="text-muted leading-relaxed mb-8">{t.forBuyersDesc}</p>
            <ul className="space-y-4 mb-10">
              {t.buyerBenefits.map(item => (
                <li key={item} className="flex items-start gap-3 text-earth text-sm"><span className="text-leaf-600 mt-0.5 shrink-0">✓</span>{item}</li>
              ))}
            </ul>
            <Link href="/products" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-leaf-700 transition-all text-base shadow-warm">
              {t.browseProduce}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-leaf-600 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t.ctaTitle1}<br />{t.ctaTitle2}<br />
            <span className="text-leaf-200">{t.ctaTitle3}</span>
          </h2>
          <p className="text-leaf-200 text-lg mb-10 max-w-2xl mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register?role=FARMER" className="bg-white text-leaf-700 font-bold px-8 py-4 rounded-2xl hover:bg-leaf-50 transition-all text-base shadow-warm-lg">{t.ctaFarmer}</Link>
            <Link href="/register?role=BUYER" className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-leaf-700 transition-all text-base">{t.ctaBuyer}</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-earth py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center"><span className="text-white text-sm font-bold font-display">K</span></div>
                <span className="font-display text-lg font-semibold text-white">KrishiSetu</span>
              </div>
              <p className="text-soil-400 text-sm leading-relaxed">{t.footerDesc}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t.forFarmers}</h4>
              <ul className="space-y-2 text-soil-400 text-sm">
                <li><Link href="/register?role=FARMER" className="hover:text-white transition-colors">{t.footerLinks.registerFree}</Link></li>
                <li><Link href="/farmer/listings/new" className="hover:text-white transition-colors">{t.footerLinks.listProduce}</Link></li>
                <li><Link href="/farmer/dashboard" className="hover:text-white transition-colors">{t.dashboard}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t.forBuyers}</h4>
              <ul className="space-y-2 text-soil-400 text-sm">
                <li><Link href="/register?role=BUYER" className="hover:text-white transition-colors">{t.footerLinks.register}</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">{t.browseProduce}</Link></li>
                <li><Link href="/buyer/orders" className="hover:text-white transition-colors">{t.footerLinks.myOrders}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">{t.officialSources}</h4>
              <ul className="space-y-2 text-soil-400 text-sm">
                <li><a href="https://agriwelfare.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dept. of Agriculture, GoI</a></li>
                <li><a href="https://www.pib.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Press Info Bureau</a></li>
                <li><a href="https://desagri.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Agri Statistics, GoI</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-soil-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-soil-500 text-xs">
            <span>{t.footerCopy}</span>
            <span>{t.footerAuthors}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}