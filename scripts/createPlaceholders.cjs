const fs = require('fs');
const path = require('path');

const placeholders = [
  // 2022
  { path: 'public/memories/2022/first-meeting.svg', title: 'The First Meeting', year: '2022', tag: 'DHA Photo' },
  { path: 'public/memories/2022/the-chocolate.svg', title: 'The Chocolate', year: '2022', tag: 'Memory Object: Chocolate' },
  { path: 'public/memories/2022/the-black-day.svg', title: 'The Black Day', year: '2022', tag: 'Quiet Memory' },
  { path: 'public/memories/2022/board-exams.svg', title: 'Board Exams', year: '2022', tag: 'School / Books' },

  // 2023
  { path: 'public/memories/2023/navratri-21-oct.svg', title: 'Navratri', year: '21 Oct 2023', tag: 'First Photos Together' },
  { path: 'public/memories/2023/the-next-day-22-oct.svg', title: 'The Next Day', year: '22 Oct 2023', tag: 'Navratri Photo' },
  { path: 'public/memories/2023/the-fall.svg', title: 'The Fall', year: 'Navratri 2023', tag: 'Garba / Water Bottle' },
  { path: 'public/memories/2023/5-am.svg', title: '5 AM', year: 'Navratri 2023', tag: 'Night Atmosphere' },
  { path: 'public/memories/2023/school-days.svg', title: 'School Days', year: '2023', tag: 'Ordinary School Memories' },
  { path: 'public/memories/2023/the-library.svg', title: 'The Library', year: '2023', tag: 'Library Period / Books' },
  { path: 'public/memories/2023/morning-walks.svg', title: 'Morning Walks', year: '2023', tag: 'Parking / Class Walk' },

  // 2024
  { path: 'public/memories/2024/raksha-bandhan.svg', title: 'Raksha Bandhan', year: '19 Aug 2024', tag: 'Washroom Run' },
  { path: 'public/memories/2024/navratri-2024.svg', title: 'Navratri 2024', year: '11 Oct 2024', tag: '3 Photos Clicked' },
  { path: 'public/memories/2024/the-crush.svg', title: 'The Crush', year: '2024', tag: 'After Practicals' },
  { path: 'public/memories/2024/a-new-direction.svg', title: 'A New Direction', year: '2024', tag: 'Diploma Life' },

  // 2025
  { path: 'public/memories/2025/coming-back.svg', title: 'Coming Back', year: '2025', tag: 'Instagram Calls' },
  { path: 'public/memories/2025/1-august.svg', title: '1 August', year: '1 Aug 2025', tag: 'Video Call Recording' },
  { path: 'public/memories/2025/come-anyway.svg', title: 'Come Anyway', year: 'Navratri 2025', tag: 'Surprise Arrival' },
  { path: 'public/memories/2025/the-hug.svg', title: 'The Hug', year: '27 Sep 2025', tag: 'Featured Navratri Memory' },
  { path: 'public/memories/2025/the-filter.svg', title: 'The Filter', year: '15 Dec 2025', tag: 'Snapchat Baby Filter' },
  { path: 'public/memories/2025/new-years-eve.svg', title: "New Year's Eve", year: '30 Dec 2025', tag: 'Dinner & Oval Park Waffles' },
  { path: 'public/memories/2026/1-january.svg', title: '1 January', year: '1 Jan 2026', tag: 'New Year Party Photos' },
  { path: 'public/memories/2026/makar-sankranti.svg', title: 'Makar Sankranti', year: '14 Jan 2026', tag: 'Oval Park Mirrors' },

  // 2026
  { path: 'public/memories/2026/another-beginning.svg', title: 'Another Beginning', year: 'March / April 2026', tag: 'College Conversations' },
  { path: 'public/memories/2026/college.svg', title: 'College', year: 'July 2026', tag: 'New Chapter' },
  { path: 'public/memories/2026/the-stories.svg', title: 'The Stories', year: 'July 2026', tag: 'Shared Moments' },
  { path: 'public/memories/2026/25-july.svg', title: '25 July', year: '25 July 2026', tag: 'Bus Ride Messages' },
  { path: 'public/memories/2026/the-outfit.svg', title: 'The Outfit', year: '29 July 2026', tag: 'Call Recommendation' },
  { path: 'public/memories/2026/when-i-needed-someone.svg', title: 'When I Needed Someone', year: '30 July 2026', tag: 'Quiet Reflection' }
];

function generateSvg(title, year, tag) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#181c26" />
      <stop offset="60%" stop-color="#0d1017" />
      <stop offset="100%" stop-color="#05070a" />
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.08 0" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.4" />

  <!-- Outer Film Border -->
  <rect x="40" y="40" width="1120" height="820" fill="none" stroke="rgba(212, 175, 55, 0.25)" stroke-width="1.5" />
  <rect x="52" y="52" width="1096" height="796" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />

  <!-- Corner Brackets -->
  <path d="M 60 90 L 60 60 L 90 60" fill="none" stroke="#d4af37" stroke-width="2" />
  <path d="M 1140 90 L 1140 60 L 1110 60" fill="none" stroke="#d4af37" stroke-width="2" />
  <path d="M 60 810 L 60 840 L 90 840" fill="none" stroke="#d4af37" stroke-width="2" />
  <path d="M 1140 810 L 1140 840 L 1110 840" fill="none" stroke="#d4af37" stroke-width="2" />

  <!-- Center Graphic: Camera Aperture Icon -->
  <g transform="translate(600, 360)">
    <circle r="64" fill="none" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1.5" />
    <circle r="48" fill="none" stroke="rgba(212, 175, 55, 0.6)" stroke-width="2" />
    <circle r="14" fill="#d4af37" opacity="0.8" />
  </g>

  <!-- Typography -->
  <text x="600" y="490" text-anchor="middle" font-family="'Cinzel', serif, Georgia" font-size="44" font-weight="700" fill="#ede8df" letter-spacing="4">
    ${title.toUpperCase()}
  </text>

  <text x="600" y="540" text-anchor="middle" font-family="'Space Grotesk', monospace, sans-serif" font-size="18" fill="#d4af37" letter-spacing="3">
    ${year.toUpperCase()} · ${tag.toUpperCase()}
  </text>

  <!-- Drop Hint Box -->
  <g transform="translate(600, 680)">
    <rect x="-240" y="-24" width="480" height="48" rx="24" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1" />
    <text x="0" y="6" text-anchor="middle" font-family="'Space Grotesk', monospace, sans-serif" font-size="14" fill="rgba(255, 255, 255, 0.5)" letter-spacing="2">
      PHOTO PLACEHOLDER · DROP REAL MEDIA HERE
    </text>
  </g>
</svg>`;
}

placeholders.forEach((item) => {
  const fullPath = path.resolve(item.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const svgContent = generateSvg(item.title, item.year, item.tag);
  fs.writeFileSync(fullPath, svgContent, 'utf-8');
});

console.log(`Generated ${placeholders.length} placeholder files successfully.`);
