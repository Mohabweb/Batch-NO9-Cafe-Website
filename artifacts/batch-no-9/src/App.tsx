import { useRef, useState, type ReactNode, type TouchEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Link, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Menu as MenuIcon, Search, X, Phone, Coffee } from 'lucide-react';
import logo from '@assets/batch-no-9-logo.jpg';
import duo from '@assets/cappuccino-brownie-duo.webp';
import cloud9 from '@assets/generated_images/batch-no9-cloud-9-product.webp';
import pistachioDrink from '@assets/generated_images/batch-no9-cloud-pistachio.webp';
import spanishLatte from '@assets/generated_images/batch-no9-spanish-latte.webp';
import tiramisuLatte from '@assets/generated_images/batch-no9-tiramisu-latte.webp';
import matchaLatte from '@assets/generated_images/batch-no9-matcha-latte.webp';
import counter from '@assets/cafe-counter.jpg';
import art from '@assets/cafe-wall-art.jpg';
import table from '@assets/cafe-table.jpg';
import storefront from '@assets/cafe-storefront.jpg';
import windowPhoto from '@assets/cafe-window.jpg';
import { useEffect } from 'react';

const queryClient = new QueryClient();
const TALABAT = 'https://www.talabat.com/egypt/restaurant/1123136/batch-no9?aid=7073';
const PHONE = 'tel:+201106167614';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Batch+NO.9+Stanley+Alexandria';
const socials = [
  { label: 'Instagram', short: 'IG', url: 'https://www.instagram.com/batchno.9_' },
  { label: 'TikTok', short: 'TT', url: 'https://www.tiktok.com/@batchno.9_' },
  { label: 'Facebook', short: 'f', url: 'https://www.facebook.com/profile.php?id=61593493855636' },
];
const nav = [{ label: 'Home', href: '/' }, { label: 'Menu', href: '/menu' }, { label: 'Beans', href: '/beans' }, { label: 'Visit', href: '/visit' }];

