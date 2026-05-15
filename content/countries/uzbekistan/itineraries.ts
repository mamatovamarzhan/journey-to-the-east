// Five trip plans for Uzbekistan with day-by-day breakdowns.
// Hero images, days_plan, and price estimates are all real, sourced from
// the same research as cities.ts. Add new plans by following the same shape.

import type { Itinerary } from "@/content/types";
import { IMG } from "@/content/images";

// ──────────────────────────────────────────────────────────────────
// 1. Classic 7-day Silk Road
// ──────────────────────────────────────────────────────────────────
const silkRoad7: Itinerary = {
  slug: "silk-road-7-days",
  title: "Silk Road in 7 Days",
  tagline: "Tashkent, Samarkand, Bukhara — the classic loop, paced humanely",
  days: 7,
  priceUsd: 980,
  style: "Standard",
  heroImage:
    IMG.samarkand_hero,
  highlights: [
    "Two evenings at the Registan",
    "Hazrati Imam complex + Chorsu Bazaar in Tashkent",
    "Po-i-Kalyan minaret + Trading Domes in Bukhara",
    "Two rides on the Afrosiyob high-speed train",
  ],
  cities: ["tashkent", "samarkand", "bukhara"],
  days_plan: [
    {
      day: 1,
      city: "tashkent",
      title: "Arrive Tashkent",
      summary:
        "Land at Tashkent International, check in, recover from the flight with a slow walk through Amir Temur Square and dinner at the Central Asian Plov Center.",
      highlights: [
        "Amir Temur Square at golden hour",
        "Dinner at Besh Qozon plov center",
      ],
      stay: "City Palace Hotel",
      image:
        IMG.amir_temur_square,
    },
    {
      day: 2,
      city: "tashkent",
      title: "Old Town + a metro safari",
      summary:
        "Morning at Hazrati Imam with the Uthman Qur'an, brunch at Chorsu Bazaar, then four hours hopping between the metro's most ornate stations. Catch the afternoon Afrosiyob to Samarkand.",
      highlights: [
        "Hazrati Imam complex",
        "Chorsu Bazaar (under the dome)",
        "Kosmonavtlar + Alisher Navoi metro stations",
        "Afrosiyob 2:30pm → Samarkand 4:40pm",
      ],
      stay: "Hotel Bibikhanum, Samarkand",
      image:
        IMG.hazrati_imam,
    },
    {
      day: 3,
      city: "samarkand",
      title: "Registan + the Timurid heart",
      summary:
        "Open the Registan at 8am with the light still soft. Gur-e-Amir mid-morning for Timur's tomb. Lunch in the old town, then walk Bibi-Khanym in the afternoon. Return to Registan for the evening floodlight show.",
      highlights: [
        "Registan Square (morning)",
        "Gur-e-Amir Mausoleum",
        "Bibi-Khanym Mosque",
        "Registan light show (8pm)",
      ],
      stay: "Hotel Bibikhanum",
      image:
        IMG.registan_night,
    },
    {
      day: 4,
      city: "samarkand",
      title: "Shah-i-Zinda, the observatory, and an evening train",
      summary:
        "Walk Shah-i-Zinda first thing, before tour buses arrive. Taxi up the hill to Ulugh Beg's observatory. Lunch at Karimbek, a quick spin through Siab bazaar for nuts and dried fruit, then the 5pm Afrosiyob west to Bukhara.",
      highlights: [
        "Shah-i-Zinda necropolis (early)",
        "Ulugh Beg Observatory",
        "Siab Bazaar",
        "Afrosiyob to Bukhara, arrive 6:30pm",
      ],
      stay: "Hotel Boutique Minzifa, Bukhara",
      image:
        IMG.shah_i_zinda_alt,
    },
    {
      day: 5,
      city: "bukhara",
      title: "The fortress, the minaret, the bazaar",
      summary:
        "Ark of Bukhara at opening, then across to Po-i-Kalyan for the minaret and a long pause inside the Mir-i-Arab madrasa courtyard. Lunch in the Trading Domes; spend the afternoon shopping for a Bukharan suzani and silk scarves.",
      highlights: [
        "Ark of Bukhara",
        "Kalyan Minaret + Po-i-Kalyan",
        "Trading Domes (3 of them)",
        "Bargaining for silk in Toki-Telpak",
      ],
      stay: "Hotel Boutique Minzifa",
      image:
        IMG.ark_bukhara,
    },
    {
      day: 6,
      city: "bukhara",
      title: "Samanid, Chor Minor, an evening by the pond",
      summary:
        "Cross the park to the 9th-century Samanid mausoleum at opening. Walk through quiet residential lanes to Chor Minor. Free afternoon — many people simply order tea by Lyab-i-Hauz pond and let the day slow down.",
      highlights: [
        "Samanid Mausoleum",
        "Chor Minor (in residential Bukhara)",
        "Chaikhana afternoon by Lyab-i-Hauz",
        "Farewell dinner at Minzifa restaurant",
      ],
      stay: "Hotel Boutique Minzifa",
      image:
        IMG.chor_minor,
    },
    {
      day: 7,
      city: "bukhara",
      title: "Fly home",
      summary:
        "Morning flight Bukhara → Tashkent (1h 10m), connecting onward. Or take the early Afrosiyob back to Tashkent for an evening international departure.",
      highlights: [
        "Morning flight to Tashkent",
        "Onward international connection",
      ],
      image:
        IMG.tashkent_hero,
    },
  ],
};

