let portfolio = {
    capital: 10000,
    
    assets: 10000,
    
    p_l: 0,

    positions: {
        AAPL: [],
        BTC: [],
        ES: [],
        MSFT: [],
        NQ: [],
        QQQ: [],
        SPX: [],
        SPY: []
    }
};

function positions_value(){
	let total = 0;
	for(let stock in portfolio.positions){
		let price = Number(stocks[stock].prices[timer]);
		for(let position of portfolio.positions[stock]){
			for(let position of portfolio.positions[stock]){
				let sign = position.side == "LONG" ? 1 : -1;
				total += price * position.amount * sign;}
				}
		}
		return total;
}

//for later, IF I want to also display unrealised P&L
function unrealized_pnl(){
	let total = 0;
	for(let stock in portfolio.positions){
		let price = stocks[stock].prices[timer];
		for(let position of portfolio.positions[stock]){
			if(position.side === "LONG"){
				total += (price - position.entryPrice)*position.amount;
			}else{
				total += (position.entryPrice - price)*position.amount;}
		}
	}
	return total;
}







/*
function positions_calculator(){
    let total = 0;
	//portfolio.p_l = assets - capital;
    for(let stock in portfolio.positions){
        for(let position of portfolio.positions[stock]){

            let currentPrice = stocks[stock].prices[timer];

            let sign = position.side === "LONG" ? 1 : -1;

            total += currentPrice * position.amount * sign;
        }
    }

    return total;
}

function positions_calculator(){
	let total = 0;
	let sign;
	for(stock in portfolio.positions){
		for(position in stocks){
			if(portfolio.positions.stock.position.side=="LONG"){sign = 1}
			else{sign = -1}
			total += (stocks.stock.prices[timer] - portfolio.positions.stock.position.entryPrice * portfolio.positions.stock.position.amount) * sign;}
		}
	return total;
	}	
*/
