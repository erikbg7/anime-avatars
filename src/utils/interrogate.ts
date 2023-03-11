import { config } from '@/server/services/diffusion/config';

// const base64Image = await convertToBase64(blob);
// const description = await interrogateImage(base64Image, 'fast');
// const description =
//   'a man standing on top of a beach next to the ocean, twitter pfp, baggy clothing and hat, smileing nright, twitch streamer, wearing off - white style, australian bush, symmetrical nose, eden, photo of head, zerg, shroud, google parti resolution, rocky';

async function interrogateImage(base64: string, q: string) {
  try {
    const res = await fetch(config.INTERROGATE.ENDPOINT, {
      body: JSON.stringify({
        data: [base64, q],
      }),
      ...config.INTERROGATE.CONFIG,
    });

    const data = await res.json();
    console.log({ data });
    return data?.data?.[0] || '';
  } catch (e) {
    console.log({ e });
  }
}
