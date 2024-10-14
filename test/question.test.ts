import {
    QuizQuestion,
    ShortAnswerQuestion,
    TrueFalseQuestion,
    MultipleChoiceQuestion,
} from "../src/question";

describe("Quiz Questions - Problem 3", () => {
    describe("ShortAnswerQuestion", () => {
        test("(2 pts) ShortAnswerQuestion ask", () => {
            const myQuestion = new ShortAnswerQuestion(
                "Delaware",
                "What is the capital of Delaware?",
                "Dover",
            );
            expect(myQuestion.ask()).toBe(
                "What is the capital of Delaware?\n> ",
            );
            const myQuestion2 = new ShortAnswerQuestion(
                "Maryland",
                "What is the capital of Maryland?",
                "Annapolis",
            );
            expect(myQuestion2.ask()).toBe(
                "What is the capital of Maryland?\n> ",
            );
            const myQuestion3 = new ShortAnswerQuestion(
                "Math",
                "What is 2+2?",
                "4",
            );
            expect(myQuestion3.ask()).toBe("What is 2+2?\n> ");
        });
        test("(2 pts) ShortAnswerQuestion check", () => {
            const myQuestion = new ShortAnswerQuestion(
                "Delaware",
                "What is the capital of Delaware?",
                "Dover",
            );
            expect(myQuestion.check("Dover")).toBe(true);
            expect(myQuestion.check("dover")).toBe(false);
            expect(myQuestion.check("Wilmington")).toBe(false);
            const myQuestion2 = new ShortAnswerQuestion(
                "Maryland",
                "What is the capital of Maryland?",
                "Annapolis",
            );
            expect(myQuestion2.check("Annapolis")).toBe(true);
            const myQuestion3 = new ShortAnswerQuestion(
                "Math",
                "What is 2+2?",
                "4",
            );
            expect(myQuestion3.check("4")).toBe(true);
            expect(myQuestion3.check("Four")).toBe(false);
        });
    });
    describe("TrueFalseQuestion", () => {
        test("(2 pts) TrueFalseQuestion ask", () => {
            // Literally just controversial opinions to sow dissent
            let myQuestion = new TrueFalseQuestion(
                "HotDogs",
                "A hotdog is a sandwich.",
                "True",
            );
            expect(myQuestion.ask()).toBe(
                "A hotdog is a sandwich.\n> True or False?",
            );
            myQuestion = new TrueFalseQuestion(
                "PineapplePizza",
                "Pineapple belongs on pizza.",
                "False",
            );
            expect(myQuestion.ask()).toBe(
                "Pineapple belongs on pizza.\n> True or False?",
            );
            myQuestion = new TrueFalseQuestion(
                "DressColor",
                "The dress is blue and black.",
                "True",
            );
        });
        test("(2 pts) TrueFalseQuestion check", () => {
            let myQuestion = new TrueFalseQuestion(
                "HotDogs",
                "A hotdog is a sandwich.",
                "True",
            );
            expect(myQuestion.check("True")).toBe(true);
            expect(myQuestion.check("true")).toBe(true);
            expect(myQuestion.check("False")).toBe(false);
            myQuestion = new TrueFalseQuestion(
                "PineapplePizza",
                "Pineapple belongs on pizza.",
                "False",
            );
            expect(myQuestion.check("False")).toBe(true);
            expect(myQuestion.check("true")).toBe(false);
            myQuestion = new TrueFalseQuestion(
                "DressColor",
                "The dress is blue and black.",
                "True",
            );
            expect(myQuestion.check("True")).toBe(true);
            expect(myQuestion.check("False")).toBe(false);
        });
    });
    describe("MultipleChoiceQuestion", () => {
        test("(2 pts) MultipleChoiceQuestion ask", () => {
            // If you pass the person in 3rd place, you BECOME the person in 3rd place.
            const question =
                "You're 4th place in a race; what place will you be when you pass the person in 3rd place?";
            let myQuestion = new MultipleChoiceQuestion(
                "Race",
                question,
                "3rd",
                ["1st", "2nd", "3rd", "4th"],
            );
            expect(myQuestion.ask()).toBe(
                question + "\n1. 1st\n2. 2nd\n3. 3rd\n4. 4th\n> ",
            );
            // All months have 28 days. One month has exactly 28 days, and the rest have more.
            myQuestion = new MultipleChoiceQuestion(
                "Months",
                "How many months have 28 days?",
                "All",
                ["1", "2", "12"],
            );
            expect(myQuestion.ask()).toBe(
                "How many months have 28 days?\n1. 1\n2. 2\n3. 12\n> ",
            );
            // The LLM generated this one. I guess that's the answer!
            myQuestion = new MultipleChoiceQuestion(
                "Riddles",
                "The more you take, the more you leave behind. What am I?",
                "Footsteps",
                ["Footsteps", "Time", "Money", "Memories"],
            );
            expect(myQuestion.ask()).toBe(
                "The more you take, the more you leave behind. What am I?\n1. Footsteps\n2. Time\n3. Money\n4. Memories\n> ",
            );
        });

        test("(2 pts) MultipleChoiceQuestion check", () => {
            // If you pass the person in 3rd place, you BECOME the person in 3rd place.
            const question =
                "You're 4th place in a race; what place will you be when you pass the person in 3rd place?";
            let myQuestion = new MultipleChoiceQuestion(
                "Race",
                question,
                "3rd",
                ["1st", "2nd", "3rd", "4th"],
            );
            expect(myQuestion.check("1st")).toBe(false);
            expect(myQuestion.check("2nd")).toBe(false);
            expect(myQuestion.check("3rd")).toBe(true);
            expect(myQuestion.check("4th")).toBe(false);
            // All months have 28 days. One month has exactly 28 days, and the rest have more.
            myQuestion = new MultipleChoiceQuestion(
                "Months",
                "How many months have 28 days?",
                "12",
                ["1", "2", "12"],
            );
            expect(myQuestion.check("1")).toBe(false);
            expect(myQuestion.check("2")).toBe(false);
            expect(myQuestion.check("12")).toBe(true);
            // The LLM generated this one. I guess that's the answer!
            myQuestion = new MultipleChoiceQuestion(
                "Riddles",
                "The more you take, the more you leave behind. What am I?",
                "Footsteps",
                ["Footsteps", "Time", "Money", "Memories"],
            );
            expect(myQuestion.check("Footsteps")).toBe(true);
            expect(myQuestion.check("Time")).toBe(false);
            expect(myQuestion.check("Money")).toBe(false);
            expect(myQuestion.check("Memories")).toBe(false);
        });
    });

    describe("Inheritance Setup Correctly", () => {
        test("(1 pts) ShortAnswerQuestion extends QuizQuestion", () => {
            const myQuestion = new ShortAnswerQuestion(
                "Delaware",
                "What is the capital of Delaware?",
                "Dover",
            );
            expect(myQuestion instanceof QuizQuestion).toBe(true);
        });
        test("(1 pts) TrueFalseQuestion extends QuizQuestion", () => {
            const myQuestion = new TrueFalseQuestion(
                "HotDogs",
                "A hotdog is a sandwich.",
                "True",
            );
            expect(myQuestion instanceof QuizQuestion).toBe(true);
        });
        test("(1 pts) MultipleChoiceQuestion extends QuizQuestion", () => {
            const myQuestion = new MultipleChoiceQuestion(
                "Math",
                "What is 2+2?",
                "4",
                ["1", "2", "3", "4"],
            );
            expect(myQuestion instanceof QuizQuestion).toBe(true);
        });
        test("(1 pts) QuizQuestion has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(QuizQuestion.prototype),
            ).toHaveLength(2);
            expect(Object.getOwnPropertyNames(QuizQuestion.prototype)).toEqual(
                expect.arrayContaining(["constructor", "check"]),
            );
        });
        test("(1 pts) ShortAnswerQuestion has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(ShortAnswerQuestion.prototype),
            ).toHaveLength(2);
            expect(
                Object.getOwnPropertyNames(ShortAnswerQuestion.prototype),
            ).toEqual(expect.arrayContaining(["constructor", "ask"]));
        });
        test("(1 pts) TrueFalseQuestion has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(TrueFalseQuestion.prototype),
            ).toHaveLength(3);
            expect(
                Object.getOwnPropertyNames(TrueFalseQuestion.prototype),
            ).toEqual(expect.arrayContaining(["constructor", "ask", "check"]));
        });
        test("(1 pts) MultipleChoiceQuestion has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(MultipleChoiceQuestion.prototype),
            ).toHaveLength(2);
            expect(
                Object.getOwnPropertyNames(MultipleChoiceQuestion.prototype),
            ).toEqual(expect.arrayContaining(["constructor", "ask"]));
        });
    });
});
