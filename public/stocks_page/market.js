let prices = [];
let dates = [];

console.log("PapaParse Tester");

let files = [
    "AAPL_1min_sample.csv",
    "BTC_1min_sample.csv",
    "ES_1min_sample.csv",
    "MSFT_1min_sample.csv",
    "NQ_1min_sample.csv",
    "QQQ_1min_sample.csv",
    "SPX_1min_sample.csv",
    "SPY_1min_sample.csv",
];

let stocks = {};
let lock_n_loaded = false
function csv_parser(path) {
    let symbol = path.split("_")[0];

    stocks[symbol] = {
        path: path,
        dates: [],
        prices: []};

    Papa.parse("1min/"+path, {
        download: true,
        header: true,

        complete: function(results) {

            for (let row of results.data) {
                stocks[symbol].dates.push(row.timestamp);
                stocks[symbol].prices.push(row.close);
            }
            console.log(symbol, "loaded.");
            createStockGraphs(); 
        }
        });
    }

let timer = 0;

for(let file of files) {csv_parser(file);}

function createStockGraphs(){
	for(let stock in stocks){
		let trace = 
		{x: stocks[stock].dates.slice(0,timer),
		 y: stocks[stock].prices.slice(0,timer),
		 type: "scatter",
		 mode: "lines"};
			Plotly.newPlot(
				`${stock}-chart`,
				[trace],
				{
					width: 380,
					height: 200,
					margin: {
						l: 45,
						r: 10,
						t: 20,
						b: 35
					}
				},                          
				{
					displaylogo: false
				}                           
			);		
		}
		}

function updater(){
	if(timer < stocks["AAPL"].prices.length){
	console.log("Current time is: ",timer);
	console.log("Stock prices are:");
	for(let stock in stocks){
	console.log("Stock ",stock,
				" is at: ",stocks[stock].prices[timer]);
		
		Plotly.extendTraces(`${stock}-chart`,
		{
			x: [[stocks[stock].dates[timer]]],
			y: [[stocks[stock].prices[timer]]]
		},
		[0]
		);
		
	}
	timer += 1;
	}
	}


console.log("Stocks are: ",stocks.AAPL.path);

function hideCharts() {

    for (let stock in stocks) {

        let chart = document.getElementById(`${stock}-chart`);
		chart.style.position = "absolute";
        chart.style.display = "none";
        
        chart.style.left = "170px";
        chart.style.top = "102px";
    }
}
hideCharts();

function showCharts() {
    for (let stock in stocks) {
        let chart = document.getElementById(`${stock}-chart`);

        if (chart) {
            chart.style.display = "block";
        }
    }
}


let gameDiv = document.getElementById("game");
gameDiv.style.position = "relative";

/*
let chart = document.getElementById("AAPL-chart");

chart.style.position = "absolute";
chart.style.left = "20px";
chart.style.top = "20px";
chart.style.width = "380px";
chart.style.height = "200px";
chart.style.zIndex = "10";
chart.style.display = "none";
*/

let scroller = 105
let scroll_menu = new Map() 
function create_list(scene){
	for(let stock in stocks){
						scroll_menu.set(stock, scene.add.text(
									55,
									scroller,
									stock,
									{
									fontSize: "25px",
									color: "#ffffff"
									})
									);
						scroller += 25;
						scroll_menu.get(stock).setInteractive();
						scroll_menu.get(stock).on("pointerdown", () => {
							console.log("Clicked:", stock);
						selected_stock = [...scroll_menu.keys()].indexOf(stock);
							});
	}
}
console.log(scroll_menu);

function menu_selector(scene){
	if(!computerWindow){
	for(let [stock, text] of scroll_menu){
		scroll_menu.get(stock).setVisible(false);
			}
	}else{	
		for(let [stock, text] of scroll_menu){
		scroll_menu.get(stock).setVisible(true);
			}
		}
	
	}




/*
Plotly.newPlot(
    chart,
    [{
        x: [1, 2, 3],
        y: [10, 20, 15],
        type: "scatter",
        mode: "lines"
    }],
    {
        width: 380,
        height: 200
    }
);

function showStockChart(selectedStock) {
    for (let stock in stocks) {

        let chart = document.getElementById(`${stock}-chart`);

        if (stock === selectedStock && computerWindow) {
            chart.style.display = "block";
        } else {
            chart.style.display = "none";
        }
    }
}
*/

setInterval(updater, 5000);
