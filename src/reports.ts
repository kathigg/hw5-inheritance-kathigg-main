/*
# Problem 2) Reports

The `WeatherReport` and `GradeReport` classes below are used to generate reports for the weather and grades, respectively.
They share common functionality for generating reports, so let's create a base class to hold that functionality.

2.1. Create a class called `Report`.
2.2. In Report, define a protected string field called `title` with an empty string as the default value.
    Remove the field from the WeatherReport and GradeReport classes. You'll need to either add a constructor to the Report class 
    or provide an appropriate default value.
2.3. In Report, define a protected method called `getBody` that returns a string array (it can just return the empty array for now).
2.4. Extract the `toHtml` and `toMarkdown` methods from the `WeatherReport` and `GradeReport` classes and put them in the `Report` class.
2.5. Make `WeatherReport` and `GradeReport` extend `Report`
2.6. You'll need to introduce a call to super() in the constructors of `WeatherReport` and `GradeReport`.

If you want to see what these look like in action, try running the `reportExample` function using this command:
    $> npm run reports
*/

export class Report {
    protected title: string = "";

    protected getBody(): string[] {
        return [];
    }

    toHtml(): string {
        const body = "<p>" + this.getBody().join("</p>\n<p>") + "</p>";
        return `<html><head><title>${this.title}</title></head>\n<body>\n<h1>${this.title}</h1>\n${body}</body></html>`;
    }

    public toMarkdown(): string {
        return `# ${this.title}\n${this.getBody().join("\n")}`;
    }
}

export class WeatherReport extends Report {
    constructor(
        private region: string,
        private temperature: number,
        private humidity: number,
    ) {
        super();
        this.title = `Weather in ${region}`;
    }

    protected getBody(): string[] {
        return [
            "Temperature: " + this.temperature + "°C",
            "Humidity: " + this.humidity + "%",
        ];
    }
}

export class GradeReport extends Report {
    constructor(
        private student: string,
        private course: string,
        private score: number,
    ) {
        super();
        this.title = `Grade for ${student} in ${course}`;
    }

    private getGrade(): string {
        if (this.score >= 90) {
            return "A";
        } else if (this.score >= 80) {
            return "B";
        } else if (this.score >= 70) {
            return "C";
        } else if (this.score >= 60) {
            return "D";
        } else {
            return "F";
        }
    }

    protected getBody(): string[] {
        return ["Score: " + this.score, "Grade: " + this.getGrade()];
    }
}

export function reportExample() {
    const weatherReport = new WeatherReport("San Francisco", 16, 80);
    console.log(weatherReport.toHtml());
    console.log(weatherReport.toMarkdown());

    const gradeReport = new GradeReport("Alice", "Math", 92);
    console.log(gradeReport.toHtml());
    console.log(gradeReport.toMarkdown());
}