// ──────────────────────────────────────────────────────────────────
// 2. Uzbekistan in 10 Days (grand tour)
// ──────────────────────────────────────────────────────────────────
const uzbekistan10: Itinerary = {
  slug: "uzbekistan-10-days",
  title: "Uzbekistan in 10 Days",
  tagline: "Every UNESCO site, with breathing room",
  days: 10,
  priceUsd: 1450,
  style: "Standard",
  heroImage:
    IMG.bukhara_hero,
  highlights: [
    "Khiva's walled Itchan Kala over two nights",
    "Bukhara craft workshops",
    "Shah-i-Zinda and Registan",
    "Day-trip option to Shakhrisabz, Timur's birthplace",
  ],
  cities: ["tashkent", "khiva", "bukhara", "samarkand"],
  days_plan: [
    {
      day: 1,
      city: "tashkent",
      title: "Arrive Tashkent",
      summary:
        "Land, settle, walk Amir Temur Square at sunset, eat plov at Besh Qozon.",
      highlights: ["Amir Temur Square", "Plov dinner"],
      stay: "Hilton Tashkent",
    },
    {
      day: 2,
      city: "tashkent",
      title: "Tashkent essentials",
      summary:
        "Hazrati Imam, Chorsu Bazaar, an afternoon metro tour. Evening flight to Urgench for Khiva.",
      highlights: ["Hazrati Imam", "Chorsu", "Metro hopping", "Flight to Urgench"],
      stay: "Orient Star Khiva (in a former madrasa cell)",
    },
    {
      day: 3,
      city: "khiva",
      title: "Inside Itchan Kala",
      summary:
        "A full day inside the walled city. Kalta Minor at first light, Juma Mosque's wooden forest, Tash-Hauli palace's harem courtyards, sunset from the city walls.",
      highlights: ["Kalta Minor", "Juma Mosque", "Tash-Hauli", "Walls at sunset"],
      stay: "Orient Star Khiva",
    },
    {
      day: 4,
      city: "khiva",
      title: "Kunya Ark + climb Islam Khoja",
      summary:
        "Slower second day: Kunya Ark in the morning, climb Islam Khoja for the panorama, free afternoon for the bazaar at the East Gate.",
      highlights: ["Kunya Ark", "Islam Khoja Minaret climb", "East Gate bazaar"],
      stay: "Orient Star Khiva",
    },
    {
      day: 5,
      city: "bukhara",
      title: "Train to Bukhara",
      summary:
        "Morning car to Urgench, 6.5-hour train through the Karakum desert, arrive Bukhara late afternoon. Sunset by Lyab-i-Hauz pond.",
      highlights: ["Train through the desert", "Lyab-i-Hauz evening"],
      stay: "Hotel Boutique Minzifa",
    },
    {
      day: 6,
      city: "bukhara",
      title: "Po-i-Kalyan + Ark + trading domes",
      summary:
        "The main monuments and the bazaars, with a long break for plov around noon.",
      highlights: ["Ark of Bukhara", "Po-i-Kalyan", "Trading Domes"],
      stay: "Hotel Boutique Minzifa",
    },
    {
      day: 7,
      city: "bukhara",
      title: "Samanid + Chor Minor + a craft workshop",
      summary:
        "Samanid mausoleum at opening, then Chor Minor. Afternoon at a working suzani embroidery atelier; many travelers buy their favorite souvenir here.",
      highlights: ["Samanid Mausoleum", "Chor Minor", "Suzani workshop"],
      stay: "Hotel Boutique Minzifa",
    },
    {
      day: 8,
      city: "samarkand",
      title: "Afrosiyob to Samarkand",
      summary:
        "Late-morning train to Samarkand (1h 25m). Lunch, afternoon at Gur-e-Amir, evening Registan.",
      highlights: ["Afrosiyob train", "Gur-e-Amir", "Registan light show"],
      stay: "Hotel Bibikhanum",
    },
    {
      day: 9,
      city: "samarkand",
      title: "Registan, Shah-i-Zinda, Bibi-Khanym",
      summary:
        "Registan at opening, Shah-i-Zinda late morning, lunch, Bibi-Khanym mosque, Siab bazaar. Long day, rewarding.",
      highlights: [
        "Registan (early)",
        "Shah-i-Zinda",
        "Bibi-Khanym",
        "Siab bazaar",
      ],
      stay: "Hotel Bibikhanum",
    },
    {
      day: 10,
      city: "samarkand",
      title: "Fly home",
      summary:
        "Optional morning trip up to Ulugh Beg's observatory, then late-morning Afrosiyob back to Tashkent for the international flight home.",
      highlights: ["Ulugh Beg Observatory", "Train to Tashkent", "Departure"],
    },
  ],
};

