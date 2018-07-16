var map, balaidesaSearch = [], desalongsorkpSearch = [], desalongsorgkSearch = [], desalongsorbtlSearch = [], admindusunSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(adminkab.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return true;
});

$("#kulonprogo-extent-btn").click(function() {
  map.fitBounds(desalongsorkp.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return true;
});

$("#gunungkidul-extent-btn").click(function() {
  map.fitBounds(desalongsorgk.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return true;
});

$("#bantul-extent-btn").click(function() {
  map.fitBounds(desalongsorbtl.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return true;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

/* Basemap Layers */
var basemap0 = L.tileLayer(osmurl, {
    attribution: '&copy;Open Street Map'
});
var basemap1 = L.tileLayer(googlestreetsurl,{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy;Google Streets'
});
var basemap2 = L.tileLayer(googlesatelliteurl,{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy;Google Satellite'
});
var basemap3 = L.tileLayer(googleterrainurl,{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '&copy;Google Terrain'
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

/* Map Center */
map = L.map("map", {
  zoom: 10,
  center: [-7.9,110.4],
  layers: [basemap3, highlight],
  zoomControl: false,
});

var desalongsorkp = L.geoJson(desalongsorkpgeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "black",
      opacity: 1,
      weight: 0.5,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    desalongsorkpSearch.push({
      name: layer.feature.properties.DESA,
      address1: layer.feature.properties.KECAMATAN,
      address2: layer.feature.properties.KABUPATEN,
      source: "DesaLongsorKp",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Desa</th><td>" + feature.properties.DESA + "</td></tr>" + "<tr><th>Kecamatan</th><td>" + feature.properties.KECAMATAN + "</td></tr>" + "<tr><th>Kabupaten</th><td>" + feature.properties.KABUPATEN + "</td></tr>" + "<tr><th>Jumlah Penduduk Laki-laki</th><td>" + feature.properties.Laki_laki + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Perempuan</th><td>" + feature.properties.Perempuan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk</th><td>" + feature.properties.Penduduk + " Jiwa</td></tr>" + "<tr><th>Kepadatan Penduduk</th><td>" + feature.properties.Kpdt_Pdd + " Jiwa/Km<sup>2</sup></td></tr>" + "<tr><th>Jumlah Penduduk <15 Tahun</th><td>" + feature.properties.Kurang_15 + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk >60 Tahun</th><td>" + feature.properties.Lebih_60 + " Jiwa</td></tr>" + "<tr><th>Jumlah Kelompok Rentan</th><td>" + feature.properties.Usia_Rentan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Lulus Perguruan Tinggi</th><td>" + feature.properties.Lulus_PT + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian PNS/Pegawai</th><td>" + feature.properties.PNS_Pegawai + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian Petani dan Pekebun</th><td>" + feature.properties.Petani_Pekebun + " Jiwa</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Desa " + feature.properties.DESA);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        },
        mouseover: function (e) {
          var layer = e.target;
          layer.setStyle({
            weight: 3,
            color: "#00FFFF",
            opacity: 1
          });
          desalongsorkp.bindTooltip("Desa " + feature.properties.DESA + ", Kec. " + feature.properties.KECAMATAN);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
        },
        mouseout: function (e) {
          desalongsorkp.resetStyle(e.target);
        }
      });
    }
  }
});
map.addLayer(desalongsorkp);
$.getJSON(desalongsorkpgeojson, function (data) {
  desalongsorkp.addData(data);
});

var desalongsorgk = L.geoJson(desalongsorgkgeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "black",
      opacity: 1,
      weight: 0.5,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    desalongsorgkSearch.push({
      name: layer.feature.properties.DESA,
      address1: layer.feature.properties.KECAMATAN,
      address2: layer.feature.properties.KABUPATEN,
      source: "DesaLongsorGk",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Desa</th><td>" + feature.properties.DESA + "</td></tr>" + "<tr><th>Kecamatan</th><td>" + feature.properties.KECAMATAN + "</td></tr>" + "<tr><th>Kabupaten</th><td>" + feature.properties.KABUPATEN + "</td></tr>" + "<tr><th>Jumlah Penduduk Laki-laki</th><td>" + feature.properties.Laki_laki + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Perempuan</th><td>" + feature.properties.Perempuan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk</th><td>" + feature.properties.Penduduk + " Jiwa</td></tr>" + "<tr><th>Kepadatan Penduduk</th><td>" + feature.properties.Kpdt_Pdd + " Jiwa/Km<sup>2</sup></td></tr>" + "<tr><th>Jumlah Penduduk <15 Tahun</th><td>" + feature.properties.Kurang_15 + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk >60 Tahun</th><td>" + feature.properties.Lebih_60 + " Jiwa</td></tr>" + "<tr><th>Jumlah Kelompok Rentan</th><td>" + feature.properties.Usia_Rentan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Lulus Perguruan Tinggi</th><td>" + feature.properties.Lulus_PT + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian PNS/Pegawai</th><td>" + feature.properties.PNS_Pegawai + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian Petani dan Pekebun</th><td>" + feature.properties.Petani_Pekebun + " Jiwa</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Desa " + feature.properties.DESA);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        },
        mouseover: function (e) {
          var layer = e.target;
          layer.setStyle({
            weight: 3,
            color: "#00FFFF",
            opacity: 1
          });
          desalongsorgk.bindTooltip("Desa " + feature.properties.DESA + ", Kec. " + feature.properties.KECAMATAN);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
        },
        mouseout: function (e) {
          desalongsorgk.resetStyle(e.target);
        }
      });
    }
  }
});
map.addLayer(desalongsorgk);
$.getJSON(desalongsorgkgeojson, function (data) {
  desalongsorgk.addData(data);
});

var desalongsorbtl = L.geoJson(desalongsorbtlgeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "black",
      opacity: 1,
      weight: 0.5,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    desalongsorbtlSearch.push({
      name: layer.feature.properties.DESA,
      address1: layer.feature.properties.KECAMATAN,
      address2: layer.feature.properties.KABUPATEN,
      source: "DesaLongsorBtl",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Desa</th><td>" + feature.properties.DESA + "</td></tr>" + "<tr><th>Kecamatan</th><td>" + feature.properties.KECAMATAN + "</td></tr>" + "<tr><th>Kabupaten</th><td>" + feature.properties.KABUPATEN + "</td></tr>" + "<tr><th>Jumlah Penduduk Laki-laki</th><td>" + feature.properties.Laki_laki + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Perempuan</th><td>" + feature.properties.Perempuan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk</th><td>" + feature.properties.Penduduk + " Jiwa</td></tr>" + "<tr><th>Kepadatan Penduduk</th><td>" + feature.properties.Kpdt_Pdd + " Jiwa/Km<sup>2</sup></td></tr>" + "<tr><th>Jumlah Penduduk <15 Tahun</th><td>" + feature.properties.Kurang_15 + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk >60 Tahun</th><td>" + feature.properties.Lebih_60 + " Jiwa</td></tr>" + "<tr><th>Jumlah Kelompok Rentan</th><td>" + feature.properties.Usia_Rentan + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Lulus Perguruan Tinggi</th><td>" + feature.properties.Lulus_PT + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian PNS/Pegawai</th><td>" + feature.properties.PNS_Pegawai + " Jiwa</td></tr>" + "<tr><th>Jumlah Penduduk Mata Pencaharian Petani dan Pekebun</th><td>" + feature.properties.Petani_Pekebun + " Jiwa</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("Desa " + feature.properties.DESA);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
        },
        mouseover: function (e) {
          var layer = e.target;
          layer.setStyle({
            weight: 3,
            color: "#00FFFF",
            opacity: 1
          });
          desalongsorbtl.bindTooltip("Desa " + feature.properties.DESA + ", Kec. " + feature.properties.KECAMATAN);
          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
        },
        mouseout: function (e) {
          desalongsorbtl.resetStyle(e.target);
        }
      });
    }
  }
});
map.addLayer(desalongsorbtl);
$.getJSON(desalongsorbtlgeojson, function (data) {
  desalongsorbtl.addData(data);
});

