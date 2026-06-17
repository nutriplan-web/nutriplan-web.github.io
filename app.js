// ===========================================================================
// IDIOMA GLOBAL DE LA APP: español ('es'), rumano ('ro') o inglés ('en').
// Cambia TODA la interfaz y también las recetas (menú, zumos y recetario):
// las traducciones de recetas se generan una vez con build_i18n.py y se
// empaquetan en i18n_ro.json, i18n_es.json, i18n_en.json, catalog_ro.json
// y catalog_en.json.
// ===========================================================================
const APP_LANGS = ['es', 'ro', 'en'];
let currentLang = (() => {
  try {
    const saved = localStorage.getItem('nutriplan-lang');
    return APP_LANGS.includes(saved) ? saved : 'es';
  } catch (e) { return 'es'; }
})();

const I18N = {
  es: {
    app_title: 'Recetario 365 — Menú semanal, +1000 recetas del mundo y lista de la compra',
    nav_plan: 'Plan', nav_day: 'Día', nav_recipes: 'Recetas', nav_cart: 'Lista', nav_profile: 'Perfil',
    nav_secciones: 'Colecciones',
    sec_title: 'Colecciones por secciones',
    sec_sub: 'Sopas frías, tapas, ensaladas, smoothies, salsas y más, organizados por tipo.',
    sec_all: 'Todas', sec_for: 'para 2 raciones',
    sec_only_compat: 'Solo aptos para mi dieta', sec_not_suitable: 'No apto para',
    sec_count: 'platos', sec_no_compat: 'No hay platos compatibles con tu dieta en esta sección.',
    mom_all: 'Cualquier momento', mom_desayuno: 'Desayuno', mom_comida: 'Comida', mom_cena: 'Cena',
    mom_merienda: 'Merienda', mom_aperitivo: 'Aperitivo', mom_postre: 'Postre', mom_guarnicion: 'Guarnición',
    sec_zumos: 'Zumos y bebidas funcionales',
    sec_zumos_note: 'Selecciona un beneficio (digestión, antioxidante, limpieza de hígado…). Son beneficios orientativos por sus ingredientes, no tratamientos médicos.',
    cuisine_es: 'Comida Española', cuisine_ro: 'Comida Rumana',
    weekly_menu: 'Menú Semanal', change_menu: 'Cambiar menú',
    badge_es: 'Cocina Española', badge_ro: 'Cocina Rumana',
    lang_label: 'Idioma: Español', season: 'Temporada', season_es_menu: 'Primavera', season_ro_menu: 'Verano',
    adaptive: 'Adaptativo', season_products: 'Productos de Temporada', current_menu: 'Menú actual',
    calories: 'Calorías', protein: 'Proteína', fats: 'Grasas', see_day_menu: 'Ver menú del día', nutri_score: 'Nutri-Score',
    servings: 'Comensales', servings_sub: 'Ajuste de porciones dinámicas',
    liquids_label: 'Líquidos Nutritivos', liquids_title: 'Smoothies y Jugos Saludables',
    breakfast: 'Desayuno', lunch: 'Almuerzo', dinner: 'Cena',
    category: 'Categoría', benefit: 'Beneficio', favorite: 'Favorito', favorite_active: 'Favorito ♥',
    dislike: 'No me gusta', ingredients: 'Ingredientes', cook_mode: 'Modo de cocinar', preparation: 'Preparación',
    meal_skipped: 'Esta comida está saltada.', nutrition_label: 'Nutrición por receta',
    protein_word: 'proteína', fat_word: 'grasa',
    qty_adjusted: 'Cantidades ajustadas según porciones.', style: 'Estilo',
    style_saludable: 'Saludable', style_normal: 'Normal', portions: 'Porciones', other_options: 'Otras opciones',
    adapted_badge: 'Adaptado a tu configuración', allergens: 'Alérgenos', no_allergens: 'sin alérgenos comunes detectados',
    allergen_note: 'Orientativo: con dietas o exclusiones activas el plato se adapta; verifica siempre el etiquetado.',
    alg_gluten: 'gluten', alg_crustaceos: 'crustáceos', alg_huevo: 'huevo', alg_pescado: 'pescado',
    alg_cacahuete: 'cacahuetes', alg_soja: 'soja', alg_lacteos: 'lácteos', alg_frutos: 'frutos de cáscara',
    alg_apio: 'apio', alg_mostaza: 'mostaza', alg_sesamo: 'sésamo', alg_sulfitos: 'sulfitos',
    alg_altramuz: 'altramuces', alg_moluscos: 'moluscos',
    toast_week_changed: 'Menú de la semana cambiado', toast_lang: 'Idioma cambiado a español',
    catalog_title: 'Recetario completo',
    catalog_sub: 'Más de 1100 platos del mundo, todos con su receta completa: ingredientes, cantidades y preparación paso a paso.',
    search_ph: 'Busca un plato o lo que tienes: pollo, arroz...', qty_note: 'Las cantidades se ajustan',
    dishes_count: 'platos', loading_catalog: 'Cargando recetas de todo el mundo…',
    no_results: 'No hay platos que coincidan con tu búsqueda.', see_more: 'Ver más platos',
    chip_all: 'Todos', chip_fav: 'Favoritos ♥', chip_top: '⭐ Top mundial', all_benefits: 'Todos los beneficios',
    top_note: 'Los platos más famosos y valorados de la cocina mundial, seleccionados del recetario.',
    add_to_list: 'Añadir a la lista', full_recipe: 'Ver receta completa', see_less: 'Ver menos',
    typical_dish: 'Plato típico de', traditional_recipe: 'Receta tradicional de',
    glasses: 'vasos', diners: 'comensales',
    no_qty_toast: 'Esta receta no tiene cantidades detalladas', added_list_toast: 'Añadido a la lista', added_toast: 'Añadido',
    cart_title: 'Lista de la Compra', cart_sub: 'Sugerencias inteligentes basadas en tu plan semanal.',
    extra_ph: 'Añadir algo extra y pulsa Enter...', shop_mode: 'Modo de compra', shop_mode_sub: 'Diaria o semanal',
    daily: 'Diaria', weekly: 'Semanal', copy_btn: 'Copiar',
    list_header: '🛒 Lista de la compra · Recetario 365', from_menu: '— Del menú —', added_by_you: 'Añadido por ti',
    clear: 'Vaciar', for_day: 'para día', for_week: 'para semana',
    empty_list: 'Lista de la compra adaptada: selecciona un menú o añade recetas desde la pestaña Recetas.',
    copied: 'Lista copiada al portapapeles', copy_fail: 'No se pudo copiar', copy_unsupported: 'Tu navegador no permite copiar',
    menu_ings: 'Ingredientes del menú',
    profile_title: 'Configuración Nutricional', profile_sub: 'Ajustes directos del motor adaptativo.',
    diet_title: 'Tipo de Dieta Primaria', diet_vegana: 'Vegana', diet_vegetariana: 'Vegetariana', diet_keto: 'Keto',
    diet_mediterranea: 'Mediterránea', diet_baja: 'Baja en carbohidratos', diet_active: 'Dieta activa', diet_none: 'Ninguna',
    diet_celiaco: 'Celíaca (sin gluten)', diet_diabetico: 'Diabética (control de azúcares)',
    diet_sub: 'Vegetariana: sin carne ni pescado (sí huevo y lácteos). Vegana: sin ningún producto animal (tampoco huevo, lácteos ni miel).',
    diet_celiaco_info: 'Excluye trigo, cebada, centeno y derivados (pan, pasta, rebozados, cerveza). Prioriza alimentos naturalmente sin gluten: arroz, maíz, patata, legumbres, carne, pescado, huevo, fruta y verdura. Verifica siempre el sello «sin gluten» en productos procesados.',
    diet_celiaco_src: 'Basado en las guías de FACE (Federación de Asociaciones de Celíacos de España) y AESAN.',
    diet_diabetico_info: 'Limita azúcares libres y harinas refinadas (bollería, zumos azucarados, dulces). Prioriza hidratos integrales, legumbres, verduras, proteína magra y grasas saludables, repartiendo los hidratos a lo largo del día.',
    diet_diabetico_src: 'Basado en las recomendaciones de la ADA (American Diabetes Association) y redGDPS.',
    menu_style_title: 'Estilo de Menú', menu_active: 'Menú activo', allergy_title: 'Exclusiones Alérgicas',
    no_gluten: 'Sin gluten', no_gluten_sub: 'Adapta automáticamente el menú',
    no_lactose: 'Sin lactosa', no_lactose_sub: 'Sin lácteos en recetas',
    no_nuts: 'Sin frutos secos', no_nuts_sub: 'Evita nueces y frutos de cáscara',
    no_seafood: 'Sin marisco', no_seafood_sub: 'Evita crustáceos y moluscos', adapted: 'Adaptado',
    video_link: 'Vídeos más vistos de esta receta',
    sources_title: 'Fuentes de nutrición', sources_sub: 'Guías oficiales en las que se apoya el estilo Saludable',
    sources_text: 'Las pautas del menú saludable (más verdura, legumbre y pescado; menos azúcar, carne procesada y sal) siguen las recomendaciones de estos organismos:',
    source_who: 'OMS — Alimentación sana', source_harvard: 'El Plato para Comer Saludable — Univ. de Harvard', source_aesan: 'AESAN — Estrategia NAOS (España)',
    lang_title: 'Idioma / Limbă / Language', lang_sub: 'Toda la app en español, rumano o inglés',
    appearance: 'Apariencia', dark_mode: 'Modo oscuro', dark_sub: 'Cambia el aspecto de la app',
    activate: 'Activar', deactivate: 'Desactivar', print_btn: 'Imprimir / Guardar como PDF',
    about: 'Acerca de Recetario 365', visits: 'Visitas a la página', visits_sub: 'Personas que han abierto la app',
    legal: 'Aviso legal',
    legal_text: 'Recetario 365 es una aplicación gratuita de uso personal y orientativo. El contenido se ofrece "tal cual", sin garantías. El responsable de la web no se hace responsable del uso que se haga de la información ni de errores u omisiones en recetas, cantidades o datos nutricionales.',
    privacy: 'Privacidad y datos',
    privacy_t1: 'No se solicita registro ni datos personales. Tus preferencias (dieta, comensales, lista de la compra, favoritos) se guardan solo en tu navegador (localStorage) y no se envían a ningún servidor propio.',
    privacy_t2: 'Para mostrar recetas, fotos y traducciones, la app consulta servicios externos gratuitos (ver Créditos). El contador de visitas guarda únicamente un número total y anónimo, sin identificarte.',
    nutri_notice: 'Aviso nutricional',
    nutri_text: 'La información nutricional, los alérgenos detectados y las adaptaciones por dieta o alergias son orientativos y no sustituyen el consejo de un médico o dietista-nutricionista. Si tienes alergias o intolerancias, verifica siempre los ingredientes de cada producto antes de consumirlo.',
    credits: 'Créditos de datos',
    credits_text: 'Recetas e imágenes: TheMealDB y Wikimedia/Wikipedia. Traducciones: servicios de traducción gratuitos. Iconos: Material Symbols (Google). Contador: abacus.jasoncameron.dev. Cada servicio pertenece a sus respectivos propietarios.',
    footer: 'Recetario 365 · Hecho con 💚'
  },
  ro: {
    app_title: 'Recetario 365 — Meniu săptămânal, +1000 de rețete din lume și listă de cumpărături',
    nav_plan: 'Plan', nav_day: 'Azi', nav_recipes: 'Rețete', nav_cart: 'Listă', nav_profile: 'Profil',
    nav_secciones: 'Colecții',
    sec_title: 'Colecții pe secțiuni',
    sec_sub: 'Supe reci, tapas, salate, smoothie-uri, sosuri și altele, organizate pe tipuri.',
    sec_all: 'Toate', sec_for: 'pentru 2 porții',
    sec_only_compat: 'Doar potrivite pentru dieta mea', sec_not_suitable: 'Nepotrivit pentru',
    sec_count: 'feluri', sec_no_compat: 'Nu există feluri compatibile cu dieta ta în această secțiune.',
    mom_all: 'Orice moment', mom_desayuno: 'Mic dejun', mom_comida: 'Prânz', mom_cena: 'Cină',
    mom_merienda: 'Gustare', mom_aperitivo: 'Aperitiv', mom_postre: 'Desert', mom_guarnicion: 'Garnitură',
    sec_zumos: 'Sucuri și băuturi funcționale',
    sec_zumos_note: 'Alege un beneficiu (digestie, antioxidant, detoxifiere ficat…). Sunt beneficii orientative datorate ingredientelor, nu tratamente medicale.',
    cuisine_es: 'Mâncare Spaniolă', cuisine_ro: 'Mâncare Românească',
    weekly_menu: 'Meniu Săptămânal', change_menu: 'Schimbă meniul',
    badge_es: 'Bucătărie Spaniolă', badge_ro: 'Bucătărie Românească',
    lang_label: 'Limbă: Română', season: 'Sezon', season_es_menu: 'Primăvară', season_ro_menu: 'Vară',
    adaptive: 'Adaptiv', season_products: 'Produse de sezon', current_menu: 'Meniu actual',
    calories: 'Calorii', protein: 'Proteine', fats: 'Grăsimi', see_day_menu: 'Vezi meniul zilei', nutri_score: 'Nutri-Score',
    servings: 'Persoane', servings_sub: 'Ajustare dinamică a porțiilor',
    liquids_label: 'Lichide Nutritive', liquids_title: 'Smoothie-uri și Sucuri Sănătoase',
    breakfast: 'Mic dejun', lunch: 'Prânz', dinner: 'Cină',
    category: 'Categorie', benefit: 'Beneficiu', favorite: 'Favorit', favorite_active: 'Favorit ♥',
    dislike: 'Nu îmi place', ingredients: 'Ingrediente', cook_mode: 'Mod de preparare', preparation: 'Preparare',
    meal_skipped: 'Această masă este sărită.', nutrition_label: 'Nutriție per rețetă',
    protein_word: 'proteine', fat_word: 'grăsimi',
    qty_adjusted: 'Cantități ajustate după porții.', style: 'Stil',
    style_saludable: 'Sănătos', style_normal: 'Normal', portions: 'Porții', other_options: 'Alte opțiuni',
    adapted_badge: 'Adaptat la setările tale', allergens: 'Alergeni', no_allergens: 'fără alergeni comuni detectați',
    allergen_note: 'Orientativ: cu diete sau excluderi active felul se adaptează; verifică întotdeauna eticheta.',
    alg_gluten: 'gluten', alg_crustaceos: 'crustacee', alg_huevo: 'ou', alg_pescado: 'pește',
    alg_cacahuete: 'arahide', alg_soja: 'soia', alg_lacteos: 'lactate', alg_frutos: 'fructe cu coajă',
    alg_apio: 'țelină', alg_mostaza: 'muștar', alg_sesamo: 'susan', alg_sulfitos: 'sulfiți',
    alg_altramuz: 'lupin', alg_moluscos: 'moluște',
    toast_week_changed: 'Meniul săptămânii a fost schimbat', toast_lang: 'Limba a fost schimbată în română',
    catalog_title: 'Rețetar complet',
    catalog_sub: 'Peste 1100 de feluri din toată lumea, toate cu rețeta completă: ingrediente, cantități și preparare pas cu pas.',
    search_ph: 'Caută un fel sau ce ai în casă: pui, orez...', qty_note: 'Cantitățile se ajustează',
    dishes_count: 'feluri', loading_catalog: 'Se încarcă rețete din toată lumea…',
    no_results: 'Nu există feluri care să corespundă căutării tale.', see_more: 'Vezi mai multe feluri',
    chip_all: 'Toate', chip_fav: 'Favorite ♥', chip_top: '⭐ Top mondial', all_benefits: 'Toate beneficiile',
    top_note: 'Cele mai faimoase și apreciate feluri din bucătăria lumii, selectate din rețetar.',
    add_to_list: 'Adaugă în listă', full_recipe: 'Vezi rețeta completă', see_less: 'Vezi mai puțin',
    typical_dish: 'Fel tipic din', traditional_recipe: 'Rețetă tradițională din',
    glasses: 'pahare', diners: 'persoane',
    no_qty_toast: 'Această rețetă nu are cantități detaliate', added_list_toast: 'Adăugat în listă', added_toast: 'Adăugat',
    cart_title: 'Listă de Cumpărături', cart_sub: 'Sugestii inteligente bazate pe planul tău săptămânal.',
    extra_ph: 'Adaugă ceva extra și apasă Enter...', shop_mode: 'Mod de cumpărături', shop_mode_sub: 'Zilnic sau săptămânal',
    daily: 'Zilnic', weekly: 'Săptămânal', copy_btn: 'Copiază',
    list_header: '🛒 Listă de cumpărături · Recetario 365', from_menu: '— Din meniu —', added_by_you: 'Adăugat de tine',
    clear: 'Golește', for_day: 'pentru o zi', for_week: 'pentru o săptămână',
    empty_list: 'Listă de cumpărături adaptată: alege un meniu sau adaugă rețete din fila Rețete.',
    copied: 'Listă copiată în clipboard', copy_fail: 'Nu s-a putut copia', copy_unsupported: 'Browserul tău nu permite copierea',
    menu_ings: 'Ingredientele meniului',
    profile_title: 'Configurare Nutrițională', profile_sub: 'Setări directe ale motorului adaptiv.',
    diet_title: 'Tip de Dietă Principală', diet_vegana: 'Vegană', diet_vegetariana: 'Vegetariană', diet_keto: 'Keto',
    diet_mediterranea: 'Mediteraneană', diet_baja: 'Săracă în carbohidrați', diet_active: 'Dietă activă', diet_none: 'Niciuna',
    diet_celiaco: 'Celiacă (fără gluten)', diet_diabetico: 'Diabetică (control al zahărului)',
    diet_sub: 'Vegetariană: fără carne și pește (dar cu ouă și lactate). Vegană: fără niciun produs animal (fără ouă, lactate sau miere).',
    diet_celiaco_info: 'Exclude grâul, orzul, secara și derivatele (pâine, paste, pane, bere). Prioritizează alimente fără gluten în mod natural: orez, porumb, cartof, leguminoase, carne, pește, ou, fructe și legume. Verifică întotdeauna marcajul «fără gluten» pe produsele procesate.',
    diet_celiaco_src: 'Bazat pe ghidurile FACE (Federația Asociațiilor de Celiaci din Spania) și AESAN.',
    diet_diabetico_info: 'Limitează zaharurile libere și făinurile rafinate (patiserie, sucuri îndulcite, dulciuri). Prioritizează carbohidrați integrali, leguminoase, legume, proteină slabă și grăsimi sănătoase, distribuind carbohidrații pe parcursul zilei.',
    diet_diabetico_src: 'Bazat pe recomandările ADA (American Diabetes Association) și redGDPS.',
    menu_style_title: 'Stil de Meniu', menu_active: 'Meniu activ', allergy_title: 'Excluderi Alergice',
    no_gluten: 'Fără gluten', no_gluten_sub: 'Adaptează automat meniul',
    no_lactose: 'Fără lactoză', no_lactose_sub: 'Fără lactate în rețete',
    no_nuts: 'Fără fructe cu coajă', no_nuts_sub: 'Evită nucile și alunele',
    no_seafood: 'Fără fructe de mare', no_seafood_sub: 'Evită crustaceele și moluștele', adapted: 'Adaptat',
    video_link: 'Cele mai vizionate clipuri cu această rețetă',
    sources_title: 'Surse de nutriție', sources_sub: 'Ghidurile oficiale pe care se bazează stilul Sănătos',
    sources_text: 'Regulile meniului sănătos (mai multe legume, leguminoase și pește; mai puțin zahăr, carne procesată și sare) urmează recomandările acestor organisme:',
    source_who: 'OMS — Alimentație sănătoasă', source_harvard: 'Farfuria Alimentației Sănătoase — Univ. Harvard', source_aesan: 'AESAN — Strategia NAOS (Spania)',
    lang_title: 'Limbă / Idioma / Language', lang_sub: 'Toată aplicația în spaniolă, română sau engleză',
    appearance: 'Aspect', dark_mode: 'Mod întunecat', dark_sub: 'Schimbă aspectul aplicației',
    activate: 'Activează', deactivate: 'Dezactivează', print_btn: 'Tipărește / Salvează ca PDF',
    about: 'Despre Recetario 365', visits: 'Vizite pe pagină', visits_sub: 'Persoane care au deschis aplicația',
    legal: 'Aviz legal',
    legal_text: 'Recetario 365 este o aplicație gratuită de uz personal și orientativ. Conținutul este oferit "ca atare", fără garanții. Responsabilul site-ului nu răspunde pentru folosirea informațiilor și nici pentru erori sau omisiuni în rețete, cantități sau date nutriționale.',
    privacy: 'Confidențialitate și date',
    privacy_t1: 'Nu se cere înregistrare și nici date personale. Preferințele tale (dietă, persoane, listă de cumpărături, favorite) se salvează doar în browserul tău (localStorage) și nu se trimit către niciun server propriu.',
    privacy_t2: 'Pentru a afișa rețete, fotografii și traduceri, aplicația folosește servicii externe gratuite (vezi Credite). Contorul de vizite păstrează doar un număr total și anonim, fără să te identifice.',
    nutri_notice: 'Aviz nutrițional',
    nutri_text: 'Informațiile nutriționale, alergenii detectați și adaptările pentru diete sau alergii sunt orientative și nu înlocuiesc sfatul unui medic sau dietetician-nutriționist. Dacă ai alergii sau intoleranțe, verifică întotdeauna ingredientele fiecărui produs înainte de a-l consuma.',
    credits: 'Credite de date',
    credits_text: 'Rețete și imagini: TheMealDB și Wikimedia/Wikipedia. Traduceri: servicii gratuite de traducere. Pictograme: Material Symbols (Google). Contor: abacus.jasoncameron.dev. Fiecare serviciu aparține proprietarilor săi.',
    footer: 'Recetario 365 · Făcut cu 💚'
  },
  en: {
    app_title: 'Recetario 365 — Weekly menu, 1000+ world recipes and shopping list',
    nav_plan: 'Plan', nav_day: 'Today', nav_recipes: 'Recipes', nav_cart: 'List', nav_profile: 'Profile',
    nav_secciones: 'Collections',
    sec_title: 'Collections by section',
    sec_sub: 'Cold soups, tapas, salads, smoothies, sauces and more, organised by type.',
    sec_all: 'All', sec_for: 'for 2 servings',
    sec_only_compat: 'Only suitable for my diet', sec_not_suitable: 'Not suitable for',
    sec_count: 'dishes', sec_no_compat: 'No dishes compatible with your diet in this section.',
    mom_all: 'Any time', mom_desayuno: 'Breakfast', mom_comida: 'Lunch', mom_cena: 'Dinner',
    mom_merienda: 'Snack', mom_aperitivo: 'Aperitif', mom_postre: 'Dessert', mom_guarnicion: 'Side',
    sec_zumos: 'Juices and functional drinks',
    sec_zumos_note: 'Pick a benefit (digestion, antioxidant, liver cleanse…). These are indicative benefits from the ingredients, not medical treatments.',
    cuisine_es: 'Spanish Food', cuisine_ro: 'Romanian Food',
    weekly_menu: 'Weekly Menu', change_menu: 'Change menu',
    badge_es: 'Spanish Cuisine', badge_ro: 'Romanian Cuisine',
    lang_label: 'Language: English', season: 'Season', season_es_menu: 'Spring', season_ro_menu: 'Summer',
    adaptive: 'Adaptive', season_products: 'Seasonal Produce', current_menu: 'Current menu',
    calories: 'Calories', protein: 'Protein', fats: 'Fats', see_day_menu: 'See today’s menu', nutri_score: 'Nutri-Score',
    servings: 'Diners', servings_sub: 'Dynamic portion adjustment',
    liquids_label: 'Nutritious Drinks', liquids_title: 'Healthy Smoothies and Juices',
    breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner',
    category: 'Category', benefit: 'Benefit', favorite: 'Favourite', favorite_active: 'Favourite ♥',
    dislike: 'Not for me', ingredients: 'Ingredients', cook_mode: 'How to cook it', preparation: 'Preparation',
    meal_skipped: 'This meal is skipped.', nutrition_label: 'Nutrition per recipe',
    protein_word: 'protein', fat_word: 'fat',
    qty_adjusted: 'Quantities adjusted to the portions.', style: 'Style',
    style_saludable: 'Healthy', style_normal: 'Regular', portions: 'Portions', other_options: 'Other options',
    adapted_badge: 'Adapted to your settings', allergens: 'Allergens', no_allergens: 'no common allergens detected',
    allergen_note: 'Indicative: with active diets or exclusions the dish is adapted; always check product labels.',
    alg_gluten: 'gluten', alg_crustaceos: 'crustaceans', alg_huevo: 'egg', alg_pescado: 'fish',
    alg_cacahuete: 'peanuts', alg_soja: 'soy', alg_lacteos: 'dairy', alg_frutos: 'tree nuts',
    alg_apio: 'celery', alg_mostaza: 'mustard', alg_sesamo: 'sesame', alg_sulfitos: 'sulphites',
    alg_altramuz: 'lupin', alg_moluscos: 'molluscs',
    toast_week_changed: 'Weekly menu changed', toast_lang: 'Language switched to English',
    catalog_title: 'Complete recipe book',
    catalog_sub: 'Over 1100 dishes from around the world, all with the full recipe: ingredients, quantities and step-by-step preparation.',
    search_ph: 'Search a dish or what you have: chicken, rice...', qty_note: 'Quantities adjust automatically',
    dishes_count: 'dishes', loading_catalog: 'Loading recipes from around the world…',
    no_results: 'No dishes match your search.', see_more: 'See more dishes',
    chip_all: 'All', chip_fav: 'Favourites ♥', chip_top: '⭐ World top', all_benefits: 'All benefits',
    top_note: 'The most famous and best-loved dishes of world cuisine, selected from the recipe book.',
    add_to_list: 'Add to list', full_recipe: 'See full recipe', see_less: 'See less',
    typical_dish: 'Typical dish from', traditional_recipe: 'Traditional recipe from',
    glasses: 'glasses', diners: 'diners',
    no_qty_toast: 'This recipe has no detailed quantities', added_list_toast: 'Added to the list', added_toast: 'Added',
    cart_title: 'Shopping List', cart_sub: 'Smart suggestions based on your weekly plan.',
    extra_ph: 'Add something extra and press Enter...', shop_mode: 'Shopping mode', shop_mode_sub: 'Daily or weekly',
    daily: 'Daily', weekly: 'Weekly', copy_btn: 'Copy',
    list_header: '🛒 Shopping list · Recetario 365', from_menu: '— From the menu —', added_by_you: 'Added by you',
    clear: 'Clear', for_day: 'for one day', for_week: 'for one week',
    empty_list: 'Adaptive shopping list: pick a menu or add recipes from the Recipes tab.',
    copied: 'List copied to clipboard', copy_fail: 'Could not copy', copy_unsupported: 'Your browser does not allow copying',
    menu_ings: 'Menu ingredients',
    profile_title: 'Nutrition Settings', profile_sub: 'Direct controls of the adaptive engine.',
    diet_title: 'Primary Diet Type', diet_vegana: 'Vegan', diet_vegetariana: 'Vegetarian', diet_keto: 'Keto',
    diet_mediterranea: 'Mediterranean', diet_baja: 'Low carb', diet_active: 'Active diet', diet_none: 'None',
    diet_celiaco: 'Coeliac (gluten-free)', diet_diabetico: 'Diabetic (sugar control)',
    diet_sub: 'Vegetarian: no meat or fish (eggs and dairy are fine). Vegan: no animal products at all (no eggs, dairy or honey).',
    diet_celiaco_info: 'Excludes wheat, barley, rye and derivatives (bread, pasta, breaded foods, beer). Prioritises naturally gluten-free foods: rice, maize, potato, pulses, meat, fish, egg, fruit and vegetables. Always check the «gluten-free» label on processed products.',
    diet_celiaco_src: 'Based on the guidelines of FACE (Spanish Coeliac Associations Federation) and AESAN.',
    diet_diabetico_info: 'Limits free sugars and refined flours (pastries, sweetened juices, sweets). Prioritises wholegrain carbs, pulses, vegetables, lean protein and healthy fats, spreading carbs throughout the day.',
    diet_diabetico_src: 'Based on the recommendations of the ADA (American Diabetes Association) and redGDPS.',
    menu_style_title: 'Menu Style', menu_active: 'Active menu', allergy_title: 'Allergy Exclusions',
    no_gluten: 'Gluten free', no_gluten_sub: 'Adapts the menu automatically',
    no_lactose: 'Lactose free', no_lactose_sub: 'No dairy in recipes',
    no_nuts: 'Nut free', no_nuts_sub: 'Avoids walnuts and tree nuts',
    no_seafood: 'Shellfish free', no_seafood_sub: 'Avoids crustaceans and molluscs', adapted: 'Adapted',
    video_link: 'Most viewed videos of this recipe',
    sources_title: 'Nutrition sources', sources_sub: 'Official guidelines behind the Healthy style',
    sources_text: 'The healthy menu rules (more vegetables, legumes and fish; less sugar, processed meat and salt) follow the recommendations of these organisations:',
    source_who: 'WHO — Healthy diet', source_harvard: 'The Healthy Eating Plate — Harvard Univ.', source_aesan: 'AESAN — NAOS Strategy (Spain)',
    lang_title: 'Language / Idioma / Limbă', lang_sub: 'The whole app in Spanish, Romanian or English',
    appearance: 'Appearance', dark_mode: 'Dark mode', dark_sub: 'Changes the look of the app',
    activate: 'Turn on', deactivate: 'Turn off', print_btn: 'Print / Save as PDF',
    about: 'About Recetario 365', visits: 'Page visits', visits_sub: 'People who have opened the app',
    legal: 'Legal notice',
    legal_text: 'Recetario 365 is a free app for personal, informational use. The content is provided "as is", without warranties. The site owner is not responsible for the use of this information or for errors or omissions in recipes, quantities or nutrition data.',
    privacy: 'Privacy and data',
    privacy_t1: 'No sign-up or personal data is requested. Your preferences (diet, diners, shopping list, favourites) are stored only in your browser (localStorage) and are never sent to any server of our own.',
    privacy_t2: 'To show recipes, photos and translations, the app uses free external services (see Credits). The visit counter stores only an anonymous total number, without identifying you.',
    nutri_notice: 'Nutrition notice',
    nutri_text: 'Nutrition information, detected allergens and diet or allergy adaptations are indicative and do not replace the advice of a doctor or registered dietitian. If you have allergies or intolerances, always check the ingredients of every product before eating it.',
    credits: 'Data credits',
    credits_text: 'Recipes and images: TheMealDB and Wikimedia/Wikipedia. Translations: free translation services. Icons: Material Symbols (Google). Counter: abacus.jasoncameron.dev. Each service belongs to its respective owners.',
    footer: 'Recetario 365 · Made with 💚'
  }
};

function t(key) {
  const lang = I18N[currentLang] || I18N.es;
  if (key in lang) return lang[key];
  return key in I18N.es ? I18N.es[key] : key;
}

