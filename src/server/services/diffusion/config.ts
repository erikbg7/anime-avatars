export const config = {
  INTERROGATE: {
    ENDPOINT: 'https://2ee5437b48d4c85395.gradio.live/run/ask',
    CONFIG: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
  },
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
