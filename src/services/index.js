// Service utilities and common functions
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = () => Date.now().toString();

export const createResponse = (data) => ({
  data: Array.isArray(data) ? [...data] : { ...data },
  timestamp: new Date().toISOString()
});

export const handleServiceError = (error, operation) => {
  console.error(`Service error during ${operation}:`, error);
  throw new Error(`Failed to ${operation}. Please try again.`);
};