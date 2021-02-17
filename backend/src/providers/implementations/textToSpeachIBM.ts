import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import { ibmWatsonConfig } from '../../config';

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: ibmWatsonConfig.apikey,
  }),
  url: ibmWatsonConfig.url,
});

export default textToSpeech;
