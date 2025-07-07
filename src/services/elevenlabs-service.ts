
interface ElevenLabsSpeechParams {
  text: string;
  voiceId?: string;
  modelId?: string;
  apiKey: string;
}

export const DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam voice
export const DEFAULT_MODEL_ID = "eleven_multilingual_v2";
export const DEFAULT_API_KEY = "sk_bb1a2961c407943a0cdafeab9928a0fece43292547f967b3";

export const generateSpeech = async ({ 
  text, 
  voiceId = DEFAULT_VOICE_ID, 
  modelId = DEFAULT_MODEL_ID,
  apiKey = DEFAULT_API_KEY // Use the default API key if none is provided
}: ElevenLabsSpeechParams): Promise<ArrayBuffer | null> => {
  if (!text) return null;

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('ElevenLabs API error:', errorData);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
};

export const playAudio = async (audioBuffer: ArrayBuffer): Promise<void> => {
  const audioContext = new AudioContext();
  const audioSource = audioContext.createBufferSource();
  
  try {
    const decodedData = await audioContext.decodeAudioData(audioBuffer);
    audioSource.buffer = decodedData;
    audioSource.connect(audioContext.destination);
    audioSource.start(0);
    
    return new Promise((resolve) => {
      audioSource.onended = () => {
        audioContext.close();
        resolve();
      };
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    audioContext.close();
  }
};

// Available voice IDs for reference
export const AVAILABLE_VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
  { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh" },
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold" },
  { id: "pNInz6obpgDQGcFmaJgB", name: "Adam" },
  { id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam" }
];
