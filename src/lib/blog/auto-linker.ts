import { APPROVED_CITIES } from '../seo/city-data';

// Map of common plant names to their slugs
const PRODUCT_LINKS: Record<string, string> = {
  'snake plant': '/shop/indoor/snake-plant',
  'monstera': '/shop/indoor/monstera-deliciosa',
  'pothos': '/shop/indoor/golden-pothos',
  'zz plant': '/shop/indoor/zz-plant',
  'peace lily': '/shop/indoor/peace-lily',
  'spider plant': '/shop/indoor/spider-plant',
  'aloe vera': '/shop/succulents/aloe-vera',
  'rubber plant': '/shop/indoor/rubber-plant',
  'jade plant': '/shop/succulents/jade-plant',
  'money plant': '/shop/indoor/golden-pothos',
  'areca palm': '/shop/indoor/areca-palm',
};

/**
 * Parses markdown/HTML content and automatically injects SEO-friendly internal links
 * for known products and active delivery cities.
 */
export function autoLinkContent(content: string): string {
  let linkedContent = content;

  // 1. Link Products
  for (const [plantName, url] of Object.entries(PRODUCT_LINKS)) {
    // Regex matches the plant name, case insensitive, only if it's not already inside a link or tag
    // This is a basic implementation; in a full app you'd parse the AST, but regex works for simple HTML
    const regex = new RegExp(`(?<!<a[^>]*>)(?<!<[^>]*)\\b(${plantName})\\b(?![^<]*</a>)(?![^<]*>)`, 'gi');
    
    // Only link the first occurrence to avoid over-optimizing
    let matchCount = 0;
    linkedContent = linkedContent.replace(regex, (match) => {
      if (matchCount === 0) {
        matchCount++;
        return `<a href="${url}" class="text-primary hover:underline font-medium">${match}</a>`;
      }
      return match;
    });
  }

  // 2. Link City Hubs (e.g. "plants in Bengaluru")
  for (const city of APPROVED_CITIES) {
    const cityName = city.cityName;
    const url = `/plants/${city.slug}`;
    
    const regex = new RegExp(`(?<!<a[^>]*>)(?<!<[^>]*)\\b(plants in ${cityName}|buy plants in ${cityName}|${cityName})\\b(?![^<]*</a>)(?![^<]*>)`, 'g');
    
    let matchCount = 0;
    linkedContent = linkedContent.replace(regex, (match) => {
      // Only link first occurrence
      if (matchCount === 0 && match.toLowerCase() !== cityName.toLowerCase()) {
        matchCount++;
        return `<a href="${url}" class="text-primary hover:underline font-medium">${match}</a>`;
      }
      return match; // If it's just the standalone city name, we might skip linking unless it says "plants in..."
    });
  }

  return linkedContent;
}
