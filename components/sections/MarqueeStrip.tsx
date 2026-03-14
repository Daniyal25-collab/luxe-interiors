export default function MarqueeStrip() {
  const items = [
    'Living Rooms',
    '✦',
    'Bedrooms',
    '✦',
    'Kitchens',
    '✦',
    'Home Offices',
    '✦',
    'Commercial Spaces',
    '✦',
    '3D Visualisation',
    '✦',
    'Furniture Curation',
    '✦',
    'Complete Home Design',
    '✦',
  ];

  return (
    <div className="bg-charcoal-900 py-4 overflow-hidden border-y border-charcoal-700">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`inline-block px-4 font-body text-xs tracking-widest uppercase ${
              item === '✦' ? 'text-gold-400' : 'text-mink-300'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
