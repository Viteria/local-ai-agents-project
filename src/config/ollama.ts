//ollama connect
import OpenAi from "openai";
import {setDefaultOpenAIClient, setOpenAIAPI} from "@openai/agents";

const client = new OpenAi({
    baseURL: "http://localhost:11434/v1",
    apiKey: 'ollama',

})
export function configOllama(){
    setDefaultOpenAIClient(client);
    setOpenAIAPI('chat_completions')
}
