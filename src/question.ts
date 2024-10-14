/*
# Problem 3) Quiz Questions

You are going to define four classes, one of which will be a parent to the other three.
These classes will represent questions on a quiz, to create a quiz-taking application.

3.1. Define a class called `QuizQuestion`. The class should have three protected fields:
    - `title` (string)
    - `body` (string)
    - `expectedAnswer` (string)
    The constructor should take these three fields as parameters.
3.2. Define a QuizQuestion method called `check` that takes a string and returns a boolean.
    This method should return true if the given string matches the expected answer, and false otherwise.
    **NOTE:** You do not need an `if` statement to do this!
3.3. Define a class called `ShortAnswerQuestion` that extends `QuizQuestion`.
    3.3.1.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by a newline, a `>` character, and a space.
    **Note:** You shouldn't define a check method in this class. It should inherit the check method from QuizQuestion.
3.4. Define a class called `TrueFalseQuestion` that extends `QuizQuestion`.
    3.4.1.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by the text `"\n> True or False?"`.
    3.4.2.  The class should override the `check` method to return true if the given string matches the 
            expected answer, ignoring case. Use the `toLowerCase` method to do this.
3.5. Define a class called `MultipleChoiceQuestion` that extends `QuizQuestion`.
    3.5.1.  The class should have a constructor that takes an additional protected parameter: `options` (string array).
            **NOTE**: Remember to call `super` in the constructor!
    3.5.2.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by a newline and the options, each on its own line.
            The options should be numbered starting at 1, and each should be followed by a period and a space.
            The string should end with a newline, a `>` character, and then a final space.
            **NOTE:** The `ask` method should not actually print anything. It should just return the string that would be printed.
            **NOTE:** If you're having trouble getting the output to match the expected output, you should check the tests to see what the expected output is.
*/

export class QuizQuestion {
    /*Define a class called `QuizQuestion`. The class should have three protected fields:
    - `title` (string)
    - `body` (string)
    - `expectedAnswer` (string)
    The constructor should take these three fields as parameters.
    */
    constructor(
        protected title: string,
        protected body: string,
        protected expectedAnswer: string,
    ) {}
    /*
    Define a QuizQuestion method called `check` that takes a string and returns a boolean.
    This method should return true if the given string matches the expected answer, and false otherwise.
    **NOTE:** You do not need an `if` statement to do this!
    */

    check(test: string) {
        return test === this.expectedAnswer;
    }
}

/* Define a class called `ShortAnswerQuestion` that extends `QuizQuestion`.
    3.3.1.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by a newline, a `>` character, and a space.
    **Note:** You shouldn't define a check method in this class. It should inherit the check method from QuizQuestion.
*/

export class ShortAnswerQuestion extends QuizQuestion {
    ask(): string {
        return this.body + "\n" + "> ";
    }
}

/* 3.4. Define a class called `TrueFalseQuestion` that extends `QuizQuestion`.
    3.4.1.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by the text `"\n> True or False?"`.
    3.4.2.  The class should override the `check` method to return true if the given string matches the 
            expected answer, ignoring case. Use the `toLowerCase` method to do this.
*/

export class TrueFalseQuestion extends QuizQuestion {
    ask(): string {
        return this.body + "\n> True or False?";
    }
    check(test: string) {
        return test.toLowerCase() === this.expectedAnswer.toLowerCase();
    }
}

/* 3.5. Define a class called `MultipleChoiceQuestion` that extends `QuizQuestion`.
    3.5.1.  The class should have a constructor that takes an additional protected parameter: `options` (string array).
            **NOTE**: Remember to call `super` in the constructor!
    3.5.2.  The class should have a method called `ask` that returns a string.
            The string should be the body of the question followed by a newline and the options, each on its own line.
            The options should be numbered starting at 1, and each should be followed by a period and a space.
            The string should end with a newline, a `>` character, and then a final space.
            **NOTE:** The `ask` method should not actually print anything. It should just return the string that would be printed.
            **NOTE:** If you're having trouble getting the output to match the expected output, you should check the tests to see what the expected output is.
*/
export class MultipleChoiceQuestion extends QuizQuestion {
    constructor(
        protected title: string,
        protected body: string,
        protected expectedAnswer: string,
        protected options: string[],
    ) {
        super(title, body, expectedAnswer);
    }

    ask(): string {
        let final: string = this.body + "\n";
        for (let i: number = 1; i < this.options.length + 1; i += 1) {
            let temp: string = i + ". " + this.options[i - 1];
            final += temp + "\n";
        }
        final += "> ";
        return final;
    }
}
