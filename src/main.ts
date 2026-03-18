import './styles/main.scss';

import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { SecondaryNav } from './components/SecondaryNav';
import { TopicsBar } from './components/TopicsBar';
import { NewsSection } from './components/NewsSection';

const app = document.getElementById('app');

if (!app) {
  throw new Error('Root element #app not found');
}

new Header().mount(app);
new MobileNav().mount(app);
new SecondaryNav().mount(app);
new TopicsBar().mount(app);
new NewsSection().mount(app);
