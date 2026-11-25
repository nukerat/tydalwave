//positions window

let positions_bg;
let positions_list;
let positions_text_square;
let positions_text;
let positions_visible = false;


//called once, at the end of create()
function create_positions_window(scene){

    positions_bg = scene.add.rectangle(300, 200, 500, 300, 0x222222);
    positions_bg.setDepth(10);
    positions_bg.setInteractive();   //swallows clicks so LONG/SHORT underneath can't be hit

    positions_list = scene.add.text(70, 60, "", {
        fontSize: "14px",
        fontFamily: "monospace",
        color: "#ffffff"
    });
    positions_list.setDepth(11);

    positions_text_square = scene.add.rectangle(250, 325, 160, 30, 0x666666);
    positions_text_square.setDepth(12);

    positions_text = scene.add.text(173, 320, "View Positions", {
        fontSize: "18px",
        color: "#ffffff"
    });
    positions_text.setDepth(13);
    positions_text.setInteractive();
    positions_text.on("pointerdown", () => {
        console.log("Clicked: Positions");
        if(computerWindow){positions_visible = !positions_visible;}
    });
}


//called every frame from update()
function update_positions_window(){

    if(!computerWindow){positions_visible = false;}

    if(positions_visible && Phaser.Input.Keyboard.JustDown(escapeKey)){
        positions_visible = false;
    }

    positions_bg.setVisible(positions_visible);
    positions_list.setVisible(positions_visible);
    positions_text_square.setVisible(computerWindow);
    positions_text.setVisible(computerWindow);
    positions_text.setText(positions_visible ? "Hide Positions" : "View Positions");

    if(positions_visible){positions_list.setText(positions_string());}
}


function positions_string(){

    let lines = ["STOCK  SIDE   AMT  ENTRY      NOW"];

    for(let stock in portfolio.positions){
        for(let position of portfolio.positions[stock]){
            lines.push(
                stock.padEnd(7) +
                position.side.padEnd(7) +
                String(position.amount).padEnd(5) +
                Number(position.entryPrice).toFixed(2).padEnd(11) +
                Number(stocks[stock].prices[timer]).toFixed(2)
            );
        }
    }

    if(lines.length == 1){lines.push("No open positions.");}

    return lines.join("\n");
}








/*
let positions_text_square;
let positions_text;


function generate_positions(scene){
    let x_scroller = 20;
    let y_scroller = 40;

    for(let stock in portfolio.positions){

        for(let position of portfolio.positions[stock]){

            scene.add.text(
                50,
                y_scroller,
                `${stock}   ${position.side}   ${position.amount}   ${position.entryPrice}   ${stocks[stock].prices[timer]}`,
                {
                    fontSize: "10px",
                    color: "#ffffff"
                }
            );

            y_scroller += 20;
            x_scroller += 30;
        }
    }
}
*/