// ──────────────────────────────────────────────────────────────────
// 3. Weekend in Samarkand (3 days)
// ──────────────────────────────────────────────────────────────────
const weekendSamarkand: Itinerary = {
  slug: "weekend-in-samarkand",
  title: "Weekend in Samarkand",
  tagline: "Three days, two sunsets at the Registan",
  days: 3,
  priceUsd: 420,
  style: "Standard",
  heroImage:
    IMG.registan,
  highlights: [
    "Two evenings at the Registan",
    "Shah-i-Zinda's tile-lined alley",
    "Siab Bazaar tasting tour",
    "Ulugh Beg Observatory side trip",
  ],
  cities: ["samarkand"],
  days_plan: [
    {
      day: 1,
      city: "samarkand",
      title: "Arrival and a first sunset",
      summary:
        "Fly in (or arrive on the morning Afrosiyob from Tashkent). Lunch near Registan, easy afternoon walk to Gur-e-Amir, then catch the Registan at sunset and again under the lights.",
      highlights: ["Gur-e-Amir", "Registan sunset", "Light show 8pm"],
      stay: "Hotel Malika Classic",
    },
    {
      day: 2,
      city: "samarkand",
      title: "The big-three monuments + market lunch",
      summary:
        "Shah-i-Zinda at 8am, Bibi-Khanym at 10, Siab bazaar for lunch, Ulugh Beg's observatory in the afternoon. Second Registan visit in the evening — even better than the first.",
      highlights: [
        "Shah-i-Zinda",
        "Bibi-Khanym",
        "Siab Bazaar lunch",
        "Ulugh Beg Observatory",
      ],
      stay: "Hotel Malika Classic",
    },
    {
      day: 3,
      city: "samarkand",
      title: "Slow breakfast and the train home",
      summary:
        "Brunch at the hotel terrace, last walk through Registan in the morning light, midday Afrosiyob back to Tashkent.",
      highlights: ["Registan in the morning", "Train back to Tashkent"],
    },
  ],
};

