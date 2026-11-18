import express from "express";
import {extractVocabularyFromLesson} from "./services/extractVocabularyFromLeaason.js";

const app = express();

app.use(express.json());

app.post("/api/vocabulary", async (req, res) => {
    const {html} = req.body;

    if (typeof html !== "string" || !html.trim()) {
        return res.status(400).json({error: 'Lesson HTML is required'});
    }

    try {
        //extract vocabulary
        const vocabulary = await extractVocabularyFromLesson(html)
        console.log('api vocabulary', vocabulary);
        res.json(vocabulary);
    }catch(err) {
        console.error(err);

        return res.status(500).json({
            error: "Vocabulary extraction failed",
        });
    }
})

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
