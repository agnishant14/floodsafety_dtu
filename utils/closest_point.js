function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    return distance;
  }
  
  // Function to find the closest point from a given point in an array of points
export  const  findClosestPoint = (givenPoint, pointsArray) => {
    console.log({pointsArray});
    let closestPoint = null;
    let minDistance = Number.MAX_VALUE;
  
    for (const point of pointsArray) {
      const distance = haversineDistance(givenPoint.lat, givenPoint.lon, point.lat, point.lon);
  
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }
  
    return closestPoint;
  }