var admindusun = L.geoJson(admindusungeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "gray",
      opacity: 1,
      weight: 0.5,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    admindusunSearch.push({
      name: layer.feature.properties.Dusun,
      address1: layer.feature.properties.Desa,
      address2: layer.feature.properties.Kecamatan,
      source: "AdminDusun",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        admindusun.bindTooltip("Dusun " + feature.properties.Dusun + ", Desa "+ feature.properties.Desa + "<br>Kec. " + feature.properties.Kecamatan + ", " + feature.properties.Kabupaten);
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        admindusun.resetStyle(e.target);
      }
    });
  }
});
$.getJSON(admindusungeojson, function (data) {
  admindusun.addData(data);
});

var adminkec = L.geoJson(adminkecgeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "black",
      opacity: 1,
      weight: 2,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        adminkec.bindTooltip("Kec. " + feature.properties.KECAMATAN + ", "+ feature.properties.KABUPATEN);
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        adminkec.resetStyle(e.target);
      }
    });
  }
});

var adminkab = L.geoJson(adminkabgeojson, {
  style: function (feature) {
    return {
      fillColor: "lightgray",
      fill: true,
      color: "gold",
      opacity: 1,
      weight: 2,
      fillOpacity: 0,
      smoothFactor: 0,
      interactive: true
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        adminkab.bindTooltip(feature.properties.KABUPATEN);
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        adminkab.resetStyle(e.target);
      }
    });
  }
});

