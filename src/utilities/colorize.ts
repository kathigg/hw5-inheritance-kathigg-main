/*
A simple utility to colorize text using ANSI codes.
To actually use the colorized text, you will need to log it to the console.
You don't have to edit this file, you'll use it unchanged.
But we added some comments since we thought you might find it interesting!

Complete reference list of commands:
    [reset] or [normal] - Resets all attributes to their defaults.
    [bright] or [bold] - Sets text to bight.
    [dim] or [faint] - Sets text to dim.
    [underscore] or [underline] - Sets text to underlined.
    [blink] - Sets text to blink. Fairly unreliable
    [reverse] - Sets text to reverse video (opposite of whatever they currently are).
    [hidden] - Sets text to be hidden.

Foreground color commands:
    [black] - Sets the foreground color to black.
    [red] - Sets the foreground color to red.
    [green] - Sets the foreground color to green.
    [yellow] - Sets the foreground color to yellow.
    [blue] - Sets the foreground color to blue.
    [magenta] - Sets the foreground color to magenta.
    [cyan] - Sets the foreground color to cyan.
    [white] - Sets the foreground color to white.

Background color commands:
    [bg:black] - Sets the background color to black.
    [bg:red] - Sets the background color to red.
    [bg:green] - Sets the background color to green.
    [bg:yellow] - Sets the background color to yellow.
    [bg:blue] - Sets the background color to blue.
    [bg:magenta] - Sets the background color to magenta.
    [bg:cyan] - Sets the background color to cyan.
    [bg:white] - Sets the background color to white.
*/

/**
 * Parses a color command and returns the ANSI code for it.
 * If the color is not recognized, throws an error.
 * @param color The color command to parse.
 * @returns The ANSI code for the color.
 */
export function parseColorCommand(color: string): number {
    color = color.toLowerCase();
    let foreground = true;
    if (color.startsWith("bg:")) {
        color = color.substring(3);
        foreground = false;
    }
    if (color === "black") {
        return foreground ? 30 : 40;
    } else if (color === "red") {
        return foreground ? 31 : 41;
    } else if (color === "green") {
        return foreground ? 32 : 42;
    } else if (color === "yellow") {
        return foreground ? 33 : 43;
    } else if (color === "blue") {
        return foreground ? 34 : 44;
    } else if (color === "magenta") {
        return foreground ? 35 : 45;
    } else if (color === "cyan") {
        return foreground ? 36 : 46;
    } else if (color === "white") {
        return foreground ? 37 : 47;
    } else {
        throw new Error(`Unknown color or command: ${color}`);
    }
}

/**
 * Parses a command and returns the ANSI code for it.
 * If the command is not recognized, we assume it is a color command
 * and use a separate function to check it.
 * @param mode The command to parse.
 * @returns The ANSI code for the command.
 */
export function parseCommand(mode: string) {
    mode = mode.toLowerCase();
    if (mode === "reset" || mode === "normal") {
        return 0;
    } else if (mode === "bright" || mode === "bold") {
        return 1;
    } else if (mode === "dim" || mode === "faint") {
        return 2;
    } else if (mode === "underscore" || mode === "underline") {
        return 4;
    // Not usually available, I believe
    } else if (mode === "blink") {
        return 5;
    } else if (mode === "reverse") {
        return 7;
    } else if (mode === "hidden") {
        return 8;
    } else {
        return parseColorCommand(mode);
    }
}

/**
 * Given a command and some text, returns the text with the ANSI code for the command prepended.
 * @param command The command to use.
 * @param text The text to colorize.
 * @returns The text with the ANSI code prepended.
 */
export function makeAnsiCode(command: string, text: string): string {
    const modeCode = parseCommand(command);
    return `\x1b[${modeCode}m${text}`;
}

/**
 * Given a string with color commands, returns the string with ANSI codes injected in place
 * of the commands. The commands should always be in the format "[color]" or "[mode]".
 * @example "[red]Hello, [green]world![reset]"
 * @param text The text to colorize.
 * @returns The colorized text with ansi codes.
 */
export function colorize(text: string): string {
    const tokens = text.split("[");
    const colored = [];
    // If the text doesn't start with a color command, we need to add the first part to the colored array.
    if (!text.startsWith("[")) {
        colored.push(tokens.shift());
    }
    // Iterate through the tokens and colorize them
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.length === 0) {
            continue;
        }
        // Find the next closing bracket
        const parts = token.split("]");
        if (parts.length !== 2) {
            throw new Error(`Invalid token: ${token}`);
        }
        // Add the colorized text to the array
        const colorized = makeAnsiCode(parts[0], parts[1]);
        colored.push(colorized);
    }
    // Make sure to reset the color at the end, or the rest of the terminal will be funky
    return colored.join("") + "\x1b[0m";
}

// console.log(colorize("[red]Hello, [green][underscore]world[bg:blue]!"))