import { sidebarNews, featuredArticle, sideArticles } from '../data/news';
import type { NewsItem, Article } from '../types';
import { Icons } from '../utils/icons';
import { escapeHtml } from '../utils/escapeHtml';

export class NewsSection {
  private renderSidebarItem(item: NewsItem): string {
    const activeClass = item.active ? ' news-sidebar__item--active' : '';

    return `
      <li class="news-sidebar__item${activeClass}">
        <div class="news-sidebar__media">
          <a href="#" tabindex="-1" aria-hidden="true">
            <img src="${escapeHtml(item.imageUrl)}" alt="" width="80" height="60" loading="lazy"/>
          </a>
        </div>
        <div class="news-sidebar__text">
          <time class="news-sidebar__time" datetime="${escapeHtml(item.datetime)}">${escapeHtml(item.time)}</time>
          <a href="#" class="news-sidebar__link">${escapeHtml(item.title)}</a>
        </div>
      </li>
    `;
  }

  private renderFeatured(article: Article): string {
    return `
      <article class="news-featured">
        <a href="#" class="news-featured__img-wrap">
          <img
            src="${escapeHtml(article.imageUrl)}"
            alt="${escapeHtml(article.imageAlt)}"
            class="news-featured__img"
            width="800"
            height="480"
            loading="eager"
          />
        </a>
        <h1 class="news-featured__title">
          <a href="#">${escapeHtml(article.title)}</a>
        </h1>
        <p class="news-featured__excerpt">${escapeHtml(article.excerpt ?? '')}</p>
      </article>
    `;
  }

  private renderSideCard(article: Article): string {
    return `
      <article class="news-card">
        <a href="#" class="news-card__img-wrap">
          <img
            src="${escapeHtml(article.imageUrl)}"
            alt="${escapeHtml(article.imageAlt)}"
            class="news-card__img"
            width="400"
            height="250"
            loading="lazy"
          />
        </a>
        <h3 class="news-card__title">
          <a href="#">${escapeHtml(article.title)}</a>
        </h3>
      </article>
    `;
  }

  private render(): string {
    const sidebarItems = sidebarNews.map((item) => this.renderSidebarItem(item)).join('');
    const sideCards = sideArticles.map((article) => this.renderSideCard(article)).join('');

    return `
      <main class="main">
        <div class="container">
          <section class="news-section" aria-label="Головні новини">

            <h2 class="news-section__title">ГЛАВНОЕ</h2>

            ${this.renderFeatured(featuredArticle)}

            <div class="news-side">${sideCards}</div>

            <aside class="news-sidebar" aria-label="Список новин">
              <ul class="news-sidebar__list">${sidebarItems}</ul>
            </aside>

            <a href="#" class="btn-more" aria-label="Більше новостей">
              Больше новостей
              ${Icons.arrowRight}
            </a>

          </section>
        </div>
      </main>
    `;
  }

  mount(parent: HTMLElement): void {
    parent.insertAdjacentHTML('beforeend', this.render());
  }
}
