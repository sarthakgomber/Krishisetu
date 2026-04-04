"use client";
import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    browse: "Browse",
    dashboard: "Dashboard",
    signOut: "Sign out",
    signIn: "Sign in",
    getStarted: "Get started",

    chooseLanguage: "Choose your language",
    chooseLanguageSub: "Select the language you're most comfortable with. You can change this anytime.",
    continueBtn: "Continue",
    langEnLabel: "English",
    langHiLabel: "Hindi",
    langPaLabel: "Punjabi",

    tagline: "India's Direct Farm Marketplace",
    heroTitle1: "The farmer",
    heroTitle2: "sets the price.",
    heroTitle3: "Not the middleman.",
    heroDesc: "KrishiSetu connects farmers directly with buyers. Browse real listings, chat live to negotiate price, and order fresh produce at what it actually costs — not what a trader decides.",
    startSelling: "Start Selling",
    browseProduce: "Browse Produce",
    verifiedFarmers: "Verified farmers",
    zeroCommission: "Zero commission on earnings",
    chatMsg1: "Can you do ₹35?",
    chatMsg2: "Deal at ₹36 ✓",

    problemText: "Indian farmers receive only",
    problemText2: "of what consumers finally pay — the rest goes to middlemen, losses, and inefficiencies.",

    scaleLabel: "The scale of the problem",
    statsTitle: "Agriculture powers India.",
    statsTitle2: "Farmers deserve better.",
    stat1: "Of India's population depends on agriculture for livelihood",
    stat2: "Agriculture's share in India's GDP at current prices",
    stat3: "Of farmers own less than 2 hectares of land",
    stat4: "Farmers covered under PM-KISAN income support",
    statSource1Label: "42.3% population livelihood",
    statSource1Sub: "Economic Survey 2023-24 · PIB, Govt. of India",
    statSource2Label: "18% GDP contribution",
    statSource2Sub: "Ministry of Agriculture & Farmers Welfare · PIB",
    statSource3Label: "89.4% small farmers stat",
    statSource3Sub: "NSS 77th Round · NSO, MoSPI · PIB, Govt. of India",

    howLabel: "How it works",
    howTitle: "Simple for everyone",
    howDesc: "Whether you grow it or eat it, KrishiSetu makes the transaction fair, direct, and fast.",
    iAmFarmer: "🌾 I'm a Farmer",
    iAmBuyer: "🛒 I'm a Buyer",
    farmerSteps: [
      { t: "Register Free", d: "Create your farmer profile in 2 minutes. Add farm name, location, and what you grow." },
      { t: "List Your Produce", d: "Upload photos, set your own price per kg/quintal, add harvest date. Go live instantly." },
      { t: "Negotiate Directly", d: "Buyers chat with you in real time. No auction, no waiting. You decide who you sell to." },
      { t: "Build Reputation", d: "Every order earns you a Merit Score. Gold badge = more buyers trust you = more sales." },
    ],
    buyerSteps: [
      { t: "Browse Fresh Listings", d: "See produce harvested this week with real photos, real prices, and farmer locations." },
      { t: "Check Merit Score", d: "Every farmer has a visible trust score — ratings, transactions, response time. No surprises." },
      { t: "Negotiate the Price", d: "Chat directly with the farmer. Ask about freshness, delivery, quantity. Agree on a fair deal." },
      { t: "Order with Confidence", d: "Place your order. Track status. Rate the farmer after delivery. Simple and honest." },
    ],
    registerFarmerBtn: "Register as Farmer — it's free",
    browseNowBtn: "Browse Produce Now",

    whyLabel: "Why KrishiSetu",
    whyTitle: "What other platforms",
    whyTitle2: "can't offer",
    whyDesc: "We studied every agri marketplace in India. Here's what makes us genuinely different.",
    advantages: [
      { i:"💬", t:"Real-time negotiation", d:"The only platform where you chat directly with the farmer and agree on price before ordering. No fixed rates set by someone else.", v:"Others use fixed pricing or bidding auctions" },
      { i:"🏅", t:"Merit Score system", d:"Every farmer has a transparent score built from ratings, completed orders, and response time. You see exactly why a farmer is trusted.", v:"Others show star ratings with no formula or breakdown" },
      { i:"🧑‍🌾", t:"Built for small farmers", d:"89.4% of Indian farmers own less than 2 hectares. KrishiSetu is designed for them — simple listing, mobile-friendly, no tech expertise needed.", v:"Others target bulk traders and industrial buyers only" },
      { i:"₹0", t:"Zero commission on farmers", d:"Farmers keep 100% of what buyers pay. We don't take a cut from the person who did all the work.", v:"Others charge farmers listing fees or transaction percentage" },
      { i:"🥬", t:"Consumer-first marketplace", d:"Homemakers, restaurants, small retailers — anyone can buy. Not just wholesale buyers or institutions.", v:"Agrimp and KisanMandi target B2B industrial buyers" },
      { i:"📍", t:"India-first design", d:"Built for Indian farmers and buyers. Every feature designed around how buying and selling actually works in India — like haggling.", v:"Global platforms don't understand the Indian market context" },
    ],

    compLabel: "Honest comparison",
    compTitle: "How we compare",
    compFeature: "Feature",
    compBasic: "Basic",
    compPartial: "Partial",
    compRows: [
      "Real-time chat negotiation",
      "Merit/trust score system",
      "Consumer buyers (not B2B only)",
      "Zero commission for farmers",
      "India-focused",
      "Any crop type (not just organic)",
      "Harvest date visibility",
      "Mobile-friendly listing",
    ],

    meritLabel: "Trust, made transparent",
    meritTitle: "The Merit Score —",
    meritTitle2: "our answer to blind trust",
    meritDesc: "Every other platform asks you to trust a seller blindly. KrishiSetu shows you exactly how that trust was earned — broken into three measurable things.",
    meritFactors: [
      { i:"⭐", l:"Average Rating", pct:40, d:"Buyers rate farmers after every order. 1–5 stars." },
      { i:"📦", l:"Transaction Score", pct:35, d:"More completed orders = higher trust. Proven track record." },
      { i:"⚡", l:"Response Time", pct:25, d:"Farmers who reply within 1 hour get maximum points." },
    ],
    meritPoints: "points",
    meritBadges: [
      { tier:"🥇 Gold", range:"80–100", cls:"bg-amber-50 border-amber-200", txt:"text-amber-800", d:"Top-rated farmers. Highly responsive. Consistent quality." },
      { tier:"🥈 Silver", range:"60–79", cls:"bg-slate-50 border-slate-200", txt:"text-slate-700", d:"Reliable farmers with a good track record of deliveries." },
      { tier:"🥉 Bronze", range:"40–59", cls:"bg-orange-50 border-orange-200", txt:"text-orange-700", d:"Growing reputation. Completed several orders." },
      { tier:"🌱 Unranked", range:"0–39", cls:"bg-soil-50 border-soil-200", txt:"text-soil-700", d:"New farmer. No history yet — every farmer starts here." },
    ],

    galleryLabel: "From the field",
    galleryTitle: "India grows the world's finest produce",
    galleryDesc: "Basmati from Haryana. Mangoes from Maharashtra. Spices from Kerala. Find it all, directly from the farmer.",
    categories: ["Grains & Rice", "Fresh Vegetables", "Seasonal Fruits", "Dairy & More"],

    forFarmersLabel: "For Farmers",
    forFarmersTitle: "Your crop. Your price.",
    forFarmersTitle2: "Your reputation.",
    forFarmersDesc: "For too long, farmers have been told what their produce is worth by people who never grew a single crop. KrishiSetu gives that decision back to you.",
    farmerBenefits: [
      "List produce in minutes, go live immediately",
      "Set your own price — no one overrides it",
      "Chat directly with buyers, negotiate terms",
      "Build a Merit Score that gets you repeat business",
      "Zero platform commission — you keep everything",
    ],
    joinFarmerBtn: "Join as a Farmer — Free",

    forBuyersLabel: "For Buyers",
    forBuyersTitle: "Pay the farm price,",
    forBuyersTitle2: "not the retail price.",
    forBuyersDesc: "Every layer between you and the farmer adds markup. KrishiSetu removes every layer. You buy at what a farmer actually needs to earn.",
    buyerBenefits: [
      "See farmer's Merit Score before you buy",
      "Chat directly to negotiate price and quantity",
      "Harvest date visible on every listing",
      "Rate your experience, hold farmers accountable",
      "Works for homemakers, restaurants, small retailers",
    ],

    ctaTitle1: "The mandi was built",
    ctaTitle2: "before the internet.",
    ctaTitle3: "We built something better.",
    ctaDesc: "Join KrishiSetu today. If you're a farmer, list your first crop in under 5 minutes. If you're a buyer, find fresh produce from a verified farmer near you right now.",
    ctaFarmer: "I'm a Farmer — Join Free",
    ctaBuyer: "I'm a Buyer — Browse Now",

    footerDesc: "Connecting India's farmers directly with buyers. No middlemen. No inflated prices. Just fair trade.",
    forFarmers: "For Farmers",
    forBuyers: "For Buyers",
    officialSources: "Official Sources",
    footerLinks: { registerFree: "Register Free", listProduce: "List Produce", register: "Register", myOrders: "My Orders" },
    footerCopy: "© 2026 KrishiSetu · Dronacharya College of Engineering, Gurugram",
    footerAuthors: "Sarthak Gomber & Jatin Bhardwaj · B.Tech CSE",

    negotiable: "Negotiable ✓",
    liveChat: "Live Chat",
    farmerOnline: "Farmer is online",
    meritScore: "Merit Score",
    ordersCompleted: "orders completed",
    priceComparison: "Price comparison",
    retailStore: "Retail store",
    vegVendor: "Vegetable vendor",
    heroListingDesc: "Fresh Basmati Rice, 50kg available",
    faoSource: "FAO data via Wikipedia",
  },

  hi: {
    browse: "देखें",
    dashboard: "डैशबोर्ड",
    signOut: "साइन आउट",
    signIn: "साइन इन",
    getStarted: "शुरू करें",

    chooseLanguage: "अपनी भाषा चुनें",
    chooseLanguageSub: "वह भाषा चुनें जिसमें आप सबसे सहज हों। आप इसे कभी भी बदल सकते हैं।",
    continueBtn: "जारी रखें",
    langEnLabel: "अंग्रेज़ी",
    langHiLabel: "हिन्दी",
    langPaLabel: "पंजाबी",

    tagline: "भारत का सीधा फार्म बाज़ार",
    heroTitle1: "किसान",
    heroTitle2: "खुद तय करता है दाम।",
    heroTitle3: "बिचौलिया नहीं।",
    heroDesc: "कृषिसेतु किसानों को सीधे खरीदारों से जोड़ता है। असली लिस्टिंग देखें, सीधे बात करके दाम तय करें, और ताज़ा उपज को उसके असली दाम पर खरीदें।",
    startSelling: "बेचना शुरू करें",
    browseProduce: "उपज देखें",
    verifiedFarmers: "सत्यापित किसान",
    zeroCommission: "कमाई पर शून्य कमीशन",
    chatMsg1: "क्या ₹35 हो सकता है?",
    chatMsg2: "₹36 में सौदा ✓",

    problemText: "भारतीय किसानों को उपभोक्ताओं द्वारा चुकाई गई कीमत का केवल",
    problemText2: "मिलता है — बाकी बिचौलियों, नुकसान और अकुशलता में चला जाता है।",

    scaleLabel: "समस्या का पैमाना",
    statsTitle: "कृषि भारत की ताकत है।",
    statsTitle2: "किसान बेहतर के हकदार हैं।",
    stat1: "भारत की आबादी कृषि पर निर्भर है",
    stat2: "GDP में कृषि का हिस्सा",
    stat3: "किसानों के पास 2 हेक्टेयर से कम ज़मीन",
    stat4: "किसान PM-KISAN के तहत लाभान्वित",
    statSource1Label: "42.3% जनसंख्या आजीविका",
    statSource1Sub: "आर्थिक सर्वेक्षण 2023-24 · PIB, भारत सरकार",
    statSource2Label: "18% GDP योगदान",
    statSource2Sub: "कृषि एवं किसान कल्याण मंत्रालय · PIB",
    statSource3Label: "89.4% छोटे किसान आंकड़ा",
    statSource3Sub: "NSS 77वां दौर · NSO, MoSPI · PIB, भारत सरकार",

    howLabel: "यह कैसे काम करता है",
    howTitle: "सबके लिए आसान",
    howDesc: "चाहे आप उगाते हों या खाते हों, कृषिसेतु लेनदेन को उचित, सीधा और तेज़ बनाता है।",
    iAmFarmer: "🌾 मैं किसान हूँ",
    iAmBuyer: "🛒 मैं खरीदार हूँ",
    farmerSteps: [
      { t: "मुफ्त पंजीकरण", d: "2 मिनट में अपनी किसान प्रोफ़ाइल बनाएं। खेत का नाम, स्थान और फसल जोड़ें।" },
      { t: "उपज सूचीबद्ध करें", d: "फोटो अपलोड करें, अपना खुद का भाव तय करें, कटाई की तारीख जोड़ें। तुरंत लाइव हों।" },
      { t: "सीधे बातचीत करें", d: "खरीदार आपसे सीधे बात करते हैं। कोई नीलामी नहीं। आप तय करें किसे बेचना है।" },
      { t: "प्रतिष्ठा बनाएं", d: "हर ऑर्डर आपको मेरिट स्कोर देता है। गोल्ड बैज = ज़्यादा भरोसा = ज़्यादा बिक्री।" },
    ],
    buyerSteps: [
      { t: "ताज़ी लिस्टिंग देखें", d: "इस हफ्ते कटी उपज देखें — असली फोटो, असली दाम, किसान की लोकेशन।" },
      { t: "मेरिट स्कोर जांचें", d: "हर किसान का भरोसा स्कोर दिखता है — रेटिंग, लेनदेन, जवाब का समय।" },
      { t: "दाम तय करें", d: "किसान से सीधे बात करें। ताज़गी, डिलीवरी, मात्रा पूछें। उचित सौदा करें।" },
      { t: "भरोसे से ऑर्डर करें", d: "ऑर्डर दें। स्थिति ट्रैक करें। डिलीवरी के बाद किसान को रेट करें।" },
    ],
    registerFarmerBtn: "किसान के रूप में पंजीकरण — मुफ्त",
    browseNowBtn: "अभी उपज देखें",

    whyLabel: "कृषिसेतु क्यों",
    whyTitle: "जो दूसरे प्लेटफॉर्म",
    whyTitle2: "नहीं दे सकते",
    whyDesc: "हमने भारत के हर कृषि बाज़ार का अध्ययन किया। यहाँ बताया है कि हम सच में अलग क्यों हैं।",
    advantages: [
      { i:"💬", t:"रियल-टाइम मोलभाव", d:"एकमात्र प्लेटफॉर्म जहाँ आप सीधे किसान से बात करके ऑर्डर से पहले दाम तय करते हैं। कोई तय दर नहीं।", v:"दूसरे फिक्स्ड प्राइसिंग या बोली नीलामी इस्तेमाल करते हैं" },
      { i:"🏅", t:"मेरिट स्कोर सिस्टम", d:"हर किसान का पारदर्शी स्कोर — रेटिंग, पूरे ऑर्डर और जवाब के समय से बनता है। आप जानते हैं भरोसा कैसे कमाया।", v:"दूसरे बिना फॉर्मूले के सितारे रेटिंग दिखाते हैं" },
      { i:"🧑‍🌾", t:"छोटे किसानों के लिए बना", d:"89.4% भारतीय किसानों के पास 2 हेक्टेयर से कम ज़मीन है। कृषिसेतु उन्हीं के लिए बना है — आसान लिस्टिंग, मोबाइल फ्रेंडली।", v:"दूसरे थोक व्यापारियों और औद्योगिक खरीदारों को टार्गेट करते हैं" },
      { i:"₹0", t:"किसानों पर शून्य कमीशन", d:"किसान खरीदारों द्वारा चुकाई गई 100% राशि रखते हैं। हम काम करने वाले से कोई हिस्सा नहीं लेते।", v:"दूसरे किसानों से लिस्टिंग फीस या लेनदेन प्रतिशत लेते हैं" },
      { i:"🥬", t:"उपभोक्ता-प्रथम बाज़ार", d:"गृहिणी, रेस्तरां, छोटे विक्रेता — कोई भी खरीद सकता है। सिर्फ थोक खरीदार नहीं।", v:"Agrimp और KisanMandi केवल B2B औद्योगिक खरीदारों को टार्गेट करते हैं" },
      { i:"📍", t:"भारत-प्रथम डिज़ाइन", d:"भारतीय किसानों और खरीदारों के लिए बना। हर सुविधा भारत में खरीद-बिक्री के तरीके के हिसाब से — जैसे मोलभाव।", v:"वैश्विक प्लेटफॉर्म भारतीय बाज़ार के संदर्भ को नहीं समझते" },
    ],

    compLabel: "ईमानदार तुलना",
    compTitle: "हम कैसे तुलना करते हैं",
    compFeature: "सुविधा",
    compBasic: "बुनियादी",
    compPartial: "आंशिक",
    compRows: [
      "रियल-टाइम चैट मोलभाव",
      "मेरिट/भरोसा स्कोर सिस्टम",
      "उपभोक्ता खरीदार (केवल B2B नहीं)",
      "किसानों के लिए शून्य कमीशन",
      "भारत-केंद्रित",
      "कोई भी फसल (केवल जैविक नहीं)",
      "कटाई की तारीख दृश्यता",
      "मोबाइल-फ्रेंडली लिस्टिंग",
    ],

    meritLabel: "भरोसा, पारदर्शी तरीके से",
    meritTitle: "मेरिट स्कोर —",
    meritTitle2: "अंधे भरोसे का हमारा जवाब",
    meritDesc: "दूसरे प्लेटफॉर्म आपसे बिना कारण भरोसा करने को कहते हैं। कृषिसेतु दिखाता है कि वह भरोसा कैसे कमाया गया।",
    meritFactors: [
      { i:"⭐", l:"औसत रेटिंग", pct:40, d:"खरीदार हर ऑर्डर के बाद किसान को रेट करते हैं। 1–5 सितारे।" },
      { i:"📦", l:"लेनदेन स्कोर", pct:35, d:"ज़्यादा पूरे ऑर्डर = ज़्यादा भरोसा। सिद्ध ट्रैक रिकॉर्ड।" },
      { i:"⚡", l:"जवाब का समय", pct:25, d:"1 घंटे के भीतर जवाब देने वाले किसानों को अधिकतम अंक।" },
    ],
    meritPoints: "अंक",
    meritBadges: [
      { tier:"🥇 गोल्ड", range:"80–100", cls:"bg-amber-50 border-amber-200", txt:"text-amber-800", d:"शीर्ष-रेटेड किसान। बेहद सक्रिय। लगातार गुणवत्ता।" },
      { tier:"🥈 सिल्वर", range:"60–79", cls:"bg-slate-50 border-slate-200", txt:"text-slate-700", d:"डिलीवरी के अच्छे ट्रैक रिकॉर्ड वाले विश्वसनीय किसान।" },
      { tier:"🥉 ब्रॉन्ज़", range:"40–59", cls:"bg-orange-50 border-orange-200", txt:"text-orange-700", d:"बढ़ती प्रतिष्ठा। कई ऑर्डर पूरे किए।" },
      { tier:"🌱 अनरैंक्ड", range:"0–39", cls:"bg-soil-50 border-soil-200", txt:"text-soil-700", d:"नया किसान। अभी कोई इतिहास नहीं — हर किसान यहीं से शुरू करता है।" },
    ],

    galleryLabel: "खेत से",
    galleryTitle: "भारत उगाता है दुनिया की सबसे अच्छी उपज",
    galleryDesc: "हरियाणा का बासमती। महाराष्ट्र के आम। केरल के मसाले। सब कुछ सीधे किसान से।",
    categories: ["अनाज और चावल", "ताज़ी सब्ज़ियाँ", "मौसमी फल", "डेयरी और अन्य"],

    forFarmersLabel: "किसानों के लिए",
    forFarmersTitle: "आपकी फसल। आपका दाम।",
    forFarmersTitle2: "आपकी प्रतिष्ठा।",
    forFarmersDesc: "बहुत समय से किसानों को वे लोग बताते आए हैं कि उनकी उपज की कीमत क्या है जिन्होंने कभी एक फसल नहीं उगाई। कृषिसेतु वह फैसला आपको वापस देता है।",
    farmerBenefits: [
      "मिनटों में उपज सूचीबद्ध करें, तुरंत लाइव हों",
      "अपना दाम खुद तय करें — कोई बदल नहीं सकता",
      "खरीदारों से सीधे बात करें, शर्तें तय करें",
      "मेरिट स्कोर बनाएं जो बार-बार व्यापार दिलाए",
      "शून्य कमीशन — सब कुछ आपका",
    ],
    joinFarmerBtn: "किसान के रूप में जुड़ें — मुफ्त",

    forBuyersLabel: "खरीदारों के लिए",
    forBuyersTitle: "खेत का दाम चुकाएं,",
    forBuyersTitle2: "दुकान का नहीं।",
    forBuyersDesc: "आप और किसान के बीच हर परत दाम बढ़ाती है। कृषिसेतु हर परत हटाता है। आप वही चुकाते हैं जो किसान को चाहिए।",
    buyerBenefits: [
      "खरीदने से पहले किसान का मेरिट स्कोर देखें",
      "दाम और मात्रा सीधे तय करें",
      "हर लिस्टिंग पर कटाई की तारीख दिखती है",
      "अनुभव रेट करें, किसान जवाबदेह रहें",
      "गृहिणी, रेस्तरां, छोटे विक्रेता — सबके लिए",
    ],

    ctaTitle1: "मंडी इंटरनेट से",
    ctaTitle2: "पहले बनी थी।",
    ctaTitle3: "हमने कुछ बेहतर बनाया।",
    ctaDesc: "आज ही कृषिसेतु से जुड़ें। किसान हैं तो 5 मिनट में पहली फसल सूचीबद्ध करें। खरीदार हैं तो अभी पास के किसान से ताज़ी उपज खोजें।",
    ctaFarmer: "मैं किसान हूँ — मुफ्त जुड़ें",
    ctaBuyer: "मैं खरीदार हूँ — देखें",

    footerDesc: "भारत के किसानों को सीधे खरीदारों से जोड़ना। कोई बिचौलिया नहीं। कोई मनमाना दाम नहीं। सिर्फ उचित व्यापार।",
    forFarmers: "किसानों के लिए",
    forBuyers: "खरीदारों के लिए",
    officialSources: "आधिकारिक स्रोत",
    footerLinks: { registerFree: "मुफ्त पंजीकरण", listProduce: "उपज सूचीबद्ध करें", register: "पंजीकरण", myOrders: "मेरे ऑर्डर" },
    footerCopy: "© 2026 कृषिसेतु · द्रोणाचार्य कॉलेज ऑफ इंजीनियरिंग, गुरुग्राम",
    footerAuthors: "सार्थक गोम्बर और जतिन भारद्वाज · B.Tech CSE",

    negotiable: "मोलभाव संभव ✓",
    liveChat: "लाइव चैट",
    farmerOnline: "किसान ऑनलाइन है",
    meritScore: "मेरिट स्कोर",
    ordersCompleted: "ऑर्डर पूरे",
    priceComparison: "दाम तुलना",
    retailStore: "रिटेल स्टोर",
    vegVendor: "सब्ज़ी वाला",
    heroListingDesc: "ताज़ा बासमती चावल, 50 किलो उपलब्ध",
    faoSource: "FAO डेटा विकिपीडिया के माध्यम से",
  },

  pa: {
    browse: "ਵੇਖੋ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    signOut: "ਸਾਈਨ ਆਉਟ",
    signIn: "ਸਾਈਨ ਇਨ",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",

    chooseLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    chooseLanguageSub: "ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸਭ ਤੋਂ ਆਰਾਮਦੇਹ ਹੋ। ਤੁਸੀਂ ਇਸਨੂੰ ਕਦੇ ਵੀ ਬਦਲ ਸਕਦੇ ਹੋ।",
    continueBtn: "ਜਾਰੀ ਰੱਖੋ",
    langEnLabel: "ਅੰਗਰੇਜ਼ੀ",
    langHiLabel: "ਹਿੰਦੀ",
    langPaLabel: "ਪੰਜਾਬੀ",

    tagline: "ਭਾਰਤ ਦੀ ਸਿੱਧੀ ਖੇਤੀ ਮੰਡੀ",
    heroTitle1: "ਕਿਸਾਨ",
    heroTitle2: "ਖੁਦ ਤੈਅ ਕਰਦਾ ਹੈ ਭਾਅ।",
    heroTitle3: "ਵਿਚੋਲਾ ਨਹੀਂ।",
    heroDesc: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ। ਅਸਲੀ ਲਿਸਟਿੰਗ ਵੇਖੋ, ਸਿੱਧੀ ਗੱਲਬਾਤ ਕਰੋ ਅਤੇ ਤਾਜ਼ਾ ਉਪਜ ਅਸਲ ਕੀਮਤ 'ਤੇ ਖਰੀਦੋ।",
    startSelling: "ਵੇਚਣਾ ਸ਼ੁਰੂ ਕਰੋ",
    browseProduce: "ਉਪਜ ਵੇਖੋ",
    verifiedFarmers: "ਤਸਦੀਕ ਕੀਤੇ ਕਿਸਾਨ",
    zeroCommission: "ਕਮਾਈ 'ਤੇ ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ",
    chatMsg1: "ਕੀ ₹35 ਹੋ ਸਕਦਾ ਹੈ?",
    chatMsg2: "₹36 'ਚ ਸੌਦਾ ✓",

    problemText: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਖਪਤਕਾਰਾਂ ਦੁਆਰਾ ਅਦਾ ਕੀਤੀ ਕੀਮਤ ਦਾ ਸਿਰਫ਼",
    problemText2: "ਮਿਲਦਾ ਹੈ — ਬਾਕੀ ਵਿਚੋਲਿਆਂ ਅਤੇ ਨੁਕਸਾਨ ਵਿੱਚ ਜਾਂਦਾ ਹੈ।",

    scaleLabel: "ਸਮੱਸਿਆ ਦਾ ਪੈਮਾਨਾ",
    statsTitle: "ਖੇਤੀਬਾੜੀ ਭਾਰਤ ਦੀ ਤਾਕਤ ਹੈ।",
    statsTitle2: "ਕਿਸਾਨ ਬਿਹਤਰ ਦੇ ਹੱਕਦਾਰ ਹਨ।",
    stat1: "ਭਾਰਤ ਦੀ ਆਬਾਦੀ ਖੇਤੀ 'ਤੇ ਨਿਰਭਰ",
    stat2: "GDP ਵਿੱਚ ਖੇਤੀ ਦਾ ਹਿੱਸਾ",
    stat3: "ਕਿਸਾਨਾਂ ਕੋਲ 2 ਹੈਕਟੇਅਰ ਤੋਂ ਘੱਟ ਜ਼ਮੀਨ",
    stat4: "ਕਿਸਾਨ PM-KISAN ਅਧੀਨ ਲਾਭਪਾਤਰੀ",
    statSource1Label: "42.3% ਆਬਾਦੀ ਰੋਜ਼ੀ-ਰੋਟੀ",
    statSource1Sub: "ਆਰਥਿਕ ਸਰਵੇ 2023-24 · PIB, ਭਾਰਤ ਸਰਕਾਰ",
    statSource2Label: "18% GDP ਯੋਗਦਾਨ",
    statSource2Sub: "ਖੇਤੀਬਾੜੀ ਅਤੇ ਕਿਸਾਨ ਭਲਾਈ ਮੰਤਰਾਲਾ · PIB",
    statSource3Label: "89.4% ਛੋਟੇ ਕਿਸਾਨ ਅੰਕੜਾ",
    statSource3Sub: "NSS 77ਵਾਂ ਗੇੜ · NSO, MoSPI · PIB, ਭਾਰਤ ਸਰਕਾਰ",

    howLabel: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    howTitle: "ਸਭ ਲਈ ਆਸਾਨ",
    howDesc: "ਚਾਹੇ ਤੁਸੀਂ ਉਗਾਉਂਦੇ ਹੋ ਜਾਂ ਖਾਂਦੇ ਹੋ, ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਲੈਣ-ਦੇਣ ਨੂੰ ਨਿਆਂਪੂਰਨ ਅਤੇ ਤੇਜ਼ ਬਣਾਉਂਦਾ ਹੈ।",
    iAmFarmer: "🌾 ਮੈਂ ਕਿਸਾਨ ਹਾਂ",
    iAmBuyer: "🛒 ਮੈਂ ਖਰੀਦਦਾਰ ਹਾਂ",
    farmerSteps: [
      { t: "ਮੁਫ਼ਤ ਰਜਿਸਟਰੇਸ਼ਨ", d: "2 ਮਿੰਟ ਵਿੱਚ ਆਪਣੀ ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ। ਖੇਤ ਦਾ ਨਾਮ, ਟਿਕਾਣਾ ਅਤੇ ਫਸਲ ਜੋੜੋ।" },
      { t: "ਉਪਜ ਸੂਚੀਬੱਧ ਕਰੋ", d: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ, ਆਪਣਾ ਭਾਅ ਤੈਅ ਕਰੋ, ਵਾਢੀ ਦੀ ਮਿਤੀ ਦੱਸੋ। ਤੁਰੰਤ ਲਾਈਵ ਹੋਵੋ।" },
      { t: "ਸਿੱਧੀ ਗੱਲਬਾਤ", d: "ਖਰੀਦਦਾਰ ਤੁਹਾਡੇ ਨਾਲ ਸਿੱਧੀ ਗੱਲ ਕਰਦੇ ਹਨ। ਕੋਈ ਨਿਲਾਮੀ ਨਹੀਂ। ਤੁਸੀਂ ਫੈਸਲਾ ਕਰੋ।" },
      { t: "ਨਾਮਣਾ ਬਣਾਓ", d: "ਹਰ ਆਰਡਰ ਤੁਹਾਨੂੰ ਮੈਰਿਟ ਸਕੋਰ ਦਿੰਦਾ ਹੈ। ਗੋਲਡ ਬੈਜ = ਵਧੇਰੇ ਭਰੋਸਾ = ਵਧੇਰੇ ਵਿਕਰੀ।" },
    ],
    buyerSteps: [
      { t: "ਤਾਜ਼ੀਆਂ ਲਿਸਟਿੰਗਾਂ ਵੇਖੋ", d: "ਇਸ ਹਫ਼ਤੇ ਵੱਢੀ ਉਪਜ ਵੇਖੋ — ਅਸਲੀ ਫੋਟੋਆਂ, ਅਸਲੀ ਭਾਅ, ਕਿਸਾਨ ਦੀ ਥਾਂ।" },
      { t: "ਮੈਰਿਟ ਸਕੋਰ ਜਾਂਚੋ", d: "ਹਰ ਕਿਸਾਨ ਦਾ ਭਰੋਸਾ ਸਕੋਰ ਦਿਖਦਾ ਹੈ — ਰੇਟਿੰਗ, ਲੈਣ-ਦੇਣ, ਜਵਾਬ ਦਾ ਸਮਾਂ।" },
      { t: "ਭਾਅ ਤੈਅ ਕਰੋ", d: "ਕਿਸਾਨ ਨਾਲ ਸਿੱਧੀ ਗੱਲ ਕਰੋ। ਤਾਜ਼ਗੀ, ਡਿਲੀਵਰੀ, ਮਾਤਰਾ ਪੁੱਛੋ। ਸਹੀ ਸੌਦਾ ਕਰੋ।" },
      { t: "ਭਰੋਸੇ ਨਾਲ ਆਰਡਰ ਕਰੋ", d: "ਆਰਡਰ ਦਿਓ। ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ। ਡਿਲੀਵਰੀ ਤੋਂ ਬਾਅਦ ਕਿਸਾਨ ਨੂੰ ਰੇਟ ਕਰੋ।" },
    ],
    registerFarmerBtn: "ਕਿਸਾਨ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ — ਮੁਫ਼ਤ",
    browseNowBtn: "ਹੁਣੇ ਉਪਜ ਵੇਖੋ",

    whyLabel: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਕਿਉਂ",
    whyTitle: "ਜੋ ਦੂਜੇ ਪਲੇਟਫਾਰਮ",
    whyTitle2: "ਨਹੀਂ ਦੇ ਸਕਦੇ",
    whyDesc: "ਅਸੀਂ ਭਾਰਤ ਦੀ ਹਰ ਖੇਤੀ ਮੰਡੀ ਦਾ ਅਧਿਐਨ ਕੀਤਾ। ਇੱਥੇ ਦੱਸਿਆ ਹੈ ਕਿ ਅਸੀਂ ਸੱਚਮੁੱਚ ਵੱਖਰੇ ਕਿਉਂ ਹਾਂ।",
    advantages: [
      { i:"💬", t:"ਰੀਅਲ-ਟਾਈਮ ਮੋਲਭਾਅ", d:"ਇੱਕੋ ਪਲੇਟਫਾਰਮ ਜਿੱਥੇ ਤੁਸੀਂ ਸਿੱਧੇ ਕਿਸਾਨ ਨਾਲ ਗੱਲ ਕਰਕੇ ਆਰਡਰ ਤੋਂ ਪਹਿਲਾਂ ਭਾਅ ਤੈਅ ਕਰਦੇ ਹੋ।", v:"ਦੂਜੇ ਫਿਕਸਡ ਕੀਮਤ ਜਾਂ ਬੋਲੀ ਨਿਲਾਮੀ ਵਰਤਦੇ ਹਨ" },
      { i:"🏅", t:"ਮੈਰਿਟ ਸਕੋਰ ਸਿਸਟਮ", d:"ਹਰ ਕਿਸਾਨ ਦਾ ਪਾਰਦਰਸ਼ੀ ਸਕੋਰ — ਰੇਟਿੰਗਾਂ, ਪੂਰੇ ਆਰਡਰ ਅਤੇ ਜਵਾਬ ਦੇ ਸਮੇਂ ਤੋਂ।", v:"ਦੂਜੇ ਬਿਨਾਂ ਫਾਰਮੂਲੇ ਦੇ ਸਿਤਾਰਾ ਰੇਟਿੰਗ ਦਿਖਾਉਂਦੇ ਹਨ" },
      { i:"🧑‍🌾", t:"ਛੋਟੇ ਕਿਸਾਨਾਂ ਲਈ ਬਣਿਆ", d:"89.4% ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਕੋਲ 2 ਹੈਕਟੇਅਰ ਤੋਂ ਘੱਟ ਜ਼ਮੀਨ ਹੈ। ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਉਨ੍ਹਾਂ ਲਈ ਬਣਿਆ ਹੈ।", v:"ਦੂਜੇ ਥੋਕ ਵਪਾਰੀਆਂ ਅਤੇ ਉਦਯੋਗਿਕ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਨਿਸ਼ਾਨਾ ਬਣਾਉਂਦੇ ਹਨ" },
      { i:"₹0", t:"ਕਿਸਾਨਾਂ 'ਤੇ ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ", d:"ਕਿਸਾਨ ਖਰੀਦਦਾਰਾਂ ਦੁਆਰਾ ਅਦਾ ਕੀਤੀ 100% ਰਕਮ ਰੱਖਦੇ ਹਨ। ਅਸੀਂ ਕੰਮ ਕਰਨ ਵਾਲੇ ਤੋਂ ਕੋਈ ਹਿੱਸਾ ਨਹੀਂ ਲੈਂਦੇ।", v:"ਦੂਜੇ ਕਿਸਾਨਾਂ ਤੋਂ ਲਿਸਟਿੰਗ ਫੀਸ ਜਾਂ ਲੈਣ-ਦੇਣ ਪ੍ਰਤੀਸ਼ਤ ਲੈਂਦੇ ਹਨ" },
      { i:"🥬", t:"ਖਪਤਕਾਰ-ਪਹਿਲੀ ਮੰਡੀ", d:"ਘਰੇਲੂ, ਰੈਸਟੋਰੈਂਟ, ਛੋਟੇ ਵਿਕਰੇਤਾ — ਕੋਈ ਵੀ ਖਰੀਦ ਸਕਦਾ ਹੈ। ਸਿਰਫ਼ ਥੋਕ ਖਰੀਦਦਾਰ ਨਹੀਂ।", v:"Agrimp ਅਤੇ KisanMandi ਸਿਰਫ਼ B2B ਉਦਯੋਗਿਕ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਨਿਸ਼ਾਨਾ ਬਣਾਉਂਦੇ ਹਨ" },
      { i:"📍", t:"ਭਾਰਤ-ਪਹਿਲਾ ਡਿਜ਼ਾਈਨ", d:"ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਲਈ ਬਣਿਆ। ਹਰ ਸੁਵਿਧਾ ਭਾਰਤ ਵਿੱਚ ਖਰੀਦ-ਵੇਚ ਦੇ ਤਰੀਕੇ ਅਨੁਸਾਰ — ਜਿਵੇਂ ਮੋਲਭਾਅ।", v:"ਵਿਸ਼ਵ ਪਲੇਟਫਾਰਮ ਭਾਰਤੀ ਬਾਜ਼ਾਰ ਦੇ ਸੰਦਰਭ ਨੂੰ ਨਹੀਂ ਸਮਝਦੇ" },
    ],

    compLabel: "ਇਮਾਨਦਾਰ ਤੁਲਨਾ",
    compTitle: "ਅਸੀਂ ਕਿਵੇਂ ਤੁਲਨਾ ਕਰਦੇ ਹਾਂ",
    compFeature: "ਸੁਵਿਧਾ",
    compBasic: "ਬੁਨਿਆਦੀ",
    compPartial: "ਅੰਸ਼ਿਕ",
    compRows: [
      "ਰੀਅਲ-ਟਾਈਮ ਚੈਟ ਮੋਲਭਾਅ",
      "ਮੈਰਿਟ/ਭਰੋਸਾ ਸਕੋਰ ਸਿਸਟਮ",
      "ਖਪਤਕਾਰ ਖਰੀਦਦਾਰ (ਸਿਰਫ਼ B2B ਨਹੀਂ)",
      "ਕਿਸਾਨਾਂ ਲਈ ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ",
      "ਭਾਰਤ-ਕੇਂਦਰਿਤ",
      "ਕੋਈ ਵੀ ਫਸਲ ਕਿਸਮ (ਸਿਰਫ਼ ਜੈਵਿਕ ਨਹੀਂ)",
      "ਵਾਢੀ ਦੀ ਮਿਤੀ ਦ੍ਰਿਸ਼ਤਾ",
      "ਮੋਬਾਈਲ-ਫ੍ਰੈਂਡਲੀ ਲਿਸਟਿੰਗ",
    ],

    meritLabel: "ਭਰੋਸਾ, ਪਾਰਦਰਸ਼ੀ ਤਰੀਕੇ ਨਾਲ",
    meritTitle: "ਮੈਰਿਟ ਸਕੋਰ —",
    meritTitle2: "ਅੰਨ੍ਹੇ ਭਰੋਸੇ ਦਾ ਸਾਡਾ ਜਵਾਬ",
    meritDesc: "ਦੂਜੇ ਪਲੇਟਫਾਰਮ ਬਿਨਾਂ ਕਾਰਨ ਭਰੋਸਾ ਕਰਨ ਲਈ ਕਹਿੰਦੇ ਹਨ। ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਉਹ ਭਰੋਸਾ ਕਿਵੇਂ ਕਮਾਇਆ ਗਿਆ।",
    meritFactors: [
      { i:"⭐", l:"ਔਸਤ ਰੇਟਿੰਗ", pct:40, d:"ਖਰੀਦਦਾਰ ਹਰ ਆਰਡਰ ਤੋਂ ਬਾਅਦ ਕਿਸਾਨ ਨੂੰ ਰੇਟ ਕਰਦੇ ਹਨ। 1–5 ਸਿਤਾਰੇ।" },
      { i:"📦", l:"ਲੈਣ-ਦੇਣ ਸਕੋਰ", pct:35, d:"ਵਧੇਰੇ ਪੂਰੇ ਆਰਡਰ = ਵਧੇਰੇ ਭਰੋਸਾ। ਸਾਬਿਤ ਟਰੈਕ ਰਿਕਾਰਡ।" },
      { i:"⚡", l:"ਜਵਾਬ ਦਾ ਸਮਾਂ", pct:25, d:"1 ਘੰਟੇ ਵਿੱਚ ਜਵਾਬ ਦੇਣ ਵਾਲੇ ਕਿਸਾਨਾਂ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਅੰਕ।" },
    ],
    meritPoints: "ਅੰਕ",
    meritBadges: [
      { tier:"🥇 ਗੋਲਡ", range:"80–100", cls:"bg-amber-50 border-amber-200", txt:"text-amber-800", d:"ਚੋਟੀ ਦੇ ਕਿਸਾਨ। ਬਹੁਤ ਸਰਗਰਮ। ਲਗਾਤਾਰ ਗੁਣਵੱਤਾ।" },
      { tier:"🥈 ਸਿਲਵਰ", range:"60–79", cls:"bg-slate-50 border-slate-200", txt:"text-slate-700", d:"ਡਿਲੀਵਰੀ ਦੇ ਚੰਗੇ ਰਿਕਾਰਡ ਵਾਲੇ ਭਰੋਸੇਯੋਗ ਕਿਸਾਨ।" },
      { tier:"🥉 ਬ੍ਰੌਂਜ਼", range:"40–59", cls:"bg-orange-50 border-orange-200", txt:"text-orange-700", d:"ਵਧਦੀ ਸਾਖ। ਕਈ ਆਰਡਰ ਪੂਰੇ ਕੀਤੇ।" },
      { tier:"🌱 ਅਨਰੈਂਕਡ", range:"0–39", cls:"bg-soil-50 border-soil-200", txt:"text-soil-700", d:"ਨਵਾਂ ਕਿਸਾਨ। ਅਜੇ ਕੋਈ ਇਤਿਹਾਸ ਨਹੀਂ — ਹਰ ਕਿਸਾਨ ਇੱਥੋਂ ਸ਼ੁਰੂ ਕਰਦਾ ਹੈ।" },
    ],

    galleryLabel: "ਖੇਤ ਤੋਂ",
    galleryTitle: "ਭਾਰਤ ਦੁਨੀਆ ਦੀ ਸਭ ਤੋਂ ਵਧੀਆ ਉਪਜ ਉਗਾਉਂਦਾ ਹੈ",
    galleryDesc: "ਹਰਿਆਣੇ ਦਾ ਬਾਸਮਤੀ। ਮਹਾਰਾਸ਼ਟਰ ਦੇ ਅੰਬ। ਕੇਰਲਾ ਦੇ ਮਸਾਲੇ। ਸਭ ਕੁਝ ਸਿੱਧਾ ਕਿਸਾਨ ਤੋਂ।",
    categories: ["ਅਨਾਜ ਅਤੇ ਚੌਲ", "ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ", "ਮੌਸਮੀ ਫਲ", "ਡੇਅਰੀ ਅਤੇ ਹੋਰ"],

    forFarmersLabel: "ਕਿਸਾਨਾਂ ਲਈ",
    forFarmersTitle: "ਤੁਹਾਡੀ ਫਸਲ। ਤੁਹਾਡਾ ਭਾਅ।",
    forFarmersTitle2: "ਤੁਹਾਡੀ ਸਾਖ।",
    forFarmersDesc: "ਬਹੁਤ ਸਮੇਂ ਤੋਂ ਕਿਸਾਨਾਂ ਨੂੰ ਉਹ ਲੋਕ ਦੱਸਦੇ ਰਹੇ ਹਨ ਕਿ ਉਨ੍ਹਾਂ ਦੀ ਉਪਜ ਦੀ ਕੀਮਤ ਕੀ ਹੈ ਜਿਨ੍ਹਾਂ ਨੇ ਕਦੇ ਇੱਕ ਫਸਲ ਨਹੀਂ ਉਗਾਈ। ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਉਹ ਫੈਸਲਾ ਤੁਹਾਨੂੰ ਵਾਪਸ ਦਿੰਦਾ ਹੈ।",
    farmerBenefits: [
      "ਮਿੰਟਾਂ ਵਿੱਚ ਉਪਜ ਸੂਚੀਬੱਧ ਕਰੋ, ਤੁਰੰਤ ਲਾਈਵ ਹੋਵੋ",
      "ਆਪਣਾ ਭਾਅ ਖੁਦ ਤੈਅ ਕਰੋ — ਕੋਈ ਬਦਲ ਨਹੀਂ ਸਕਦਾ",
      "ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧੀ ਗੱਲ ਕਰੋ",
      "ਮੈਰਿਟ ਸਕੋਰ ਬਣਾਓ ਜੋ ਵਾਰ-ਵਾਰ ਵਪਾਰ ਦਿਵਾਏ",
      "ਜ਼ੀਰੋ ਕਮਿਸ਼ਨ — ਸਭ ਕੁਝ ਤੁਹਾਡਾ",
    ],
    joinFarmerBtn: "ਕਿਸਾਨ ਵਜੋਂ ਜੁੜੋ — ਮੁਫ਼ਤ",

    forBuyersLabel: "ਖਰੀਦਦਾਰਾਂ ਲਈ",
    forBuyersTitle: "ਖੇਤ ਦਾ ਭਾਅ ਦਿਓ,",
    forBuyersTitle2: "ਦੁਕਾਨ ਦਾ ਨਹੀਂ।",
    forBuyersDesc: "ਤੁਹਾਡੇ ਅਤੇ ਕਿਸਾਨ ਵਿਚਕਾਰ ਹਰ ਪਰਤ ਭਾਅ ਵਧਾਉਂਦੀ ਹੈ। ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਹਰ ਪਰਤ ਹਟਾਉਂਦਾ ਹੈ।",
    buyerBenefits: [
      "ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਕਿਸਾਨ ਦਾ ਮੈਰਿਟ ਸਕੋਰ ਵੇਖੋ",
      "ਭਾਅ ਅਤੇ ਮਾਤਰਾ ਸਿੱਧੀ ਤੈਅ ਕਰੋ",
      "ਹਰ ਲਿਸਟਿੰਗ 'ਤੇ ਵਾਢੀ ਦੀ ਮਿਤੀ ਦਿਖਦੀ ਹੈ",
      "ਅਨੁਭਵ ਰੇਟ ਕਰੋ, ਕਿਸਾਨ ਜਵਾਬਦੇਹ ਰਹੇ",
      "ਘਰੇਲੂ, ਰੈਸਟੋਰੈਂਟ, ਛੋਟੇ ਵਪਾਰੀ — ਸਭ ਲਈ",
    ],

    ctaTitle1: "ਮੰਡੀ ਇੰਟਰਨੈੱਟ ਤੋਂ",
    ctaTitle2: "ਪਹਿਲਾਂ ਬਣੀ ਸੀ।",
    ctaTitle3: "ਅਸੀਂ ਕੁਝ ਬਿਹਤਰ ਬਣਾਇਆ।",
    ctaDesc: "ਅੱਜ ਹੀ ਕ੍ਰਿਸ਼ੀਸੇਤੂ ਨਾਲ ਜੁੜੋ। ਕਿਸਾਨ ਹੋ ਤਾਂ 5 ਮਿੰਟ ਵਿੱਚ ਪਹਿਲੀ ਫਸਲ ਸੂਚੀਬੱਧ ਕਰੋ। ਖਰੀਦਦਾਰ ਹੋ ਤਾਂ ਹੁਣੇ ਨੇੜੇ ਦੇ ਕਿਸਾਨ ਤੋਂ ਤਾਜ਼ੀ ਉਪਜ ਲੱਭੋ।",
    ctaFarmer: "ਮੈਂ ਕਿਸਾਨ ਹਾਂ — ਮੁਫ਼ਤ ਜੁੜੋ",
    ctaBuyer: "ਮੈਂ ਖਰੀਦਦਾਰ ਹਾਂ — ਵੇਖੋ",

    footerDesc: "ਭਾਰਤ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜਨਾ। ਕੋਈ ਵਿਚੋਲਾ ਨਹੀਂ। ਕੋਈ ਵਧਾਇਆ ਭਾਅ ਨਹੀਂ। ਸਿਰਫ਼ ਨਿਆਂਪੂਰਨ ਵਪਾਰ।",
    forFarmers: "ਕਿਸਾਨਾਂ ਲਈ",
    forBuyers: "ਖਰੀਦਦਾਰਾਂ ਲਈ",
    officialSources: "ਅਧਿਕਾਰਤ ਸਰੋਤ",
    footerLinks: { registerFree: "ਮੁਫ਼ਤ ਰਜਿਸਟਰ ਕਰੋ", listProduce: "ਉਪਜ ਸੂਚੀਬੱਧ ਕਰੋ", register: "ਰਜਿਸਟਰ", myOrders: "ਮੇਰੇ ਆਰਡਰ" },
    footerCopy: "© 2026 ਕ੍ਰਿਸ਼ੀਸੇਤੂ · ਦ੍ਰੋਣਾਚਾਰਿਆ ਕਾਲਜ ਆਫ਼ ਇੰਜੀਨੀਅਰਿੰਗ, ਗੁਰੂਗ੍ਰਾਮ",
    footerAuthors: "ਸਾਰਥਕ ਗੋਂਬਰ ਅਤੇ ਜਤਿਨ ਭਾਰਦਵਾਜ · B.Tech CSE",

    negotiable: "ਮੋਲਭਾਅ ਸੰਭਵ ✓",
    liveChat: "ਲਾਈਵ ਚੈਟ",
    farmerOnline: "ਕਿਸਾਨ ਔਨਲਾਈਨ ਹੈ",
    meritScore: "ਮੈਰਿਟ ਸਕੋਰ",
    ordersCompleted: "ਆਰਡਰ ਪੂਰੇ",
    priceComparison: "ਭਾਅ ਤੁਲਨਾ",
    retailStore: "ਰਿਟੇਲ ਸਟੋਰ",
    vegVendor: "ਸਬਜ਼ੀ ਵਾਲਾ",
    heroListingDesc: "ਤਾਜ਼ਾ ਬਾਸਮਤੀ ਚੌਲ, 50 ਕਿਲੋ ਉਪਲਬਧ",
    faoSource: "FAO ਡੇਟਾ ਵਿਕੀਪੀਡੀਆ ਰਾਹੀਂ",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ks_lang");
    if (saved && translations[saved]) {
      setLangState(saved);
    } else {
      setShowModal(true);
    }
  }, []);

  function setLang(l) {
    setLangState(l);
    setShowModal(false);
    localStorage.setItem("ks_lang", l);
  }

  const t = translations[lang] || translations["en"];

  return (
    <LanguageContext.Provider value={{ lang: lang || "en", setLang, t, showModal, setShowModal }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}