let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let botBought = localStorage.getItem('botBought') === 'true';
let lastClaimTime = localStorage.getItem('lastClaimTime') ? parseInt(localStorage.getItem('lastClaimTime')) : 0;
let clickLevel = localStorage.getItem('clickLevel') ? parseInt(localStorage.getItem('clickLevel')) : 1;
let limitLevel = localStorage.getItem('limitLevel') ? parseInt(localStorage.getItem('limitLevel')) : 1;

function startGame() {
    document.getElementById('clicker-game').style.display = 'flex';
    document.getElementById('start-container').style.display = 'none';
    updateScore();
}

function clickGame() {
    score += clickLevel;
    saveAndDisplayScore();
}

function withdrawal() {
    document.getElementById('withdrawal-msg').innerText = "Coming Soon";
}

function buyBot() {
    if (score >= 5000 && !botBought) {
        score -= 5000;
        botBought = true;
        lastClaimTime = Date.now();
        saveAndDisplayScore();
        localStorage.setItem('botBought', botBought);
        localStorage.setItem('lastClaimTime', lastClaimTime);
        document.getElementById('buy-bot-btn').style.display = 'none';
        document.getElementById('claim-btn').style.display = 'inline-block';
        document.getElementById('bot-msg').innerText = "Bot Bought! You can claim 2000 LNC every 5 hours.";
    } else if (botBought) {
        document.getElementById('bot-msg').innerText = "Bot already bought!";
    } else {
        document.getElementById('bot-msg').innerText = "Not enough LNC to buy bot.";
    }
}

function claimBot() {
    if (botBought) {
        const currentTime = Date.now();
        if (currentTime - lastClaimTime >= 5 * 60 * 60 * 1000) { // 5 hours
            score += 2000;
            lastClaimTime = currentTime;
            saveAndDisplayScore();
            localStorage.setItem('lastClaimTime', lastClaimTime);
            document.getElementById('bot-msg').innerText = "2000 LNC claimed!";
        } else {
            document.getElementById('bot-msg').innerText = "You can claim again after 5 hours.";
        }
    }
}

function showBoost() {
    document.getElementById('boost-container').style.display = 'flex';
}

function buyClick() {
    let clickCost = 200 * Math.pow(2, clickLevel - 1);
    if (score >= clickCost) {
        score -= clickCost;
        clickLevel++;
        saveAndDisplayScore();
        localStorage.setItem('clickLevel', clickLevel);
        document.getElementById('click-btn').innerText = `Click Level: ${clickLevel}`;
        document.getElementById('task-msg').innerText = `Click Level Up! Cost: ${clickCost} LNC`;
    } else {
        document.getElementById('task-msg').innerText = "Not enough LNC to buy Click Level.";
    }
}

function buyLimit() {
    let limitCost = 200 * Math.pow(2, limitLevel - 1);
    if (score >= limitCost) {
        score -= limitCost;
        limitLevel++;
        saveAndDisplayScore();
        localStorage.setItem('limitLevel', limitLevel);
        document.getElementById('limit-btn').innerText = `Limit Level: ${limitLevel}`;
        document.getElementById('task-msg').innerText = `Limit Level Up! Cost: ${limitCost} LNC`;
    } else {
        document.getElementById('task-msg').innerText = "Not enough LNC to buy Limit Level.";
    }
}

function saveAndDisplayScore() {
    localStorage.setItem('score', score);
    updateScore();
}

function updateScore() {
    document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
    if (botBought) {
        document.getElementById('buy-bot-btn').style.display = 'none';
        document.getElementById('claim-btn').style.display = 'inline-block';
    }
}
