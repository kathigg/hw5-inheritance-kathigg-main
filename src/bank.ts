/*
# Problem 1) BankAccount

The class below represents a `BankAccount` with a balance field, methods to deposit and withdraw money, and a password protection. 
But...
- You can deposit negative amounts and withdraw more than the balance.
- There is no logging of transactions.
- The password is hardcoded to "12345".

You can see the class being used in the `bankAccountExample` at the bottom of the file.
This is horrible, but unfortunately we have many legacy users who depend on BankAccount.
Let's make a better version for new users!

1.1. Create a class called `SafeAccount` that extends `BankAccount`. Do not create a new constructor.
1.2. Create a new private string field named `password` in `SafeAccount`, using the empty string as the default value.
1.3. Create a method called `changePassword` that takes a string and sets the `password` field to that string.
1.4. Override the `checkPassword` method to return true if the given password matches the password field and the password is
    not the empty string. PROTIP: Do not use any `if` statements; they're not necessary! You can just return the result
    of the boolean expression directly.
1.5. Create a new public string array field called `log` and initialize it to an empty array.
1.6. Override the `deposit` method to prevent negative deposits and log the transaction. If the deposit is negative, add
    a string to the `log` array that says "Cannot deposit negative amount [amount]". If the deposit is positive, add a
    string to the `log` array that says "Deposited [amount]". Don't actually put any square brackets in the log.
    Make sure that you actually update the balance if the deposit is positive.
    Either way, return the final balance.
1.7. Override the `withdraw` method to prevent negative withdrawals and withdrawals that exceed the balance, and log the
    transaction. If the withdrawal is negative, add a string to the `log` array that says "Cannot withdraw negative amount [amount]".
    If the withdrawal exceeds the balance, add a string to the `log` array that says "Cannot withdraw [amount] when balance is [balance]".
    If the withdrawal is positive and does not exceed the balance, add a string to the `log` array that says "Withdrew [amount]".
    Make sure that you actually update the balance if the withdrawal is positive and does not exceed the balance.
    Either way, return the amount that was withdrawn.
    **NOTE**: Unlike deposit, this returns the AMOUNT WITHDRAWN, not the new balance.
1.8. Create a new function named `safeAccountExample` that does the exact same thing as the `bankAccountExample` function except:
    - Make an instance of `SafeAccount` instead of `BankAccount`.
    - Remove the "Hee hee!" from the string.
    - After the constructor and before the deposit, call the `changePassword` method with a password of your choice.
    - After you change the password, call the `checkPassword` method with the old password and log the result to the console.
    - Then call the `checkPassword` method with the new password and log the result to the console.
    - After all the transactions, `console.log` the `log` field to the console.
    **NOTE**: If you are having trouble with getting the output to match the expected output, you should
    check the tests to see what the expected output is.

If you want to see the classes in action, try running the `bankAccountExample` function using this command:
    $> npm run bank
*/

export class BankAccount {
    protected balance: number;
    constructor(balance: number) {
        this.balance = balance;
    }
    checkPassword(givenPassword: string): boolean {
        return givenPassword === "12345";
    }
    deposit(amount: number): number {
        this.balance += amount;
        return this.balance;
    }
    withdraw(amount: number): number {
        this.balance -= amount;
        return amount;
    }
}

export class SafeAccount extends BankAccount {
    /*Create a new public string array field called `log` and initialize it to an empty array.*/
    public log: string[] = [];
    private password: string = "";

    changePassword(input: string) {
        this.password = input;
    }

    checkPassword(givenPassword: string): boolean {
        /*return true if the given password matches the password field and the password is
    not the empty string. PROTIP: Do not use any `if` statements; they're not necessary! You can just return the result
    of the boolean expression directly.
    */
        return givenPassword === this.password && this.password != "";
    }
    /*. Override the `deposit` method to prevent negative deposits and log the transaction. If the deposit is negative, add
    a string to the `log` array that says "Cannot deposit negative amount [amount]". If the deposit is positive, add a
    string to the `log` array that says "Deposited [amount]". Don't actually put any square brackets in the log.
    Make sure that you actually update the balance if the deposit is positive.
    Either way, return the final balance.
    */
    deposit(amount: number): number {
        if (amount > 0) {
            this.balance += amount;
            this.log.push("Deposited " + amount);
        } else {
            this.log.push("Cannot deposit negative amount " + amount);
        }
        return this.balance;
    }
    /*Override the `withdraw` method to prevent negative withdrawals and withdrawals that exceed the balance, and log the
    transaction. If the withdrawal is negative, add a string to the `log` array that says "Cannot withdraw negative amount [amount]".
    If the withdrawal exceeds the balance, add a string to the `log` array that says "Cannot withdraw [amount] when balance is [balance]".
    If the withdrawal is positive and does not exceed the balance, add a string to the `log` array that says "Withdrew [amount]".
    Make sure that you actually update the balance if the withdrawal is positive and does not exceed the balance.
    Either way, return the amount that was withdrawn.
    */
    withdraw(amount: number): number {
        if (amount < 0) {
            this.log.push("Cannot withdraw negative amount " + amount);
            return 0;
        } else if (this.balance - amount < 0) {
            this.log.push(
                "Cannot withdraw " +
                    amount +
                    " when balance is " +
                    this.balance,
            );
            return 0;
        } else {
            this.log.push("Withdrew " + amount);
            this.balance -= amount;
            return amount;
        }
    }
}

/**
 * A little function we use to show off our code.
 * You can run this function using `npm run bank`.
 */
export function bankAccountExample(): void {
    const myBankAccount = new BankAccount(100);
    console.log(
        "Depositing 50 dollars. New balance:",
        myBankAccount.deposit(50),
    );
    console.log("Withdrawing", myBankAccount.withdraw(10), "dollars");
    console.log(
        "Withdrawing",
        myBankAccount.withdraw(1000),
        "dollars. Hee hee!",
    );
    console.log(
        "Depositing -2000 dollars. New balance:",
        myBankAccount.deposit(-2000),
    );
}

/*1.8. Create a new function named `safeAccountExample` that does the exact same thing as the `bankAccountExample` function except:
    - Make an instance of `SafeAccount` instead of `BankAccount`.
    - Remove the "Hee hee!" from the string.
    - After the constructor and before the deposit, call the `changePassword` method with a password of your choice.
    - After you change the password, call the `checkPassword` method with the old password and log the result to the console.
    - Then call the `checkPassword` method with the new password and log the result to the console.
    - After all the transactions, `console.log` the `log` field to the console.
    **NOTE**: If you are having trouble with getting the output to match the expected output, you should
    check the tests to see what the expected output is.
    */
export function safeAccountExample(): void {
    const mySafeAccount = new SafeAccount(100);
    mySafeAccount.changePassword("hi");
    console.log(mySafeAccount.checkPassword(""));
    console.log(mySafeAccount.checkPassword("hi"));
    console.log(mySafeAccount.log);
    console.log(
        "Depositing 50 dollars. New balance:",
        mySafeAccount.deposit(50),
    );
    console.log("Withdrawing", mySafeAccount.withdraw(10), "dollars");
    console.log("Withdrawing", mySafeAccount.withdraw(1000), "dollars.");
    console.log(
        "Depositing -2000 dollars. New balance:",
        mySafeAccount.deposit(-2000),
    );
}
