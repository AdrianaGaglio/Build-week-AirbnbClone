import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  map!: L.Map;

  icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41], // dimensioni dell'icona
    iconAnchor: [12, 41], // punto dell'icona che sarà ancorato alla posizione
    popupAnchor: [1, -34], // posizione del popup rispetto all'icona
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41], // dimensioni dell'ombra
    shadowAnchor: [12, 41], // punto dell'ombra che sarà ancorato alla posizione
  });

  @Input() placeMap!: string;
  constructor(private geocodingService: GeocodingService) {}
  ngOnInit() {
    if (this.placeMap) {
      this.initMap(this.placeMap);
    } else {
      this.initMap();
    }
  }
  initMap(placeName: string = 'Roma'): void {
    this.geocodingService.geocode(placeName).subscribe((data) => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Posiziona la mappa sulle coordinate trovate
        this.map = L.map('map').setView([lat, lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // Aggiungi un marker alla posizione trovata
        const marker = L.marker([lat, lon], { icon: this.icon }).addTo(
          this.map!
        );
        marker.bindPopup(`<b>${placeName}</b>`);
      } else {
        console.log('Posizione non trovata');
      }
    });
  }
}