// ──────────────────────────────────────────────────────────────────
// 4. Budget Student Trip (5 days, under $400)
// ──────────────────────────────────────────────────────────────────
const budgetStudent: Itinerary = {
  slug: "budget-student-trip",
  title: "Budget Student Trip",
  tagline: "5 days under $400, sleeper trains and family guesthouses",
  days: 5,
  priceUsd: 380,
  style: "Budget",
  heroImage:
    IMG.khiva_hero,
  highlights: [
    "Hostels and B&Bs under $25 a night",
    "Public transport everywhere",
    "Plov from working-class neighborhoods",
    "Overnight Sharq sleeper train",
  ],
  cities: ["tashkent", "bukhara", "samarkand"],
  days_plan: [
    {
      day: 1,
      city: "tashkent",
      title: "Arrive Tashkent",
      summary:
        "Train from Tashkent airport to the Topchan Hostel by metro. Chorsu bazaar for cheap samsa, evening walk on Amir Temur square.",
      highlights: ["Topchan Hostel ($20)", "Chorsu Bazaar dinner", "Metro from airport"],
      stay: "Topchan Hostel",
    },
    {
      day: 2,
      city: "tashkent",
      title: "Old Town and the night train",
      summary:
        "Hazrati Imam (free), metro tour ($1), plov at Besh Qozon ($3). Catch the overnight Sharq train to Bukhara — kupe ticket $25, you sleep all the way.",
      highlights: [
        "Hazrati Imam complex",
        "Metro safari",
        "Besh Qozon plov",
        "Night train to Bukhara",
      ],
      stay: "On the Sharq sleeper",
    },
    {
      day: 3,
      city: "bukhara",
      title: "Bukhara on foot",
      summary:
        "Arrive 7am, drop bags at Lyabi-House. Po-i-Kalyan, Ark, free lunch break, Trading Domes, Lyab-i-Hauz at sunset.",
      highlights: [
        "Lyabi-House dorm ($25)",
        "Ark of Bukhara",
        "Po-i-Kalyan",
        "Lyab-i-Hauz evening",
      ],
      stay: "Lyabi-House Hotel",
    },
    {
      day: 4,
      city: "samarkand",
      title: "Samanid + day train to Samarkand",
      summary:
        "Morning at Samanid mausoleum and Chor Minor. Cheap Afrosiyob ticket ($15 economy) to Samarkand, arrive mid-afternoon. Check into Bahodir B&B. Sunset at Registan.",
      highlights: [
        "Samanid Mausoleum",
        "Afrosiyob economy",
        "Bahodir B&B ($22)",
        "Registan sunset",
      ],
      stay: "Bahodir B&B",
    },
    {
      day: 5,
      city: "samarkand",
      title: "Samarkand finale, train home",
      summary:
        "Shah-i-Zinda, Bibi-Khanym, lunch at Siab, afternoon Afrosiyob back to Tashkent. International flight or onward train.",
      highlights: ["Shah-i-Zinda", "Bibi-Khanym", "Siab", "Train back"],
    },
  ],
};

