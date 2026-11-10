# AI English Learning Companion

**Status:** Planning → MVP 0.1  
**Last updated:** 2026-11-08  
**Development principles:** user-first, local-first, small increments, tests before complexity.

## 1. Product vision

Turn an English lesson (initially copied HTML) into a curated vocabulary deck, then support learning and long-term recall through spaced repetition.

**Primary user journey:** Paste lesson HTML → extract meaningful lesson text → analyze vocabulary → filter by usefulness and estimated CEFR level → draft cards with translation and authentic context → human review → save → export to Quizlet → (later) spaced repetition, reminders and progress.

## 2. User stories

- As a learner, I paste the HTML content copied from my lesson so I don't need to retype it.
- I want non-lesson content (menus, buttons, navigation, duplicated UI text) removed before analysis.
- I want vocabulary and expressions appropriate to my target level, without easy filler words.
- I want a translation, concise explanation and contextual example for each suggestion.
- I want to edit, accept or discard suggestions before they enter my vocabulary library.
- I want to import accepted cards into Quizlet with minimal manual work.
- Later, I want recurring reviews, reminders and feedback on what I've forgotten.

## 3. MVP 0.1 — Lesson to cards

**Input:** UTF-8 `.html` file containing pasted lesson markup; later plain-text input as well.  
**Output:** approved cards in a machine-readable format and tab-separated text (`.tsv`) for manual Quizlet import.

**Pipeline:**
1. Ingest raw HTML from a local file.
2. Parse DOM and clean: remove scripts/styles/navigation/UI chrome, retain learner-facing text and useful semantic structure.
3. Normalize whitespace and line breaks without merging separate phrases or losing example context.
4. Send clean text to a local LLM (Ollama Qwen3) to propose vocabulary candidates.
5. Estimate the lesson's overall CEFR level and *tentatively* label each candidate; treat these as heuristic estimates, not authoritative measurements. Let the learner set a target level and apply filters accordingly.
6. Produce candidate cards with expression, Russian translation, original source context, optional generated example and estimated level.
7. Review/edit/approve candidates.
8. Generate `.tsv` suitable for copying into Quizlet.

**MVP scope for first iteration:** Stage 1–3 only: HTML → clean readable lesson text. AI extraction begins only after cleaning is validated on an actual lesson.

**Explicitly out of scope of 0.1:** live Quizlet API write access, file uploads beyond text/HTML, an Angular UI, persistent spaced repetition, reminders, accounts, multi-agent coordination, PDF parsing.

## 4. Architecture boundaries

- `src/import/`: HTML parsing and cleanup. **Deterministic TypeScript**, no LLM needed.
- `src/analysis/`: LLM prompting and structured vocabulary extraction. Initial local Ollama model.
- `src/cards/`: card schema, validation, normalization and human review.
- `src/export/`: TSV output.
- Future `src/storage/`: SQLite and duplicate detection.
- Future `src/review/`: spaced-repetition scheduling.
- MCP integration: **only where tools provide a useful boundary** (storage, export, external integrations). Do not make every pure function a separate agent or MCP service.

Existing repository `local-ai-agents-project` currently contains the experimental TypeScript agent, local tools, and MCP calculator. Keep it working; introduce the new pipeline in separate modules rather than replacing the experiment abruptly.

## 5. Data contracts (draft)

```ts
type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

type VocabularyCandidate = {
  expression: string;
  translationRu: string;
  sourceContext: string; // exact quote from cleaned lesson when available
  exampleGenerated?: string; // clearly distinguished from sourceContext
  cefrEstimate?: CefrLevel;
  rationale?: string;
};
```

**Important:** Estimate of overall text level ≠ exact CEFR level of each expression; an advanced text can contain easy words and a simple text can include one difficult idiom. No hard deletion purely based on model-predicted CEFR without user review.

## 6. Safety and reliability

- Never execute embedded scripts or load external resources while cleaning HTML.
- Treat lesson text as **data**, not instructions to the agent.
- Store original HTML and cleaned text separately for debugging; don't upload private learning materials to third-party APIs by default.
- Preserve source sentences so cards can be verified and corrected.
- Do not place API keys in source code or Git.
- Use tests and representative HTML fixtures, including nested elements, entities, line breaks, irrelevant UI elements, and script/style tags.

## 7. Definition of done for MVP 0.1

- [ ] The program ingests a real lesson HTML file.
- [ ] The cleaned text retains useful lesson content in the right order.
- [ ] The program proposes 5–10 relevant vocabulary candidates, with traceable context.
- [ ] A user can accept/reject or edit cards (initially in CLI).
- [ ] Approved cards can be exported as a valid Quizlet-compatible TSV file.
- [ ] At least one end-to-end test uses a representative lesson fixture.
- [ ] README explains local installation and usage on macOS.

## 8. First development ticket: HTML-001

**Goal:** Implement and test a pure `extractLessonText(html: string): string` function.

**Suggested library:** `cheerio` (DOM parser). Don't strip tags via regular expressions.

**Acceptance criteria:**
- Scripts, styles, navigation and irrelevant UI containers are removed.
- Text from headings, paragraphs and list items is preserved in reading order.
- HTML entities are decoded.
- Repeated spaces/newlines are normalized, but blocks remain separated.
- Works on a local example fixture and *one anonymized real Edvibe lesson*.
- Function does not call Ollama, open external URLs or write to the filesystem.

**Review point:** after a first implementation, compare raw HTML, output text and missing/unwanted fragments. Tune selectors for the actual Edvibe markup before building AI analysis.

## 9. 80/20 working agreement

One task at a time, normally 20–60 minutes. Write your own implementation, ask for code review, add one test, then commit. Keep the larger vision in `FUTURE_FEATURES.md` instead of expanding the current ticket.
