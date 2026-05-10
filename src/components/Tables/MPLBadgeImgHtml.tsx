function getMPLBadge(highestMPL: number) {
  let MPLBadge: string;
  if (highestMPL === 0) {
    MPLBadge = 'Rookie';
  } else if (highestMPL >= 1 && highestMPL <= 5) {
    MPLBadge = 'Bronze';
  } else if (highestMPL >= 6 && highestMPL <= 10) {
    MPLBadge = 'Silver';
  } else if (highestMPL >= 11 && highestMPL <= 15) {
    MPLBadge = 'Gold';
  } else if (highestMPL >= 16 && highestMPL <= 20) {
    MPLBadge = 'Platinum';
  } else if (highestMPL >= 21 && highestMPL <= 25) {
    MPLBadge = 'Emerald';
  } else if (highestMPL >= 26 && highestMPL <= 30) {
    MPLBadge = 'Diamond';
  } else if (highestMPL >= 31 && highestMPL <= 35) {
    MPLBadge = 'Champion';
  } else if (highestMPL >= 36 && highestMPL <= 39) {
    MPLBadge = 'Grand Champion';
  } else {
    MPLBadge = 'Ultimate Champion';
  }
  return MPLBadge;
}

export function MPLBadgeImgHtml({ highestMPL }: { highestMPL: number }) {
  // LOGIC
  // TEMPLATE
  return (
    <img
      className="m-auto"
      src={`/img/badges/${getMPLBadge(highestMPL)}.webp`}
      onError={(e) => {
        e.currentTarget.onerror = null; // évite une boucle infinie
        e.currentTarget.src = '/img/SuperCharge empty.webp';
      }}
    />
  );
}
