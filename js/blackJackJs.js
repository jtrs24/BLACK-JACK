let Deck = {
    cards: [
        {'img': '2C', 'value': 2, suit: 'clubs', 'dealt': false},
        {'img': '2H', 'value': 2, suit: 'hearts', 'dealt': false},
        {'img': '2D', 'value': 2, suit: 'diamonds', 'dealt': false},
        {'img': '2S', 'value': 2, suit: 'spades', 'dealt': false},

        {'img': '3C', 'value': 3, suit: 'clubs', 'dealt': false},
        {'img': '3H', 'value': 3, suit: 'hearts', 'dealt': false},
        {'img': '3D', 'value': 3, suit: 'diamonds', 'dealt': false},
        {'img': '3S', 'value': 3, suit: 'spades', 'dealt': false},

        {'img': '4S', 'value': 4, suit: 'spades', 'dealt': false},
        {'img': '4H', 'value': 4, suit: 'hearts', 'dealt': false},
        {'img': '4D', 'value': 4, suit: 'diamonds', 'dealt': false},
        {'img': '4C', 'value': 4, suit: 'clubs', 'dealt': false},

        {'img': '5S', 'value': 5, suit: 'spades', 'dealt': false},
        {'img': '5H', 'value': 5, suit: 'hearts', 'dealt': false},
        {'img': '5D', 'value': 5, suit: 'diamonds', 'dealt': false},
        {'img': '5C', 'value': 5, suit: 'clubs', 'dealt': false},

        {'img': '6S', 'value': 6, suit: 'spades', 'dealt': false},
        {'img': '6H', 'value': 6, suit: 'hearts', 'dealt': false},
        {'img': '6D', 'value': 6, suit: 'diamonds', 'dealt': false},
        {'img': '6C', 'value': 6, suit: 'clubs', 'dealt': false},

        {'img': '7S', 'value': 7, suit: 'spades', 'dealt': false},
        {'img': '7H', 'value': 7, suit: 'hearts', 'dealt': false},
        {'img': '7D', 'value': 7, suit: 'diamonds', 'dealt': false},
        {'img': '7C', 'value': 7, suit: 'clubs', 'dealt': false},

        {'img': '8S', 'value': 8, suit: 'spades', 'dealt': false},
        {'img': '8H', 'value': 8, suit: 'hearts', 'dealt': false},
        {'img': '8D', 'value': 8, suit: 'diamonds', 'dealt': false},
        {'img': '8C', 'value': 8, suit: 'clubs', 'dealt': false},

        {'img': '9S', 'value': 9, suit: 'spades', 'dealt': false},
        {'img': '9H', 'value': 9, suit: 'hearts', 'dealt': false},
        {'img': '9D', 'value': 9, suit: 'diamonds', 'dealt': false},
        {'img': '9C', 'value': 9, suit: 'clubs', 'dealt': false},

        {'img': '10S', 'value': 10, suit: 'spades', 'dealt': false},
        {'img': '10H', 'value': 10, suit: 'hearts', 'dealt': false},
        {'img': '10D', 'value': 10, suit: 'diamonds', 'dealt': false},
        {'img': '10C', 'value': 10, suit: 'clubs', 'dealt': false},

        {'img': 'JS', 'value': 10, suit: 'spades', 'dealt': false},
        {'img': 'JH', 'value': 10, suit: 'hearts', 'dealt': false},
        {'img': 'JD', 'value': 10, suit: 'diamonds', 'dealt': false},
        {'img': 'JC', 'value': 10, suit: 'clubs', 'dealt': false},

        {'img': 'QS', 'value': 10, suit: 'spades', 'dealt': false},
        {'img': 'QH', 'value': 10, suit: 'hearts', 'dealt': false},
        {'img': 'QD', 'value': 10, suit: 'diamonds', 'dealt': false},
        {'img': 'QC', 'value': 10, suit: 'clubs', 'dealt': false},

        {'img': 'KS', 'value': 10, suit: 'spades', 'dealt': false},
        {'img': 'KH', 'value': 10, suit: 'hearts', 'dealt': false},
        {'img': 'KD', 'value': 10, suit: 'diamonds', 'dealt': false},
        {'img': 'KC', 'value': 10, suit: 'clubs', 'dealt': false},

        {'img': 'AS', 'value': 11, suit: 'spades', 'dealt': false},
        {'img': 'AH', 'value': 11, suit: 'hearts', 'dealt': false},
        {'img': 'AD', 'value': 11, suit: 'diamonds', 'dealt': false},
        {'img': 'AC', 'value': 11, suit: 'clubs', 'dealt': false}
    ],
    cardsDealt : 0,
    getCard: function (hand) {
        let card = null;
        let availableCards = this.cards.filter((card) => !card.dealt);

        if (availableCards.length === 0) {
            // Time to reshuffle
           // alert("Reshuffling!")
            this.cardsDealt = 0;

            // Reset dealt status for all cards and redeal cards in hand
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].dealt = false;

                // Exclude cards already in the hand
                if (this.inTheHand(hand, this.cards[i])) {
                    this.cards[i].dealt = true;
                    this.cardsDealt += 1;
                }
            }
        }

        // Filter cards that are not dealt after reshuffle
        availableCards = this.cards.filter((card) => !card.dealt);

        if (availableCards.length > 0) {
            let randCardIndex = Math.floor(Math.random() * availableCards.length);
            card = availableCards[randCardIndex];
            card.dealt = true;
            this.cardsDealt += 1;
        }

        return card;
    },
    inTheHand : function(hand, card){
        for( let i=0; i<hand.length; i++ ){
            if (hand[i].img === card.img){
                return true;
            }
        }
        return false;
    }
};

