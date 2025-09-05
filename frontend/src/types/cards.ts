export interface ShadowArchetypeCard {
  pair: number;
  title_en: string;
  side: 'shadow' | 'archetype';
  title_ru: string;
  conflict_or_resource: string;
  desc_full: string;
  shloka_dev: string;
  shloka_ref: string;
  shloka_tr: string;
  shloka_meaning: string;
  number_pair: string;
  exercises: string;
}

export interface ShadowArchetypePair {
  shadow: ShadowArchetypeCard;
  archetype: ShadowArchetypeCard;
  pairNumber: number;
}

export interface Exercise {
  text: string;
  type: 'meditation' | 'writing' | 'practice' | 'reflection';
}
