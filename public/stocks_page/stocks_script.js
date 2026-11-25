console.log("Hello there.");
console.log("yoloooo.");

console.log("1. Script loaded");
console.log("2. Phaser:", Phaser);
console.log("3. Game div:", document.getElementById("game"));

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: "game",
    backgroundColor: "#222222",

    scene: {
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let computer;
let keys;
let interactionText;
let interactKey;
let computerWindow = false;
let terminalBackground;
let terminalText;
let terminalBuy;
let terminalSell;
let terminalChart;
let escapeKey;
let downKey;
let upKey;
let leftKey;
let rightKey;
let selected_stock = 0;
let buysell = true;
let long_text;
let short_text;
let price_text;
let price_amount;

let transactionWindow = false;
let transactionBackground;
let transactionText;
let transactionAmount;
let transactionCancel;
let transactionConfirm;
let transactionAmountValue = 1;
let enterKey;
let cancel_confirm = false;
let capital_text;
let owned_quantity;
let assets_text;
let pl_text;




function create() {

    console.log("Creating scene.");
    player = this.add.rectangle(
        150,
        200,
        30,
        40,
        0x5599ff);

    computer = this.add.rectangle(
        450,
        200,
        50,
        50,
        0x888888);
       
     keys = this.input.keyboard.addKeys({
		 up: "W",
		 down: "S",
		 left: "A",
		 right: "D"
		 });

	 interactionText = this.add.text(
		300,
		350,
		"",
		{
			fontSize: "18px",
			color: "#ffffff"
		});
	 
	 interactKey = this.input.keyboard.addKey("E");
	 
	 terminalBackground = this.add.rectangle(
	 300,200,500,300, 0x111111);
	 
	 terminalText = this.add.text(
	 55,55, "TRADING TERMINAL",
	 {fontSize: "24px", color: "#ffffff"});
	 
	 escapeKey = this.input.keyboard.addKey("ESC")
	 
	 terminalBackground.setVisible(false);
	 terminalText.setVisible(false);
	 
	 terminalBuy = this.add.rectangle(400,325, 100,50, 0x008000);
	 terminalBuy.setVisible(false);

	 terminalSell = this.add.rectangle(500,325, 100,50, 0x880808);
	 terminalSell.setVisible(false);
	 
     terminalChart = this.add.rectangle(360,200, 380,200, 0x000000);
	 terminalChart.setVisible(false);
	 
	 create_list(this); /////
	 menu_selector(this);
	 downKey = this.input.keyboard.addKey("down");
	 upKey = this.input.keyboard.addKey("up");
	 leftKey = this.input.keyboard.addKey("left");
	 rightKey = this.input.keyboard.addKey("right");
	 
	 long_text = this.add.text(
		362,   //400,325, 100,50, 0x008000 location then size
		316,
		"LONG",
		{
			fontSize: "30px",
			color: "#ffffff"
		});
	  long_text.setInteractive();
	  
	  short_text = this.add.text(
		457,
		316,
		"SHORT",
		{
			fontSize: "30px",
			color: "#ffffff"
		});
	  short_text.setInteractive();
		
	  price_text = this.add.text(
		 330,75, "PRICE:",
		 {fontSize: "24px", color: "#ffffff"});
	  price_amount = this.add.text(
		 420,78, "",
		 {fontSize: "22px", color: "#ffffff"});
		 
	  
	  transactionBackground = this.add.rectangle(
	  300,200,400,200, 0x111111);
	  transactionText = this.add.text(
	  160,130, "TRANSACTION",{
							 fontSize: "24px",
							 color: "#ffffff"});
							 
	  transactionAmount = this.add.text(200,180, "Amount: 1",
	                      {fontSize:"20px", color: "#ffffff"});
	          
	  transactionCancel = this.add.text(
							170, 250, "CANCEL", 
							{fontSize: "20px",
								color: "#ffffff"
							});
	  transactionCancel.setInteractive();

	  transactionConfirm = this.add.text(
							350, 250, "CONFIRM",
							{
								fontSize: "20px",
								color: "#ffffff"
							});
	  transactionConfirm.setInteractive();
	  
	  capital_text = this.add.text(
							25,18, `CAPITAL: $${Math.round(portfolio.capital)}`,
		 {fontSize: "18px", color: "#ffffff"});
	  
	  owned_quantity = this.add.text(
							475,35, ``,
		 {fontSize: "18px", color: "#ffffff"});

	  assets_text = this.add.text(
							250,18, `ASSETS: $${portfolio.assets}`,
		 {fontSize: "18px", color: "#ffffff"});

	  pl_text = this.add.text(
							475,18, `P&L: $${portfolio.p_l}`,
		 {fontSize: "18px", color: "#ffffff"});
							

	  transactionBackground.setVisible(false);
	  transactionText.setVisible(false);
	  transactionAmount.setVisible(false);
	  transactionCancel.setVisible(false);
	  transactionConfirm.setVisible(false);
	  capital_text.setVisible(true);
	  owned_quantity.setVisible(false);
	  assets_text.setVisible(true);
	  pl_text.setVisible(true);
	  
	  enterKey = this.input.keyboard.addKey("ENTER");
	  
	  create_positions_window(this);
	 
	}

function openTransaction() {
		transactionWindow = true;
		transactionBackground.setVisible(true);
		transactionText.setVisible(true);
		transactionAmount.setVisible(true);
		transactionCancel.setVisible(true);
		transactionConfirm.setVisible(true);
		}
function closeTransaction() {
		transactionWindow = false;
		transactionBackground.setVisible(false);
		transactionText.setVisible(false);
		transactionAmount.setVisible(false);
		transactionCancel.setVisible(false);
		transactionConfirm.setVisible(false);
		}
	 

function update() {

	if(!computerWindow){
    if (keys.left.isDown) {
		if(player.x >= 15){
        player.x -= 2;}else{
			player.x -= 0}}

    if (keys.right.isDown && player.x <= 585){
        player.x += 2;}else{
			player.x += 0}

    if (keys.up.isDown && player.y > 20){
        player.y -= 2;}

    if (keys.down.isDown && player.y < 380){
        player.y += 2;}
      }
    
    let distance = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    computer.x,
    computer.y);
	
	if (distance < 60){
		//console.log("You are near the computer.");
		}
	
	if (distance < 60) {
		if(computerWindow==false){interactionText.setText("Press E to use computer.");
			}else{interactionText.setText("Press ESC to close computer");}
	} else {
		interactionText.setText("");
		}
	
	if (distance < 60 && Phaser.Input.Keyboard.JustDown(interactKey)){
		if(computerWindow == false){
			console.log("Opening trading terminal");
			computerWindow = true;
			terminalBackground.setVisible(true);
			terminalText.setVisible(true);
			terminalBuy.setVisible(true);
			terminalSell.setVisible(true);
			terminalChart.setVisible(true);}
			/*
		else{
			computerWindow = false;
			terminalBackground.setVisible(false);
			terminalText.setVisible(false);
			terminalBuy.setVisible(false);
		    terminalSell.setVisible(false);
		    terminalChart.setVisible(false);}
			*/
		
		}
	if(!transactionWindow && !positions_visible && computerWindow==true && Phaser.Input.Keyboard.JustDown(escapeKey)){
		console.log("Closing Terminal.");
		computerWindow=false;
		terminalBackground.setVisible(false);
		terminalText.setVisible(false);
		terminalBuy.setVisible(false);
		terminalSell.setVisible(false);
		terminalChart.setVisible(false);
		hideCharts();
		}
		
	
	menu_selector(this);
	
	if (Phaser.Input.Keyboard.JustDown(downKey) && computerWindow && !transactionWindow){
		console.log("Pressing down");
		if(selected_stock < 7){
		selected_stock += 1;}
		}
		
	if (Phaser.Input.Keyboard.JustDown(upKey) && computerWindow && !transactionWindow){
		console.log("Pressing up");
		if(selected_stock > 0){
		selected_stock -= 1;}  
		}
	if(computerWindow)
	{
	for(let [stock, text] of scroll_menu){
		if(selected_stock === [...scroll_menu.keys()].indexOf(stock)){
			scroll_menu.get(stock).setTint("0xff0000");}
		else{
			scroll_menu.get(stock).clearTint()
			}
		}
		
	for(let [stock, text] of scroll_menu){	
		let chart = document.getElementById(`${stock}-chart`);
		if(selected_stock === [...scroll_menu.keys()].indexOf(stock) && !transactionWindow && !positions_visible){
			chart.style.display = "block";}
		else{
			chart.style.display = "none";}
			}
			
	long_text.on("pointerdown", () => {
		console.log("Clicked: LONG");
		if(buysell == false){
			buysell = true;
		}else{
			openTransaction();}
							});
	short_text.on("pointerdown", () => {
		console.log("Clicked: SHORT");
		if(buysell == true){
			buysell = false;
		}else{
			openTransaction();}
							});
	}
	
	if(computerWindow && !transactionWindow && !positions_visible){
		if(Phaser.Input.Keyboard.JustDown(leftKey)){
			buysell = true;}
		if(Phaser.Input.Keyboard.JustDown(rightKey)){
			buysell = false;}
		}

	
	if(!computerWindow){
		long_text.setVisible(false);
		short_text.setVisible(false);
		price_text.setVisible(false);
		price_amount.setVisible(false);
		owned_quantity.setVisible(false);}
	else{
		long_text.setVisible(true);
		short_text.setVisible(true);
		price_amount.setVisible(true);
		price_text.setVisible(true);
		owned_quantity.setVisible(true);
		let selectedSymbol = [...scroll_menu.keys()][selected_stock];
		price_amount.setText(`$${Number(stocks[selectedSymbol].prices[timer])}`);
		owned_quantity.setText(`Owned: ${portfolio.positions[selectedSymbol].reduce((total, position) => total + position.amount, 0)}`);
		if(buysell == true){
			long_text.setTint("0xff0000");
			short_text.clearTint();}
		else{
			long_text.clearTint();
			short_text.setTint("0xff0000");}
		}
	  
	  if(computerWindow && !transactionWindow){
		  if(Phaser.Input.Keyboard.JustDown(enterKey)){
		  console.log("Opening Transaction Window");
		  hideCharts();
		  openTransaction();
		  if(buysell == true){
			  transactionText.setText("LONG");
			  }
		  else{
			  transactionText.setText("SHORT");}
			  }
		  }
	   else if(transactionWindow && computerWindow){
		  if(Phaser.Input.Keyboard.JustDown(enterKey)){
		  if(cancel_confirm==false){
				console.log("Cancel Transaction");
				closeTransaction();
	   	  }else{
				console.log("Confirm Transaction");
				//closeTransaction();
				let selectedSymbol = [...scroll_menu.keys()][selected_stock];
				if(portfolio.capital >= stocks[selectedSymbol].prices[timer]){
				portfolio.positions[selectedSymbol].push({
					side: buysell ? "LONG" : "SHORT",
					amount: 1,
					entryPrice: stocks[selectedSymbol].prices[timer]
					});
				portfolio.capital -= stocks[selectedSymbol].prices[timer];
				//portfolio.assets += positions_calculator();
				}else{
					console.log("Money Insufficient");}
				closeTransaction();
				console.log(portfolio);
				
				}
		   }
	    transactionCancel.on("pointerdown", () => {
			console.log("Clicked: CANCEL");
			closeTransaction();
							});
	    transactionConfirm.on("pointerdown", () => {
			console.log("Clicked: CONFIRM");
			
				console.log("Confirm Transaction");
				//closeTransaction();
				let selectedSymbol = [...scroll_menu.keys()][selected_stock];
				if(portfolio.capital >= stocks[selectedSymbol].prices[timer]){
				portfolio.positions[selectedSymbol].push({
					side: buysell ? "LONG" : "SHORT",
					amount: 1,
					entryPrice: stocks[selectedSymbol].prices[timer]
					});
				portfolio.capital -= stocks[selectedSymbol].prices[timer];
				//portfolio.assets += positions_calculator();
				}else{
					console.log("Money Insufficient");}
				closeTransaction();
				console.log(portfolio);
							});
	   }		  
	  
	  if(transactionWindow==true && Phaser.Input.Keyboard.JustDown(escapeKey)){
		  console.log("Closing Transaction Window");
		  showCharts();
		  closeTransaction();
		  }
	  
	  if(transactionWindow == true){
		  if(Phaser.Input.Keyboard.JustDown(leftKey)){
			cancel_confirm = false;
			transactionCancel.setTint("0xff0000");
			transactionConfirm.clearTint();
			}
		  if(Phaser.Input.Keyboard.JustDown(rightKey)){
			cancel_confirm = true;
			transactionCancel.clearTint();
			transactionConfirm.setTint("0xff0000");
			}

		}
	  
	  update_positions_window();
	  
	  portfolio.assets = portfolio.capital + positions_value();
	  portfolio.p_l = portfolio.assets - 1000;
	  capital_text.setText(`CAPITAL: $${Math.round(portfolio.capital)}`);
	  assets_text.setText(`ASSETS: $${Math.round(portfolio.assets)}`);
	  pl_text.setText(`P&L: $${Math.round(portfolio.p_l)}`);
	  
	}
	  
	  
	
		
	
	
	
	
 
	

	





/*
Papa.parse("1min/AAPL_1min_sample.csv", {
    download: true,
    header: true,

    complete: function(results) {

        let timestamps = [];
        let prices = [];

        for (let row of results.data) {
            timestamps.push(row.timestamp);
            prices.push(row.close);
        }

        console.log("Data loaded:", results.data.length);
        console.log("Timestamps:", timestamps);
        console.log("Prices:", prices);
        
        let graph = {
            x: timestamps,
            y: prices,
            type: "scatter",
            mode: "lines"
        };

        Plotly.newPlot("stock-chart", [graph], {
		width: 1000,
		height: 600
		})
		}
		});
	*/
	