let UI = {
    setBet: function (betValue) {
        let errorStatus;
        let inputElement = document.getElementById(betValue);

        Player.bet = inputElement.value;
        errorStatus = UI.checkForErrors(Player.bet);

        if (errorStatus.gotError) {
            document.getElementById("errors").innerHTML = errorStatus.errorMsg;
        }
        return errorStatus.gotError;

    },
    displayTotalHand : function(hand, id){
        let displayObj = document.getElementById(id);
        let oStr = "";
        for ( let i=0; i<hand.length; i++ ){
            let cImg = hand[i].img;
            oStr += `<img class='cardImg' src='img/${cImg}.png'  alt='Card' />`;
        }
        displayObj.innerHTML = oStr;
    },
    displayDealerHandInitial : function(hand, id){
        let displayObj = document.getElementById(id);
        let oStr = "";
        oStr +=`<img class='cardImg' src='img/purple_back.png' alt='Card'/>`;
        for ( let i=1; i<hand.length; i++ ){
            let cImg = hand[i].img;
            oStr += `<img class='cardImg' src='img/${cImg}.png'  alt='Card' />`;
        }
        displayObj.innerHTML = oStr;
    },
    checkForErrors : function(betValue){
        let betToInt = betValue * 1;
        let errorObj = {
            errorMsg : "",
            gotError : false
        };
        if(isNaN(betToInt)){
            errorObj.errorMsg += `${betValue} is not a number.\n`;
            errorObj.gotError = true;
        }
        if(betToInt > Player.balance){
            errorObj.errorMsg += "Insufficient Funds. Try a lower bet amount.\n";
            errorObj.gotError = true;
        }
        if(betToInt > 500){
            errorObj.errorMsg += "No bets greater than 500 are accepted.\n";
            errorObj.gotError = true;
        }
        if(betToInt < 0){
            errorObj.errorMsg += "Cannot bet a negative amount.\n";
            errorObj.gotError = true;
        }
        if(betToInt === 0){
            errorObj.errorMsg += "Cannot bet 0.\n";
            errorObj.gotError = true;
        }
        if(!Number.isInteger(betToInt)){
            errorObj.errorMsg += "Bets must be integers.\n";
            errorObj.gotError = true;
        }
        return errorObj;
    },
    displayOverallStatus : function(){
        document.getElementById("balance").innerHTML = Player.balance;
        document.getElementById("bet").innerHTML = Player.bet;
        document.getElementById("games").innerHTML = Player.totalGames;
        document.getElementById("wins").innerHTML = Player.totalWins;
        document.getElementById("losses").innerHTML = Player.totalLosses;
    },
    displayCurrentStatus : function(){
        document.getElementById("playerValue").innerHTML = Player.totalHandValue;
        document.getElementById("playerHits").innerHTML = Player.numberOfHits;

        if(Player.standing || GameState.hasWinner) {
            document.getElementById("dealerValue").innerHTML = Dealer.getTotalValue().toString();
        } else if (!Player.standing) {
            document.getElementById("dealerValue").innerHTML = Dealer.getOneCardValue().toString();
        }
        document.getElementById("dealerHits").innerHTML = Dealer.numberOfHits;
    }
};

