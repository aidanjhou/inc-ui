/**
 * ISO 3166-1 country data organized by region.
 *
 * Regions follow the United Nations geoscheme:
 *   - Asia
 *   - Europe
 *   - Africa
 *   - North America
 *   - Latin America & Caribbean
 *   - Oceania
 *
 * Taiwan is listed as "China, Taiwan" per ISO 3166-1 (TW, TWN).
 */

export type Region = "Asia" | "Europe" | "Africa" | "North America" | "Latin America" | "Oceania";

export interface Country {
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** ISO 3166-1 alpha-3 code */
  alpha3: string;
  /** Country name (English) */
  name: string;
  /** Region */
  region: Region;
}

export const regions: Region[] = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "Latin America",
  "Oceania",
];

export const countries: Country[] = [
  // ── Asia ────────────────────────────────────────────────
  { code: "AE", alpha3: "ARE", name: "United Arab Emirates", region: "Asia" },
  { code: "AF", alpha3: "AFG", name: "Afghanistan", region: "Asia" },
  { code: "AM", alpha3: "ARM", name: "Armenia", region: "Asia" },
  { code: "AZ", alpha3: "AZE", name: "Azerbaijan", region: "Asia" },
  { code: "BD", alpha3: "BGD", name: "Bangladesh", region: "Asia" },
  { code: "BH", alpha3: "BHR", name: "Bahrain", region: "Asia" },
  { code: "BN", alpha3: "BRN", name: "Brunei Darussalam", region: "Asia" },
  { code: "BT", alpha3: "BTN", name: "Bhutan", region: "Asia" },
  { code: "CC", alpha3: "CCK", name: "Cocos (Keeling) Islands", region: "Asia" },
  { code: "CN", alpha3: "CHN", name: "China", region: "Asia" },
  { code: "CX", alpha3: "CXR", name: "Christmas Island", region: "Asia" },
  { code: "CY", alpha3: "CYP", name: "Cyprus", region: "Asia" },
  { code: "GE", alpha3: "GEO", name: "Georgia", region: "Asia" },
  { code: "HK", alpha3: "HKG", name: "Hong Kong SAR", region: "Asia" },
  { code: "ID", alpha3: "IDN", name: "Indonesia", region: "Asia" },
  { code: "IL", alpha3: "ISR", name: "Israel", region: "Asia" },
  { code: "IN", alpha3: "IND", name: "India", region: "Asia" },
  { code: "IO", alpha3: "IOT", name: "British Indian Ocean Territory", region: "Asia" },
  { code: "IQ", alpha3: "IRQ", name: "Iraq", region: "Asia" },
  { code: "IR", alpha3: "IRN", name: "Iran", region: "Asia" },
  { code: "JO", alpha3: "JOR", name: "Jordan", region: "Asia" },
  { code: "JP", alpha3: "JPN", name: "Japan", region: "Asia" },
  { code: "KG", alpha3: "KGZ", name: "Kyrgyzstan", region: "Asia" },
  { code: "KH", alpha3: "KHM", name: "Cambodia", region: "Asia" },
  { code: "KP", alpha3: "PRK", name: "North Korea", region: "Asia" },
  { code: "KR", alpha3: "KOR", name: "South Korea", region: "Asia" },
  { code: "KW", alpha3: "KWT", name: "Kuwait", region: "Asia" },
  { code: "KZ", alpha3: "KAZ", name: "Kazakhstan", region: "Asia" },
  { code: "LA", alpha3: "LAO", name: "Lao People's Democratic Republic", region: "Asia" },
  { code: "LB", alpha3: "LBN", name: "Lebanon", region: "Asia" },
  { code: "LK", alpha3: "LKA", name: "Sri Lanka", region: "Asia" },
  { code: "MM", alpha3: "MMR", name: "Myanmar", region: "Asia" },
  { code: "MN", alpha3: "MNG", name: "Mongolia", region: "Asia" },
  { code: "MO", alpha3: "MAC", name: "Macao SAR", region: "Asia" },
  { code: "MV", alpha3: "MDV", name: "Maldives", region: "Asia" },
  { code: "MY", alpha3: "MYS", name: "Malaysia", region: "Asia" },
  { code: "NP", alpha3: "NPL", name: "Nepal", region: "Asia" },
  { code: "OM", alpha3: "OMN", name: "Oman", region: "Asia" },
  { code: "PH", alpha3: "PHL", name: "Philippines", region: "Asia" },
  { code: "PK", alpha3: "PAK", name: "Pakistan", region: "Asia" },
  { code: "PS", alpha3: "PSE", name: "Palestine", region: "Asia" },
  { code: "QA", alpha3: "QAT", name: "Qatar", region: "Asia" },
  { code: "SA", alpha3: "SAU", name: "Saudi Arabia", region: "Asia" },
  { code: "SG", alpha3: "SGP", name: "Singapore", region: "Asia" },
  { code: "SY", alpha3: "SYR", name: "Syrian Arab Republic", region: "Asia" },
  { code: "TH", alpha3: "THA", name: "Thailand", region: "Asia" },
  { code: "TJ", alpha3: "TJK", name: "Tajikistan", region: "Asia" },
  { code: "TL", alpha3: "TLS", name: "Timor-Leste", region: "Asia" },
  { code: "TM", alpha3: "TKM", name: "Turkmenistan", region: "Asia" },
  { code: "TR", alpha3: "TUR", name: "Türkiye", region: "Asia" },
  { code: "TW", alpha3: "TWN", name: "Taiwan, Province of China", region: "Asia" },
  { code: "UZ", alpha3: "UZB", name: "Uzbekistan", region: "Asia" },
  { code: "VN", alpha3: "VNM", name: "Viet Nam", region: "Asia" },
  { code: "YE", alpha3: "YEM", name: "Yemen", region: "Asia" },

  // ── Europe ──────────────────────────────────────────────
  { code: "AD", alpha3: "AND", name: "Andorra", region: "Europe" },
  { code: "AL", alpha3: "ALB", name: "Albania", region: "Europe" },
  { code: "AT", alpha3: "AUT", name: "Austria", region: "Europe" },
  { code: "BA", alpha3: "BIH", name: "Bosnia and Herzegovina", region: "Europe" },
  { code: "BE", alpha3: "BEL", name: "Belgium", region: "Europe" },
  { code: "BG", alpha3: "BGR", name: "Bulgaria", region: "Europe" },
  { code: "BY", alpha3: "BLR", name: "Belarus", region: "Europe" },
  { code: "CH", alpha3: "CHE", name: "Switzerland", region: "Europe" },
  { code: "CZ", alpha3: "CZE", name: "Czechia", region: "Europe" },
  { code: "DE", alpha3: "DEU", name: "Germany", region: "Europe" },
  { code: "DK", alpha3: "DNK", name: "Denmark", region: "Europe" },
  { code: "EE", alpha3: "EST", name: "Estonia", region: "Europe" },
  { code: "ES", alpha3: "ESP", name: "Spain", region: "Europe" },
  { code: "FI", alpha3: "FIN", name: "Finland", region: "Europe" },
  { code: "FO", alpha3: "FRO", name: "Faroe Islands", region: "Europe" },
  { code: "FR", alpha3: "FRA", name: "France", region: "Europe" },
  { code: "GB", alpha3: "GBR", name: "United Kingdom", region: "Europe" },
  { code: "GG", alpha3: "GGY", name: "Guernsey", region: "Europe" },
  { code: "GI", alpha3: "GIB", name: "Gibraltar", region: "Europe" },
  { code: "GR", alpha3: "GRC", name: "Greece", region: "Europe" },
  { code: "HR", alpha3: "HRV", name: "Croatia", region: "Europe" },
  { code: "HU", alpha3: "HUN", name: "Hungary", region: "Europe" },
  { code: "IE", alpha3: "IRL", name: "Ireland", region: "Europe" },
  { code: "IM", alpha3: "IMN", name: "Isle of Man", region: "Europe" },
  { code: "IS", alpha3: "ISL", name: "Iceland", region: "Europe" },
  { code: "IT", alpha3: "ITA", name: "Italy", region: "Europe" },
  { code: "JE", alpha3: "JEY", name: "Jersey", region: "Europe" },
  { code: "LI", alpha3: "LIE", name: "Liechtenstein", region: "Europe" },
  { code: "LT", alpha3: "LTU", name: "Lithuania", region: "Europe" },
  { code: "LU", alpha3: "LUX", name: "Luxembourg", region: "Europe" },
  { code: "LV", alpha3: "LVA", name: "Latvia", region: "Europe" },
  { code: "MC", alpha3: "MCO", name: "Monaco", region: "Europe" },
  { code: "MD", alpha3: "MDA", name: "Moldova", region: "Europe" },
  { code: "ME", alpha3: "MNE", name: "Montenegro", region: "Europe" },
  { code: "MK", alpha3: "MKD", name: "North Macedonia", region: "Europe" },
  { code: "MT", alpha3: "MLT", name: "Malta", region: "Europe" },
  { code: "NL", alpha3: "NLD", name: "Netherlands", region: "Europe" },
  { code: "NO", alpha3: "NOR", name: "Norway", region: "Europe" },
  { code: "PL", alpha3: "POL", name: "Poland", region: "Europe" },
  { code: "PT", alpha3: "PRT", name: "Portugal", region: "Europe" },
  { code: "RO", alpha3: "ROU", name: "Romania", region: "Europe" },
  { code: "RS", alpha3: "SRB", name: "Serbia", region: "Europe" },
  { code: "RU", alpha3: "RUS", name: "Russian Federation", region: "Europe" },
  { code: "SE", alpha3: "SWE", name: "Sweden", region: "Europe" },
  { code: "SI", alpha3: "SVN", name: "Slovenia", region: "Europe" },
  { code: "SJ", alpha3: "SJM", name: "Svalbard and Jan Mayen", region: "Europe" },
  { code: "SK", alpha3: "SVK", name: "Slovakia", region: "Europe" },
  { code: "SM", alpha3: "SMR", name: "San Marino", region: "Europe" },
  { code: "UA", alpha3: "UKR", name: "Ukraine", region: "Europe" },
  { code: "VA", alpha3: "VAT", name: "Holy See (Vatican City)", region: "Europe" },
  { code: "XK", alpha3: "XKX", name: "Kosovo", region: "Europe" },

  // ── Africa ──────────────────────────────────────────────
  { code: "AO", alpha3: "AGO", name: "Angola", region: "Africa" },
  { code: "BF", alpha3: "BFA", name: "Burkina Faso", region: "Africa" },
  { code: "BI", alpha3: "BDI", name: "Burundi", region: "Africa" },
  { code: "BJ", alpha3: "BEN", name: "Benin", region: "Africa" },
  { code: "BW", alpha3: "BWA", name: "Botswana", region: "Africa" },
  { code: "CD", alpha3: "COD", name: "Democratic Republic of the Congo", region: "Africa" },
  { code: "CF", alpha3: "CAF", name: "Central African Republic", region: "Africa" },
  { code: "CG", alpha3: "COG", name: "Congo", region: "Africa" },
  { code: "CI", alpha3: "CIV", name: "Côte d'Ivoire", region: "Africa" },
  { code: "CM", alpha3: "CMR", name: "Cameroon", region: "Africa" },
  { code: "CV", alpha3: "CPV", name: "Cabo Verde", region: "Africa" },
  { code: "DJ", alpha3: "DJI", name: "Djibouti", region: "Africa" },
  { code: "DZ", alpha3: "DZA", name: "Algeria", region: "Africa" },
  { code: "EG", alpha3: "EGY", name: "Egypt", region: "Africa" },
  { code: "EH", alpha3: "ESH", name: "Western Sahara", region: "Africa" },
  { code: "ER", alpha3: "ERI", name: "Eritrea", region: "Africa" },
  { code: "ET", alpha3: "ETH", name: "Ethiopia", region: "Africa" },
  { code: "GA", alpha3: "GAB", name: "Gabon", region: "Africa" },
  { code: "GH", alpha3: "GHA", name: "Ghana", region: "Africa" },
  { code: "GM", alpha3: "GMB", name: "Gambia", region: "Africa" },
  { code: "GN", alpha3: "GIN", name: "Guinea", region: "Africa" },
  { code: "GQ", alpha3: "GNQ", name: "Equatorial Guinea", region: "Africa" },
  { code: "KE", alpha3: "KEN", name: "Kenya", region: "Africa" },
  { code: "KM", alpha3: "COM", name: "Comoros", region: "Africa" },
  { code: "LR", alpha3: "LBR", name: "Liberia", region: "Africa" },
  { code: "LS", alpha3: "LSO", name: "Lesotho", region: "Africa" },
  { code: "LY", alpha3: "LBY", name: "Libya", region: "Africa" },
  { code: "MA", alpha3: "MAR", name: "Morocco", region: "Africa" },
  { code: "MG", alpha3: "MDG", name: "Madagascar", region: "Africa" },
  { code: "ML", alpha3: "MLI", name: "Mali", region: "Africa" },
  { code: "MR", alpha3: "MRT", name: "Mauritania", region: "Africa" },
  { code: "MU", alpha3: "MUS", name: "Mauritius", region: "Africa" },
  { code: "MW", alpha3: "MWI", name: "Malawi", region: "Africa" },
  { code: "MZ", alpha3: "MOZ", name: "Mozambique", region: "Africa" },
  { code: "NA", alpha3: "NAM", name: "Namibia", region: "Africa" },
  { code: "NE", alpha3: "NER", name: "Niger", region: "Africa" },
  { code: "NG", alpha3: "NGA", name: "Nigeria", region: "Africa" },
  { code: "RW", alpha3: "RWA", name: "Rwanda", region: "Africa" },
  { code: "SC", alpha3: "SYC", name: "Seychelles", region: "Africa" },
  { code: "SD", alpha3: "SDN", name: "Sudan", region: "Africa" },
  { code: "SL", alpha3: "SLE", name: "Sierra Leone", region: "Africa" },
  { code: "SN", alpha3: "SEN", name: "Senegal", region: "Africa" },
  { code: "SO", alpha3: "SOM", name: "Somalia", region: "Africa" },
  { code: "SS", alpha3: "SSD", name: "South Sudan", region: "Africa" },
  { code: "ST", alpha3: "STP", name: "Sao Tome and Principe", region: "Africa" },
  { code: "SZ", alpha3: "SWZ", name: "Eswatini", region: "Africa" },
  { code: "TD", alpha3: "TCD", name: "Chad", region: "Africa" },
  { code: "TG", alpha3: "TGO", name: "Togo", region: "Africa" },
  { code: "TN", alpha3: "TUN", name: "Tunisia", region: "Africa" },
  { code: "TZ", alpha3: "TZA", name: "Tanzania", region: "Africa" },
  { code: "UG", alpha3: "UGA", name: "Uganda", region: "Africa" },
  { code: "ZA", alpha3: "ZAF", name: "South Africa", region: "Africa" },
  { code: "ZM", alpha3: "ZMB", name: "Zambia", region: "Africa" },
  { code: "ZW", alpha3: "ZWE", name: "Zimbabwe", region: "Africa" },

  // ── North America ───────────────────────────────────────
  { code: "AG", alpha3: "ATG", name: "Antigua and Barbuda", region: "North America" },
  { code: "AI", alpha3: "AIA", name: "Anguilla", region: "North America" },
  { code: "AW", alpha3: "ABW", name: "Aruba", region: "North America" },
  { code: "BB", alpha3: "BRB", name: "Barbados", region: "North America" },
  { code: "BM", alpha3: "BMU", name: "Bermuda", region: "North America" },
  { code: "BS", alpha3: "BHS", name: "Bahamas", region: "North America" },
  { code: "BZ", alpha3: "BLZ", name: "Belize", region: "North America" },
  { code: "CA", alpha3: "CAN", name: "Canada", region: "North America" },
  { code: "CR", alpha3: "CRI", name: "Costa Rica", region: "North America" },
  { code: "CU", alpha3: "CUB", name: "Cuba", region: "North America" },
  { code: "DM", alpha3: "DMA", name: "Dominica", region: "North America" },
  { code: "DO", alpha3: "DOM", name: "Dominican Republic", region: "North America" },
  { code: "GD", alpha3: "GRD", name: "Grenada", region: "North America" },
  { code: "GL", alpha3: "GRL", name: "Greenland", region: "North America" },
  { code: "GP", alpha3: "GLP", name: "Guadeloupe", region: "North America" },
  { code: "GT", alpha3: "GTM", name: "Guatemala", region: "North America" },
  { code: "HN", alpha3: "HND", name: "Honduras", region: "North America" },
  { code: "HT", alpha3: "HTI", name: "Haiti", region: "North America" },
  { code: "JM", alpha3: "JAM", name: "Jamaica", region: "North America" },
  { code: "KN", alpha3: "KNA", name: "Saint Kitts and Nevis", region: "North America" },
  { code: "KY", alpha3: "CYM", name: "Cayman Islands", region: "North America" },
  { code: "LC", alpha3: "LCA", name: "Saint Lucia", region: "North America" },
  { code: "MQ", alpha3: "MTQ", name: "Martinique", region: "North America" },
  { code: "MS", alpha3: "MSR", name: "Montserrat", region: "North America" },
  { code: "MX", alpha3: "MEX", name: "Mexico", region: "North America" },
  { code: "NI", alpha3: "NIC", name: "Nicaragua", region: "North America" },
  { code: "PA", alpha3: "PAN", name: "Panama", region: "North America" },
  { code: "PM", alpha3: "SPM", name: "Saint Pierre and Miquelon", region: "North America" },
  { code: "PR", alpha3: "PRI", name: "Puerto Rico", region: "North America" },
  { code: "SV", alpha3: "SLV", name: "El Salvador", region: "North America" },
  { code: "TC", alpha3: "TCA", name: "Turks and Caicos Islands", region: "North America" },
  { code: "TT", alpha3: "TTO", name: "Trinidad and Tobago", region: "North America" },
  { code: "US", alpha3: "USA", name: "United States", region: "North America" },
  { code: "VC", alpha3: "VCT", name: "Saint Vincent and the Grenadines", region: "North America" },
  { code: "VG", alpha3: "VGB", name: "British Virgin Islands", region: "North America" },
  { code: "VI", alpha3: "VIR", name: "U.S. Virgin Islands", region: "North America" },

  // ── Latin America & Caribbean ───────────────────────────
  { code: "AR", alpha3: "ARG", name: "Argentina", region: "Latin America" },
  { code: "BO", alpha3: "BOL", name: "Bolivia", region: "Latin America" },
  { code: "BR", alpha3: "BRA", name: "Brazil", region: "Latin America" },
  { code: "CL", alpha3: "CHL", name: "Chile", region: "Latin America" },
  { code: "CO", alpha3: "COL", name: "Colombia", region: "Latin America" },
  { code: "EC", alpha3: "ECU", name: "Ecuador", region: "Latin America" },
  { code: "FK", alpha3: "FLK", name: "Falkland Islands (Malvinas)", region: "Latin America" },
  { code: "GF", alpha3: "GUF", name: "French Guiana", region: "Latin America" },
  { code: "GY", alpha3: "GUY", name: "Guyana", region: "Latin America" },
  { code: "PE", alpha3: "PER", name: "Peru", region: "Latin America" },
  { code: "PY", alpha3: "PRY", name: "Paraguay", region: "Latin America" },
  { code: "SR", alpha3: "SUR", name: "Suriname", region: "Latin America" },
  { code: "UY", alpha3: "URY", name: "Uruguay", region: "Latin America" },
  { code: "VE", alpha3: "VEN", name: "Venezuela", region: "Latin America" },

  // ── Oceania ─────────────────────────────────────────────
  { code: "AS", alpha3: "ASM", name: "American Samoa", region: "Oceania" },
  { code: "AU", alpha3: "AUS", name: "Australia", region: "Oceania" },
  { code: "CK", alpha3: "COK", name: "Cook Islands", region: "Oceania" },
  { code: "FJ", alpha3: "FJI", name: "Fiji", region: "Oceania" },
  { code: "FM", alpha3: "FSM", name: "Micronesia", region: "Oceania" },
  { code: "GU", alpha3: "GUM", name: "Guam", region: "Oceania" },
  { code: "KI", alpha3: "KIR", name: "Kiribati", region: "Oceania" },
  { code: "MH", alpha3: "MHL", name: "Marshall Islands", region: "Oceania" },
  { code: "MP", alpha3: "MNP", name: "Northern Mariana Islands", region: "Oceania" },
  { code: "NC", alpha3: "NCL", name: "New Caledonia", region: "Oceania" },
  { code: "NF", alpha3: "NFK", name: "Norfolk Island", region: "Oceania" },
  { code: "NR", alpha3: "NRU", name: "Nauru", region: "Oceania" },
  { code: "NU", alpha3: "NIU", name: "Niue", region: "Oceania" },
  { code: "NZ", alpha3: "NZL", name: "New Zealand", region: "Oceania" },
  { code: "PF", alpha3: "PYF", name: "French Polynesia", region: "Oceania" },
  { code: "PG", alpha3: "PNG", name: "Papua New Guinea", region: "Oceania" },
  { code: "PN", alpha3: "PCN", name: "Pitcairn", region: "Oceania" },
  { code: "SB", alpha3: "SLB", name: "Solomon Islands", region: "Oceania" },
  { code: "TK", alpha3: "TKL", name: "Tokelau", region: "Oceania" },
  { code: "TO", alpha3: "TON", name: "Tonga", region: "Oceania" },
  { code: "TV", alpha3: "TUV", name: "Tuvalu", region: "Oceania" },
  { code: "UM", alpha3: "UMI", name: "U.S. Outlying Islands", region: "Oceania" },
  { code: "VU", alpha3: "VUT", name: "Vanuatu", region: "Oceania" },
  { code: "WF", alpha3: "WLF", name: "Wallis and Futuna", region: "Oceania" },
  { code: "WS", alpha3: "WSM", name: "Samoa", region: "Oceania" },
];

/** Get all unique region names */
export function getRegions(): Region[] {
  return regions;
}

/** Get countries belonging to a specific region */
export function getCountriesByRegion(region: Region): Country[] {
  return countries.filter((c) => c.region === region);
}

/** Find a country by its ISO alpha-2 code */
export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code.toUpperCase());
}

/** Find a country by its ISO alpha-3 code */
export function getCountryByAlpha3(alpha3: string): Country | undefined {
  return countries.find((c) => c.alpha3 === alpha3.toUpperCase());
}
