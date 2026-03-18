import { topNavLinks, metaProjects } from '../data/navigation';
import { Icons } from '../utils/icons';
import { escapeHtml } from '../utils/escapeHtml';
import type { NavToggleEvent } from '../types';

export class MobileNav {
  private el: HTMLElement | null = null;
  private lastFocusedElement: HTMLElement | null = null;

  private render(): string {
    const items = topNavLinks
      .map((link) => `<li><a href="#" class="mobile-nav__link">${escapeHtml(link)}</a></li>`)
      .join('');

    const projectItems = metaProjects
      .map((link) => `<li><a href="#" class="mobile-nav__link">${escapeHtml(link)}</a></li>`)
      .join('');

    return `
      <div class="mobile-nav" id="mobileNav" aria-hidden="true" aria-label="Бічне меню">
        <div class="mobile-nav__header">
          <a class="mobile-nav__logo" href="#" aria-label="META — головна сторінка">
            <span class="mobile-nav__logo-bracket">${Icons.bracketLeft}</span>
            <span class="mobile-nav__logo-text">META</span>
            <span class="mobile-nav__logo-bracket">${Icons.bracketRight}</span>
          </a>
        </div>
        <div class="mobile-nav__divider"></div>
        <nav aria-label="Мобільне меню">
          <div class="mobile-nav__section">
            <span class="mobile-nav__section-title">Рубрики</span>
            <ul class="mobile-nav__list">${items}</ul>
          </div>
          <div class="mobile-nav__divider mobile-nav__divider--section"></div>
          <div class="mobile-nav__section">
            <span class="mobile-nav__section-title">Проекты мета</span>
            <ul class="mobile-nav__list">${projectItems}</ul>
          </div>
          <div class="mobile-nav__divider mobile-nav__divider--section"></div>
          <div class="mobile-nav__settings">
            <div class="mobile-nav__settings-row">
              <span class="mobile-nav__settings-label">Темная тема</span>
              <button class="mobile-nav__toggle" role="switch" aria-checked="true" aria-label="Темная тема">
                <span class="mobile-nav__toggle-thumb"></span>
              </button>
            </div>
            <div class="mobile-nav__settings-row">
              <span class="mobile-nav__settings-label">Текст новостей</span>
              <div class="mobile-nav__lang">
                <a href="#" class="mobile-nav__lang-link mobile-nav__lang-link--active" lang="uk" aria-current="true">UA</a>
                <a href="#" class="mobile-nav__lang-link" lang="ru">RU</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    `;
  }

  mount(parent: HTMLElement): void {
    parent.insertAdjacentHTML('beforeend', this.render());
    this.el = document.getElementById('mobileNav');
    this.bindEvents();
  }

  private open(): void {
    this.lastFocusedElement = document.activeElement as HTMLElement;
    this.el?.classList.add('is-open');
    this.el?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    const firstFocusable = this.el?.querySelector<HTMLElement>('a, button');
    firstFocusable?.focus();
  }

  private close(): void {
    this.el?.classList.remove('is-open');
    this.el?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');

    const burger = document.getElementById('burgerBtn');
    burger?.setAttribute('aria-expanded', 'false');
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  private bindEvents(): void {
    document.addEventListener('meta:nav-toggle', (e: Event) => {
      const event = e as NavToggleEvent;
      event.detail.open ? this.open() : this.close();
    });

    document.addEventListener('click', (e: MouseEvent) => {
      if (
        this.el?.classList.contains('is-open') &&
        !this.el.contains(e.target as Node) &&
        !(e.target as Element).closest('#burgerBtn')
      ) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.close();
    });
  }
}
