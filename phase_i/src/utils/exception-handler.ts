class BlogError extends Error {
  constructor(public code: string, message: string, public status: number) {
    super(message);
  }
}

class ModelNotFoundError extends BlogError {
  constructor(modelName: string, modelId: string) {
    super("MODEL_NOT_FOUND", `${modelName} with ID ${modelId} not found`, 404);
  }
}

class ValidationError extends BlogError {
  constructor(message: string) {
    super("VALIDATION_ERROR", message, 400);
  }
}

class DatabaseError extends BlogError {
  constructor(message: string) {
    super("DATABASE_ERROR", message, 500);
  }
}

class UnauthorizedError extends BlogError {
  constructor(message: string) {
    super("UNAUTHORIZED", message, 401);
  }
}

function handleError(error: BlogError) {
  console.error(error);
  return {
    code: error.code,
    message: error.message,
    status: error.status,
  };
}

export {
  handleError,
  ModelNotFoundError,
  ValidationError,
  DatabaseError,
  UnauthorizedError,
};