type Item = { name: string; desc: string; price: number; served?: ('Hot' | 'Iced')[]; badge?: string };
type SectionData = { title: string; items: Item[] };
const menuData: SectionData[] = [
  { title: 'Coffee Classics', items: [
    { name: 'Espresso', desc: 'Double shot, pure and bold', price: 89, served: ['Hot'] },
    { name: 'Espresso Macchiato', desc: 'Double espresso with milk foam', price: 95, served: ['Hot'], badge: 'B · Brazil' },
    { name: 'Piccolo', desc: 'Double espresso with milk and microfoam', price: 105, served: ['Hot'] },
    { name: 'Cortado', desc: 'Double espresso with equal milk', price: 109, served: ['Hot'] },
    { name: 'Americano', desc: 'Double espresso with hot water', price: 99, served: ['Hot', 'Iced'], badge: 'B · Brazil' },
    { name: 'Flat White', desc: 'Double espresso with silky steamed milk', price: 149, served: ['Hot'] },
    { name: 'Cappuccino', desc: 'Double espresso with frothed milk', price: 129, served: ['Hot'] },
    { name: 'Latte', desc: 'Double espresso with creamy steamed milk', price: 135, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
    { name: 'Mocha', desc: 'Choose dark or white chocolate', price: 159, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
  ] },
  { title: 'Coffee Creations', items: [
    { name: 'Cloud 9 Latte', desc: 'Espresso, vanilla bean, silky milk foam cloud', price: 169, served: ['Iced'], badge: 'C · Colombia' },
    { name: 'Cloud Pistachio Latte', desc: 'Espresso, pistachio cream, smooth milk', price: 209, served: ['Iced'], badge: 'C · Colombia' },
    { name: 'Spanish Latte', desc: 'Espresso, condensed milk, steamed milk', price: 169, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
    { name: 'Caramel Macchiato', desc: 'Double espresso with vanilla and caramel, frothy milk', price: 169, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
    { name: 'Tiramisu Iced Latte', desc: 'Espresso, mascarpone cream, cocoa dust', price: 169, served: ['Iced'], badge: 'C · Colombia' },
    { name: 'Cream Brulee', desc: 'A rich creamy blend of vanilla, caramel and milk flavors', price: 179, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
    { name: 'Banana Bread Latte', desc: 'Espresso and steamed milk with caramelized banana, warm spices, cinnamon', price: 169, served: ['Hot', 'Iced'], badge: 'C · Colombia' },
    { name: 'Affogato Pistachio', desc: 'Pistachio ice cream', price: 199, served: ['Iced'] },
  ] },
  { title: 'Pour-Over & Specialty', items: [
    { name: 'V60 Pour Over', desc: 'Clean, aromatic single-origin coffee', price: 160 },
    { name: 'Chemex', desc: 'Smooth, rich single-origin coffee', price: 160 },
    { name: 'Aeropress', desc: 'Bold aromatic extraction', price: 170 },
    { name: 'Classic Cold Brew', desc: 'Smooth and refreshing', price: 169, served: ['Iced'] },
    { name: 'Fruity Cold Brew', desc: 'Cold brew with a fruit twist', price: 219, served: ['Iced'] },
    { name: 'Choose your bean', desc: 'Ethiopia +79 · Yemen +99 · Brazil +10 · Colombia +0', price: 0 },
  ] },
  { title: 'Matcha & Chocolate', items: [
    { name: 'Matcha Latte', desc: 'Ceremonial matcha, milk', price: 129, served: ['Hot', 'Iced'] },
    { name: 'Spanish Matcha Latte', desc: 'Ceremonial matcha, condensed and steamed milk', price: 139, served: ['Hot', 'Iced'] },
    { name: 'Cloud Coconut Matcha Latte', desc: 'Ceremonial matcha, water coconut, organic honey', price: 149, served: ['Iced'] },
    { name: 'Cloud Rose Matcha Latte', desc: 'Ceremonial matcha, milk, rose flavor', price: 159, served: ['Iced'] },
    { name: 'Strawberry Matcha Latte', desc: 'Ceremonial matcha, milk, fresh strawberry puree', price: 159, served: ['Iced'] },
    { name: 'Matcha Chocolate', desc: 'Smooth, earthy matcha', price: 179, served: ['Iced'] },
    { name: 'Chocolate Coconut', desc: 'Delicious milk and chocolate', price: 129, served: ['Iced'] },
    { name: 'Hot Chocolate', desc: 'Delicious milk and chocolate', price: 139, served: ['Hot'] },
  ] },
  { title: 'Alternatives & Non-Coffee', items: [
    { name: 'Hibiscus Cooler', desc: 'Fruity iced tea', price: 99, served: ['Iced'] },
    { name: 'Cloud Berry Hibiscus', desc: 'Fruity, vanilla bean, silky foam cloud', price: 119, served: ['Iced'] },
    { name: 'Iced Tea', desc: 'Tropical and refreshing', price: 109, served: ['Iced'] },
    { name: 'Cherry Lemon', desc: 'Refreshing lemon with cherry flavor', price: 160, served: ['Iced'] },
    { name: 'Cloud Lemonade', desc: 'Lemon and mint, refreshing iced drink', price: 150, served: ['Iced'] },
    { name: 'Mojito', desc: '7up, lemon slice and mint', price: 139, served: ['Iced'] },
    { name: 'Mojito Redbull', desc: 'Red Bull, lemon slice and mint', price: 199, served: ['Iced'] },
  ] },
  { title: 'Blended & Frozen', items: [
    { name: 'Mocha Frappe', desc: 'Chocolatey blended coffee', price: 165, served: ['Iced'] },
    { name: 'Cookies & Cream Frappe', desc: 'Creamy, indulgent', price: 179, served: ['Iced'] },
    { name: 'Frappe', desc: 'Blended coffee', price: 149, served: ['Iced'] },
    { name: 'Protein Peanut Butter', desc: 'Blended powder', price: 220, served: ['Iced'] },
  ] },
  { title: 'Soft Drinks & Extras', items: [
    { name: 'Fresh Juice', desc: 'Ask about available options', price: 89 },
    { name: 'Still Water', desc: '', price: 39 },
    { name: 'Sparkling Water', desc: '', price: 99 },
    { name: 'Ginger Shot', desc: '', price: 90 },
    { name: 'Extra Espresso Shot', desc: '', price: 80 },
    { name: 'Extra Whipped Cream / Syrup / Puree', desc: '', price: 40 },
    { name: 'Special Milk Option', desc: 'Oat, Almond, Coconut, Lactose-Free', price: 40 },
  ] },
  { title: 'Deli', items: [
    { name: 'Cali Avo Chicken', desc: 'Deli Toasts', price: 229 },
    { name: 'Turkey Clubhouse', desc: 'Deli Toasts', price: 229 },
    { name: 'Tuna Diablo', desc: 'Panini Press', price: 199 },
    { name: 'The Deli Stack', desc: 'Panini Press', price: 179 },
    { name: 'Halloumi Verde', desc: 'Bagels', price: 169 },
    { name: 'Roasted Beef & Truffle', desc: 'Bagels', price: 179 },
    { name: 'Cali Chicken Salad', desc: 'Fresh Salads', price: 199 },
    { name: 'Honey Turkey Harvest', desc: 'Fresh Salads', price: 219 },
    { name: 'Caesar Supreme', desc: 'Fresh Salads', price: 189 },
    { name: 'Mediterranean Quinoa Bowl', desc: 'Fresh Salads', price: 199 },
  ] },
];
const origins = [
  { name: 'Colombia', region: 'Huila', notes: 'Plum, sugarcane, chocolate', profile: 'Orange acidity · Medium creamy body', color: '#2DB36B', x: 30, y: 45 },
  { name: 'Brazil', region: 'Minas Gerais', notes: 'Dried fruits, caramel, almond, chocolate', profile: 'Medium sweetness · Smooth creamy body', color: '#F4883E', x: 35, y: 67 },
  { name: 'Ethiopia', region: 'Guji Hambella', notes: 'Floral, red plum, tangerine, red grapes, vanilla', profile: 'Bright acidity · Smooth texture', color: '#3E63B0', x: 55, y: 46 },
  { name: 'Yemen', region: 'Haraz', notes: 'Lychee, purple grapes, peach, strawberry, mandarin, sugarcane', profile: 'Complex acidity · Medium body', color: '#8B4FA8', x: 59, y: 52 },
  { name: 'Kenya', region: 'Nyeri', notes: 'Tangerine, peach, apricot, raspberry, honey', profile: 'Juicy acidity · Vibrant body', color: '#A8B52C', x: 58, y: 62 },
];
const slides = [
  { name: 'Cloud 9 Latte', tag: 'A little cloud, a lot of comfort', art: 'cloud', image: cloud9, alt: 'Cloud 9 Latte in a clear Batch NO.9 bottle' },
  { name: 'Cloud Pistachio Latte', tag: 'Pistachio, espresso, soft foam', art: 'pistachio', image: pistachioDrink, alt: 'Iced Cloud Pistachio Latte in a clear bottle' },
  { name: 'Spanish Latte', tag: 'Sweet, smooth and made to linger', art: 'spanish', image: spanishLatte, alt: 'Iced Spanish Latte in a clear bottle' },
  { name: 'Tiramisu Iced Latte', tag: 'Coffee break meets dessert', art: 'tiramisu', image: tiramisuLatte, alt: 'Tiramisu Iced Latte with creamy foam in a clear bottle' },
  { name: 'Matcha Latte', tag: 'Ceremonial matcha, your way', art: 'matcha', image: matchaLatte, alt: 'Iced Matcha Latte in a clear bottle' },
  { name: 'Brownie + Cappuccino', tag: 'A duo that never disappoints', image: duo, alt: 'Cappuccino and chocolate brownie at Batch NO.9' },
];

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  return <>
    <header className="topbar">
      <Link href="/" className="brand-lockup" aria-label="Batch NO.9 home" onClick={() => setOpen(false)}>
        <img src={logo} alt="Batch NO.9 logo" /><span className="brand-word">Batch NO.9</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {nav.map(n => <Link key={n.href} href={n.href} className={path === n.href ? 'active' : ''}>{n.label}</Link>)}
      </nav>
      <a className="order-pill" href={TALABAT} target="_blank" rel="noreferrer">Order online <ArrowUpRight size={15} /></a>
      <button className="mobile-menu-btn" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X /> : <MenuIcon />}</button>
    </header>
    {open && <div className="mobile-overlay">
      <span className="eyebrow">Deli • Coffee • Dessert</span>
      {nav.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
      <a href={TALABAT} className="button button-light" target="_blank" rel="noreferrer">Order on Talabat <ArrowUpRight size={16} /></a>
    </div>}
    <nav className="mobile-tabs" aria-label="Quick navigation">{nav.map((n, i) => <Link key={n.href} href={n.href} className={path === n.href ? 'active' : ''}><span>{['⌂', '≡', '◌', '⌖'][i]}</span>{n.label}</Link>)}</nav>
  </>;
}

function Footer() {
  return <footer className="site-footer">
    <Link href="/" className="footer-brand">Batch NO.9</Link>
    <span>Stanley, Alexandria · Hours: 7:00 AM–12:00 AM</span>
    <a href={PHONE}><Phone size={13} /> 011 06167614</a>
    <div className="social-row">{socials.map(s => <a className="social-link" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} key={s.label}>{s.short}</a>)}</div>
    <span>© Batch NO.9 · Prices exclude tax.</span>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function Home() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const step = (n: number) => setActive(i => (i + n + slides.length) % slides.length);
  const onTouchStart = (e: TouchEvent<HTMLElement>) => { touchStart.current = e.touches[0]?.clientX ?? null; };
  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };
  const slide = slides[active];
  return <Shell>
    <section className="hero-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-label="Featured drinks">
      <div className="hero-copy">
        <span className="eyebrow">Deli • Coffee • Dessert</span>
        <h1 className="display">Every batch,<span>made with care.</span></h1>
        <p>Specialty coffee, fresh deli and desserts in the heart of Alexandria.</p>
        <div className="hero-actions"><Link className="button button-light" href="/menu">View menu <ArrowDownRight size={16} /></Link><Link className="button button-glass" href="/visit">Find us <MapPin size={15} /></Link></div>
        <span className="hero-count">{String(active + 1).padStart(2, '0')} / 06</span>
      </div>
      <div className={`hero-art ${slide.art ? `drink-art drink-art--${slide.art}` : 'hero-art--photo'}`}>
        <img key={slide.image} src={slide.image} alt={slide.alt} />
        <div className="hero-controls">
        <button className="round-control" onClick={() => step(-1)} aria-label="Previous featured item" data-testid="button-slide-previous"><ArrowLeft size={18} /></button>
        <button className="round-control" onClick={() => step(1)} aria-label="Next featured item" data-testid="button-slide-next"><ArrowRight size={18} /></button>
      </div></div>
      <div className="hero-label" aria-live="polite">{slide.name}</div>
    </section>
    <section className="section">
      <div className="duo-feature">
        <div className="duo-image"><img src={duo} alt="Cappuccino and chocolate brownie, the Batch NO.9 duo" loading="lazy" /></div>
        <div className="duo-copy"><span className="eyebrow">The little things</span><h2 className="display">A duo that never disappoints.</h2><p>Creamy cappuccino, rich chocolate brownie. A good coffee break has a way of becoming your favorite part of the day.</p><Link href="/menu" className="button button-red">Find your favorite <ArrowRight size={16} /></Link></div>
      </div>
    </section>
    <section className="section">
      <div className="section-head"><div><span className="eyebrow">Made for your kind of day</span><h2 className="display">Pick your pleasure.</h2></div><p>Come for one thing. Stay for another. There is always a good reason to stop by.</p></div>
      <div className="tile-grid">
        <Link href="/menu#coffee-classics" className="category-tile"><span className="eyebrow">01 · Coffee</span><div><h3>Made your way.</h3><p>100% Arabica, single-origin beans, brewed your way.</p></div><ArrowUpRight className="tile-arrow" /></Link>
        <Link href="/menu#deli" className="category-tile"><span className="eyebrow">02 · Deli</span><div><h3>Fresh from the press.</h3><p>Toasts, paninis, bagels and fresh salads, made to order.</p></div><ArrowUpRight className="tile-arrow" /></Link>
        <Link href="/menu#coffee-creations" className="category-tile"><span className="eyebrow">03 · Sweet things</span><div><h3>A little extra.</h3><p>Dessert lattes, matcha and something sweet for later.</p></div><ArrowUpRight className="tile-arrow" /></Link>
      </div>
    </section>
    <section className="section origin-teaser">
      <div><span className="eyebrow">Good coffee has a place of origin</span><h2 className="display">Five origins.<br />One good cup.</h2><p>From Colombia to Kenya, every bean has its own story. Explore our single origins and find the notes you love.</p><Link className="button button-light" href="/beans">Meet the origins <ArrowRight size={15} /></Link></div>
      <div className="origin-dots" role="img" aria-label="Dotted map showing our coffee bean origins" />
    </section>
    <section className="section visit-strip">
      <div><span className="eyebrow">Your table is waiting</span><h3>Find us in Stanley, Alexandria.</h3><span>Hours: 7:00 AM–12:00 AM</span></div>
      <div className="hero-actions"><a href={MAPS} target="_blank" rel="noreferrer" className="button button-red">Open in maps <ArrowUpRight size={15} /></a><SocialLinks /></div>
    </section>
  </Shell>;
}

function SocialLinks() {
  return <div className="social-row">{socials.map(s => <a key={s.label} className="social-link" href={s.url} target="_blank" rel="noreferrer" aria-label={`Visit Batch NO.9 on ${s.label}`}>{s.short}</a>)}</div>;
}

function MenuPage() {
  const [location] = useLocation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Hot' | 'Iced'>('All');
  const [category, setCategory] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const cats = menuData.map(s => s.title);
  const normalized = query.trim().toLowerCase();
  const filtered = menuData.map(section => ({ ...section, items: section.items.filter(item => {
    const matches = !normalized || `${item.name} ${item.desc} ${section.title}`.toLowerCase().includes(normalized);
    const serves = !item.served || filter === 'All' || item.served.includes(filter);
    return matches && serves;
  }) })).filter(s => s.items.length);
  const goTo = (title: string) => {
    setCategory(title);
    sectionRefs.current[title]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const target = menuData.find(section => section.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-') === slug);
    if (!target) return;
    setCategory(target.title);
    const timer = window.setTimeout(() => sectionRefs.current[target.title]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    return () => window.clearTimeout(timer);
  }, [location]);
  return <Shell>
    <section className="page-hero"><span className="eyebrow">A little something for everyone</span><h1 className="display">The menu.</h1><p>Coffee for slow mornings, deli favorites for hungry afternoons, and sweet things for whenever you need them. Prices are in EGP and exclude tax.</p><a className="button button-light" href={TALABAT} target="_blank" rel="noreferrer">Order on Talabat <ArrowUpRight size={16} /></a></section>
    <div className="menu-legend"><span><strong>Decaf:</strong> available on espresso and milk drinks</span><span><strong>Milk:</strong> Whole, Oat, Almond, Coconut, Lactose-Free</span><span>Prices exclude tax</span></div>
    <div className="menu-tools">
      <div className="search-line"><label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find something delicious..." aria-label="Search menu" data-testid="input-menu-search" />{query && <button onClick={() => setQuery('')} aria-label="Clear search" style={{ border: 0, background: 'none', cursor: 'pointer' }}><X size={16} /></button>}</label>
        <div className="filters" aria-label="Filter menu by temperature">{(['All', 'Hot', 'Iced'] as const).map(f => <button key={f} className={`filter-btn ${filter === f ? 'selected' : ''}`} onClick={() => setFilter(f)} aria-pressed={filter === f} data-testid={`filter-${f.toLowerCase()}`}>{f}</button>)}</div>
      </div>
      <nav className="chips" aria-label="Menu categories">{cats.map(title => <button key={title} onClick={() => goTo(title)} className={`chip ${category === title ? 'selected' : ''}`} data-testid={`category-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>{title}</button>)}</nav>
    </div>
    <div className="menu-content">
      {filtered.length ? filtered.map(section => <section className="menu-section" id={section.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')} key={section.title} ref={el => { sectionRefs.current[section.title] = el; }}>
        <h2>{section.title}</h2>
        {section.items.map(item => <article key={item.name} className="menu-item" data-testid={`menu-item-${item.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
          <div><div className="item-title">{item.name}</div>{item.desc && <div className="item-desc">{item.desc}</div>}</div>
          <div className="item-price">{item.price ? `${item.price} EGP` : 'Add-on'}</div>
          <div className="item-tags">{item.served?.map(temp => <span className="tag" key={temp}>{temp === 'Hot' ? 'HOT' : 'ICED'}</span>)}{item.badge && <span className="tag bean-tag">{item.badge}</span>}{/decaf|espresso|milk/i.test(item.name) && <span className="tag">Decaf available</span>}</div>
        </article>)}
      </section>) : <div className="empty-result"><Coffee size={26} /><h2 className="display">Nothing on the tray yet.</h2><p>Try another search or clear the temperature filter.</p><button className="button button-red" onClick={() => { setQuery(''); setFilter('All'); }}>Show all items</button></div>}
      <p style={{ textAlign: 'center', padding: '14px 0 40px', color: '#76594c', fontSize: 12 }}>Ask us about seasonal items and today's fresh juice.</p>
    </div>
  </Shell>;
}

function BeansPage() {
  const [selected, setSelected] = useState(0);
  const bean = origins[selected];
  return <Shell>
    <section className="page-hero"><span className="eyebrow">Coffee Beans · Map & Tasting Notes</span><h1 className="display">The world in<br />your cup.</h1><p>All our beans are 100% Arabica. Choose an origin to explore its flavor notes and find the cup that sounds like you.</p></section>
    <section className="origin-layout">
      <div className="map-panel" role="group" aria-label="Interactive origin map. Select a coffee origin."><div className="map-land" /><div className="map-title">Our coffee origins</div>
        {origins.map((origin, i) => <button key={origin.name} style={{ left: `${origin.x}%`, top: `${origin.y}%`, borderColor: origin.color }} className={`map-pin ${selected === i ? 'selected' : ''}`} aria-pressed={selected === i} onClick={() => setSelected(i)} data-testid={`origin-pin-${origin.name.toLowerCase()}`}>{origin.name}</button>)}
      </div>
      <article className="origin-card" aria-live="polite">
        <span className="eyebrow">Origin 0{selected + 1} · 05</span><h2>{bean.name}</h2><span className="region">{bean.region}</span>
        <p className="notes">{bean.notes}</p><span className="profile-pill">{bean.profile}</span>
        <div className="origin-tabs" aria-label="Select coffee origin">{origins.map((o, i) => <button key={o.name} className={`origin-tab ${i === selected ? 'selected' : ''}`} onClick={() => setSelected(i)} aria-pressed={i === selected} data-testid={`select-origin-${o.name.toLowerCase()}`}>{o.name}</button>)}</div>
      </article>
    </section>
    <section className="brew-lanes" aria-label="Our coffee brew lanes">
      <article><span className="eyebrow">01 · The familiar</span><h3>Classics</h3><p>Brazil beans bring a smooth, comforting base to our classic espresso drinks.</p></article>
      <article><span className="eyebrow">02 · Soft & silky</span><h3>Milk-based</h3><p>Colombia's plum, sugarcane and chocolate notes shine through in milk drinks.</p></article>
      <article><span className="eyebrow">03 · A new story</span><h3>Pour-over</h3><p>Rotating premium single origins let you explore new flavors, one cup at a time.</p></article>
    </section>
  </Shell>;
}

function VisitPage() {
  return <Shell>
    <section className="page-hero"><span className="eyebrow">Come by for a while</span><h1 className="display">See you in<br />Stanley.</h1><p>Good coffee, something fresh from the deli, and a cozy spot in Alexandria. We would love to see you.</p><a href={MAPS} target="_blank" rel="noreferrer" className="button button-light">Get directions <ArrowUpRight size={16} /></a></section>
    <section className="visit-layout">
      <article className="visit-card"><span className="eyebrow">Come find us</span><h2>Batch NO.9<br />Stanley Branch</h2>
        <div className="visit-detail"><strong><MapPin size={15} /> Location</strong><span>Stanley, Alexandria, Egypt</span></div>
        <div className="visit-detail"><strong>Hours</strong><span>7:00 AM–12:00 AM</span></div>
        <div className="visit-detail"><strong><Phone size={15} /> Call us</strong><a href={PHONE}>011 06167614</a></div>
        <div className="hero-actions"><a className="button button-light" href={MAPS} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={16} /></a><a className="button button-glass" href={PHONE}>Call the cafe <Phone size={15} /></a></div>
      </article>
      <article className="visit-card light"><span className="eyebrow">Follow along</span><h2>A little more Batch.</h2><p>See what is brewing, fresh from the deli, and all the good things coming out of our Stanley cafe.</p><SocialLinks /><div className="visit-detail"><strong>Instagram & TikTok</strong><span>@batchno.9_</span></div><div className="visit-detail"><strong>Facebook</strong><span>@Batch no.9</span></div><a href={TALABAT} target="_blank" rel="noreferrer" className="button button-red">Order online <ArrowUpRight size={16} /></a></article>
    </section>
    <section className="section"><div className="section-head"><div><span className="eyebrow">A seat with a view</span><h2 className="display">Make yourself at home.</h2></div><p>Find us by the sea in Stanley. Call if you need a hand finding your way.</p></div>
      <div className="photo-grid"><img src={windowPhoto} alt="Window seating at Batch NO.9 with the Stanley seafront outside" loading="lazy" /><img src={storefront} alt="Batch NO.9 Stanley storefront" loading="lazy" /><img src={counter} alt="Coffee and deli counter at Batch NO.9" loading="lazy" /><img src={art} alt="Colorful Batch NO.9 cafe wall art" loading="lazy" /><img src={table} alt="Cozy seating inside Batch NO.9" loading="lazy" /></div>
    </section>
  </Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} /><Route path="/menu" component={MenuPage} /><Route path="/beans" component={BeansPage} /><Route path="/visit" component={VisitPage} /><Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Batch NO.9 Coffee, Deli & Dessert | Alexandria',
    description: 'Visit Batch NO.9 in Stanley, Alexandria for specialty coffee, fresh deli food, and desserts. Explore the menu, discover our coffee origins, and find us.',
  },
  '/menu': {
    title: 'Coffee, Deli & Dessert Menu | Batch NO.9 Alexandria',
    description: 'Explore coffee, matcha, cold drinks, deli sandwiches, salads, and desserts at Batch NO.9 in Stanley, Alexandria. Prices are in EGP and exclude tax.',
  },
  '/beans': {
    title: 'Single-Origin Coffee Beans | Batch NO.9 Alexandria',
    description: 'Explore five 100% Arabica coffee origins at Batch NO.9 in Stanley, Alexandria, with their growing regions, tasting notes, acidity, and body.',
  },
  '/visit': {
    title: 'Visit Batch NO.9 in Stanley, Alexandria | Cafe',
    description: 'Visit Batch NO.9 in Stanley, Alexandria, from 7:00 AM to 12:00 AM for specialty coffee, deli favorites, and dessert.',
  },
};

function SeoManager() {
  const [location] = useLocation();
  useEffect(() => {
    const path = location.split(/[?#]/, 1)[0] || '/';
    const page = pageMetadata[path] ?? pageMetadata['/'];
    const url = new URL(path, window.location.origin).toString();
    const imageUrl = new URL('/batch-no-9-og.webp', window.location.origin).toString();

    document.title = page.title;
    const updateMeta = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    };
    updateMeta('meta[name="description"]', page.description);
    updateMeta('meta[property="og:title"]', page.title);
    updateMeta('meta[property="og:description"]', page.description);
    updateMeta('meta[property="og:url"]', url);
    updateMeta('meta[property="og:image"]', imageUrl);
    updateMeta('meta[name="twitter:title"]', page.title);
    updateMeta('meta[name="twitter:description"]', page.description);
    updateMeta('meta[name="twitter:image"]', imageUrl);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = url;
  }, [location]);
  return null;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><SeoManager /><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;