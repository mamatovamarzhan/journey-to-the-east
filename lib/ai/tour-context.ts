// Grounding context for Gemini. Identical to python-service/tour_context.py
// — the AI is only allowed to surface facts that appear here.
//
// When content/countries/uzbekistan/* changes, update this block too.

export const TOUR_CONTEXT = `
COUNTRIES SUPPORTED: Uzbekistan only (Central Asia expansion planned).

═══ CITIES (slug · best time · recommended stay · daily budget USD) ═══

[samarkand] · Apr–early Jun · Sep–Oct · 2–3 days · $45–$110
Tagline: The crossroads of cultures.
Attractions:
  - Registan Square (3 madrasas, daily 8am–7pm, $5)
  - Gur-e-Amir Mausoleum (Timur's tomb, $3)
  - Shah-i-Zinda Necropolis ($3, go early)
  - Bibi-Khanym Mosque ($3)
  - Ulugh Beg Observatory ($2, north of town)
  - Siab Bazaar (free, mornings)
Hotels:
  Budget: Bahodir B&B $22–38, Jahongir Guesthouse $25–40
  Mid: Hotel Malika Classic $60–95, Grand Samarkand Superior $75–115
  Luxury: Hotel Bibikhanum $140–200, Silk Road by Minyoun $195–320
Food: Samarkand-style plov (Karimbek), shashlik (The Old City), tandyr samsa, halva at Siab.

[bukhara] · Mar–May · Oct–Nov · 2 days · $40–$95
Tagline: A living medieval city.
Attractions:
  - Ark of Bukhara (fortress, $4)
  - Po-i-Kalyan & Kalyan Minaret (free, no entry during prayers)
  - Lyab-i-Hauz (free, 17th-c pond + tea houses)
  - Samanid Mausoleum ($2, 9th century, oldest in Central Asia)
  - Chor Minor ($1, four small turquoise domes)
  - Trading Domes (Toki-Zargaron, Toki-Sarrofon, Toki-Telpak Furushon — silk + suzani embroidery)
Hotels:
  Budget: Lyabi-House Hotel $25–42, Mehtar Anbar B&B $28–45
  Mid: Hotel Asia Bukhara $60–95, Mercure Bukhara Old Town $80–130
  Luxury: Hotel Boutique Minzifa $130–200, Komil Boutique Hotel $110–175
Food: Bukharan plov (Old Bukhara), manty, tandyr samsa, lagman at Minzifa.

[khiva] · Apr–May · Sep–Oct · 1–2 days · $35–$85
Tagline: A desert mirage made stone.
Attractions:
  - Itchan Kala (walled inner city, $8 combined ticket)
  - Kalta Minor (unfinished blue minaret, free exterior)
  - Tash-Hauli Palace (harem courtyards, included)
  - Islam Khoja Minaret ($2 to climb, best panorama)
  - Juma Mosque (213 wooden columns, included)
  - Kunya Ark (citadel, included)
Hotels:
  Budget: Meros B&B $25–38, Islambek Hotel $28–45
  Mid: Asia Khiva Hotel $55–90, Hotel Malika Kheivak $60–100
  Luxury: Farovon Khiva $130–195, Orient Star Khiva $115–180 (rooms inside a former madrasa)
Food: Khorezm shivit oshi (green dill noodles), tukhum-barak (egg dumplings), Khorezm plov.

[tashkent] · Apr–May · Sep–Oct · 1–2 days · $50–$120
Tagline: Where Soviet and Silk Road collide.
Attractions:
  - Hazrati Imam Complex (home of the Uthman Qur'an, $1 for library)
  - Chorsu Bazaar (under turquoise dome, Tue–Sun)
  - Amir Temur Square (free)
  - Tashkent Metro ($0.15/ride, themed stations: Kosmonavtlar, Alisher Navoi, Pakhtakor)
  - Independence Square
  - Central Asian Plov Center (Besh Qozon, $3/portion, before 3pm)
Hotels:
  Budget: Topchan Hostel $18–30, Art Hostel $22–38
  Mid: City Palace Hotel $65–100, Inspira-S Hotel $80–125
  Luxury: Hilton Tashkent $160–240, Hyatt Regency Tashkent $180–290
Food: Tashkent plov (Besh Qozon), norin (cold noodles + horse meat), manty, Korean food at Chorsu.

[fergana] · May–Jun · Sep · 1–2 days · $35–$80
Tagline: Silk, ceramics, and orchards.
Attractions:
  - Yodgorlik Silk Factory, Margilan (handmade ikat, Mon–Sat, free entry / $5 tour)
  - Khudayar Khan Palace, Kokand ($3)
  - Rishtan ceramics workshops (free / $25 half-day workshop with Rustam Usmanov)
  - Fergana city center (Russian colonial boulevards)
Hotels: Hotel Asia Fergana $30–48, Grand Fergana Hotel $60–95, Hotel Bek Fergana $110–165.
Food: Fergana plov (Cafe Margilon), beshbarmak, halisa, Kuva patir bread.

═══ INTRA-UZBEKISTAN TRANSPORT ═══
- Afrosiyob high-speed train: Tashkent→Samarkand 2h 10m $15–30 · Tashkent→Bukhara 3h 20m $25–45 · Samarkand→Bukhara 1h 25m $15–25
- Sharq sleeper: Tashkent→Urgench (for Khiva) 13h overnight $25–50
- Domestic flights to Urgench (UGC) for Khiva: $70–130, 1h 30m
- Tashkent ↔ Fergana: 1h flight $45–90, or 5h Sharq train through Kamchik Pass

═══ FLIGHTS (round-trip, into Tashkent) ═══
Almaty: ~$120–180 (Air Astana, SCAT, 1h 20m)
Istanbul: ~$280–480 (Turkish, Uzbekistan Airways, 5h 30m)
Moscow: ~$220–340 (4h)
Seoul: ~$420–620 (7h, direct)

═══ ITINERARIES OFFERED ═══
- "Silk Road in 7 Days" — Tashkent, Samarkand, Bukhara — Standard $980/pp
- "Uzbekistan in 10 Days" — adds Khiva — Standard $1,450/pp
- "Weekend in Samarkand" — 3 days $420/pp
- "Budget Student Trip" — 5 days under $400/pp, sleeper trains + hostels
- "Luxury Silk Road" — 8 days $3,200/pp, heritage hotels + private guides + helicopter to Samarkand

═══ STYLE TIERS (USD per person per day for daily-cost lines) ═══
Budget   — hotel $30/night, food $15, activities $8
Standard — hotel $75/night, food $35, activities $15
Luxury   — hotel $180/night, food $80, activities $35

═══ INTRA-COUNTRY TRANSPORT TYPICAL COST PER TRAVELER (USD) ═══
1 city: $0 · 2 cities: $25 · 3 cities: $50 · 4 cities: $100 · 5 cities: $150
`;
