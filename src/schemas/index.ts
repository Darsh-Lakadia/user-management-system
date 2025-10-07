export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidUrl = (value: string) => {
  const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  return pattern.test(value);
};
