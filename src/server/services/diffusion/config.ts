export const config = {
  CREATE: {
    ENDPOINT: 'https://api.runpod.ai/v1/sd-anything-v3/run',
    CONFIG: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`,
      },
    },
  },
  RETRIEVE: {
    ENDPOINT: 'https://api.runpod.ai/v1/sd-anything-v3/status',
    CONFIG: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`,
      },
    },
  },
};
