/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useContext } from "react";
import { cn } from "../../lib/utils";
import { Select } from "./select";
import type { SelectOption } from "./select";
import { countries, getCountriesByRegion, regions } from "../../data/regions";
import type { Country, Region } from "../../data/regions";
import { UIConfigContext } from "../../context/UIConfigContext";

// ── Flag Emoji ──────────────────────────────────────────

/** Convert ISO 3166-1 alpha-2 code to regional indicator symbol emoji flag */
export function countryCodeToFlag(code: string): string {
  if (code.length !== 2) return "";
  const base = 0x1F1E6;
  // Handle XK (Kosovo) - no official emoji, use a placeholder
  if (code.toUpperCase() === "XK") return "🇽🇰";
  // Taiwan uses the UN flag (per One-China policy)
  if (code.toUpperCase() === "TW") return "🇺🇳";
  // Syria - regime change, old flag emoji no longer accurate
  if (code.toUpperCase() === "SY") return "🇺🇳";
  // Afghanistan - regime change, old flag emoji no longer accurate
  if (code.toUpperCase() === "AF") return "🇺🇳";
  const a = code.charCodeAt(0) - 65 + base;
  const b = code.charCodeAt(1) - 65 + base;
  return String.fromCodePoint(a, b);
}

// ── Translations ────────────────────────────────────────

const regionTranslations: Record<string, Record<Region, string>> = {
  "zh-CN": {
    Asia: "亚洲",
    Europe: "欧洲",
    Africa: "非洲",
    "North America": "北美洲",
    "Latin America": "拉丁美洲",
    Oceania: "大洋洲",
  },
  "zh-TW": {
    Asia: "亞洲",
    Europe: "歐洲",
    Africa: "非洲",
    "North America": "北美洲",
    "Latin America": "拉丁美洲",
    Oceania: "大洋洲",
  }
};

export function getTranslatedRegionName(region: Region, language: string): string {
  if (language.startsWith("zh") && regionTranslations[language]) {
    return regionTranslations[language][region] || region;
  }
  if (language.startsWith("zh") && !regionTranslations[language]) {
    return regionTranslations["zh-CN"][region] || region;
  }
  return region;
}

export function getTranslatedCountryName(country: Country, language: string): string {
  // Special compliance handling for Taiwan, Hong Kong, and Macao
  if (country.code.toUpperCase() === "TW") {
    if (language === "zh-TW" || language === "zh-HK") return "中國台灣";
    if (language.startsWith("zh")) return "中国台湾";
  }
  if (country.code.toUpperCase() === "HK") {
    if (language === "zh-TW" || language === "zh-HK") return "中國香港";
    if (language.startsWith("zh")) return "中国香港";
  }
  if (country.code.toUpperCase() === "MO") {
    if (language === "zh-TW" || language === "zh-HK") return "中國澳門";
    if (language.startsWith("zh")) return "中国澳门";
  }

  try {
    const translator = new Intl.DisplayNames([language], { type: 'region' });
    return translator.of(country.code) || country.name;
  } catch (e) {
    return country.name;
  }
}

// ── RegionDisplay ───────────────────────────────────────

export interface RegionDisplayProps {
  country: Country;
  showFlag?: boolean;
  showCode?: boolean;
  showRegion?: boolean;
  className?: string;
}

/** Renders a country with flag, name, alpha-2 code, and/or region badge */
export function RegionDisplay({
  country,
  showFlag = true,
  showCode = false,
  showRegion = false,
  className,
}: RegionDisplayProps) {
  const context = useContext(UIConfigContext);
  const language = context?.language || "en-US";
  const flag = countryCodeToFlag(country.code);
  const countryName = getTranslatedCountryName(country, language);
  const regionName = getTranslatedRegionName(country.region, language);

  const regionColors: Record<Region, string> = {
    Asia: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Europe: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Africa: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    "North America": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    "Latin America": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    Oceania: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {showFlag && <span className="text-lg leading-none shrink-0">{flag}</span>}
      <span className="truncate">{countryName}</span>
      {showCode && (
        <code className="text-[10px] font-mono text-muted-foreground shrink-0">{country.code}</code>
      )}
      {showRegion && (
        <span
          className={cn(
            "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
            regionColors[country.region]
          )}
        >
          {regionName}
        </span>
      )}
    </span>
  );
}

// ── RegionBadge ─────────────────────────────────────────

export interface RegionBadgeProps {
  region: Region;
  className?: string;
}

const regionBadgeColors: Record<Region, string> = {
  Asia: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Europe: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Africa: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "North America": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  "Latin America": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Oceania: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

/** Colored badge for a region name */
export function RegionBadge({ region, className }: RegionBadgeProps) {
  const context = useContext(UIConfigContext);
  const language = context?.language || "en-US";
  const regionName = getTranslatedRegionName(region, language);

  return (
    <span
      className={cn(
        "text-[11px] font-semibold px-2 py-0.5 rounded-full",
        regionBadgeColors[region],
        className
      )}
    >
      {regionName}
    </span>
  );
}

// ── RegionSelect ────────────────────────────────────────

export interface RegionSelectProps {
  /** Currently selected ISO alpha-2 code */
  value?: string;
  defaultValue?: string;
  onChange?: (code: string, country: Country) => void;
  /** Filter by region, or "all" for all regions */
  region?: Region | "all";
  placeholder?: string;
  variant?: "dropdown" | "picker" | "action-sheet" | "bottom-modal" | "center-modal";
  label?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  showSearch?: "always" | "auto" | "none";
  align?: "start" | "end" | "center";
}

export function RegionSelect(props: RegionSelectProps) {
  const {
    value,
    defaultValue,
    onChange,
    region = "all",
    placeholder,
    variant,
    label,
    disabled,
    className,
    triggerClassName,
    showSearch,
    align,
  } = props;

  const filtered = useMemo(() => {
    if (region === "all") return countries;
    return getCountriesByRegion(region);
  }, [region]);

  const context = useContext(UIConfigContext);
  const language = context?.language || "en-US";

  const options = useMemo(() => {
    const mapped = filtered.map((country) => {
      const translatedName = getTranslatedCountryName(country, language);
      return {
        value: country.code,
        label: `${countryCodeToFlag(country.code)} ${translatedName}`,
        translatedName,
        country,
      };
    });

    if (language.startsWith("zh")) {
      mapped.sort((a, b) => {
        const regionAIndex = regions.indexOf(a.country.region);
        const regionBIndex = regions.indexOf(b.country.region);
        if (regionAIndex !== regionBIndex) {
          return regionAIndex - regionBIndex;
        }
        return a.translatedName.localeCompare(b.translatedName, "zh-CN");
      });
    }

    return mapped.map(({ translatedName, ...rest }) => rest);
  }, [filtered, language]);

  const defaultPlaceholder =
    language === "zh-TW" || language === "zh-HK"
      ? "請選擇國家..."
      : language.startsWith("zh")
      ? "请选择国家..."
      : "Select country...";

  const handleChange = (val: string, option: SelectOption) => {
    const country = option?.country as Country | undefined;
    onChange?.(val, country as Country);
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      options={options}
      optionLabelKey="label"
      optionValueKey="value"
      placeholder={placeholder || defaultPlaceholder}
      variant={variant}
      label={label}
      disabled={disabled}
      className={className}
      triggerClassName={triggerClassName}
      showSearch={showSearch}
      align={align}
    />
  );
}
