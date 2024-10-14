/*
# Problem 4) Files

Files are a basic building block of most computers. They are used to store data in a structured way.
In this problem, you will create simple classes to represent files.
The classes will be used to represent different types of files, and will have different functionality based on the type of file.
They'll be in a hierarchy, with each class extending the previous one.
    BasicFile > EditableFile > ColorfulFile
The ColorfulFile will be both editable and also have a method to render the contents with color on the terminal!
We've provided a special method called `colorize` in the `utilities` module that you can use to colorize the text.
Try running the `fileExample` function to see the classes in action using this command:
    $> npm run files

4.1. Define a class called `BasicFile`. The class should have two protected fields:
    - `name` (string)
    - `contents` (string)
    The constructor should take these two fields as parameters.
4.2. Define the following methods in the BasicFile class:
    - `getName` that returns the name of the file (a string).
    - `getSize` that returns the length of the contents (a number).
    - `getContents` that returns the contents (a string).
    **NOTE:** The BasicFile object is an immutable class! You won't be able to modify any of the fields.
4.3. Define a method called `copy` that returns a new BasicFile with the same name and contents.
    **NOTE:** This method is basically a clone method, just with a different name.
4.4. Define a class called `EditableFile` that extends `BasicFile`.
4.5. Define the following methods in the EditableFile class:
    - `write` that takes a string and sets the contents to that string. The method returns nothing (void).
    - `append` that takes a string and adds it to the contents. The method returns nothing (void).
    - `copy` that returns a new EditableFile with the same name and contents.
    **NOTE:** The EditableFile object is a mutable class! You will be able to modify the contents.
4.6. Define a class called `ColorfulFile` that extends `EditableFile` with a copy method:
    - `copy` that returns a new ColorfulFile with the same name and contents.
4.7. Define a method called `render` that returns the contents of the file with color.
    Use the `colorize` method from the `utilities` module to do this; that function consumes
    a string and returns a string with color codes embedded in it. What are color codes? They're
    special characters that the terminal uses to colorize text. You don't need to know what they are,
    since the `colorize` function will recognize a special syntax and convert it to the correct color codes.
    You can use the `colorize` function like this:
        colorize("[red]This is red text.")
        colorize("[bg:blue]This has a blue background."
        colorize("[red][bg:blue]This is red text with a blue background.")
        colorize("The [bold][red]bold red text [underline] that is underlined.")
    To learn more, check out the `colorize` function in the `utilities` module!
*/

import { colorize } from "./utilities/colorize";

/*
Your BasicFile, EditableFile, and ColorfulFile classes should go here!
*/
/*4.1. Define a class called `BasicFile`. The class should have two protected fields:
    - `name` (string)
    - `contents` (string)
*/
export class BasicFile {
    constructor(
        public name: string,
        protected contents: string,
    ) {}

    /*4.2. Define the following methods in the BasicFile class:
    - `getName` that returns the name of the file (a string).
    - `getSize` that returns the length of the contents (a number).
*/
    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.contents.length;
    }

    getContents(): string {
        return this.contents;
    }

    /* Define a method called `copy` that returns a new BasicFile with the same name and contents.
     **NOTE:** This method is basically a clone method, just with a different name.
     */

    copy(): BasicFile {
        return new BasicFile(this.name, this.contents);
    }
}

/*4.4. Define a class called `EditableFile` that extends `BasicFile`. */

export class EditableFile extends BasicFile {
    /* 4.5. Define the following methods in the EditableFile class:
    - `write` that takes a string and sets the contents to that string. The method returns nothing (void).
    - `append` that takes a string and adds it to the contents. The method returns nothing (void).
    - `copy` that returns a new EditableFile with the same name and contents.
    **NOTE:** The EditableFile object is a mutable class! You will be able to modify the contents.
    */
    write(insert: string): void {
        this.contents = insert;
    }

    append(insert: string): void {
        this.contents += insert;
    }

    copy(): EditableFile {
        return new EditableFile(this.name, this.contents);
    }
}
/*
4.6. Define a class called `ColorfulFile` that extends `EditableFile` with a copy method:
    - `copy` that returns a new ColorfulFile with the same name and contents.
*/

