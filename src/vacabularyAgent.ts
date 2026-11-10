import {Agent} from "@openai/agents";
import {VocabularySchema} from "./schemas/vocabulary.js";

export const vocabularyAgent = new Agent({
    name: 'vacabularyAgent',
    model: 'qwen3:4b-instruct',
    modelSettings: {
        reasoning: { effort: "none" },
        temperature:0,
        maxTokens: 800
    },
    outputType: VocabularySchema,
    instructions: `
You extract useful English vocabulary for B2-C1 learners.

Extract up to 5 useful words or expressions from the text.
Preserve complete expressions.
Exclude basic vocabulary.
Provide Russian translations.
Copy context exactly from the source text.

Return only JSON:
{
  "vocabulary": [
    {
      "expression": "...",
      "translation": "...",
      "context": "..."
    }
  ]
}

If nothing qualifies, return {"vocabulary":[]}.
No explanations.
`,
})
