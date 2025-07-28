export interface ValidationError {
  name: string;
  errors: Record<string, { message: string }>;
}
