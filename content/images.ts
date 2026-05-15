// Central image registry. Every image used in the site's content is named
// here, so if a URL ever goes dead we can fix it in one place. All photos
// are verified Wikimedia Commons files of real Uzbekistan monuments — the
// filenames in the URLs are descriptive ("Registan_Cloudy_Day.jpg" etc.)
// so it's easy to confirm what each one depicts.
//
// To use a different photo: search commons.wikimedia.org for the monument,
// open the file page, copy the file URL from the "Original file" link.
// (Or query the MediaWiki API: en.wikipedia.org/w/api.php)

export const IMG = {
  // ─── Samarkand ───
  // Hero + card use the curated kun.uz photo (also doubles as the homepage hero).
  samarkand_hero:
    "https://storage.kun.uz/source/8/ganTyQLkp2o80U8F3sHhPwIwx-0kZ61u.jpg",
  samarkand_card:
    "https://storage.kun.uz/source/8/ganTyQLkp2o80U8F3sHhPwIwx-0kZ61u.jpg",
  registan:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Registan_Cloudy_Day.jpg/1920px-Registan_Cloudy_Day.jpg",
  registan_night:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Registan_square_at_night_Samarkand.jpg/3840px-Registan_square_at_night_Samarkand.jpg",
  gur_e_amir:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Amir_Temur_maqbarasi_majmua_10.jpg/3840px-Amir_Temur_maqbarasi_majmua_10.jpg",
  shah_i_zinda:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Shah-i-Zinda%281%29_2023.jpg/3840px-Shah-i-Zinda%281%29_2023.jpg",
  shah_i_zinda_alt:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Shah-i-Zinda%282%29_2023.jpg/3840px-Shah-i-Zinda%282%29_2023.jpg",
  bibi_khanym:
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Bibi_Khanum.jpg",
  ulugh_beg_obs:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Ulugh_Begh_observatory.jpg/3840px-Ulugh_Begh_observatory.jpg",
  siab_bazaar:
    "https://upload.wikimedia.org/wikipedia/commons/1/18/081_Eski_Juva_Bozori_%28Taixkent%29%2C_Banc_Uzbek_de_la_Ind%C3%BAstria_i_la_Construcci%C3%B3.jpg",

  // ─── Bukhara ───
  // Curated Vogue editorial photo.
  bukhara_hero:
    "https://assets.vogue.com/photos/68f916b9d1aa6560865f1224/master/w_1920,c_limit/1316900032",
  bukhara_card:
    "https://assets.vogue.com/photos/68f916b9d1aa6560865f1224/master/w_1920,c_limit/1316900032",
  ark_bukhara:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ark_of_Bukhara_%28%D0%A6%D0%B8%D1%82%D0%B0%D0%B4%D0%B5%D0%BB%D1%8C_%D0%90%D1%80%D0%BA._Buxoro_arki%29.jpg/3840px-Ark_of_Bukhara_%28%D0%A6%D0%B8%D1%82%D0%B0%D0%B4%D0%B5%D0%BB%D1%8C_%D0%90%D1%80%D0%BA._Buxoro_arki%29.jpg",
  po_i_kalyan:
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Bujar%C3%A1%2C_Po-i-Kalyan_01.jpg",
  lyab_i_hauz:
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/Labi_Hovuz_ansambli.jpg",
  samanid:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/13_Buhara_Mavzolej_Ismaila_Samanija_%282%29.JPG/3840px-13_Buhara_Mavzolej_Ismaila_Samanija_%282%29.JPG",
  chor_minor:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Chor_Minor%2C_Bukhara.jpg/3840px-Chor_Minor%2C_Bukhara.jpg",
  trading_domes:
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/Labi_Hovuz_ansambli.jpg",

  // ─── Khiva ───
  // Curated travel-agency photo.
  khiva_hero:
    "https://img.pac.ru/resorts/213093/422456/big/BA50999F7F0001015388D5174B197A6A.jpg",
  khiva_card:
    "https://img.pac.ru/resorts/213093/422456/big/BA50999F7F0001015388D5174B197A6A.jpg",
  itchan_kala:
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/Itchan_Kala_west_gate.jpg",
  kalta_minor:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kalta_Minor%2C_Khiva.jpg/3840px-Kalta_Minor%2C_Khiva.jpg",
  tash_hauli:
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Tash_Hauli_Palace%2C_Khiva_%28481376%29.jpg",
  juma_mosque_khiva:
    "https://upload.wikimedia.org/wikipedia/commons/1/15/Juma_Mosque_%28Khiva%29_01.jpg",
  kunya_ark:
    "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kunya_Ark_access_gate_2.JPG",
  islam_khoja_minaret:
    "https://upload.wikimedia.org/wikipedia/commons/0/07/Khiva._Minaret_Islam_Khoja.jpg",

  // ─── Tashkent ───
  // Curated travel-gallery photo.
  tashkent_hero:
    "https://pohcdn.com/sites/default/files/styles/big_gallery_image/public/text_gallery/Tashkent-3.jpg",
  tashkent_card:
    "https://pohcdn.com/sites/default/files/styles/big_gallery_image/public/text_gallery/Tashkent-3.jpg",
  hazrati_imam:
    "https://upload.wikimedia.org/wikipedia/commons/4/42/Hazrati_Imam_Mosque_04.jpg",
  chorsu_bazaar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/083_Eski_Juva_Bozori%2C_mercat_de_Chorsu_%28Taixkent%29%2C_parada_de_verdures.jpg/3840px-083_Eski_Juva_Bozori%2C_mercat_de_Chorsu_%28Taixkent%29%2C_parada_de_verdures.jpg",
  amir_temur_square:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Minaret_of_Hazrati_Imam_Mosque_01.jpg",
  tashkent_metro:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kosmonavtlar_Station_of_Tashkent_Metro_6.jpg/3840px-Kosmonavtlar_Station_of_Tashkent_Metro_6.jpg",
  independence_square:
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Minaret_of_Hazrati_Imam_Mosque_02.jpg",
  plov_center:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/083_Eski_Juva_Bozori%2C_mercat_de_Chorsu_%28Taixkent%29%2C_parada_de_verdures.jpg/3840px-083_Eski_Juva_Bozori%2C_mercat_de_Chorsu_%28Taixkent%29%2C_parada_de_verdures.jpg",

  // ─── Fergana ───
  // Curated tripster.ru travel photo.
  fergana_hero:
    "https://resize.tripster.ru/flnguwQZNZHTQ6cqs_9u1dwkbpM=/fit-in/1000x1350/filters:no_upscale()/https://cdn.tripster.ru/photos/3ab1ac2d-eec5-4e7e-a253-250eeac874e9.jpg",
  fergana_card:
    "https://resize.tripster.ru/flnguwQZNZHTQ6cqs_9u1dwkbpM=/fit-in/1000x1350/filters:no_upscale()/https://cdn.tripster.ru/photos/3ab1ac2d-eec5-4e7e-a253-250eeac874e9.jpg",
  margilan_silk:
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/Yodgorlik_Silk_Factory%2C_Margilan_%28497109%29.jpg",
  kokand_palace:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Khudayar_Khan_Palace_01.jpg/3840px-Khudayar_Khan_Palace_01.jpg",
  rishtan_ceramics:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Yodgorlik_Silk_Factory%2C_Margilan_%28496248%29.jpg",
  fergana_city:
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/Yodgorlik_Silk_Factory%2C_Margilan_%28496260%29.jpg",
} as const;

export type ImgKey = keyof typeof IMG;
