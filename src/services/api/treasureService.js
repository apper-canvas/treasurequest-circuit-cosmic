import { delay, generateId, createResponse, handleServiceError } from '../index';
import mockTreasures from '../mockData/treasures.json';

let treasures = [...mockTreasures];

const treasureService = {
  async getAll() {
    try {
      await delay(280);
      return createResponse(treasures).data;
    } catch (error) {
      handleServiceError(error, 'fetch treasures');
    }
  },

  async getById(id) {
    try {
      await delay(220);
      const treasure = treasures.find(item => item?.id === id);
      if (!treasure) {
        throw new Error(`Treasure with id ${id} not found`);
      }
      return createResponse(treasure).data;
    } catch (error) {
      handleServiceError(error, 'fetch treasure');
    }
  },

  async create(treasureData) {
    try {
      await delay(450);
      const newTreasure = {
        id: generateId(),
        ...treasureData,
        value: treasureData?.value || 0
      };
      treasures.push(newTreasure);
      return createResponse(newTreasure).data;
    } catch (error) {
      handleServiceError(error, 'create treasure');
    }
  },

  async update(id, updateData) {
    try {
      await delay(380);
      const index = treasures.findIndex(item => item?.id === id);
      if (index === -1) {
        throw new Error(`Treasure with id ${id} not found`);
      }
      treasures[index] = { ...treasures[index], ...updateData };
      return createResponse(treasures[index]).data;
    } catch (error) {
      handleServiceError(error, 'update treasure');
    }
  },

  async delete(id) {
    try {
      await delay(320);
      const index = treasures.findIndex(item => item?.id === id);
      if (index === -1) {
        throw new Error(`Treasure with id ${id} not found`);
      }
      const deleted = treasures.splice(index, 1)[0];
      return createResponse(deleted).data;
    } catch (error) {
      handleServiceError(error, 'delete treasure');
    }
  }
};

export default treasureService;