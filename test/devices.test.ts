import { OperatingSystem, Device, Phone } from "../src/devices";

describe("Devices - Problem 5", () => {
    describe("OperatingSystem", () => {
        test("(1 pts) Can add files", () => {
            const os = new OperatingSystem();
            os.addFile("example.txt", "This is the contents of the file.");
            os.addFile("history.log", "First line.\nSecond line!");
            const exampleFile = os.openFile("example.txt");
            const historyFile = os.openFile("history.log");
            expect(exampleFile.getContents()).toBe(
                "This is the contents of the file.",
            );
            expect(exampleFile.getName()).toBe("example.txt");
            expect(exampleFile.getSize()).toBe(33);
            expect(historyFile.getContents()).toBe("First line.\nSecond line!");
            expect(historyFile.getName()).toBe("history.log");
            expect(historyFile.getSize()).toBe(24);
        });
        test("(1 pts) Can't open non-existent files", () => {
            const os = new OperatingSystem();
            os.addFile("example.txt", "This is the contents of the file.");
            os.addFile("history.log", "First line.\nSecond line!");
            const missingFile = os.openFile("non_existent.txt");
            expect(missingFile.getContents()).toBe("");
            expect(missingFile.getSize()).toBe(0);
            expect(missingFile.getName()).toBe("EMPTY");
        });
    });

    describe("Device", () => {
        test("(1 pts) Can construct Device", () => {
            const myDevice = new Device("My Device", 100);
            expect(myDevice.name).toBe("My Device");
            expect(myDevice.weight).toBe(100);

            const myOtherDevice = new Device("My Other Device", 200);
            expect(myOtherDevice.name).toBe("My Other Device");
            expect(myOtherDevice.weight).toBe(200);
        });
    });

    describe("Phone", () => {
        test("(1 pts) Can construct Phone", () => {
            const myPhone = new Phone("My Phone", 200);
            expect(myPhone.name).toBe("My Phone");
            expect(myPhone.weight).toBe(200);
        });
        test("(1 pts) Can add contacts", () => {
            const myPhone = new Phone("My Phone", 200);
            myPhone.addContact("Dijkstra");
            myPhone.addContact("Turing");
            myPhone.addContact("Hopper");
        });
        test("(1 pts) Can send texts to contacts", () => {
            const myPhone = new Phone("My Phone", 200);
            expect(myPhone.sendText("Ada", "Good girl!")).toBe(true);
            expect(myPhone.sendText("Babbage", "Good boy!")).toBe(true);
            expect(myPhone.sendText("Captain", "Good boy!")).toBe(true);
            myPhone.addContact("Domino");
            expect(myPhone.sendText("Domino", "Good girl!")).toBe(true);
        });
        test("(1 pts) Can't send texts to non-contacts", () => {
            const myPhone = new Phone("My Phone", 200);
            expect(myPhone.sendText("Domino", "Good girl!")).toBe(false);
            expect(
                myPhone.sendText("Gauss", "Hey how'd you get into my house?"),
            ).toBe(false);
            myPhone.addContact("Domino");
            expect(myPhone.sendText("Domino", "Good girl!")).toBe(true);
            expect(
                myPhone.sendText("Gauss", "Hey how'd you get into my house?"),
            ).toBe(false);
        });
        test("(1 pts) Can get history", () => {
            const myPhone = new Phone("My Phone", 200);
            myPhone.sendText("Ada", "Good girl!");
            expect(myPhone.getHistory()).toBe("Sent text to Ada: Good girl!\n");
            myPhone.sendText("Babbage", "Good boy!");
            expect(myPhone.getHistory()).toBe(
                "Sent text to Ada: Good girl!\nSent text to Babbage: Good boy!\n",
            );
            myPhone.sendText("Domino", "Good girl!");
            expect(myPhone.getHistory()).toBe(
                "Sent text to Ada: Good girl!\nSent text to Babbage: Good boy!\n",
            );
        });
        test("(1 pts) Confirm that Device and Phone are related correctly", () => {
            const myPhone = new Phone("My Phone", 200);
            expect(myPhone).toBeInstanceOf(Device);
        });
        test("(1 pts) Confirm that OperatingSystem and Phone are related correctly", () => {
            const myPhone = new Phone("My Phone", 200);
            expect(myPhone).not.toBeInstanceOf(OperatingSystem);
        });
        test("(1 pts) Confirm that OperatingSystem and Device are related correctly", () => {
            const myDevice = new Device("My Device", 100);
            expect(myDevice).not.toBeInstanceOf(OperatingSystem);
        });
        test("(1 pts) Confirm that Phone has appropriate members", () => {
            expect(Object.getOwnPropertyNames(Phone.prototype)).toHaveLength(4);
            expect(Object.getOwnPropertyNames(Phone.prototype)).toEqual(
                expect.arrayContaining([
                    "constructor",
                    "addContact",
                    "sendText",
                    "getHistory",
                ]),
            );
        });
        test("(1 pts) Confirm that Device has appropriate members", () => {
            expect(Object.getOwnPropertyNames(Device.prototype)).toHaveLength(
                1,
            );
            expect(Object.getOwnPropertyNames(Device.prototype)).toEqual(
                expect.arrayContaining(["constructor"]),
            );
        });
        test("(1 pts) Confirm that OperatingSystem has appropriate members", () => {
            expect(
                Object.getOwnPropertyNames(OperatingSystem.prototype),
            ).toHaveLength(3);
            expect(
                Object.getOwnPropertyNames(OperatingSystem.prototype),
            ).toEqual(
                expect.arrayContaining(["addFile", "openFile", "constructor"]),
            );
        });
    });
});
