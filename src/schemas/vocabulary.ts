import {z} from 'zod';

export const VocabularySchema = z.object({
    vocabulary: z.array(
        z.object({
            expression:z.string(),
            translation:z.string(),
            context:z.string(),
        })
    )
})


export type VocabularyResult = z.infer<typeof VocabularySchema>
