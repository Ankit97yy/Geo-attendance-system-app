export default function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers

  // Convert latitudes and longitudes to radians

  const [rlat1, rlon1, rlat2, rlon2] = [lat1, lon1, lat2, lon2].map(
    (coord) => (coord * Math.PI) / 180
  );

  // Calculate the differences between latitudes and longitudes

  const dlat = rlat2 - rlat1;

  const dlon = rlon2 - rlon1;

  // Calculate the great-circle distance

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  const distance = R * c;

  return distance*1000;
}

// const centerLat = 26.138514; // San Francisco latitude

// const centerLon = 91.800410; // San Francisco longitude

// const radius = 200; // meter

// const checkLat = 26.120959; // A nearby latitude

// const checkLon = 91.805972; // A nearby longitude

// const distance = haversine(centerLat, centerLon, checkLat, checkLon);
// console.log("distance",distance)

// if (distance <= radius) {
//   console.log("The check position is within the radius.");
// } else {
//   console.log("The check position is outside the radius.");
// }
