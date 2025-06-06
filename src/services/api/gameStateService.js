import { delay, generateId, createResponse, handleServiceError } from '../index';
import mockGameState from '../mockData/gameState.json';

let gameStates = [...mockGameState];

const gameStateService = {
  async getAll() {
    try {
      await delay(250);
      return createResponse(gameStates).data;
    } catch (error) {
      handleServiceError(error, 'fetch game states');
    }
  },

  async getById(id) {
    try {
      await delay(200);
      const gameState = gameStates.find(item => item?.id === id);
      if (!gameState) {
        throw new Error(`Game state with id ${id} not found`);
      }
      return createResponse(gameState).data;
    } catch (error) {
      handleServiceError(error, 'fetch game state');
    }
  },

  async create(gameStateData) {
    try {
      await delay(400);
      const newGameState = {
        id: generateId(),
        ...gameStateData,
        score: gameStateData?.score || 0,
        treasuresFound: gameStateData?.treasuresFound || [],
        inventory: gameStateData?.inventory || [],
        hintsRemaining: gameStateData?.hintsRemaining || 3
      };
      gameStates.push(newGameState);
      return createResponse(newGameState).data;
    } catch (error) {
      handleServiceError(error, 'create game state');
    }
  },

  async update(id, updateData) {
    try {
      await delay(350);
      const index = gameStates.findIndex(item => item?.id === id);
      if (index === -1) {
        // Create new game state if not found
        const newGameState = {
          id: id,
          ...updateData
        };
        gameStates.push(newGameState);
        return createResponse(newGameState).data;
      }
      gameStates[index] = { ...gameStates[index], ...updateData };
      return createResponse(gameStates[index]).data;
    } catch (error) {
      handleServiceError(error, 'update game state');
    }
  },

  async delete(id) {
    try {
      await delay(300);
      const index = gameStates.findIndex(item => item?.id === id);
      if (index === -1) {
        throw new Error(`Game state with id ${id} not found`);
      }
      const deleted = gameStates.splice(index, 1)[0];
      return createResponse(deleted).data;
    } catch (error) {
      handleServiceError(error, 'delete game state');
    }
  }
};

export default gameStateService;