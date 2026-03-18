export interface Category {
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export interface NewsItem {
  time: string;
  datetime: string;
  title: string;
  imageUrl: string;
  active?: boolean;
}

export interface Article {
  title: string;
  imageUrl: string;
  imageAlt: string;
  excerpt?: string;
}

export interface NavToggleDetail {
  open: boolean;
}

export type NavToggleEvent = CustomEvent<NavToggleDetail>;
