import { Car } from '../classes/car.js';
import { Drone } from '../classes/drone.js';
import { DataError } from './data-errors.js';

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (const data of fleet) {
      switch (data.type) {
        case 'car':
          if (this.validateCarData(data)) {
            const car = this.loadCar(data);
            if (car) this.cars.push(car);
            //   this.cars.push(data);
          } else {
            const e = new DataError('Invalid car data', data);
            this.errors.push(e);
          }
          break;
        case 'drone':
          if (this.validateDroneData(data)) {
            const drone = this.loadDrone(data);
            this.drones.push(drone);
            //   this.drones.push(data);
          } else {
            const e = new DataError('Invalid drone data', data);
            this.errors.push(e);
          }
          break;
        default: {
          const e = new DataError('Invalid vehicle type', data);
          this.errors.push(e);
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  loadCar(car) {
    try {
      const c = new Car(car.license, car.model, car.latLong);
      c.make = car.make;
      c.miles = car.miles;
      return c;
    } catch (e) {
      this.errors.push(new DataError('error loading car', car));
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  loadDrone(drone) {
    try {
      const d = new Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch (e) {
      this.errors.push(new DataError('error loading drone', drone));
    }
    return null;
  }

  validateCarData(car) {
    const requiredProps = 'license model latLong miles make'.split(' ');
    let hasErrors = false;

    for (const field of requiredProps) {
      if (!car[field]) {
        this.errors.push(new DataError(`invalid field ${field}`, car));
        hasErrors = true;
      }
    }
    if (Number.isNaN(Number.parseFloat(car.miles))) {
      this.errors.push(new DataError('invalid milage', car));
      hasErrors = true;
    }
    return !hasErrors;
  }

  validateDroneData(drone) {
    const requiredProps = 'license model latLong airTimeHours base'.split(' ');
    let hasErrors = false;

    for (const field of requiredProps) {
      if (!drone[field]) {
        this.errors.push(new DataError(`invalid field ${field}`, drone));
        hasErrors = true;
      }
    }

    if (drone.base !== 'New York') {
      this.errors.push(new DataError('invalid base', drone));
      hasErrors = true;
    }
    return !hasErrors;
  }
}
