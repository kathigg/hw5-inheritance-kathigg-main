import { BasicFile, EditableFile, ColorfulFile } from "../src/files";

describe("Files - Problem 4", () => {
    describe("BasicFile", () => {
        test("(1 pts) Can construct BasicFile", () => {
            let myFile = new BasicFile(
                "example.txt",
                "This is the contents of the file.",
            );
            expect(myFile.getSize()).toBe(33);
            expect(myFile.getContents()).toBe(
                "This is the contents of the file.",
            );
            myFile = new BasicFile(
                "read_only.log",
                "This file is read-only.\nCan't touch this!",
            );
            expect(myFile.getSize()).toBe(41);
            expect(myFile.getContents()).toBe(
                "This file is read-only.\nCan't touch this!",
            );
        });
        test("(1 pts) Can copy BasicFile", () => {
            const myFile = new BasicFile(
                "example.txt",
                "This is the contents of the file.",
            );
            const copy = myFile.copy();
            expect(copy.getSize()).toBe(33);
            expect(copy.getContents()).toBe(
                "This is the contents of the file.",
            );
            expect(copy).not.toBe(myFile);
        });
    });

    describe("EditableFile", () => {
        test("(1 pts) Can construct EditableFile", () => {
            const myFile = new EditableFile(
                "example.txt",
                "This is the contents of the file.",
            );
            expect(myFile.getSize()).toBe(33);
            expect(myFile.getContents()).toBe(
                "This is the contents of the file.",
            );
        });
        test("(1 pts) Can write to EditableFile", () => {
            const myFile = new EditableFile(
                "example.txt",
                "This is the contents of the file.",
            );
            myFile.write("This is the new contents of the file.");
            expect(myFile.getContents()).toBe(
                "This is the new contents of the file.",
            );

            myFile.write("We can completely overwrite the file.");
            expect(myFile.getContents()).toBe(
                "We can completely overwrite the file.",
            );
        });
        test("(1 pts) Can append to EditableFile", () => {
            const myFile = new EditableFile(
                "example.txt",
                "This is the contents of the file.",
            );
            myFile.append(" And this is appended.");
            expect(myFile.getContents()).toBe(
                "This is the contents of the file. And this is appended.",
            );
            myFile.append(" And this is appended again.");
            expect(myFile.getContents()).toBe(
                "This is the contents of the file. And this is appended. And this is appended again.",
            );
        });
        test("(1 pts) Can copy EditableFile", () => {
            const myFile = new EditableFile(
                "example.txt",
                "This is the contents of the file.",
            );
            const copy = myFile.copy();
            expect(copy.getSize()).toBe(33);
            expect(copy.getContents()).toBe(
                "This is the contents of the file.",
            );
            expect(copy).not.toBe(myFile);
            copy.write(
                "If you don't re-implement copy(), then you won't be able to edit the copy.",
            );
            expect(copy.getContents()).toBe(
                "If you don't re-implement copy(), then you won't be able to edit the copy.",
            );
        });
    });

    describe("ColorfulFile", () => {
        test("(1 pts) Can construct ColorfulFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            expect(myFile.getSize()).toBe(22);
            expect(myFile.getContents()).toBe("[red]This is red text.");
        });
        test("(1 pts) Can write to ColorfulFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            myFile.write("[blue]This is blue text.");
            expect(myFile.getContents()).toBe("[blue]This is blue text.");
        });
        test("(1 pts) Can append to ColorfulFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            myFile.append("\n[bg:blue]This has a blue background.");
            expect(myFile.getContents()).toBe(
                "[red]This is red text.\n[bg:blue]This has a blue background.",
            );
        });
        test("(1 pts) Can render ColorfulFile", () => {
            // It's really just a matter of calling colorize on the contents!
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            expect(myFile.render()).toBe("\x1b[31mThis is red text.\x1b[0m");
            const longFile = new ColorfulFile(
                "example.txt",
                "The [bright][red]bright red text [underline]that is underlined.",
            );
            expect(longFile.render()).toBe(
                "The \x1b[1m\x1b[31mbright red text \x1b[4mthat is underlined.\x1b[0m",
            );
        });
        test("(1 pts) Can copy ColorfulFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            const copy = myFile.copy();
            expect(copy.getSize()).toBe(22);
            expect(copy.getContents()).toBe("[red]This is red text.");
            expect(copy).not.toBe(myFile);
            copy.write("[blue]This is blue text.");
            expect(copy.getContents()).toBe("[blue]This is blue text.");
            expect(copy.render()).toBe("\x1b[34mThis is blue text.\x1b[0m");
        });
    });

    describe("Inheritance Setup Correctly", () => {
        test("(1 pts) EditableFile extends BasicFile", () => {
            const myFile = new EditableFile(
                "example.txt",
                "This is the contents of the file.",
            );
            expect(myFile instanceof BasicFile).toBe(true);
        });
        test("(1 pts) ColorfulFile extends EditableFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            expect(myFile instanceof EditableFile).toBe(true);
        });
        test("(1 pts) ColorfulFile is a grandchild of BasicFile", () => {
            const myFile = new ColorfulFile(
                "example.txt",
                "[red]This is red text.",
            );
            expect(myFile instanceof BasicFile).toBe(true);
        });
        test("(1 pts) EditableFile has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(EditableFile.prototype),
            ).toHaveLength(4);
            expect(Object.getOwnPropertyNames(EditableFile.prototype)).toEqual(
                expect.arrayContaining([
                    "constructor",
                    "write",
                    "append",
                    "copy",
                ]),
            );
        });
        test("(1 pts) ColorfulFile has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(ColorfulFile.prototype),
            ).toHaveLength(3);
            expect(Object.getOwnPropertyNames(ColorfulFile.prototype)).toEqual(
                expect.arrayContaining(["constructor", "render", "copy"]),
            );
        });
        test("(1 pts) BasicFile has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(BasicFile.prototype),
            ).toHaveLength(5);
            expect(Object.getOwnPropertyNames(BasicFile.prototype)).toEqual(
                expect.arrayContaining([
                    "constructor",
                    "getName",
                    "getSize",
                    "getContents",
                    "copy",
                ]),
            );
        });
    });
});
