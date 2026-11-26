// Figures for NusaData — Indonesia in Numbers.
// Every figure carries its source and year. Sources: BPS (Statistics
// Indonesia), World Bank WDI, United Nations World Population Prospects.
// The entry is a 2024 dataset: figures are published values for the years shown.

export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  note: 'Figures are published values for the years shown. Each figure names its source and year.',
};

export const HEADLINE = [
  { label: 'Population', value: '283.5M', sub: '4th largest in the world', source: 'World Bank, 2024' },
  { label: 'GDP', value: '$1.40T', sub: '$4,925 per person', source: 'World Bank, 2024' },
  { label: 'GDP growth', value: '5.03%', sub: 'year on year', source: 'BPS, 2024' },
  { label: 'Poverty rate', value: '8.57%', sub: 'down from 9.03% in Mar 2024', source: 'BPS, Sep 2024' },
];

export const AT_A_GLANCE = [
  { label: 'Land area', value: '1,904,569 km²', source: 'BPS, 2024' },
  { label: 'Islands', value: '17,508', source: 'BPS' },
  { label: 'Provinces', value: '38', source: 'BPS, 2024' },
  { label: 'Regencies & cities', value: '514', source: 'BPS, 2024' },
  { label: 'Capital', value: 'Jakarta', sub: 'seat of government moving to Nusantara', source: '' },
  { label: 'Currency', value: 'Rupiah (IDR)', source: 'Bank Indonesia' },
  { label: 'Time zones', value: '3 (WIB, WITA, WIT)', source: '' },
  { label: 'Urban population', value: '58.8%', source: 'World Bank, 2024' },
];

// Population, millions, World Bank WDI
export const POPULATION_YEARS = [
  { year: '2020', value: 274.8 },
  { year: '2021', value: 276.8 },
  { year: '2022', value: 278.8 },
  { year: '2023', value: 281.2 },
  { year: '2024', value: 283.5 },
];

export const AGE_STRUCTURE = [
  { label: 'Under 15', value: 24.6, source: 'World Bank, 2024' },
  { label: '15 to 64', value: 68.1, source: 'World Bank, 2024' },
  { label: '65 and over', value: 7.3, source: 'World Bank, 2024' },
];

export const POPULATION_FACTS = [
  { label: 'Annual growth', value: '0.81%', source: 'World Bank, 2024' },
  { label: 'Fertility rate', value: '2.13 births per woman', source: 'World Bank, 2023' },
  { label: 'Density', value: '149 people per km²', source: 'World Bank, 2023' },
  { label: 'Median age', value: '30.5 years', source: 'UN, 2024' },
];

// Top 10 provinces by population, millions, BPS 2024 estimates
export const PROVINCES = [
  { name: 'West Java', pop: 49.9, capital: 'Bandung' },
  { name: 'East Java', pop: 41.8, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.9, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 15.6, capital: 'Medan' },
  { name: 'Banten', pop: 12.4, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.6, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.3, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.2, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 8.8, capital: 'Palembang' },
  { name: 'Riau', pop: 7.0, capital: 'Pekanbaru' },
];

// GDP growth, percent year on year, BPS
export const GDP_GROWTH = [
  { year: '2020', value: -2.07 },
  { year: '2021', value: 3.69 },
  { year: '2022', value: 5.31 },
  { year: '2023', value: 5.05 },
  { year: '2024', value: 5.03 },
];

// Share of GDP, percent, BPS 2024
export const GDP_SECTORS = [
  { label: 'Manufacturing', value: 19.0 },
  { label: 'Trade', value: 12.9 },
  { label: 'Agriculture', value: 12.5 },
  { label: 'Construction', value: 9.8 },
  { label: 'Mining', value: 8.4 },
  { label: 'All other sectors', value: 37.4 },
];

export const TRADE_2024 = [
  { label: 'Exports', value: '$264.70B', source: 'BPS, 2024' },
  { label: 'Imports', value: '$233.66B', source: 'BPS, 2024' },
  { label: 'Trade surplus', value: '$31.04B', source: 'BPS, 2024' },
  { label: 'Foreign investment', value: '$24.3B', source: 'World Bank, 2024' },
];

// Consumer price inflation, December year on year, percent, BPS
export const INFLATION = [
  { year: '2020', value: 1.68 },
  { year: '2021', value: 1.87 },
  { year: '2022', value: 5.51 },
  { year: '2023', value: 2.61 },
  { year: '2024', value: 1.57 },
];

// Open unemployment rate, August, percent, BPS Sakernas
export const UNEMPLOYMENT = [
  { year: '2020', value: 7.07 },
  { year: '2021', value: 6.49 },
  { year: '2022', value: 5.86 },
  { year: '2023', value: 5.32 },
  { year: '2024', value: 4.91 },
];

export const LABOUR_FACTS = [
  { label: 'Labour force', value: '152.11M people', source: 'BPS, Aug 2024' },
  { label: 'Unemployed', value: '7.47M people', source: 'BPS, Aug 2024' },
  { label: 'Participation rate', value: '70.63%', source: 'BPS, Aug 2024' },
  { label: 'Youth unemployment', value: '13.1%', source: 'World Bank, 2024' },
];

// Poverty rate, September, percent of population, BPS
export const POVERTY = [
  { year: '2020', value: 10.19 },
  { year: '2021', value: 9.71 },
  { year: '2022', value: 9.57 },
  { year: '2023', value: 9.36 },
  { year: '2024', value: 8.57 },
];

export const WELFARE = [
  { label: 'Human Development Index', value: '75.02', sub: 'out of 100, high category', source: 'BPS, 2024' },
  { label: 'Life expectancy', value: '74.23 years', sub: 'at birth', source: 'BPS, 2024' },
  { label: 'Literacy rate', value: '96.5%', sub: 'age 15 and over', source: 'BPS, 2023' },
  { label: 'Gini ratio', value: '0.375', sub: '0 is perfect equality', source: 'BPS, Mar 2025' },
];

export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', what: 'Population estimates, GDP, inflation, unemployment, poverty, HDI, life expectancy, literacy, trade, Gini ratio.' },
  { name: 'World Bank — World Development Indicators', what: 'Population, GDP and GDP per capita, urban share, fertility, youth unemployment, foreign investment.' },
  { name: 'United Nations — World Population Prospects 2024', what: 'Population totals and median age.' },
  { name: 'Bank Indonesia', what: 'Currency (rupiah).' },
];

export const METHOD_NOTE = 'Provincial populations are BPS 2024 mid-year estimates, rounded to one decimal. Sector shares are rounded and sum to 100%. Poverty and unemployment figures follow BPS survey dates (September and August). Where sources disagree slightly — for example the UN and BPS population totals — the site uses the World Bank figure and says so.';