let GameState = {
    animationID : undefined,
    hasWinner : false,
    outOfFunds : function () {
        document.getElementById("balance").innerHTML = "1000";
        document.getElementById("bet").innerHTML = "0";
        document.getElementById("games").innerHTML = "0";
        document.getElementById("wins").innerHTML = "0";
        document.getElementById("losses").innerHTML = "0";
        document.getElementById("placeBet").style.display="block";
        document.getElementById("Player Cards").innerHTML = "";
        document.getElementById("Dealer Cards").innerHTML = "";
        document.getElementById("playerAnimation").innerHTML = "";
        document.getElementById("playerResults").innerHTML = "";
        document.getElementById("dealerAnimation").innerHTML = "";
        document.getElementById("playerValue").innerHTML = "0";
        document.getElementById("playerHits").innerHTML = "0";
        document.getElementById("dealerValue").innerHTML = "0";
        document.getElementById("dealerHits").innerHTML = "0";
        document.getElementById("errors").innerHTML = "";
        document.getElementById("outOfFunds").style.display="none";
        document.getElementById("overallStatusTitle").innerHTML = "Overall Status";
        document.getElementById("currentGameTitle").innerHTML = "Enter Bet to Start";
        Player.hand = [];
        Player.busted = false;
        Player.standing = false;
        Player.usedSpecialAceRule = false;
        Player.balance = 1000;
        Player.bet = 0;
        Player.totalWins = 0;
        Player.totalLosses = 0;
        Player.totalGames = 0;
        Player.numberOfHits = 0;
        Player.totalHandValue = 0;
        Player.acesInHand = 0;
        clearInterval(GameState.animationId);
    },
    busted : function() {
        let elem = document.getElementById("playerAnimation");
        let column = document.getElementById("centerColumn"); // Replace "yourColumnId" with the actual ID of your column
        let direction = 1; // 1 for right, -1 for left

        function updateColumnWidth() {
            return column.offsetWidth;
        }

        let columnWidth = updateColumnWidth();
        let pos = 0;

        GameState.animationId = setInterval(frame, 5);

        function frame() {
            columnWidth = updateColumnWidth();

            let subtractionValue = (columnWidth < 600) ? 150 : 350;

            if (pos >= columnWidth - subtractionValue) {
                direction = -1;
            } else if (pos <= 0) {
                direction = 1;
            }

            pos += direction;
            elem.style.transform = 'translateX(' + pos + 'px)';
        }

        // Handle window resize event to update column width
        window.addEventListener('resize', function () {
            columnWidth = updateColumnWidth();
        });
    }
};

