import { Car } from './classes/car.js';
import { Drone } from './classes/drone.js';
import { fleet } from './fleet-data.js';
import { FleetDataService } from './services/fleet-data-service.js';

let dataService = new FleetDataService(); // eslint-disable-line
dataService.loadData(fleet);

// console.log(dataService.cars);

for (const car of dataService.cars) console.log(car.license);

for (const drone of dataService.drones) console.log(drone.license);
