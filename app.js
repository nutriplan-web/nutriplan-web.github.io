const dayNames = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

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
  Smoothie: { emoji: '🍓', bg: 'linear-gradient(135deg,#c8e6c9,#81c784)' }
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

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const dayIndex = (date.getDay() + 6) % 7;
    return {
      short: dayNames[dayIndex],
      num: date.getDate(),
      long: date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
    };
  });
}

const weekDates = getCurrentWeekDates();

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
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Tomate maduro', qty: '1 unidad' }, { name: 'Aceite de oliva extra virgen', qty: '1 cucharada' }, { name: 'Ajo fresco', qty: '1 diente' }],
            'Tuesta el pan, restriega el ajo, unta el tomate rallado y rocía con aceite de oliva. Sal al gusto.'),
          createRecipe('Smoothie detox con espinaca y piña', 280, 8, 6,
            [{ name: 'Espinaca fresca', qty: '100 g' }, { name: 'Piña natural', qty: '120 g' }, { name: 'Yogur natural', qty: '150 g' }, { name: 'Jengibre fresco', qty: '5 g' }],
            'Licúa la espinaca con piña, yogur y jengibre. Sirve frío.', 'Bebida', 'Limpieza hígado'),
          createRecipe('Tortilla de patatas', 430, 16, 24,
            [{ name: 'Huevo', qty: '2 unidades' }, { name: 'Patata', qty: '150 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '2 cucharadas' }],
            'Fríe la patata con cebolla, mezcla con huevo batido y cuaja la tortilla por ambos lados.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Paella de verduras', 520, 18, 15,
            [{ name: 'Arroz', qty: '90 g' }, { name: 'Pimiento rojo', qty: '1 unidad' }, { name: 'Calabacín', qty: '100 g' }, { name: 'Alcachofa', qty: '1 unidad' }],
            'Sofríe las verduras, añade el arroz y el caldo, cocina hasta que el arroz esté tierno.'),
          createRecipe('Lentejas con chorizo', 560, 26, 22,
            [{ name: 'Lentejas', qty: '120 g' }, { name: 'Chorizo', qty: '60 g' }, { name: 'Zanahoria', qty: '1 unidad' }, { name: 'Cebolla', qty: '1 unidad' }],
            'Cuece las lentejas con la verdura y el chorizo en rodajas hasta que estén tiernas. Deja reposar.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pescado al horno con pimientos', 420, 36, 14,
            [{ name: 'Filete de pescado blanco', qty: '180 g' }, { name: 'Pimiento verde', qty: '1 unidad' }, { name: 'Limón', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Hornea el pescado con pimientos y limón a 180 °C durante 18-20 minutos.'),
          createRecipe('Pollo al ajillo con patatas', 620, 30, 25,
            [{ name: 'Muslo de pollo', qty: '180 g' }, { name: 'Patata', qty: '150 g' }, { name: 'Ajo', qty: '3 dientes' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Dora el pollo con ajo y hierbas, cocina las patatas en la misma sartén hasta que estén tiernas.', 'General', null, 'normal')
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
            [{ name: 'Avena', qty: '40 g' }, { name: 'Leche vegetal', qty: '200 ml' }, { name: 'Frutos rojos', qty: '80 g' }, { name: 'Nueces picadas', qty: '10 g' }],
            'Cocina la avena con leche vegetal y sirve con frutos rojos y nueces por encima.'),
          createRecipe('Pan con tomate y jamón serrano', 380, 20, 16,
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Jamón serrano', qty: '40 g' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Unta el tomate sobre el pan, rocía aceite y coloca el jamón serrano encima.', 'General', null, 'normal'),
          createRecipe('Café con churros', 400, 6, 18,
            [{ name: 'Churros', qty: '4 unidades' }, { name: 'Café', qty: '1 taza' }, { name: 'Azúcar', qty: '1 cucharadita' }],
            'Fríe los churros y espolvorea azúcar. Acompaña con café recién hecho.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Gazpacho andaluz', 320, 6, 18,
            [{ name: 'Tomate', qty: '2 unidades' }, { name: 'Pepino', qty: '1/2 unidad' }, { name: 'Pimiento verde', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Tritura las verduras con aceite y vinagre, refrigera y sirve bien frío.'),
          createRecipe('Cocido madrileño', 680, 34, 28,
            [{ name: 'Garbanzos', qty: '120 g' }, { name: 'Morcillo de ternera', qty: '100 g' }, { name: 'Patata', qty: '100 g' }, { name: 'Zanahoria', qty: '1 unidad' }],
            'Cuece los garbanzos con la carne y las verduras a fuego lento. Sirve el caldo y luego los sólidos.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Tortilla francesa con ensalada', 340, 18, 22,
            [{ name: 'Huevo', qty: '2 unidades' }, { name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Aceite de oliva', qty: '1 cucharadita' }],
            'Cuaja los huevos batidos en sartén y acompaña con una ensalada aliñada.'),
          createRecipe('Croquetas de jamón', 480, 16, 26,
            [{ name: 'Croquetas de jamón', qty: '6 unidades' }, { name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1 unidad' }],
            'Fríe las croquetas hasta dorarlas y sirve con ensalada fresca.', 'General', null, 'normal')
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
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Aguacate', qty: '1/2 unidad' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Limón', qty: '1 rodaja' }],
            'Tuesta el pan, machaca el aguacate con limón y sirve con el huevo poché o cocido.'),
          createRecipe('Yogur griego con miel y nueces', 300, 14, 14,
            [{ name: 'Yogur griego', qty: '150 g' }, { name: 'Miel', qty: '1 cucharadita' }, { name: 'Nueces', qty: '15 g' }],
            'Sirve el yogur con nueces troceadas y un hilo de miel.'),
          createRecipe('Magdalenas caseras con café', 360, 6, 16,
            [{ name: 'Magdalenas', qty: '2 unidades' }, { name: 'Café', qty: '1 taza' }, { name: 'Leche', qty: '50 ml' }],
            'Acompaña las magdalenas con un café con leche caliente.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ensalada de quinoa y aguacate', 420, 14, 21,
            [{ name: 'Quinoa cocida', qty: '90 g' }, { name: 'Aguacate', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Zumo de limón', qty: '1 cucharada' }],
            'Mezcla la quinoa con aguacate y tomate. Aliña con limón y sal.'),
          createRecipe('Fabada asturiana', 720, 30, 38,
            [{ name: 'Fabes', qty: '120 g' }, { name: 'Chorizo', qty: '50 g' }, { name: 'Morcilla', qty: '50 g' }, { name: 'Panceta', qty: '40 g' }],
            'Cuece las fabes con el compango a fuego lento durante horas hasta que la salsa espese.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Merluza a la plancha con verduras', 410, 34, 15,
            [{ name: 'Merluza', qty: '170 g' }, { name: 'Calabacín', qty: '80 g' }, { name: 'Pimiento', qty: '1/2 unidad' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Cocina la merluza a la plancha y acompaña con verduras salteadas.'),
          createRecipe('Pulpo a la gallega', 460, 28, 20,
            [{ name: 'Pulpo cocido', qty: '150 g' }, { name: 'Patata', qty: '120 g' }, { name: 'Pimentón', qty: '1 cucharadita' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Coloca el pulpo sobre rodajas de patata, espolvorea pimentón y rocía aceite de oliva.', 'General', null, 'normal')
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
            [{ name: 'Avena', qty: '45 g' }, { name: 'Leche de almendra', qty: '200 ml' }, { name: 'Plátano', qty: '1/2 unidad' }, { name: 'Canela', qty: '1 pizca' }],
            'Cocina la avena con leche hasta que esté cremosa. Añade plátano en rodajas y canela.'),
          createRecipe('Smoothie tropical de mango', 320, 8, 12,
            [{ name: 'Mango', qty: '120 g' }, { name: 'Plátano', qty: '1/2 unidad' }, { name: 'Leche de coco', qty: '150 ml' }, { name: 'Semillas de chía', qty: '1 cucharada' }],
            'Licúa todo hasta obtener una textura cremosa. Sirve frío.', 'Bebida', 'Energético'),
          createRecipe('Bocadillo de tortilla', 450, 18, 22,
            [{ name: 'Pan tipo baguette', qty: '1/2 unidad' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Patata', qty: '80 g' }, { name: 'Aceite de oliva', qty: '1 cucharada' }],
            'Rellena el pan con una tortilla de patata jugosa.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Pisto manchego con huevo', 440, 16, 22,
            [{ name: 'Calabacín', qty: '100 g' }, { name: 'Pimiento', qty: '1 unidad' }, { name: 'Tomate triturado', qty: '150 g' }, { name: 'Huevo', qty: '1 unidad' }],
            'Sofríe las verduras con tomate hasta espesar y corona con un huevo a la plancha.'),
          createRecipe('Arroz a la cubana', 620, 16, 24,
            [{ name: 'Arroz', qty: '100 g' }, { name: 'Huevo', qty: '2 unidades' }, { name: 'Tomate frito', qty: '100 g' }, { name: 'Plátano', qty: '1 unidad' }],
            'Sirve el arroz blanco con tomate frito, huevos fritos y plátano frito.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Crema de calabaza con jengibre', 360, 9, 12,
            [{ name: 'Calabaza', qty: '220 g' }, { name: 'Jengibre', qty: '5 g' }, { name: 'Cebolla', qty: '1/4 unidad' }, { name: 'Caldo vegetal', qty: '200 ml' }],
            'Cuece la calabaza con jengibre y cebolla. Tritura con caldo hasta obtener una crema suave.'),
          createRecipe('Sepia a la plancha con alioli', 430, 30, 20,
            [{ name: 'Sepia', qty: '180 g' }, { name: 'Ajo', qty: '1 diente' }, { name: 'Alioli', qty: '1 cucharada' }, { name: 'Perejil', qty: 'al gusto' }],
            'Marca la sepia a la plancha con ajo y perejil, sirve con un toque de alioli.', 'General', null, 'normal')
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
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Queso fresco', qty: '50 g' }, { name: 'Mermelada', qty: '1 cucharada' }],
            'Unta el queso fresco sobre el pan y añade una capa fina de mermelada.'),
          createRecipe('Bowl de yogur y granola', 340, 14, 10,
            [{ name: 'Yogur natural', qty: '150 g' }, { name: 'Granola', qty: '40 g' }, { name: 'Fruta fresca', qty: '60 g' }],
            'Sirve el yogur con granola crujiente y fruta troceada.'),
          createRecipe('Churros con chocolate', 440, 7, 20,
            [{ name: 'Churros', qty: '5 unidades' }, { name: 'Chocolate a la taza', qty: '150 ml' }],
            'Fríe los churros y sirve con chocolate caliente y espeso para mojar.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Salmón a la plancha con espárragos', 520, 34, 20,
            [{ name: 'Salmón', qty: '170 g' }, { name: 'Espárragos', qty: '80 g' }, { name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Limón', qty: '1/2 unidad' }],
            'Cocina el salmón a la plancha y sirve con espárragos y ensalada.'),
          createRecipe('Macarrones con chorizo', 640, 24, 28,
            [{ name: 'Macarrones', qty: '100 g' }, { name: 'Chorizo', qty: '60 g' }, { name: 'Tomate triturado', qty: '150 g' }, { name: 'Cebolla', qty: '1/2 unidad' }],
            'Cocina la pasta y mezcla con una salsa de tomate, cebolla y chorizo. Gratina al gusto.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Ensalada mediterránea con ventresca', 390, 28, 20,
            [{ name: 'Lechuga', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1 unidad' }, { name: 'Ventresca de atún', qty: '80 g' }, { name: 'Aceitunas', qty: '10 unidades' }],
            'Mezcla los ingredientes con aceite de oliva y vinagre. Sirve fresca.'),
          createRecipe('Albóndigas en salsa', 560, 28, 30,
            [{ name: 'Carne picada', qty: '150 g' }, { name: 'Tomate triturado', qty: '150 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Pan rallado', qty: '20 g' }],
            'Forma las albóndigas, dóralas y cocínalas en salsa de tomate y cebolla.', 'General', null, 'normal')
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
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Aguacate', qty: '1/2 unidad' }, { name: 'Tomate', qty: '1/2 unidad' }, { name: 'Limón', qty: '1 rodaja' }],
            'Machaca el aguacate con limón, extiéndelo sobre el pan y corona con tomate.'),
          createRecipe('Zumo de naranja natural', 160, 3, 1,
            [{ name: 'Naranja', qty: '3 unidades' }],
            'Exprime las naranjas y sirve el zumo recién hecho.', 'Bebida', 'Inmunidad'),
          createRecipe('Tortitas con fruta y miel', 420, 12, 14,
            [{ name: 'Harina', qty: '60 g' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Leche', qty: '120 ml' }, { name: 'Miel', qty: '1 cucharada' }],
            'Prepara la masa y cuaja las tortitas. Sirve con fruta y un hilo de miel.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ensalada templada de garbanzos', 480, 20, 16,
            [{ name: 'Garbanzos cocidos', qty: '150 g' }, { name: 'Espinacas', qty: '60 g' }, { name: 'Pimiento rojo', qty: '1/2 unidad' }, { name: 'Pimentón', qty: '1 cucharadita' }],
            'Saltea las espinacas y el pimiento, mezcla con los garbanzos y condimenta con pimentón.'),
          createRecipe('Paella de marisco', 620, 30, 18,
            [{ name: 'Arroz', qty: '100 g' }, { name: 'Gambas', qty: '80 g' }, { name: 'Mejillones', qty: '80 g' }, { name: 'Calamar', qty: '60 g' }],
            'Sofríe el marisco, añade el arroz y el caldo de pescado y cocina hasta el punto.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pimientos rellenos de bacalao', 430, 28, 14,
            [{ name: 'Pimiento rojo', qty: '1 unidad' }, { name: 'Bacalao desalado', qty: '100 g' }, { name: 'Cebolla', qty: '1/2 unidad' }, { name: 'Tomate triturado', qty: '50 g' }],
            'Rellena el pimiento con la mezcla de bacalao y cebolla. Hornea 20 minutos a 180 °C.'),
          createRecipe('Hamburguesa casera con patatas', 720, 32, 38,
            [{ name: 'Carne de ternera', qty: '150 g' }, { name: 'Pan de hamburguesa', qty: '1 unidad' }, { name: 'Patata', qty: '150 g' }, { name: 'Queso', qty: '30 g' }],
            'Haz la hamburguesa a la plancha, monta con queso y verduras y acompaña con patatas al horno.', 'General', null, 'normal')
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
            [{ name: 'Huevo', qty: '2 unidades' }, { name: 'Champiñones', qty: '80 g' }, { name: 'Cebollino', qty: 'al gusto' }, { name: 'Aceite de oliva', qty: '1 cucharadita' }],
            'Saltea los champiñones, añade los huevos batidos y remueve hasta que cuajen cremosos.'),
          createRecipe('Batido de frutos rojos', 290, 6, 4,
            [{ name: 'Frutos rojos', qty: '120 g' }, { name: 'Yogur griego', qty: '100 g' }, { name: 'Miel', qty: '1 cucharadita' }],
            'Licúa los frutos rojos con yogur y miel hasta obtener un batido cremoso.', 'Bebida', 'Antioxidante'),
          createRecipe('Tostada francesa (torrija)', 420, 12, 18,
            [{ name: 'Pan', qty: '2 rebanadas' }, { name: 'Huevo', qty: '1 unidad' }, { name: 'Leche', qty: '120 ml' }, { name: 'Canela', qty: '1 cucharadita' }],
            'Empapa el pan en leche y huevo, fríe y espolvorea azúcar y canela.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Bowl de quinoa, pollo y verduras', 520, 34, 14,
            [{ name: 'Quinoa cocida', qty: '100 g' }, { name: 'Pechuga de pollo', qty: '120 g' }, { name: 'Tomate cherry', qty: '6 unidades' }, { name: 'Aguacate', qty: '1/4 unidad' }],
            'Combina la quinoa con pollo a la plancha, tomate cherry y aguacate. Aliña al gusto.'),
          createRecipe('Cordero asado con patatas', 760, 38, 42,
            [{ name: 'Pierna de cordero', qty: '200 g' }, { name: 'Patata', qty: '180 g' }, { name: 'Ajo', qty: '3 dientes' }, { name: 'Romero', qty: 'al gusto' }],
            'Asa el cordero con patatas, ajo y romero a 180 °C hasta que esté tierno y dorado.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Crema de verduras de temporada', 300, 10, 10,
            [{ name: 'Calabacín', qty: '100 g' }, { name: 'Puerro', qty: '1 unidad' }, { name: 'Zanahoria', qty: '1 unidad' }, { name: 'Caldo vegetal', qty: '250 ml' }],
            'Cuece las verduras y tritura con caldo hasta obtener una crema suave.'),
          createRecipe('Tosta de salmón ahumado', 380, 22, 18,
            [{ name: 'Pan integral', qty: '1 rebanada' }, { name: 'Salmón ahumado', qty: '70 g' }, { name: 'Queso crema', qty: '30 g' }, { name: 'Eneldo', qty: 'al gusto' }],
            'Unta el queso crema sobre el pan, añade el salmón ahumado y decora con eneldo.')
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
            [{ name: 'Iaurt', qty: '150 g' }, { name: 'Nuci', qty: '15 g' }, { name: 'Miere', qty: '1 linguriță' }],
            'Servește iaurtul cu nuci tocate și un strop de miere.'),
          createRecipe('Omletă cu brânză și roșii', 350, 18, 22,
            [{ name: 'Ouă', qty: '2 bucăți' }, { name: 'Brânză', qty: '40 g' }, { name: 'Roșii', qty: '1 unitate' }],
            'Bate ouăle, adaugă brânza și roșiile și gătește omleta la foc mediu.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de burtă', 420, 22, 18,
            [{ name: 'Burtă de vită', qty: '150 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Smântână', qty: '1 lingură' }, { name: 'Usturoi', qty: '2 căței' }],
            'Fierbe burta cu legume, drege cu smântână și servește cu usturoi.', 'General', null, 'normal'),
          createRecipe('Sarmale cu mămăligă', 620, 26, 30,
            [{ name: 'Carne tocată', qty: '150 g' }, { name: 'Varză murată', qty: '4 foi' }, { name: 'Orez', qty: '40 g' }, { name: 'Mămăligă', qty: '150 g' }],
            'Învelește amestecul de carne și orez în foi de varză și fierbe încet. Servește cu mămăligă.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Salată de boeuf', 480, 14, 28,
            [{ name: 'Cartofi', qty: '150 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Mazăre', qty: '60 g' }, { name: 'Maioneză', qty: '2 linguri' }],
            'Fierbe legumele, taie-le cubulețe și amestecă cu maioneză. Servește rece.'),
          createRecipe('Mici cu muștar', 560, 30, 38,
            [{ name: 'Mici', qty: '4 bucăți' }, { name: 'Muștar', qty: '1 lingură' }, { name: 'Pâine', qty: '1 felie' }],
            'Frige micii pe grătar și servește cu muștar și pâine.', 'General', null, 'normal')
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
            [{ name: 'Brânză proaspătă', qty: '80 g' }, { name: 'Ridichi', qty: '3 bucăți' }, { name: 'Pâine integrală', qty: '1 felie' }],
            'Servește brânza proaspătă cu ridichi feliate și pâine integrală.'),
          createRecipe('Smoothie cu spanac și măr', 300, 8, 10,
            [{ name: 'Spanac', qty: '70 g' }, { name: 'Măr', qty: '1/2 unitate' }, { name: 'Banană', qty: '1/2 unitate' }],
            'Mixează totul până devine cremos și servește rece.', 'Bebida', 'Depurativo')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de fasole cu afumătură', 480, 22, 18,
            [{ name: 'Fasole', qty: '120 g' }, { name: 'Afumătură', qty: '60 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Ceapă', qty: '1/2 unitate' }],
            'Fierbe fasolea cu afumătura și legumele până se leagă ciorba.', 'General', null, 'normal'),
          createRecipe('Tochitură moldovenească', 700, 34, 40,
            [{ name: 'Carne de porc', qty: '160 g' }, { name: 'Cârnați', qty: '60 g' }, { name: 'Mămăligă', qty: '150 g' }, { name: 'Ou', qty: '1 unitate' }],
            'Călește carnea și cârnații în sos, servește cu mămăligă și ou ochi.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Chifteluțe de pui la cuptor', 430, 28, 15,
            [{ name: 'Pui tocat', qty: '120 g' }, { name: 'Ceapă', qty: '1/4 unitate' }, { name: 'Ou', qty: '1 unitate' }],
            'Formează chifteluțe și coace-le la cuptor până sunt rumene.'),
          createRecipe('Mâncare de praz cu măsline', 380, 10, 13,
            [{ name: 'Praz', qty: '120 g' }, { name: 'Măsline', qty: '10 g' }, { name: 'Ulei de măsline', qty: '1 lingură' }],
            'Gătește prazul în ulei și adaugă măsline la final. Servește cald.')
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
            [{ name: 'Ovăz', qty: '45 g' }, { name: 'Lapte', qty: '200 ml' }, { name: 'Fructe', qty: '70 g' }],
            'Fierbe ovăzul cu lapte și adaugă fructe proaspete la final.'),
          createRecipe('Papanași cu smântână', 520, 14, 26,
            [{ name: 'Brânză de vaci', qty: '120 g' }, { name: 'Făină', qty: '50 g' }, { name: 'Smântână', qty: '2 linguri' }, { name: 'Dulceață', qty: '1 lingură' }],
            'Prăjește papanașii și servește cu smântână și dulceață.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Iahnie de fasole', 460, 20, 12,
            [{ name: 'Fasole', qty: '120 g' }, { name: 'Ceapă', qty: '1/2 unitate' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Bulion', qty: '100 g' }],
            'Fierbe fasolea cu ceapă, morcov și bulion până se îngroașă.'),
          createRecipe('Ardei umpluți', 540, 24, 22,
            [{ name: 'Ardei', qty: '2 unități' }, { name: 'Carne tocată', qty: '120 g' }, { name: 'Orez', qty: '40 g' }, { name: 'Bulion', qty: '100 g' }],
            'Umple ardeii cu carne și orez și fierbe în sos de roșii.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Plachie de pește', 470, 30, 18,
            [{ name: 'Pește', qty: '170 g' }, { name: 'Roșii', qty: '1 unitate' }, { name: 'Ardei', qty: '1/2 unitate' }, { name: 'Ceapă', qty: '1/2 unitate' }],
            'Coace peștele cu roșii, ardei și ceapă la cuptor până devine fraged.'),
          createRecipe('Zacuscă cu pâine', 320, 6, 16,
            [{ name: 'Vinete', qty: '150 g' }, { name: 'Ardei copt', qty: '80 g' }, { name: 'Bulion', qty: '60 g' }, { name: 'Pâine', qty: '1 felie' }],
            'Întinde zacusca pe pâine. Ideală rece sau caldă.')
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
            [{ name: 'Ouă', qty: '2 bucăți' }, { name: 'Mămăligă', qty: '120 g' }, { name: 'Brânză', qty: '30 g' }],
            'Prăjește ouăle ochiuri și servește pe mămăligă caldă cu brânză.'),
          createRecipe('Clătite cu gem', 420, 10, 14,
            [{ name: 'Făină', qty: '60 g' }, { name: 'Lapte', qty: '150 ml' }, { name: 'Ou', qty: '1 unitate' }, { name: 'Gem', qty: '2 linguri' }],
            'Prepară aluatul, prăjește clătitele subțiri și umple-le cu gem.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de perișoare', 440, 22, 16,
            [{ name: 'Carne tocată', qty: '120 g' }, { name: 'Orez', qty: '30 g' }, { name: 'Legume pentru supă', qty: '100 g' }, { name: 'Borș', qty: '100 ml' }],
            'Fierbe perișoarele cu legume și acrește ciorba cu borș.'),
          createRecipe('Pilaf cu legume', 480, 12, 14,
            [{ name: 'Orez', qty: '100 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Mazăre', qty: '60 g' }, { name: 'Ardei', qty: '1/2 unitate' }],
            'Călește legumele, adaugă orezul și apa și fierbe până se absoarbe lichidul.')
        ],
        dinnerOptions: [
          createRecipe('Salată de vinete', 360, 6, 24,
            [{ name: 'Vinete', qty: '200 g' }, { name: 'Ceapă', qty: '1/4 unitate' }, { name: 'Ulei', qty: '2 linguri' }, { name: 'Pâine', qty: '1 felie' }],
            'Coace vinetele, toacă-le și amestecă cu ceapă și ulei. Servește cu pâine.'),
          createRecipe('Pui cu ciuperci', 460, 30, 20,
            [{ name: 'Piept de pui', qty: '150 g' }, { name: 'Ciuperci', qty: '100 g' }, { name: 'Smântână', qty: '1 lingură' }, { name: 'Ceapă', qty: '1/2 unitate' }],
            'Călește puiul cu ciuperci și ceapă, drege cu smântână și fierbe câteva minute.', 'General', null, 'normal')
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
            [{ name: 'Pâine integrală', qty: '2 felii' }, { name: 'Brânză', qty: '50 g' }, { name: 'Castravete', qty: '1/2 unitate' }, { name: 'Roșii', qty: '1 unitate' }],
            'Întinde brânza pe pâine și adaugă felii de legume proaspete.'),
          createRecipe('Smoothie cu banane și ovăz', 320, 10, 8,
            [{ name: 'Banană', qty: '1 unitate' }, { name: 'Ovăz', qty: '30 g' }, { name: 'Lapte', qty: '200 ml' }],
            'Mixează banana cu ovăzul și laptele până devine cremos.', 'Bebida', 'Energético')
        ],
        lunchOptions: [
          createRecipe('Ghiveci de legume', 420, 12, 14,
            [{ name: 'Cartofi', qty: '120 g' }, { name: 'Vinete', qty: '80 g' }, { name: 'Dovlecel', qty: '80 g' }, { name: 'Roșii', qty: '1 unitate' }],
            'Coace legumele asortate la cuptor cu ulei până devin fragede.'),
          createRecipe('Friptură de porc cu cartofi', 700, 34, 40,
            [{ name: 'Carne de porc', qty: '180 g' }, { name: 'Cartofi', qty: '180 g' }, { name: 'Usturoi', qty: '2 căței' }, { name: 'Cimbru', qty: 'după gust' }],
            'Frige carnea cu cartofi, usturoi și cimbru la cuptor până se rumenesc.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Supă cremă de dovleac', 320, 8, 12,
            [{ name: 'Dovleac', qty: '220 g' }, { name: 'Cartof', qty: '1 unitate' }, { name: 'Ceapă', qty: '1/4 unitate' }, { name: 'Supă de legume', qty: '200 ml' }],
            'Fierbe dovleacul cu cartof și ceapă și pasează cu supa până devine cremă.'),
          createRecipe('Salată de roșii cu brânză', 280, 10, 18,
            [{ name: 'Roșii', qty: '2 unități' }, { name: 'Brânză telemea', qty: '60 g' }, { name: 'Ceapă', qty: '1/4 unitate' }, { name: 'Ulei de măsline', qty: '1 lingură' }],
            'Taie roșiile, adaugă brânza și ceapa și stropește cu ulei de măsline.')
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
            [{ name: 'Ouă', qty: '2 bucăți' }, { name: 'Ciuperci', qty: '80 g' }, { name: 'Ceapă verde', qty: 'după gust' }],
            'Călește ciupercile, adaugă ouăle bătute și gătește omleta cremoasă.'),
          createRecipe('Iaurt cu fructe de pădure', 280, 10, 6,
            [{ name: 'Iaurt', qty: '150 g' }, { name: 'Fructe de pădure', qty: '90 g' }, { name: 'Miere', qty: '1 linguriță' }],
            'Servește iaurtul cu fructe de pădure și miere.')
        ],
        lunchOptions: [
          createRecipe('Ciorbă de legume', 360, 10, 8,
            [{ name: 'Cartof', qty: '1 unitate' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Țelină', qty: '40 g' }, { name: 'Borș', qty: '100 ml' }],
            'Fierbe legumele și acrește ciorba cu borș. Servește cu verdeață.'),
          createRecipe('Mămăligă cu brânză și smântână', 520, 18, 24,
            [{ name: 'Mălai', qty: '100 g' }, { name: 'Brânză', qty: '60 g' }, { name: 'Smântână', qty: '2 linguri' }],
            'Fierbe mămăliga și servește în straturi cu brânză și smântână.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Pește la grătar cu salată', 410, 32, 16,
            [{ name: 'Pește', qty: '170 g' }, { name: 'Salată verde', qty: '1/2 unitate' }, { name: 'Lămâie', qty: '1/2 unitate' }, { name: 'Ulei de măsline', qty: '1 lingură' }],
            'Frige peștele pe grătar și servește cu salată verde și lămâie.'),
          createRecipe('Tocăniță de ciuperci', 360, 10, 16,
            [{ name: 'Ciuperci', qty: '200 g' }, { name: 'Ceapă', qty: '1 unitate' }, { name: 'Bulion', qty: '80 g' }, { name: 'Usturoi', qty: '2 căței' }],
            'Călește ciupercile cu ceapă și bulion până scade sosul.')
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
            [{ name: 'Quinoa', qty: '50 g' }, { name: 'Lapte de migdale', qty: '180 ml' }, { name: 'Scorțișoară', qty: '1 linguriță' }, { name: 'Măr', qty: '60 g' }],
            'Fierbe quinoa cu laptele și scorțișoara, adaugă mărul ras și servește cald.'),
          createRecipe('Cozonac cu cafea', 420, 8, 16,
            [{ name: 'Cozonac', qty: '2 felii' }, { name: 'Cafea', qty: '1 cană' }, { name: 'Lapte', qty: '50 ml' }],
            'Servește feliile de cozonac alături de o cafea caldă cu lapte.', 'General', null, 'normal')
        ],
        lunchOptions: [
          createRecipe('Sarmale de post', 480, 12, 16,
            [{ name: 'Varză murată', qty: '4 foi' }, { name: 'Orez', qty: '60 g' }, { name: 'Ciuperci', qty: '60 g' }, { name: 'Morcov', qty: '1 unitate' }],
            'Umple foile de varză cu orez și ciuperci și fierbe încet până sunt fragede.'),
          createRecipe('Friptură de pui cu legume', 520, 36, 18,
            [{ name: 'Pulpă de pui', qty: '180 g' }, { name: 'Cartofi', qty: '150 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Usturoi', qty: '2 căței' }],
            'Frige puiul cu legume și usturoi la cuptor până se rumenește.', 'General', null, 'normal')
        ],
        dinnerOptions: [
          createRecipe('Salată orientală', 420, 12, 22,
            [{ name: 'Cartofi', qty: '180 g' }, { name: 'Ceapă roșie', qty: '1/2 unitate' }, { name: 'Măsline', qty: '10 g' }, { name: 'Ulei de măsline', qty: '2 linguri' }],
            'Fierbe cartofii, taie-i felii și amestecă cu ceapă, măsline și ulei.'),
          createRecipe('Supă de pui cu tăiței', 360, 24, 12,
            [{ name: 'Piept de pui', qty: '120 g' }, { name: 'Tăiței', qty: '60 g' }, { name: 'Morcov', qty: '1 unitate' }, { name: 'Țelină', qty: '40 g' }],
            'Fierbe puiul cu legume, adaugă tăițeii și servește fierbinte.')
        ],
        liquids: [
          { name: 'Compot de mere', value: 'Digestivo · Mere + Scorțișoară' },
          { name: 'Ceai de cătină', value: 'Inmunidad · Cătină + Miere' }
        ]
      }
    ]
  }
};

const dietRules = {
  vegana: [
    { find: /Pechuga de pollo|Pulpă de pui|Piept de pui|Pui tocat/gi, replace: 'Tofu ahumado' },
    { find: /Pescado|Mero|Merluza|Pește/gi, replace: 'Tofu marinado' },
    { find: /Jamón serrano|Jamón/gi, replace: 'Champiñones asados' },
    { find: /Yogur|Iaurt/gi, replace: 'Yogur vegetal' }
  ],
  vegetariana: [
    { find: /Pechuga de pollo|Pulpă de pui|Piept de pui/gi, replace: 'Hamburguesa vegetal' },
    { find: /Pescado|Mero|Merluza|Pește/gi, replace: 'Berenjena al horno' }
  ],
  keto: [
    { find: /Arroz integral|Arroz/gi, replace: 'Arroz de coliflor' },
    { find: /Pan integral|tostada|Tostada/gi, replace: 'Tortilla de espinacas' },
    { find: /Garbanzos|Lentejas/gi, replace: 'Ensalada de aguacate' }
  ],
  'baja en carbohidratos': [
    { find: /Arroz integral|Arroz/gi, replace: 'Arroz de coliflor' },
    { find: /Garbanzos|Lentejas/gi, replace: 'Ensalada de hojas verdes' },
    { find: /Pan integral|tostada|Tostada/gi, replace: 'Bowl de semillas' }
  ],
  mediterránea: []
};

const allergyRules = {
  gluten: [
    { find: /Pan integral|tostada|Tostada|Pâine integrală/gi, replace: 'Bowl de quinoa' }
  ],
  lactosa: [
    { find: /Yogur|Iaurt|Queso|brânză|Brânză/gi, replace: 'Yogur vegetal' }
  ],
  frutos: [
    { find: /Frutos secos|nueces|nuci|Nuci/gi, replace: 'Semillas de girasol' }
  ],
  marisco: [
    { find: /Pescado|Mero|Merluza|Pește/gi, replace: 'Tofu marinado' }
  ]
};

function getMealOptionsForDay(dayIndex, meal) {
  const dayData = menuData[currentOrigin].days[dayIndex];
  const options = dayData[`${meal}Options`];
  const filtered = options.filter(option => option.style === currentMenuStyle);
  return filtered.length > 0 ? filtered : options;
}

function getMealOptions(meal) {
  return getMealOptionsForDay(currentDayIndex, meal);
}

function getStyleLabel(style) {
  return style === 'normal' ? 'Normal' : 'Saludable';
}

function adaptRecipeText(text) {
  let adapted = text;
  const dietRulesSet = dietRules[currentDiet] || [];
  dietRulesSet.forEach(rule => {
    adapted = adapted.replace(rule.find, rule.replace);
  });
  Object.keys(currentIntolerances).forEach(intolerance => {
    if (currentIntolerances[intolerance]) {
      const allergyRulesSet = allergyRules[intolerance] || [];
      allergyRulesSet.forEach(rule => {
        adapted = adapted.replace(rule.find, rule.replace);
      });
    }
  });
  return adapted;
}

function getAdaptationNote() {
  const activeIntolerances = Object.keys(currentIntolerances).filter(key => currentIntolerances[key]);
  if (activeIntolerances.length === 0 && currentDiet === 'mediterránea') {
    return 'Productos de Temporada';
  }

  const labels = [];
  if (currentDiet && currentDiet !== 'mediterránea') {
    labels.push(currentDiet);
  }
  activeIntolerances.forEach(key => {
    const labelMap = {
      gluten: 'sin gluten',
      lactosa: 'sin lactosa',
      frutos: 'sin frutos secos',
      marisco: 'sin marisco'
    };
    labels.push(labelMap[key]);
  });
  return `Adaptado: ${labels.join(' · ')}`;
}

let currentOrigin = 'es';
let currentDayIndex = 0;
let currentServings = 2;
let currentMealServings = { breakfast: 2, lunch: 2, dinner: 2 };
let shoppingMode = 'daily';
let currentDiet = 'mediterránea';
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
      currentOrigin, currentDayIndex, currentServings, currentMealServings, shoppingMode,
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
  if (typeof s.currentServings === 'number') currentServings = s.currentServings;
  if (s.currentMealServings) currentMealServings = s.currentMealServings;
  if (s.shoppingMode) shoppingMode = s.shoppingMode;
  if (s.currentDiet) currentDiet = s.currentDiet;
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
}

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  applyDarkModeButton();
  persistState();
}
function applyDarkModeButton() {
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.innerText = document.documentElement.classList.contains('dark') ? 'Desactivar' : 'Activar';
}

// Contador de visitas (servicio gratuito). Cuenta una vez por navegador.
async function loadVisitCounter() {
  const el = document.getElementById('visit-counter');
  const ns = 'nutriplan-app-florrincheptine';
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
      el.innerText = data.value.toLocaleString('es-ES');
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

  if (viewId === 'catalog') openCatalog();
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
  document.getElementById('badge-origin').innerText = current.badge;
  document.getElementById('language-label').innerText = `Idioma: ${current.language}`;
  document.getElementById('season-label').innerText = `Temporada: ${current.season}`;
  document.getElementById('season-icon').innerText = current.seasonIcon;
}

function selectDay(index) {
  currentDayIndex = index;
  renderWeeks();
  loadDayDetails();
}

function getCurrentDayData() {
  return menuData[currentOrigin].days[currentDayIndex];
}

function getCurrentSelection() {
  return selectedMealIndices[currentOrigin][currentDayIndex];
}

function getSelectedOption(meal) {
  const options = getMealOptions(meal);
  const selection = getCurrentSelection();
  const selectedIndex = selection[meal] % options.length;
  return options[selectedIndex];
}

function adaptOption(option) {
  return {
    title: adaptRecipeText(option.title),
    instructions: adaptRecipeText(option.instructions),
    ingredients: option.ingredients.map(item => ({
      name: adaptRecipeText(item.name),
      qty: item.qty
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

  return `
    <div class="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container">
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-xs font-bold uppercase ${badgeClass}">${label}</p>
          <h4 class="font-headline-sm text-on-surface mt-2">${adapted.title}</h4>
          <div class="mt-1 space-y-1">
            <p class="text-label-sm text-on-surface-variant">Categoría: ${option.category}</p>
            ${option.drinkType ? `<p class="text-label-sm text-secondary font-semibold">Beneficio: ${option.drinkType}</p>` : ''}
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <button onclick="toggleFavorite('${meal}')" class="px-3 py-2 rounded-full border ${isFavorite ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-primary'} text-xs font-semibold transition-all">
            ${isFavorite ? 'Favorito ♥' : 'Favorito'}
          </button>
          <button onclick="refreshMeal('${meal}')" class="px-3 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold border border-surface-container hover:bg-surface-container-low transition-all">
            No me gusta
          </button>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-3xl h-52 mb-4 mt-4 bg-surface-container-high">
        ${dishImageHTML({ title: option.title, image: null })}
      </div>
      <div class="mt-4 text-label-md text-on-surface-variant">
        <p class="font-semibold">Ingredientes</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          ${scaledIngredients.map(i => `<li>${i.qty} ${i.name}</li>`).join('')}
        </ul>
        <p class="font-semibold mt-4">Modo de cocinar</p>
        <p class="mt-2 text-body-md text-on-surface">${adapted.instructions}</p>
      </div>
      <div class="mt-4 text-label-md text-on-surface-variant">
        ${mealServings === 0 ? 'Esta comida está saltada.' : `Nutrición por receta: ${option.nutrition.calories} kcal · ${option.nutrition.protein}g proteína · ${option.nutrition.fats}g grasa`}
        <p class="text-xs text-on-surface-variant mt-1">Cantidades ajustadas según porciones.</p>
      </div>
      <div class="mt-2 text-label-sm text-on-surface-variant">Estilo: ${getStyleLabel(option.style)}</div>
      <div class="mt-4 flex items-center justify-between gap-3">
        <span class="text-label-md text-on-surface-variant">Porciones</span>
        <div class="inline-flex items-center rounded-full bg-surface-container-high border border-surface-container overflow-hidden">
          <button onclick="adjustMealServings('${meal}', -1)" class="px-3 py-2 text-primary hover:bg-surface-container-low transition-colors">-</button>
          <span class="px-4 py-2 text-on-surface">${mealServings}</span>
          <button onclick="adjustMealServings('${meal}', 1)" class="px-3 py-2 text-primary hover:bg-surface-container-low transition-colors">+</button>
        </div>
      </div>
      ${otherOptions.length > 0 ? `
        <div class="mt-4 p-3 rounded-3xl bg-surface-container-low">
          <p class="font-semibold text-on-surface">Otras opciones</p>
          <div class="mt-3 grid gap-2">
            ${otherOptions.map(other => `
              <button onclick="selectRecipeOption('${meal}', ${options.indexOf(other)})" class="w-full text-left p-3 rounded-2xl bg-white border border-surface-container hover:border-primary transition-all text-sm">
                ${adaptRecipeText(other.title)}
              </button>
            `).join('')}
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
    menuStyleNoteEl.innerText = `Menú actual: ${menuStyleLabel}`;
  }
  document.getElementById('day-calories').innerText = `${totals.calories} kcal`;
  document.getElementById('day-score').innerText = score;
  document.getElementById('day-protein').innerText = `${totals.protein}g`;
  document.getElementById('day-fats').innerText = `${totals.fats}g`;
  document.getElementById('servings-display').innerText = currentServings;

  const liquidsContainer = document.getElementById('liquids-container');
  liquidsContainer.innerHTML = getCurrentDayData().liquids.map(liquid => `
    <div class="rounded-3xl bg-surface-container-low p-4">
      <p class="font-label-md text-label-md text-on-surface-variant">${liquid.name}</p>
      <p class="font-body-md text-body-md text-on-surface mt-1">${liquid.value}</p>
    </div>
  `).join('');

  const recipesContainer = document.getElementById('recipes-list-container');
  recipesContainer.innerHTML = `
    ${renderMealCard('breakfast', 'Desayuno', 'text-primary')}
    ${renderMealCard('lunch', 'Almuerzo', 'text-secondary')}
    ${renderMealCard('dinner', 'Cena', 'text-tertiary')}
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
  currentDiet = type;
  renderDietSelection();
  loadDayDetails();
}

function renderDietSelection() {
  const diets = ['vegana', 'vegetariana', 'keto', 'mediterránea', 'baja en carbohidratos'];
  diets.forEach(diet => {
    const normalizedSlug = diet
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    const button = document.getElementById(`diet-${normalizedSlug}`);
    if (button) {
      if (diet === currentDiet) {
        button.classList.add('active-diet');
      } else {
        button.classList.remove('active-diet');
      }
    }
  });
  document.getElementById('diet-summary').innerText = `Dieta activa: ${currentDiet}`;
}

function setMenuStyle(style) {
  currentMenuStyle = style;
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
    summary.innerText = `Menú activo: ${getStyleLabel(currentMenuStyle)}`;
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
    const dailySelection = selectedMealIndices[currentOrigin][dayIndex];
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
  const lines = ['🛒 Lista de la compra · NutriPlan', ''];
  const foods = collectShoppingFoods();
  if (foods.size) {
    lines.push('— Del menú —');
    foods.forEach(item => lines.push(`• ${item.name}: ${item.qty}`));
    lines.push('');
  }
  if (extraShoppingItems.size) {
    lines.push('— Añadido por ti —');
    extraShoppingItems.forEach(item => lines.push(`• ${item.name}${item.qty ? ': ' + item.qty : ''}`));
  }
  return lines.join('\n').trim();
}

function copyShoppingList() {
  const text = buildShoppingText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('Lista copiada al portapapeles')).catch(() => showToast('No se pudo copiar'));
  } else {
    showToast('Tu navegador no permite copiar');
  }
}

function shareShoppingWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(buildShoppingText()), '_blank');
}

function renderShoppingList() {
  persistState();
  const container = document.getElementById('shopping-list-sections');
  const foods = collectShoppingFoods();
  const modeLabel = shoppingMode === 'weekly' ? 'semana' : 'día';
  document.getElementById('shopping-mode-daily')?.classList.toggle('active-shopping', shoppingMode === 'daily');
  document.getElementById('shopping-mode-weekly')?.classList.toggle('active-shopping', shoppingMode === 'weekly');

  const sections = [];

  if (foods.size > 0) {
    sections.push(`
      <section class="space-y-3">
        <div class="flex items-center gap-2 text-primary">
          <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">inventory_2</span>
          <h3 class="font-label-lg text-label-lg tracking-wider">Ingredientes del menú</h3>
        </div>
        <div class="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
          ${Array.from(foods.values()).map(item => `
            <div class="checklist-item flex items-center gap-4 p-4 transition-colors hover:bg-surface-container border-b last:border-b-0 border-surface-container">
              <input type="checkbox" class="w-6 h-6 rounded-full border-2 border-outline text-primary focus:ring-primary-container cursor-pointer" />
              <div class="flex-1">
                <p class="item-text font-body-md text-on-surface">${item.name}</p>
                <p class="text-label-md text-on-surface-variant">${item.qty} · para ${modeLabel}</p>
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
            <h3 class="font-label-lg text-label-lg tracking-wider">Añadido por ti</h3>
          </div>
          <button data-clear-extras="1" class="text-label-md text-secondary font-semibold px-3 py-1 rounded-full hover:bg-surface-container-high transition-all">Vaciar</button>
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
        Lista de la compra adaptada: selecciona un menú o añade recetas desde la pestaña Recetas.
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

// Catálogo local de platos famosos del mundo, organizado por país y categoría.
// (Las fotos se resuelven desde menu_images.json, generado una vez con build_menu_images.py.)
const worldRaw = {
  'Japón': { 'Pescado y marisco': ['Sushi', 'Sashimi', 'Tempura'], 'Sopas': ['Ramen', 'Udon', 'Sopa de miso'], 'Carne': ['Yakitori', 'Tonkatsu', 'Sukiyaki', 'Katsudon'], 'Aperitivos': ['Gyoza', 'Okonomiyaki', 'Takoyaki', 'Onigiri'], 'Postres': ['Mochi', 'Dorayaki'] },
  'China': { 'Aperitivos': ['Dim sum', 'Rollito de primavera', 'Baozi', 'Jiaozi', 'Wonton'], 'Carne': ['Pato laqueado de Pekín', 'Cerdo agridulce', 'Char siu', 'Pollo Kung Pao'], 'Arroz': ['Arroz frito', 'Chop suey'], 'Vegetariano': ['Mapo tofu'], 'Sopas': ['Hot pot'] },
  'Tailandia': { 'Arroz': ['Pad thai', 'Khao pad'], 'Sopas': ['Tom yum'], 'Carne': ['Curry verde tailandés', 'Curry rojo tailandés', 'Massaman', 'Pad krapow'], 'Ensaladas': ['Som tam'], 'Aperitivos': ['Satay'], 'Postres': ['Arroz con mango'] },
  'Vietnam': { 'Sopas': ['Pho'], 'Aperitivos': ['Banh mi', 'Rollitos vietnamitas'], 'Carne': ['Bun cha', 'Com tam'] },
  'India': { 'Carne': ['Pollo tikka masala', 'Tandoori', 'Korma', 'Vindaloo', 'Rogan josh', 'Pollo a la mantequilla'], 'Arroz': ['Biryani'], 'Vegetariano': ['Dal', 'Chana masala', 'Paneer tikka'], 'Aperitivos': ['Samosa', 'Dosa'], 'Panadería': ['Naan', 'Chapati'] },
  'Corea del Sur': { 'Arroz': ['Bibimbap'], 'Vegetariano': ['Kimchi', 'Japchae'], 'Carne': ['Bulgogi', 'Samgyeopsal'], 'Aperitivos': ['Tteokbokki'], 'Sopas': ['Kimchi jjigae', 'Sundubu jjigae'] },
  'México': { 'Aperitivos': ['Tacos', 'Tacos al pastor', 'Quesadilla', 'Nachos', 'Tamales', 'Elote'], 'Carne': ['Mole poblano', 'Chiles en nogada', 'Cochinita pibil', 'Fajitas'], 'Sopas': ['Pozole'], 'Vegetariano': ['Guacamole', 'Chilaquiles'], 'Arroz': ['Burrito'] },
  'Italia': { 'Pasta': ['Spaghetti carbonara', 'Lasaña', 'Ravioli', 'Gnocchi', 'Tagliatelle al ragú', 'Pesto'], 'Panadería': ['Pizza margarita', 'Focaccia', 'Bruschetta'], 'Arroz': ['Risotto', 'Polenta'], 'Carne': ['Osso buco', 'Saltimbocca'], 'Postres': ['Tiramisú', 'Panna cotta', 'Cannoli', 'Gelato'], 'Ensaladas': ['Ensalada caprese'] },
  'Francia': { 'Panadería': ['Croissant', 'Baguette'], 'Vegetariano': ['Ratatouille'], 'Carne': ['Coq au vin', 'Cassoulet', 'Pot-au-feu', 'Boeuf bourguignon'], 'Pescado y marisco': ['Bullabesa', 'Escargots'], 'Aperitivos': ['Quiche lorraine', 'Crepe', 'Foie gras'], 'Postres': ['Crème brûlée', 'Macaron', 'Tarta Tatin', 'Soufflé', 'Profiterol'] },
  'España': { 'Arroz': ['Paella', 'Arroz negro'], 'Aperitivos': ['Tortilla de patatas', 'Croquetas', 'Patatas bravas', 'Pan con tomate', 'Calçots', 'Pinchos'], 'Sopas': ['Gazpacho', 'Salmorejo'], 'Carne': ['Jamón ibérico', 'Cochinillo asado'], 'Pescado y marisco': ['Pulpo a la gallega', 'Gambas al ajillo'], 'Postres': ['Churros', 'Crema catalana', 'Flan'] },
  'Grecia': { 'Carne': ['Musaca', 'Souvlaki', 'Gyros', 'Pastitsio'], 'Aperitivos': ['Tzatziki', 'Spanakopita', 'Dolma'], 'Ensaladas': ['Ensalada griega'], 'Postres': ['Baklava'] },
  'Turquía': { 'Carne': ['Kebab', 'Döner kebab', 'Köfte', 'Adana kebab'], 'Arroz': ['Pilav'], 'Aperitivos': ['Lahmacun', 'Börek', 'Meze', 'Dolma'], 'Panadería': ['Simit'], 'Postres': ['Baklava turco', 'Lokum'] },
  'Líbano': { 'Vegetariano': ['Hummus', 'Falafel', 'Baba ganoush'], 'Ensaladas': ['Tabulé', 'Fattoush'], 'Carne': ['Shawarma', 'Kibbeh'], 'Panadería': ['Manakish'] },
  'Marruecos': { 'Carne': ['Tayín', 'Mechoui'], 'Arroz': ['Cuscús'], 'Sopas': ['Harira'], 'Aperitivos': ['Pastela'] },
  'Estados Unidos': { 'Carne': ['Hamburguesa', 'Barbacoa', 'Alitas Buffalo', 'Cerdo desmechado'], 'Aperitivos': ['Perrito caliente', 'Macarrones con queso', 'Cornbread'], 'Sopas': ['Clam chowder', 'Jambalaya'], 'Postres': ['Tarta de queso', 'Brownie', 'Tortitas americanas'] },
  'Reino Unido': { 'Pescado y marisco': ['Fish and chips'], 'Carne': ['Rosbif', 'Pastel de carne', 'Cottage pie', 'Beef Wellington', 'Salchichas con puré'], 'Panadería': ['Scones', 'Cornish pasty'], 'Postres': ['Trifle', 'Pudin de toffee'] },
  'Alemania': { 'Carne': ['Bratwurst', 'Schnitzel', 'Currywurst', 'Sauerbraten'], 'Vegetariano': ['Chucrut'], 'Pasta': ['Spätzle'], 'Panadería': ['Pretzel'], 'Postres': ['Strudel de manzana', 'Selva Negra'] },
  'Argentina': { 'Carne': ['Asado', 'Milanesa', 'Choripán'], 'Aperitivos': ['Empanadas', 'Provoleta'], 'Sopas': ['Locro'], 'Postres': ['Alfajor', 'Dulce de leche'] },
  'Brasil': { 'Carne': ['Feijoada', 'Picanha'], 'Aperitivos': ['Pão de queijo', 'Coxinha'], 'Pescado y marisco': ['Moqueca'], 'Postres': ['Brigadeiro'], 'Vegetariano': ['Acarajé'] },
  'Perú': { 'Pescado y marisco': ['Ceviche'], 'Carne': ['Lomo saltado', 'Anticucho', 'Ají de gallina'], 'Vegetariano': ['Causa limeña', 'Papa a la huancaína'] },
  'Colombia': { 'Carne': ['Bandeja paisa'], 'Aperitivos': ['Arepa', 'Empanada colombiana'], 'Sopas': ['Ajiaco'] },
  'Venezuela': { 'Aperitivos': ['Arepa venezolana', 'Tequeños', 'Hallaca'], 'Carne': ['Pabellón criollo'] },
  'Rusia': { 'Sopas': ['Borscht'], 'Carne': ['Ternera Stróganoff', 'Pelmeni'], 'Aperitivos': ['Blini', 'Pirozhki'] },
  'Polonia': { 'Aperitivos': ['Pierogi'], 'Carne': ['Bigos', 'Kielbasa'], 'Sopas': ['Zurek'] },
  'Hungría': { 'Sopas': ['Gulash'], 'Carne': ['Pörkölt'], 'Postres': ['Chimenea húngara'] },
  'Indonesia': { 'Arroz': ['Nasi goreng', 'Nasi lemak'], 'Carne': ['Rendang', 'Satay de pollo'], 'Pasta': ['Mie goreng'], 'Sopas': ['Laksa'] },
  'Filipinas': { 'Carne': ['Adobo filipino', 'Lechón'], 'Aperitivos': ['Lumpia', 'Pancit'], 'Sopas': ['Sinigang'] },
  'Etiopía': { 'Panadería': ['Injera'], 'Carne': ['Doro wat'] },
  'Nigeria': { 'Arroz': ['Jollof rice'], 'Carne': ['Suya'] },
  'Egipto': { 'Vegetariano': ['Koshari', 'Ful medames'], 'Sopas': ['Molokhia'] },
  'Portugal': { 'Pescado y marisco': ['Bacalao a Brás', 'Caldeirada', 'Sardinas asadas'], 'Carne': ['Francesinha', 'Cozido a portuguesa'], 'Postres': ['Pastel de nata'], 'Sopas': ['Caldo verde'] },
  'Países Bajos': { 'Aperitivos': ['Bitterballen', 'Stroopwafel'], 'Pescado y marisco': ['Arenque holandés'], 'Carne': ['Stamppot'] },
  'Suecia': { 'Carne': ['Albóndigas suecas'], 'Pescado y marisco': ['Gravlax'], 'Postres': ['Kanelbullar'] },
  'Suiza': { 'Vegetariano': ['Fondue de queso', 'Raclette'], 'Carne': ['Rösti'] },
  'Austria': { 'Carne': ['Wiener Schnitzel'], 'Postres': ['Tarta Sacher', 'Apfelstrudel'] },
  'Bélgica': { 'Aperitivos': ['Patatas fritas belgas', 'Gofre de Lieja'], 'Pescado y marisco': ['Mejillones con patatas'] },
  'Irlanda': { 'Carne': ['Estofado irlandés'], 'Vegetariano': ['Colcannon'], 'Panadería': ['Pan de soda'] },
  'Cuba': { 'Carne': ['Ropa vieja', 'Lechón asado'], 'Arroz': ['Arroz congrí'], 'Aperitivos': ['Sandwich cubano'] },
  'Chile': { 'Aperitivos': ['Empanada de pino', 'Completo'], 'Carne': ['Pastel de choclo'], 'Ensaladas': ['Ensalada chilena'] },
  'Ecuador': { 'Sopas': ['Encebollado', 'Locro de papa'], 'Pescado y marisco': ['Ceviche de camarón'] },
  'Bolivia': { 'Aperitivos': ['Salteñas'], 'Carne': ['Silpancho'] },
  'Jamaica': { 'Carne': ['Pollo jerk'], 'Arroz': ['Rice and peas'] },
  'Irán': { 'Arroz': ['Chelo kabab'], 'Carne': ['Ghormeh sabzi'], 'Sopas': ['Ash reshteh'] },
  'Israel': { 'Vegetariano': ['Falafel israelí', 'Sabich'], 'Ensaladas': ['Ensalada israelí'], 'Aperitivos': ['Bourekas'] },
  'Pakistán': { 'Arroz': ['Biryani pakistaní'], 'Carne': ['Nihari', 'Haleem'] },
  'Indonesia 2': { 'Aperitivos': ['Gado-gado', 'Bakso'], 'Carne': ['Sate ayam'] },
  'Malasia': { 'Arroz': ['Nasi kandar'], 'Sopas': ['Laksa de Penang'], 'Carne': ['Rendang de ternera'] },
  'Singapur': { 'Pollo': ['Arroz con pollo hainanés'], 'Pescado y marisco': ['Cangrejo con chile'] },
  'Australia': { 'Carne': ['Meat pie australiano'], 'Postres': ['Pavlova', 'Lamington'] },
  'Canadá': { 'Aperitivos': ['Poutine'], 'Postres': ['Tarta de azúcar', 'Beaver tail'] },
  'Sudáfrica': { 'Carne': ['Bobotie', 'Boerewors'], 'Aperitivos': ['Bunny chow'] },
  'Vietnam 2': { 'Aperitivos': ['Banh xeo'], 'Sopas': ['Bun bo Hue'] },
  'India 2': { 'Vegetariano': ['Aloo gobi', 'Palak paneer', 'Pakora'], 'Postres': ['Gulab jamun', 'Kheer'], 'Aperitivos': ['Pani puri'] },
  'China 2': { 'Aperitivos': ['Mantou', 'Xiaolongbao'], 'Carne': ['Cerdo Dongpo', 'Ternera con brócoli'], 'Sopas': ['Sopa agripicante'] },
  'México 2': { 'Sopas': ['Sopa de tortilla', 'Menudo'], 'Aperitivos': ['Sopes', 'Tostadas', 'Flautas'], 'Postres': ['Tres leches', 'Churros mexicanos'] },
  'Internacional': { 'Desayuno': ['Shakshuka', 'Huevos benedictinos', 'Granola', 'Bagel', 'Desayuno inglés completo', 'Tortitas con sirope', 'Açaí bowl', 'Avena nocturna'], 'Postres': ['Helado', 'Gofre', 'Donut', 'Tarta de manzana', 'Mousse de chocolate', 'Cheesecake de frutos rojos', 'Crepe de chocolate'], 'Bebidas': ['Smoothie de frutas', 'Limonada', 'Batido de chocolate', 'Té chai', 'Café con leche', 'Horchata'] }
};

const worldDishes = [];
Object.keys(worldRaw).forEach(area => {
  Object.keys(worldRaw[area]).forEach(category => {
    worldRaw[area][category].forEach(title => {
      worldDishes.push({ title, category, area, image: null, ingredients: [], instructions: '', style: 'normal', source: 'world' });
    });
  });
});

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
          if (option.category === 'Bebida') category = 'Bebidas';
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
  { title: 'Zumo verde detox', type: 'Zumo', benefits: ['Detox', 'Digestión'],
    benefitsText: 'Apio, pepino y manzana aportan agua, fibra y minerales que ayudan a depurar.',
    ingredients: ['2 ramas de apio', '1/2 pepino', '1 manzana verde', '1 puñado de espinacas', 'zumo de 1/2 limón', '200 ml de agua fría'],
    instructions: 'Lava todo, trocea y licúa o tritura con el agua. Cuela si lo prefieres más fino y bebe en el momento.' },
  { title: 'Zumo de zanahoria, naranja y jengibre', type: 'Zumo', benefits: ['Vista', 'Inmunidad'],
    benefitsText: 'El betacaroteno de la zanahoria cuida la vista y la piel; el jengibre es antiinflamatorio.',
    ingredients: ['3 zanahorias', '2 naranjas', '1 trozo (2 cm) de jengibre fresco'],
    instructions: 'Licúa las zanahorias con el jengibre pelado y mezcla con el zumo de las naranjas. Remueve y sirve frío.' },
  { title: 'Zumo de remolacha y manzana', type: 'Zumo', benefits: ['Deporte', 'Corazón'],
    benefitsText: 'Los nitratos naturales de la remolacha favorecen la circulación y el rendimiento deportivo.',
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
  { title: 'Zumo de pomelo y naranja', type: 'Zumo', benefits: ['Detox', 'Inmunidad'],
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

// Recetas cuyos ingredientes son líneas de texto en español (recetario y zumos).
function hasPlainIngredients(recipe) {
  return recipe.source === 'db' || recipe.source === 'juice';
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
    showToast('Esta receta no tiene cantidades detalladas');
    return;
  }
  const factor = catalogServings / catalogBaseServings(recipe);
  let lines;
  if (hasPlainIngredients(recipe)) {
    lines = ingredientLinesES(recipe).map(line => scaleLine(line, factor));
  } else {
    lines = scaleIngredients(recipe.ingredients, factor).map(i => `${i.qty} ${i.name}`.trim());
  }
  lines.forEach(line => {
    const key = line.toLowerCase();
    if (!extraShoppingItems.has(key)) extraShoppingItems.set(key, { name: line, qty: '' });
  });
  persistState();
  renderShoppingList();
  showToast(`Añadido a la lista (${catalogServings} comensales): ${title}`);
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
  showToast(`Añadido: ${value}`);
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

  // Recetario empaquetado con la app (666 recetas ya traducidas al español).
  // Es un fichero local cacheado por el Service Worker: carga instantánea,
  // sin depender de APIs externas ni de traducción en vivo.
  // El traductor deja los títulos con mayúscula en cada palabra; en español
  // los conectores van en minúscula ("Arroz Frito Con Pollo" -> "... con Pollo").
  const fixTitleES = (t) => t.replace(/ (De|Del|La|Las|El|Los|Lo|En|Con|Y|E|O|U|A|Al|Para|Por|Su|Sus|Un|Una)(?= )/g, (s) => s.toLowerCase());
  let dbMeals = [];
  try {
    const res = await fetch('recipes.json');
    if (res.ok) {
      dbMeals = (await res.json()).map(r => ({
        title: fixTitleES(r.title || ''),
        titleEN: r.titleEN || '',
        category: r.category || 'Varios',
        area: r.area || 'Internacional',
        image: r.image || null,
        ingredients: r.ingredients || [],
        instructions: r.instructions || '',
        style: 'normal',
        source: 'db'
      }));
    }
  } catch (e) { /* sin fichero: seguimos con el catálogo local */ }

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
  await ensureCatalogData();
  renderCatalog();
}

function catalogCategories() {
  const counts = {};
  catalogData.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

function normalizeText(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
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
  pimiento: 'pepper', chile: 'chilli', vino: 'wine'
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
  const title = escapeHtml(recipe.title);
  const area = escapeHtml(recipe.source === 'juice' ? recipe.type : (recipe.area || 'Internacional'));
  const category = escapeHtml(recipe.category);
  const base = catalogBaseServings(recipe);
  const factor = catalogServings / base;
  const hasIngredients = recipe.ingredients.length > 0;
  let ingredientsHTML;
  if (!hasIngredients) {
    ingredientsHTML = `<p class="mt-1">Plato típico de ${area}.</p>`;
  } else if (hasPlainIngredients(recipe)) {
    // Ingredientes ya en español (recetario o zumos); solo se escalan.
    const lines = ingredientLinesES(recipe).map(line => scaleLine(line, factor));
    ingredientsHTML = `<ul class="list-disc list-inside mt-1 space-y-1">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`;
  } else {
    const scaled = scaleIngredients(recipe.ingredients, factor);
    ingredientsHTML = `<ul class="list-disc list-inside mt-1 space-y-1">${scaled.slice(0, 14).map(i => `<li>${escapeHtml(`${i.qty} ${i.name}`.trim())}</li>`).join('')}</ul>`;
  }
  let instructions = recipe.instructions || `Receta tradicional de ${recipe.area || 'la cocina internacional'}.`;
  if (instructions.length > 320) instructions = `${instructions.slice(0, 320).trim()}…`;
  const titleEl = `<h4 class="font-headline-sm text-on-surface">${title}</h4>`;
  const instrEl = `<p class="mt-1 text-body-md text-on-surface">${escapeHtml(instructions)}</p>`;
  // Zumos y batidos: beneficios destacados con su explicación.
  const benefitsEl = recipe.benefits ? `
        <div class="text-label-md">
          <div class="flex flex-wrap gap-1.5">
            ${recipe.benefits.map(b => `<span class="bg-primary-fixed text-on-primary-fixed text-xs font-semibold px-2 py-1 rounded-full">✦ ${escapeHtml(b)}</span>`).join('')}
          </div>
          <p class="mt-2 text-on-surface-variant">${escapeHtml(recipe.benefitsText || '')}</p>
        </div>` : '';
  const servingsLabel = recipe.source === 'juice' ? 'vasos' : 'comensales';

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
          <p class="font-semibold text-on-surface">Ingredientes <span class="text-primary">· ${catalogServings} ${servingsLabel}</span></p>
          ${ingredientsHTML}
        </div>
        <div class="text-label-md text-on-surface-variant">
          <p class="font-semibold text-on-surface">${recipe.source === 'juice' ? 'Preparación' : 'Modo de cocinar'}</p>
          ${instrEl}
        </div>
        <button data-add="${title}" class="mt-auto w-full flex items-center justify-center gap-2 ${hasIngredients ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'} font-semibold py-3 rounded-2xl active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined" style="font-size:20px;">add_shopping_cart</span>
          Añadir a la lista
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
        <p class="mt-3">Cargando recetas de todo el mundo…</p>
      </div>
    `;
    return;
  }

  if (chipsContainer) {
    const chips = [{ id: 'all', label: 'Todos' }]
      .concat(catalogCategories().map(c => ({ id: c, label: c === JUICE_CATEGORY ? '🥤 ' + c : c })))
      .concat([{ id: 'fav', label: 'Favoritos ♥' }]);
    let html = chips.map(chip => `
      <button onclick="setCatalogCategory('${chip.id.replace(/'/g, "\\'")}')" class="px-4 py-2 rounded-full font-label-lg text-label-lg whitespace-nowrap border border-surface-container transition-all ${catalogFilter.category === chip.id ? 'active-catalog' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'}">${escapeHtml(chip.label)}</button>
    `).join('');
    // Dentro de Zumos y batidos: segunda fila de chips para filtrar por beneficio.
    if (catalogFilter.category === JUICE_CATEGORY) {
      const benefits = Array.from(new Set(juiceData.flatMap(j => j.benefits))).sort((a, b) => a.localeCompare(b, 'es'));
      html += `<div class="w-full flex gap-2 overflow-x-auto pt-2">` +
        [{ id: 'all', label: 'Todos los beneficios' }].concat(benefits.map(b => ({ id: b, label: b })))
          .map(chip => `
            <button onclick="setCatalogBenefit('${chip.id.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-full text-label-md whitespace-nowrap border transition-all ${catalogFilter.benefit === chip.id ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-variant'}">${escapeHtml(chip.label)}</button>
          `).join('') + `</div>`;
    }
    chipsContainer.innerHTML = html;
  }

  const filtered = getFilteredCatalog();
  if (countEl) countEl.innerText = `${filtered.length} platos`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full rounded-3xl bg-surface-container-low p-6 text-center text-on-surface-variant">
        No hay platos que coincidan con tu búsqueda.
      </div>
    `;
    return;
  }

  const visible = filtered.slice(0, catalogRenderLimit);
  const moreCount = filtered.length - visible.length;
  grid.innerHTML = visible.map(renderCatalogCard).join('')
    + (moreCount > 0
      ? `<div class="col-span-full flex justify-center pt-2"><button onclick="catalogMore()" class="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold shadow-sm active:scale-95 transition-all">Ver más platos (${moreCount})</button></div>`
      : '');

  grid.onclick = (event) => {
    const favBtn = event.target.closest('[data-fav]');
    if (favBtn) { toggleCatalogFavorite(favBtn.getAttribute('data-fav')); return; }
    const addBtn = event.target.closest('[data-add]');
    if (addBtn) { addRecipeToShopping(addBtn.getAttribute('data-add')); }
  };

  hydrateLazyImages(grid);
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