// Traducción de categorías, países, beneficios y tipos de bebida (solo al rumano;
// en español se muestran tal cual vienen en los datos).
const CAT_RO = {
  'Aperitivos': 'Aperitive', 'Arroz': 'Orez', 'Carne': 'Carne', 'Cerdo': 'Porc', 'Cordero': 'Miel',
  'Desayuno': 'Mic dejun', 'Ensaladas': 'Salate', 'Guarnición': 'Garnituri', 'Panadería': 'Panificație',
  'Pasta': 'Paste', 'Pescado y marisco': 'Pește și fructe de mare', 'Pollo': 'Pui', 'Postres': 'Deserturi',
  'Sopas': 'Supe', 'Varios': 'Diverse', 'Vegano': 'Vegan', 'Vegetariano': 'Vegetarian',
  'Platos principales': 'Feluri principale', 'Zumos y batidos': 'Sucuri și smoothie-uri',
  'General': 'General', 'Bebida': 'Băutură'
};
const AREA_RO = {
  'Alemania': 'Germania', 'Argelina': 'Algeriană', 'Argentina': 'Argentina', 'Australia': 'Australia',
  'Australiana': 'Australiană', 'Austria': 'Austria', 'Bolivia': 'Bolivia', 'Brasil': 'Brazilia',
  'Britanica': 'Britanică', 'Bélgica': 'Belgia', 'Canadiense': 'Canadiană', 'Canadá': 'Canada',
  'Chile': 'Chile', 'China': 'China', 'Colombia': 'Columbia', 'Corea del Sur': 'Coreea de Sud',
  'Croata': 'Croată', 'Cuba': 'Cuba', 'Ecuador': 'Ecuador', 'Egipcia': 'Egipteană', 'Egipto': 'Egipt',
  'Espanola': 'Spaniolă', 'España': 'Spania', 'Estados Unidos': 'Statele Unite', 'Etiopía': 'Etiopia',
  'Filipina': 'Filipineză', 'Filipinas': 'Filipine', 'France': 'Franța', 'Francia': 'Franța',
  'Grecia': 'Grecia', 'Griega': 'Grecească', 'Hungría': 'Ungaria', 'India': 'India', 'Indonesia': 'Indonezia',
  'Internacional': 'Internațional', 'Irlanda': 'Irlanda', 'Irlandesa': 'Irlandeză', 'Irán': 'Iran',
  'Israel': 'Israel', 'Italia': 'Italia', 'Italiana': 'Italiană', 'Jamaica': 'Jamaica',
  'Jamaicana': 'Jamaicană', 'Japonesa': 'Japoneză', 'Japón': 'Japonia', 'Keniana': 'Keniană',
  'Líbano': 'Liban', 'Malasia': 'Malaezia', 'Marroqui': 'Marocană', 'Marruecos': 'Maroc',
  'Mexicana': 'Mexicană', 'México': 'Mexic', 'Netherlands': 'Țările de Jos', 'Nigeria': 'Nigeria',
  'Norway': 'Norvegia', 'Pakistán': 'Pakistan', 'Países Bajos': 'Țările de Jos', 'Perú': 'Peru',
  'Polaca': 'Poloneză', 'Polonia': 'Polonia', 'Portugal': 'Portugalia', 'Portuguesa': 'Portugheză',
  'Reino Unido': 'Regatul Unit', 'Rusa': 'Rusească', 'Rusia': 'Rusia', 'Saudi': 'Arabia Saudită',
  'Singapur': 'Singapore', 'Siria': 'Siria', 'Slovakia': 'Slovacia', 'Sudáfrica': 'Africa de Sud',
  'Suecia': 'Suedia', 'Suiza': 'Elveția', 'Tailandesa': 'Tailandeză', 'Tailandia': 'Tailanda',
  'Tunecina': 'Tunisiană', 'Turca': 'Turcească', 'Turquía': 'Turcia', 'Ucraniana': 'Ucraineană',
  'United States': 'Statele Unite', 'Uruguaya': 'Uruguayană', 'Venezuela': 'Venezuela',
  'Vietnam': 'Vietnam', 'Vietnamita': 'Vietnameză', 'Rumanía': 'România', 'Saludable': 'Sănătos'
};
const BENEFIT_RO = {
  'Inmunidad': 'Imunitate', 'Energía': 'Energie', 'Detox': 'Detox', 'Digestión': 'Digestie',
  'Vista': 'Vedere', 'Deporte': 'Sport', 'Corazón': 'Inimă', 'Antioxidante': 'Antioxidant',
  'Hidratación': 'Hidratare', 'Saciante': 'Sățios', 'Piel': 'Piele', 'Huesos': 'Oase',
  'Limpieza hígado': 'Detoxifiere ficat', 'Antiinflamatorio': 'Antiinflamator', 'Energético': 'Energizant',
  'Depurativo': 'Depurativ', 'Digestivo': 'Digestiv', 'Refrescante': 'Răcoritor', 'Relajante': 'Relaxant',
  'Recuperación muscular': 'Recuperare musculară', 'Drenante linfático': 'Drenaj limfatic',
  'Antioxidante · Granada + Moras + Limón': null
};
const TYPE_RO = { 'Zumo': 'Suc', 'Batido': 'Shake', 'Smoothie': 'Smoothie' };

// Mapas equivalentes al inglés (los datos originales están en español).
const CAT_EN = {
  'Aperitivos': 'Starters', 'Arroz': 'Rice', 'Carne': 'Meat', 'Cerdo': 'Pork', 'Cordero': 'Lamb',
  'Desayuno': 'Breakfast', 'Ensaladas': 'Salads', 'Guarnición': 'Side dishes', 'Panadería': 'Bakery',
  'Pasta': 'Pasta', 'Pescado y marisco': 'Fish and seafood', 'Pollo': 'Chicken', 'Postres': 'Desserts',
  'Sopas': 'Soups', 'Varios': 'Miscellaneous', 'Vegano': 'Vegan', 'Vegetariano': 'Vegetarian',
  'Platos principales': 'Main courses', 'Zumos y batidos': 'Juices and smoothies',
  'General': 'General', 'Bebida': 'Drink'
};
const AREA_EN = {
  'Alemania': 'Germany', 'Argelina': 'Algerian', 'Australiana': 'Australian', 'Brasil': 'Brazil',
  'Britanica': 'British', 'Bélgica': 'Belgium', 'Canadiense': 'Canadian', 'Canadá': 'Canada',
  'Corea del Sur': 'South Korea', 'Croata': 'Croatian', 'Egipcia': 'Egyptian', 'Egipto': 'Egypt',
  'Espanola': 'Spanish', 'España': 'Spain', 'Estados Unidos': 'United States', 'Etiopía': 'Ethiopia',
  'Filipina': 'Filipino', 'Filipinas': 'Philippines', 'Francia': 'France', 'Grecia': 'Greece',
  'Griega': 'Greek', 'Hungría': 'Hungary', 'Indonesia': 'Indonesia', 'Internacional': 'International',
  'Irlanda': 'Ireland', 'Irlandesa': 'Irish', 'Irán': 'Iran', 'Italia': 'Italy', 'Italiana': 'Italian',
  'Jamaicana': 'Jamaican', 'Japonesa': 'Japanese', 'Japón': 'Japan', 'Keniana': 'Kenyan',
  'Líbano': 'Lebanon', 'Malasia': 'Malaysia', 'Marroqui': 'Moroccan', 'Marruecos': 'Morocco',
  'Mexicana': 'Mexican', 'México': 'Mexico', 'Pakistán': 'Pakistan', 'Países Bajos': 'Netherlands',
  'Perú': 'Peru', 'Polaca': 'Polish', 'Polonia': 'Poland', 'Portuguesa': 'Portuguese',
  'Reino Unido': 'United Kingdom', 'Rusa': 'Russian', 'Rusia': 'Russia', 'Saudi': 'Saudi Arabia',
  'Singapur': 'Singapore', 'Siria': 'Syria', 'Slovakia': 'Slovakia', 'Sudáfrica': 'South Africa',
  'Suecia': 'Sweden', 'Suiza': 'Switzerland', 'Tailandesa': 'Thai', 'Tailandia': 'Thailand',
  'Tunecina': 'Tunisian', 'Turca': 'Turkish', 'Turquía': 'Turkey', 'Ucraniana': 'Ukrainian',
  'Uruguaya': 'Uruguayan', 'Vietnamita': 'Vietnamese', 'Rumanía': 'Romania', 'Saludable': 'Healthy'
};
const BENEFIT_EN = {
  'Inmunidad': 'Immunity', 'Energía': 'Energy', 'Detox': 'Detox', 'Digestión': 'Digestion',
  'Vista': 'Eyesight', 'Deporte': 'Sport', 'Corazón': 'Heart', 'Antioxidante': 'Antioxidant',
  'Hidratación': 'Hydration', 'Saciante': 'Filling', 'Piel': 'Skin', 'Huesos': 'Bones',
  'Limpieza hígado': 'Liver cleanse', 'Antiinflamatorio': 'Anti-inflammatory', 'Energético': 'Energising',
  'Depurativo': 'Cleansing', 'Digestivo': 'Digestive', 'Refrescante': 'Refreshing', 'Relajante': 'Relaxing',
  'Recuperación muscular': 'Muscle recovery', 'Drenante linfático': 'Lymphatic drainage'
};
const TYPE_EN = { 'Zumo': 'Juice', 'Batido': 'Shake', 'Smoothie': 'Smoothie' };

function pickMap(roMap, enMap, value) {
  if (currentLang === 'ro') return roMap[value] || value;
  if (currentLang === 'en') return enMap[value] || value;
  return value;
}
function tCat(c) { return pickMap(CAT_RO, CAT_EN, c); }
function tArea(a) { return pickMap(AREA_RO, AREA_EN, a); }
function tBenefit(b) { return pickMap(BENEFIT_RO, BENEFIT_EN, b); }
function tType(ty) { return pickMap(TYPE_RO, TYPE_EN, ty); }

const dayNamesByLang = {
  es: ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
  ro: ['LUN', 'MAR', 'MIE', 'JOI', 'VIN', 'SÂM', 'DUM'],
  en: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
};

// Traducciones de las recetas del menú, zumos y líquidos (clave: título original).
let dishTrRO = {};
let dishTrES = {};
let dishTrEN = {};
const dishTrReady = Promise.all([
  fetch('i18n_ro.json').then(r => (r.ok ? r.json() : {})).catch(() => ({})),
  fetch('i18n_es.json').then(r => (r.ok ? r.json() : {})).catch(() => ({})),
  fetch('i18n_en.json').then(r => (r.ok ? r.json() : {})).catch(() => ({}))
]).then(([ro, es, en]) => { dishTrRO = ro; dishTrES = es; dishTrEN = en; });

// Traducción del recetario completo al rumano o inglés (ficheros grandes:
// cada uno se carga una sola vez y solo cuando hace falta).
const catalogTrByLang = { ro: null, en: null };
const catalogTrLoadingByLang = {};
function ensureCatalogTr() {
  if (!(currentLang in catalogTrByLang) || catalogTrByLang[currentLang]) return Promise.resolve();
  const lang = currentLang;
  if (!catalogTrLoadingByLang[lang]) {
    catalogTrLoadingByLang[lang] = fetch('catalog_' + lang + '.json')
      .then(r => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then(d => { catalogTrByLang[lang] = d; });
  }
  return catalogTrLoadingByLang[lang];
}

function cap(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : text; }

// Entrada traducida de un plato del menú/zumos para el idioma actual (o null).
function trDish(title) {
  if (currentLang === 'es') return dishTrES[title] || null;
  const table = currentLang === 'ro' ? dishTrRO : dishTrEN;
  return table[title] || null;
}

// Unidades de las cantidades ('1 cucharada', '2 bucăți'...) según el idioma.
const QTY_ES_RO = [
  [/unidades/gi, 'bucăți'], [/unidad/gi, 'bucată'], [/cucharaditas/gi, 'lingurițe'], [/cucharadita/gi, 'linguriță'],
  [/cucharadas/gi, 'linguri'], [/cucharada/gi, 'lingură'], [/rebanadas/gi, 'felii'], [/rebanada/gi, 'felie'],
  [/dientes/gi, 'căței'], [/diente/gi, 'cățel'], [/al gusto/gi, 'după gust'], [/pizca/gi, 'praf'],
  [/rodajas/gi, 'felii'], [/rodaja/gi, 'felie'], [/tazas/gi, 'căni'], [/taza/gi, 'cană'],
  [/hojas/gi, 'frunze'], [/puñado/gi, 'pumn'], [/vasos/gi, 'pahare'], [/vaso/gi, 'pahar'],
  [/ramas/gi, 'fire'], [/rama/gi, 'fir'], [/latas/gi, 'conserve'], [/lata/gi, 'conservă']
];
const QTY_RO_ES = [
  [/bucăți|bucati/gi, 'unidades'], [/bucată|bucata/gi, 'unidad'], [/unități/gi, 'unidades'], [/unitate/gi, 'unidad'],
  [/lingurițe|lingurite/gi, 'cucharaditas'], [/linguriță|lingurita/gi, 'cucharadita'],
  [/linguri/gi, 'cucharadas'], [/lingură|lingura/gi, 'cucharada'], [/felii/gi, 'rebanadas'], [/felie/gi, 'rebanada'],
  [/căței|catei/gi, 'dientes'], [/cățel|catel/gi, 'diente'], [/după gust|dupa gust/gi, 'al gusto'],
  [/căni|cani/gi, 'tazas'], [/cană|cana/gi, 'taza'], [/foi\b/gi, 'hojas'], [/cești|cesti/gi, 'tazas']
];
const QTY_ES_EN = [
  [/unidades/gi, 'units'], [/unidad/gi, 'unit'], [/cucharaditas/gi, 'teaspoons'], [/cucharadita/gi, 'teaspoon'],
  [/cucharadas/gi, 'tablespoons'], [/cucharada/gi, 'tablespoon'], [/rebanadas/gi, 'slices'], [/rebanada/gi, 'slice'],
  [/dientes/gi, 'cloves'], [/diente/gi, 'clove'], [/al gusto/gi, 'to taste'], [/pizca/gi, 'pinch'],
  [/rodajas/gi, 'slices'], [/rodaja/gi, 'slice'], [/tazas/gi, 'cups'], [/taza/gi, 'cup'],
  [/hojas/gi, 'leaves'], [/puñado/gi, 'handful'], [/vasos/gi, 'glasses'], [/vaso/gi, 'glass'],
  [/ramas/gi, 'sprigs'], [/rama/gi, 'sprig'], [/latas/gi, 'cans'], [/lata/gi, 'can']
];
const QTY_RO_EN = [
  [/bucăți|bucati/gi, 'units'], [/bucată|bucata/gi, 'unit'], [/lingurițe|lingurite/gi, 'teaspoons'],
  [/linguriță|lingurita/gi, 'teaspoon'], [/linguri/gi, 'tablespoons'], [/lingură|lingura/gi, 'tablespoon'],
  [/felii/gi, 'slices'], [/felie/gi, 'slice'], [/căței|catei/gi, 'cloves'], [/cățel|catel/gi, 'clove'],
  [/după gust|dupa gust/gi, 'to taste'], [/praf/gi, 'pinch'], [/căni|cani/gi, 'cups'], [/cană|cana/gi, 'cup'],
  [/foi\b/gi, 'leaves'], [/pahare/gi, 'glasses'], [/pahar/gi, 'glass'], [/fire\b/gi, 'sprigs'], [/fir\b/gi, 'sprig'],
  [/conserve/gi, 'cans'], [/conservă|conserva/gi, 'can']
];
function trQty(qty) {
  let maps;
  if (currentLang === 'ro') maps = QTY_ES_RO;
  else if (currentLang === 'en') maps = QTY_ES_EN.concat(QTY_RO_EN);
  else maps = QTY_RO_ES;
  let out = qty;
  maps.forEach(([rx, rep]) => { out = out.replace(rx, rep); });
  return out;
}

// ===========================================================================
// ALÉRGENOS: detección automática en los INGREDIENTES de cada plato
// (los 14 alérgenos de declaración obligatoria en la UE). Patrones en
// español y rumano porque los datos originales están en ambos idiomas.
// ===========================================================================
const ALLERGEN_PATTERNS = {
  gluten: /\bpan\b|panecillo|pâine|paine|harina|făină|faina|trigo|grâu|cebada|\borz\b|centeno|secară|avena|ovăz|ovaz|pasta\b|macarrones|espagueti|fideos|tăiței|taitei|noodles|cuscús|couscous|bulgur|galleta|biscui|churro|magdalena|croqueta|empanad|rebozad|baguette|tortita|crep\b|clătite|clatite|cozonac|papanaș|papanas|borș\b|bors\b|sémola|semola|seitán|seitan|cerveza|\bbere\b|salsa de soja|sos de soia|tarta|bizcocho|mălai\b|\bbread\b|breadcrumbs|wheat flour|\bflour\b|\bwheat\b|barley|\brye\b|\boats\b|spaghetti|semolina|soy sauce|\bbeer\b|cookie|cracker|croissant|\bcake\b|pancake|croquette/i,
  crustaceos: /gamba|langostino|camarón|camaron|cangrejo|nécora|cigala|carabinero|bogavante|langosta|crustáceo|crevete|crevet|\bcrab\b|homar|shrimps?\b|prawns?\b|lobster|crayfish|langoustine/i,
  huevo: /huevo|\bouă\b|\boua\b|\bou\b|mayonesa|maioneză|maioneza|alioli|merengue|natilla|\beggs?\b|mayonnaise|meringue/i,
  pescado: /pescado|merluza|bacalao|salmón|salmon|atún|atun\b|ventresca|sardina|boquerón|anchoa|trucha|lubina|dorada|\brape\b|pește|peste\b|somon|hering|anșoa|caballa|bonito|salsa de pescado|\bfish\b|\bhake\b|\bcod\b|\btuna\b|anchov|trout|sea bass|mackerel|herring|sardine/i,
  cacahuete: /cacahuete|cacahuate|maní\b|arahide|peanut/i,
  soja: /soja|soia|tofu|edamame|miso|tempeh|\bsoy\b|soybean/i,
  lacteos: /leche(?!\s+de\s+(?:coco|almendra|soja|avena|arroz))|lapte(?!\s+de\s+(?:cocos|migdale|soia|ovăz|ovaz|orez))|(?<!almond |coconut |soy |oat |rice )milk\b|queso|brânză|branza|telemea|cașcaval|cascaval|yogur|iaurt|yogh?urt|\bnata\b|smântână|smantana|mantequilla(?!\s+de\s+(?:maní|mani|cacahuete))|\bunt\b(?!\s+de\s+arahide)|(?<!peanut |cocoa |cacao )butter\b|cheese|(?<!coconut )cream\b|kéfir|kefir|chefir|requesón|ricotta|mozzarella|parmesano|parmesan|feta|lassi|helado|înghețată|ice cream|cuajada/i,
  frutos: /nuez(?!\s+moscada)|nueces|\bnuci\b|nucă\b(?!\s+moscat)|almendra|migdale|avellana|alune de pădure|pistacho|fistic|anacardo|\bcaju\b|pacana|macadamia|piñones|turrón|granola|walnuts?\b|almonds?\b|hazelnuts?\b|pistachios?\b|cashews?\b|pecans?\b|pine nuts/i,
  apio: /\bapio\b|țelină|telina|celery/i,
  mostaza: /mostaza|muștar|mustar|dijon|mustard/i,
  sesamo: /sésamo|sesamo|ajonjolí|tahini|tahína|\bsusan\b|sesame/i,
  sulfitos: /\bvino\b|vin alb|vin roșu|vinagre de vino|\bpasas\b|stafide|\bwine\b|raisins?\b/i,
  altramuz: /altramuz|lupin/i,
  moluscos: /mejillón|mejillones|midii|almeja|scoici|calamar|pulpo|caracatiță|caracatita|sepia|sepie|vieira|ostra|stridii|caracol|\bmelc\b|mussels?\b|clams?\b|squid|octopus|oysters?\b|scallops?\b|snails?\b|calamari|cuttlefish/i
};

// Texto de ingredientes de una receta (vale para pares {name,qty} y para líneas).
function ingredientsText(ingredients) {
  if (!ingredients || !ingredients.length) return '';
  return typeof ingredients[0] === 'string'
    ? ingredients.join(' · ')
    : ingredients.map(i => i.name).join(' · ');
}
function allergensOfText(text) {
  if (!text) return [];
  return Object.keys(ALLERGEN_PATTERNS).filter(a => ALLERGEN_PATTERNS[a].test(text));
}
// Pie de tarjeta con el listado de alérgenos del plato.
function allergenFooterHTML(allergens) {
  const list = allergens.length
    ? allergens.map(a => t('alg_' + a)).join(', ')
    : t('no_allergens');
  return `
    <div class="mt-3 pt-3 border-t border-surface-container text-label-md text-on-surface-variant">
      <p><span class="font-semibold ${allergens.length ? 'text-secondary' : 'text-primary'}">${allergens.length ? '⚠ ' : '✓ '}${t('allergens')}:</span> ${escapeHtml(list)}</p>
      <p class="text-xs opacity-75 mt-0.5">${t('allergen_note')}</p>
    </div>`;
}

// ===========================================================================
// MOTOR DE DIETA: detecta si un plato es incompatible con la dieta o las
// exclusiones alérgicas activas; el menú elige primero platos compatibles
// y, si no hay ninguno, adapta el plato por sustitución de ingredientes.
// ===========================================================================
const DIET_BLOCKERS = {
  vegana: /pollo|pavo|ternera|cerdo|cordero|carne|jamón|chorizo|morcill|panceta|bacon|salchich|burtă|burta|\bpui\b|pulpă de pui|piept de pui|porc|vită|vita\b|\bmici\b|cârnați|carnati|afumătură|afumatura|pescado|merluza|bacalao|salmón|atún|ventresca|sardina|anchoa|sepia|pulpo|calamar|gamba|mejillón|mejillones|marisco|pește|peste\b|somon|huevo|\bouă\b|\boua\b|\bou\b|leche\b(?!\s+de\s+(?:coco|almendras?|soja|avena|arroz))|lapte\b(?!\s+de\s+(?:cocos|migdale|soia|ovăz|ovaz|orez))|queso|brânză|branza|telemea|cașcaval|yogur|iaurt|\bnata\b|smântână|smantana|mantequilla|\bunt\b|\bmiel\b|miere|mayonesa|maioneză|alioli|croqueta|burtă/i,
  vegetariana: /pollo|pavo|ternera|cerdo|cordero|\bcarne\b|carne picada|carne tocată|jamón|chorizo|morcill|panceta|bacon|salchich|burtă|burta|\bpui\b|pulpă de pui|piept de pui|porc\b|vită|vita\b|\bmici\b|cârnați|carnati|afumătură|afumatura|pescado|merluza|bacalao|salmón|atún|ventresca|sardina|anchoa|sepia|pulpo|calamar|gamba|mejillón|mejillones|marisco|pește|peste\b|somon|croqueta/i,
  keto: /arroz|orez|pasta\b|macarrones|fideos|tăiței|taitei|\bpan\b|pâine|paine|patata|cartof|harina|făină|faina|azúcar|azucar|zahăr|zahar|plátano|platano|banană|banana|garbanzo|năut|naut|lenteja|linte|alubia|fabes|fasole|quinoa|avena|ovăz|ovaz|maíz|maiz|mălai|malai|mămăligă|mamaliga|porumb|churro|magdalena|\bmiel\b|miere|mermelada|\bgem\b|dulceață|dulceata|cozonac|granola|cuscús|dátil|curmale|borș|bors\b|baguette|tortita|crep\b|clătite|clatite|tarta|galleta/i,
  mediterranea: null,
  // Diabética: evita azúcares libres y harinas/cereales refinados y zumos azucarados.
  // (Las legumbres y la fruta entera NO se bloquean; aportan fibra y bajo índice glucémico.)
  diabetico: /azúcar|azucar|zahăr|zahar|\bsugar\b|\bmiel\b|miere|\bhoney\b|mermelada|dulceață|dulceata|\bgem\b|marmalade|sirope|jarabe|sirop|\bsyrup\b|churro|magdalena|bizcocho|\btarta\b|\bcake\b|galleta|biscui|\bcookie\b|bollería|bolleria|cozonac|caramelo|chocolate con leche|harina blanca|harina refinada|pan blanco|white bread|refined flour|zumo de (?:naranja|manzana|uva|frutas?|piña|melocotón)|orange juice|fruit juice|refresco|\bsoda\b/i
};
DIET_BLOCKERS.baja = DIET_BLOCKERS.keto;
// Celíaca = exactamente el patrón de gluten (coherente con la exclusión alérgica).
DIET_BLOCKERS.celiaco = ALLERGEN_PATTERNS.gluten;

// Exclusiones de ajustes -> alérgenos detectados que bloquean un plato.
const INTOLERANCE_TO_ALLERGENS = {
  gluten: ['gluten'],
  lactosa: ['lacteos'],
  frutos: ['frutos', 'cacahuete'],
  marisco: ['crustaceos', 'moluscos']
};

function optionDetectionText(option) {
  return option.title + ' · ' + ingredientsText(option.ingredients);
}
function violatesDiet(option) {
  const rx = DIET_BLOCKERS[currentDiet];
  return !!(rx && rx.test(optionDetectionText(option)));
}
function violatesAllergies(option) {
  const present = allergensOfText(ingredientsText(option.ingredients));
  return Object.keys(currentIntolerances).some(key =>
    currentIntolerances[key] && (INTOLERANCE_TO_ALLERGENS[key] || []).some(a => present.includes(a)));
}
function optionNeedsAdaptation(option) {
  return violatesDiet(option) || violatesAllergies(option);
}

function createRecipe(title, calories, protein, fats, ingredients, instructions, category = 'General', drinkType = null, style = 'saludable', image = null) {
  return { title, nutrition: { calories, protein, fats }, ingredients, instructions, category, drinkType, style, image };
}

// ---------------------------------------------------------------------------
// SISTEMA DE IMÁGENES REALES
// - Recetas del recetario (recipes.json): foto auténtica incluida en los datos.
// - Resto de platos: foto pre-resuelta en menu_images.json (generado una vez
//   con build_menu_images.py); Wikipedia en vivo solo para títulos nuevos.
// - Si no hay foto, se muestra un marcador neutro (nunca una foto equivocada).
// ---------------------------------------------------------------------------
const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30'%3E%3Crect width='100%25' height='100%25' fill='%23e3efe1'/%3E%3C/svg%3E";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const wikiImageCache = (() => {
  try { return JSON.parse(localStorage.getItem('nutriplan-wiki-img') || '{}'); } catch (e) { return {}; }
})();
function saveWikiCache() {
  try { localStorage.setItem('nutriplan-wiki-img', JSON.stringify(wikiImageCache)); } catch (e) {}
}

// Excepciones: platos cuyo título no coincide con el artículo de Wikipedia.
const dishWikiOverride = {
  'Crema de calabaza con jengibre': 'Sopa de calabaza',
  'Crema de verduras de temporada': 'Sopa de calabaza',
  'Friptură de porc cu cartofi': 'Friptură',
  'Friptură de pui cu legume': 'Friptură',
  'Sopa de tortilla': 'Sopa azteca',
  'Tocăniță de ciuperci': 'Tocană',
  'Bowl de quinoa, pollo y verduras': 'Quinua'
};

// Genera variantes del título (de más específica a más genérica) para buscar en Wikipedia.
function wikiQueries(title) {
  const noParen = title.replace(/\(.*?\)/g, '').trim();
  const connectors = / cu | con | a la | al | la | en salsa | estilo | de temporada | caser/i;
  const first = noParen.split(connectors)[0].trim();
  const list = [title, noParen];
  if (first && first !== noParen) list.push(first);
  return Array.from(new Set(list)).filter(Boolean);
}

// Fotos pre-resueltas de los platos locales (fichero empaquetado con la app).
const menuImagesPromise = fetch('menu_images.json').then(r => (r.ok ? r.json() : {})).catch(() => ({}));

// Devuelve la URL de la foto real del plato. Primero consulta menu_images.json
// (sin red, fiable); solo si el título no está ahí pregunta a Wikipedia en vivo.
async function resolveDishImage(title) {
  const preResolved = await menuImagesPromise;
  if (Object.prototype.hasOwnProperty.call(preResolved, title)) return preResolved[title];
  if (Object.prototype.hasOwnProperty.call(wikiImageCache, title)) return wikiImageCache[title];
  const queries = [];
  if (dishWikiOverride[title]) queries.push(dishWikiOverride[title]);
  wikiQueries(title).forEach(q => queries.push(q));
  const uniqueQueries = Array.from(new Set(queries));
  for (const lang of ['es', 'ro', 'en']) {
    for (const q of uniqueQueries) {
      try {
        const res = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
        if (!res.ok) continue;
        const data = await res.json();
        const src = data && data.thumbnail && data.thumbnail.source;
        if (src) {
          const big = src.replace(/\/\d+px-/, '/640px-');
          wikiImageCache[title] = big;
          saveWikiCache();
          return big;
        }
      } catch (e) { /* ignora y prueba el siguiente */ }
    }
  }
  // Último recurso: buscador de Wikipedia (encuentra el artículo aunque el título no sea exacto).
  const searchTerm = uniqueQueries[uniqueQueries.length - 1] || title;
  for (const lang of ['es', 'ro', 'en']) {
    try {
      const url = `https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=640&format=json&origin=*`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const pages = data && data.query && data.query.pages;
      if (pages) {
        const first = Object.values(pages)[0];
        const src = first && first.thumbnail && first.thumbnail.source;
        if (src) {
          wikiImageCache[title] = src;
          saveWikiCache();
          return src;
        }
      }
    } catch (e) { /* ignora */ }
  }
  wikiImageCache[title] = null;
  saveWikiCache();
  return null;
}

let dishImageObserver = null;
function hydrateLazyImages(root) {
  const scope = root || document;
  const images = scope.querySelectorAll('img.dish-lazy:not([data-hydrated])');
  if (!images.length) return;
  if (!dishImageObserver) {
    dishImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        dishImageObserver.unobserve(img);
        img.dataset.hydrated = '1';
        resolveDishImage(img.dataset.title).then((src) => {
          if (src) {
            img.src = src;
            img.classList.add('dish-img-loaded');
          }
        });
      });
    }, { rootMargin: '300px' });
  }
  images.forEach((img) => dishImageObserver.observe(img));
}

// Aspecto propio de zumos y batidos: degradado + emoji según el tipo de bebida
// (las fotos de bebidas en Wikipedia eran poco fiables; así nunca hay foto equivocada).
const JUICE_LOOK = {
  Zumo: { emoji: '🍊', bg: 'linear-gradient(135deg,#ffe0b2,#ffb74d)' },
  Batido: { emoji: '🥤', bg: 'linear-gradient(135deg,#f8bbd0,#f48fb1)' },
  Smoothie: { emoji: '🍓', bg: 'linear-gradient(135deg,#c8e6c9,#81c784)' },
  Agua: { emoji: '💧', bg: 'linear-gradient(135deg,#b3e5fc,#4fc3f7)' },
  Verde: { emoji: '🥬', bg: 'linear-gradient(135deg,#dcedc8,#9ccc65)' },
  Te: { emoji: '🍵', bg: 'linear-gradient(135deg,#ffe0b2,#ffcc80)' },
  Compota: { emoji: '🍎', bg: 'linear-gradient(135deg,#ffcdd2,#e57373)' },
  Limonada: { emoji: '🍋', bg: 'linear-gradient(135deg,#fff9c4,#fff176)' }
};

