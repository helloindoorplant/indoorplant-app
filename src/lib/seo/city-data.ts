/**
 * city-data.ts
 * Single source of truth for all SEO location targets.
 * Adding a city here + seeding the DB triggers all city-hub pages, sitemaps,
 * and internal linking automatically.
 */

export interface CityConfig {
  slug: string;
  cityName: string;
  state: string;
  stateSlug: string;
  nearbyCities: string[];
  batch: 1 | 2;
}

export interface StateConfig {
  slug: string;
  stateName: string;
  citySlugs: string[];
}

export const APPROVED_CITIES: CityConfig[] = [
  { slug: 'bengaluru',  cityName: 'Bengaluru',  state: 'Karnataka',       stateSlug: 'karnataka',     nearbyCities: ['mumbai','pune','chennai','delhi'],          batch: 1 },
  { slug: 'delhi',      cityName: 'Delhi',      state: 'Delhi (NCT)',      stateSlug: 'delhi',         nearbyCities: ['mumbai','bengaluru','pune','chennai'],     batch: 1 },
  { slug: 'mumbai',     cityName: 'Mumbai',     state: 'Maharashtra',      stateSlug: 'maharashtra',   nearbyCities: ['pune','bengaluru','delhi','chennai'],       batch: 1 },
  { slug: 'pune',       cityName: 'Pune',       state: 'Maharashtra',      stateSlug: 'maharashtra',   nearbyCities: ['mumbai','bengaluru','delhi','chennai'],   batch: 1 },
  { slug: 'chennai',    cityName: 'Chennai',    state: 'Tamil Nadu',       stateSlug: 'tamil-nadu',    nearbyCities: ['bengaluru','pune','mumbai','delhi'],      batch: 1 },
  
  // Tier 2
  { slug: 'hyderabad',  cityName: 'Hyderabad',  state: 'Telangana',        stateSlug: 'telangana',     nearbyCities: ['bengaluru','pune','chennai'],             batch: 2 },
  { slug: 'ahmedabad',  cityName: 'Ahmedabad',  state: 'Gujarat',          stateSlug: 'gujarat',       nearbyCities: ['mumbai','pune','jaipur'],                 batch: 2 },
  { slug: 'kolkata',    cityName: 'Kolkata',    state: 'West Bengal',      stateSlug: 'west-bengal',   nearbyCities: ['bhubaneswar','patna','ranchi'],           batch: 2 },
  { slug: 'chandigarh', cityName: 'Chandigarh', state: 'Chandigarh',       stateSlug: 'chandigarh',    nearbyCities: ['delhi','ludhiana','dehradun'],            batch: 2 },
  { slug: 'lucknow',    cityName: 'Lucknow',    state: 'Uttar Pradesh',    stateSlug: 'uttar-pradesh', nearbyCities: ['delhi','noida','patna'],                  batch: 2 },
  { slug: 'kochi',      cityName: 'Kochi',      state: 'Kerala',           stateSlug: 'kerala',        nearbyCities: ['thiruvananthapuram','coimbatore'],        batch: 2 },
  { slug: 'jaipur',     cityName: 'Jaipur',     state: 'Rajasthan',        stateSlug: 'rajasthan',     nearbyCities: ['delhi','ahmedabad','chandigarh'],         batch: 2 },
  { slug: 'ludhiana',   cityName: 'Ludhiana',   state: 'Punjab',           stateSlug: 'punjab',        nearbyCities: ['chandigarh','delhi','dehradun'],          batch: 2 },

  // Tier 3
  { slug: 'gurugram',           cityName: 'Gurugram',           state: 'Haryana',          stateSlug: 'haryana',          nearbyCities: ['delhi','noida'],           batch: 2 },
  { slug: 'noida',              cityName: 'Noida',              state: 'Uttar Pradesh',    stateSlug: 'uttar-pradesh',    nearbyCities: ['delhi','gurugram'],        batch: 2 },
  { slug: 'thane',              cityName: 'Thane',              state: 'Maharashtra',      stateSlug: 'maharashtra',      nearbyCities: ['mumbai','navi-mumbai'],    batch: 2 },
  { slug: 'navi-mumbai',        cityName: 'Navi Mumbai',        state: 'Maharashtra',      stateSlug: 'maharashtra',      nearbyCities: ['mumbai','thane'],          batch: 2 },
  { slug: 'nagpur',             cityName: 'Nagpur',             state: 'Maharashtra',      stateSlug: 'maharashtra',      nearbyCities: ['pune','hyderabad'],        batch: 2 },
  { slug: 'surat',              cityName: 'Surat',              state: 'Gujarat',          stateSlug: 'gujarat',          nearbyCities: ['ahmedabad','vadodara'],    batch: 2 },
  { slug: 'vadodara',           cityName: 'Vadodara',           state: 'Gujarat',          stateSlug: 'gujarat',          nearbyCities: ['ahmedabad','surat'],       batch: 2 },
  { slug: 'indore',             cityName: 'Indore',             state: 'Madhya Pradesh',   stateSlug: 'madhya-pradesh',   nearbyCities: ['bhopal','nagpur'],         batch: 2 },
  { slug: 'bhopal',             cityName: 'Bhopal',             state: 'Madhya Pradesh',   stateSlug: 'madhya-pradesh',   nearbyCities: ['indore','nagpur'],         batch: 2 },
  { slug: 'coimbatore',         cityName: 'Coimbatore',         state: 'Tamil Nadu',       stateSlug: 'tamil-nadu',       nearbyCities: ['chennai','kochi'],         batch: 2 },
  { slug: 'mysuru',             cityName: 'Mysuru',             state: 'Karnataka',        stateSlug: 'karnataka',        nearbyCities: ['bengaluru','coimbatore'],  batch: 2 },
  { slug: 'visakhapatnam',      cityName: 'Visakhapatnam',      state: 'Andhra Pradesh',   stateSlug: 'andhra-pradesh',   nearbyCities: ['hyderabad','bhubaneswar'], batch: 2 },
  { slug: 'thiruvananthapuram', cityName: 'Thiruvananthapuram', state: 'Kerala',           stateSlug: 'kerala',           nearbyCities: ['kochi','coimbatore'],      batch: 2 },
  { slug: 'bhubaneswar',        cityName: 'Bhubaneswar',        state: 'Odisha',           stateSlug: 'odisha',           nearbyCities: ['kolkata','visakhapatnam'], batch: 2 },
  { slug: 'patna',              cityName: 'Patna',              state: 'Bihar',            stateSlug: 'bihar',            nearbyCities: ['lucknow','kolkata'],       batch: 2 },
  { slug: 'guwahati',           cityName: 'Guwahati',           state: 'Assam',            stateSlug: 'assam',            nearbyCities: ['kolkata'],                 batch: 2 },
  { slug: 'dehradun',           cityName: 'Dehradun',           state: 'Uttarakhand',      stateSlug: 'uttarakhand',      nearbyCities: ['chandigarh','delhi'],      batch: 2 },
  { slug: 'raipur',             cityName: 'Raipur',             state: 'Chhattisgarh',     stateSlug: 'chhattisgarh',     nearbyCities: ['nagpur','bhubaneswar'],    batch: 2 },
  { slug: 'ranchi',             cityName: 'Ranchi',             state: 'Jharkhand',        stateSlug: 'jharkhand',        nearbyCities: ['patna','kolkata'],         batch: 2 },
  { slug: 'goa',                cityName: 'Goa',                state: 'Goa',              stateSlug: 'goa',              nearbyCities: ['mumbai','pune'],           batch: 2 },
];

