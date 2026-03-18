import { topics } from '../data/navigation';
import { Icons } from '../utils/icons';
import { escapeHtml } from '../utils/escapeHtml';

export class TopicsBar {
  private render(): string {
    const items = topics
      .map(
        (topic) => `
          <li>
            <a href="#" class="topic-tag">
              <span class="topic-tag__icon" aria-hidden="true">${Icons.bracketLeft}${Icons.exclamation}${Icons.bracketRight}</span>
              ${escapeHtml(topic)}
            </a>
          </li>
        `
      )
      .join('');

    return `
      <div class="topics-bar" role="complementary" aria-label="Популярні теми">
        <div class="topics-bar__inner container">
          <ul class="topics-bar__list">${items}</ul>
        </div>
      </div>
    `;
  }

  mount(parent: HTMLElement): void {
    parent.insertAdjacentHTML('beforeend', this.render());
  }
}
