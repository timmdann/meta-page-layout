import { categories } from '../data/navigation';
import type { Category } from '../types';
import { Icons } from '../utils/icons';
import { escapeHtml } from '../utils/escapeHtml';

export class SecondaryNav {
  private renderItem(category: Category): string {
    const activeClass = category.active ? ' secondary-nav__item--active' : '';
    const ariaCurrent = category.active ? ' aria-current="page"' : '';
    const moreClass = category.hasDropdown ? ' secondary-nav__item--more' : '';
    const chevron = category.hasDropdown ? Icons.chevronDown : '';

    return `
      <li class="secondary-nav__item${activeClass}${moreClass}">
        <a href="#" class="secondary-nav__link"${ariaCurrent}>
          ${escapeHtml(category.label)}${chevron}
        </a>
      </li>
    `;
  }

  private render(): string {
    const items = categories.map((cat) => this.renderItem(cat)).join('');

    return `
      <nav class="secondary-nav" aria-label="Категорії новин">
        <div class="secondary-nav__inner container">
          <ul class="secondary-nav__list">${items}</ul>
        </div>
      </nav>
    `;
  }

  mount(parent: HTMLElement): void {
    parent.insertAdjacentHTML('beforeend', this.render());
  }
}
