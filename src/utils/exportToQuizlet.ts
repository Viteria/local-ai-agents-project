import type {VocabularyResult} from "../schemas/vocabulary.js";

export function exportToQuizlet(vocabulary: VocabularyResult["vocabulary"]): string {
    const result = vocabulary.map((item) => {
        return `${item.expression.replace(/[\t\r\n]+/g, " ")}\t${item.translation.replace(/[\t\r\n]+/g, " ")}`;
    })
    return result.join('\n');
}

console.log('final res', exportToQuizlet([{expression: "acquire", translation: "приобретать"},
    {expression: "linguist", translation: "лингвист"}]))