export class ColorfulFile extends EditableFile {
    copy(): ColorfulFile {
        return new ColorfulFile(this.name, this.contents);
    }
    /*
    4.7. Define a method called `render` that returns the contents of the file with color.
    Use the `colorize` method from the `utilities` module to do this; that function consumes
    a string and returns a string with color codes embedded in it. What are color codes? They're
    special characters that the terminal uses to colorize text. You don't need to know what they are,
    since the `colorize` function will recognize a special syntax and convert it to the correct color codes.
    You can use the `colorize` function like this:
        colorize("[red]This is red text.")
        colorize("[bg:blue]This has a blue background."
        colorize("[red][bg:blue]This is red text with a blue background.")
        colorize("The [bold][red]bold red text [underline] that is underlined.")
    To learn more, check out the `colorize` function in the `utilities` module!
    */

    render(): string {
        return colorize(this.contents);
    }
}

/**
 * Try running the `fileExample` function to see the classes in action using this command:
 *    $> npm run files
 * Note: Until you stub out the classes, you won't be able to run anything!
 */
export function fileExample(): void {
    const file = new BasicFile(
        "example.txt",
        "This is the contents of the file.",
    );
    console.log("BasicFile size:", file.getSize());
    console.log("BasicFile contents:", file.getContents());
    const copy = file.copy();
    console.log("BasicFile copy size:", copy.getSize());
    console.log("BasicFile copy contents:", copy.getContents());

    const edit = new EditableFile(
        "example.txt",
        "This is the contents of the file.",
    );
    edit.write("This is the new contents of the file.");
    console.log(edit.getContents());
    edit.append(" And this is appended.");
    console.log(edit.getContents());

    const pretty = new ColorfulFile(
        "example.txt",
        "[red]This is [blue]the contents [bg:white]of the file.",
    );
    console.log(pretty.render());

    const coeur = new ColorfulFile(
        "coeur.txt",
        `
    [white][bg:black]▄[bright][red][bg:white]▄[bright][red][bg:red]█[bright][red][bg:black]▄[normal][white][bg:black]▄[bright][red][bg:white]▄[bright][red][bg:red]█[bright][red][bg:black]▄[reset]
    [bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]▀[reset]
    [normal][black][bg:white] [bright][red][bg:red]▀[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]█[bright][red][bg:red]▀[normal][black][bg:white] [reset]
    [normal][black][bg:white] [normal][black][bg:white] [bright][red][bg:black]▀[bright][red][bg:red]█[bright][red][bg:red]▀[normal][black][bg:red]▄[normal][black][bg:white] [normal][black][bg:white] [reset]`,
    );
    console.log(coeur.render());

    const duck = new ColorfulFile(
        "duck.txt",
        `
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟[white]⣉⡥⠶⢶⣿⣿⣿⣿⣷⣆[normal]⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⡿[white]⢡⡞⠁⠀⠀⠤⠈⠿⠿⠿⠿⣿[normal][red]⠀⢻⣦⡈[normal]⠻⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⡇⠘⡁⠀[white]⢀⣀⣀⣀⣈⣁⣐⡒[normal][red]⠢⢤⡈⠛⢿⡄[normal]⠻⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⡇⠀[white]⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄[normal][red]⠉⠐⠄⡈⢀[normal]⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⠇[white]⢠⣿⣿⣿⣿⡿⢿⣿⣿⣿⠁⢈⣿⡄[normal]⠀[cyan]⢀⣀[normal]⠸⣿⣿⣿⣿
    ⣿⣿⣿⣿⡿⠟[yellow]⣡⣶⣶⣬⣭⣥⣴[normal][white]⠀⣾⣿⣿⣿⣶⣾⣿⣧[normal][cyan]⠀⣼⣿⣷⣌[normal]⡻⢿⣿
    ⣿⣿⠟[yellow]⣋⣴⣾⣿⣿⣿⣿⣿⣿⣿⡇[normal][white]⢿⣿⣿⣿⣿⣿⣿⡿[normal][cyan]⢸⣿⣿⣿⣿⣷[normal]⠄⢻
    ⡏[yellow]⠰⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⢂[normal][white]⣭⣿⣿⣿⣿⣿⠇[normal][cyan]⠘⠛⠛⢉⣉[normal]⣠⣴⣾
    ⣿⣷⣦[yellow]⣬⣍⣉⣉⣛⣛⣉⠉[normal][white]⣤⣶⣾⣿⣿⣿⣿⣿⣿⡿[normal]⢰⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧[white]⡘⣿⣿⣿⣿⣿⣿⣿⣿⡇[normal]⣼⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇[white]⢸⣿⣿⣿⣿⣿⣿⣿⠁[normal]⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
    );
    console.log(duck.render());
}
