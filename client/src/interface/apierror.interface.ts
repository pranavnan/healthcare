export interface ApiError {
  response?: {
    data?: {
      errors?: Array<{ message: string }>;
    };
  };
  message?: string;
}