// Detalle completo de cada líquido nutritivo del menú (ingredientes con
// cantidades, preparación y beneficios). La clave es el nombre original tal
// como aparece en menuData; el contenido está en su idioma de origen (español
// para los platos del menú ES, rumano para los del menú RO) y build_i18n.py lo
// traduce a los demás idiomas. ES JSON válido (lo lee también build_i18n.py).
const LIQUID_DETAILS = {
  "Agua de limón detox": { "type": "Agua",
    "ingredients": ["1 limón (su zumo)", "300 ml de agua templada", "1 trozo (1 cm) de jengibre rallado", "1 cucharadita de miel"],
    "prep": "Exprime el limón en el agua templada, añade el jengibre rallado y la miel y remueve bien. Tómala en ayunas para activar el hígado y la digestión.",
    "benefitsText": "El limón en ayunas estimula la producción de bilis y aporta vitamina C; el jengibre ayuda a la digestión y la miel suaviza el sabor." },
  "Agua infusionada limón": { "type": "Agua",
    "ingredients": ["1 limón en rodajas", "1 litro de agua", "1 trozo (2 cm) de jengibre en láminas"],
    "prep": "Pon las rodajas de limón y el jengibre en una jarra con el agua y deja infusionar 2 horas en la nevera. Bebe a lo largo del día.",
    "benefitsText": "Una forma suave de hidratarse con un extra de vitamina C y antioxidantes que favorecen la depuración del hígado." },
  "Agua infusionada menta": { "type": "Agua",
    "ingredients": ["1/2 pepino en rodajas", "10 hojas de menta", "1/2 limón en rodajas", "1 litro de agua fría"],
    "prep": "Mezcla el pepino, la menta y el limón en una jarra con agua fría y deja reposar 1 hora. Sirve con hielo.",
    "benefitsText": "El pepino hidrata con muy pocas calorías y la menta calma el estómago y facilita la digestión." },
  "Batido de avena y canela": { "type": "Batido",
    "ingredients": ["4 cucharadas de copos de avena", "1 manzana", "300 ml de leche o bebida vegetal", "1 cucharadita de canela", "1 cucharadita de miel"],
    "prep": "Bate la avena con la manzana troceada, la leche, la canela y la miel 1 minuto. Deja reposar 5 minutos para que espese.",
    "benefitsText": "La fibra beta-glucano de la avena regula el tránsito y sacia; la canela ayuda a controlar el azúcar en sangre." },
  "Batido de coco y jengibre": { "type": "Batido",
    "ingredients": ["200 ml de leche de coco", "1 plátano", "1 trozo (1 cm) de jengibre", "1 cucharadita de canela", "hielo"],
    "prep": "Bate la leche de coco con el plátano, el jengibre pelado y la canela hasta que quede cremoso. Sirve con hielo.",
    "benefitsText": "El jengibre y la canela tienen efecto antiinflamatorio y las grasas del coco aportan energía estable." },
  "Batido de pera y manzana": { "type": "Batido",
    "ingredients": ["1 pera madura", "1 manzana", "200 ml de agua o leche vegetal", "1 cucharadita de miel", "zumo de 1/2 limón"],
    "prep": "Pela y trocea la pera y la manzana y bate con el agua, la miel y el limón hasta que quede fino.",
    "benefitsText": "La pera y la manzana aportan fibra soluble (pectina) que cuida la flora intestinal y suaviza la digestión." },
  "Batido Verde Detox": { "type": "Batido",
    "ingredients": ["100 g de espinacas frescas", "200 g de piña", "1 trozo (1 cm) de jengibre", "250 ml de agua de coco", "zumo de 1/2 limón"],
    "prep": "Lava las espinacas, trocea la piña y bate todo con el agua de coco, el jengibre y el limón 1 minuto.",
    "benefitsText": "La clorofila de la espinaca y la bromelina de la piña apoyan la depuración del hígado y la digestión." },
  "Jugo antioxidante": { "type": "Zumo",
    "ingredients": ["100 g de arándanos", "1/2 granada (sus granos)", "150 ml de agua", "zumo de 1/2 limón"],
    "prep": "Tritura los arándanos y la granada con el agua y el limón y cuela. Bebe recién hecho.",
    "benefitsText": "Arándanos y granada están entre las frutas con más antocianinas, antioxidantes que protegen las células y el corazón." },
  "Jugo cítrico energético": { "type": "Zumo",
    "ingredients": ["2 naranjas", "1 limón", "1 trozo (1 cm) de jengibre", "1 cucharadita de miel"],
    "prep": "Exprime las naranjas y el limón, añade el jengibre rallado y la miel y remueve. Tómalo recién hecho por la mañana.",
    "benefitsText": "Triple aporte de vitamina C que reduce el cansancio, con jengibre que activa la circulación y da un empujón de energía." },
  "Jugo de granada y moras": { "type": "Zumo",
    "ingredients": ["1 granada (sus granos)", "100 g de moras", "zumo de 1/2 limón", "100 ml de agua"],
    "prep": "Tritura la granada y las moras con el agua y el limón y cuela para retirar las pepitas. Sirve frío.",
    "benefitsText": "Combinación muy rica en polifenoles antioxidantes que ayudan a proteger el corazón y combatir el envejecimiento celular." },
  "Jugo de kale y espinaca": { "type": "Verde",
    "ingredients": ["50 g de kale", "50 g de espinacas", "1 manzana verde", "zumo de 1 limón", "200 ml de agua fría"],
    "prep": "Lava bien las hojas, trocea la manzana y licúa o tritura todo con el agua y el limón. Cuela si lo prefieres más fino.",
    "benefitsText": "Kale y espinaca aportan hierro, folatos y vitaminas A, C y K que refuerzan las defensas y la salud de la sangre." },
  "Jugo de manzana verde": { "type": "Verde",
    "ingredients": ["2 manzanas verdes", "1 trozo (1 cm) de jengibre", "zumo de 1/2 limón", "150 ml de agua"],
    "prep": "Trocea las manzanas y licúa con el jengibre, el agua y el limón. Bebe recién hecho para aprovechar las enzimas.",
    "benefitsText": "La manzana verde es rica en fibra y baja en azúcar; con el jengibre favorece una digestión ligera." },
  "Jugo de remolacha y jengibre": { "type": "Zumo",
    "ingredients": ["1 remolacha cruda pelada", "1 naranja", "1 trozo (2 cm) de jengibre", "150 ml de agua"],
    "prep": "Trocea la remolacha, licúa con el jengibre y mezcla con el zumo de la naranja y el agua. Cuela y sirve frío.",
    "benefitsText": "Los nitratos de la remolacha mejoran la circulación y apoyan la función del hígado en la depuración." },
  "Jugo de zanahoria": { "type": "Zumo",
    "ingredients": ["4 zanahorias", "1 naranja", "1 trozo (1 cm) de jengibre (opcional)"],
    "prep": "Licúa las zanahorias y mezcla con el zumo de la naranja. Añade jengibre si quieres un toque picante. Sirve frío.",
    "benefitsText": "El betacaroteno de la zanahoria se convierte en vitamina A (vista y piel) y la naranja aporta energía y vitamina C." },
  "Jugo verde depurativo": { "type": "Verde",
    "ingredients": ["1 manzana verde", "2 ramas de apio", "1 puñado de perejil", "1/2 pepino", "200 ml de agua fría"],
    "prep": "Lava y trocea todo y licúa o tritura con el agua. Cuela y bebe en el momento.",
    "benefitsText": "Apio y perejil tienen un efecto diurético natural que ayuda a eliminar líquidos retenidos y a depurar el organismo." },
  "Smoothie antiinflamatorio": { "type": "Smoothie",
    "ingredients": ["1 plátano", "1 cucharadita de cúrcuma", "una pizca de pimienta negra", "250 ml de leche de coco", "1 cucharadita de miel"],
    "prep": "Bate todo 1 minuto. La pizca de pimienta no se nota pero multiplica la absorción de la cúrcuma.",
    "benefitsText": "La curcumina de la cúrcuma es uno de los antiinflamatorios naturales más estudiados; con grasa y pimienta se absorbe mucho mejor." },
  "Smoothie de cúrcuma dorada": { "type": "Smoothie",
    "ingredients": ["1 mango", "1 cucharadita de cúrcuma", "una pizca de pimienta negra", "250 ml de leche de coco", "1 cucharadita de miel"],
    "prep": "Pela y trocea el mango y bate con la leche de coco, la cúrcuma, la pimienta y la miel hasta que quede sedoso.",
    "benefitsText": "Versión tropical del 'golden milk': cúrcuma antiinflamatoria con la vitamina A del mango y las grasas saludables del coco." },
  "Smoothie de frutos rojos": { "type": "Smoothie",
    "ingredients": ["200 g de frutos rojos", "1 yogur natural", "1 cucharada de miel", "100 ml de leche"],
    "prep": "Bate los frutos rojos con el yogur, la leche y la miel. Con fruta congelada queda como un sorbete cremoso.",
    "benefitsText": "Las antocianinas de los frutos rojos tienen efecto antiinflamatorio y antioxidante; el yogur aporta probióticos para la flora." },
  "Smoothie de pepino y menta": { "type": "Smoothie",
    "ingredients": ["1/2 pepino", "10 hojas de menta", "zumo de 1/2 limón", "1 yogur natural", "150 ml de agua fría"],
    "prep": "Bate el pepino con la menta, el limón, el yogur y el agua hasta que quede fino y refrescante. Sirve muy frío.",
    "benefitsText": "El pepino hidrata y refresca y la menta calma el estómago: ideal después de las comidas pesadas." },
  "Smoothie de recuperación": { "type": "Smoothie",
    "ingredients": ["1 plátano", "1 cucharada de proteína o crema de almendra", "250 ml de leche o bebida de almendras", "1 cucharada de cacao puro (opcional)", "hielo"],
    "prep": "Bate el plátano con la proteína (o la crema de almendra), la leche y el hielo hasta que quede cremoso. Tómalo tras entrenar.",
    "benefitsText": "Proteína para reparar el músculo y potasio del plátano para reponer las sales perdidas tras el ejercicio." },
  "Smoothie tropical premium": { "type": "Smoothie",
    "ingredients": ["150 g de mango", "1 plátano", "200 ml de leche de coco", "1 cucharada de semillas de chía", "zumo de 1/2 lima"],
    "prep": "Bate el mango y el plátano con la leche de coco y la lima 1 minuto. Añade la chía, remueve y deja reposar 5 minutos.",
    "benefitsText": "Mango y plátano aportan energía y potasio y la chía suma fibra y omega-3 para un empujón completo." },
  "Ceai de cătină": { "type": "Te",
    "ingredients": ["2 linguri de cătină (fructe sau pulbere)", "300 ml apă fierbinte", "1 linguriță de miere"],
    "prep": "Zdrobește cătina, toarnă apa fierbinte (nu clocotită, ca să nu distrugă vitamina C) și lasă la infuzat 10 minute. Strecoară și îndulcește cu miere.",
    "benefitsText": "Cătina are de câteva ori mai multă vitamina C decât citricele și întărește imunitatea, mai ales iarna." },
  "Ceai de mușețel": { "type": "Te",
    "ingredients": ["2 lingurițe de flori de mușețel", "250 ml apă fierbinte", "1 linguriță de miere"],
    "prep": "Opărește florile de mușețel cu apa fierbinte și lasă acoperit 5-7 minute. Strecoară și bea cald, eventual cu miere.",
    "benefitsText": "Mușețelul calmează stomacul și reduce balonarea; este și ușor relaxant, potrivit seara." },
  "Ceai de tei": { "type": "Te",
    "ingredients": ["2 lingurițe de flori de tei", "250 ml apă fierbinte", "1 linguriță de miere"],
    "prep": "Infuzează florile de tei în apa fierbinte 7-10 minute, acoperit. Strecoară și bea cald înainte de culcare.",
    "benefitsText": "Teiul are efect calmant și ajută la un somn liniștit; este și ușor sudorific când ești răcit." },
  "Compot de mere": { "type": "Compota",
    "ingredients": ["4 mere", "1 litru de apă", "1 baton de scorțișoară", "2 linguri de zahăr sau miere"],
    "prep": "Taie merele felii, fierbe-le în apă cu scorțișoara 15 minute, îndulcește la final și lasă să se răcească.",
    "benefitsText": "Băutură tradițională ușoară, cu fibre din mere și scorțișoară care ajută digestia și echilibrul glicemiei." },
  "Compot de prune": { "type": "Compota",
    "ingredients": ["400 g de prune", "1 litru de apă", "1 baton de scorțișoară", "2 linguri de zahăr"],
    "prep": "Fierbe prunele întregi în apă cu scorțișoara 15-20 de minute, îndulcește și lasă la rece.",
    "benefitsText": "Prunele sunt cunoscute pentru efectul lor ușor laxativ și bogăția în fibre care reglează tranzitul intestinal." },
  "Compot de vișine": { "type": "Compota",
    "ingredients": ["400 g de vișine", "1 litru de apă", "2-3 linguri de zahăr sau miere"],
    "prep": "Fierbe vișinele în apă 10-15 minute, îndulcește după gust și răcește bine înainte de servire.",
    "benefitsText": "Vișinele sunt bogate în antociani, antioxidanți care reduc inflamația și susțin somnul prin melatonina naturală." },
  "Limonadă cu ghimbir": { "type": "Limonada",
    "ingredients": ["2 lămâi (sucul lor)", "500 ml apă rece", "1 bucată (2 cm) de ghimbir ras", "1 lingură de miere", "gheață"],
    "prep": "Amestecă sucul de lămâie cu apa, ghimbirul ras și mierea până se dizolvă. Servește cu gheață.",
    "benefitsText": "Vitamina C din lămâie și ghimbirul activează circulația și dau energie, fără zahărul din sucurile carbogazoase." },
  "Limonadă cu mentă": { "type": "Limonada",
    "ingredients": ["2 lămâi (sucul lor)", "500 ml apă rece", "10 frunze de mentă", "1 lingură de miere", "gheață"],
    "prep": "Amestecă sucul de lămâie cu apa și mierea, adaugă menta zdrobită ușor și gheața. Servește rece.",
    "benefitsText": "Răcoritoare și hidratantă, cu vitamina C din lămâie și menta care calmează stomacul." },
  "Suc de mere și morcov": { "type": "Zumo",
    "ingredients": ["2 mere", "3 morcovi", "puțin suc de lămâie", "100 ml apă"],
    "prep": "Dă merele și morcovii prin storcător sau blender cu apa, adaugă lămâia și strecoară. Bea proaspăt.",
    "benefitsText": "Betacarotenul din morcov și fibrele din mere oferă energie și susțin vederea și pielea." },
  "Suc de morcov": { "type": "Zumo",
    "ingredients": ["4 morcovi", "1 portocală", "puțin ghimbir (opțional)"],
    "prep": "Stoarce morcovii și amestecă cu sucul de portocală. Adaugă ghimbir pentru un plus de aromă. Servește rece.",
    "benefitsText": "Sursă bogată de betacaroten (vitamina A) pentru vedere și piele, cu energie din portocală." },
  "Suc de sfeclă": { "type": "Zumo",
    "ingredients": ["1 sfeclă crudă curățată", "2 morcovi", "puțin suc de lămâie", "150 ml apă"],
    "prep": "Taie sfecla și morcovii, dă-le prin storcător sau blender cu apa, adaugă lămâia și strecoară.",
    "benefitsText": "Nitrații din sfeclă îmbunătățesc circulația și susțin ficatul în procesul de detoxifiere." },
  "Suc verde": { "type": "Verde",
    "ingredients": ["un pumn de spanac", "1 măr verde", "sucul de la 1 lămâie", "200 ml apă rece"],
    "prep": "Spală spanacul, taie mărul și pasează totul cu apa și lămâia. Strecoară dacă preferi mai fin și bea imediat.",
    "benefitsText": "Clorofila din spanac și vitamina C din lămâie ajută la depurarea organismului și dau o doză bună de minerale." }
};

// HTML de la foto de un plato. Si trae `image` la usa directa; si no, carga diferida.
function dishImageHTML(recipe, classes) {
  const cls = classes || '';
  const alt = escapeHtml(recipe.title);
  if (recipe.source === 'juice') {
    const look = JUICE_LOOK[recipe.type] || JUICE_LOOK.Zumo;
    return `<div role="img" aria-label="${alt}" class="${cls} w-full h-full flex items-center justify-center" style="background:${look.bg};"><span style="font-size:64px;">${look.emoji}</span></div>`;
  }
  if (recipe.image) {
    return `<img src="${recipe.image}" alt="${alt}" loading="lazy" class="${cls} w-full h-full object-cover" />`;
  }
  return `<img src="${PLACEHOLDER_IMG}" data-title="${escapeHtml(recipe.title)}" alt="${alt}" class="dish-lazy ${cls} w-full h-full object-cover" />`;
}

function getCurrentWeekDates() {
  const today = new Date();
  const locale = { es: 'es-ES', ro: 'ro-RO', en: 'en-GB' }[currentLang] || 'es-ES';
  const dayNames = dayNamesByLang[currentLang] || dayNamesByLang.es;

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const dayIndex = (date.getDay() + 6) % 7;
    return {
      short: dayNames[dayIndex],
      num: date.getDate(),
      long: date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    };
  });
}

let weekDates = getCurrentWeekDates();

// --- Rotación diaria del menú ---------------------------------------------
// El menú de cada fecha se elige por el día REAL del calendario (no por la
// posición en la lista), así avanza solo cada día que pasa. `menuShift`
// permite además cambiar el menú de toda la semana con un botón.
let menuShift = 0;
function menuDayFor(position) {
  const now = new Date();
  const epochDays = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
  return (((epochDays + position + menuShift) % 7) + 7) % 7;
}

function shuffleWeekMenu() {
  menuShift = (menuShift + 1 + Math.floor(Math.random() * 5)) % 7;
  persistState();
  renderWeeks();
  loadDayDetails();
  showToast(t('toast_week_changed'));
}

function createMealSelection() {
  return { breakfast: 0, lunch: 0, dinner: 0 };
}

const selectedMealIndices = {
  es: Array.from({ length: 7 }, createMealSelection),
  ro: Array.from({ length: 7 }, createMealSelection)
};

const favoriteRecipes = new Set();

