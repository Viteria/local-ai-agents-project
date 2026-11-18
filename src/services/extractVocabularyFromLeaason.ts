import { run } from "@openai/agents";
import {vocabularyAgent} from "../agents/vocabularyAgent.js";
import { extractLessonText } from "../utils/extractLessonText.js";
import type { VocabularyResult } from "../schemas/vocabulary.js";


export async function extractVocabularyFromLesson(
    html: string
): Promise<VocabularyResult> {
    // 1. Очистить HTML
    const textLesson = extractLessonText(html);

    // 2. Запустить vocabularyAgent
    const result = await run(vocabularyAgent, `Extract useful vocabulary from this lesson:\n\n${textLesson}`)
    const vocabulary =result.finalOutput
    // 3. Проверить наличие результата

    // 4. Вернуть карточки
    if (!vocabulary) {
        throw new Error("Vocabulary extraction failed");
    }
    console.log("Extracted vocabulary:", vocabulary);

    return vocabulary;
}
