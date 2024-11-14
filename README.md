
# Leaflet.js map Integration with Angular: step by step

## Overview


This project shows how to add Leaflet.js—a popular JavaScript library for interactive maps—into an Angular app. In this tutorial, you’ll learn to create a map of Afghanistan with markers for major provinces, styled to make it easy to use. By the end, you’ll have a working Angular app with an interactive map displaying Afghanistan’s provinces.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Steps to Integrate Leaflet with Angular](#steps-to-integrate-leaflet-with-angular)
  - [1. Set Up a New Angular Project](#step-1-set-up-a-new-angular-project)
  - [2. Install Dependencies](#step-2-install-dependencies)
  - [3. Create a Map Component](#step-3-create-a-map-component)
  - [4. Add the Leaflet Map and Markers](#step-4-add-the-leaflet-map-and-markers)
  - [5. Style the Map and Markers](#step-5-style-the-map-and-markers)
  - [6. Add Leaflet CSS and Images](#step-6-add-leaflet-css-and-images)
  - [7. Run the Application](#step-7-run-the-application)
- [Conclusion](#conclusion)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Getting Started

These instructions will guide you through setting up a local development environment to explore the Leaflet.js and Angular integration.

## Prerequisites

- **Node.js** (v12 or higher)
- **Angular CLI** (v11 or higher)

## Installation

Clone this repository and navigate into the project directory. Then, follow the steps below to set up the project:

```bash
git clone https://github.com/sayedsadat344/leaflet-example
cd leaflet-example
npm install
ng serve
```

Now, open your browser and go to `localhost:4200`. You’ll see a map of Afghanistan displayed on the screen, zoomed in with markers in different colors highlighting five major provinces.

## Steps to Integrate Leaflet with your on Angular projects

### Step 1: Set Up a New Angular Project

Create a new Angular project and navigate into the project folder:

```bash
ng new leaflet-map
cd leaflet-map
```

### Step 2: Install Dependencies

Install **Leaflet.js** and its TypeScript definitions:

```bash
npm install leaflet @types/leaflet
```

### Step 3: Create a Map Component

Generate a new component to contain your map using Angular CLI:

```bash
ng generate component map
```

### Step 4: Add the Leaflet Map and Markers

1. **Update `map.component.html`**:
   ```html
   <div id="map"></div>
   ```

2. **Update `map.component.ts`**: Set up the Leaflet map, add markers for various Afghan locations, and center the map.

```typescript
   import * as L from 'leaflet';
   L.Icon.Default.imagePath = 'assets/leaflet/';
   ```
  

### Step 5: Style the Map and Markers

In `map.component.scss`, add styles to make the map occupy the full viewport height:

```scss
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

```

### Step 6: Add Leaflet CSS and Images

1. **Add Leaflet CSS** to `angular.json` under `styles`:
   ```json
   "node_modules/leaflet/dist/leaflet.css"
   ```

2. **Add Leaflet Images** under `assets` in `angular.json`:
   ```json
   {
     "glob": "**/*",
     "input": "./node_modules/leaflet/dist/images/",
     "output": "./assets/leaflet/"
   }
   ```

3. **Set Image Path for Markers** in `main.ts`:
   ```typescript
   import * as L from 'leaflet';
   L.Icon.Default.imagePath = 'assets/leaflet/';
   ```

### Step 7: Run the Application

Run the Angular application and view it in your browser at `http://localhost:4200`:

```bash
ng serve
```

## Conclusion

With Leaflet.js and Angular, you now have an interactive map displaying Afghanistan with markers for key provinces. The project illustrates how Angular and Leaflet can be combined to enhance data visualization on maps.





---
