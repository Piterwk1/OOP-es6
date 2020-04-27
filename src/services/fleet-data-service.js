import { Car } from '../classes/car.js';
import { Drone } from '../classes/drone.js';

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (const data of fleet) {
      // eslint-disable-next-line default-case
      switch (data.type) {
        case 'car':
          const car = this.loadCar(data); // eslint-disable-line
          this.cars.push(car);
          //   this.cars.push(data);
          break;
        case 'drone':
            const drone = this.loadDrone(data); // eslint-disable-line
          this.cars.push(drone);
          //   this.drones.push(data);
          break;
      }
    }
  }

  loadCar(car) {
    const c = new Car(car.license, car.model, car.latLong);
    c.make = car.make;
    c.miles = car.miles;
    return c;
  }

  loadDrone(drone) {
    const d = new Drone(drone.license, drone.model, drone.latLong);
    d.airTimeHours = drone.airTimeHours;
    d.miles = drone.base;
    return d;
  }
}
