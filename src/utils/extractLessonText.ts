import * as cheerio from "cheerio";

export function extractLessonText(html: string): string {
    const $ = cheerio.load(html);

    // Remove non-content elements
    $("script, style, nav, svg, noscript").remove();

    // Edvibe-specific elements
    const edvibeSelectors = [
        ".exercise-test-question",
        ".button_data",
    ];

    const blocks: string[] = [];

    $(edvibeSelectors.join(", ")).each((_, element) => {
        const text = $(element)
            .text()
            .replace(/\s+/g, " ")
            .trim();

        if (text && !blocks.includes(text)) {
            blocks.push(text);
        }
    });

    // Fallback for ordinary HTML
    if (blocks.length === 0) {
        const text = $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim();

        return text;
    }
    return blocks.join("\n");
}

// const text = extractLessonText("<div class=\"\"><div class=\"drag_wrapper disabled drag_component\" tabindex=\"0\" style=\"margin: 0px;\"><div class=\"data\" style=\"margin: 0px;\"><div id=\"196091230\" class=\"exercise_wrapper\"><!----><div data-v-101713c6=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-all-ex\"><div data-v-0e867552=\"\" data-v-101713c6-s=\"\" class=\"exercise-wrapper exercise-common-ui-components\"><div data-v-0e867552=\"\" class=\"exercise-wrapper-line\"></div><div data-v-0e867552=\"\" class=\"exercise-wrapper-element\"><!----><div data-v-0e867552=\"\" class=\"exercise-wrapper-block\"><!----><div data-v-0e867552=\"\" class=\"exercise-wrapper-slot\"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-101713c6=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-block\"><div data-v-4f807c9c=\"\" data-v-101713c6-s=\"\" class=\"exercise-test\"><div data-v-4f807c9c=\"\" class=\"exercise-test-block\"><div data-v-101713c6=\"\" data-v-4f807c9c=\"\" class=\"pointer-target exercise-test-block-wrap\" data-target-id=\"fp-ex-196091230-type-test-question-1721771453\"><div data-v-e628441a=\"\" data-v-4f807c9c=\"\" data-v-101713c6-s=\"\" class=\"exercise-test-block-question f fd-col g-1\" dir=\"ltr\"><div data-v-e628441a=\"\" class=\"exercise-test-question\"><div data-v-101713c6=\"\" data-v-e628441a=\"\" class=\"pointer-target w-100 f\" data-target-id=\"fp-ex-196091230-type-test-question-title-1721771453\"><div data-v-0b0a34c4=\"\" data-v-e628441a=\"\" data-v-101713c6-s=\"\" class=\"exercise-history-answers exercise-test-history\" isawaitingverification=\"true\"><div data-v-1fb31a20=\"\" data-v-0b0a34c4=\"\" class=\"tir-popover_element popover-container\"><div data-v-0b0a34c4=\"\" data-v-1fb31a20-s=\"\" class=\"indicators_wrapper f fd-col jc-c ai-c\"><div data-v-4b731a50=\"\" data-v-0b0a34c4=\"\" data-v-1fb31a20-s=\"\" class=\"exercise-indicators indicators\"><div data-v-4b731a50=\"\" class=\"emoji-animation\"><!----><!----><div data-v-3f4b27f6=\"\" data-v-4b731a50=\"\" class=\"exercise-indicators-item item\" style=\"height: 5px; width: 5px;\"></div></div><!----><!----></div><i data-v-0b0a34c4=\"\" data-v-1fb31a20-s=\"\" class=\"comment-icon iconedv-Error-Comment\"></i></div></div></div> Lesson plan<!----></div></div><div data-v-e628441a=\"\" class=\"exercise-test-answers\"><div data-v-101713c6=\"\" data-v-e628441a=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-test-question-1721771453-item-0\"><div data-v-e628441a=\"\" data-v-101713c6-s=\"\" class=\"exercise-test-answers-item\" style=\"cursor: default;\"><!----><div class=\"f g-2 ai-c\"><div class=\"emoji-animation\" style=\"height: 24px;\"><!----><!----><div data-v-dbf7807a=\"\" class=\"edvibe3-exercise-checkbox\"><div data-v-409d75aa=\"\" data-v-dbf7807a=\"\" class=\"tir-checkbox is-disabled control\" test=\"\"><div data-v-409d75aa=\"\" class=\"icon\"><i data-v-409d75aa=\"\" class=\"iconedv-Done\"></i></div></div></div></div><div class=\"button_data\">revise previous material</div></div></div><!----></div></div><div data-v-e628441a=\"\" class=\"exercise-test-answers\"><div data-v-101713c6=\"\" data-v-e628441a=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-test-question-1721771453-item-1\"><div data-v-e628441a=\"\" data-v-101713c6-s=\"\" class=\"exercise-test-answers-item\" style=\"cursor: default;\"><!----><div class=\"f g-2 ai-c\"><div class=\"emoji-animation\" style=\"height: 24px;\"><!----><!----><div data-v-dbf7807a=\"\" class=\"edvibe3-exercise-checkbox\"><div data-v-409d75aa=\"\" data-v-dbf7807a=\"\" class=\"tir-checkbox is-disabled control\" test=\"\"><div data-v-409d75aa=\"\" class=\"icon\"><i data-v-409d75aa=\"\" class=\"iconedv-Done\"></i></div></div></div></div><div class=\"button_data\">talk about English language</div></div></div><!----></div></div><div data-v-e628441a=\"\" class=\"exercise-test-answers\"><div data-v-101713c6=\"\" data-v-e628441a=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-test-question-1721771453-item-2\"><div data-v-e628441a=\"\" data-v-101713c6-s=\"\" class=\"exercise-test-answers-item\" style=\"cursor: default;\"><!----><div class=\"f g-2 ai-c\"><div class=\"emoji-animation\" style=\"height: 24px;\"><!----><!----><div data-v-dbf7807a=\"\" class=\"edvibe3-exercise-checkbox\"><div data-v-409d75aa=\"\" data-v-dbf7807a=\"\" class=\"tir-checkbox is-disabled control\" test=\"\"><div data-v-409d75aa=\"\" class=\"icon\"><i data-v-409d75aa=\"\" class=\"iconedv-Done\"></i></div></div></div></div><div class=\"button_data\">discuss origins of languages</div></div></div><!----></div></div><div data-v-e628441a=\"\" class=\"exercise-test-answers\"><div data-v-101713c6=\"\" data-v-e628441a=\"\" class=\"pointer-target\" data-target-id=\"fp-ex-196091230-type-test-question-1721771453-item-3\"><div data-v-e628441a=\"\" data-v-101713c6-s=\"\" class=\"exercise-test-answers-item\" style=\"cursor: default;\"><!----><div class=\"f g-2 ai-c\"><div class=\"emoji-animation\" style=\"height: 24px;\"><!----><!----><div data-v-dbf7807a=\"\" class=\"edvibe3-exercise-checkbox\"><div data-v-409d75aa=\"\" data-v-dbf7807a=\"\" class=\"tir-checkbox is-disabled control\" test=\"\"><div data-v-409d75aa=\"\" class=\"icon\"><i data-v-409d75aa=\"\" class=\"iconedv-Done\"></i></div></div></div></div><div class=\"button_data\">practise new grammar and vocabulary</div></div></div><!----></div></div><!----></div><!----></div></div></div><!----></div><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></div><!----></div><div data-v-0e867552=\"\" class=\"exercise-wrapper-actions\"><!----></div><div data-v-0e867552=\"\" class=\"exercise-wrapper-element_statistic-label\" style=\"top: 16px;\"><!----></div></div><!----></div><!----></div></div></div></div></div>")
// console.log('result text',text)