var patahan = L.geoJson(patahangeojson, {
  style: function (feature) {
    return {
      color: "magenta",
      opacity: 1,
      weight: 1,
      smoothFactor: 0,
      interactive: false
    };
  }
});
map.addLayer(patahan);

var jalanarteri = L.geoJson(jalanarterigeojson, {
  style: function (feature) {
    return {
      color: "red",
      opacity: 1,
      weight: 3,
      smoothFactor: 0,
      interactive: false
    };
  }
});
map.addLayer(jalanarteri);

var jalankolektor = L.geoJson(jalankolektorgeojson, {
  style: function (feature) {
    return {
      color: "red",
      opacity: 1,
      weight: 1,
      smoothFactor: 0,
      interactive: false
    };
  }
});
map.addLayer(jalankolektor);

var jalanlokal = L.geoJson(jalanlokalgeojson, {
  style: function (feature) {
    return {
      color: "red",
      opacity: 1,
      weight: 0.7,
      smoothFactor: 0,
      interactive: false
    };
  }
});

var jalansetapak = L.geoJson(jalansetapakgeojson, {
  style: function (feature) {
    return {
      color: "red",
      opacity: 1,
      weight: 0.7,
      smoothFactor: 0,
      dashArray: 7.4,
      interactive: false
    };
  }
});

var jalanka = L.geoJson(jalankageojson, {
  style: function (feature) {
    return {
      color: "gray",
      opacity: 1,
      weight: 3,
      dashArray : '15,10',
      smoothFactor: 0,
      interactive: false
    };
  }
});

//Layer Sungai Line
var sungailine = L.geoJson(sungailinegeojson, {
  style: function (feature) {
    return {
      color: "#1E90FF",
      opacity: 1,
      weight: 0.8,
      smoothFactor: 0,
      interactive: false
    };
  }
});

var sungaipolygon = L.geoJson(sungaipolygongeojson, {
  style: function (feature) {
    return {
      fillColor: "#00BFFF",
      fill: true,
      color: "#1E90FF",
      opacity: 1,
      weight: 0.8,
      fillOpacity:  1,
      smoothFactor: 0,
      interactive: false
    };
  }
});
var sungailayer = L.layerGroup([sungailine, sungaipolygon]);

var balaidesaLayer = L.geoJson(null);
var balaidesa = L.geoJson(balaidesageojson, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: balaidesaiconurl,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.label,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      /*$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.label + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');*/
      layer.on({
        mouseover: function (e) {
          layer.bindPopup(feature.properties.label);
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        },
        mouseout: function (e) {
          clearHighlight;
        }
      });
      balaidesaSearch.push({
        name: layer.feature.properties.label,
        address1: layer.feature.properties.KECAMATAN,
        source: "BalaiDesa",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
    
  }
});
$.getJSON(balaidesageojson, function (data) {
  balaidesa.addData(data);
});

/* Layer Raster */
var overlay_BahayaTanahLongsor0 = new L.imageOverlay(img_BahayaTanahLongsor0, img_bounds_BahayaTanahLongsor0);
overlay_BahayaTanahLongsor0.addTo(map);
overlay_BahayaTanahLongsor0.setOpacity(0.75);

var overlay_BahayaTanahLongsor1 = new L.imageOverlay(img_BahayaTanahLongsor1, img_bounds_BahayaTanahLongsor1);
overlay_BahayaTanahLongsor1.addTo(map);
overlay_BahayaTanahLongsor1.setOpacity(0.75);

