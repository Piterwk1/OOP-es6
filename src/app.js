import { Car } from './classes/car.js';
import { Drone } from './classes/drone.js';
import { fleet } from './fleet-data.js';
import { FleetDataService } from './services/fleet-data-service.js';

let dataService = new FleetDataService(); // eslint-disable-line
dataService.loadData(fleet);
// console.log(dataService.cars);

// for (const car of dataService.cars) console.log(car.latLong);

// for (const drone of dataService.drones) console.log(drone.license);

for (const e of dataService.errors) console.log(e.message);

const carLicense = dataService.getCarByLicense('AT2000');
console.log(carLicense);

const cars = dataService.getCarsByLicense();
for (const car of cars) console.log(car.license);

const carsFilter = dataService.filterCarsByMake('e');
for (const car of carsFilter) console.log(car.make);