let Player = {
    hand : [],
    busted : false,
    standing : false,
    usedSpecialAceRule : false,
    balance : 1000,
    bet : 0,
    totalWins : 0,
    totalLosses : 0,
    totalGames : 0,
    numberOfHits : 0,
    totalHandValue : 0,
    acesInHand : 0,
    dealInitialCards: function () {
        this.hand = [];
        for (let i = 0; i < Blackjack.startingCards; i++) {
            this.hand.push(Deck.getCard(this.hand));
        }
    },
    hit: function() {
        let card = Deck.getCard(this.hand);

        // If the deck is reshuffled, update the player's hand
        if (card === null) {
            this.hand = Blackjack.setHand();
        } else {
            // If a card is successfully obtained, add it to the player's hand
            this.hand.push(card);
        }
        UI.displayTotalHand(Player.hand, "Player Cards");
        this.numberOfHits++;
        this.totalHandValue += card.value;
        UI.displayCurrentStatus();
        if (this.isBusted()){
            if (Player.handContainsAces() && !Player.usedSpecialAceRule) {
                for(let i=0; i<Player.acesInHand; i++){
                    this.specialAceRule()
                }
            } else {
                document.getElementById("currentGameTitle").innerHTML = `Player Takes a Hit... and BUSTS! You lose $${Player.bet}`;
                document.getElementById("playerAnimation").innerHTML = "<i class=\"fa-solid fa-burst fa-shake fa-2xl\" style=\"color: #bc3434;\"></i> BUSTED <i class=\"fa-solid fa-skull fa-shake fa-2xl\" style=\"color: #bc3434;\"></i>";
                GameState.busted();
                this.endGameLoss()
                return;
            }
        }
        document.getElementById("currentGameTitle").innerHTML = `Player Takes Hit: ${Player.numberOfHits}. Click Hit or Stand`;
    },
    stand: function(){
        document.getElementById("currentGameTitle").innerHTML = `Player Stands on ${Player.totalHandValue} `;
        this.standing = true;
        Blackjack.gameState="Dealer";
        UI.displayTotalHand(Dealer.hand, "Dealer Cards");
        UI.displayCurrentStatus();
        this.endTurn();
        if ((Dealer.totalHandValue > 16 && Dealer.totalHandValue > Player.totalHandValue && Dealer.totalHandValue < 22)){
            document.getElementById("currentGameTitle").innerHTML = `You stood on ${Player.totalHandValue} and lost on points! You lost $${Player.bet}`;
            Player.endGameLoss();
        }
        else if ((Dealer.totalHandValue === Player.totalHandValue) && Dealer.totalHandValue > 16){
            document.getElementById("currentGameTitle").innerHTML = `Dealer wins on ties! You lost $${Player.bet}`;
            Player.endGameLoss();
        }
        else if (Dealer.totalHandValue > 21 || (Player.totalHandValue > Dealer.totalHandValue && Dealer.totalHandValue > 16)){
            document.getElementById("currentGameTitle").innerHTML = `You stood on ${Player.totalHandValue} and won on points! You won $${Player.bet}`;
            Player.endGameWin();
        }
    },
    getTotalValue : function(){
        let tempHandValue = 0;
        for (let i=0; i<this.hand.length; i++){
            tempHandValue += this.hand[i].value;
        }
        this.totalHandValue = tempHandValue;
        return tempHandValue;
    },
    isBusted : function(){
        if (this.totalHandValue>21){
            this.busted = true;
            return true;
        } else {
            return false;
        }
    },
    endGameLoss : function () {
       // alert("YOU LOSE");
        GameState.hasWinner = true;
        Player.updateBalanceLoss();
        Player.totalLosses++;
        UI.displayOverallStatus();
        document.getElementById("playerResults").innerHTML += "<i class=\"fa-regular fa-face-frown fa-spin fa-2xl\" style=\"color: #070ff2;\"></i> LOSER <i class=\"fa-regular fa-face-frown fa-spin fa-2xl\" style=\"color: #070ff2;\"></i>";
        document.getElementById("dealerAnimation").innerHTML += "<i class=\"fa-solid fa-trophy fa-beat fa-2xl\" style=\"color: #f6cf09;\"></i> WINNER <i class=\"fa-solid fa-trophy fa-beat fa-2xl\" style=\"color: #f6cf09;\"></i>";
        document.getElementById("playerValue").innerHTML = Player.totalHandValue;
        document.getElementById("hitButton").style.display="none";
        document.getElementById("standButton").style.display="none";
        document.getElementById("dealerHit").style.display="none";
        document.getElementById("errors").innerHTML = "";
    },
    endGameWin : function () {
       // alert("YOU WIN");
        GameState.hasWinner = true;
        Player.updateBalanceWin();
        Player.totalWins++;
        UI.displayOverallStatus();
        document.getElementById("playerResults").innerHTML += "<i class=\"fa-solid fa-trophy fa-beat fa-2xl\" style=\"color: #f6cf09;\"></i> WINNER <i class=\"fa-solid fa-trophy fa-beat fa-2xl\" style=\"color: #f6cf09;\"></i>";
        document.getElementById("dealerAnimation").innerHTML += "<i class=\"fa-regular fa-face-frown fa-spin fa-2xl\" style=\"color: #070ff2;\"></i> LOSER <i class=\"fa-regular fa-face-frown fa-spin fa-2xl\" style=\"color: #070ff2;\"></i>";
        document.getElementById("placeBet").style.display="block";
        document.getElementById("hitButton").style.display="none";
        document.getElementById("standButton").style.display="none";
        document.getElementById("dealerHit").style.display="none";
        document.getElementById("errors").innerHTML = "";
    },
    endTurn : function () {
        document.getElementById("hitButton").style.display="none";
        document.getElementById("standButton").style.display="none";
        document.getElementById("dealerHit").style.display="block";
    },
    updateBalanceLoss : function() {
        Player.balance -= Player.bet;
        if (Player.balance === 0){
           // alert("GAME OVER, YOU RAN OUT OF FUNDS");
            document.getElementById("overallStatusTitle").innerHTML = `YOU RAN OUT OF FUNDS! Click Restart Session to start new game`;
            document.getElementById("outOfFunds").style.display="block";
            document.getElementById("placeBet").style.display="none";

        } else {
            document.getElementById("placeBet").style.display="block";
        }
    },
    updateBalanceWin : function() {
        this.balance += (this.bet * Blackjack.standardOrBlackjack().payout);
    },
    handContainsAces : function() {
        let hasAce = false;
        for(let i=0; i<Player.hand.length; i++){
            if(Player.hand[i].img.includes("A")){
                hasAce = true;
                Player.acesInHand++;
            }
        }
        return hasAce;
    },
    specialAceRule : function() {
        if(Player.totalHandValue > 21 && Player.handContainsAces()){
            Player.totalHandValue -= 10;
            Player.usedSpecialAceRule = true;
        }
        document.getElementById("playerValue").innerHTML = Player.totalHandValue;
    }
};

