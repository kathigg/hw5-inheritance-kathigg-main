import { Report, WeatherReport, GradeReport } from "../src/reports";

describe("Reports - Problem 2", () => {
    describe("Report", () => {
        test("(3 pts) Can construct Blank Report", () => {
            const myReport = new Report();
            expect(myReport.toHtml()).toBe(
                "<html><head><title></title></head>\n<body>\n<h1></h1>\n<p></p></body></html>",
            );
            expect(myReport.toMarkdown()).toBe("# \n");
            // Normally not allowed (because its private), but we're testing you
            expect(myReport["getBody"]()).toEqual([]);
        });
    });

    describe("WeatherReport", () => {
        test("(2 pts) Can construct WeatherReport", () => {
            const myWeatherReport = new WeatherReport("Toronto", 25, 80);
            expect(myWeatherReport.toHtml()).toBe(
                "<html><head><title>Weather in Toronto</title></head>\n<body>\n<h1>Weather in Toronto</h1>\n<p>Temperature: 25°C</p>\n<p>Humidity: 80%</p></body></html>",
            );
            expect(myWeatherReport.toMarkdown()).toBe(
                "# Weather in Toronto\nTemperature: 25°C\nHumidity: 80%",
            );

            const myWeatherReport2 = new WeatherReport("Vancouver", 15, 90);
            expect(myWeatherReport2.toHtml()).toBe(
                "<html><head><title>Weather in Vancouver</title></head>\n<body>\n<h1>Weather in Vancouver</h1>\n<p>Temperature: 15°C</p>\n<p>Humidity: 90%</p></body></html>",
            );
            expect(myWeatherReport2.toMarkdown()).toBe(
                "# Weather in Vancouver\nTemperature: 15°C\nHumidity: 90%",
            );
        });

        test("(2 pts) Can construct GradeReport", () => {
            const myGradeReport = new GradeReport("Alice", "CISC108", 90);
            expect(myGradeReport.toHtml()).toBe(
                "<html><head><title>Grade for Alice in CISC108</title></head>\n<body>\n<h1>Grade for Alice in CISC108</h1>\n<p>Score: 90</p>\n<p>Grade: A</p></body></html>",
            );
            expect(myGradeReport.toMarkdown()).toBe(
                "# Grade for Alice in CISC108\nScore: 90\nGrade: A",
            );

            const myGradeReport2 = new GradeReport("Bob", "THEA102", 55);
            expect(myGradeReport2.toHtml()).toBe(
                "<html><head><title>Grade for Bob in THEA102</title></head>\n<body>\n<h1>Grade for Bob in THEA102</h1>\n<p>Score: 55</p>\n<p>Grade: F</p></body></html>",
            );
            expect(myGradeReport2.toMarkdown()).toBe(
                "# Grade for Bob in THEA102\nScore: 55\nGrade: F",
            );
        });
    });

    describe("Inheritance Setup Correctly", () => {
        test("(1 pts) WeatherReport extends Report", () => {
            const myWeatherReport = new WeatherReport("Toronto", 25, 80);
            expect(myWeatherReport instanceof Report).toBe(true);
        });
        test("(1 pts) GradeReport extends Report", () => {
            const myGradeReport = new GradeReport("Alice", "CISC108", 90);
            expect(myGradeReport instanceof Report).toBe(true);
        });
        test("(1 pts) WeatherReport and GradeReport are not the same class", () => {
            const myWeatherReport = new WeatherReport("Toronto", 25, 80);
            const myGradeReport = new GradeReport("Alice", "CISC108", 90);
            expect(myWeatherReport instanceof GradeReport).toBe(false);
            expect(myGradeReport instanceof WeatherReport).toBe(false);
        });
        test("(1 pts) WeatherReport has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(WeatherReport.prototype),
            ).toHaveLength(2);
            expect(Object.getOwnPropertyNames(WeatherReport.prototype)).toEqual(
                expect.arrayContaining(["constructor", "getBody"]),
            );
        });
        test("(1 pts) GradeReport has the right methods", () => {
            expect(
                Object.getOwnPropertyNames(GradeReport.prototype),
            ).toHaveLength(3);
            expect(Object.getOwnPropertyNames(GradeReport.prototype)).toEqual(
                expect.arrayContaining(["constructor", "getBody", "getGrade"]),
            );
        });
        test("(1 pts) Report has the right methods", () => {
            expect(Object.getOwnPropertyNames(Report.prototype)).toHaveLength(
                4,
            );
            expect(Object.getOwnPropertyNames(Report.prototype)).toEqual(
                expect.arrayContaining([
                    "constructor",
                    "getBody",
                    "toHtml",
                    "toMarkdown",
                ]),
            );
        });
    });
});
