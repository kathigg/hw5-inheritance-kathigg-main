import {
    BankAccount,
    SafeAccount,
    bankAccountExample,
    safeAccountExample,
} from "../src/bank";

describe("Bank Accounts - Problem 1", () => {
    describe("BankAccount", () => {
        test("(1 pts) Should allow deposit and withdraw", () => {
            const myBankAccount = new BankAccount(100);
            expect(myBankAccount.deposit(50)).toBe(150);
            expect(myBankAccount.withdraw(10)).toBe(10);
            expect(myBankAccount.withdraw(1000)).toBe(1000);
            expect(myBankAccount.deposit(-2000)).toBe(140 - 1000 - 2000);
            expect(myBankAccount.withdraw(-50)).toBe(-50);
            expect(myBankAccount.deposit(0)).toBe(140 - 1000 - 2000 + 50);
        });

        test("(1 pts) Password is super simple", () => {
            const myBankAccount = new BankAccount(100);
            expect(myBankAccount.checkPassword("12345")).toBe(true);
            expect(myBankAccount.checkPassword("Apple Banana Pear")).toBe(
                false,
            );
        });
    });

    describe("SafeAccount", () => {
        test("(1 pts) Can construct SafeAccount", () => {
            const mySafeAccount = new SafeAccount(100);
            // Normally not allowed (because its private), but we're testing you
            expect(mySafeAccount["balance"]).toBe(100);
            expect(mySafeAccount["password"]).toBe("");
            expect(mySafeAccount["log"]).toEqual([]);
        });

        test("(1 pts) Can change password", () => {
            const mySafeAccount = new SafeAccount(100);
            mySafeAccount.changePassword("hunter2");
            expect(mySafeAccount["password"]).toBe("hunter2");
            mySafeAccount.changePassword("PaSsWoRd");
            expect(mySafeAccount["password"]).toBe("PaSsWoRd");
        });
        test("(1 pts) Can check password", () => {
            const mySafeAccount = new SafeAccount(100);
            expect(mySafeAccount.checkPassword("hunter2")).toBe(false);
            // Remember: empty string is not a valid password
            expect(mySafeAccount.checkPassword("")).toBe(false);
            mySafeAccount.changePassword("hunter2");
            expect(mySafeAccount.checkPassword("hunter2")).toBe(true);
            expect(mySafeAccount.checkPassword("PaSsWoRd")).toBe(false);
            expect(mySafeAccount.checkPassword("")).toBe(false);
            // But you can set the password to the empty string!
            mySafeAccount.changePassword("");
            // And the empty string is still not a valid password
            expect(mySafeAccount.checkPassword("")).toBe(false);
            expect(mySafeAccount.checkPassword("hunter2")).toBe(false);
        });
        test("(1 pts) Can do regular deposits and withdraws", () => {
            const mySafeAccount = new SafeAccount(500);
            expect(mySafeAccount.deposit(50)).toBe(550);
            // Remember, withdraw returns the amount withdrawn
            expect(mySafeAccount.withdraw(10)).toBe(10);
            // Remember, deposit returns the new balance
            expect(mySafeAccount.deposit(0)).toBe(540);
            expect(mySafeAccount.withdraw(100)).toBe(100);
            expect(mySafeAccount.deposit(25)).toBe(465);
        });
        test("(2 pts) Prevents unsafe deposits and withdraws", () => {
            const mySafeAccount = new SafeAccount(500);
            // Cannot deposit negative amounts
            expect(mySafeAccount.deposit(-50)).toBe(500);
            expect(mySafeAccount.deposit(-100)).toBe(500);
            // Cannot withdraw negative amounts
            expect(mySafeAccount.withdraw(-50)).toBe(0);
            expect(mySafeAccount.withdraw(-100)).toBe(0);
            expect(mySafeAccount["balance"]).toBe(500);
            // Cannot withdraw more than the balance
            expect(mySafeAccount.withdraw(1000)).toBe(0);
            expect(mySafeAccount["balance"]).toBe(500);
            // Can draw a normal amount though
            expect(mySafeAccount.withdraw(50)).toBe(50);
            expect(mySafeAccount["balance"]).toBe(450);
        });
        test("(2 pts) Logs all transactions", () => {
            const mySafeAccount = new SafeAccount(500);
            expect(mySafeAccount.log).toEqual([]);
            // Cannot deposit negative amounts
            expect(mySafeAccount.deposit(-50)).toBe(500);
            expect(mySafeAccount.deposit(-100)).toBe(500);
            expect(mySafeAccount.log).toEqual([
                "Cannot deposit negative amount -50",
                "Cannot deposit negative amount -100",
            ]);
            // Cannot withdraw negative amounts
            expect(mySafeAccount.withdraw(-50)).toBe(0);
            expect(mySafeAccount.withdraw(-100)).toBe(0);
            expect(mySafeAccount.log).toEqual([
                "Cannot deposit negative amount -50",
                "Cannot deposit negative amount -100",
                "Cannot withdraw negative amount -50",
                "Cannot withdraw negative amount -100",
            ]);
            // Cannot withdraw more than the balance
            expect(mySafeAccount.withdraw(1000)).toBe(0);
            expect(mySafeAccount.log).toEqual([
                "Cannot deposit negative amount -50",
                "Cannot deposit negative amount -100",
                "Cannot withdraw negative amount -50",
                "Cannot withdraw negative amount -100",
                "Cannot withdraw 1000 when balance is 500",
            ]);
            // Can draw and deposit a normal amount though
            expect(mySafeAccount.withdraw(50)).toBe(50);
            expect(mySafeAccount.deposit(100)).toBe(550);
            // Confirm that log is correct
            expect(mySafeAccount.log).toEqual([
                "Cannot deposit negative amount -50",
                "Cannot deposit negative amount -100",
                "Cannot withdraw negative amount -50",
                "Cannot withdraw negative amount -100",
                "Cannot withdraw 1000 when balance is 500",
                "Withdrew 50",
                "Deposited 100",
            ]);
        });
    });

    let mocked: jest.Mock;
    beforeEach(() => {
        mocked = console.log = jest.fn();
    });
    afterEach(() => {
        mocked.mockRestore();
    });

    describe("bankAccountExample", () => {
        test("(1 pts) Should run without error, and output correctly", () => {
            bankAccountExample();
            const output = mocked.mock.calls
                .map((args: string[]) => args.join(" "))
                .join("\n");
            expect(output).toContain("Depositing 50 dollars. New balance: 150");
            expect(output).toContain("Withdrawing 10 dollars");
            expect(output).toContain("Withdrawing 1000 dollars. Hee hee!");
            expect(output).toContain(
                "Depositing -2000 dollars. New balance: -2860",
            );
        });
    });

    describe("safeAccountExample", () => {
        test("(3 pts) Should run without error, and output correctly", () => {
            const changePasswordSpy = jest.spyOn(
                SafeAccount.prototype,
                "changePassword",
            );
            const checkPasswordSpy = jest.spyOn(
                SafeAccount.prototype,
                "checkPassword",
            );
            safeAccountExample();
            expect(changePasswordSpy).toHaveBeenCalledTimes(1);
            expect(checkPasswordSpy).toHaveBeenCalledTimes(2);
            expect(checkPasswordSpy).toHaveNthReturnedWith(1, false);
            expect(checkPasswordSpy).toHaveNthReturnedWith(2, true);
            const output = mocked.mock.calls
                .map((args: string[]) => args.join(" "))
                .join("\n");
            expect(output).toContain("Depositing 50 dollars. New balance: 150");
            expect(output).toContain("Withdrawing 10 dollars");
            expect(output).toContain("Withdrawing 0 dollars.");
            expect(output).toContain(
                "Depositing -2000 dollars. New balance: 140",
            );
            // These outputs don't have to be in the right order, but I would expect the log to be at the end.
            expect(output).toContain(
                "Cannot withdraw 1000 when balance is 140",
            );
            expect(output).toContain("Cannot deposit negative amount -2000");
        });
    });
});
