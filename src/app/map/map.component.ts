import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  // Markers for Afghanistan (Kabul, Herat, Kandahar, Mazar, Nangarhar, Paktia)
  markers: L.Marker[] = [
    L.marker([34.5553, 69.2075], { icon: this.createCustomIcon('blue') }), // Kabul
    L.marker([34.3525, 62.2044], { icon: this.createCustomIcon('green') }), // Herat
    L.marker([31.6236, 65.7061], { icon: this.createCustomIcon('red') }), // Kandahar
    L.marker([36.7117, 67.1101], { icon: this.createCustomIcon('purple') }), // Mazar-i-Sharif
    L.marker([34.4400, 70.4500], { icon: this.createCustomIcon('orange') }), // Nangarhar
    L.marker([33.7671, 69.3702], { icon: this.createCustomIcon('yellow') })  // Paktia
  ];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  private initializeMap() {
    // Initialize map, centered around Kabul with an appropriate zoom level
     // Zoom level 6 is appropriate for showing all of Afghanistan
    this.map = L.map('map').setView([34.5553, 69.2075], 6); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkers() {
    // Add all markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map view to the bounds to ensure all markers are visible
    this.map.fitBounds(bounds);
  }


    // Function to create custom icons based on color
    private createCustomIcon(color: string): L.Icon {
      return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        iconSize: [25, 41],  // Default size
        iconAnchor: [12, 41],  // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // Popup position relative to the icon
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],  // Shadow size
        shadowAnchor: [12, 41] // Shadow anchor position
      });
    }
}
