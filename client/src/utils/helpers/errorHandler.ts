export const handleServiceError = (
  error: unknown,
  serviceName?: string
): never => {
  // todo add constants here
  const prefix = serviceName
    ? `${serviceName} service error:`
    : "Service error:";
  console.error(prefix, error);
  throw error;
};