// ---------------------------------------------------------------------------
// DATOS DEL MENÚ: 7 días españoles + 7 días rumanos, todos distintos.
// ---------------------------------------------------------------------------
const menuData = {
  es: {
    badge: 'Cocina Española',
    language: 'Español',
    season: 'Primavera',
    seasonIcon: 'eco',
    days: [
      // ----- Día 0 (Lunes) -----
      {
        breakfastOptions: [
          createRecipe('Tostada integral con AOVE y tomate', 320, 8, 18,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Tomate maduro', qty: '2 unidades' }, { name: 'Aceite de oliva extra virgen', qty: '2 cucharadas' }, { name: 'Ajo fresco', qty: '1 diente' }, { name: 'Sal en escamas', qty: '1 pizca' }],
            'Ralla los tomates por la parte cortada y deja escurrir el exceso de agua en un colador 5 minutos. Tuesta el pan hasta que esté dorado y frota cada rebanada con el diente de ajo partido. Reparte el tomate rallado, sazona con la sal y termina con un buen chorro de aceite de oliva justo antes de servir.'),
          createRecipe('Smoothie detox con espinaca y piña', 280, 8, 6,
            [{ name: 'Espinaca fresca', qty: '100 g' }, { name: 'Piña natural', qty: '200 g' }, { name: 'Yogur natural', qty: '250 g' }, { name: 'Jengibre fresco', qty: '10 g' }, { name: 'Agua fría', qty: '100 ml' }, { name: 'Zumo de limón', qty: '1 cucharada' }],
            'Lava bien las espinacas y pela y trocea la piña y el jengibre. Pon todo en la batidora con el yogur, el agua fría y el zumo de limón y tritura 1 minuto a máxima potencia hasta que no queden trozos. Sirve inmediatamente, bien frío, para aprovechar todas las vitaminas.', 'Bebida', 'Limpieza hígado'),
          createRecipe('Tortilla de patatas', 430, 16, 24,
            [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Patata', qty: '400 g' }, { name: 'Cebolla', qty: '1 unidad' }, { name: 'Aceite de oliva', qty: '200 ml' }, { name: 'Sal', qty: 'al gusto' }],
            'Pela y corta las patatas en láminas finas y la cebolla en juliana. Confítalas en el aceite a fuego medio-bajo 20 minutos, removiendo de vez en cuando, hasta que estén tiernas pero sin dorarse; escúrrelas bien. Bate los huevos con sal, mezcla con las patatas y deja reposar 10 minutos. Cuaja la tortilla en una sartén pequeña con una cucharada del aceite 3 minutos, dale la vuelta con un plato y cuaja otros 2-3 minutos según la quieras de jugosa.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Paella de verduras', 520, 18, 15,
            [{ name: 'Arroz redondo', qty: '180 g' }, { name: 'Caldo de verduras', qty: '500 ml' }, { name: 'Pimiento rojo', qty: '1 unidad' }, { name: 'Calabacín', qty: '1/2 unidad' }, { name: 'Alcachofa', qty: '2 unidades' }, { name: 'Judías verdes', qty: '80 g' }, { name: 'Tomate rallado', qty: '1 unidad' }, { name: 'Ajo', qty: '2 dientes' }, { name: 'Pimentón dulce', qty: '1 cucharadita' }, { name: 'Azafrán', qty: '1 pizca' }, { name: 'Aceite de oliva', qty: '3 cucharadas' }],
            'Sofríe en la paella el pimiento, el calabacín, las alcachofas en cuartos y las judías con el aceite 8 minutos. Añade el ajo picado, el tomate rallado y el pimentón y cocina 2 minutos más. Incorpora el arroz, dale una vuelta, vierte el caldo caliente con el azafrán y reparte bien. Cuece 10 minutos a fuego fuerte y 8 a fuego suave sin remover. Apaga, tapa con un paño y deja reposar 5 minutos antes de servir.'),
          createRecipe('Lentejas con chorizo', 560, 26, 22,
            [{ name: 'Lentejas pardinas', qty: '200 g' }, { name: 'Chorizo', qty: '100 g' }, { name: 'Zanahoria', qty: '1 unidad' }, { name: 'Cebolla', qty: '1 unidad' }, { name: 'Pimiento verde', qty: '1/2 unidad' }, { name: 'Patata', qty: '1 unidad' }, { name: 'Ajo', qty: '2 dientes' }, { name: 'Hoja de laurel', qty: '1 unidad' }, { name: 'Pimentón dulce', qty: '1 cucharadita' }, { name: 'Aceite de oliva', qty: '1 cucharada' }, { name: 'Agua', qty: '800 ml' }],
            'Pon en una olla las lentejas (no necesitan remojo) con el agua fría, la cebolla y el pimiento picados, la zanahoria en rodajas, los ajos enteros, el laurel y el chorizo en rodajas gruesas. Lleva a ebullición, espuma, y cuece a fuego suave 30 minutos. Añade la patata en cachelos y el pimentón disuelto en el aceite y cocina 20 minutos más hasta que todo esté tierno. Rectifica de sal y deja reposar 10 minutos: están aún mejor de un día para otro.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pescado al horno con pimientos', 420, 36, 14,
            [{ name: 'Filete de pescado blanco', qty: '350 g' }, { name: 'Pimiento verde', qty: '1 unidad' }, { name: 'Pimiento rojo', qty: '1/2 unidad' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Patata', qty: '1 unidad' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Vino blanco', qty: '50 ml' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Perejil fresco', qty: 'al gusto' }],
            'Precalienta el horno a 200 °C. Corta la patata en rodajas finas, los pimientos en tiras y la cebolla en juliana, aliña con la mitad del aceite y sal y hornea 20 minutos como cama. Coloca encima los filetes salpimentados, riega con el vino, el resto del aceite y unas rodajas de limón y hornea 12-15 minutos más, hasta que el pescado se separe en lascas. Espolvorea perejil picado al servir.'),
          createRecipe('Pollo al ajillo con patatas', 620, 30, 25,
            [{ name: 'Muslo de pollo', qty: '450 g' }, { name: 'Patata', qty: '300 g' }, { name: 'Ajo', qty: '6 dientes' }, { name: 'Vino blanco', qty: '100 ml' }, { name: 'Romero', qty: '1 rama' }, { name: 'Aceite de oliva', qty: '3 cucharadas' }, { name: 'Sal y pimienta', qty: 'al gusto' }],
            'Trocea el pollo, salpimienta y dóralo en una sartén amplia con el aceite a fuego vivo 8 minutos. Añade los ajos enteros aplastados y las patatas en dados y rehoga 5 minutos. Vierte el vino, añade el romero, tapa y cocina a fuego medio 20 minutos, removiendo de vez en cuando, hasta que el pollo esté hecho por dentro y las patatas tiernas. Sube el fuego al final para que todo quede dorado.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Jugo de remolacha y jengibre', value: 'Limpieza hígado · Remolacha + Jengibre + Naranja' },
          { name: 'Batido Verde Detox', value: 'Limpieza hígado · Espinaca + Piña + Jengibre' },
          { name: 'Smoothie de cúrcuma dorada', value: 'Antiinflamatorio · Cúrcuma + Leche Coco' }
        ]
      },
      // ----- Día 1 (Martes) -----
      {
        breakfastOptions: [
          createRecipe('Bowl de avena y frutos rojos', 310, 10, 8,
            [{ name: 'Copos de avena', qty: '80 g' }, { name: 'Leche vegetal', qty: '400 ml' }, { name: 'Frutos rojos', qty: '150 g' }, { name: 'Nueces picadas', qty: '20 g' }, { name: 'Miel', qty: '1 cucharadita' }, { name: 'Canela', qty: '1 pizca' }],
            'Cuece los copos de avena con la leche vegetal a fuego suave 5-7 minutos, removiendo, hasta que quede una crema espesa. Reparte en dos cuencos y corona con los frutos rojos, las nueces picadas, un hilo de miel y la canela. En verano puedes dejar la avena en remojo toda la noche en la nevera y tomarla fría.'),
          createRecipe('Pan con tomate y jamón serrano', 380, 20, 16,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Jamón serrano', qty: '80 g' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Ajo', qty: '1 diente' }],
            'Tuesta el pan y frótalo ligeramente con el ajo. Ralla el tomate, escúrrelo un poco y repártelo sobre las tostadas con una pizca de sal y el aceite. Termina cubriendo con las lonchas de jamón serrano recién cortado.', 'General', null, 'normal'),
          createRecipe('Café con churros', 400, 6, 18,
            [{ name: 'Harina', qty: '125 g' }, { name: 'Agua', qty: '250 ml' }, { name: 'Sal', qty: '1 pizca' }, { name: 'Aceite de oliva suave', qty: '400 ml' }, { name: 'Azúcar', qty: '2 cucharadas' }, { name: 'Café', qty: '2 tazas' }],
            'Hierve el agua con la sal, retira del fuego y añade la harina de golpe; remueve enérgicamente hasta obtener una masa lisa. Pasa la masa templada a una manga con boquilla rizada. Calienta el aceite a 180 °C y fríe tiras de masa hasta que estén doradas, escúrrelas sobre papel y rebózalas en azúcar. Sirve con café recién hecho o con chocolate caliente.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Gazpacho andaluz', 320, 6, 18,
            [{ name: 'Tomate maduro', qty: '600 g' }, { name: 'Pepino', qty: '1/2 unidad' }, { name: 'Pimiento verde', qty: '1/2 unidad' }, { name: 'Ajo', qty: '1/2 diente' }, { name: 'Pan duro', qty: '30 g' }, { name: 'Aceite de oliva virgen extra', qty: '3 cucharadas' }, { name: 'Vinagre de jerez', qty: '1 cucharada' }, { name: 'Agua fría', qty: '100 ml' }, { name: 'Sal', qty: 'al gusto' }],
            'Trocea los tomates, el pepino pelado, el pimiento y el ajo y tritúralos con el pan remojado, el vinagre y la sal durante 2 minutos. Con la batidora en marcha añade el aceite poco a poco para que emulsione y ajusta el espesor con el agua fría. Pasa por un colador fino si lo quieres más sedoso y refrigera al menos 2 horas. Sirve muy frío con picatostes o verdura picada por encima.'),
          createRecipe('Cocido madrileño', 680, 34, 28,
            [{ name: 'Garbanzos', qty: '250 g' }, { name: 'Morcillo de ternera', qty: '250 g' }, { name: 'Pollo', qty: '1/4 unidad' }, { name: 'Tocino fresco', qty: '60 g' }, { name: 'Chorizo', qty: '1 unidad' }, { name: 'Hueso de jamón', qty: '1 unidad' }, { name: 'Zanahoria', qty: '2 unidades' }, { name: 'Patata', qty: '2 unidades' }, { name: 'Repollo', qty: '1/4 unidad' }, { name: 'Fideos finos', qty: '60 g' }, { name: 'Sal', qty: 'al gusto' }],
            'Pon los garbanzos en remojo la víspera con agua templada y sal. En una olla grande con agua fría mete el morcillo, el pollo, el tocino y el hueso de jamón; lleva a ebullición y espuma bien. Añade los garbanzos en una red y cuece a fuego suave unas 2 horas (45 minutos en olla exprés). Incorpora las zanahorias y las patatas y cuece 30 minutos más; mientras, cuece aparte el repollo con el chorizo. Cuela parte del caldo y cuece en él los fideos 3 minutos. Sirve en tres vuelcos: primero la sopa, luego los garbanzos con la verdura y por último las carnes troceadas.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Tortilla francesa con ensalada', 340, 18, 22,
            [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Cebolleta', qty: '1/4 unidad' }, { name: 'Aceite de oliva', qty: '2 cucharaditas' }, { name: 'Vinagre', qty: '1 cucharadita' }, { name: 'Sal', qty: 'al gusto' }],
            'Bate los huevos con una pizca de sal sin que lleguen a espumar. Calienta una sartén antiadherente con unas gotas de aceite, vierte el huevo y, con el fuego medio, ve plegando la tortilla sobre sí misma antes de que cuaje del todo para que quede jugosa. Acompaña con la lechuga, el tomate y la cebolleta aliñados con aceite, vinagre y sal.'),
          createRecipe('Croquetas de jamón', 480, 16, 26,
            [{ name: 'Jamón serrano', qty: '100 g' }, { name: 'Mantequilla', qty: '50 g' }, { name: 'Harina', qty: '60 g' }, { name: 'Leche', qty: '500 ml' }, { name: 'Cebolla', qty: '1/4 unidad' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Pan rallado', qty: '80 g' }, { name: 'Aceite para freír', qty: '300 ml' }, { name: 'Nuez moscada', qty: '1 pizca' }],
            'Funde la mantequilla y sofríe la cebolla muy picada con el jamón en taquitos 3 minutos. Añade la harina y cocínala 2 minutos sin que tome color; vierte la leche caliente poco a poco, removiendo, y trabaja la bechamel 15-20 minutos a fuego suave hasta que se despegue de la sartén. Sazona con nuez moscada, extiende en una fuente y enfría en la nevera al menos 4 horas. Forma las croquetas, pásalas por huevo batido y pan rallado y fríelas en aceite bien caliente hasta dorarlas. Sirve con ensalada fresca.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Smoothie de frutos rojos', value: 'Antiinflamatorio · Arándanos + Frambuesa + Miel' },
          { name: 'Agua infusionada menta', value: 'Digestivo · Pepino + Menta + Limón' },
          { name: 'Jugo verde depurativo', value: 'Drenante linfático · Manzana + Apio + Perejil' }
        ]
      },
      // ----- Día 2 (Miércoles) -----
      {
        breakfastOptions: [
          createRecipe('Tostada de aguacate y huevo', 360, 16, 18,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Aguacate', qty: '1 unidad' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Vinagre', qty: '1 cucharada' }, { name: 'Sal y pimienta', qty: 'al gusto' }],
            'Para los huevos poché, hierve agua con el vinagre, crea un remolino y cuaja cada huevo 3 minutos; también puedes cocerlos 10 minutos si los prefieres duros. Machaca el aguacate con el zumo de limón, sal y pimienta. Tuesta el pan, extiende la crema de aguacate y corona cada tostada con un huevo.'),
          createRecipe('Yogur griego con miel y nueces', 300, 14, 14,
            [{ name: 'Yogur griego', qty: '300 g' }, { name: 'Miel', qty: '2 cucharaditas' }, { name: 'Nueces', qty: '30 g' }, { name: 'Canela', qty: '1 pizca' }],
            'Reparte el yogur griego en dos cuencos. Trocea las nueces y tuéstalas 2 minutos en una sartén sin aceite para potenciar su sabor. Reparte las nueces sobre el yogur, riega con la miel y termina con una pizca de canela.'),
          createRecipe('Magdalenas caseras con café', 360, 6, 16,
            [{ name: 'Harina', qty: '125 g' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Azúcar', qty: '100 g' }, { name: 'Aceite de oliva suave', qty: '100 ml' }, { name: 'Leche', qty: '60 ml' }, { name: 'Levadura química', qty: '8 g' }, { name: 'Ralladura de limón', qty: '1 unidad' }, { name: 'Café', qty: '2 tazas' }],
            'Bate los huevos con el azúcar hasta que blanqueen y doblen su volumen. Añade el aceite, la leche y la ralladura y mezcla; incorpora la harina tamizada con la levadura con movimientos suaves. Reposa la masa 30 minutos en la nevera, llena los moldes 3/4 y hornea a 210 °C bajando a 190 °C unos 14-16 minutos hasta que suban con copete. Acompaña con café con leche caliente.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ensalada de quinoa y aguacate', 420, 14, 21,
            [{ name: 'Quinoa', qty: '120 g' }, { name: 'Aguacate', qty: '1 unidad' }, { name: 'Tomate cherry', qty: '12 unidades' }, { name: 'Pepino', qty: '1/2 unidad' }, { name: 'Cebolla morada', qty: '1/4 unidad' }, { name: 'Zumo de limón', qty: '2 cucharadas' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Perejil fresco', qty: 'al gusto' }],
            'Lava la quinoa bajo el grifo y cuécela en el doble de agua con sal 15 minutos hasta que el grano se abra; escúrrela y deja enfriar. Mezcla en una ensaladera con los cherry partidos, el pepino en dados, la cebolla en pluma fina y el aguacate troceado. Aliña con el limón, el aceite, sal y perejil picado justo antes de servir.'),
          createRecipe('Fabada asturiana', 720, 30, 38,
            [{ name: 'Fabes', qty: '250 g' }, { name: 'Chorizo asturiano', qty: '1 unidad' }, { name: 'Morcilla asturiana', qty: '1 unidad' }, { name: 'Panceta curada', qty: '80 g' }, { name: 'Lacón', qty: '100 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Hoja de laurel', qty: '1 unidad' }, { name: 'Azafrán', qty: '1 pizca' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Pon las fabes en remojo en agua fría la víspera y desala el lacón si lo necesita. Ponlas a cocer cubiertas de agua fría con el compango (chorizo, morcilla, panceta y lacón), la cebolla, el laurel y el aceite; cuando hierva, espuma y baja el fuego al mínimo. Cuece 2-3 horas con la olla a penas burbujeando, asustando las fabes con agua fría dos o tres veces y moviendo la olla en vaivén sin remover con cuchara para que no se rompan. Añade el azafrán al final, rectifica de sal y deja reposar media hora; sirve las fabes con el compango troceado.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Merluza a la plancha con verduras', 410, 34, 15,
            [{ name: 'Lomos de merluza', qty: '350 g' }, { name: 'Calabacín', qty: '1/2 unidad' }, { name: 'Pimiento rojo', qty: '1/2 unidad' }, { name: 'Espárragos verdes', qty: '6 unidades' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Perejil', qty: 'al gusto' }],
            'Saltea el calabacín en medias lunas, el pimiento en tiras y los espárragos troceados con una cucharada de aceite y el ajo laminado 6-8 minutos; deben quedar al dente. Seca bien los lomos de merluza, salpimienta y hazlos en plancha bien caliente con el resto del aceite 3 minutos por el lado de la piel y 2 por el otro. Sirve la merluza sobre las verduras con un chorrito de limón y perejil picado.'),
          createRecipe('Pulpo a la gallega', 460, 28, 20,
            [{ name: 'Pulpo cocido', qty: '300 g' }, { name: 'Patata', qty: '300 g' }, { name: 'Pimentón dulce', qty: '1 cucharadita' }, { name: 'Pimentón picante', qty: '1/2 cucharadita' }, { name: 'Aceite de oliva virgen extra', qty: '3 cucharadas' }, { name: 'Sal gruesa', qty: 'al gusto' }],
            'Cuece las patatas enteras con piel en agua con sal 20-25 minutos; pélalas y córtalas en rodajas gruesas (cachelos). Templa el pulpo en la misma agua 2 minutos y córtalo en rodajas con tijera. Monta el plato con la cama de cachelos y el pulpo encima, espolvorea los dos pimentones y la sal gruesa y riega generosamente con el aceite de oliva en crudo.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Batido de avena y canela', value: 'Digestivo · Avena + Manzana + Canela' },
          { name: 'Jugo de manzana verde', value: 'Digestivo · Manzana + Jengibre' },
          { name: 'Smoothie antiinflamatorio', value: 'Antiinflamatorio · Cúrcuma + Leche de coco' }
        ]
      },
      // ----- Día 3 (Jueves) -----
      {
        breakfastOptions: [
          createRecipe('Porridge de avena con plátano', 320, 11, 8,
            [{ name: 'Copos de avena', qty: '90 g' }, { name: 'Leche de almendra', qty: '400 ml' }, { name: 'Plátano', qty: '1 unidad' }, { name: 'Canela', qty: '1 cucharadita' }, { name: 'Miel', qty: '1 cucharadita' }, { name: 'Semillas de chía', qty: '1 cucharada' }],
            'Pon la avena con la leche de almendra en un cazo y cuece a fuego suave 5-7 minutos removiendo hasta que espese y quede cremosa. Retira del fuego y mezcla las semillas de chía. Sirve con el plátano en rodajas, la canela y un hilo de miel por encima.'),
          createRecipe('Smoothie tropical de mango', 320, 8, 12,
            [{ name: 'Mango', qty: '250 g' }, { name: 'Plátano', qty: '1 unidad' }, { name: 'Leche de coco', qty: '300 ml' }, { name: 'Semillas de chía', qty: '2 cucharadas' }, { name: 'Zumo de lima', qty: '1 cucharada' }],
            'Pela y trocea el mango y el plátano (si los congelas antes, el batido queda como un sorbete). Tritura con la leche de coco y el zumo de lima 1 minuto hasta que quede sedoso. Reparte en dos vasos, añade las semillas de chía, remueve y deja reposar 5 minutos para que hidraten.', 'Bebida', 'Energético'),
          createRecipe('Bocadillo de tortilla', 450, 18, 22,
            [{ name: 'Pan tipo baguette', qty: '1 unidad' }, { name: 'Huevo', qty: '3 unidades' }, { name: 'Patata', qty: '200 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '150 ml' }, { name: 'Sal', qty: 'al gusto' }],
            'Corta la patata en láminas finas y póchala con la cebolla en el aceite a fuego medio 15 minutos; escurre bien. Mezcla con los huevos batidos y sal y cuaja una tortilla jugosa, 2-3 minutos por cada lado. Abre la baguette, rellénala con la tortilla recién hecha y córtala en dos bocadillos.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Pisto manchego con huevo', 440, 16, 22,
            [{ name: 'Calabacín', qty: '1 unidad' }, { name: 'Pimiento rojo', qty: '1 unidad' }, { name: 'Pimiento verde', qty: '1 unidad' }, { name: 'Cebolla', qty: '1 unidad' }, { name: 'Tomate triturado', qty: '400 g' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Aceite de oliva', qty: '3 cucharadas' }, { name: 'Azúcar', qty: '1 pizca' }],
            'Sofríe la cebolla y los pimientos en dados con el aceite 10 minutos a fuego medio. Añade el calabacín en dados y rehoga 10 minutos más. Incorpora el tomate triturado con la pizca de azúcar y sal y cocina destapado 20 minutos, removiendo, hasta que el agua se evapore y el pisto quede meloso. Corona con los huevos hechos a la plancha o escalfados sobre el propio pisto, tapando 3 minutos.'),
          createRecipe('Arroz a la cubana', 620, 16, 24,
            [{ name: 'Arroz largo', qty: '180 g' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Tomate frito', qty: '200 g' }, { name: 'Plátano', qty: '1 unidad' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Aceite de oliva', qty: '4 cucharadas' }, { name: 'Sal', qty: 'al gusto' }],
            'Rehoga el ajo entero en una cucharada de aceite, añade el arroz, dale una vuelta y cuece con el doble de agua y sal 12 minutos; deja reposar tapado. Fríe el plátano cortado a lo largo hasta que esté dorado. Fríe los huevos en aceite bien caliente con puntilla. Desmolda el arroz con una taza, salsea con el tomate frito caliente y acompaña con el huevo y el plátano.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Crema de calabaza con jengibre', 360, 9, 12,
            [{ name: 'Calabaza', qty: '500 g' }, { name: 'Jengibre fresco', qty: '10 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Puerro', qty: '1/2 unidad' }, { name: 'Caldo vegetal', qty: '400 ml' }, { name: 'Aceite de oliva', qty: '1 cucharada' }, { name: 'Pipas de calabaza', qty: '1 cucharada' }],
            'Sofríe la cebolla y el puerro picados con el aceite 5 minutos sin que tomen color. Añade la calabaza en dados y el jengibre rallado, rehoga 2 minutos y cubre con el caldo. Cuece 20 minutos hasta que la calabaza esté tierna y tritura hasta obtener una crema fina; ajusta de sal y de espesor con más caldo si hace falta. Sirve con las pipas tostadas por encima.'),
          createRecipe('Sepia a la plancha con alioli', 430, 30, 20,
            [{ name: 'Sepia limpia', qty: '400 g' }, { name: 'Ajo', qty: '2 dientes' }, { name: 'Alioli', qty: '2 cucharadas' }, { name: 'Perejil picado', qty: '2 cucharadas' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Limón', qty: '1/2 unidad' }],
            'Seca muy bien la sepia y haz unos cortes superficiales en rejilla por la parte interior para que no se encoja. Plancha o sartén muy caliente con el aceite: marca la sepia 2-3 minutos por cada lado hasta que esté dorada y tierna. Mezcla el ajo y el perejil picados y repártelos por encima con un chorrito de limón; sirve con el alioli aparte.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Smoothie de pepino y menta', value: 'Digestivo · Pepino + Menta + Limón' },
          { name: 'Agua de limón detox', value: 'Limpieza hígado · Limón + Jengibre + Miel' },
          { name: 'Jugo de granada y moras', value: 'Antioxidante · Granada + Moras + Limón' }
        ]
      },
      // ----- Día 4 (Viernes) -----
      {
        breakfastOptions: [
          createRecipe('Tostada con queso fresco y mermelada', 330, 12, 12,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Queso fresco', qty: '100 g' }, { name: 'Mermelada', qty: '2 cucharadas' }, { name: 'Nueces', qty: '10 g' }],
            'Tuesta el pan hasta que esté crujiente. Corta el queso fresco en láminas gruesas y repártelo sobre las tostadas. Cubre con una capa fina de mermelada y termina con unas nueces troceadas para dar un toque crujiente.'),
          createRecipe('Bowl de yogur y granola', 340, 14, 10,
            [{ name: 'Yogur natural', qty: '300 g' }, { name: 'Granola', qty: '80 g' }, { name: 'Fruta fresca', qty: '150 g' }, { name: 'Miel', qty: '1 cucharadita' }],
            'Reparte el yogur en dos cuencos fríos. Trocea la fruta de temporada (plátano, fresas, kiwi o lo que tengas) y colócala por encima. Añade la granola en el último momento para que no se ablande y termina con un hilo de miel.'),
          createRecipe('Churros con chocolate', 440, 7, 20,
            [{ name: 'Harina', qty: '125 g' }, { name: 'Agua', qty: '250 ml' }, { name: 'Sal', qty: '1 pizca' }, { name: 'Aceite para freír', qty: '400 ml' }, { name: 'Chocolate negro', qty: '100 g' }, { name: 'Leche', qty: '200 ml' }, { name: 'Maicena', qty: '1 cucharadita' }, { name: 'Azúcar', qty: '2 cucharadas' }],
            'Hierve el agua con la sal, añade la harina de golpe fuera del fuego y remueve hasta lograr una masa lisa; pásala a una manga con boquilla rizada. Fríe tiras de masa en aceite a 180 °C hasta dorarlas, escurre y reboza en azúcar. Para el chocolate, calienta la leche con la maicena disuelta, añade el chocolate troceado y remueve a fuego suave hasta que espese. Sirve los churros recién hechos con el chocolate bien caliente.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Salmón a la plancha con espárragos', 520, 34, 20,
            [{ name: 'Lomos de salmón', qty: '350 g' }, { name: 'Espárragos verdes', qty: '12 unidades' }, { name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Eneldo', qty: 'al gusto' }],
            'Saca el salmón de la nevera 15 minutos antes y sécalo bien. Plancha caliente con una cucharada de aceite: cocina los lomos 4 minutos por el lado de la piel y 2 por el otro, salpimentando; deben quedar jugosos por dentro. Saltea los espárragos en la misma plancha 5 minutos. Sirve con la lechuga aliñada, el limón y eneldo por encima.'),
          createRecipe('Macarrones con chorizo', 640, 24, 28,
            [{ name: 'Macarrones', qty: '200 g' }, { name: 'Chorizo', qty: '120 g' }, { name: 'Tomate triturado', qty: '400 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Queso rallado', qty: '40 g' }, { name: 'Aceite de oliva', qty: '1 cucharada' }, { name: 'Orégano', qty: '1 cucharadita' }],
            'Sofríe la cebolla y el ajo picados con el aceite, añade el chorizo en rodajas y dóralo 3 minutos. Incorpora el tomate triturado con una pizca de azúcar y sal y cocina 15 minutos a fuego suave. Cuece los macarrones en agua con sal 1 minuto menos de lo que diga el paquete, escúrrelos y mézclalos con la salsa. Pasa a una fuente, cubre con el queso y el orégano y gratina 5 minutos hasta que burbujee.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Ensalada mediterránea con ventresca', 390, 28, 20,
            [{ name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Tomate', qty: '2 unidades' }, { name: 'Ventresca de atún', qty: '160 g' }, { name: 'Aceitunas negras', qty: '20 unidades' }, { name: 'Cebolleta', qty: '1/4 unidad' }, { name: 'Huevo cocido', qty: '1 unidad' }, { name: 'Aceite de oliva virgen extra', qty: '2 cucharadas' }, { name: 'Vinagre de jerez', qty: '1 cucharadita' }],
            'Lava y trocea la lechuga y corta los tomates en gajos. Monta la ensalada con la cebolleta en aros finos, las aceitunas, el huevo cocido en cuartos y la ventresca desmenuzada en lascas grandes con su aceite. Aliña con el vinagre, una pizca de sal (poca, la ventresca ya aporta) y el aceite de oliva en el último momento.'),
          createRecipe('Albóndigas en salsa', 560, 28, 30,
            [{ name: 'Carne picada mixta', qty: '300 g' }, { name: 'Pan rallado', qty: '30 g' }, { name: 'Leche', qty: '50 ml' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Perejil', qty: '2 cucharadas' }, { name: 'Harina', qty: '2 cucharadas' }, { name: 'Cebolla', qty: '1 unidad' }, { name: 'Tomate triturado', qty: '300 g' }, { name: 'Caldo de carne', qty: '100 ml' }, { name: 'Aceite de oliva', qty: '3 cucharadas' }],
            'Mezcla la carne con el pan rallado remojado en la leche, el huevo, el ajo y el perejil picados, sal y pimienta; forma albóndigas y enharínalas. Dóralas en el aceite por tandas y resérvalas. En el mismo aceite sofríe la cebolla picada 8 minutos, añade el tomate y cocina 10 minutos; tritura la salsa si la quieres fina. Devuelve las albóndigas a la salsa con el caldo y cuece tapado a fuego suave 15 minutos. Sirve con arroz blanco o patatas.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Batido de pera y manzana', value: 'Digestivo · Pera + Manzana + Miel' },
          { name: 'Jugo cítrico energético', value: 'Energético · Naranja + Limón + Jengibre' },
          { name: 'Jugo de kale y espinaca', value: 'Inmunidad · Kale + Espinaca + Limón' }
        ]
      },
      // ----- Día 5 (Sábado) -----
      {
        breakfastOptions: [
          createRecipe('Tostada integral con aguacate', 350, 9, 18,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Aguacate', qty: '1 unidad' }, { name: 'Tomate cherry', qty: '6 unidades' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '1 cucharadita' }, { name: 'Sal en escamas', qty: '1 pizca' }],
            'Machaca el aguacate con un tenedor junto al zumo de limón y una pizca de sal, dejando algún trozo entero. Tuesta el pan y extiende la crema de aguacate generosamente. Corona con los tomates cherry partidos, la sal en escamas y un hilo de aceite de oliva.'),
          createRecipe('Zumo de naranja natural', 160, 3, 1,
            [{ name: 'Naranja de zumo', qty: '6 unidades' }],
            'Parte las naranjas por la mitad y exprímelas justo antes de tomar el zumo, sin colarlo del todo para conservar la pulpa y su fibra. Sírvelo al momento: la vitamina C se degrada con el tiempo y la luz.', 'Bebida', 'Inmunidad'),
          createRecipe('Tortitas con fruta y miel', 420, 12, 14,
            [{ name: 'Harina', qty: '120 g' }, { name: 'Levadura química', qty: '6 g' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Leche', qty: '150 ml' }, { name: 'Mantequilla', qty: '20 g' }, { name: 'Miel', qty: '2 cucharadas' }, { name: 'Fruta fresca', qty: '150 g' }, { name: 'Sal', qty: '1 pizca' }],
            'Mezcla la harina con la levadura y la sal; aparte bate el huevo con la leche y la mantequilla fundida y une ambas sin trabajar demasiado la masa. Deja reposar 10 minutos. Cuaja las tortitas en sartén antiadherente a fuego medio: vierte un cucharón, espera a que salgan burbujas y dale la vuelta 1 minuto más. Apila con la fruta troceada y la miel por encima.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ensalada templada de garbanzos', 480, 20, 16,
            [{ name: 'Garbanzos cocidos', qty: '300 g' }, { name: 'Espinacas', qty: '100 g' }, { name: 'Pimiento rojo', qty: '1/2 unidad' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Pimentón dulce', qty: '1 cucharadita' }, { name: 'Comino molido', qty: '1/2 cucharadita' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Vinagre de jerez', qty: '1 cucharadita' }],
            'Saltea el pimiento en tiras con una cucharada de aceite 5 minutos, añade el ajo laminado y, cuando huela, las espinacas hasta que se ablanden. Incorpora los garbanzos escurridos, el pimentón y el comino y saltea 3-4 minutos para que se templen y tomen sabor. Apaga, aliña con el vinagre y el resto del aceite y sirve templado.'),
          createRecipe('Paella de marisco', 620, 30, 18,
            [{ name: 'Arroz redondo', qty: '180 g' }, { name: 'Gambas', qty: '8 unidades' }, { name: 'Mejillones', qty: '250 g' }, { name: 'Calamar', qty: '150 g' }, { name: 'Caldo de pescado', qty: '500 ml' }, { name: 'Tomate rallado', qty: '1 unidad' }, { name: 'Ajo', qty: '2 dientes' }, { name: 'Pimentón dulce', qty: '1 cucharadita' }, { name: 'Azafrán', qty: '1 pizca' }, { name: 'Aceite de oliva', qty: '3 cucharadas' }, { name: 'Limón', qty: '1/2 unidad' }],
            'Abre los mejillones al vapor y reserva su agua colada junto al caldo. Marca las gambas en la paella con el aceite y resérvalas; sofríe el calamar en anillas 3 minutos, añade el ajo, el tomate y el pimentón y cocina 2 minutos. Incorpora el arroz, dale una vuelta, vierte el caldo caliente con el azafrán y cuece 10 minutos a fuego fuerte y 7 a fuego suave sin remover. Coloca encima las gambas y los mejillones, reposa 5 minutos tapado con un paño y sirve con limón.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pimientos rellenos de bacalao', 430, 28, 14,
            [{ name: 'Pimientos del piquillo', qty: '8 unidades' }, { name: 'Bacalao desalado', qty: '200 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Harina', qty: '1 cucharada' }, { name: 'Leche', qty: '200 ml' }, { name: 'Tomate triturado', qty: '100 g' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }],
            'Sofríe media cebolla picada, añade el bacalao desmigado y dale una vuelta. Agrega la harina, cocina 1 minuto y vierte la leche poco a poco hasta obtener una bechamel espesa con el bacalao; deja templar. Rellena los piquillos con la mezcla, colócalos en una fuente, salséalos con el tomate triturado sofrito con el resto de la cebolla y hornea 15 minutos a 180 °C.'),
          createRecipe('Hamburguesa casera con patatas', 720, 32, 38,
            [{ name: 'Carne de ternera picada', qty: '300 g' }, { name: 'Pan de hamburguesa', qty: '2 unidades' }, { name: 'Queso', qty: '2 lonchas' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Lechuga', qty: '2 hojas' }, { name: 'Cebolla roja', qty: '1/2 unidad' }, { name: 'Patata', qty: '300 g' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Sal y pimienta', qty: 'al gusto' }],
            'Corta las patatas en bastones, sécalas, mézclalas con una cucharada de aceite y sal y hornéalas a 200 °C unos 30 minutos, dándoles la vuelta a mitad. Amasa apenas la carne con sal y pimienta y forma dos hamburguesas sin apretarlas. Hazlas a la plancha 3 minutos por lado, poniendo el queso encima al final para que funda. Monta el pan tostado con lechuga, tomate, cebolla y la carne, y acompaña con las patatas.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Smoothie tropical premium', value: 'Energético · Mango + Plátano + Coco' },
          { name: 'Jugo de zanahoria', value: 'Energético · Zanahoria + Naranja' },
          { name: 'Jugo antioxidante', value: 'Antioxidante · Arándanos + Granada' }
        ]
      },
      // ----- Día 6 (Domingo) -----
      {
        breakfastOptions: [
          createRecipe('Huevos revueltos con champiñones', 330, 19, 20,
            [{ name: 'Huevo', qty: '4 unidades' }, { name: 'Champiñones', qty: '150 g' }, { name: 'Mantequilla', qty: '15 g' }, { name: 'Cebollino', qty: 'al gusto' }, { name: 'Sal y pimienta', qty: 'al gusto' }],
            'Lamina los champiñones y saltéalos a fuego vivo hasta que pierdan el agua y se doren. Baja el fuego, añade la mantequilla y los huevos apenas batidos con sal y remueve constantemente con espátula, retirando la sartén del fuego a ratos, hasta que cuajen en grumos cremosos. Sirve al momento con cebollino picado y pimienta.'),
          createRecipe('Batido de frutos rojos', 290, 6, 4,
            [{ name: 'Frutos rojos', qty: '200 g' }, { name: 'Yogur griego', qty: '200 g' }, { name: 'Leche', qty: '100 ml' }, { name: 'Miel', qty: '2 cucharaditas' }],
            'Pon los frutos rojos (frescos o congelados) en la batidora con el yogur, la leche y la miel. Tritura 1 minuto hasta que quede homogéneo y cremoso; con fruta congelada tendrá textura de sorbete. Sirve frío, recién hecho.', 'Bebida', 'Antioxidante'),
          createRecipe('Tostada francesa (torrija)', 420, 12, 18,
            [{ name: 'Pan brioche', qty: '4 rebanadas' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Leche', qty: '250 ml' }, { name: 'Azúcar', qty: '40 g' }, { name: 'Canela', qty: '1 cucharadita' }, { name: 'Mantequilla', qty: '20 g' }],
            'Calienta la leche con la mitad del azúcar y deja templar. Empapa bien las rebanadas de pan en la leche y pásalas después por el huevo batido. Dóralas en sartén con la mantequilla 2 minutos por cada lado y rebózalas en la mezcla del resto de azúcar con la canela. Sírvelas templadas.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Bowl de quinoa, pollo y verduras', 520, 34, 14,
            [{ name: 'Quinoa', qty: '120 g' }, { name: 'Pechuga de pollo', qty: '250 g' }, { name: 'Tomate cherry', qty: '10 unidades' }, { name: 'Aguacate', qty: '1/2 unidad' }, { name: 'Calabacín', qty: '1/2 unidad' }, { name: 'Zumo de limón', qty: '1 cucharada' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Comino molido', qty: '1/2 cucharadita' }],
            'Lava y cuece la quinoa en el doble de agua con sal 15 minutos; escurre y reserva. Salpimienta la pechuga, úntala con comino y una cucharada de aceite y hazla a la plancha 4-5 minutos por lado; déjala reposar y córtala en tiras. Saltea el calabacín en medias lunas 4 minutos. Monta los bowls con la quinoa de base, el pollo, el calabacín, los cherry y el aguacate, y aliña con limón y el resto del aceite.'),
          createRecipe('Cordero asado con patatas', 760, 38, 42,
            [{ name: 'Paletilla de cordero', qty: '800 g' }, { name: 'Patata', qty: '400 g' }, { name: 'Ajo', qty: '4 dientes' }, { name: 'Romero', qty: '2 ramas' }, { name: 'Vino blanco', qty: '100 ml' }, { name: 'Agua', qty: '100 ml' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }, { name: 'Sal', qty: 'al gusto' }],
            'Saca el cordero de la nevera 1 hora antes y precalienta el horno a 180 °C. Unta la paletilla con aceite, sal y los ajos machacados y colócala sobre una cama de patatas en rodajas gruesas con el romero. Vierte el vino y el agua en la fuente y asa 60-75 minutos, dando la vuelta a mitad y regando con su jugo cada 20 minutos; si se queda seca, añade un poco más de agua. Debe quedar dorada por fuera y tierna hasta el hueso; deja reposar 10 minutos antes de servir.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Crema de verduras de temporada', 300, 10, 10,
            [{ name: 'Calabacín', qty: '1 unidad' }, { name: 'Puerro', qty: '1 unidad' }, { name: 'Zanahoria', qty: '2 unidades' }, { name: 'Patata', qty: '1 unidad' }, { name: 'Caldo vegetal', qty: '500 ml' }, { name: 'Aceite de oliva', qty: '1 cucharada' }, { name: 'Sal y pimienta', qty: 'al gusto' }],
            'Sofríe el puerro en rodajas con el aceite 3 minutos. Añade la zanahoria, la patata y el calabacín troceados, rehoga 5 minutos y cubre con el caldo. Cuece 20-25 minutos hasta que todo esté tierno y tritura hasta lograr una crema fina; salpimienta. Sirve con un hilo de aceite en crudo o unos picatostes.'),
          createRecipe('Tosta de salmón ahumado', 380, 22, 18,
            [{ name: 'Pan integral', qty: '2 rebanadas' }, { name: 'Salmón ahumado', qty: '120 g' }, { name: 'Queso crema', qty: '60 g' }, { name: 'Alcaparras', qty: '1 cucharada' }, { name: 'Eneldo', qty: 'al gusto' }, { name: 'Limón', qty: '1/4 unidad' }],
            'Tuesta el pan hasta que esté crujiente y deja templar un minuto. Unta una capa generosa de queso crema y reparte el salmón ahumado en ondas. Termina con las alcaparras, el eneldo y unas gotas de limón con un toque de pimienta recién molida.')
        ],
        liquids: [
          { name: 'Smoothie de recuperación', value: 'Recuperación muscular · Plátano + Proteína + Almendra' },
          { name: 'Agua infusionada limón', value: 'Limpieza hígado · Limón + Jengibre' },
          { name: 'Batido de coco y jengibre', value: 'Antiinflamatorio · Coco + Jengibre + Canela' }
        ]
      }
    ]
  },
  ro: {
    badge: 'Cocina Rumana',
    language: 'Rumano',
    season: 'Verano',
    seasonIcon: 'restaurant',
    days: [
      // ----- Día 0 -----
      {
        breakfastOptions: [
          createRecipe('Iaurt cu nuci și miere', 320, 12, 14,
            [{ name: 'Iaurt grecesc', qty: '300 g' }, { name: 'Nuci', qty: '40 g' }, { name: 'Miere', qty: '2 lingurițe' }, { name: 'Scorțișoară', qty: '1 praf' }],
            'Împarte iaurtul în două boluri reci. Rupe nucile în bucăți și rumenește-le 2 minute într-o tigaie uscată ca să își intensifice aroma. Presară nucile peste iaurt, adaugă mierea în fir subțire și termină cu un praf de scorțișoară.'),
          createRecipe('Omletă cu brânză și roșii', 350, 18, 22,
            [{ name: 'Ouă', qty: '4 bucăți' }, { name: 'Brânză telemea', qty: '80 g' }, { name: 'Roșii', qty: '1 unitate' }, { name: 'Ceapă verde', qty: '2 fire' }, { name: 'Unt', qty: '15 g' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Taie roșia cubulețe și las-o 5 minute într-o sită să se scurgă. Bate ouăle cu piper și foarte puțină sare (telemeaua e sărată). Încinge untul la foc mediu, toarnă ouăle și, când încep să se închege, presară brânza sfărâmată, roșia și ceapa verde. Pliază omleta în două și mai las-o 1 minut, să rămână cremoasă la mijloc.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de burtă', 420, 22, 18,
            [{ name: 'Burtă de vită', qty: '500 g' }, { name: 'Os de vită cu măduvă', qty: '1 bucată' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Țelină', qty: '50 g' }, { name: 'Smântână', qty: '150 g' }, { name: 'Gălbenușuri', qty: '2 bucăți' }, { name: 'Usturoi', qty: '4 căței' }, { name: 'Oțet', qty: '2 linguri' }, { name: 'Foi de dafin', qty: '2 bucăți' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Spală bine burta și fierbe-o cu osul, morcovii, țelina și foile de dafin în apă cu sare circa 3 ore (sau 1 oră la oala sub presiune), spumând des. Scoate burta și taie-o fâșii subțiri; strecoară zeama și pune fâșiile înapoi. Bate smântâna cu gălbenușurile, subțiază cu câteva polonice de zeamă caldă și toarnă în ciorba luată de pe foc, amestecând. Adaugă usturoiul pisat frecat cu oțetul, potrivește de sare și servește fierbinte, cu ardei iute după gust.', 'General', null, 'normal'),
          createRecipe('Sarmale cu mămăligă', 620, 26, 30,
            [{ name: 'Varză murată', qty: '1 bucată' }, { name: 'Carne tocată de porc', qty: '400 g' }, { name: 'Orez', qty: '60 g' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Costiță afumată', qty: '80 g' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Cimbru uscat', qty: '1 linguriță' }, { name: 'Foi de dafin', qty: '2 bucăți' }, { name: 'Mălai', qty: '200 g' }, { name: 'Apă', qty: '800 ml' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Călește ceapa tocată, amestec-o cu carnea, orezul crud, cimbrul, sare și piper. Desfă foile de varză, taie cotorul gros și învelește sarmale mici și strânse. Așază-le în oală pe un pat de varză tocată, cu costița și foile de dafin printre ele, acoperă cu apă și bulion și fierbe la foc mic 2-3 ore, până scade. Pentru mămăligă, fierbe apa cu sare, toarnă mălaiul în ploaie și amestecă 25 de minute. Servește sarmalele fierbinți cu mămăligă și smântână.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Salată de boeuf', 480, 14, 28,
            [{ name: 'Carne de vită fiartă', qty: '150 g' }, { name: 'Cartofi', qty: '300 g' }, { name: 'Morcovi', qty: '2 bucăți' }, { name: 'Mazăre', qty: '100 g' }, { name: 'Castraveți murați', qty: '3 bucăți' }, { name: 'Maioneză', qty: '4 linguri' }, { name: 'Muștar', qty: '1 linguriță' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Fierbe cartofii și morcovii în coajă până sunt pătrunși, dar tari; lasă-i să se răcească complet. Taie cubulețe mici legumele, carnea fiartă și castraveții murați bine scurși. Amestecă totul cu mazărea, maioneza și muștarul și potrivește de sare și piper. Dă salata la rece cel puțin o oră înainte de servire și ornează cu maioneză și murături deasupra.'),
          createRecipe('Mici cu muștar', 560, 30, 38,
            [{ name: 'Carne tocată mixtă de vită și porc', qty: '500 g' }, { name: 'Bicarbonat de sodiu', qty: '1/2 linguriță' }, { name: 'Usturoi', qty: '3 căței' }, { name: 'Cimbru uscat', qty: '1 linguriță' }, { name: 'Boia dulce', qty: '1/2 linguriță' }, { name: 'Supă de oase rece', qty: '50 ml' }, { name: 'Muștar', qty: '2 linguri' }, { name: 'Pâine', qty: '2 felii' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Pisează usturoiul cu puțină sare și amestecă-l cu supa rece ca un mujdei subțire. Frământă bine carnea tocată cu bicarbonatul, cimbrul, boiaua, sarea, piperul și mujdeiul strecurat, 8-10 minute, până devine lipicioasă ca o pastă. Acoperă și lasă compoziția la frigider minimum 3 ore, ideal peste noapte, ca să se lege aromele. Cu mâinile umede formează mici de circa 8 cm și ține-i 20 de minute la temperatura camerei. Încinge bine grătarul sau o tigaie-grill și frige micii 4-5 minute pe fiecare parte, întorcându-i des cu cleștele, fără să îi înțepi, până fac crustă rumenă. Servește-i imediat, cu muștar din belșug și pâine.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Compot de mere', value: 'Digestivo · Mere + Scorțișoară' },
          { name: 'Limonadă cu mentă', value: 'Refrescante · Lămâie + Mentă' }
        ]
      },
      // ----- Día 1 -----
      {
        breakfastOptions: [
          createRecipe('Brânză proaspătă cu ridichi', 320, 14, 12,
            [{ name: 'Brânză proaspătă de vaci', qty: '200 g' }, { name: 'Ridichi', qty: '6 bucăți' }, { name: 'Ceapă verde', qty: '2 fire' }, { name: 'Pâine integrală', qty: '2 felii' }, { name: 'Sare', qty: 'după gust' }],
            'Amestecă brânza proaspătă cu ceapa verde tocată mărunt și puțină sare. Spală ridichile și taie-le felii subțiri. Servește brânza pe pâinea integrală proaspătă sau prăjită, cu feliile de ridiche deasupra și piper proaspăt măcinat.'),
          createRecipe('Smoothie cu spanac și măr', 300, 8, 10,
            [{ name: 'Spanac', qty: '100 g' }, { name: 'Măr verde', qty: '1 unitate' }, { name: 'Banană', qty: '1 unitate' }, { name: 'Apă rece', qty: '200 ml' }, { name: 'Zeamă de lămâie', qty: '1 lingură' }],
            'Spală bine spanacul și taie mărul în bucăți, fără cotor. Pune toate ingredientele în blender și mixează 1 minut, până devine complet cremos, fără bucăți. Servește imediat, rece, ca să păstreze culoarea vie și vitaminele.', 'Bebida', 'Depurativo')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de fasole cu afumătură', 480, 22, 18,
            [{ name: 'Fasole albă', qty: '250 g' }, { name: 'Ciolan afumat', qty: '300 g' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Țelină', qty: '50 g' }, { name: 'Ardei gras', qty: '1 bucată' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Borș', qty: '200 ml' }, { name: 'Cimbru și leuștean', qty: 'după gust' }, { name: 'Sare', qty: 'după gust' }],
            'Pune fasolea la înmuiat de seara. Fierbe ciolanul afumat 1 oră, apoi adaugă fasolea scursă și fierbe-le împreună până se înmoaie. Adaugă morcovul, ceapa, țelina și ardeiul tocate și mai fierbe 20 de minute. Pune bulionul și borșul fiert separat, lasă să dea câteva clocote și potrivește de sare. La final adaugă cimbrul și leușteanul tocat; servește cu carnea de pe ciolan desfăcută în bucăți.', 'General', null, 'normal'),
          createRecipe('Tochitură moldovenească', 700, 34, 40,
            [{ name: 'Carne de porc', qty: '400 g' }, { name: 'Cârnați afumați', qty: '150 g' }, { name: 'Usturoi', qty: '4 căței' }, { name: 'Vin alb', qty: '100 ml' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Mălai', qty: '200 g' }, { name: 'Brânză de burduf', qty: '100 g' }, { name: 'Ouă', qty: '2 bucăți' }, { name: 'Cimbru', qty: '1 linguriță' }],
            'Taie carnea cubulețe și rumenește-o în untură sau ulei la foc mare; adaugă cârnații în rondele și mai călește 5 minute. Stinge cu vinul, adaugă bulionul, usturoiul pisat și cimbrul și lasă să scadă la foc mic 20 de minute, până sosul leagă. Între timp fă mămăliga: apă cu sare, mălai în ploaie, amestecat 25 de minute. Servește tochitura lângă mămăligă, cu brânză de burduf rasă deasupra și câte un ou ochi pus în vârf.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Chifteluțe de pui la cuptor', 430, 28, 15,
            [{ name: 'Piept de pui tocat', qty: '300 g' }, { name: 'Ceapă', qty: '1/2 bucată' }, { name: 'Usturoi', qty: '1 cățel' }, { name: 'Ou', qty: '1 bucată' }, { name: 'Pesmet', qty: '3 linguri' }, { name: 'Pătrunjel tocat', qty: '2 linguri' }, { name: 'Ulei', qty: '1 lingură' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Amestecă puiul tocat cu ceapa dată pe răzătoare și bine stoarsă, usturoiul pisat, oul, pesmetul și pătrunjelul; potrivește de sare și piper. Formează chifteluțe cu mâinile umede și așază-le pe o tavă cu hârtie de copt, unse cu ulei. Coace-le la 200 °C circa 20-25 de minute, întorcându-le la jumătate, până sunt rumene. Bune și calde, și reci, cu salată verde.'),
          createRecipe('Mâncare de praz cu măsline', 380, 10, 13,
            [{ name: 'Praz', qty: '3 fire' }, { name: 'Măsline negre', qty: '100 g' }, { name: 'Roșii cubulețe', qty: '200 g' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Ulei de măsline', qty: '3 linguri' }, { name: 'Foi de dafin', qty: '1 bucată' }, { name: 'Zahăr', qty: '1 praf' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Curăță prazul și taie-l rondele de două degete; călește-l în ulei la foc mediu până se înmoaie și prinde puțină culoare. Adaugă roșiile, bulionul, foaia de dafin, zahărul, sare și piper și un pahar de apă. Fierbe acoperit la foc mic 20 de minute, adaugă măslinele și mai lasă 10 minute să scadă sosul. Se servește caldă sau rece, cu pâine.')
        ],
        liquids: [
          { name: 'Suc de morcov', value: 'Energético · Morcov + Portocală' },
          { name: 'Ceai de tei', value: 'Relajante · Tei + Miere' }
        ]
      },
      // ----- Día 2 -----
      {
        breakfastOptions: [
          createRecipe('Terci de ovăz cu fructe', 310, 10, 7,
            [{ name: 'Fulgi de ovăz', qty: '90 g' }, { name: 'Lapte', qty: '400 ml' }, { name: 'Fructe proaspete', qty: '150 g' }, { name: 'Miere', qty: '1 linguriță' }, { name: 'Scorțișoară', qty: '1 praf' }],
            'Fierbe fulgii de ovăz cu laptele la foc mic 5-7 minute, amestecând des, până se îngroașă și devin cremoși. Toarnă în boluri și adaugă fructele proaspete tăiate (banane, fructe de pădure, măr), mierea în fir subțire și scorțișoara. Iarna e bun fierbinte, vara îl poți lăsa peste noapte la frigider.'),
          createRecipe('Papanași cu smântână', 520, 14, 26,
            [{ name: 'Brânză de vaci', qty: '250 g' }, { name: 'Ou', qty: '1 bucată' }, { name: 'Făină', qty: '120 g' }, { name: 'Griș', qty: '1 lingură' }, { name: 'Zahăr', qty: '2 linguri' }, { name: 'Coajă de lămâie', qty: '1 bucată' }, { name: 'Bicarbonat', qty: '1/2 linguriță' }, { name: 'Smântână', qty: '100 g' }, { name: 'Dulceață de afine', qty: '4 linguri' }, { name: 'Ulei pentru prăjit', qty: '300 ml' }],
            'Amestecă brânza de vaci bine scursă cu oul, zahărul, grișul, coaja de lămâie și bicarbonatul, apoi adaugă făina treptat până obții un aluat moale, ușor lipicios. Cu mâinile date prin făină formează două gogoși cu gaură la mijloc și două biluțe. Prăjește-le în ulei încins la foc mediu, 3-4 minute pe fiecare parte, până sunt rumene și pătrunse. Servește papanașii calzi, cu smântână din belșug și dulceață de afine deasupra.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Iahnie de fasole', 460, 20, 12,
            [{ name: 'Fasole albă', qty: '250 g' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Morcov', qty: '1 bucată' }, { name: 'Usturoi', qty: '3 căței' }, { name: 'Bulion', qty: '3 linguri' }, { name: 'Foi de dafin', qty: '2 bucăți' }, { name: 'Boia dulce', qty: '1 linguriță' }, { name: 'Cimbru', qty: '1 linguriță' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Înmoaie fasolea de seara, apoi fierbe-o în două ape (prima se aruncă după 10 minute) cu o foaie de dafin, până se înmoaie. Călește ceapa tocată și morcovul rondele în ulei, adaugă usturoiul, boiaua și bulionul și stinge cu un polonic din zeama fasolei. Toarnă sosul peste fasolea scursă, adaugă cimbrul și fierbe totul împreună 15 minute, să se lege. Merge de minune cu murături sau ceapă roșie.'),
          createRecipe('Ardei umpluți', 540, 24, 22,
            [{ name: 'Ardei gras', qty: '4 bucăți' }, { name: 'Carne tocată mixtă', qty: '300 g' }, { name: 'Orez', qty: '60 g' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Bulion', qty: '400 ml' }, { name: 'Smântână', qty: '2 linguri' }, { name: 'Mărar și pătrunjel', qty: 'după gust' }, { name: 'Foi de dafin', qty: '1 bucată' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Taie capacele ardeilor și scoate semințele. Amestecă carnea cu orezul crud, ceapa călită, verdeața tocată, sare și piper și umple ardeii fără să îndeși. Așază-i în oală cu gura în sus, pune capacele, toarnă bulionul subțiat cu apă cât să îi acopere și foaia de dafin. Fierbe la foc mic, acoperit, 45-50 de minute. Servește cu smântână și mărar proaspăt.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Plachie de pește', 470, 30, 18,
            [{ name: 'Pește alb', qty: '400 g' }, { name: 'Ceapă', qty: '3 bucăți' }, { name: 'Roșii', qty: '2 bucăți' }, { name: 'Ardei gras', qty: '1 bucată' }, { name: 'Usturoi', qty: '3 căței' }, { name: 'Vin alb', qty: '50 ml' }, { name: 'Ulei', qty: '3 linguri' }, { name: 'Foi de dafin', qty: '2 bucăți' }, { name: 'Lămâie', qty: '1/2 bucată' }, { name: 'Pătrunjel', qty: 'după gust' }],
            'Călește ceapa tăiată solzișori în ulei până devine aurie, adaugă ardeiul și usturoiul și mai lasă 3 minute. Așază jumătate din legume într-o tavă, pune peștele sărat și piperat deasupra și acoperă cu restul de legume și roșiile felii. Toarnă vinul, adaugă dafinul și coace la 180 °C circa 25-30 de minute, până peștele se desface în lamele. Servește cu lămâie și pătrunjel tocat.'),
          createRecipe('Zacuscă cu pâine', 320, 6, 16,
            [{ name: 'Vinete coapte', qty: '300 g' }, { name: 'Ardei copți', qty: '150 g' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Bulion', qty: '80 g' }, { name: 'Ulei', qty: '3 linguri' }, { name: 'Foi de dafin', qty: '1 bucată' }, { name: 'Pâine', qty: '2 felii' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Coace vinetele și ardeii pe flacără sau la cuptor până se înmoaie, curăță-le și toacă-le mărunt. Călește ceapa tocată în ulei, adaugă vinetele, ardeii, bulionul, dafinul, sare și piper și fierbe la foc mic 30 de minute, amestecând des să nu se prindă. Las-o să se răcorească și întinde-o pe pâine proaspătă sau prăjită; e la fel de bună caldă sau rece.')
        ],
        liquids: [
          { name: 'Compot de prune', value: 'Digestivo · Prune + Scorțișoară' },
          { name: 'Suc verde', value: 'Depurativo · Spanac + Măr + Lămâie' }
        ]
      },
      // ----- Día 3 -----
      {
        breakfastOptions: [
          createRecipe('Ouă ochiuri cu mămăligă', 360, 18, 20,
            [{ name: 'Ouă', qty: '4 bucăți' }, { name: 'Mălai', qty: '150 g' }, { name: 'Apă', qty: '600 ml' }, { name: 'Brânză telemea', qty: '60 g' }, { name: 'Unt', qty: '15 g' }, { name: 'Sare', qty: 'după gust' }],
            'Fierbe apa cu sare, toarnă mălaiul în ploaie și amestecă la foc mic 20-25 de minute, până mămăliga se desprinde de pe pereți. Prăjește ouăle ochiuri în unt la foc mediu, cu albușul închegat și gălbenușul moale. Pune mămăligă fierbinte în farfurii, așază ouăle deasupra și presară brânza rasă, ca să se topească de la căldură.'),
          createRecipe('Clătite cu gem', 420, 10, 14,
            [{ name: 'Făină', qty: '120 g' }, { name: 'Lapte', qty: '300 ml' }, { name: 'Ouă', qty: '2 bucăți' }, { name: 'Zahăr', qty: '1 lingură' }, { name: 'Esență de vanilie', qty: '1 linguriță' }, { name: 'Unt', qty: '20 g' }, { name: 'Gem', qty: '4 linguri' }, { name: 'Sare', qty: '1 praf' }],
            'Bate ouăle cu zahărul, sarea și vanilia, adaugă laptele și apoi făina, amestecând până nu mai sunt cocoloașe; aluatul trebuie să fie subțire, ca o smântână lichidă. Lasă-l să se odihnească 15 minute. Unge o tigaie antiaderentă cu puțin unt și coace clătite subțiri, 1 minut pe o parte și 30 de secunde pe cealaltă. Umple-le cu gem, rulează-le și servește-le calde.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de perișoare', 440, 22, 16,
            [{ name: 'Carne tocată mixtă', qty: '300 g' }, { name: 'Orez', qty: '40 g' }, { name: 'Ou', qty: '1 bucată' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Țelină', qty: '50 g' }, { name: 'Ardei gras', qty: '1/2 bucată' }, { name: 'Borș', qty: '300 ml' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Leuștean', qty: 'după gust' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Fierbe legumele tocate mărunt în 2 litri de apă cu sare 15 minute. Amestecă între timp carnea cu orezul crud, oul, o ceapă rasă, sare și piper și formează perișoare mici cu mâinile umede. Pune-le pe rând în zeama clocotindă și fierbe-le la foc mic 25 de minute, spumând. Adaugă bulionul și borșul fiert separat, mai dă câteva clocote și termină cu leuștean tocat din belșug.'),
          createRecipe('Pilaf cu legume', 480, 12, 14,
            [{ name: 'Orez', qty: '180 g' }, { name: 'Morcov', qty: '1 bucată' }, { name: 'Mazăre', qty: '100 g' }, { name: 'Ardei gras', qty: '1/2 bucată' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Supă de legume', qty: '450 ml' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Pătrunjel', qty: 'după gust' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Călește ceapa tocată cu morcovul cubulețe și ardeiul în ulei 5 minute. Adaugă orezul spălat și amestecă 2 minute să se îmbrace în ulei. Toarnă supa fierbinte, adaugă mazărea, sare și piper, acoperă și fierbe la foc mic 15 minute fără să amesteci. Lasă pilaful acoperit încă 10 minute, afânează-l cu furculița și presară pătrunjel tocat.')
        ],
        dinnerOptions: [
          createRecipe('Salată de vinete', 360, 6, 24,
            [{ name: 'Vinete', qty: '600 g' }, { name: 'Ceapă', qty: '1/2 bucată' }, { name: 'Ulei de floarea-soarelui', qty: '4 linguri' }, { name: 'Roșii', qty: '1 bucată' }, { name: 'Pâine', qty: '2 felii' }, { name: 'Sare', qty: 'după gust' }],
            'Coace vinetele pe flacără sau la grill, întorcându-le, până se înmoaie complet și coaja e arsă uniform. Curăță-le, lasă-le să se scurgă într-o sită 30 de minute, apoi toacă-le cu un cuțit de lemn sau de ceramică. Amestecă pasta cu uleiul turnat treptat, ca la maioneză, adaugă ceapa tocată mărunt și sare. Servește rece, cu felii de roșie și pâine proaspătă.'),
          createRecipe('Pui cu ciuperci', 460, 30, 20,
            [{ name: 'Piept de pui', qty: '300 g' }, { name: 'Ciuperci champignon', qty: '250 g' }, { name: 'Smântână', qty: '150 g' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Usturoi', qty: '2 căței' }, { name: 'Mărar', qty: 'după gust' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Taie puiul cubulețe, sărează-l și rumenește-l în ulei la foc mare 5 minute; scoate-l deoparte. În aceeași tigaie călește ceapa, apoi ciupercile feliate până scade apa lăsată. Pune puiul înapoi, adaugă usturoiul pisat și smântâna, amestecă și fierbe la foc mic 10 minute, până sosul se leagă ușor. Termină cu mărar tocat; merge perfect cu mămăligă sau orez.', 'General', null, 'normal')
        ],
        liquids: [
          { name: 'Limonadă cu ghimbir', value: 'Energético · Lămâie + Ghimbir' },
          { name: 'Compot de vișine', value: 'Antioxidante · Vișine + Miere' }
        ]
      },
      // ----- Día 4 -----
      {
        breakfastOptions: [
          createRecipe('Tartine cu brânză și legume', 320, 14, 14,
            [{ name: 'Pâine integrală', qty: '4 felii' }, { name: 'Brânză proaspătă', qty: '100 g' }, { name: 'Castravete', qty: '1/2 bucată' }, { name: 'Roșii', qty: '1 bucată' }, { name: 'Ridichi', qty: '4 bucăți' }, { name: 'Mărar', qty: 'după gust' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Amestecă brânza proaspătă cu mărarul tocat, sare și piper până devine cremoasă. Întinde-o pe feliile de pâine proaspătă sau prăjită. Acoperă cu felii subțiri de castravete, roșie și ridichi și termină cu piper proaspăt măcinat și încă puțin mărar.'),
          createRecipe('Smoothie cu banane și ovăz', 320, 10, 8,
            [{ name: 'Banană', qty: '2 bucăți' }, { name: 'Fulgi de ovăz', qty: '60 g' }, { name: 'Lapte', qty: '400 ml' }, { name: 'Miere', qty: '1 linguriță' }, { name: 'Scorțișoară', qty: '1 praf' }],
            'Pune fulgii de ovăz în blender și macină-i 10 secunde. Adaugă bananele rupte în bucăți, laptele, mierea și scorțișoara și mixează 1 minut până devine cremos. Lasă 5 minute să se hidrateze ovăzul și servește; e un mic dejun care ține de foame toată dimineața.', 'Bebida', 'Energético')
        ],
        lunchOptions: [
          createRecipe('Ghiveci de legume', 420, 12, 14,
            [{ name: 'Cartofi', qty: '300 g' }, { name: 'Vinete', qty: '1/2 bucată' }, { name: 'Dovlecel', qty: '1 bucată' }, { name: 'Ardei gras', qty: '1 bucată' }, { name: 'Roșii', qty: '2 bucăți' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Morcov', qty: '1 bucată' }, { name: 'Fasole verde', qty: '100 g' }, { name: 'Usturoi', qty: '3 căței' }, { name: 'Ulei', qty: '4 linguri' }, { name: 'Cimbru', qty: '1 linguriță' }],
            'Taie toate legumele în bucăți potrivite și pune-le într-o tavă încăpătoare. Amestecă-le cu uleiul, usturoiul feliat, cimbrul, sare și piper. Coace la 190 °C circa 50 de minute, amestecând o dată la 20 de minute, până legumele sunt fragede și ușor caramelizate la margini. Presară pătrunjel tocat; bun cald sau rece, cu pâine.'),
          createRecipe('Friptură de porc cu cartofi', 700, 34, 40,
            [{ name: 'Ceafă de porc', qty: '400 g' }, { name: 'Cartofi', qty: '400 g' }, { name: 'Usturoi', qty: '4 căței' }, { name: 'Vin alb', qty: '100 ml' }, { name: 'Boia dulce', qty: '1 linguriță' }, { name: 'Cimbru', qty: '1 linguriță' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Freacă feliile de ceafă cu sare, piper, boia, cimbru și usturoi pisat și lasă-le la marinat măcar 30 de minute. Așază-le în tavă peste cartofii tăiați sferturi și amestecați cu ulei și sare, toarnă vinul și acoperă cu folie. Coace la 190 °C 30 de minute acoperit, apoi încă 20 de minute descoperit, până carnea și cartofii sunt rumeniți. Servește cu murături sau salată.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Supă cremă de dovleac', 320, 8, 12,
            [{ name: 'Dovleac', qty: '500 g' }, { name: 'Cartof', qty: '1 bucată' }, { name: 'Morcov', qty: '1 bucată' }, { name: 'Ceapă', qty: '1/2 bucată' }, { name: 'Supă de legume', qty: '400 ml' }, { name: 'Smântână', qty: '50 ml' }, { name: 'Semințe de dovleac', qty: '1 lingură' }, { name: 'Ulei', qty: '1 lingură' }],
            'Călește ceapa în ulei 3 minute, adaugă dovleacul, cartoful și morcovul cubulețe și amestecă 2 minute. Toarnă supa cât să acopere legumele și fierbe 20 de minute, până sunt moi. Pasează totul cu blenderul până devine catifelat, potrivește de sare și adaugă smântâna. Servește cu semințele de dovleac rumenite deasupra.'),
          createRecipe('Salată de roșii cu brânză', 280, 10, 18,
            [{ name: 'Roșii', qty: '3 bucăți' }, { name: 'Brânză telemea', qty: '120 g' }, { name: 'Ceapă roșie', qty: '1/2 bucată' }, { name: 'Castravete', qty: '1/2 bucată' }, { name: 'Măsline', qty: '10 bucăți' }, { name: 'Ulei de măsline', qty: '2 linguri' }, { name: 'Busuioc sau pătrunjel', qty: 'după gust' }],
            'Taie roșiile felii generoase și castravetele rondele și aranjează-le pe un platou. Adaugă ceapa roșie tăiată subțire, măslinele și brânza telemea în cuburi sau sfărâmată. Stropește cu uleiul de măsline, presară verdeața și piper; sarea adaug-o cu grijă, telemeaua e deja sărată.')
        ],
        liquids: [
          { name: 'Suc de sfeclă', value: 'Limpieza hígado · Sfeclă + Morcov' },
          { name: 'Ceai de mușețel', value: 'Digestivo · Mușețel + Miere' }
        ]
      },
      // ----- Día 5 -----
      {
        breakfastOptions: [
          createRecipe('Omletă cu ciuperci', 330, 18, 22,
            [{ name: 'Ouă', qty: '4 bucăți' }, { name: 'Ciuperci', qty: '150 g' }, { name: 'Ceapă verde', qty: '2 fire' }, { name: 'Unt', qty: '15 g' }, { name: 'Cașcaval ras', qty: '30 g' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Feliază ciupercile și călește-le la foc mare până scade toată apa și se rumenesc. Bate ouăle cu sare și piper, adaugă untul în tigaie și toarnă ouăle peste ciuperci. Gătește la foc mediu, trăgând marginile spre centru; presară cașcavalul și ceapa verde, pliază omleta și servește-o cât e cremoasă.'),
          createRecipe('Iaurt cu fructe de pădure', 280, 10, 6,
            [{ name: 'Iaurt', qty: '300 g' }, { name: 'Fructe de pădure', qty: '180 g' }, { name: 'Miere', qty: '2 lingurițe' }, { name: 'Semințe de in', qty: '1 lingură' }],
            'Împarte iaurtul rece în două boluri. Adaugă fructele de pădure proaspete sau decongelate lent în frigider, cu tot cu sucul lor. Termină cu mierea în fir subțire și semințele de in măcinate, care adaugă omega-3 și fibre.')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de legume', 360, 10, 8,
            [{ name: 'Cartof', qty: '2 bucăți' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Țelină', qty: '50 g' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Ardei gras', qty: '1/2 bucată' }, { name: 'Roșii', qty: '2 bucăți' }, { name: 'Fasole verde', qty: '100 g' }, { name: 'Mazăre', qty: '50 g' }, { name: 'Borș', qty: '200 ml' }, { name: 'Leuștean', qty: 'după gust' }, { name: 'Ulei', qty: '1 lingură' }],
            'Călește ceapa, morcovul și țelina tocate în ulei 5 minute. Adaugă 1,5 litri de apă, cartofii cubulețe, ardeiul și fasolea verde și fierbe 15 minute. Pune roșiile tocate și mazărea și mai fierbe 10 minute, până legumele sunt fragede. Acrește cu borșul fiert separat, potrivește de sare și servește cu mult leuștean tocat.'),
          createRecipe('Mămăligă cu brânză și smântână', 520, 18, 24,
            [{ name: 'Mălai', qty: '200 g' }, { name: 'Apă', qty: '800 ml' }, { name: 'Brânză telemea', qty: '150 g' }, { name: 'Smântână', qty: '150 g' }, { name: 'Unt', qty: '20 g' }, { name: 'Sare', qty: 'după gust' }],
            'Fierbe apa cu sare, toarnă mălaiul în ploaie amestecând cu telul ca să nu facă cocoloașe și gătește la foc mic 25 de minute, amestecând des. Într-un vas termorezistent pune straturi de mămăligă, brânză rasă și unt, terminând cu brânză. Dă la cuptor 10 minute la 180 °C, să se topească brânza, și servește fierbinte cu smântână deasupra.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pește la grătar cu salată', 410, 32, 16,
            [{ name: 'File de pește', qty: '400 g' }, { name: 'Salată verde', qty: '1 bucată' }, { name: 'Roșii cherry', qty: '8 bucăți' }, { name: 'Castravete', qty: '1/2 bucată' }, { name: 'Lămâie', qty: '1 bucată' }, { name: 'Usturoi', qty: '2 căței' }, { name: 'Ulei de măsline', qty: '3 linguri' }, { name: 'Pătrunjel', qty: 'după gust' }],
            'Unge peștele cu o lingură de ulei, sare și piper și lasă-l 10 minute. Încinge bine grătarul sau tigaia-grill și frige peștele 3-4 minute pe fiecare parte, fără să îl miști, ca să se desprindă singur. Pregătește un mujdei ușor din usturoi, zeamă de lămâie și restul de ulei. Servește peștele stropit cu mujdei, lângă salata verde cu roșii cherry și castravete.'),
          createRecipe('Tocăniță de ciuperci', 360, 10, 16,
            [{ name: 'Ciuperci', qty: '400 g' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Usturoi', qty: '3 căței' }, { name: 'Bulion', qty: '100 g' }, { name: 'Ulei', qty: '3 linguri' }, { name: 'Cimbru', qty: '1 linguriță' }, { name: 'Mărar', qty: 'după gust' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Călește ceapa tocată în ulei până devine sticloasă. Adaugă ciupercile feliate și gătește la foc mare până scade apa lăsată de ele. Pune usturoiul pisat, bulionul, cimbrul și o jumătate de pahar de apă și fierbe la foc mic 15 minute, până sosul se îngroașă. Presară mărar tocat și servește cu mămăligă sau pâine.')
        ],
        liquids: [
          { name: 'Limonadă cu mentă', value: 'Refrescante · Lămâie + Mentă' },
          { name: 'Suc de mere și morcov', value: 'Energético · Măr + Morcov' }
        ]
      },
      // ----- Día 6 -----
      {
        breakfastOptions: [
          createRecipe('Terci de quinoa cu scorțișoară', 310, 9, 7,
            [{ name: 'Quinoa', qty: '100 g' }, { name: 'Lapte de migdale', qty: '350 ml' }, { name: 'Scorțișoară', qty: '1 linguriță' }, { name: 'Măr', qty: '1 bucată' }, { name: 'Miere', qty: '1 linguriță' }, { name: 'Stafide', qty: '20 g' }],
            'Clătește quinoa sub jet de apă rece ca să nu fie amăruie. Fierbe-o cu laptele de migdale și scorțișoara la foc mic 15 minute, amestecând din când în când, până boabele se deschid și terciul se îngroașă. Adaugă mărul ras și stafidele, mai lasă 2 minute și servește cald, cu mierea deasupra.'),
          createRecipe('Cozonac cu cafea', 420, 8, 16,
            [{ name: 'Cozonac', qty: '4 felii' }, { name: 'Cafea', qty: '2 cești' }, { name: 'Lapte', qty: '100 ml' }, { name: 'Zahăr', qty: 'după gust' }],
            'Taie felii generoase de cozonac cu nucă sau mac; dacă e mai vechi de o zi, încălzește-le 20 de secunde la cuptor sau în tigaie, ca să își recapete aroma. Pregătește cafeaua proaspătă și încălzește laptele. Servește cozonacul lângă cafeaua cu lapte, îndulcită după gust.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Sarmale de post', 480, 12, 16,
            [{ name: 'Varză murată', qty: '1 bucată' }, { name: 'Orez', qty: '150 g' }, { name: 'Ciuperci', qty: '200 g' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Ceapă', qty: '2 bucăți' }, { name: 'Bulion', qty: '2 linguri' }, { name: 'Mărar și cimbru', qty: 'după gust' }, { name: 'Ulei', qty: '3 linguri' }, { name: 'Foi de dafin', qty: '2 bucăți' }, { name: 'Piper', qty: 'după gust' }],
            'Călește ceapa tocată cu morcovul ras în ulei, adaugă ciupercile tocate mărunt și gătește până scade apa. Amestecă umplutura cu orezul crud, mărarul, cimbrul și piperul. Învelește sarmale mici în foile de varză murată și așază-le în oală pe un pat de varză tocată, cu foile de dafin. Acoperă cu apă și bulion și fierbe la foc mic 60-90 de minute, până orezul e pătruns. Cu mămăligă sunt și mai bune.'),
          createRecipe('Friptură de pui cu legume', 520, 36, 18,
            [{ name: 'Pulpe de pui', qty: '600 g' }, { name: 'Cartofi', qty: '300 g' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Usturoi', qty: '4 căței' }, { name: 'Boia dulce', qty: '1 linguriță' }, { name: 'Cimbru', qty: '1 linguriță' }, { name: 'Supă sau apă', qty: '100 ml' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Freacă pulpele cu sare, piper, boia, cimbru și usturoi pisat. Pune în tavă cartofii sferturi, morcovul rondele și ceapa felii, amestecate cu ulei și sare, și așază pulpele deasupra cu pielea în sus. Toarnă supa, acoperă cu folie și coace la 200 °C 25 de minute; descoperă și mai coace 20-25 de minute, până pielea e rumenă și crocantă, iar legumele fragede.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Salată orientală', 420, 12, 22,
            [{ name: 'Cartofi', qty: '400 g' }, { name: 'Ouă', qty: '2 bucăți' }, { name: 'Ceapă roșie', qty: '1 bucată' }, { name: 'Măsline negre', qty: '60 g' }, { name: 'Castraveți murați', qty: '2 bucăți' }, { name: 'Ulei', qty: '3 linguri' }, { name: 'Oțet', qty: '1 lingură' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Fierbe cartofii în coajă 20-25 de minute, până intră ușor furculița în ei; fierbe și ouăle tari, 10 minute. Curăță și taie cartofii felii groase, ouăle sferturi și ceapa roșie pește subțire. Amestecă blând cu măslinele, castraveții murați feliați, uleiul, oțetul, sare și piper. E mai gustoasă după o jumătate de oră la rece.'),
          createRecipe('Supă de pui cu tăiței', 360, 24, 12,
            [{ name: 'Pui cu os', qty: '400 g' }, { name: 'Tăiței', qty: '80 g' }, { name: 'Morcov', qty: '2 bucăți' }, { name: 'Țelină', qty: '50 g' }, { name: 'Ceapă', qty: '1 bucată' }, { name: 'Păstârnac', qty: '1/2 bucată' }, { name: 'Pătrunjel verde', qty: 'după gust' }, { name: 'Sare și piper', qty: 'după gust' }],
            'Pune puiul în 2 litri de apă rece cu sare, adu la fierbere și spumează bine. Adaugă ceapa întreagă, morcovii, țelina și păstârnacul și fierbe la foc mic 50 de minute, până carnea se desprinde de pe os. Strecoară supa, pune înapoi carnea dezosată și morcovul rondele și fierbe tăițeii în supă 5 minute. Servește fierbinte, cu pătrunjel verde tocat.')
        ],
        liquids: [
          { name: 'Compot de mere', value: 'Digestivo · Mere + Scorțișoară' },
          { name: 'Ceai de cătină', value: 'Inmunidad · Cătină + Miere' }
        ]
      }
    ]
  }
};

// Reglas de sustitución de ingredientes (en español Y rumano, con el
// reemplazo en el idioma activo). Se aplican solo cuando ninguna de las
// opciones del día es compatible con la dieta/exclusiones elegidas.
// Cada regla tiene el patrón para los textos ES/RO (find) y otro para los
// textos ya traducidos al inglés (findEn), con la sustitución en los 3 idiomas.
const dietRules = {
  vegana: [
    { find: /pechuga de pollo|muslo de pollo|piept de pui|pulpă de pui|pui tocat|pollo|\bpui\b/gi, findEn: /chicken breast|chicken thighs?|minced chicken|chicken/gi, replace: { es: 'tofu firme', ro: 'tofu ferm', en: 'firm tofu' } },
    { find: /carne picada|carne tocată/gi, findEn: /minced meat|ground meat|minced beef|ground beef/gi, replace: { es: 'soja texturizada', ro: 'soia texturată', en: 'textured soy protein' } },
    { find: /morcillo de ternera|pierna de cordero|carne de ternera|carne de porc|carne de vită|cordero|ternera|cerdo|porc\b|vită/gi, findEn: /beef shank|leg of lamb|\bveal\b|\bbeef\b|\blamb\b|\bpork\b/gi, replace: { es: 'seitán', ro: 'seitan', en: 'seitan' } },
    { find: /jamón serrano|jamón|chorizo|morcilla|panceta|cârnați|\bmici\b|afumătură|burtă de vită/gi, findEn: /serrano ham|\bham\b|chorizo|black pudding|blood sausage|\bbacon\b|sausages?|beef tripe|\btripe\b/gi, replace: { es: 'setas ahumadas', ro: 'ciuperci afumate', en: 'smoked mushrooms' } },
    { find: /filete de pescado blanco|pescado blanco|pescado|merluza|bacalao desalado|bacalao|salmón ahumado|salmón|ventresca de atún|sepia|pulpo cocido|pulpo|calamar|gambas|mejillones|pește|somon/gi, findEn: /white fish fillet|white fish|\bfish\b|\bhake\b|salt cod|\bcod\b|smoked salmon|salmon|tuna belly|\btuna\b|cuttlefish|octopus|squid|king prawns?|prawns?|shrimps?|mussels?/gi, replace: { es: 'tofu marinado', ro: 'tofu marinat', en: 'marinated tofu' } },
    { find: /huevos?|\bouă\b|\bou\b/gi, findEn: /\beggs?\b/gi, replace: { es: 'tofu revuelto', ro: 'tofu scrob', en: 'scrambled tofu' } },
    { find: /yogur griego|yogur natural|yogur|iaurt/gi, findEn: /greek yogh?urt|natural yogh?urt|plain yogh?urt|yogh?urt/gi, replace: { es: 'yogur de soja', ro: 'iaurt de soia', en: 'soy yogurt' } },
    { find: /queso fresco|queso crema|queso|brânză proaspătă|brânză telemea|brânză de vaci|brânză/gi, findEn: /fresh cheese|cream cheese|cottage cheese|cheese/gi, replace: { es: 'queso vegetal', ro: 'brânză vegetală', en: 'plant-based cheese' } },
    { find: /leche(?! de coco| de almendra| vegetal)|lapte(?! de migdale| de cocos| vegetal)/gi, findEn: /(?<!almond |coconut |soy |oat |rice )milk\b/gi, replace: { es: 'bebida de avena', ro: 'lapte de ovăz', en: 'oat milk' } },
    { find: /\bnata\b|smântână/gi, findEn: /(?<!coconut )cream\b/gi, replace: { es: 'nata vegetal', ro: 'smântână vegetală', en: 'plant-based cream' } },
    { find: /mantequilla|\bunt\b/gi, findEn: /(?<!peanut |cocoa )butter\b/gi, replace: { es: 'margarina', ro: 'margarină', en: 'margarine' } },
    { find: /mayonesa|maioneză|alioli/gi, findEn: /mayonnaise|aioli/gi, replace: { es: 'veganesa', ro: 'maioneză vegană', en: 'vegan mayo' } },
    { find: /\bmiel\b|miere/gi, findEn: /honey/gi, replace: { es: 'sirope de agave', ro: 'sirop de agave', en: 'agave syrup' } }
  ],
  vegetariana: [
    { find: /pechuga de pollo|muslo de pollo|piept de pui|pulpă de pui|pui tocat|pollo|\bpui\b/gi, findEn: /chicken breast|chicken thighs?|minced chicken|chicken/gi, replace: { es: 'seitán', ro: 'seitan', en: 'seitan' } },
    { find: /carne picada|carne tocată/gi, findEn: /minced meat|ground meat|minced beef|ground beef/gi, replace: { es: 'soja texturizada', ro: 'soia texturată', en: 'textured soy protein' } },
    { find: /morcillo de ternera|pierna de cordero|carne de ternera|carne de porc|carne de vită|cordero|ternera|cerdo|porc\b|vită|burtă de vită/gi, findEn: /beef shank|leg of lamb|\bveal\b|\bbeef\b|\blamb\b|\bpork\b|beef tripe|\btripe\b/gi, replace: { es: 'seitán', ro: 'seitan', en: 'seitan' } },
    { find: /jamón serrano|jamón|chorizo|morcilla|panceta|cârnați|\bmici\b|afumătură/gi, findEn: /serrano ham|\bham\b|chorizo|black pudding|blood sausage|\bbacon\b|sausages?/gi, replace: { es: 'setas ahumadas', ro: 'ciuperci afumate', en: 'smoked mushrooms' } },
    { find: /filete de pescado blanco|pescado blanco|pescado|merluza|bacalao desalado|bacalao|salmón ahumado|salmón|ventresca de atún|sepia|pulpo cocido|pulpo|calamar|gambas|mejillones|pește|somon/gi, findEn: /white fish fillet|white fish|\bfish\b|\bhake\b|salt cod|\bcod\b|smoked salmon|salmon|tuna belly|\btuna\b|cuttlefish|octopus|squid|king prawns?|prawns?|shrimps?|mussels?/gi, replace: { es: 'berenjena asada', ro: 'vinete coapte', en: 'roasted aubergine' } }
  ],
  keto: [
    { find: /arroz integral|arroz|orez/gi, findEn: /brown rice|\brice\b/gi, replace: { es: 'arroz de coliflor', ro: 'orez de conopidă', en: 'cauliflower rice' } },
    { find: /pan integral|pan de hamburguesa|pan tipo baguette|\bpan\b|pâine integrală|pâine/gi, findEn: /wholemeal bread|whole wheat bread|burger buns?|baguette|\bbread\b/gi, replace: { es: 'pan keto de almendra', ro: 'pâine keto de migdale', en: 'keto almond bread' } },
    { find: /macarrones|fideos|tăiței|pasta/gi, findEn: /macaroni|noodles|spaghetti|\bpasta\b/gi, replace: { es: 'espirales de calabacín', ro: 'spirale de dovlecel', en: 'courgette spirals' } },
    { find: /patatas|patata|cartofi|cartof/gi, findEn: /potato(?:es)?/gi, replace: { es: 'calabacín', ro: 'dovlecel', en: 'courgette' } },
    { find: /harina|făină/gi, findEn: /\bflour\b/gi, replace: { es: 'harina de almendra', ro: 'făină de migdale', en: 'almond flour' } },
    { find: /azúcar|zahăr|\bmiel\b|miere|mermelada|dulceață|\bgem\b/gi, findEn: /sugar|honey|\bjam\b|marmalade/gi, replace: { es: 'eritritol', ro: 'eritritol', en: 'erythritol' } },
    { find: /garbanzos cocidos|garbanzos|lentejas|fabes|alubias|fasole|năut|linte/gi, findEn: /chickpeas?|lentils?|(?<!green )beans\b/gi, replace: { es: 'brócoli', ro: 'broccoli', en: 'broccoli' } },
    { find: /plátano|banană/gi, findEn: /bananas?\b/gi, replace: { es: 'aguacate', ro: 'avocado', en: 'avocado' } },
    { find: /mămăligă|mălai/gi, findEn: /polenta|cornmeal/gi, replace: { es: 'puré de coliflor', ro: 'piure de conopidă', en: 'cauliflower mash' } },
    { find: /avena|ovăz/gi, findEn: /\boats\b|oatmeal|oat flakes/gi, replace: { es: 'semillas de chía', ro: 'semințe de chia', en: 'chia seeds' } },
    { find: /quinoa cocida|quinoa/gi, findEn: /cooked quinoa|quinoa/gi, replace: { es: 'coliflor', ro: 'conopidă', en: 'cauliflower' } }
  ],
  mediterranea: []
};
dietRules.baja = dietRules.keto;

const allergyRules = {
  gluten: [
    { find: /pan integral|pan de hamburguesa|pan tipo baguette|\bpan\b|pâine integrală|pâine/gi, findEn: /wholemeal bread|whole wheat bread|burger buns?|baguette|\bbread\b/gi, replace: { es: 'pan sin gluten', ro: 'pâine fără gluten', en: 'gluten-free bread' } },
    { find: /macarrones|fideos|tăiței|pasta/gi, findEn: /macaroni|noodles|spaghetti|\bpasta\b/gi, replace: { es: 'pasta sin gluten', ro: 'paste fără gluten', en: 'gluten-free pasta' } },
    { find: /harina|făină/gi, findEn: /\bflour\b/gi, replace: { es: 'harina de arroz', ro: 'făină de orez', en: 'rice flour' } },
    { find: /avena|ovăz/gi, findEn: /\boats\b|oatmeal|oat flakes/gi, replace: { es: 'avena sin gluten', ro: 'ovăz fără gluten', en: 'gluten-free oats' } },
    { find: /churros|magdalenas|galletas/gi, findEn: /churros|muffins|cookies|biscuits/gi, replace: { es: 'tortitas de arroz', ro: 'rondele de orez', en: 'rice cakes' } },
    { find: /croquetas de jamón|croquetas/gi, findEn: /ham croquettes|croquettes/gi, replace: { es: 'croquetas sin gluten', ro: 'crochete fără gluten', en: 'gluten-free croquettes' } },
    { find: /cuscús/gi, findEn: /couscous/gi, replace: { es: 'quinoa', ro: 'quinoa', en: 'quinoa' } },
    { find: /borș/gi, findEn: /bor[șs]\b|borscht/gi, replace: { es: 'borș sin gluten', ro: 'borș fără gluten', en: 'gluten-free borș' } }
  ],
  lactosa: [
    { find: /leche(?! de coco| de almendra| vegetal)|lapte(?! de migdale| de cocos| vegetal)/gi, findEn: /(?<!almond |coconut |soy |oat |rice )milk\b/gi, replace: { es: 'bebida de avena', ro: 'lapte vegetal', en: 'oat milk' } },
    { find: /yogur griego|yogur natural|yogur|iaurt/gi, findEn: /greek yogh?urt|natural yogh?urt|plain yogh?urt|yogh?urt/gi, replace: { es: 'yogur sin lactosa', ro: 'iaurt fără lactoză', en: 'lactose-free yogurt' } },
    { find: /queso fresco|queso crema|queso|brânză proaspătă|brânză telemea|brânză de vaci|brânză|telemea|cașcaval/gi, findEn: /fresh cheese|cream cheese|cottage cheese|cheese/gi, replace: { es: 'queso sin lactosa', ro: 'brânză fără lactoză', en: 'lactose-free cheese' } },
    { find: /\bnata\b|smântână/gi, findEn: /(?<!coconut )cream\b/gi, replace: { es: 'nata vegetal', ro: 'smântână vegetală', en: 'plant-based cream' } },
    { find: /mantequilla|\bunt\b/gi, findEn: /(?<!peanut |cocoa )butter\b/gi, replace: { es: 'margarina', ro: 'margarină', en: 'margarine' } }
  ],
  frutos: [
    { find: /leche de almendra|lapte de migdale/gi, findEn: /almond milk/gi, replace: { es: 'bebida de avena', ro: 'lapte de ovăz', en: 'oat milk' } },
    { find: /frutos secos|nueces picadas|nueces|nuez|\bnuci\b|almendras|migdale|avellanas|pistachos|anacardos/gi, findEn: /chopped walnuts|walnuts?|almonds?|hazelnuts?|pistachios?|cashews?|\bnuts\b/gi, replace: { es: 'semillas de girasol', ro: 'semințe de floarea-soarelui', en: 'sunflower seeds' } }
  ],
  marisco: [
    { find: /gambas|langostinos|mejillones|calamar|pulpo cocido|pulpo|sepia|midii|creveți/gi, findEn: /king prawns?|prawns?|shrimps?|mussels?|squid|octopus|cuttlefish|calamari/gi, replace: { es: 'pollo', ro: 'pui', en: 'chicken' } }
  ]
};
// Celíaca: misma adaptación que la exclusión de gluten (sustituye trigo, pasta,
// pan, rebozados… por equivalentes sin gluten).
dietRules.celiaco = allergyRules.gluten;
// Diabética: sustituye azúcares libres y refinados por opciones de bajo índice
// glucémico; mantiene legumbres, fruta entera y cereales integrales.
dietRules.diabetico = [
  { find: /azúcar|zahăr/gi, findEn: /sugar/gi, replace: { es: 'edulcorante sin calorías', ro: 'îndulcitor fără calorii', en: 'calorie-free sweetener' } },
  { find: /\bmiel\b|miere/gi, findEn: /honey/gi, replace: { es: 'edulcorante sin calorías', ro: 'îndulcitor fără calorii', en: 'calorie-free sweetener' } },
  { find: /mermelada|dulceață|\bgem\b/gi, findEn: /\bjam\b|marmalade/gi, replace: { es: 'mermelada sin azúcar', ro: 'gem fără zahăr', en: 'sugar-free jam' } },
  { find: /pan blanco|\bpan\b|pâine/gi, findEn: /white bread|\bbread\b/gi, replace: { es: 'pan integral', ro: 'pâine integrală', en: 'wholegrain bread' } },
  { find: /arroz blanco|arroz(?! integral)|orez/gi, findEn: /white rice|\brice\b/gi, replace: { es: 'arroz integral', ro: 'orez integral', en: 'brown rice' } },
  { find: /harina blanca|harina refinada|harina|făină/gi, findEn: /white flour|refined flour|\bflour\b/gi, replace: { es: 'harina integral', ro: 'făină integrală', en: 'wholemeal flour' } },
  { find: /zumo de naranja|zumo de|zumo/gi, findEn: /orange juice|fruit juice|\bjuice\b/gi, replace: { es: 'la fruta entera', ro: 'fructul întreg', en: 'whole fruit' } }
];

function getMealOptionsForDay(dayIndex, meal) {
  const dayData = menuData[currentOrigin].days[menuDayFor(dayIndex)];
  const options = dayData[`${meal}Options`];
  let pool = options.filter(option => option.style === currentMenuStyle);
  if (pool.length === 0) pool = options;
  // Prioriza platos compatibles con la dieta y las exclusiones alérgicas;
  // si ninguno encaja, se mantienen y luego se adaptan por sustitución.
  const compatible = pool.filter(option => !optionNeedsAdaptation(option));
  return compatible.length > 0 ? compatible : pool;
}

function getMealOptions(meal) {
  return getMealOptionsForDay(currentDayIndex, meal);
}

function getStyleLabel(style) {
  return style === 'normal' ? t('style_normal') : t('style_saludable');
}

function adaptRecipeText(text) {
  let adapted = text;
  const applyRules = (rules) => {
    rules.forEach(rule => {
      // En inglés se usa el patrón inglés (los textos llegan ya traducidos).
      const find = currentLang === 'en' ? rule.findEn : rule.find;
      if (!find) return;
      const replacement = typeof rule.replace === 'string'
        ? rule.replace
        : (rule.replace[currentLang] || rule.replace.es);
      adapted = adapted.replace(find, replacement);
    });
  };
  applyRules(dietRules[currentDiet] || []);
  Object.keys(currentIntolerances).forEach(intolerance => {
    if (currentIntolerances[intolerance]) {
      applyRules(allergyRules[intolerance] || []);
    }
  });
  return adapted;
}

function getAdaptationNote() {
  const activeIntolerances = Object.keys(currentIntolerances).filter(key => currentIntolerances[key]);
  // Sin dieta (null) o Mediterránea = sin restricciones: nota neutra de temporada.
  if (activeIntolerances.length === 0 && (!currentDiet || currentDiet === 'mediterranea')) {
    return t('season_products');
  }

  const labels = [];
  if (currentDiet && currentDiet !== 'mediterranea') {
    labels.push(t('diet_' + currentDiet).toLowerCase());
  }
  const labelMap = { gluten: 'no_gluten', lactosa: 'no_lactose', frutos: 'no_nuts', marisco: 'no_seafood' };
  activeIntolerances.forEach(key => {
    labels.push(t(labelMap[key]).toLowerCase());
  });
  return `${t('adapted')}: ${labels.join(' · ')}`;
}

let currentOrigin = 'es';
let currentDayIndex = 0;
let currentServings = 2;
let currentMealServings = { breakfast: 2, lunch: 2, dinner: 2 };
let shoppingMode = 'daily';
let currentDiet = 'mediterranea';
let currentMenuStyle = 'saludable';
let currentIntolerances = {
  gluten: false,
  lactosa: false,
  frutos: false,
  marisco: false
};

// --- Persistencia: recuerda tus datos entre sesiones ---------------------
function persistState() {
  try {
    localStorage.setItem('nutriplan-state', JSON.stringify({
      currentOrigin, currentDayIndex, currentServings, currentMealServings, shoppingMode, menuShift,
      currentDiet, currentMenuStyle, currentIntolerances, catalogServings,
      favorites: Array.from(favoriteRecipes),
      selected: selectedMealIndices,
      extras: Array.from(extraShoppingItems.entries()),
      dark: document.documentElement.classList.contains('dark')
    }));
  } catch (e) {}
}
function restoreState() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem('nutriplan-state') || 'null'); } catch (e) {}
  if (!s) return;
  if (s.currentOrigin) currentOrigin = s.currentOrigin;
  if (typeof s.currentDayIndex === 'number') currentDayIndex = s.currentDayIndex;
  if (typeof s.menuShift === 'number') menuShift = s.menuShift;
  if (typeof s.currentServings === 'number') currentServings = s.currentServings;
  if (s.currentMealServings) currentMealServings = s.currentMealServings;
  if (s.shoppingMode) shoppingMode = s.shoppingMode;
  if ('currentDiet' in s) {
    if (!s.currentDiet) {
      // Dieta deseleccionada (null/none): se respeta y no se fuerza una por defecto.
      currentDiet = null;
    } else {
      // Nombres antiguos guardados -> identificadores nuevos sin acentos.
      const dietAliases = { 'mediterránea': 'mediterranea', 'baja en carbohidratos': 'baja' };
      currentDiet = dietAliases[s.currentDiet] || s.currentDiet;
      if (!(currentDiet in dietRules)) currentDiet = 'mediterranea';
    }
  }
  if (s.currentMenuStyle) currentMenuStyle = s.currentMenuStyle;
  if (s.currentIntolerances) currentIntolerances = s.currentIntolerances;
  if (typeof s.catalogServings === 'number') catalogServings = s.catalogServings;
  if (Array.isArray(s.favorites)) s.favorites.forEach(f => favoriteRecipes.add(f));
  if (s.selected) ['es', 'ro'].forEach(o => { if (s.selected[o]) selectedMealIndices[o] = s.selected[o]; });
  if (Array.isArray(s.extras)) s.extras.forEach(([k, v]) => extraShoppingItems.set(k, v));
  if (s.dark) document.documentElement.classList.add('dark');
}

function initSystem() {
  restoreState();
  document.documentElement.lang = currentLang;
  weekDates = getCurrentWeekDates();
  applyStaticTranslations();
  applyDarkModeButton();
  const catalogServingsEl = document.getElementById('catalog-servings');
  if (catalogServingsEl) catalogServingsEl.innerText = catalogServings;
  renderWeeks();
  renderOriginFilters();
  renderDietSelection();
  renderMenuStyleSelection();
  renderIntolerances();
  loadDayDetails();
  renderShoppingList();
  loadVisitCounter();
  switchView('plan');
  // Cuando llegan las traducciones de recetas, repinta con el idioma activo.
  dishTrReady.then(() => {
    loadDayDetails();
    renderShoppingList();
  });
}

// --- Cambio de idioma de TODA la app (interfaz + recetas) ------------------
function setLang(lang) {
  if (!APP_LANGS.includes(lang)) return;
  if (lang === currentLang) return;
  currentLang = lang;
  try { localStorage.setItem('nutriplan-lang', lang); } catch (e) {}
  document.documentElement.lang = lang;
  weekDates = getCurrentWeekDates();
  applyStaticTranslations();
  applyDarkModeButton();
  renderWeeks();
  renderOriginFilters();
  renderDietSelection();
  renderMenuStyleSelection();
  renderIntolerances();
  loadDayDetails();
  ensureCatalogTr().then(() => renderCatalog());
  ensureSeccionesTr().then(() => renderSecciones());
  showToast(t('toast_lang'));
}
function toggleLang() {
  const next = APP_LANGS[(APP_LANGS.indexOf(currentLang) + 1) % APP_LANGS.length];
  setLang(next);
}

// Aplica el idioma a todos los textos fijos del HTML (marcados con data-i18n).
function applyStaticTranslations() {
  document.title = t('app_title');
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerText = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  // El botón de la cabecera muestra el idioma actual y rota ES -> RO -> EN.
  const headerToggle = document.getElementById('lang-toggle');
  if (headerToggle) headerToggle.innerText = currentLang.toUpperCase();
  APP_LANGS.forEach(l => {
    const btn = document.getElementById('lang-' + l);
    if (btn) btn.classList.toggle('active-lang', currentLang === l);
  });
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  applyDarkModeButton();
  persistState();
}
function applyDarkModeButton() {
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.innerText = document.documentElement.classList.contains('dark') ? t('deactivate') : t('activate');
}

// Contador de visitas (servicio gratuito). Cuenta una vez por navegador.
async function loadVisitCounter() {
  const el = document.getElementById('visit-counter');
  const ns = 'nutriplan-web-app';
  const key = 'home';
  let alreadyCounted = false;
  try { alreadyCounted = localStorage.getItem('nutriplan-visited') === '1'; } catch (e) {}
  const endpoint = alreadyCounted ? 'get' : 'hit';
  try {
    const res = await fetch(`https://abacus.jasoncameron.dev/${endpoint}/${ns}/${key}`);
    const data = await res.json();
    if (!alreadyCounted) {
      try { localStorage.setItem('nutriplan-visited', '1'); } catch (e) {}
    }
    if (el && typeof data.value === 'number') {
      el.innerText = data.value.toLocaleString({ es: 'es-ES', ro: 'ro-RO', en: 'en-GB' }[currentLang] || 'es-ES');
    }
  } catch (e) {
    if (el) el.innerText = '—';
  }
}

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
  document.getElementById(`view-${viewId}`).classList.remove('hidden');

  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-nav'));
  const activeBtn = document.getElementById(`nav-${viewId}`);
  if (activeBtn) activeBtn.classList.add('active-nav');

  // Sube al principio: si se pulsa un botón situado al final de una vista (p. ej.
  // "Ver menú del día"), la nueva sección debe verse desde arriba y no dejar la
  // página desplazada en una zona vacía (parecía que el botón no hacía nada).
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'catalog') openCatalog();
  if (viewId === 'secciones') renderSecciones();
}

function filterOrigin(origin) {
  currentOrigin = origin;
  renderWeeks();
  renderOriginFilters();
  loadDayDetails();
}

function renderOriginFilters() {
  document.getElementById('btn-filter-es').classList.toggle('active-origin', currentOrigin === 'es');
  document.getElementById('btn-filter-ro').classList.toggle('active-origin', currentOrigin === 'ro');
}

function renderWeeks() {
  const container = document.getElementById('weeks-container');
  container.innerHTML = '';
  const current = menuData[currentOrigin];
  current.days.forEach((day, index) => {
    const isActive = index === currentDayIndex;
    const weekDate = weekDates[index];
    container.innerHTML += `
      <button type="button" onclick="selectDay(${index})" class="flex flex-col items-center justify-center min-w-[68px] h-24 rounded-3xl border ${isActive ? 'border-primary bg-primary/10' : 'border-surface-container'} bg-white shadow-sm text-left p-3 transition-all hover:border-primary">
        <span class="font-label-md text-sm ${isActive ? 'text-primary' : 'text-on-surface-variant'}">${weekDate.short}</span>
        <span class="font-headline-sm text-lg text-on-surface mt-1">${weekDate.num}</span>
      </button>
    `;
  });
  document.getElementById('badge-origin').innerText = t('badge_' + currentOrigin);
  document.getElementById('language-label').innerText = t('lang_label');
  document.getElementById('season-label').innerText = `${t('season')}: ${t('season_' + currentOrigin + '_menu')}`;
  document.getElementById('season-icon').innerText = current.seasonIcon;
}

function selectDay(index) {
  currentDayIndex = index;
  renderWeeks();
  loadDayDetails();
}

function getCurrentDayData() {
  return menuData[currentOrigin].days[menuDayFor(currentDayIndex)];
}

function getCurrentSelection() {
  return selectedMealIndices[currentOrigin][menuDayFor(currentDayIndex)];
}

function getSelectedOption(meal) {
  const options = getMealOptions(meal);
  const selection = getCurrentSelection();
  const selectedIndex = selection[meal] % options.length;
  return options[selectedIndex];
}

// Plato listo para mostrar: primero traducido al idioma activo y después
// adaptado a la dieta/exclusiones (sustitución de ingredientes si hace falta).
function adaptOption(option) {
  const tr = trDish(option.title);
  return {
    title: cap(adaptRecipeText(tr ? tr.t : option.title)),
    instructions: adaptRecipeText(tr && tr.s ? tr.s : option.instructions),
    ingredients: option.ingredients.map((item, idx) => ({
      name: cap(adaptRecipeText(tr && tr.i && tr.i[idx] ? tr.i[idx] : item.name)),
      qty: trQty(item.qty)
    })),
    nutrition: option.nutrition
  };
}

function parseQtyValue(qty) {
  const normalized = qty.replace(',', '.').trim();
  if (/^\d+\s*\/\s*\d+$/.test(normalized)) {
    const [num, den] = normalized.split('/').map(Number);
    return num / den;
  }
  const numberMatch = normalized.match(/\d+(?:\.\d+)?/);
  return numberMatch ? parseFloat(numberMatch[0]) : null;
}

function formatQtyValue(value) {
  if (Number.isInteger(value)) return String(value);
  const rounded = Math.round(value * 100) / 100;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(2).replace(/\.00$/, '');
}

function scaleIngredientQty(qty, factor) {
  return qty.replace(/\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?/g, match => {
    const baseValue = parseQtyValue(match);
    if (baseValue === null) return match;
    const scaledValue = baseValue * factor;
    return formatQtyValue(scaledValue);
  });
}

function scaleIngredients(ingredients, factor) {
  if (factor === 1) return ingredients;
  return ingredients.map(item => ({
    name: item.name,
    qty: scaleIngredientQty(item.qty, factor)
  }));
}

function getNutritionScore(totals) {
  if (totals.calories <= 1700) return 'A+';
  if (totals.calories <= 1900) return 'A';
  if (totals.calories <= 2100) return 'B';
  return 'B+';
}

// Preparación en PASOS NUMERADOS: divide las instrucciones por saltos de
// línea o por final de frase seguido de mayúscula (vale para ES, RO y EN).
function instructionStepsHTML(text) {
  const steps = String(text)
    .split(/\n+|(?<=\.)\s+(?=[A-ZÁÉÍÓÚÜÑĂÂÎȘȚ0-9])/)
    .map(s => s.trim())
    .filter(s => s.length > 2);
  if (steps.length <= 1) {
    return `<p class="mt-2 text-body-md text-on-surface">${escapeHtml(text)}</p>`;
  }
  return `<ol class="mt-2 space-y-2 text-body-md text-on-surface">${steps.map((step, i) => `
    <li class="flex gap-2.5">
      <span class="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center justify-center">${i + 1}</span>
      <span>${escapeHtml(step)}</span>
    </li>`).join('')}</ol>`;
}

// Enlace a los vídeos MÁS VISTOS de la receta en YouTube (búsqueda ordenada
// por número de visualizaciones, sp=CAMSAhAB). Se busca por el título
// original del plato, que es como lo conocen los cocineros en los vídeos.
const VIDEO_WORD = { es: 'receta', ro: 'rețetă', en: 'recipe' };
function videoSearchURL(title) {
  const query = encodeURIComponent(`${title} ${VIDEO_WORD[currentLang] || 'receta'}`);
  return `https://www.youtube.com/results?search_query=${query}&sp=CAMSAhAB`;
}
function videoLinkHTML(title) {
  return `
    <a href="${videoSearchURL(title)}" target="_blank" rel="noopener"
       class="mt-3 inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline underline-offset-2">
      <span class="material-symbols-outlined" style="font-size:18px;">play_circle</span>${t('video_link')}
    </a>`;
}

function renderMealCard(meal, label, badgeClass) {
  const selection = getCurrentSelection();
  const options = getMealOptions(meal);
  const selectedIndex = selection[meal] % options.length;
  const option = options[selectedIndex];
  const adapted = adaptOption(option);
  const mealServings = currentMealServings[meal];
  const scaleFactor = mealServings === 0 ? 1 : mealServings / 2;
  const scaledIngredients = scaleIngredients(adapted.ingredients, scaleFactor);
  const isFavorite = favoriteRecipes.has(option.title);
  const otherOptions = options.filter((_, index) => index !== selectedIndex);
  // Alérgenos del plato TAL COMO SE VA A COMER (después de adaptarlo).
  const allergens = allergensOfText(ingredientsText(adapted.ingredients));
  const wasAdapted = optionNeedsAdaptation(option);

  return `
    <div class="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase ${badgeClass}">${label}</p>
          <h4 class="font-headline-sm text-on-surface mt-2">${adapted.title}</h4>
          <div class="mt-1 space-y-1">
            <p class="text-label-sm text-on-surface-variant">${t('category')}: ${tCat(option.category)}</p>
            ${option.drinkType ? `<p class="text-label-sm text-secondary font-semibold">${t('benefit')}: ${tBenefit(option.drinkType)}</p>` : ''}
            ${wasAdapted ? `<p class="text-label-sm font-semibold text-tertiary">⚙ ${t('adapted_badge')} · ${getAdaptationNote().replace(/^[^:]+: /, '')}</p>` : ''}
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <button onclick="toggleFavorite('${meal}')" class="px-3 py-2 rounded-full border ${isFavorite ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-primary'} text-xs font-semibold transition-all">
            ${isFavorite ? t('favorite_active') : t('favorite')}
          </button>
          <button onclick="refreshMeal('${meal}')" class="px-3 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold border border-surface-container hover:bg-surface-container-low transition-all">
            ${t('dislike')}
          </button>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-3xl h-52 mb-4 mt-4 bg-surface-container-high">
        ${dishImageHTML({ title: option.title, image: null })}
      </div>
      <div class="mt-4 text-label-md text-on-surface-variant">
        <p class="font-semibold">${t('ingredients')}</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          ${scaledIngredients.map(i => `<li>${i.qty} ${i.name}</li>`).join('')}
        </ul>
        <p class="font-semibold mt-4">${t('cook_mode')}</p>
        ${instructionStepsHTML(adapted.instructions)}
        ${videoLinkHTML(option.title)}
      </div>
      <div class="mt-4 text-label-md text-on-surface-variant">
        ${mealServings === 0 ? t('meal_skipped') : `${t('nutrition_label')}: ${option.nutrition.calories} kcal · ${option.nutrition.protein}g ${t('protein_word')} · ${option.nutrition.fats}g ${t('fat_word')}`}
        <p class="text-xs text-on-surface-variant mt-1">${t('qty_adjusted')}</p>
      </div>
      <div class="mt-2 text-label-sm text-on-surface-variant">${t('style')}: ${getStyleLabel(option.style)}</div>
      ${allergenFooterHTML(allergens)}
      <div class="mt-4 flex items-center justify-between gap-3">
        <span class="text-label-md text-on-surface-variant">${t('portions')}</span>
        <div class="inline-flex items-center rounded-full bg-surface-container-high border border-surface-container overflow-hidden">
          <button onclick="adjustMealServings('${meal}', -1)" class="px-3 py-2 text-primary hover:bg-surface-container-low transition-colors">-</button>
          <span class="px-4 py-2 text-on-surface">${mealServings}</span>
          <button onclick="adjustMealServings('${meal}', 1)" class="px-3 py-2 text-primary hover:bg-surface-container-low transition-colors">+</button>
        </div>
      </div>
      ${otherOptions.length > 0 ? `
        <div class="mt-4 p-3 rounded-3xl bg-surface-container-low">
          <p class="font-semibold text-on-surface">${t('other_options')}</p>
          <div class="mt-3 grid gap-2">
            ${otherOptions.map(other => {
              const otherTr = trDish(other.title);
              return `
              <button onclick="selectRecipeOption('${meal}', ${options.indexOf(other)})" class="w-full text-left p-3 rounded-2xl bg-white border border-surface-container hover:border-primary transition-all text-sm">
                ${cap(adaptRecipeText(otherTr ? otherTr.t : other.title))}
              </button>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function loadDayDetails() {
  const dayInfo = weekDates[currentDayIndex];
  const breakfast = getSelectedOption('breakfast');
  const lunch = getSelectedOption('lunch');
  const dinner = getSelectedOption('dinner');
  const totals = {
    calories: breakfast.nutrition.calories + lunch.nutrition.calories + dinner.nutrition.calories,
    protein: breakfast.nutrition.protein + lunch.nutrition.protein + dinner.nutrition.protein,
    fats: breakfast.nutrition.fats + lunch.nutrition.fats + dinner.nutrition.fats
  };
  const note = getAdaptationNote();
  const score = getNutritionScore(totals);
  const menuStyleLabel = getStyleLabel(currentMenuStyle);

  document.getElementById('plan-day-title').innerText = `${dayInfo.long}`;
  const planDayNoteEl = document.getElementById('plan-day-note');
  if (planDayNoteEl) {
    planDayNoteEl.innerText = note;
  }
  const menuStyleNoteEl = document.getElementById('menu-style-note');
  if (menuStyleNoteEl) {
    menuStyleNoteEl.innerText = `${t('current_menu')}: ${menuStyleLabel}`;
  }
  document.getElementById('day-calories').innerText = `${totals.calories} kcal`;
  document.getElementById('day-score').innerText = score;
  document.getElementById('day-protein').innerText = `${totals.protein}g`;
  document.getElementById('day-fats').innerText = `${totals.fats}g`;
  document.getElementById('servings-display').innerText = currentServings;

  const liquidsContainer = document.getElementById('liquids-container');
  liquidsContainer.innerHTML = getCurrentDayData().liquids.map(liquid => {
    const tr = trDish(liquid.name);
    const det = LIQUID_DETAILS[liquid.name] || {};
    const title = cap(tr ? tr.t : liquid.name);
    const value = tr && tr.v ? tr.v : liquid.value;
    // Detalle traducido si existe; si no, el de origen en LIQUID_DETAILS.
    const ingredients = tr && tr.i && tr.i.length ? tr.i : (det.ingredients || []);
    const prep = tr && tr.s ? tr.s : (det.prep || '');
    const benefitsText = tr && tr.b ? tr.b : (det.benefitsText || '');
    const look = JUICE_LOOK[det.type] || JUICE_LOOK.Zumo;
    return `
    <div class="rounded-3xl bg-surface-container-low p-4">
      <div class="flex items-start gap-3">
        <div class="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center" style="background:${look.bg};"><span style="font-size:26px;">${look.emoji}</span></div>
        <div class="min-w-0">
          <p class="font-label-md text-label-md text-on-surface-variant">${title}</p>
          <p class="font-body-md text-body-md text-on-surface mt-1">${value}</p>
        </div>
      </div>
      ${ingredients.length ? `
        <div class="mt-3 text-label-md text-on-surface-variant">
          <p class="font-semibold">${t('ingredients')}</p>
          <ul class="list-disc list-inside mt-1 space-y-1">
            ${ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}
          </ul>
        </div>` : ''}
      ${prep ? `
        <div class="mt-3 text-label-md text-on-surface-variant">
          <p class="font-semibold">${t('preparation')}</p>
          ${instructionStepsHTML(prep)}
        </div>` : ''}
      ${benefitsText ? `
        <div class="mt-3 p-3 rounded-2xl bg-secondary-container">
          <p class="text-label-sm font-semibold text-on-secondary-container">${t('benefit')}</p>
          <p class="text-body-md text-on-secondary-container mt-1">${escapeHtml(benefitsText)}</p>
        </div>` : ''}
      ${det.type ? videoLinkHTML(liquid.name) : ''}
    </div>
  `;
  }).join('');

  const recipesContainer = document.getElementById('recipes-list-container');
  recipesContainer.innerHTML = `
    ${renderMealCard('breakfast', t('breakfast'), 'text-primary')}
    ${renderMealCard('lunch', t('lunch'), 'text-secondary')}
    ${renderMealCard('dinner', t('dinner'), 'text-tertiary')}
  `;
  hydrateLazyImages(recipesContainer);

  renderShoppingList();
}

function adjustServings(amount) {
  const nextServings = Math.max(0, currentServings + amount);
  const delta = nextServings - currentServings;
  currentServings = nextServings;
  Object.keys(currentMealServings).forEach(meal => {
    currentMealServings[meal] = Math.max(0, currentMealServings[meal] + delta);
  });
  document.getElementById('servings-display').innerText = currentServings;
  loadDayDetails();
}

function adjustMealServings(meal, amount) {
  currentMealServings[meal] = Math.max(0, currentMealServings[meal] + amount);
  loadDayDetails();
}

function setDiet(type) {
  // Identificadores sin acentos ('mediterranea', 'baja'); admite valores antiguos.
  const dietAliases = { 'mediterránea': 'mediterranea', 'baja en carbohidratos': 'baja' };
  currentDiet = dietAliases[type] || type;
  renderDietSelection();
  loadDayDetails();
}

function renderDietSelection() {
  const diets = ['vegana', 'vegetariana', 'keto', 'mediterranea', 'baja', 'celiaco', 'diabetico'];
  diets.forEach(diet => {
    const button = document.getElementById(`diet-${diet}`);
    if (button) {
      button.classList.toggle('active-diet', diet === currentDiet);
    }
  });
  const dietLabel = currentDiet ? t('diet_' + currentDiet) : t('diet_none');
  document.getElementById('diet-summary').innerText = `${t('diet_active')}: ${dietLabel}`;
  // Recuadro informativo con guía clínica citada para dietas médicas.
  const infoBox = document.getElementById('diet-medical-info');
  if (infoBox) {
    const hasInfo = currentDiet && I18N[currentLang]['diet_' + currentDiet + '_info'];
    infoBox.classList.toggle('hidden', !hasInfo);
    if (hasInfo) {
      document.getElementById('diet-medical-text').innerText = t('diet_' + currentDiet + '_info');
      document.getElementById('diet-medical-src').innerText = t('diet_' + currentDiet + '_src');
    }
  }
}

function setMenuStyle(style) {
  currentMenuStyle = style;
  // Al elegir un estilo de menú (Saludable o Normal) se deselecciona la dieta
  // primaria: el estilo ya define las pautas y mantener además una dieta concreta
  // resulta redundante y confuso. El usuario puede volver a elegir una dieta si quiere.
  currentDiet = null;
  renderDietSelection();
  renderMenuStyleSelection();
  loadDayDetails();
}

function renderMenuStyleSelection() {
  const options = ['saludable', 'normal'];
  options.forEach(option => {
    const button = document.getElementById(`menu-style-${option}`);
    if (button) {
      button.classList.toggle('active-menu-style', option === currentMenuStyle);
    }
  });
  const summary = document.getElementById('menu-style-summary');
  if (summary) {
    summary.innerText = `${t('menu_active')}: ${getStyleLabel(currentMenuStyle)}`;
  }
}

function toggleIntolerance(name) {
  currentIntolerances[name] = !currentIntolerances[name];
  renderIntolerances();
  loadDayDetails();
}

function renderIntolerances() {
  Object.keys(currentIntolerances).forEach(key => {
    const card = document.getElementById(`intolerance-${key}`);
    if (card) card.classList.toggle('active-intolerance', currentIntolerances[key]);
  });
}

function refreshMeal(meal) {
  const selection = getCurrentSelection();
  const options = getMealOptions(meal);
  selection[meal] = (selection[meal] + 1) % options.length;
  loadDayDetails();
}

function toggleFavorite(meal) {
  const option = getSelectedOption(meal);
  if (favoriteRecipes.has(option.title)) {
    favoriteRecipes.delete(option.title);
  } else {
    favoriteRecipes.add(option.title);
  }
  loadDayDetails();
}

function selectRecipeOption(meal, index) {
  const selection = getCurrentSelection();
  selection[meal] = index;
  loadDayDetails();
}

function setShoppingMode(mode) {
  shoppingMode = mode;
  renderShoppingList();
}

function collectShoppingFoods() {
  const foods = new Map();
  const dayIndexes = shoppingMode === 'weekly'
    ? menuData[currentOrigin].days.map((_, index) => index)
    : [currentDayIndex];
  dayIndexes.forEach(dayIndex => {
    const dailySelection = selectedMealIndices[currentOrigin][menuDayFor(dayIndex)];
    ['breakfast', 'lunch', 'dinner'].forEach(meal => {
      const mealServings = currentMealServings[meal];
      if (mealServings === 0) return;
      const options = getMealOptionsForDay(dayIndex, meal);
      const option = options[dailySelection[meal] % options.length];
      scaleIngredients(adaptOption(option).ingredients, mealServings / 2).forEach(item => {
        const key = item.name.toLowerCase();
        if (foods.has(key)) {
          foods.get(key).qty = `${foods.get(key).qty} + ${item.qty}`;
        } else {
          foods.set(key, { ...item });
        }
      });
    });
  });
  return foods;
}

function buildShoppingText() {
  const lines = [t('list_header'), ''];
  const foods = collectShoppingFoods();
  if (foods.size) {
    lines.push(t('from_menu'));
    foods.forEach(item => lines.push(`• ${item.name}: ${item.qty}`));
    lines.push('');
  }
  if (extraShoppingItems.size) {
    lines.push(`— ${t('added_by_you')} —`);
    extraShoppingItems.forEach(item => lines.push(`• ${item.name}${item.qty ? ': ' + item.qty : ''}`));
  }
  return lines.join('\n').trim();
}

function copyShoppingList() {
  const text = buildShoppingText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(t('copied'))).catch(() => showToast(t('copy_fail')));
  } else {
    showToast(t('copy_unsupported'));
  }
}

function shareShoppingWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(buildShoppingText()), '_blank');
}

function renderShoppingList() {
  persistState();
  const container = document.getElementById('shopping-list-sections');
  const foods = collectShoppingFoods();
  const modeLabel = shoppingMode === 'weekly' ? t('for_week') : t('for_day');
  document.getElementById('shopping-mode-daily')?.classList.toggle('active-shopping', shoppingMode === 'daily');
  document.getElementById('shopping-mode-weekly')?.classList.toggle('active-shopping', shoppingMode === 'weekly');

  const sections = [];

  if (foods.size > 0) {
    sections.push(`
      <section class="space-y-3">
        <div class="flex items-center gap-2 text-primary">
          <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">inventory_2</span>
          <h3 class="font-label-lg text-label-lg tracking-wider">${t('menu_ings')}</h3>
        </div>
        <div class="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
          ${Array.from(foods.values()).map(item => `
            <div class="checklist-item flex items-center gap-4 p-4 transition-colors hover:bg-surface-container border-b last:border-b-0 border-surface-container">
              <input type="checkbox" class="w-6 h-6 rounded-full border-2 border-outline text-primary focus:ring-primary-container cursor-pointer" />
              <div class="flex-1">
                <p class="item-text font-body-md text-on-surface">${item.name}</p>
                <p class="text-label-md text-on-surface-variant">${item.qty} · ${modeLabel}</p>
              </div>
              <span class="material-symbols-outlined text-outline-variant">checklist_rtl</span>
            </div>
          `).join('')}
        </div>
      </section>
    `);
  }

  if (extraShoppingItems.size > 0) {
    sections.push(`
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-secondary">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">add_shopping_cart</span>
            <h3 class="font-label-lg text-label-lg tracking-wider">${t('added_by_you')}</h3>
          </div>
          <button data-clear-extras="1" class="text-label-md text-secondary font-semibold px-3 py-1 rounded-full hover:bg-surface-container-high transition-all">${t('clear')}</button>
        </div>
        <div class="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
          ${Array.from(extraShoppingItems.entries()).map(([key, item]) => `
            <div class="checklist-item flex items-center gap-4 p-4 transition-colors hover:bg-surface-container border-b last:border-b-0 border-surface-container">
              <input type="checkbox" class="w-6 h-6 rounded-full border-2 border-outline text-primary focus:ring-primary-container cursor-pointer" />
              <div class="flex-1">
                <p class="item-text font-body-md text-on-surface">${escapeHtml(item.name)}</p>
                ${item.qty ? `<p class="text-label-md text-on-surface-variant">${escapeHtml(item.qty)}</p>` : ''}
              </div>
              <button data-remove="${escapeHtml(key)}" class="text-outline hover:text-error transition-colors">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `);
  }

  if (!sections.length) {
    container.innerHTML = `
      <div class="rounded-3xl bg-surface-container-low p-6 text-center text-on-surface-variant">
        ${t('empty_list')}
      </div>
    `;
    return;
  }

  container.innerHTML = sections.join('');
  container.onclick = (event) => {
    const clearBtn = event.target.closest('[data-clear-extras]');
    if (clearBtn) { clearExtraItems(); return; }
    const removeBtn = event.target.closest('[data-remove]');
    if (removeBtn) { removeExtraItem(removeBtn.getAttribute('data-remove')); }
  };
}

// ===========================================================================
// RECETARIO MUNDIAL (galería de todos los platos, por categoría, +1000)
// ===========================================================================

// Platos famosos del mundo: recetas completas (ingredientes para 2 raciones y
// preparación detallada) empaquetadas en world_recipes.json.

// Las recetas llegan ya traducidas al español en recipes.json (se traducen una
// sola vez con build_recipes.py); la app no traduce nada en vivo.
// Limpieza de cachés antiguas de traducción/fotos que ya no se usan.
try { localStorage.removeItem('nutriplan-trans'); } catch (e) {}

function scaleLine(line, factor) {
  return factor === 1 ? line : scaleIngredientQty(line, factor);
}

function getLocalMenuRecipes() {
  const out = [];
  const seen = new Set();
  ['es', 'ro'].forEach(origin => {
    menuData[origin].days.forEach(day => {
      ['breakfast', 'lunch', 'dinner'].forEach(meal => {
        day[`${meal}Options`].forEach(option => {
          if (seen.has(option.title)) return;
          seen.add(option.title);
          let category = 'Platos principales';
          if (option.category === 'Bebida') category = JUICE_CATEGORY;
          else if (meal === 'breakfast') category = 'Desayuno';
          out.push({
            title: option.title,
            category,
            area: origin === 'es' ? 'España' : 'Rumanía',
            image: null,
            ingredients: option.ingredients,
            instructions: option.instructions,
            style: option.style,
            source: 'local'
          });
        });
      });
    });
  });
  return out;
}

// ===========================================================================
// ZUMOS Y BATIDOS (apartado propio, organizados por sus beneficios)
// Cantidades para 2 vasos. Los beneficios son orientativos, no consejo médico.
// ===========================================================================
const JUICE_CATEGORY = 'Zumos y batidos';
const juiceData = [
  { title: 'Zumo de naranja natural', type: 'Zumo', benefits: ['Inmunidad', 'Energía'],
    benefitsText: 'La vitamina C de la naranja contribuye a las defensas y a reducir el cansancio.',
    ingredients: ['4 naranjas de zumo', '1 cucharadita de miel (opcional)'],
    instructions: 'Exprime las naranjas y sírvelo recién hecho para conservar la vitamina C. Endulza con miel solo si lo necesitas.' },
  { title: 'Zumo verde detox', type: 'Zumo', benefits: ['Detox', 'Digestión', 'Limpieza hígado'],
    benefitsText: 'Apio, pepino y manzana aportan agua, fibra y minerales que ayudan a depurar.',
    ingredients: ['2 ramas de apio', '1/2 pepino', '1 manzana verde', '1 puñado de espinacas', 'zumo de 1/2 limón', '200 ml de agua fría'],
    instructions: 'Lava todo, trocea y licúa o tritura con el agua. Cuela si lo prefieres más fino y bebe en el momento.' },
  { title: 'Zumo de zanahoria, naranja y jengibre', type: 'Zumo', benefits: ['Vista', 'Inmunidad'],
    benefitsText: 'El betacaroteno de la zanahoria cuida la vista y la piel; el jengibre es antiinflamatorio.',
    ingredients: ['3 zanahorias', '2 naranjas', '1 trozo (2 cm) de jengibre fresco'],
    instructions: 'Licúa las zanahorias con el jengibre pelado y mezcla con el zumo de las naranjas. Remueve y sirve frío.' },
  { title: 'Zumo de remolacha y manzana', type: 'Zumo', benefits: ['Deporte', 'Corazón', 'Limpieza hígado'],
    benefitsText: 'Los nitratos naturales de la remolacha favorecen la circulación y el rendimiento deportivo; la betaína de la remolacha se asocia popularmente al apoyo de la función hepática.',
    ingredients: ['1 remolacha cruda pelada', '2 manzanas', 'zumo de 1/2 limón', '150 ml de agua'],
    instructions: 'Trocea la remolacha y las manzanas, tritura con el agua y el limón y cuela. Ideal una hora antes de entrenar.' },
  { title: 'Zumo de granada', type: 'Zumo', benefits: ['Antioxidante', 'Corazón'],
    benefitsText: 'La granada es una de las frutas con más antioxidantes; ayuda a cuidar el corazón.',
    ingredients: ['3 granadas grandes'],
    instructions: 'Desgrana las granadas y pasa los granos por el exprimidor o tritura y cuela. Bebe recién hecho.' },
  { title: 'Zumo de piña y pepino', type: 'Zumo', benefits: ['Digestión', 'Hidratación'],
    benefitsText: 'La bromelina de la piña ayuda a digerir y el pepino hidrata con muy pocas calorías.',
    ingredients: ['1/2 piña pelada', '1/2 pepino', 'hojas de menta', '150 ml de agua fría'],
    instructions: 'Tritura la piña y el pepino con el agua, cuela y sirve con la menta picada por encima.' },
  { title: 'Zumo de sandía y lima', type: 'Zumo', benefits: ['Hidratación', 'Deporte'],
    benefitsText: 'La sandía es 92% agua y aporta potasio: perfecta para reponer tras el calor o el ejercicio.',
    ingredients: ['600 g de sandía sin pepitas', 'zumo de 1 lima', 'hojas de hierbabuena'],
    instructions: 'Tritura la sandía con el zumo de lima, cuela si quieres y sirve muy frío con la hierbabuena.' },
  { title: 'Limonada casera con menta', type: 'Zumo', benefits: ['Hidratación', 'Inmunidad'],
    benefitsText: 'Refresca, hidrata y aporta vitamina C sin los azúcares de los refrescos.',
    ingredients: ['3 limones', '500 ml de agua fría', '1 cucharada de miel o azúcar', 'hojas de menta', 'hielo'],
    instructions: 'Exprime los limones, mezcla con el agua y la miel hasta disolver y sirve con hielo y menta.' },
  { title: 'Zumo de pomelo y naranja', type: 'Zumo', benefits: ['Detox', 'Inmunidad', 'Limpieza hígado'],
    benefitsText: 'Cítricos bajos en azúcar y ricos en vitamina C; el pomelo es ligeramente depurativo.',
    ingredients: ['2 pomelos', '1 naranja', '1 cucharadita de miel (opcional)'],
    instructions: 'Exprime los cítricos, mezcla y endulza ligeramente si el pomelo te resulta muy amargo.' },
  { title: 'Zumo de uva negra', type: 'Zumo', benefits: ['Antioxidante', 'Corazón'],
    benefitsText: 'Los polifenoles de la piel de la uva negra (resveratrol) son antioxidantes cardioprotectores.',
    ingredients: ['500 g de uva negra sin rabitos'],
    instructions: 'Lava bien la uva, tritura con piel y cuela. Sirve frío sin endulzar: la uva ya es muy dulce.' },
  { title: 'Zumo de tomate especiado', type: 'Zumo', benefits: ['Antioxidante', 'Saciante'],
    benefitsText: 'El licopeno del tomate es un potente antioxidante y este zumo apenas tiene calorías.',
    ingredients: ['5 tomates maduros', 'zumo de 1/2 limón', 'una pizca de sal y pimienta', 'unas gotas de salsa picante (opcional)', '1 rama de apio para decorar'],
    instructions: 'Tritura los tomates, cuela, salpimienta y añade el limón. Sirve frío con la rama de apio.' },
  { title: 'Batido de fresa y plátano', type: 'Batido', benefits: ['Energía', 'Deporte'],
    benefitsText: 'Carbohidratos del plátano y vitamina C de la fresa: energía rápida antes o después de entrenar.',
    ingredients: ['250 g de fresas', '1 plátano maduro', '300 ml de leche o bebida vegetal', '1 cucharadita de miel (opcional)'],
    instructions: 'Lava y trocea las fresas, pela el plátano y bate todo con la leche hasta que quede cremoso.' },
  { title: 'Batido de avena y plátano', type: 'Batido', benefits: ['Saciante', 'Energía'],
    benefitsText: 'La avena aporta fibra beta-glucano que sacia y da energía estable toda la mañana.',
    ingredients: ['1 plátano', '4 cucharadas de copos de avena', '300 ml de leche o bebida vegetal', '1 cucharadita de canela', '1 cucharadita de miel'],
    instructions: 'Bate todo 1 minuto y deja reposar 5 minutos para que la avena espese. Ideal de desayuno.' },
  { title: 'Smoothie de espinacas y mango', type: 'Smoothie', benefits: ['Detox', 'Piel'],
    benefitsText: 'Hierro y folatos de la espinaca con la vitamina A del mango: piel y cabello más sanos.',
    ingredients: ['1 mango maduro', '2 puñados de espinacas frescas', '1 plátano', '250 ml de agua de coco o agua'],
    instructions: 'Pela y trocea el mango y el plátano, añade las espinacas lavadas y bate con el agua de coco.' },
  { title: 'Smoothie de frutos rojos y yogur', type: 'Smoothie', benefits: ['Antioxidante', 'Digestión'],
    benefitsText: 'Antocianinas antioxidantes de los frutos rojos y probióticos del yogur para la flora intestinal.',
    ingredients: ['200 g de frutos rojos (frescos o congelados)', '2 yogures naturales', '1 cucharada de miel', '100 ml de leche'],
    instructions: 'Bate todo hasta que quede homogéneo. Con fruta congelada queda como un sorbete cremoso.' },
  { title: 'Batido de chocolate, plátano y cacahuete', type: 'Batido', benefits: ['Deporte', 'Saciante'],
    benefitsText: 'Proteína del cacahuete y la leche con carbohidratos del plátano: recuperación muscular.',
    ingredients: ['1 plátano', '1 cucharada de crema de cacahuete', '1 cucharada de cacao puro en polvo', '300 ml de leche', '2 dátiles (opcional)'],
    instructions: 'Bate todos los ingredientes hasta que quede cremoso. Perfecto después de entrenar.' },
  { title: 'Smoothie de aguacate y cacao', type: 'Smoothie', benefits: ['Corazón', 'Saciante'],
    benefitsText: 'Grasas saludables del aguacate y magnesio del cacao puro: cremoso, saciante y cardiosaludable.',
    ingredients: ['1/2 aguacate maduro', '1 cucharada de cacao puro', '1 plátano', '250 ml de bebida de almendras', '2 dátiles'],
    instructions: 'Bate todo bien hasta que no queden grumos. Parece un postre de chocolate, pero es pura fruta.' },
  { title: 'Lassi de mango', type: 'Batido', benefits: ['Digestión', 'Huesos'],
    benefitsText: 'Bebida india de yogur: probióticos para la digestión y calcio para los huesos.',
    ingredients: ['1 mango maduro', '2 yogures naturales', '100 ml de leche fría', '1 cucharadita de miel', 'una pizca de cardamomo molido'],
    instructions: 'Bate el mango pelado con el yogur, la leche y la miel. Sirve frío con el cardamomo por encima.' },
  { title: 'Batido de papaya y naranja', type: 'Batido', benefits: ['Digestión', 'Piel'],
    benefitsText: 'La papaína de la papaya facilita la digestión de las proteínas y su vitamina A cuida la piel.',
    ingredients: ['1/2 papaya madura', 'zumo de 2 naranjas', '1 yogur natural', 'hielo'],
    instructions: 'Pela la papaya, retira las semillas y bate con el zumo y el yogur. Sirve con hielo.' },
  { title: 'Smoothie de kiwi, pepino y manzana', type: 'Smoothie', benefits: ['Inmunidad', 'Digestión'],
    benefitsText: 'El kiwi tiene más vitamina C que la naranja y fibra que regula el tránsito intestinal.',
    ingredients: ['3 kiwis pelados', '1/2 pepino', '1 manzana verde', '150 ml de agua fría', 'zumo de 1/2 lima'],
    instructions: 'Tritura todo junto hasta que quede fino. No lo cueles: la fibra del kiwi es parte del beneficio.' },
  { title: 'Batido dorado de cúrcuma y mango', type: 'Batido', benefits: ['Antioxidante', 'Inmunidad'],
    benefitsText: 'La curcumina es antiinflamatoria; con pimienta negra y grasa láctea se absorbe mucho mejor.',
    ingredients: ['1 mango', '1 cucharadita de cúrcuma molida', 'una pizca de pimienta negra', '300 ml de leche entera o de coco', '1 cucharadita de miel'],
    instructions: 'Bate todo 1 minuto. La pizca de pimienta no se nota y multiplica el efecto de la cúrcuma.' },
  { title: 'Batido de melocotón y yogur', type: 'Batido', benefits: ['Piel', 'Huesos'],
    benefitsText: 'Vitamina A del melocotón para la piel y calcio + proteínas del yogur para los huesos.',
    ingredients: ['3 melocotones maduros', '2 yogures naturales', '1 cucharadita de vainilla', '1 cucharada de miel', 'hielo'],
    instructions: 'Pela los melocotones y bate con el resto. En invierno funciona igual con melocotón en su jugo (escurrido).' },
  { title: 'Batido de café y plátano', type: 'Batido', benefits: ['Energía', 'Deporte'],
    benefitsText: 'Cafeína natural y carbohidratos del plátano: el empujón perfecto para empezar el día.',
    ingredients: ['1 café expreso frío', '1 plátano', '250 ml de leche', '2 dátiles', 'hielo', 'una pizca de canela'],
    instructions: 'Bate todo con el hielo y sirve inmediatamente. Sustituye al café con azúcar de media mañana.' },
  { title: 'Piña colada sin alcohol', type: 'Batido', benefits: ['Hidratación', 'Energía'],
    benefitsText: 'Versión saludable del clásico: hidrata y aporta la bromelina digestiva de la piña.',
    ingredients: ['1/2 piña pelada', '200 ml de leche de coco', '150 ml de zumo de piña', 'hielo picado'],
    instructions: 'Bate la piña con la leche de coco, el zumo y el hielo hasta que quede espumoso. Sirve muy frío.' },
  { title: 'Smoothie de arándanos y avena', type: 'Smoothie', benefits: ['Antioxidante', 'Saciante'],
    benefitsText: 'Los arándanos protegen la memoria y la vista; la avena mantiene el hambre a raya.',
    ingredients: ['150 g de arándanos', '3 cucharadas de copos de avena', '1 yogur natural', '200 ml de leche', '1 cucharadita de miel'],
    instructions: 'Bate todo y deja reposar 5 minutos. Con arándanos congelados queda más cremoso aún.' },
  { title: 'Ayran de pepino y menta', type: 'Batido', benefits: ['Hidratación', 'Digestión'],
    benefitsText: 'Bebida turca de yogur salado: repone sales y refresca mejor que cualquier refresco en verano.',
    ingredients: ['2 yogures naturales', '200 ml de agua muy fría', '1/2 pepino', 'hojas de menta', 'una pizca de sal'],
    instructions: 'Bate el yogur con el agua y la sal, añade el pepino rallado y la menta picada y sirve con hielo.' },
  { title: 'Batido de dátiles y almendras', type: 'Batido', benefits: ['Energía', 'Huesos'],
    benefitsText: 'Azúcares naturales del dátil de absorción lenta y calcio de las almendras.',
    ingredients: ['6 dátiles sin hueso', '300 ml de bebida de almendras', '1 plátano', 'una pizca de canela', 'hielo'],
    instructions: 'Remoja los dátiles 10 minutos en agua caliente, escurre y bate con el resto hasta que quede fino.' },
  { title: 'Zumo antigripal de cítricos y jengibre', type: 'Zumo', benefits: ['Inmunidad', 'Antioxidante'],
    benefitsText: 'Triple dosis de vitamina C con jengibre y miel: el clásico reconstituyente del invierno.',
    ingredients: ['2 naranjas', '1 limón', '1 mandarina', '1 trozo (2 cm) de jengibre', '1 cucharada de miel'],
    instructions: 'Exprime los cítricos, ralla el jengibre y mézclalo todo con la miel. Tómalo recién hecho.' }
].map(j => ({
  title: j.title,
  category: JUICE_CATEGORY,
  area: 'Saludable',
  image: null,
  ingredients: j.ingredients,
  instructions: j.instructions,
  style: 'saludable',
  source: 'juice',
  type: j.type,
  benefits: j.benefits,
  benefitsText: j.benefitsText
}));

let catalogData = null;
let catalogLoading = false;
let catalogRenderLimit = 48;
let catalogServings = 2;
const catalogFilter = { text: '', category: 'all', benefit: 'all' };
// Productos añadidos manualmente a la lista de la compra (desde recetas o a mano).
const extraShoppingItems = new Map();

// Recetas cuyos ingredientes son líneas de texto en español (recetario, mundo y zumos).
function hasPlainIngredients(recipe) {
  return recipe.source === 'db' || recipe.source === 'juice' || recipe.source === 'world';
}

function catalogBaseServings(recipe) {
  return recipe.source === 'db' ? 4 : 2; // zumos: 2 vasos, menú local: 2 comensales
}

// Líneas de ingredientes en español de una receta (texto plano, listas para escalar).
function ingredientLinesES(recipe) {
  if (hasPlainIngredients(recipe)) return recipe.ingredients.slice();
  return recipe.ingredients.map(i => `${i.qty} ${i.name}`.replace(/\s+/g, ' ').trim());
}

function adjustCatalogServings(amount) {
  catalogServings = Math.max(1, catalogServings + amount);
  const display = document.getElementById('catalog-servings');
  if (display) display.innerText = catalogServings;
  persistState();
  renderCatalog();
}

function showToast(message) {
  let toast = document.getElementById('nutriplan-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nutriplan-toast';
    toast.className = 'fixed left-1/2 -translate-x-1/2 bottom-28 z-[60] bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-full shadow-lg text-sm font-semibold transition-opacity duration-300';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.opacity = '1';
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

async function addRecipeToShopping(title) {
  if (!catalogData) return;
  const recipe = catalogData.find(r => r.title === title);
  if (!recipe) return;
  if (!recipe.ingredients.length) {
    showToast(t('no_qty_toast'));
    return;
  }
  const factor = catalogServings / catalogBaseServings(recipe);
  const lines = displayIngredientLines(recipe, factor);
  lines.forEach(line => {
    const key = line.toLowerCase();
    if (!extraShoppingItems.has(key)) extraShoppingItems.set(key, { name: line, qty: '' });
  });
  persistState();
  renderShoppingList();
  const tr = trCatalogRecipe(recipe);
  showToast(`${t('added_list_toast')} (${catalogServings} ${t('diners')}): ${tr ? cap(tr.t) : title}`);
}

function handleExtraItemKey(event) {
  if (event.key !== 'Enter') return;
  const value = event.target.value.trim();
  if (!value) return;
  const key = value.toLowerCase();
  if (!extraShoppingItems.has(key)) {
    extraShoppingItems.set(key, { name: value, qty: '' });
  }
  event.target.value = '';
  renderShoppingList();
  showToast(`${t('added_toast')}: ${value}`);
  switchView('cart');
}

function removeExtraItem(key) {
  extraShoppingItems.delete(key);
  renderShoppingList();
}

function clearExtraItems() {
  extraShoppingItems.clear();
  renderShoppingList();
}

async function ensureCatalogData() {
  if (catalogData || catalogLoading) return;
  catalogLoading = true;
  renderCatalog();

  // Recetario empaquetado con la app: recipes.json (666 recetas traducidas) y
  // world_recipes.json (364 platos del mundo con receta completa en español,
  // cantidades para 2 raciones y preparación detallada). Ficheros locales
  // cacheados por el Service Worker: carga instantánea y sin APIs externas.
  // El traductor deja los títulos con mayúscula en cada palabra; en español
  // los conectores van en minúscula ("Arroz Frito Con Pollo" -> "... con Pollo").
  const fixTitleES = (t) => t.replace(/ (De|Del|La|Las|El|Los|Lo|En|Con|Y|E|O|U|A|Al|Para|Por|Su|Sus|Un|Una)(?= )/g, (s) => s.toLowerCase());
  let dbMeals = [];
  let worldDishes = [];
  try {
    const [dbRes, worldRes] = await Promise.all([
      fetch('recipes.json').catch(() => null),
      fetch('world_recipes.json').catch(() => null)
    ]);
    // Categorías corregidas del recetario: acento de Guarnición y la categoría
    // residual "Cabra" (2 platos) se integra en Carne.
    const FIX_CAT = { 'Guarnicion': 'Guarnición', 'Cabra': 'Carne' };
    if (dbRes && dbRes.ok) {
      dbMeals = (await dbRes.json()).map(r => ({
        id: r.id,
        title: fixTitleES(r.title || ''),
        titleEN: r.titleEN || '',
        category: FIX_CAT[r.category] || r.category || 'Varios',
        area: r.area || 'Internacional',
        image: r.image || null,
        ingredients: r.ingredients || [],
        instructions: r.instructions || '',
        style: 'normal',
        source: 'db'
      }));
    }
    if (worldRes && worldRes.ok) {
      worldDishes = (await worldRes.json()).map(r => ({
        title: r.title,
        // Las bebidas sueltas se unifican en el apartado de Zumos y batidos.
        category: r.category === 'Bebidas' ? JUICE_CATEGORY : (r.category || 'Varios'),
        area: r.area || 'Internacional',
        image: null,
        ingredients: r.ingredients || [],
        instructions: r.instructions || '',
        style: 'normal',
        source: 'world'
      }));
    }
  } catch (e) { /* sin ficheros: seguimos con el catálogo local */ }

  // --- Platos duplicados entre el recetario y los platos del mundo ---------
  // Se queda la receta del mundo (mejor redactada en español) y hereda la
  // foto real del recetario; la entrada duplicada del recetario se quita.
  const DB_DUP_TO_WORLD = {
    'cerdo tonkatsu': 'Tonkatsu', 'katsudon japones': 'Katsudon', 'turquia banh mi': 'Banh mi',
    'pollo tandoori': 'Tandoori', 'cordero rogan josh': 'Rogan josh', 'cassoulet de cerdo': 'Cassoulet',
    'croquetas de jamon': 'Croquetas', 'freidora de patatas bravas': 'Patatas bravas',
    'gazpacho rapido': 'Gazpacho', 'gambas al ajillo al jerez': 'Gambas al ajillo',
    'kebab adana': 'Adana kebab', 'lahmacun turco': 'Lahmacun', 'queso borek': 'Börek',
    'pan shawarma': 'Shawarma', 'cuscus de pollo': 'Cuscús', 'tarta de queso crema': 'Tarta de queso',
    'asado de carne': 'Asado', 'empanadas de carne': 'Empanadas', 'alfajores': 'Alfajor',
    'borsch': 'Borscht', 'panqueques blinis': 'Blini', 'rendang de carne': 'Rendang',
    'stroopwafel holandes': 'Stroopwafel', 'locro': 'Locro', 'desayuno ingles': 'Desayuno inglés completo'
  };
  // Duplicados internos de la lista del mundo (ya cubiertos por otro apartado).
  const WORLD_SKIP = new Set(['rendang de ternera', 'limonada', 'batido de chocolate', 'smoothie de frutas']);
  worldDishes = worldDishes.filter(w => !WORLD_SKIP.has(normalizeText(w.title)));
  const worldByNorm = new Map(worldDishes.map(w => [normalizeText(w.title), w]));
  dbMeals = dbMeals.filter(r => {
    const target = DB_DUP_TO_WORLD[normalizeText(r.title)];
    if (!target) return true;
    const w = worldByNorm.get(normalizeText(target));
    if (w && !w.image) w.image = r.image;
    return false;
  });

  const byTitle = new Map();
  const add = (recipe) => {
    const key = normalizeText(recipe.title);
    if (!byTitle.has(key)) byTitle.set(key, recipe);
  };
  dbMeals.forEach(add);
  juiceData.forEach(add);
  getLocalMenuRecipes().forEach(add);
  worldDishes.forEach(add);

  catalogData = Array.from(byTitle.values()).sort((a, b) => a.title.localeCompare(b.title, 'es'));
  catalogLoading = false;
}

async function openCatalog() {
  renderCatalog();
  await Promise.all([ensureCatalogData(), ensureCatalogTr()]);
  renderCatalog();
}

// Traducción de una receta del catálogo para el idioma activo (o null si no hay).
function trCatalogRecipe(recipe) {
  if (recipe.source === 'juice' || recipe.source === 'local') return trDish(recipe.title);
  const table = catalogTrByLang[currentLang];
  if (!table) return null;
  if (recipe.source === 'db' && recipe.id) return table['db:' + recipe.id] || null;
  if (recipe.source === 'world') return table['w:' + recipe.title] || null;
  return null;
}

// Líneas de ingredientes que se MUESTRAN (idioma activo), listas para escalar.
function displayIngredientLines(recipe, factor) {
  const tr = trCatalogRecipe(recipe);
  if (hasPlainIngredients(recipe)) {
    const base = (tr && tr.i && tr.i.length === recipe.ingredients.length) ? tr.i : ingredientLinesES(recipe);
    return base.map(line => scaleLine(line, factor));
  }
  // Recetas con pares {name, qty} (menú local).
  return recipe.ingredients.map((item, idx) => {
    const name = tr && tr.i && tr.i[idx] ? tr.i[idx] : item.name;
    return `${scaleLine(trQty(item.qty), factor)} ${name}`.replace(/\s+/g, ' ').trim();
  });
}

// Orden lógico de las categorías en los chips (desayuno -> platos -> dulces).
const CATEGORY_ORDER = [
  'Desayuno', 'Carne', 'Pollo', 'Cerdo', 'Cordero', 'Pescado y marisco',
  'Arroz', 'Pasta', 'Sopas', 'Vegetariano', 'Vegano', 'Ensaladas',
  'Guarnición', 'Aperitivos', 'Panadería', 'Platos principales', 'Postres',
  JUICE_CATEGORY, 'Varios'
];
function catalogCategories() {
  const present = new Set(catalogData.map(r => r.category));
  const ordered = CATEGORY_ORDER.filter(c => present.has(c));
  // Cualquier categoría nueva no prevista se añade al final, ordenada.
  const extras = Array.from(present).filter(c => !CATEGORY_ORDER.includes(c)).sort((a, b) => a.localeCompare(b, 'es'));
  return ordered.concat(extras);
}

function normalizeText(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// ---------------------------------------------------------------------------
// TOP MUNDIAL: los platos más famosos y reconocidos de la cocina internacional
// presentes en el recetario (selección curada, en orden de fama; títulos
// normalizados sin acentos). Se muestran con el chip "⭐ Top mundial".
// ---------------------------------------------------------------------------
const FAMOUS_DISHES = [
  'pizza margarita', 'sushi', 'hamburguesa', 'paella', 'tacos al pastor', 'spaghetti carbonara',
  'ramen', 'pho', 'pad thai', 'pollo tikka masala', 'lasana', 'risotto', 'tiramisu', 'croissant',
  'creme brulee', 'ratatouille', 'boeuf bourguignon', 'biryani', 'pollo a la mantequilla', 'naan',
  'hummus', 'falafel', 'shawarma', 'doner kebab', 'baklava', 'musaca', 'gyros', 'tzatziki',
  'bibimbap', 'kimchi', 'bulgogi', 'dim sum', 'pato laqueado de pekin', 'gyoza', 'tempura',
  'tom yum', 'curry verde tailandes', 'rendang', 'nasi goreng', 'laksa', 'satay', 'borscht',
  'pierogi', 'gulash', 'schnitzel', 'pretzel', 'strudel de manzana', 'feijoada', 'picanha',
  'asado', 'empanadas', 'milanesa', 'ceviche', 'lomo saltado', 'arepa', 'poutine', 'pavlova',
  'pastel de nata', 'churros', 'crema catalana', 'tortilla de patatas', 'gazpacho',
  'pulpo a la gallega', 'gambas al ajillo', 'jamon iberico', 'guacamole', 'mole poblano',
  'quesadilla', 'burrito', 'pozole', 'salmorejo', 'mapo tofu', 'dal', 'samosa', 'dosa',
  'beef wellington', 'fish and chips', 'albondigas suecas', 'fondue de queso', 'raclette',
  'wiener schnitzel', 'tarta sacher', 'gravlax', 'adobo filipino', 'jollof rice', 'koshari',
  'banh mi', 'som tam', 'onigiri', 'tonkatsu', 'katsudon', 'sopa de miso', 'mochi',
  'okonomiyaki', 'shakshuka', 'cuscus', 'tarta de queso', 'brownie', 'tres leches', 'flan',
  'macaron',
  // Cocina tradicional rumana (Recetario 365): los platos más queridos.
  'sarmale', 'mamaliga cu branza si smantana', 'mici (mititei)', 'ciorba de burta',
  'ciorba de perisoare', 'ciorba radauteana', 'tochitura moldoveneasca', 'papanasi',
  'cozonac', 'salata de boeuf', 'zacusca', 'drob de miel', 'placinta cu branza',
  'ardei umpluti', 'varza a la cluj', 'ciorba de fasole cu afumatura',
  'gomboti (galuste cu prune)', 'mucenici moldovenesti'
];
const FAMOUS_RANK = new Map(FAMOUS_DISHES.map((title, index) => [title, index]));
// Sinónimos español -> inglés para buscar ingredientes también en recetas de la API.
const SEARCH_SYNONYMS = {
  pollo: 'chicken', ternera: 'beef', vaca: 'beef', cerdo: 'pork', cordero: 'lamb', pavo: 'turkey',
  pescado: 'fish', salmon: 'salmon', atun: 'tuna', bacalao: 'cod', gambas: 'prawn', gamba: 'prawn', marisco: 'seafood',
  arroz: 'rice', pasta: 'pasta', fideos: 'noodle', huevo: 'egg', huevos: 'egg', queso: 'cheese', leche: 'milk',
  nata: 'cream', mantequilla: 'butter', yogur: 'yogurt', tomate: 'tomato', cebolla: 'onion', ajo: 'garlic',
  patata: 'potato', patatas: 'potato', zanahoria: 'carrot', champinones: 'mushroom', champinon: 'mushroom',
  espinacas: 'spinach', guisantes: 'pea', garbanzos: 'chickpea', lentejas: 'lentil', alubias: 'bean', judias: 'bean',
  limon: 'lemon', lima: 'lime', naranja: 'orange', manzana: 'apple', platano: 'banana', fresa: 'strawberry',
  chocolate: 'chocolate', harina: 'flour', azucar: 'sugar', aceite: 'oil', pan: 'bread', miel: 'honey',
  jengibre: 'ginger', curry: 'curry', coco: 'coconut', maiz: 'corn', calabacin: 'courgette', berenjena: 'aubergine',
  pimiento: 'pepper', chile: 'chilli', vino: 'wine',
  // Rumano -> español (los textos de búsqueda están en español/inglés).
  pui: 'pollo', porc: 'cerdo', vita: 'ternera', peste: 'pescado', somon: 'salmon', creveti: 'gamba',
  orez: 'arroz', paste: 'pasta', taitei: 'fideos', oua: 'huevo', branza: 'queso', lapte: 'leche',
  smantana: 'nata', iaurt: 'yogur', rosii: 'tomate', ceapa: 'cebolla', usturoi: 'ajo',
  cartofi: 'patata', cartof: 'patata', morcov: 'zanahoria', ciuperci: 'champinon', spanac: 'espinaca',
  mazare: 'guisantes', naut: 'garbanzo', linte: 'lenteja', fasole: 'alubia', lamaie: 'limon',
  portocala: 'naranja', banana: 'platano', capsuni: 'fresa', ciocolata: 'chocolate', faina: 'harina',
  zahar: 'azucar', ulei: 'aceite', paine: 'pan', miere: 'miel', ghimbir: 'jengibre', porumb: 'maiz',
  dovlecel: 'calabacin', vinete: 'berenjena', ardei: 'pimiento', supa: 'sopa', salata: 'ensalada',
  // Inglés -> español (para buscar en inglés: los ingredientes están en español).
  chicken: 'pollo', beef: 'ternera', pork: 'cerdo', lamb: 'cordero', turkey: 'pavo', fish: 'pescado',
  cod: 'bacalao', prawn: 'gamba', shrimp: 'gamba', seafood: 'marisco', rice: 'arroz', noodle: 'fideos',
  egg: 'huevo', eggs: 'huevo', cheese: 'queso', milk: 'leche', cream: 'nata', butter: 'mantequilla',
  yogurt: 'yogur', tomato: 'tomate', onion: 'cebolla', garlic: 'ajo', potato: 'patata', carrot: 'zanahoria',
  mushroom: 'champinon', spinach: 'espinacas', pea: 'guisantes', chickpea: 'garbanzo', lentil: 'lenteja',
  bean: 'alubia', beans: 'alubia', lemon: 'limon', apple: 'manzana', strawberry: 'fresa',
  flour: 'harina', sugar: 'azucar', oil: 'aceite', bread: 'pan', honey: 'miel', ginger: 'jengibre',
  coconut: 'coco', corn: 'maiz', courgette: 'calabacin', zucchini: 'calabacin', aubergine: 'berenjena',
  eggplant: 'berenjena', soup: 'sopa', salad: 'ensalada', dessert: 'postre'
};
// Texto donde se busca (todo en minúsculas y sin acentos): título ES + EN,
// país, categoría e ingredientes ya en español. Se calcula una sola vez por receta.
function searchHaystacks(recipe) {
  if (!recipe._search) {
    const ings = hasPlainIngredients(recipe)
      ? recipe.ingredients.join(' ')
      : recipe.ingredients.map(i => i.name).join(' ');
    const extra = recipe.benefits ? `${recipe.type} ${recipe.benefits.join(' ')}` : '';
    recipe._search = {
      title: normalizeText(`${recipe.title} ${recipe.titleEN || ''}`),
      rest: normalizeText(`${recipe.area} ${recipe.category} ${extra} ${ings}`)
    };
  }
  return recipe._search;
}
function termMatches(term, text) {
  return text.includes(term) || (SEARCH_SYNONYMS[term] && text.includes(SEARCH_SYNONYMS[term]));
}
function getFilteredCatalog() {
  const terms = catalogFilter.text
    ? catalogFilter.text.split(',').map(t => normalizeText(t.trim())).filter(Boolean)
    : [];
  const scored = [];
  catalogData.forEach((recipe, index) => {
    if (catalogFilter.category === 'fav') {
      if (!favoriteRecipes.has(recipe.title)) return;
    } else if (catalogFilter.category === 'top') {
      const rank = FAMOUS_RANK.get(normalizeText(recipe.title));
      if (rank === undefined) return;
      // Mantiene el orden de fama dentro del Top mundial.
      scored.push({ recipe, score: (FAMOUS_DISHES.length - rank) / 1000, index: -1 });
      return;
    } else if (catalogFilter.category !== 'all' && recipe.category !== catalogFilter.category) {
      return;
    }
    // Dentro de "Zumos y batidos" se puede filtrar además por beneficio.
    if (catalogFilter.category === JUICE_CATEGORY && catalogFilter.benefit !== 'all') {
      if (!recipe.benefits || !recipe.benefits.includes(catalogFilter.benefit)) return;
    }
    let score = 0;
    if (terms.length) {
      const { title, rest } = searchHaystacks(recipe);
      for (const term of terms) {
        if (termMatches(term, title)) {
          score += title.startsWith(term) ? 3 : 2; // coincidencia en el título: primero
        } else if (termMatches(term, rest)) {
          score += 1; // coincidencia en ingredientes/país/categoría
        } else {
          return; // todos los términos deben coincidir
        }
      }
      // A igualdad de coincidencia, antes los platos con receta completa.
      if (recipe.ingredients.length) score += 0.5;
    }
    scored.push({ recipe, score, index });
  });
  // Mejor coincidencia primero; a igualdad, mantiene el orden alfabético.
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.map(s => s.recipe);
}

function renderCatalogCard(recipe) {
  const isFavorite = favoriteRecipes.has(recipe.title);
  const tr = trCatalogRecipe(recipe);
  const title = escapeHtml(recipe.title); // clave interna (favoritos, fotos, lista)
  const displayTitle = escapeHtml(tr && tr.t ? cap(tr.t) : recipe.title);
  const area = escapeHtml(recipe.source === 'juice' ? tType(recipe.type) : tArea(recipe.area || 'Internacional'));
  const category = escapeHtml(tCat(recipe.category));
  const base = catalogBaseServings(recipe);
  const factor = catalogServings / base;
  const hasIngredients = recipe.ingredients.length > 0;
  let ingredientsHTML;
  if (!hasIngredients) {
    ingredientsHTML = `<p class="mt-1">${t('typical_dish')} ${area}.</p>`;
  } else {
    const lines = displayIngredientLines(recipe, factor).slice(0, hasPlainIngredients(recipe) ? undefined : 14);
    ingredientsHTML = `<ul class="list-disc list-inside mt-1 space-y-1">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`;
  }
  const fullInstr = (tr && tr.s) || recipe.instructions || `${t('traditional_recipe')} ${tArea(recipe.area || 'Internacional')}.`;
  const titleEl = `<h4 class="font-headline-sm text-on-surface">${displayTitle}</h4>`;
  const hasRealInstr = !!((tr && tr.s) || recipe.instructions);
  // Recetas largas: resumidas con botón "Ver receta completa"; la receta
  // completa se muestra en pasos numerados.
  let instrEl;
  if (fullInstr.length > 320) {
    const shortText = `${fullInstr.slice(0, 280).trim()}…`;
    instrEl = `
      <div class="instr-wrap">
        <p class="mt-1 text-body-md text-on-surface instr-short">${escapeHtml(shortText)}
          <button onclick="toggleInstr(this, true)" class="text-primary font-semibold underline-offset-2 underline">${t('full_recipe')}</button>
        </p>
        <div class="instr-full hidden">
          ${instructionStepsHTML(fullInstr)}
          <button onclick="toggleInstr(this, false)" class="mt-2 text-primary text-body-md font-semibold underline-offset-2 underline">${t('see_less')}</button>
        </div>
      </div>`;
  } else {
    instrEl = instructionStepsHTML(fullInstr);
  }
  // Zumos y batidos: beneficios destacados con su explicación.
  const benefitsEl = recipe.benefits ? `
        <div class="text-label-md">
          <div class="flex flex-wrap gap-1.5">
            ${recipe.benefits.map(b => `<span class="bg-primary-fixed text-on-primary-fixed text-xs font-semibold px-2 py-1 rounded-full">✦ ${escapeHtml(tBenefit(b))}</span>`).join('')}
          </div>
          <p class="mt-2 text-on-surface-variant">${escapeHtml((tr && tr.b) || recipe.benefitsText || '')}</p>
        </div>` : '';
  const servingsLabel = recipe.source === 'juice' ? t('glasses') : t('diners');
  // Alérgenos detectados sobre los ingredientes originales del plato.
  const allergens = allergensOfText(ingredientsText(recipe.ingredients));

  return `
    <div class="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container overflow-hidden flex flex-col">
      <div class="relative h-44 w-full bg-surface-container-high">
        ${dishImageHTML(recipe)}
        <div class="absolute top-3 left-3 flex gap-2">
          <span class="bg-white/90 backdrop-blur text-primary text-xs font-semibold px-2 py-1 rounded-full">${category}</span>
          <span class="bg-white/90 backdrop-blur text-on-surface-variant text-xs font-semibold px-2 py-1 rounded-full">${area}</span>
        </div>
        <button data-fav="${title}" class="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center ${isFavorite ? 'bg-secondary text-white' : 'bg-white/90 text-primary'} shadow-sm">
          <span class="material-symbols-outlined" style="font-size:20px; font-variation-settings:'FILL' ${isFavorite ? 1 : 0};">favorite</span>
        </button>
      </div>
      <div class="p-4 flex flex-col gap-3 flex-1">
        ${titleEl}
        ${benefitsEl}
        <div class="text-label-md text-on-surface-variant">
          <p class="font-semibold text-on-surface">${t('ingredients')} <span class="text-primary">· ${catalogServings} ${servingsLabel}</span></p>
          ${ingredientsHTML}
        </div>
        <div class="text-label-md text-on-surface-variant">
          <p class="font-semibold text-on-surface">${recipe.source === 'juice' ? t('preparation') : t('cook_mode')}</p>
          ${instrEl}
          ${hasRealInstr && recipe.source !== 'juice' ? videoLinkHTML(recipe.titleEN || recipe.title) : ''}
        </div>
        ${hasIngredients ? allergenFooterHTML(allergens) : ''}
        <button data-add="${title}" class="mt-auto w-full flex items-center justify-center gap-2 ${hasIngredients ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'} font-semibold py-3 rounded-2xl active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined" style="font-size:20px;">add_shopping_cart</span>
          ${t('add_to_list')}
        </button>
      </div>
    </div>
  `;
}

function renderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  const countEl = document.getElementById('catalog-count');
  const chipsContainer = document.getElementById('catalog-chips');

  if (!catalogData) {
    if (chipsContainer) chipsContainer.innerHTML = '';
    if (countEl) countEl.innerText = '';
    grid.innerHTML = `
      <div class="col-span-full rounded-3xl bg-surface-container-low p-10 text-center text-on-surface-variant">
        <span class="material-symbols-outlined animate-spin text-primary" style="font-size:40px;">progress_activity</span>
        <p class="mt-3">${t('loading_catalog')}</p>
      </div>
    `;
    return;
  }

  if (chipsContainer) {
    const chips = [{ id: 'all', label: t('chip_all') }, { id: 'top', label: t('chip_top') }]
      .concat(catalogCategories().map(c => ({ id: c, label: c === JUICE_CATEGORY ? '🥤 ' + tCat(c) : tCat(c) })))
      .concat([{ id: 'fav', label: t('chip_fav') }]);
    let html = chips.map(chip => `
      <button onclick="setCatalogCategory('${chip.id.replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-full font-label-lg text-label-lg whitespace-nowrap border border-surface-container transition-all ${catalogFilter.category === chip.id ? 'active-catalog' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'}">${escapeHtml(chip.label)}</button>
    `).join('');
    // Dentro de Zumos y batidos: segunda fila de chips para filtrar por beneficio.
    if (catalogFilter.category === JUICE_CATEGORY) {
      const benefits = Array.from(new Set(juiceData.flatMap(j => j.benefits))).sort((a, b) => a.localeCompare(b, 'es'));
      html += `<div class="w-full flex gap-2 overflow-x-auto pt-2">` +
        [{ id: 'all', label: t('all_benefits') }].concat(benefits.map(b => ({ id: b, label: tBenefit(b) })))
          .map(chip => `
            <button onclick="setCatalogBenefit('${chip.id.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-full text-label-md whitespace-nowrap border transition-all ${catalogFilter.benefit === chip.id ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-variant'}">${escapeHtml(chip.label)}</button>
          `).join('') + `</div>`;
    }
    // Nota explicativa del Top mundial.
    if (catalogFilter.category === 'top') {
      html += `<div class="w-full pt-2 text-label-md text-on-surface-variant">${t('top_note')}</div>`;
    }
    chipsContainer.innerHTML = html;
  }

  const filtered = getFilteredCatalog();
  if (countEl) countEl.innerText = `${filtered.length} ${t('dishes_count')}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full rounded-3xl bg-surface-container-low p-6 text-center text-on-surface-variant">
        ${t('no_results')}
      </div>
    `;
    return;
  }

  const visible = filtered.slice(0, catalogRenderLimit);
  const moreCount = filtered.length - visible.length;
  grid.innerHTML = visible.map(renderCatalogCard).join('')
    + (moreCount > 0
      ? `<div class="col-span-full flex justify-center pt-2"><button onclick="catalogMore()" class="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold shadow-sm active:scale-95 transition-all">${t('see_more')} (${moreCount})</button></div>`
      : '');

  grid.onclick = (event) => {
    const favBtn = event.target.closest('[data-fav]');
    if (favBtn) { toggleCatalogFavorite(favBtn.getAttribute('data-fav')); return; }
    const addBtn = event.target.closest('[data-add]');
    if (addBtn) { addRecipeToShopping(addBtn.getAttribute('data-add')); }
  };

  hydrateLazyImages(grid);
}

// ===========================================================================
// COLECCIONES POR SECCIONES (secciones.json)
// Catálogo curado a partir de las infografías: sopas frías, tapas, ensaladas,
// smoothies, salsas, etc. No toca el motor del menú diario; reutiliza el mismo
// detector de alérgenos y de dieta (allergensOfText / optionNeedsAdaptation).
// ===========================================================================
let seccionesData = null;       // [{id, titulo, icon, descripcion, platos:[...]}]
let seccionesTr = null;         // traducción RO/EN por id de plato {id: {t,i,s,titulo}}
const seccionesFilter = { section: 'all', momento: 'all', benefit: 'all', onlyCompat: false };
const MOMENTO_ORDER = ['desayuno', 'comida', 'cena', 'merienda', 'aperitivo', 'postre', 'guarnicion'];
const MOMENTO_ICON = { desayuno: 'bakery_dining', comida: 'lunch_dining', cena: 'dinner_dining', merienda: 'cookie', aperitivo: 'tapas', postre: 'icecream', guarnicion: 'rice_bowl' };

const seccionesPromise = fetch('secciones.json')
  .then(r => (r.ok ? r.json() : null))
  .then(d => {
    seccionesData = d ? d.secciones : [];
    // Sección virtual de zumos a partir del juiceData existente (con sus beneficios
    // y su traducción del catálogo); no se duplica contenido.
    seccionesData.push({
      id: 'zumos', titulo: 'Zumos y bebidas funcionales', icon: 'local_drink',
      platos: juiceData.map(j => Object.assign({}, j, {
        id: 'juice:' + j.title, momentos: ['desayuno', 'merienda'],
      })),
    });
  })
  .catch(() => { seccionesData = []; });

// Traducción de contenido (si existe secciones_<lang>.json; si no, español).
function ensureSeccionesTr() {
  if (currentLang === 'es') { seccionesTr = null; return Promise.resolve(); }
  return fetch(`secciones_${currentLang}.json`)
    .then(r => (r.ok ? r.json() : null))
    .then(d => { seccionesTr = d; })
    .catch(() => { seccionesTr = null; });
}
function trSeccionDish(dish) {
  return (seccionesTr && seccionesTr[dish.id]) || null;
}
function trSeccionTitle(section) {
  if (section.id === 'zumos') return t('sec_zumos');
  if (seccionesTr && seccionesTr['sec:' + section.id]) return seccionesTr['sec:' + section.id];
  return section.titulo;
}

function toggleSeccionCompat(checked) {
  seccionesFilter.onlyCompat = checked;
  renderSecciones();
}
function setSeccionSection(id) {
  seccionesFilter.section = id;
  renderSecciones();
}
function setSeccionMomento(id) {
  seccionesFilter.momento = id;
  renderSecciones();
}
function setSeccionBenefit(id) {
  seccionesFilter.benefit = id;
  renderSecciones();
}

function renderSeccionCard(dish, section) {
  const isJuice = dish.source === 'juice';
  // Los zumos reutilizan la traducción del catálogo (trDish); el resto, secciones_*.
  const tr = isJuice ? trCatalogRecipe(dish) : trSeccionDish(dish);
  const title = escapeHtml(dish.title); // clave interna (lista de la compra)
  const displayTitle = escapeHtml(tr && tr.t ? cap(tr.t) : dish.title);
  const ingredients = (tr && tr.i) || dish.ingredients;
  const instructions = (tr && tr.s) || dish.instructions;
  const allergens = allergensOfText(ingredientsText(dish.ingredients));
  // Compatibilidad con la dieta activa (mismo motor que el menú diario).
  const incompatible = optionNeedsAdaptation(dish);
  const dietLabel = currentDiet ? t('diet_' + currentDiet) : '';
  const notSuitable = incompatible && currentDiet && currentDiet !== 'mediterranea'
    ? `<span class="bg-secondary-container text-on-secondary-container text-xs font-semibold px-2 py-1 rounded-full">⚠ ${t('sec_not_suitable')} ${escapeHtml(dietLabel)}</span>`
    : '';
  // Zumos: chips de beneficio (Limpieza hígado, Detox, Digestión…) + explicación.
  const benefitsEl = (isJuice && dish.benefits && dish.benefits.length) ? `
        <div class="text-label-md">
          <div class="flex flex-wrap gap-1.5">
            ${dish.benefits.map(b => `<span class="bg-tertiary-container text-on-tertiary-container text-xs font-semibold px-2 py-1 rounded-full">✦ ${escapeHtml(tBenefit(b))}</span>`).join('')}
          </div>
          <p class="mt-2 text-on-surface-variant">${escapeHtml((tr && tr.b) || dish.benefitsText || '')}</p>
        </div>` : '';

  return `
    <div class="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container overflow-hidden flex flex-col ${incompatible && seccionesFilter.onlyCompat ? 'hidden' : ''}">
      <div class="bg-primary-container text-on-primary-container px-4 py-3 flex items-center gap-2">
        <span class="material-symbols-outlined">${escapeHtml(section.icon || 'restaurant')}</span>
        <h4 class="font-headline-sm">${displayTitle}</h4>
      </div>
      <div class="p-4 flex flex-col gap-3 flex-1">
        ${(dish.momentos && dish.momentos.length) || notSuitable ? `<div class="flex flex-wrap gap-1.5">
          ${(dish.momentos || []).map(m => `<span class="bg-surface-container-high text-on-surface-variant text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:14px;">${escapeHtml(MOMENTO_ICON[m] || 'schedule')}</span>${escapeHtml(t('mom_' + m))}</span>`).join('')}
          ${notSuitable}
        </div>` : ''}
        ${benefitsEl}
        <div class="text-label-md text-on-surface-variant">
          <p class="font-semibold text-on-surface">${t('ingredients')}${isJuice ? '' : ` <span class="text-primary">· ${t('sec_for')}</span>`}</p>
          <ul class="list-disc list-inside mt-1 space-y-1">${ingredients.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
        </div>
        <div class="text-label-md text-on-surface-variant">
          <p class="font-semibold text-on-surface">${isJuice ? t('preparation') : t('cook_mode')}</p>
          ${instructionStepsHTML(instructions)}
        </div>
        ${allergenFooterHTML(allergens)}
        <button data-add-sec="${escapeHtml(dish.id)}" class="mt-auto w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-semibold py-3 rounded-2xl active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined" style="font-size:20px;">add_shopping_cart</span>
          ${t('add_to_list')}
        </button>
      </div>
    </div>`;
}

function renderSecciones() {
  const grid = document.getElementById('secciones-grid');
  if (!grid) return;
  const chipsContainer = document.getElementById('secciones-chips');
  const countEl = document.getElementById('secciones-count');

  if (!seccionesData) {
    grid.innerHTML = `<div class="col-span-full rounded-3xl bg-surface-container-low p-10 text-center text-on-surface-variant">
        <span class="material-symbols-outlined animate-spin text-primary" style="font-size:40px;">progress_activity</span>
      </div>`;
    seccionesPromise.then(() => ensureSeccionesTr()).then(renderSecciones);
    return;
  }

  if (chipsContainer) {
    const chips = [{ id: 'all', label: t('sec_all'), icon: 'apps' }]
      .concat(seccionesData.map(s => ({ id: s.id, label: trSeccionTitle(s), icon: s.icon })));
    chipsContainer.innerHTML = chips.map(chip => `
      <button onclick="setSeccionSection('${chip.id}')" class="px-4 py-2 rounded-full font-label-lg text-label-lg whitespace-nowrap border border-surface-container transition-all flex items-center gap-1.5 ${seccionesFilter.section === chip.id ? 'active-catalog' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'}">
        <span class="material-symbols-outlined" style="font-size:18px;">${escapeHtml(chip.icon || 'restaurant')}</span>${escapeHtml(chip.label)}</button>
    `).join('');
  }

  // Filtro transversal por momento del día (solo los momentos presentes en los datos).
  const momentosContainer = document.getElementById('secciones-momentos');
  if (momentosContainer) {
    const present = new Set();
    seccionesData.forEach(s => s.platos.forEach(d => (d.momentos || []).forEach(m => present.add(m))));
    const moms = [{ id: 'all', label: t('mom_all'), icon: 'schedule' }]
      .concat(MOMENTO_ORDER.filter(m => present.has(m)).map(m => ({ id: m, label: t('mom_' + m), icon: MOMENTO_ICON[m] })));
    momentosContainer.innerHTML = moms.map(chip => `
      <button onclick="setSeccionMomento('${chip.id}')" class="px-3 py-1.5 rounded-full text-label-md whitespace-nowrap border transition-all flex items-center gap-1 ${seccionesFilter.momento === chip.id ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-variant'}">
        <span class="material-symbols-outlined" style="font-size:16px;">${escapeHtml(chip.icon)}</span>${escapeHtml(chip.label)}</button>
    `).join('');
  }

  // Filtro por beneficio: solo dentro de la sección de zumos (los demás platos no
  // tienen beneficios y se filtrarían a cero). Incluye "Limpieza hígado", Detox, etc.
  const inZumos = seccionesFilter.section === 'zumos';
  const benefitsContainer = document.getElementById('secciones-beneficios');
  const notaEl = document.getElementById('secciones-nota');
  if (benefitsContainer) {
    if (inZumos) {
      const benefits = Array.from(new Set(juiceData.flatMap(j => j.benefits))).sort((a, b) => a.localeCompare(b, 'es'));
      const chips = [{ id: 'all', label: t('all_benefits') }].concat(benefits.map(b => ({ id: b, label: tBenefit(b) })));
      benefitsContainer.innerHTML = chips.map(chip => `
        <button onclick="setSeccionBenefit('${chip.id.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-full text-label-md whitespace-nowrap border transition-all ${seccionesFilter.benefit === chip.id ? 'bg-tertiary text-white border-tertiary' : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-variant'}">✦ ${escapeHtml(chip.label)}</button>
      `).join('');
    } else {
      benefitsContainer.innerHTML = '';
    }
  }
  if (notaEl) {
    notaEl.classList.toggle('hidden', !inZumos);
    if (inZumos) notaEl.innerText = t('sec_zumos_note');
  }

  const sections = seccionesFilter.section === 'all'
    ? seccionesData
    : seccionesData.filter(s => s.id === seccionesFilter.section);

  let cards = [];
  let compatCount = 0;
  sections.forEach(section => {
    section.platos.forEach(dish => {
      if (seccionesFilter.momento !== 'all' && !(dish.momentos || []).includes(seccionesFilter.momento)) return;
      if (inZumos && seccionesFilter.benefit !== 'all' && !(dish.benefits || []).includes(seccionesFilter.benefit)) return;
      const incompatible = optionNeedsAdaptation(dish);
      if (seccionesFilter.onlyCompat && incompatible) return;
      compatCount++;
      cards.push(renderSeccionCard(dish, section));
    });
  });

  if (countEl) countEl.innerText = `${compatCount} ${t('sec_count')}`;

  grid.innerHTML = cards.length
    ? cards.join('')
    : `<div class="col-span-full rounded-3xl bg-surface-container-low p-6 text-center text-on-surface-variant">${t('sec_no_compat')}</div>`;

  grid.onclick = (event) => {
    const addBtn = event.target.closest('[data-add-sec]');
    if (addBtn) addSeccionDishToShopping(addBtn.getAttribute('data-add-sec'));
  };
}

function addSeccionDishToShopping(dishId) {
  if (!seccionesData) return;
  let found = null;
  seccionesData.forEach(s => s.platos.forEach(d => { if (d.id === dishId) found = d; }));
  if (!found) return;
  const tr = trSeccionDish(found);
  const ingredients = (tr && tr.i) || found.ingredients;
  ingredients.forEach(line => {
    const key = line.toLowerCase();
    if (!extraShoppingItems.has(key)) extraShoppingItems.set(key, { name: line, qty: '' });
  });
  persistState();
  renderShoppingList();
  showToast(`${t('added_list_toast')}: ${tr && tr.t ? cap(tr.t) : found.title}`);
}

// Espera breve tras dejar de teclear para filtrar (búsqueda fluida sin parpadeos).
let catalogSearchTimer = null;
function catalogSearch(value) {
  clearTimeout(catalogSearchTimer);
  catalogSearchTimer = setTimeout(() => {
    catalogFilter.text = value.trim().toLowerCase();
    catalogRenderLimit = 48;
    renderCatalog();
  }, 150);
}

function setCatalogCategory(category) {
  catalogFilter.category = category;
  catalogFilter.benefit = 'all';
  catalogRenderLimit = 48;
  renderCatalog();
}

function setCatalogBenefit(benefit) {
  catalogFilter.benefit = benefit;
  catalogRenderLimit = 48;
  renderCatalog();
}

function catalogMore() {
  catalogRenderLimit += 48;
  renderCatalog();
}

// Despliega o pliega la receta completa dentro de una tarjeta.
function toggleInstr(btn, expand) {
  const card = btn.closest('.instr-wrap');
  if (!card) return;
  const short = card.querySelector('.instr-short');
  const full = card.querySelector('.instr-full');
  if (!short || !full) return;
  short.classList.toggle('hidden', expand);
  full.classList.toggle('hidden', !expand);
}

function toggleCatalogFavorite(title) {
  if (favoriteRecipes.has(title)) {
    favoriteRecipes.delete(title);
  } else {
    favoriteRecipes.add(title);
  }
  persistState();
  renderCatalog();
}

window.onload = initSystem;

// PWA: registra el Service Worker para poder instalar la app y usarla offline.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
