export const colorMap = {
  Novice: '#BA6CF8',
  Adept: '#8B78F5',
  Pathfinder: '#6481F2',
  Strategist: '#659FE6',
  Mentor: '#67BDDA',
  Apex: '#6BE2CA',
};
export const getWiseTag = (value) => {
  // Novice(<20K)
  // Adept(20-50K)
  // Pathfinder(50-200K)
  // Strategist(200-500K)
  // Mentor(500K-1M)
  // Apex(>=1M)
  if (value < 20000) {
    return 'Novice';
  } else if (value < 50000) {
    return 'Adept';
  } else if (value < 200000) {
    return 'Pathfinder';
  } else if (value < 500000) {
    return 'Strategist';
  } else if (value < 1000000) {
    return 'Mentor';
  } else {
    return 'Apex';
  }
};

export default function WiseTag({ value, className }) {
  const wiseTag = getWiseTag(value);
  return (
    <span className={className} style={{ color: colorMap[wiseTag] }}>
      {wiseTag}
    </span>
  );
}
