import path from 'path';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export const ibmWatsonConfig = {
  apikey:
    process.env.IBM_WATSON_APIKEY ||
    'iS9D2hyfC3A-AbIAX4WSoXQEo4XFAX4T6ftbUpmOklyO',
  url:
    process.env.IBM_WATSON_URL ||
    'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/c85a8a9c-0f22-48a6-a715-aa8117d85b3b',
  synthesizeParams: {
    mimeType: process.env.IBM_WATSON_MEDIA_TYPE || 'audio/mpeg',
    voice: process.env.IBM_WATSON_VOICE || 'pt-BR_IsabelaVoice',
  },
};
