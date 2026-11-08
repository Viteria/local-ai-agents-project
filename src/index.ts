import OpenAi from 'openai';
import {Agent, run, setDefaultOpenAIClient, setOpenAIAPI, tool, MCPServerStdio} from "@openai/agents";
import z from "zod";

const client = new OpenAi({
    baseURL: "http://localhost:11434/v1",
    apiKey: 'ollama',
})


setDefaultOpenAIClient(client);
setOpenAIAPI('chat_completions')

const getCurrentTimeTool = tool({
    name:'get_current_time',
    description:'Get the current time in Moscow',
    parameters: z.object({}),
    async execute(){
        console.log('get_current_time tool called')
        return  new Date().toLocaleString('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit'});
    }
})

const mcpServer = new MCPServerStdio({
    name:'calculator',
    fullCommand: "npx tsx src/mcp-server.ts"
})

await mcpServer.connect();

const tools = await mcpServer.listTools()

console.log(' "Available MCP tools:"', tools)

const agent = new Agent({
    name:'LocalAssistant',
    model:'qwen3:4b',
    instructions:'Use tools when needed. Keep answers short.',
    tools:[getCurrentTimeTool],
    mcpServers: [mcpServer]
})

try{
    const result = await run(agent,"What is the current time in Moscow?")

    console.log('result',result.finalOutput)

    const result2 = await run(agent,"What is 125 multiplied by 48?")
    console.log('result2',result2.finalOutput)


    const result3 = await run(agent,"What is 25 plus 17, and what time is it in Moscow?")
    console.log('result3',result3.finalOutput)
} finally {
    await mcpServer.close();
}



