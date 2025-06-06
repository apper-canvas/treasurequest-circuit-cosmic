import { delay, generateId, createResponse, handleServiceError } from '../index';
import mockLocations from '../mockData/locations.json';

let locations = [...mockLocations];

const locationService = {
  async getAll() {
    try {
      await delay(300);
      return createResponse(locations).data;
    } catch (error) {
      handleServiceError(error, 'fetch locations');
    }
  },

  async getById(id) {
    try {
      await delay(200);
      const location = locations.find(item => item?.id === id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      return createResponse(location).data;
    } catch (error) {
      handleServiceError(error, 'fetch location');
    }
  },

  async create(locationData) {
    try {
      await delay(400);
      const newLocation = {
        id: generateId(),
        ...locationData,
        isUnlocked: locationData?.isUnlocked ?? false
      };
      locations.push(newLocation);
      return createResponse(newLocation).data;
    } catch (error) {
      handleServiceError(error, 'create location');
    }
  },

  async update(id, updateData) {
    try {
      await delay(350);
      const index = locations.findIndex(item => item?.id === id);
      if (index === -1) {
        throw new Error(`Location with id ${id} not found`);
      }
      locations[index] = { ...locations[index], ...updateData };
      return createResponse(locations[index]).data;
    } catch (error) {
      handleServiceError(error, 'update location');
    }
  },

  async delete(id) {
    try {
      await delay(300);
      const index = locations.findIndex(item => item?.id === id);
      if (index === -1) {
        throw new Error(`Location with id ${id} not found`);
      }
      const deleted = locations.splice(index, 1)[0];
      return createResponse(deleted).data;
    } catch (error) {
      handleServiceError(error, 'delete location');
    }
  }
};

export default locationService;