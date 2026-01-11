
export interface OllamaResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// Configuration for models - maintaining user's specific model names
export const OLLAMA_MODELS = {
    REASONER: 'gemma3:1b',
    GENERATOR: 'gemma3:1b', // Corrected model tag
    VISION: 'qwen3-v1:4b'
};

export class OllamaService {
    private static baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://elsewhere-medieval-amplifier-matters.trycloudflare.com/api'
        : 'http://localhost:11434/api';

    /**
     * Check if Ollama is running and models are available
     */
    static async checkConnection(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/tags`);
            return response.ok;
        } catch (e) {
            console.error('Ollama connection failed:', e);
            return false;
        }
    }

    /**
     * Generate a completion (generate question or challenge)
     */
    static async generateStreaming(
        prompt: string,
        model: string = OLLAMA_MODELS.REASONER,
        onChunk: (chunk: string) => void,
        options: { temperature?: number } = { temperature: 0.8 }
    ): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    prompt,
                    stream: true,
                    options: options
                }),
            });

            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (!line.trim()) continue;
                    try {
                        const json = JSON.parse(line);
                        if (json.response) {
                            const textChunk = json.response;
                            fullResponse += textChunk;
                            onChunk(textChunk);
                        }
                    } catch (e) {
                        console.error('Error parsing JSON chunk', e);
                    }
                }
            }

            return fullResponse;
        } catch (error) {
            // Fallback for demo if Ollama isn't running
            console.warn("Ollama call failed, falling back to mock", error);
            const mockResponse = " [Ollama Disconnected] This is a simulated challenge because Ollama is not reachable. Ensure 'ollama serve' is running with 'gemma3:1b'.";
            onChunk(mockResponse);
            return mockResponse;
        }
    }

    /**
     * Chat completion for maintaining context
     */
    static async chat(
        messages: ChatMessage[],
        model: string = OLLAMA_MODELS.REASONER
    ): Promise<string> {
        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model,
                    messages,
                    stream: false,
                }),
            });

            const data = await response.json();
            return data.message?.content || '';
        } catch (error) {
            console.error('Ollama chat failed:', error);
            return "Unable to connect to AI expert. Please check your local Ollama instance.";
        }
    }
}
