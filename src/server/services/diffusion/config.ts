export const config = {
  CREATE: {
    ENDPOINT: 'https://api.runpod.ai/v1/stable-diffusion-v1/run',
    CONFIG: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
      },
    },
  },
  RETRIEVE: {
    ENDPOINT: 'https://api.runpod.ai/v1/stable-diffusion-v1/status',
    CONFIG: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RUNPOD_API_KEY}`,
      },
    },
  },
};
