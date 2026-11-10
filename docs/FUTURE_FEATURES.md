# AI English Learning Companion — Future Features / Parking Lot

Ideas are not commitments. Prioritize after the previous end-to-end workflow works.

## Vocabulary intelligence
- [ ] Estimate the overall lesson CEFR level (A1–C2), displaying uncertainty.
- [ ] Filter candidate expressions by user's target CEFR range; do not confuse lesson level with vocabulary level.
- [ ] Prioritize collocations, idioms, phrasal verbs, academic vocabulary, and context-specific meanings.
- [ ] Personalize suggestions based on previously learned words.
- [ ] Duplicate and near-duplicate detection across lessons.
- [ ] Flag uncertain translations and generated examples for review.

## Input and content handling
- [ ] `.txt`, `.html`, `.docx`, `.pdf` ingestion with appropriate parsers.
- [ ] Import lesson content from supported sources with user authorization.
- [ ] Chunk long lessons while preserving context and references.
- [ ] Support teacher feedback and corrected learner sentences.

## Cards and learning
- [ ] Custom flashcard viewer/editor (potential Quizlet replacement).
- [ ] Quizlet import/export workflow; avoid assuming writable API access.
- [ ] Audio pronunciation and example sentences.
- [ ] Practice generation: fill in the blank, translation, cloze tests.
- [ ] Spaced-repetition scheduling (simple first, FSRS later if justified).
- [ ] Self-evaluation: again/hard/good/easy and history of reviews.
- [ ] Reminders integrated with macOS, Calendar or another supported service.
- [ ] Dashboard: progress, retained vocabulary, forgotten words.

## Engineering / portfolio
- [ ] SQLite storage; migrations and indexes.
- [ ] Angular Signals-based frontend after CLI workflow proves useful.
- [ ] Evals on labeled lesson examples and extraction quality.
- [ ] Optional multi-agent architecture *only if a concrete need emerges*.
- [ ] Local model quality/performance comparison.
- [ ] Docker/CI, release packaging, security and privacy controls.
