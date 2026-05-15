// Uzbekistan city content — research-based, written for travelers.
// All prices are 2026 estimates in USD (with rough UZS conversion); train
// schedules and hours come from Uzbekistan Railways and major attraction
// sites. If anything looks stale, treat this file as the source of truth
// and update here — every page imports from it.

import type { City } from "@/content/types";
import { IMG } from "@/content/images";

// ─────────────────────────────────────────────────────────────────
// Samarkand
// ─────────────────────────────────────────────────────────────────
const samarkand: City = {
  slug: "samarkand",
  name: "Samarkand",
  tagline: "The crossroads of cultures",
  overview:
    "Samarkand is the city poets have written about for a thousand years. Once Timur's capital, it sits where the old Silk Road braided itself into a single thread — and where Persian, Turkic, Indian and Chinese craft traditions fused into the breathtaking blue-tiled architecture you can still walk through today. The Registan square at dusk, with three madrasas catching the last sunlight on their majolica, is the image most travelers carry home. But Samarkand is also a working city of 550,000 people, with bazaars, sleeper trains, and bakeries that have been turning out the same round non bread for fifteen generations.",
  heroImage:
    IMG.samarkand_hero,
  cardImage:
    IMG.samarkand_card,
  coords: [66.9597, 39.6542],
  recommendedDays: "2 – 3 days",
  bestTime: "April – early June · September – October",
  dailyBudget: "$45 – $110",
  attractions: [
    {
      slug: "registan",
      name: "Registan Square",
      description:
        "The single most famous sight in Central Asia: three monumental madrasas (Ulugh Beg, 1420; Sher-Dor, 1636; Tilya-Kori, 1660) facing each other across a plaza that once held bazaars and public proclamations. Come at opening for the cleanest light on the majolica; come again after dark for the evening floodlight show. Climb the minaret of the Ulugh Beg madrasa (separate small fee, ask the guard) for the rooftop view of the whole ensemble.",
      image:
        IMG.registan,
      hours: "Daily 8am – 7pm (until 8pm Apr – Sep)",
      fee: { usd: "$5", local: "≈ 65,000 UZS" },
      durationMin: 120,
      coords: [66.9758, 39.6547],
      category: "Madrasa",
    },
    {
      slug: "gur-e-amir",
      name: "Gur-e-Amir Mausoleum",
      description:
        "Timur's tomb. Under a single ribbed turquoise dome lies one of history's most consequential conquerors, his sons, and his grandson Ulugh Beg the astronomer. The interior is smaller than you expect — the brilliance is the gold-leafed muqarnas vault above the cenotaphs. Soviet anthropologists opened the tomb in 1941 and confirmed Timur really did have a limp.",
      image:
        IMG.gur_e_amir,
      hours: "Daily 9am – 7pm",
      fee: { usd: "$3", local: "≈ 38,000 UZS" },
      durationMin: 45,
      coords: [66.9690, 39.6485],
      category: "Mausoleum",
    },
    {
      slug: "shah-i-zinda",
      name: "Shah-i-Zinda Necropolis",
      description:
        "A narrow processional alley lined with 14th–15th century mausoleums, each a different essay in turquoise and cobalt tilework. Many believe a cousin of the Prophet Muhammad is buried at the top of the steps, which makes this a working pilgrimage site as well as a museum. Visit in the morning before tour buses; the light angles perfectly into the niches.",
      image:
        IMG.shah_i_zinda,
      hours: "Daily 7am – 8pm",
      fee: { usd: "$3", local: "≈ 38,000 UZS" },
      durationMin: 75,
      coords: [66.9885, 39.6660],
      category: "Mausoleum",
    },
    {
      slug: "bibi-khanym",
      name: "Bibi-Khanym Mosque",
      description:
        "When Timur came back from sacking Delhi in 1399, he built the largest mosque in the Islamic world to celebrate. It collapsed within a few decades — the engineering was ahead of its time — and the building you see today is largely a sympathetic Soviet reconstruction. The colossal scale (130-foot entrance arch, three domes) still works. The marble Qur'an stand in the central courtyard is the original.",
      image:
        IMG.bibi_khanym,
      hours: "Daily 8am – 7pm",
      fee: { usd: "$3", local: "≈ 38,000 UZS" },
      durationMin: 40,
      coords: [66.9799, 39.6630],
      category: "Mosque",
    },
    {
      slug: "ulugh-beg-observatory",
      name: "Ulugh Beg Observatory",
      description:
        "On a hill north of town, the foundation of what was, in the 1420s, the most accurate astronomical observatory in the world. Ulugh Beg — Timur's grandson — used a 40-meter sextant carved into the bedrock here to measure the year's length to within a minute of the modern value. A small museum tells the story.",
      image:
        IMG.ulugh_beg_obs,
      hours: "Daily 9am – 6pm",
      fee: { usd: "$2", local: "≈ 25,000 UZS" },
      durationMin: 45,
      coords: [67.0050, 39.6750],
      category: "Museum",
    },
    {
      slug: "siab-bazaar",
      name: "Siab Bazaar",
      description:
        "Samarkand's working farmers' market, just behind Bibi-Khanym. Come hungry — sample the famous Samarkand non bread (allegedly only bakable with local water), heaps of dried apricots and almonds, and the freshest sumac you'll ever buy. Best between 9am and noon, closed Mondays.",
      image:
        IMG.siab_bazaar,
      hours: "Tue – Sun 7am – 6pm",
      fee: { usd: "Free" },
      durationMin: 60,
      coords: [66.9830, 39.6645],
      category: "Bazaar",
    },
  ],
  hotels: [
    {
      name: "Bahodir B&B",
      tier: "Budget",
      priceFrom: 22,
      priceTo: 38,
      note: "Family-run guesthouse a 10-minute walk from Registan; courtyard breakfasts under a grapevine, simple rooms, the most cardamom in your tea you've ever experienced.",
    },
    {
      name: "Jahongir Guesthouse",
      tier: "Budget",
      priceFrom: 25,
      priceTo: 40,
      note: "Long-standing backpacker favorite near Gur-e-Amir, English-speaking owner, can arrange shared taxis to Bukhara.",
    },
    {
      name: "Hotel Malika Classic",
      tier: "Mid-range",
      priceFrom: 60,
      priceTo: 95,
      note: "Mid-century stone facade, modernized rooms, central location between the bazaar and Registan. Reliable wifi, breakfast included.",
    },
    {
      name: "Grand Samarkand Superior",
      tier: "Mid-range",
      priceFrom: 75,
      priceTo: 115,
      note: "Newer build with a small rooftop terrace facing the old town. Half the rooms get the dome view — request when booking.",
    },
    {
      name: "Hotel Bibikhanum",
      tier: "Luxury",
      priceFrom: 140,
      priceTo: 200,
      note: "Boutique 24-room hotel directly behind Bibi-Khanym mosque. The terrace lounge with mosque view at sunset is the best free perk in town.",
    },
    {
      name: "Silk Road by Minyoun",
      tier: "Luxury",
      priceFrom: 195,
      priceTo: 320,
      note: "Five-star in the new Silk Road Samarkand resort district. Spa, pool, full-service concierge. Twenty minutes by taxi from the historic center.",
    },
  ],
  food: [
    {
      dish: "Plov (osh)",
      description:
        "The national dish: rice slow-cooked with mutton, carrots, onions, chickpeas, and quince in a wide cast-iron kazan. Each region has a variant; the Samarkand version is layered (rice on top, meat at the bottom) and served plain on a platter.",
      whereToTry: "Karimbek, Gagarin St — locals' favorite",
    },
    {
      dish: "Shashlik",
      description:
        "Lamb skewers grilled over saxaul wood, served with raw onions, sumac, and a stack of fresh non bread. The cheapest food you can buy and frequently the best meal of your trip.",
      whereToTry: "The Old City Restaurant near Registan",
    },
    {
      dish: "Samsa",
      description:
        "Triangular pastries baked in a tandyr oven, stuffed with minced lamb, onion, and a little black cumin. Best eaten hot, standing up, from a bakery window.",
      whereToTry: "Any tandyr stall along Tashkent Yo'li",
    },
    {
      dish: "Halva and dried apricots",
      description:
        "Walk through Siab Bazaar in the late morning and you'll be offered a dozen kinds of halva (sesame, walnut, pistachio) and apricots dried whole on the branch. Bring small bills.",
      whereToTry: "Siab Bazaar",
    },
  ],
  gettingThere: [
    {
      from: "Tashkent",
      train: { hours: "2h 10m on Afrosiyob high-speed", priceUsd: "$15 – $30" },
      flight: { hours: "1h", priceUsd: "$40 – $70" },
    },
    {
      from: "Almaty (Kazakhstan)",
      flight: { hours: "1h 20m direct to Tashkent + train", priceUsd: "$120 – $180" },
      train: { hours: "21h via Tashkent (Almaty-2 → Tashkent overnight, then Afrosiyob)", priceUsd: "$45 – $70" },
    },
    {
      from: "Bukhara",
      train: { hours: "1h 25m on Afrosiyob", priceUsd: "$15 – $25" },
    },
  ],
  gettingAround: "Walking covers most of the historic center — Registan, Bibi-Khanym, Siab, and Shah-i-Zinda are within 25 minutes of each other on foot. For Gur-e-Amir and the Observatory, Yandex Go (the local app) gets you a taxi in under five minutes for $1.50 – $3. Buses are functional but signage is in Uzbek Cyrillic only.",
  weather: [
    { month: "Jan", highC: 6, lowC: -4, rating: 2, note: "Crisp, often clear; rooftops sometimes have frost." },
    { month: "Feb", highC: 9, lowC: -2, rating: 2 },
    { month: "Mar", highC: 16, lowC: 4, rating: 4, note: "Almond trees blossom; landscape briefly green." },
    { month: "Apr", highC: 22, lowC: 9, rating: 5, note: "Prime month — perfect weather, no crowds yet." },
    { month: "May", highC: 28, lowC: 13, rating: 5 },
    { month: "Jun", highC: 34, lowC: 18, rating: 3, note: "Hot but dry, manageable with a hat." },
    { month: "Jul", highC: 37, lowC: 21, rating: 2, note: "Avoid — midday becomes brutal." },
    { month: "Aug", highC: 36, lowC: 20, rating: 2 },
    { month: "Sep", highC: 30, lowC: 14, rating: 5, note: "Second peak; harvest season at the bazaars." },
    { month: "Oct", highC: 22, lowC: 8, rating: 5 },
    { month: "Nov", highC: 14, lowC: 3, rating: 3 },
    { month: "Dec", highC: 8, lowC: -2, rating: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Bukhara
// ─────────────────────────────────────────────────────────────────
const bukhara: City = {
  slug: "bukhara",
  name: "Bukhara",
  tagline: "A living medieval city",
  overview:
    "Bukhara feels older and more intimate than Samarkand — its monuments don't tower, they hum at human scale. The historic center is a UNESCO-listed maze of trading domes, courtyard madrasas, and quiet caravanserais where bookbinders and silk-weavers still work the same trades they did 500 years ago. Wander between the Ark fortress and the Lyab-i-Hauz pond at sunset, listen to the call to prayer roll off the Kalyan minaret, and you'll understand why locals say the city has had more than 2,500 years to perfect itself.",
  heroImage:
    IMG.bukhara_hero,
  cardImage:
    IMG.bukhara_card,
  coords: [64.4286, 39.7681],
  recommendedDays: "2 days",
  bestTime: "March – May · October – November",
  dailyBudget: "$40 – $95",
  attractions: [
    {
      slug: "ark-of-bukhara",
      name: "Ark of Bukhara",
      description:
        "A massive earthen-walled fortress that served as the emir's residence from the 5th century until the Soviet invasion of 1920. Inside: the coronation courtyard, the throne hall, a former mosque, and museum displays on Bukharan history. Climb the ramparts for the best free view of Po-i-Kalyan.",
      image:
        IMG.ark_bukhara,
      hours: "Daily 9am – 6pm",
      fee: { usd: "$4", local: "≈ 50,000 UZS" },
      durationMin: 90,
      coords: [64.4143, 39.7762],
      category: "Monument",
    },
    {
      slug: "kalyan-minaret",
      name: "Po-i-Kalyan & Kalyan Minaret",
      description:
        "The 'Tower of Death' — so named because Bukharan emirs once threw criminals from the top — is also the building Genghis Khan, awed, refused to destroy. The 47-meter brick minaret (1127) is the visual anchor of Bukhara. Around it: the Kalyan Mosque (closed to non-Muslims during prayers) and the Mir-i-Arab madrasa (closed to all but working students; admire the tilework from outside).",
      image:
        IMG.po_i_kalyan,
      hours: "Mosque & madrasa: dawn – 8pm (no entry during prayers)",
      fee: { usd: "$3" },
      durationMin: 60,
      coords: [64.4153, 39.7758],
      category: "Mosque",
    },
    {
      slug: "lyab-i-hauz",
      name: "Lyab-i-Hauz",
      description:
        "A 17th-century reservoir framed by ancient mulberry trees and three monumental buildings (Nodir Devon Begi madrasa, Kukeldash madrasa, Nodir Devon Begi khanaka). The square is now Bukhara's living room — tea houses, evening performances, families with melted ice cream. Sit at one of the chaikhanas, order green tea, stay an hour.",
      image:
        IMG.lyab_i_hauz,
      hours: "Always open",
      fee: { usd: "Free" },
      durationMin: 60,
      coords: [64.4214, 39.7745],
      category: "Square",
    },
    {
      slug: "samanid-mausoleum",
      name: "Samanid Mausoleum",
      description:
        "The oldest standing Islamic monument in Central Asia (892 AD). A small brick cube of astonishing geometric inventiveness — every face uses a different bond pattern, and the play of shadow shifts hour by hour. The Mongols spared it because it had been buried under sand for centuries.",
      image:
        IMG.samanid,
      hours: "Daily 9am – 6pm",
      fee: { usd: "$2" },
      durationMin: 30,
      coords: [64.4061, 39.7762],
      category: "Mausoleum",
    },
    {
      slug: "chor-minor",
      name: "Chor Minor",
      description:
        "Four small turquoise-domed towers built in 1807 as a madrasa gatehouse; the rest of the school is gone. Tucked into a residential neighborhood — the walk through narrow lanes to find it is half the charm.",
      image:
        IMG.chor_minor,
      hours: "Daily 9am – 7pm",
      fee: { usd: "$1", local: "≈ 12,000 UZS" },
      durationMin: 20,
      coords: [64.4308, 39.7745],
      category: "Madrasa",
    },
    {
      slug: "trading-domes",
      name: "Trading Domes",
      description:
        "Three vaulted 16th-century market halls — Toki-Zargaron (jewelers), Toki-Sarrofon (moneychangers), Toki-Telpak Furushon (hatmakers) — still in use. Silk scarves, hand-knotted carpets, copper jugs, and the famous Bukharan suzani embroidery. Bargaining is expected but gentle; expect to pay 60-80% of opening prices.",
      image:
        IMG.trading_domes,
      hours: "Daily 9am – 7pm",
      fee: { usd: "Free" },
      durationMin: 60,
      coords: [64.4180, 39.7748],
      category: "Bazaar",
    },
  ],
  hotels: [
    {
      name: "Lyabi-House Hotel",
      tier: "Budget",
      priceFrom: 25,
      priceTo: 42,
      note: "Right on Lyab-i-Hauz square, sister property to nicer Komil. Small rooms, but the location is unbeatable.",
    },
    {
      name: "Mehtar Anbar B&B",
      tier: "Budget",
      priceFrom: 28,
      priceTo: 45,
      note: "Restored merchant's house with a quiet inner courtyard; breakfast on the terrace.",
    },
    {
      name: "Hotel Asia Bukhara",
      tier: "Mid-range",
      priceFrom: 60,
      priceTo: 95,
      note: "Reliable mid-range option a 5-minute walk from Lyab-i-Hauz; pool in summer, good buffet breakfast.",
    },
    {
      name: "Mercure Bukhara Old Town",
      tier: "Mid-range",
      priceFrom: 80,
      priceTo: 130,
      note: "International chain comfort with a sympathetically traditional design. Bar on the top floor.",
    },
    {
      name: "Hotel Boutique Minzifa",
      tier: "Luxury",
      priceFrom: 130,
      priceTo: 200,
      note: "Sixteen rooms in a 19th-century merchant house, decorated with hand-carved Bukharan ganch plasterwork. The signature restaurant is one of the city's best.",
    },
    {
      name: "Komil Boutique Hotel",
      tier: "Luxury",
      priceFrom: 110,
      priceTo: 175,
      note: "Family-owned 15-room boutique in a restored mansion. Courtyard breakfasts, a private hammam, and the owner can arrange a craftsman tour.",
    },
  ],
  food: [
    {
      dish: "Bukharan plov",
      description:
        "Drier than the Tashkent style, often topped with shredded yellow turnip and golden raisins. Locals eat it for lunch — by 2pm the kazan is empty.",
      whereToTry: "Old Bukhara restaurant, near Trading Domes",
    },
    {
      dish: "Manty",
      description:
        "Large steamed dumplings filled with lamb, onion, and a knob of fat that melts as they steam. Served with sour cream and dill.",
      whereToTry: "Chashma Ayub Café",
    },
    {
      dish: "Tandyr samsa",
      description:
        "Bukharan samsas are bigger and rougher than Samarkand's — stuffed with chunky lamb and the unmistakable smoke of the wood-fired oven.",
      whereToTry: "Stalls behind the Trading Domes from 9am",
    },
    {
      dish: "Lagman",
      description:
        "Hand-pulled noodle soup with stewed lamb, peppers, and tomato. Comes either as a soup or fried; both are excellent.",
      whereToTry: "Minzifa Restaurant",
    },
  ],
  gettingThere: [
    {
      from: "Tashkent",
      train: { hours: "3h 20m on Afrosiyob", priceUsd: "$25 – $45" },
      flight: { hours: "1h 10m", priceUsd: "$50 – $90" },
    },
    {
      from: "Samarkand",
      train: { hours: "1h 25m on Afrosiyob", priceUsd: "$15 – $25" },
    },
    {
      from: "Almaty (Kazakhstan)",
      flight: { hours: "1h 20m to Tashkent + train", priceUsd: "$140 – $200 total" },
    },
  ],
  gettingAround: "The historic core is compact — under a kilometer across — and you'll cover it on foot. Mornings are best for the trading domes; evenings for Lyab-i-Hauz. Yandex Go works inside the city for $1.50 fares; bicycles can be rented from Lyabi-House for $5/day.",
  weather: [
    { month: "Jan", highC: 8, lowC: -3, rating: 2 },
    { month: "Feb", highC: 11, lowC: -1, rating: 2 },
    { month: "Mar", highC: 18, lowC: 5, rating: 4 },
    { month: "Apr", highC: 25, lowC: 11, rating: 5, note: "Ideal — warm days, cool evenings." },
    { month: "May", highC: 31, lowC: 16, rating: 4 },
    { month: "Jun", highC: 37, lowC: 21, rating: 2, note: "Heat starts in earnest." },
    { month: "Jul", highC: 40, lowC: 23, rating: 1, note: "Best avoided." },
    { month: "Aug", highC: 39, lowC: 21, rating: 1 },
    { month: "Sep", highC: 33, lowC: 15, rating: 4 },
    { month: "Oct", highC: 24, lowC: 8, rating: 5, note: "Second prime — soft light, harvest at the markets." },
    { month: "Nov", highC: 15, lowC: 3, rating: 4 },
    { month: "Dec", highC: 9, lowC: -2, rating: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Khiva
// ─────────────────────────────────────────────────────────────────
const khiva: City = {
  slug: "khiva",
  name: "Khiva",
  tagline: "A desert mirage made stone",
  overview:
    "Khiva is the rarest kind of city: a complete walled medieval town you can walk across in twenty minutes. Inside the Itchan Kala — the inner fortress, UNESCO-listed since 1990 — the turquoise drum of the Kalta Minor minaret rises against pale clay walls, and the streets are quiet enough that you'll hear a single craftsman tapping copper from a courtyard away. The Khanate of Khiva was the last of the Silk Road slave-trading cities; Soviet preservation froze its architecture so well that walking these alleys feels closer to time travel than tourism.",
  heroImage:
    IMG.khiva_hero,
  cardImage:
    IMG.khiva_card,
  coords: [60.3633, 41.3784],
  recommendedDays: "1 – 2 days",
  bestTime: "April – May · September – October",
  dailyBudget: "$35 – $85",
  attractions: [
    {
      slug: "itchan-kala",
      name: "Itchan Kala",
      description:
        "The walled inner city — 2,200 meters of crenellated mud-brick wall enclosing 51 monuments and 250 houses. A single ticket covers most of the museums inside; buy it at the West Gate. The wall itself is climbable in two places for sunset views west toward the Karakum desert.",
      image:
        IMG.itchan_kala,
      hours: "Always accessible · museums 9am – 6pm",
      fee: { usd: "$8 combined ticket", local: "≈ 100,000 UZS" },
      durationMin: 240,
      coords: [60.3636, 41.3786],
      category: "Monument",
    },
    {
      slug: "kalta-minor",
      name: "Kalta Minor",
      description:
        "The 'Short Minaret' — meant to be the tallest in the Islamic world, abandoned at 29 meters in 1855 when the khan who commissioned it died. The squat blue stump is now Khiva's most photographed object. The proportions, paradoxically, work.",
      image:
        IMG.kalta_minor,
      hours: "View at any time",
      fee: { usd: "Free (exterior)" },
      durationMin: 15,
      coords: [60.3621, 41.3782],
      category: "Monument",
    },
    {
      slug: "tash-hauli",
      name: "Tash-Hauli Palace",
      description:
        "The 'Stone Court' was the khan's residence — three intricate courtyards, every wall covered in blue-and-white majolica, the harem rooms decorated with lattices carved from elm. The audience hall's painted ceiling is the single best piece of decorative art in Khiva.",
      image:
        IMG.tash_hauli,
      hours: "Daily 9am – 6pm",
      fee: { usd: "Included in combined ticket" },
      durationMin: 60,
      coords: [60.3659, 41.3795],
      category: "Monument",
    },
    {
      slug: "islam-khoja-minaret",
      name: "Islam Khoja Minaret",
      description:
        "Built in 1910 — Khiva's youngest major monument and its tallest (57m). Climb the 118 dark steps for the unobstructed view across the medina and out to the desert.",
      image:
        IMG.islam_khoja_minaret,
      hours: "Daily 9am – 6pm",
      fee: { usd: "$2 climb fee" },
      durationMin: 30,
      coords: [60.3641, 41.3779],
      category: "Monument",
    },
    {
      slug: "juma-mosque",
      name: "Juma Mosque",
      description:
        "The Friday mosque is unique in Uzbekistan: a flat-roofed hypostyle hall supported by 213 carved wooden columns, most over 200 years old, some as old as the 10th century. No grand dome, just a forest of carved elm. Beautifully cool in summer.",
      image:
        IMG.juma_mosque_khiva,
      hours: "Daily 9am – 6pm",
      fee: { usd: "Included" },
      durationMin: 30,
      coords: [60.3633, 41.3785],
      category: "Mosque",
    },
    {
      slug: "kunya-ark",
      name: "Kunya Ark",
      description:
        "The old citadel inside the inner city — coronation court, mint, summer mosque, harem. The summer mosque's iwan with its painted ceiling and intricate tilework is the most photographed corner of Khiva after Kalta Minor.",
      image:
        IMG.kunya_ark,
      hours: "Daily 9am – 6pm",
      fee: { usd: "Included" },
      durationMin: 50,
      coords: [60.3618, 41.3791],
      category: "Monument",
    },
  ],
  hotels: [
    {
      name: "Meros B&B",
      tier: "Budget",
      priceFrom: 25,
      priceTo: 38,
      note: "Inside the city walls, ten rooms around a small courtyard. Owner is a former tour guide.",
    },
    {
      name: "Islambek Hotel",
      tier: "Budget",
      priceFrom: 28,
      priceTo: 45,
      note: "Just outside the East Gate. Clean, simple, with a tiny terrace overlooking the walls.",
    },
    {
      name: "Asia Khiva Hotel",
      tier: "Mid-range",
      priceFrom: 55,
      priceTo: 90,
      note: "The largest hotel inside the walls; some rooms face Kalta Minor.",
    },
    {
      name: "Hotel Malika Kheivak",
      tier: "Mid-range",
      priceFrom: 60,
      priceTo: 100,
      note: "Sister to the Samarkand Malika; rooftop dining with views over the city walls at sunset.",
    },
    {
      name: "Farovon Khiva",
      tier: "Luxury",
      priceFrom: 130,
      priceTo: 195,
      note: "Khiva's newest five-star, built in 2023 just outside the walls with a pool and full spa. The only place in town with a serious gym.",
    },
    {
      name: "Orient Star Khiva",
      tier: "Luxury",
      priceFrom: 115,
      priceTo: 180,
      note: "Rooms built into the cells of a former madrasa — small but extraordinarily atmospheric. The most photographable hotel in Uzbekistan.",
    },
  ],
  food: [
    {
      dish: "Khorezm shivit oshi",
      description:
        "A specialty of the Khorezm region: green dill-noodles served cold with a meaty tomato sauce. Found almost nowhere else in the country.",
      whereToTry: "Khorezm Art Restaurant inside Itchan Kala",
    },
    {
      dish: "Tukhum-barak",
      description:
        "Boiled dumplings filled with egg and herbs — a vegetarian rarity in Uzbek cuisine. Served with sour cream.",
      whereToTry: "Café Zerafshan",
    },
    {
      dish: "Khorezm plov",
      description:
        "Khiva's version of plov is darker, sweeter, and includes raisins and chunks of golden quince.",
      whereToTry: "Yasavul Boshi Café",
    },
    {
      dish: "Bread from the East Gate ovens",
      description:
        "Big rounds of patir bread stamped with intricate patterns. Eat warm with the local honey-thick yogurt qatiq.",
      whereToTry: "Bakeries clustered around the East Gate market, 7am – 11am",
    },
  ],
  gettingThere: [
    {
      from: "Tashkent",
      flight: { hours: "1h 30m to Urgench + 30-min taxi", priceUsd: "$70 – $130" },
      train: { hours: "13h overnight Sharq sleeper to Urgench", priceUsd: "$25 – $50" },
    },
    {
      from: "Bukhara",
      train: { hours: "6h 30m to Urgench + 30 min taxi", priceUsd: "$15 – $30" },
    },
    {
      from: "Almaty (Kazakhstan)",
      flight: { hours: "1h 20m to Tashkent + 1h 30m to Urgench", priceUsd: "$200 – $310 total" },
    },
  ],
  gettingAround: "Itchan Kala is small enough to walk in any weather. From Urgench airport, taxis run a fixed $10 fare to the East Gate (about 35 km, 40 minutes). There's a local airport in Urgench (UGC) for domestic and Istanbul flights.",
  weather: [
    { month: "Jan", highC: 5, lowC: -7, rating: 1, note: "Cold, occasional snow." },
    { month: "Feb", highC: 8, lowC: -5, rating: 2 },
    { month: "Mar", highC: 16, lowC: 3, rating: 4 },
    { month: "Apr", highC: 24, lowC: 10, rating: 5 },
    { month: "May", highC: 31, lowC: 16, rating: 4 },
    { month: "Jun", highC: 37, lowC: 20, rating: 2 },
    { month: "Jul", highC: 41, lowC: 23, rating: 1, note: "Desert heat — avoid." },
    { month: "Aug", highC: 39, lowC: 21, rating: 1 },
    { month: "Sep", highC: 32, lowC: 14, rating: 4 },
    { month: "Oct", highC: 22, lowC: 6, rating: 5 },
    { month: "Nov", highC: 13, lowC: 0, rating: 3 },
    { month: "Dec", highC: 7, lowC: -4, rating: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Tashkent
// ─────────────────────────────────────────────────────────────────
const tashkent: City = {
  slug: "tashkent",
  name: "Tashkent",
  tagline: "Where Soviet and Silk Road collide",
  overview:
    "Most Silk Road journeys begin here, in a capital that's part bustling Asian metropolis and part open-air gallery of Soviet modernism. A massive earthquake leveled the city center in 1966; what was rebuilt — wide boulevards, mosaicked metro stations, mid-century brutalist masterworks — is its own kind of heritage now. Two days are enough: pair the bustling Chorsu Bazaar and the old town's Hazrati Imam complex with an afternoon spent station-hopping on the metro, then sample more food than you should at the Central Asian Plov Center before catching the train to Samarkand.",
  heroImage:
    IMG.tashkent_hero,
  cardImage:
    IMG.tashkent_card,
  coords: [69.2401, 41.2995],
  recommendedDays: "1 – 2 days",
  bestTime: "April – May · September – October",
  dailyBudget: "$50 – $120",
  attractions: [
    {
      slug: "hazrati-imam",
      name: "Hazrati Imam Complex",
      description:
        "The spiritual center of Tashkent and home to one of the world's oldest Qur'ans — the Uthman Qur'an, dating from the mid-7th century. The library that houses it sits among madrasas, a mausoleum, and the Tilla Sheikh mosque, all rebuilt to Soviet standards but reverently.",
      image:
        IMG.hazrati_imam,
      hours: "Daily 8am – 6pm (Qur'an library closes 5pm)",
      fee: { usd: "Free; $1 to enter the Qur'an library" },
      durationMin: 75,
      coords: [69.2392, 41.3252],
      category: "Mosque",
    },
    {
      slug: "chorsu-bazaar",
      name: "Chorsu Bazaar",
      description:
        "Tashkent's central food market, under a turquoise-tiled dome the size of a basilica. Spices on one floor, meat below, dairy in the basement, dried fruit outside under awnings. Bring an empty stomach and small bills; the bakers at the entrance sell warm non bread by 7am.",
      image:
        IMG.chorsu_bazaar,
      hours: "Tue – Sun 7am – 7pm",
      fee: { usd: "Free" },
      durationMin: 90,
      coords: [69.2363, 41.3263],
      category: "Bazaar",
    },
    {
      slug: "amir-temur-square",
      name: "Amir Temur Square",
      description:
        "The civic heart of the modern city — a leafy plaza dominated by an equestrian Timur statue, ringed by 19th-century Russian and Soviet government buildings. The view down Sailgokh Street toward the Forums Palace is the postcard image of new Tashkent.",
      image:
        IMG.amir_temur_square,
      hours: "Always open",
      fee: { usd: "Free" },
      durationMin: 30,
      coords: [69.2787, 41.3112],
      category: "Square",
    },
    {
      slug: "tashkent-metro",
      name: "Tashkent Metro",
      description:
        "Until 2018 it was illegal to photograph the metro, which is one reason it's now Tashkent's quiet star. Every station is themed — Kosmonavtlar (1984) celebrates Soviet space heroes in cobalt and chrome; Pakhtakor honors cotton workers; Alisher Navoi reads as a domed Timurid madrasa underground. A 24-hour ticket is under $1.",
      image:
        IMG.tashkent_metro,
      hours: "Daily 5am – midnight",
      fee: { usd: "$0.15/ride" },
      durationMin: 90,
      coords: [69.2401, 41.2995],
      category: "Monument",
    },
    {
      slug: "independence-square",
      name: "Independence Square (Mustakillik)",
      description:
        "Vast civic plaza commemorating Uzbekistan's 1991 independence. Heavy on symbolism — the eternal flame, a globe with Uzbekistan picked out in gold — but the surrounding park is genuinely lovely in spring.",
      image:
        IMG.independence_square,
      hours: "Always open",
      fee: { usd: "Free" },
      durationMin: 45,
      coords: [69.2778, 41.3110],
      category: "Square",
    },
    {
      slug: "central-asian-plov-center",
      name: "Central Asian Plov Center",
      description:
        "Not an attraction in the museum sense — it's a vast canteen that produces 4,000 servings of plov a day from giant outdoor kazans. Arrive by noon, watch the cooks layer carrots and meat under your eyes, eat with the locals at communal tables. A near-religious Tashkent experience.",
      image:
        IMG.plov_center,
      hours: "Daily 10am – 3pm (or until plov runs out)",
      fee: { usd: "$3 a portion" },
      durationMin: 60,
      coords: [69.3370, 41.3274],
      category: "Bazaar",
    },
  ],
  hotels: [
    {
      name: "Topchan Hostel",
      tier: "Budget",
      priceFrom: 18,
      priceTo: 30,
      note: "Tashkent's most reliable backpacker base. Dorms and private doubles, English-speaking staff, free shared kitchen.",
    },
    {
      name: "Art Hostel Tashkent",
      tier: "Budget",
      priceFrom: 22,
      priceTo: 38,
      note: "Quieter alternative; small courtyard, cleaner bathrooms, near the Old Town.",
    },
    {
      name: "City Palace Hotel",
      tier: "Mid-range",
      priceFrom: 65,
      priceTo: 100,
      note: "Reliable mid-century 4-star near Amir Temur Square. Decent breakfast, fast wifi, walkable everywhere.",
    },
    {
      name: "Inspira-S Hotel",
      tier: "Mid-range",
      priceFrom: 80,
      priceTo: 125,
      note: "Modern boutique near Mustakillik Square; rooftop pool, good gym, attentive staff.",
    },
    {
      name: "Hilton Tashkent",
      tier: "Luxury",
      priceFrom: 160,
      priceTo: 240,
      note: "Glass tower facing the Tashkent City park; the best business hotel in the country, with the best buffet breakfast on the continent.",
    },
    {
      name: "Hyatt Regency Tashkent",
      tier: "Luxury",
      priceFrom: 180,
      priceTo: 290,
      note: "Five-star opposite the National History Museum. Indoor pool, full spa, the bar on the 15th floor has the city view.",
    },
  ],
  food: [
    {
      dish: "Tashkent plov",
      description:
        "The richest variant of the national dish: rice steamed under sliced beef tongue, eggs, and chickpeas. Served on a single shared platter.",
      whereToTry: "Central Asian Plov Center (Besh Qozon)",
    },
    {
      dish: "Norin",
      description:
        "A Tashkent specialty: cold thin noodles tossed with shredded boiled horse meat and onions. More refreshing than it sounds; eat with bread and chai.",
      whereToTry: "Cafe Sim-Sim",
    },
    {
      dish: "Manty",
      description:
        "Steamed lamb dumplings the size of your fist, with a dab of sour cream. Tashkent's most reliable late-evening meal.",
      whereToTry: "Caravan Restaurant",
    },
    {
      dish: "Halal Korean food",
      description:
        "Tashkent has a sizable Koryo-saram (Soviet-Korean) population — try their cold morkovcha (spiced carrot salad) and kimchi-style kuksi noodles, sold throughout Chorsu.",
      whereToTry: "Korean stalls inside Chorsu Bazaar",
    },
  ],
  gettingThere: [
    {
      from: "Almaty (Kazakhstan)",
      flight: { hours: "1h 20m direct (Air Astana / SCAT)", priceUsd: "$120 – $180" },
      train: { hours: "21h overnight (Talgo Almaty 2 → Tashkent, runs alternate days)", priceUsd: "$45 – $70" },
    },
    {
      from: "Istanbul",
      flight: { hours: "5h 30m (Turkish Airlines / Uzbekistan Airways)", priceUsd: "$280 – $480" },
    },
    {
      from: "Moscow",
      flight: { hours: "4h", priceUsd: "$220 – $340" },
    },
    {
      from: "Seoul",
      flight: { hours: "7h direct (Asiana / Uzbekistan Airways)", priceUsd: "$420 – $620" },
    },
  ],
  gettingAround: "The metro is the fastest way across town for under a dollar. Yandex Go is the universal taxi app, $2 – $5 for most rides. Walking works for the area around Amir Temur square but not between districts — Tashkent is enormous, second-largest city in the former USSR by area.",
  weather: [
    { month: "Jan", highC: 7, lowC: -3, rating: 2 },
    { month: "Feb", highC: 10, lowC: -1, rating: 2 },
    { month: "Mar", highC: 17, lowC: 5, rating: 4 },
    { month: "Apr", highC: 24, lowC: 10, rating: 5, note: "The city's gardens are at peak bloom." },
    { month: "May", highC: 30, lowC: 15, rating: 4 },
    { month: "Jun", highC: 36, lowC: 20, rating: 3 },
    { month: "Jul", highC: 39, lowC: 22, rating: 2 },
    { month: "Aug", highC: 37, lowC: 20, rating: 2 },
    { month: "Sep", highC: 31, lowC: 14, rating: 5 },
    { month: "Oct", highC: 23, lowC: 7, rating: 5 },
    { month: "Nov", highC: 14, lowC: 2, rating: 3 },
    { month: "Dec", highC: 9, lowC: -2, rating: 2 },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Fergana Valley
// ─────────────────────────────────────────────────────────────────
const fergana: City = {
  slug: "fergana",
  name: "Fergana Valley",
  tagline: "Silk, ceramics, and orchards",
  overview:
    "The Fergana Valley is Uzbekistan's lush eastern corner — a green pocket between the Pamir and Tien Shan ranges where artisans have made silk in Margilan and signature blue ceramics in Rishtan for ten centuries. The valley is also Uzbekistan's most traditional region; the food is heavier with herbs, the bread is bigger, and women still embroider their suzanis in front yards. Few travelers make it here — flight schedules from Tashkent are limited and the road over the Kamchik Pass is winding — which is precisely why this is the corner of the country to visit if you want the real one.",
  heroImage:
    IMG.fergana_hero,
  cardImage:
    IMG.fergana_card,
  coords: [71.7843, 40.3842],
  recommendedDays: "1 – 2 days",
  bestTime: "May – June · September",
  dailyBudget: "$35 – $80",
  attractions: [
    {
      slug: "yodgorlik-silk-factory",
      name: "Yodgorlik Silk Factory (Margilan)",
      description:
        "The last factory in Central Asia still spinning, dyeing and weaving ikat silk by hand — every step from cocoon to finished khan-atlas robe happens in this one rambling courtyard. Visit weekdays, mid-morning, when the dye vats are bubbling and the looms clatter. The shop is the best place in the country to buy a real ikat scarf.",
      image:
        IMG.margilan_silk,
      hours: "Mon – Sat 9am – 5pm",
      fee: { usd: "Free entry · $5 for guided tour" },
      durationMin: 90,
      coords: [71.7177, 40.4715],
      category: "Museum",
    },
    {
      slug: "kokand-palace",
      name: "Khudayar Khan Palace (Kokand)",
      description:
        "The 1870s residence of the last Khan of Kokand, all 27 surviving rooms (of an original 113) clad in painted ceiling timber and stucco arabesques. The blue-tiled entrance facade is one of the great unsung sights in Central Asia.",
      image:
        IMG.kokand_palace,
      hours: "Daily 9am – 5pm (closed Mondays in winter)",
      fee: { usd: "$3" },
      durationMin: 75,
      coords: [70.9447, 40.5286],
      category: "Monument",
    },
    {
      slug: "rishtan-ceramics",
      name: "Rishtan Ceramics Workshops",
      description:
        "Rishtan's signature blue (ishkor) glaze comes from a recipe that's been passed father-to-son for 800 years. Several family workshops welcome visitors — Rustam Usmanov's atelier is the friendliest English-speaking option. You can throw a pot, learn the glazing, and eat lunch in the family courtyard.",
      image:
        IMG.rishtan_ceramics,
      hours: "Daily 9am – 6pm (call ahead — these are working studios)",
      fee: { usd: "Free; $25 for a half-day workshop with lunch" },
      durationMin: 180,
      coords: [71.2785, 40.3553],
      category: "Museum",
    },
    {
      slug: "fergana-city-center",
      name: "Fergana City Center",
      description:
        "The provincial capital is the valley's most pleasant overnight base — leafy boulevards laid out by a Russian general in the 1870s, a small bazaar, and the country's best provincial restaurants. Not a sight-seeing town, but a good rest day.",
      image:
        IMG.fergana_city,
      hours: "Always",
      fee: { usd: "Free" },
      durationMin: 120,
      coords: [71.7843, 40.3842],
      category: "Square",
    },
  ],
  hotels: [
    {
      name: "Hotel Asia Fergana",
      tier: "Budget",
      priceFrom: 30,
      priceTo: 48,
      note: "Simple, central, with secure parking and a small breakfast room.",
    },
    {
      name: "Hotel Khan Saroy",
      tier: "Budget",
      priceFrom: 28,
      priceTo: 45,
      note: "Family-run, located in Kokand near the Khan's Palace.",
    },
    {
      name: "Grand Fergana Hotel",
      tier: "Mid-range",
      priceFrom: 60,
      priceTo: 95,
      note: "The valley's most reliable 4-star — bland from the outside, comfortable rooms, good wifi.",
    },
    {
      name: "Club Hotel 777",
      tier: "Mid-range",
      priceFrom: 70,
      priceTo: 110,
      note: "Newer build with a swimming pool — useful given the summer heat.",
    },
    {
      name: "Hotel Bek Fergana",
      tier: "Luxury",
      priceFrom: 110,
      priceTo: 165,
      note: "The closest thing the valley has to a 5-star: large suites, full spa, courtyard restaurant. Twenty minutes from Margilan.",
    },
  ],
  food: [
    {
      dish: "Fergana plov",
      description:
        "The valley is plov's spiritual homeland — every town has its variation. Fergana's is wetter and yellower than the rest, layered with chunks of yellow turnip.",
      whereToTry: "Cafe Margilon, central Fergana",
    },
    {
      dish: "Beshbarmak",
      description:
        "'Five fingers' — wide ribbons of dough boiled in lamb broth, topped with chunks of meat and onion. Eaten with your hands, traditionally.",
      whereToTry: "Family-run guesthouses; many will prepare on request",
    },
    {
      dish: "Halisa",
      description:
        "A slow-cooked porridge of wheat and meat, beaten to a paste over hours. Comfort food par excellence.",
      whereToTry: "Sunday morning bazaars",
    },
    {
      dish: "Patir bread",
      description:
        "Fergana's bread is thicker and more buttery than the Samarkand variant, often baked with seeds and onion. Stamped with intricate patterns.",
      whereToTry: "Kuva Bazaar bakeries",
    },
  ],
  gettingThere: [
    {
      from: "Tashkent",
      flight: { hours: "1h to Fergana airport", priceUsd: "$45 – $90" },
      train: { hours: "5h on the Sharq day train through Kamchik Pass", priceUsd: "$15 – $30" },
    },
    {
      from: "Almaty (Kazakhstan)",
      flight: { hours: "1h 20m to Tashkent + 1h to Fergana", priceUsd: "$180 – $260 total" },
    },
  ],
  gettingAround: "Shared taxis are the way — Fergana to Margilan is $0.50, Margilan to Rishtan $3, Fergana to Kokand $5. The drivers cluster at each city's central bazaar; ask for the destination by name and a price.",
  weather: [
    { month: "Jan", highC: 5, lowC: -4, rating: 1 },
    { month: "Feb", highC: 8, lowC: -3, rating: 2 },
    { month: "Mar", highC: 16, lowC: 3, rating: 4 },
    { month: "Apr", highC: 23, lowC: 9, rating: 5 },
    { month: "May", highC: 28, lowC: 14, rating: 5, note: "Orchards in bloom; perfect." },
    { month: "Jun", highC: 33, lowC: 18, rating: 4 },
    { month: "Jul", highC: 36, lowC: 21, rating: 3 },
    { month: "Aug", highC: 35, lowC: 19, rating: 3 },
    { month: "Sep", highC: 29, lowC: 13, rating: 5, note: "Harvest at every bazaar." },
    { month: "Oct", highC: 21, lowC: 6, rating: 4 },
    { month: "Nov", highC: 13, lowC: 1, rating: 3 },
    { month: "Dec", highC: 7, lowC: -3, rating: 2 },
  ],
};

export const uzbekistanCities: City[] = [
  samarkand,
  bukhara,
  khiva,
  tashkent,
  fergana,
];