export const APPROVED_STATES: StateConfig[] = [
  { slug: 'karnataka',      stateName: 'Karnataka',      citySlugs: ['bengaluru', 'mysuru'] },
  { slug: 'maharashtra',    stateName: 'Maharashtra',    citySlugs: ['mumbai','pune', 'thane', 'navi-mumbai', 'nagpur'] },
  { slug: 'tamil-nadu',     stateName: 'Tamil Nadu',     citySlugs: ['chennai', 'coimbatore'] },
  { slug: 'delhi',          stateName: 'Delhi (NCT)',    citySlugs: ['delhi'] },
  { slug: 'telangana',      stateName: 'Telangana',      citySlugs: ['hyderabad'] },
  { slug: 'gujarat',        stateName: 'Gujarat',        citySlugs: ['ahmedabad', 'surat', 'vadodara'] },
  { slug: 'west-bengal',    stateName: 'West Bengal',    citySlugs: ['kolkata'] },
  { slug: 'punjab',         stateName: 'Punjab',         citySlugs: ['ludhiana'] },
  { slug: 'kerala',         stateName: 'Kerala',         citySlugs: ['kochi', 'thiruvananthapuram'] },
  { slug: 'rajasthan',      stateName: 'Rajasthan',      citySlugs: ['jaipur'] },
  { slug: 'uttar-pradesh',  stateName: 'Uttar Pradesh',  citySlugs: ['lucknow', 'noida'] },
  { slug: 'haryana',        stateName: 'Haryana',        citySlugs: ['gurugram'] },
  { slug: 'madhya-pradesh', stateName: 'Madhya Pradesh', citySlugs: ['indore', 'bhopal'] },
  { slug: 'chandigarh',     stateName: 'Chandigarh',     citySlugs: ['chandigarh'] },
  { slug: 'andhra-pradesh', stateName: 'Andhra Pradesh', citySlugs: ['visakhapatnam'] },
  { slug: 'odisha',         stateName: 'Odisha',         citySlugs: ['bhubaneswar'] },
  { slug: 'bihar',          stateName: 'Bihar',          citySlugs: ['patna'] },
  { slug: 'assam',          stateName: 'Assam',          citySlugs: ['guwahati'] },
  { slug: 'uttarakhand',    stateName: 'Uttarakhand',    citySlugs: ['dehradun'] },
  { slug: 'chhattisgarh',   stateName: 'Chhattisgarh',   citySlugs: ['raipur'] },
  { slug: 'jharkhand',      stateName: 'Jharkhand',      citySlugs: ['ranchi'] },
  { slug: 'goa',            stateName: 'Goa',            citySlugs: ['goa'] },
];

