export const isDev = process.env.NODE_ENV === 'development';

export const isProduction = process.env.NODE_ENV === 'production';

export const debugPrint = (value: any) => {
  if (isDev) {
    console.log(value);
  }
};

export const debugError = (value: any) => {
  if (isDev) {
    console.error(value);
  }
};
