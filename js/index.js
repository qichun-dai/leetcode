const csvUrl = "https://gist.githubusercontent.com/qichun-dai/c546d6273de202794b9cadedfbd86384/raw/33143dbb12e8dfabb8838d20a8790b493d6c5f7c/leetcode.csv";
const formatTime = d3.timeFormat("%Y-%m-%d");

const data = await d3.csv(csvUrl,(d) => {
    return {
      Frequency:parseInt(d.Frequency),
      Title: d.Title,
      Acceptance: d.Acceptance,
      Difficulty: d.Difficulty,
      Date: new Date(d.Date), // convert Date to a certain format
      DateText: formatTime(new Date(d.Date)),
    };
});

const margin = {top: 25, right: 25, bottom: 25, left: 25};
const width = 1200;
const height = 500;

const xScale = d3.scaleTime()
.domain([d3.min(data, d => d.Date),d3.max(data, d => d.Date)])
.range([margin.left,width-margin.right])
.nice()

const yScale = d3.scaleLinear()
.domain(d3.extent(data, d => d.Frequency))
.range([height-margin.bottom,margin.top])
.nice()

console.log(yScale(106));

const svg = d3.select("div")
.append("svg")
.attr("width", width)
.attr("height",height)
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.Date)+(Math.random()-0.5)*10)
.attr("cy",(d,i) => yScale((0.5-Math.random())*200)-200)
.attr("r",3)
.attr("opacity","0.5")
.attr("fill",d => d.Difficulty)
.append("title")
.text(d => d.Title);