export const TOP_CITIES_FOR_PRODUCT_PAGES: string[] = [
  'bengaluru','delhi','mumbai','pune','chennai',
];

export const APPROVED_PRODUCTS_FOR_CITY_PAGES: string[] = [
  'money-plant','snake-plant','peace-lily','areca-palm',
  'zz-plant','rubber-plant','jade-plant','monstera-deliciosa',
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return APPROVED_CITIES.find((c) => c.slug === slug);
}

export function getStateBySlug(slug: string): StateConfig | undefined {
  return APPROVED_STATES.find((s) => s.slug === slug);
}

export function isApprovedForCityPages(productSlug: string): boolean {
  return APPROVED_PRODUCTS_FOR_CITY_PAGES.includes(productSlug);
}

export function cityLabel(slug: string): string {
  return getCityBySlug(slug)?.cityName ?? (slug.charAt(0).toUpperCase() + slug.slice(1));
}

export const CITY_DELIVERY_ESTIMATES: Record<string, string> = {
  bengaluru:  '2–4 business days',
  delhi:      '2–4 business days',
  mumbai:     '2–4 business days',
  pune:       '2–4 business days',
  chennai:    '2–4 business days',
  hyderabad:  '3–5 business days',
  ahmedabad:  '3–5 business days',
  kolkata:    '3–5 business days',
  chandigarh: '3–5 business days',
  lucknow:    '3–5 business days',
  kochi:      '4–6 business days',
  jaipur:     '3–5 business days',
  ludhiana:   '3–5 business days',
};
