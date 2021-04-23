import { controler } from "controler.controler"

let player1Event = "PLAYER_1_EVENT";
let player2Event = "PLAYER_2_EVENT";

const init = () => {

    document.addEventListener("SWITCH", function (e) {
        console.log("SWITCHING")
        [player1Event, player2Event] = [player2Event, player1Event]
        controler(player1Event, player2Event)
    });
    controler(player1Event, player2Event)
};

export { init };