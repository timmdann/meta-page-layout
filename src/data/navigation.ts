import type { Category } from '../types';

export const topNavLinks: readonly string[] = [
  'НОВОСТИ',
  'СПОРТ',
  'БЕТТИНГ',
  'ФИНАНСЫ',
  'ШОУБИЗ',
  'ЛАЙФСТАЙЛ',
  'IT',
  'АВТО',
];

export const categories: Category[] = [
  { label: 'ГЛАВНАЯ' },
  { label: 'ПРОИСШЕСТВИЯ' },
  { label: 'ОБЩЕСТВО' },
  { label: 'ЭКОНОМИКА' },
  { label: 'ПОЛИТИКА', active: true },
  { label: 'ОБРАЗОВАНИЕ' },
  { label: 'МЕДИЦИНА' },
  { label: 'ВИДЕО' },
  { label: 'ФОТО' },
  { label: 'РАЗВЛЕЧЕНИЯ' },
  { label: 'ЕЩЕ', hasDropdown: true },
];

export const metaProjects: readonly string[] = [
  'ПОЧТА',
  'ПОГОДА',
  'ТВ-ПРОГРАММА',
  'КАРТЫ',
  'ПЕРЕВОДЧИК',
];

export const topics: readonly string[] = [
  'COVID-19',
  'Выборы 2020',
  'Антимонопольный закон',
  'Евро 2020',
];
