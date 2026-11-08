import {McpServer} from '@modelcontextprotocol/server'
import z from 'zod'
import {StdioServerTransport} from "@modelcontextprotocol/server/stdio";


const myMCPServer = new McpServer({
    name: 'my-mcp-server',
    version: '1.0',
})

myMCPServer.registerTool(
    'calculate',
    {
        description: 'calculate given numbers',
        inputSchema: {
            a: z.number(),
            b: z.number(),
            operation: z.enum(["add", "subtract", "multiply"]),
        }

    },
    async ({a, b, operation}) => {
        console.error("🔧 calculate called", {a, b, operation});
        let result: number
        switch (operation) {
            case 'add':
                result = a + b;
                break
            case 'subtract':
                result = a - b;
                break
            case 'multiply':
                result = a * b
                break
        }

        return {
            content: [
                {
                    type: "text",
                    text: String(result),
                },
            ],
        };
    }
)

const transport = new StdioServerTransport();
await myMCPServer.connect(transport);


