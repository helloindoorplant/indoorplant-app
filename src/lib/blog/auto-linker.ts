import { APPROVED_CITIES } from '../seo/city-data';

// Map of plant keywords → real canonical product URLs
const PRODUCT_LINKS: Record<string, string> = {
  'monstera':    '/product/monstera-broken-heart',
  'pothos':      '/product/golden-money-plant',
  'jade plant':  '/product/lucky-jade-plant',
  'money plant': '/product/golden-money-plant',
  'areca palm':  '/product/bamboo-palm-plant',
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
