import { topNavLinks } from '../data/navigation';
import { Icons } from '../utils/icons';
import { escapeHtml } from '../utils/escapeHtml';
import type { NavToggleDetail } from '../types';

export class Header {
  private render(): string {
    const navItems = topNavLinks
      .map((link) => `<li><a href="#" class="header__nav-link">${escapeHtml(link)}</a></li>`)
      .join('');

    return `
      <header class="header">
        <div class="header__inner container">

          <button class="header__burger" id="burgerBtn"
            aria-label="Відкрити меню" aria-expanded="false">
            ${Icons.burger}
          </button>

          <a class="header__logo" href="#" aria-label="META — головна сторінка">
            <span class="header__logo-bracket">${Icons.bracketLeft}</span>
            <span class="header__logo-text">META</span>
            <span class="header__logo-bracket">${Icons.bracketRight}</span>
          </a>

          <nav class="header__nav" aria-label="Тематична навігація">
            <ul class="header__nav-list">${navItems}</ul>
          </nav>

          <div class="header__actions">
            <div class="header__lang" aria-label="Вибір мови">
              <a href="#" class="header__lang-link header__lang-link--active" lang="uk" aria-current="true">UA</a>
              <a href="#" class="header__lang-link" lang="ru">RU</a>
            </div>
            <button class="header__action-btn" aria-label="Пошук">
              ${Icons.search}
            </button>
            <button class="header__action-btn" aria-label="Сповіщення (1 нове)">
              ${Icons.bell}
              <span class="header__badge" aria-label="1 сповіщення">1</span>
            </button>
            <div class="header__account" id="accountWrap">
              <button class="header__action-btn" id="accountBtn" aria-label="Профіль" aria-expanded="false" aria-haspopup="menu">
                ${Icons.user}
              </button>
              <div class="header__account-dropdown" id="accountDropdown" hidden>
                <div class="header__account-card" role="menu">
                  <a href="#" class="header__account-item" role="menuitem">Мой профиль</a>
                  <a href="#" class="header__account-item" role="menuitem">Мои комментарии</a>
                  <div class="header__account-divider" role="separator"></div>
                  <a href="#" class="header__account-item header__account-item--logout" role="menuitem">
                    Выход
                    ${Icons.logout}
                  </a>
                </div>
              </div>
            </div>
            <button class="header__action-btn header__mail-btn" aria-label="Пошта">
              ${Icons.mail}
            </button>
          </div>

        </div>
      </header>
    `;
  }

  mount(parent: HTMLElement): void {
    parent.insertAdjacentHTML('beforeend', this.render());
    this.bindEvents();
  }

  private bindEvents(): void {
    const burger = document.getElementById('burgerBtn');

    burger?.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      const nextState = !isOpen;

      burger.setAttribute('aria-expanded', String(nextState));

      document.dispatchEvent(
        new CustomEvent<NavToggleDetail>('meta:nav-toggle', { detail: { open: nextState } })
      );
    });

    const accountBtn = document.getElementById('accountBtn');
    const accountDropdown = document.getElementById('accountDropdown');

    accountBtn?.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = accountBtn.getAttribute('aria-expanded') === 'true';
      accountBtn.setAttribute('aria-expanded', String(!isOpen));
      accountDropdown?.toggleAttribute('hidden', isOpen);
    });

    document.addEventListener('click', () => {
      accountBtn?.setAttribute('aria-expanded', 'false');
      if (accountDropdown) accountDropdown.hidden = true;
    });
  }
}