let Dealer = {
    hand : [],
    busted : false,
    numberOfHits : 0,
    totalHandValue : 0,
    dealInitialCards: function(){
        this.hand = [];
        for (let i = 0; i < Blackjack.startingCards; i++) {
            this.hand.push(Deck.getCard(this.hand));
        }
    },
    hit: function() {
        let card = Deck.getCard(this.hand);

        // If the deck is reshuffled, update the player's hand
        if (card === null) {
            this.hand = Blackjack.setHand();
        } else {
            // If a card is successfully obtained, add it to the player's hand
            this.hand.push(card);
        }
        this.numberOfHits++;
        UI.displayTotalHand(Dealer.hand, "Dealer Cards")
        UI.displayCurrentStatus();
        if (Dealer.totalHandValue > 16 && Dealer.totalHandValue > Player.totalHandValue && Dealer.totalHandValue < 22){
            document.getElementById("currentGameTitle").innerHTML += `Dealer wins on points! You lost $${Player.bet}`;
            Player.endGameLoss();
        }
        if (Dealer.totalHandValue > 16 && Dealer.totalHandValue < Player.totalHandValue){
            document.getElementById("currentGameTitle").innerHTML += `Player wins on points! You won $${Player.bet}`;
            Player.endGameWin();
        }
        if (Dealer.totalHandValue === Player.totalHandValue){
            document.getElementById("currentGameTitle").innerHTML += `Dealer wins on ties! You lost $${Player.bet}`;
            Player.endGameLoss();
        }
        if (this.isBusted()){
            document.getElementById("currentGameTitle").innerHTML += `Dealer busts! You won $${Player.bet}`;
            Player.endGameWin();
        }
    },
    getTotalValue : function(){
        let tempHandValue = 0;
        for (let i=0; i<this.hand.length; i++){
            tempHandValue += this.hand[i].value;
        }
        this.totalHandValue = tempHandValue;
        return tempHandValue;
    },
    getOneCardValue : function(){
        return this.hand[1].value;
    },
    isBusted : function(){
        if (this.totalHandValue>21){
            this.busted = true;
            return true;
        } else {
            return false;
        }
    },
};