var overlay_BahayaTanahLongsor2 = new L.imageOverlay(img_BahayaTanahLongsor2, img_bounds_BahayaTanahLongsor2);
overlay_BahayaTanahLongsor2.addTo(map);
overlay_BahayaTanahLongsor2.setOpacity(0.75);

var overlay_KapasitasTanahLongsor0 = new L.imageOverlay(img_KapasitasTanahLongsor0, img_bounds_KapasitasTanahLongsor0);
overlay_KapasitasTanahLongsor0.setOpacity(0.75);

var overlay_KapasitasTanahLongsor1 = new L.imageOverlay(img_KapasitasTanahLongsor1, img_bounds_KapasitasTanahLongsor1);
overlay_KapasitasTanahLongsor1.setOpacity(0.75);

var overlay_KapasitasTanahLongsor2 = new L.imageOverlay(img_KapasitasTanahLongsor2, img_bounds_KapasitasTanahLongsor2);
overlay_KapasitasTanahLongsor2.setOpacity(0.75);

var overlay_KerentananTanahLongsor0 = new L.imageOverlay(img_KerentananTanahLongsor0, img_bounds_KerentananTanahLongsor0);
overlay_KerentananTanahLongsor0.setOpacity(0.75);

var overlay_KerentananTanahLongsor1 = new L.imageOverlay(img_KerentananTanahLongsor1, img_bounds_KerentananTanahLongsor1);
overlay_KerentananTanahLongsor1.setOpacity(0.75);

var overlay_KerentananTanahLongsor2 = new L.imageOverlay(img_KerentananTanahLongsor2, img_bounds_KerentananTanahLongsor2);
overlay_KerentananTanahLongsor2.setOpacity(0.75);

var overlay_RisikoTanahLongsor0 = new L.imageOverlay(img_RisikoTanahLongsor0, img_bounds_RisikoTanahLongsor0);
overlay_RisikoTanahLongsor0.setOpacity(0.75);

var overlay_RisikoTanahLongsor1 = new L.imageOverlay(img_RisikoTanahLongsor1, img_bounds_RisikoTanahLongsor1);
overlay_RisikoTanahLongsor1.setOpacity(0.75);

