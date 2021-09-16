const csvUrl = "https://gist.githubusercontent.com/qichun-dai/c546d6273de202794b9cadedfbd86384/raw/33143dbb12e8dfabb8838d20a8790b493d6c5f7c/leetcode.csv";

const data = await d3.csv(csvUrl,(d) => {
    return {
      Frequency:d.Frequency,
      Title: d.Title,
      Acceptance: d.Acceptance,
      Difficulty: d.Difficulty,
      Date: new Date(d.Date), // convert "Year" column to Date
    };
});

console.log(data[1]);