// ──────────────────────────────────────────────────────────────────
// 5. Luxury Silk Road (8 days)
// ──────────────────────────────────────────────────────────────────
const luxurySilkRoad: Itinerary = {
  slug: "luxury-silk-road",
  title: "Luxury Silk Road",
  tagline: "Eight days in heritage hotels with private guides",
  days: 8,
  priceUsd: 3200,
  style: "Luxury",
  heroImage:
    IMG.shah_i_zinda,
  highlights: [
    "Stay at Hotel Boutique Minzifa, Bukhara",
    "Private after-hours Registan access",
    "Helicopter transfer Tashkent → Samarkand",
    "Calligraphy class with a master in Bukhara",
  ],
  cities: ["tashkent", "samarkand", "bukhara", "khiva"],
  days_plan: [
    {
      day: 1,
      city: "tashkent",
      title: "Welcome to Tashkent",
      summary:
        "Arrival, private transfer to the Hyatt Regency, dinner at Caravan with the owner.",
      highlights: ["Hyatt Regency Tashkent suite", "Caravan dinner"],
      stay: "Hyatt Regency Tashkent",
    },
    {
      day: 2,
      city: "tashkent",
      title: "Tashkent + helicopter to Samarkand",
      summary:
        "Private guided tour of Hazrati Imam (with a curator's introduction to the Uthman Qur'an), lunch at Café Caravan, helicopter transfer to Samarkand in the afternoon, evening welcome at the Silk Road Minyoun.",
      highlights: ["Curator-led Hazrati Imam", "Helicopter to Samarkand"],
      stay: "Silk Road by Minyoun, Samarkand",
    },
    {
      day: 3,
      city: "samarkand",
      title: "After-hours Registan",
      summary:
        "Full-day private tour: Gur-e-Amir, Shah-i-Zinda, Bibi-Khanym. Climax: private, after-hours access to the Registan complex, all three madrasas open, guards and lights, no other visitors.",
      highlights: [
        "Private guide",
        "Gur-e-Amir + Shah-i-Zinda + Bibi-Khanym",
        "After-hours Registan",
      ],
      stay: "Silk Road by Minyoun",
    },
    {
      day: 4,
      city: "samarkand",
      title: "Drive to Bukhara via Shakhrisabz",
      summary:
        "Private chauffeur via Shakhrisabz, Timur's birthplace — picnic lunch at the ruins of the Ak-Saray palace. Arrive Bukhara late afternoon, check in at Hotel Boutique Minzifa.",
      highlights: [
        "Shakhrisabz day stop",
        "Ak-Saray ruins picnic",
        "Hotel Boutique Minzifa",
      ],
      stay: "Hotel Boutique Minzifa, Bukhara",
    },
    {
      day: 5,
      city: "bukhara",
      title: "Bukhara monuments, master calligraphy class",
      summary:
        "Ark, Po-i-Kalyan, Trading Domes with a private guide. Afternoon: a two-hour calligraphy class with master Davron Toshev — you leave with a framed work.",
      highlights: [
        "Private Bukhara tour",
        "Calligraphy with Davron Toshev",
      ],
      stay: "Hotel Boutique Minzifa",
    },
    {
      day: 6,
      city: "bukhara",
      title: "Slow day, a suzani master, hamam",
      summary:
        "Visit a workshop run by 7th-generation suzani embroiderer Madina Kasimbaeva. Late afternoon hamam at the 16th-century Bozori Kord baths. Dinner at Minzifa Restaurant.",
      highlights: [
        "Suzani master workshop",
        "Bozori Kord hamam",
        "Minzifa dinner",
      ],
      stay: "Hotel Boutique Minzifa",
    },
    {
      day: 7,
      city: "khiva",
      title: "Fly to Khiva for the night",
      summary:
        "Morning flight Bukhara → Urgench, private transfer to Khiva. A single full day inside Itchan Kala, then check into a former madrasa cell at Orient Star Khiva. The hotel is the most photographable in the country.",
      highlights: [
        "Flight to Urgench",
        "Itchan Kala full day",
        "Sleep in a madrasa cell at Orient Star",
      ],
      stay: "Orient Star Khiva",
    },
    {
      day: 8,
      city: "khiva",
      title: "Farewell",
      summary:
        "Sunrise from the city walls. Morning flight Urgench → Tashkent → international departure.",
      highlights: ["Sunrise on the walls", "Flights home"],
    },
  ],
};

export const uzbekistanItineraries: Itinerary[] = [
  silkRoad7,
  uzbekistan10,
  weekendSamarkand,
  budgetStudent,
  luxurySilkRoad,
];