var overlay_RisikoTanahLongsor2 = new L.imageOverlay(img_RisikoTanahLongsor2, img_bounds_RisikoTanahLongsor2);
overlay_RisikoTanahLongsor2.setOpacity(0.75);

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: false,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    interactive: false
  },
  icon: "fa fa-location-arrow",
  metric: true,
  strings: {
    title: "Aktifkan untuk mengetahui lokasi Anda",
    popup: "Lokasi Anda di sini, akurasi {distance} {unit}",
    outsideMapBoundsMsg: "Sepertinya Anda berada di luar area peta"
  },
  locateOptions: {
    maxZoom: 15,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

/* Control Layer Tree */
var basemapTree = {
    label: '<b>Basemap</b>',
    children: [
        {label: 'OpenStreeMap', layer: basemap0},
        {label: 'Google Streets', layer: basemap1},
        {label: 'Google Satellite', layer: basemap2},
        {label: 'Google Terrain', layer: basemap3},
    ]
};
var layersTree = {
  label: '<b>Layer</b>',
  noShow: true,
  children: [
    {label: '<b>Wilayah Kajian (Desa)</b>', children: [
      {label: 'Kab. Kulon Progo', layer: desalongsorkp},
      {label: 'Kab. Gunungkidul', layer: desalongsorgk},
      {label: 'Kab. Bantul', layer: desalongsorbtl},
    ]},
    {label: '<b>Batas Administrasi</b>', children: [
      {label: 'Batas Dusun', layer: admindusun},
      {label: 'Batas Kecamatan', layer: adminkec},
      {label: 'Batas Kabupaten', layer: adminkab},
    ]},
    {label: '<b>Kajian Risiko 2016</b>', children: [
      {label: 'Bahaya', layer: overlay_BahayaTanahLongsor0},
      {label: 'Kerentanan', layer: overlay_KerentananTanahLongsor0},
      {label: 'Kapasitas', layer: overlay_KapasitasTanahLongsor0},
      {label: 'Risiko', layer: overlay_RisikoTanahLongsor0},
    ]},
    {label: '<b><b>Kajian Risiko 2017</b>', children: [
      {label: 'Bahaya', layer: overlay_BahayaTanahLongsor1},
      {label: 'Kerentanan', layer: overlay_KerentananTanahLongsor1},
      {label: 'Kapasitas', layer: overlay_KapasitasTanahLongsor1},
      {label: 'Risiko', layer: overlay_RisikoTanahLongsor1},
    ]},
    {label: '<b>Kajian Risiko 2018</b>', children: [
      {label: 'Bahaya', layer: overlay_BahayaTanahLongsor2},
      {label: 'Kerentanan', layer: overlay_KerentananTanahLongsor2},
      {label: 'Kapasitas', layer: overlay_KapasitasTanahLongsor2},
      {label: 'Risiko', layer: overlay_RisikoTanahLongsor2},
    ]},
    {label: '<b>Layer Lain</b>', children: [
      {label: 'Balai Desa', layer: balaidesa},
      {label: 'Patahan Sesar', layer: patahan},
      {label: 'Jalan Arteri', layer: jalanarteri},
      {label: 'Jalan Kolektor', layer: jalankolektor},
      {label: 'Jalan Lokal', layer: jalanlokal},
      {label: 'Jalan Setapak', layer: jalansetapak},
      {label: 'Jalan Kereta Api', layer: jalanka},
      {label: 'Sungai', layer: sungailayer},
    ]},
  ]
}

var layercontroltree = L.control.layers.tree(basemapTree, layersTree, {
  namedToggle: false,
  selectorBack: false,
  //closedSymbol: '&#8862; &#x1f5c0;',
  //openedSymbol: '&#8863; &#x1f5c1;',
  collapsed: isCollapsed,
  //collapseAll: 'Collapse all',
  //expandAll: 'Expand all',
});
layercontroltree.addTo(map).collapseTree(false).expandSelected(true);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  $("#wellcomeModal").modal("show");
  sizeLayerControl();
  /* Fit map to DIY bounds */
  map.fitBounds(adminkab.getBounds());

  var desalongsorkpBH = new Bloodhound({
    name: "DesaLongsorKp",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: desalongsorkpSearch,
    limit: 10
  });

  var desalongsorgkBH = new Bloodhound({
    name: "DesaLongsorGk",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: desalongsorgkSearch,
    limit: 10
  }); 

  var desalongsorbtlBH = new Bloodhound({
    name: "DesaLongsorBtl",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: desalongsorbtlSearch,
    limit: 10
  });

  var admindusunBH = new Bloodhound({
    name: "AdminDusun",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: admindusunSearch,
    limit: 10
  });  

  var balaidesaBH = new Bloodhound({
    name: "BalaiDesa",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: balaidesaSearch,
    limit: 10
  });

  balaidesaBH.initialize();
  desalongsorkpBH.initialize();
  desalongsorgkBH.initialize();
  desalongsorbtlBH.initialize();
  admindusunBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 1,
    highlight: false,
    hint: false
  }, {
    name: "DesaLongsorKp",
    displayKey: "name",
    source: desalongsorkpBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Desa</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address1}}, {{address2}}</small>"].join(""))
    }
  }, {
    name: "DesaLongsorGk",
    displayKey: "name",
    source: desalongsorgkBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Desa</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address1}}, {{address2}}</small>"].join(""))
    }
  }, {
    name: "DesaLongsorBtl",
    displayKey: "name",
    source: desalongsorbtlBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Desa</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address1}}, {{address2}}</small>"].join(""))
    }
  }, {
    name: "AdminDusun",
    displayKey: "name",
    source: admindusunBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Dusun</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address1}}, {{address2}}</small>"].join(""))
    }
  }, {
    name: "BalaiDesa",
    displayKey: "name",
    source: balaidesaBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/office32.png' width='24' height='24'>&nbsp;Balai Desa</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>Kec. {{address1}}</small>"].join(""))
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "DesaLongsorKp") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "DesaLongsorGk") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "DesaLongsorBtl") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "AdminDusun") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "BalaiDesa") {
      if (!map.hasLayer(balaidesaLayer)) {
        map.addLayer(balaidesaLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}

L.Control.Watermark = L.Control.extend({
  onAdd: function(map) {
    var img = L.DomUtil.create('img');
    img.src = '../assets/img/bpbddiy.png';
    img.style.width = '50px';
    img.style.opacity = '1';
    return img;
  },
  onRemove: function(map) {
  }
});
L.control.watermark = function(opts) {
  return new L.Control.Watermark(opts);
}
L.control.watermark({ position: 'bottomleft' }).addTo(map);