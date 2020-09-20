mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9obm1pY2hhZWxidXRsZXIiLCJhIjoiY2s2c2luaW5oMGg0NjNkbGxxcXQ2YXF1byJ9.g4GW13LL4OmhP1kUJWGYaQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-97.696103, 26.190631],
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    }
  });
  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.loadImage('/placeholder.png', (error, image) => {
    if (error) throw error;
    map.addImage('marker', image);
    map.on("load", () => {
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point",
        layout: {
          "icon-image": 'marker',
          "icon-size": 1.5,
          'text-field': '{storeId}',
          // 'text-font': ['Open Sand Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        },
      });
    }
  );
});
};

getStores();