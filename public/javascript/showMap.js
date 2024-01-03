mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: user.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat(user.geometry.coordinates)
  .setPopup(
      new mapboxgl.Popup({offset: 25})
      .setHTML(
          `<h3>${ user.location }</h3>`
      )
  )
  .addTo(map);