let Blackjack = {
    gameState : "Player",
    blackjackValue : 21,
    payoutRates :  new Map( [
        ['standard', 1],
        ['blackjack', 2],
    ]),
    startingCards: 2,
    setHand : function(){
        let hand = [];
        for(let i=0; i<this.startingCards; i++){
            hand.push(Deck.getCard(hand));
        }
        return hand;
    },
    standardOrBlackjack : function(){
        let initialHandResults = {
            payout : this.payoutRates.get('standard'),
            winType : 'standard'
        }
        if (this.gotBlackjack(Player.hand)){
            initialHandResults.payout = this.payoutRates.get('blackjack');
            initialHandResults.winType = 'blackjack';
        }

        return initialHandResults;
    },
    gotBlackjack : function(hand){
        return (hand[0].img.includes("A") || hand[1].img.includes("A")) && (hand[0].img.includes("J") || hand[1].img.includes("J"));
    }
};

function startGame() {
    // Resets game
    Player.hand = [];
    Player.busted = false;
    Dealer.hand = [];
    Dealer.busted = false;
    Player.numberOfHits = 0;
    Dealer.numberOfHits = 0;
    Blackjack.gameState = "Player";
    Player.totalHandValue = 0;
    Dealer.totalHandValue = 0;
    Player.acesInHand = 0;
    Player.standing = false;
    Player.usedSpecialAceRule = false;
    GameState.hasWinner = false;
    clearInterval(GameState.animationId);
    GameState.animationId = undefined;
    document.getElementById("placeBet").style.display="block";
    document.getElementById("playerAnimation").innerHTML = "";
    document.getElementById("playerResults").innerHTML = "";
    document.getElementById("dealerAnimation").innerHTML = "";
    document.getElementById("overallStatusTitle").innerHTML = `Overall Status`;

    let gotError = UI.setBet("betValue", "errors");

    // Deals both player's cards
    if (!gotError) {
        document.getElementById("currentGameTitle").innerHTML = `Bet: ${Player.bet} | Click Hit or Stand to continue.`
        UI.displayOverallStatus();
        Player.totalGames++;
        Player.dealInitialCards();
        Dealer.dealInitialCards();
        Player.getTotalValue();

        if (Blackjack.gotBlackjack(Dealer.hand)){
           // alert("DEALER GOT BLACKJACK!");
            UI.displayTotalHand(Player.hand, "Player Cards");
            UI.displayTotalHand(Dealer.hand, "Dealer Cards");
            document.getElementById("Dealer Cards").innerHTML += "<img class=\"fa-beat\" id='blackjackImg' src='img/blackjack.png'  alt='Blackjack Logo' />";
            Player.endGameLoss();
            UI.displayCurrentStatus();
            document.getElementById("currentGameTitle").innerHTML = `DEALER GOT BLACKJACK... You lose!`;
            document.getElementById("overallStatusTitle").innerHTML = `BLACKJACK! But not for you... :( Current Status`;
            return;
        } else if (Blackjack.gotBlackjack(Player.hand)){
            //alert("YOU GOT BLACKJACK!");
            UI.displayTotalHand(Player.hand, "Player Cards");
            UI.displayTotalHand(Dealer.hand, "Dealer Cards");
            document.getElementById("Player Cards").innerHTML += "<img class=\"fa-beat\" id='blackjackImg' src='img/blackjack.png'  alt='Blackjack Logo' />";
            Player.endGameWin();
            UI.displayCurrentStatus();
            document.getElementById("currentGameTitle").innerHTML = `YOU GOT BLACKJACK... You win 2x your bet!`;
            document.getElementById("overallStatusTitle").innerHTML = `BLACKJACK! Current Status`;
            return;
        } else if (Player.isBusted()){
            if (Player.handContainsAces() && !Player.usedSpecialAceRule) {
                UI.displayCurrentStatus();
                for(let i=0; i<Player.acesInHand; i++){
                    Player.specialAceRule()
                }
            } else {
                Player.endGameLoss()
                UI.displayCurrentStatus();
                return;
            }
        }
        document.getElementById("hitButton").style.display="";
        document.getElementById("standButton").style.display="";
        UI.displayTotalHand(Player.hand, "Player Cards");
        UI.displayDealerHandInitial(Dealer.hand, "Dealer Cards");
        UI.displayCurrentStatus();
        document.getElementById("placeBet").style.display="none";

    }
}