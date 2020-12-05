class Deck {
    constructor(x, y, width, height, deckColor, borderColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.left = this.x - (this.width / 2);
        this.right = this.x + (this.width / 2);
        this.top = this.y - (this.height / 2);
        this.bottom = this.y + (this.height / 2);
        this.deckColor = deckColor;
        this.borderColor = borderColor;
        this.isActive = false;
        this.cards = [];
        this.cardsInPlay = [];
        
        this.backColors = ["blue", "gray", "green", "purple", "red", "yellow"];
        this.img = loadImage(`cards/${this.deckColor}_back.png`);
    }

    getCard() {
        let cardIndex = Math.floor((Math.random() * this.cards.length));
        let card = this.cards[cardIndex];
        this.cards.splice(cardIndex, 1);
        this.cardsInPlay.push(card);
        return card;
    }

    mouseIsOver() {
        return (mouseX >= this.left) && 
               (mouseX <= this.right) &&
               (mouseY >= this.top) &&
               (mouseY <= this.bottom);
    }

    update() {
        this.isActive = this.mouseIsOver();
    }

    draw() {
        push()
        if(this.isActive) {
            fill(this.borderColor);
        } else {
            noFill();
        }
        stroke(this.borderColor);
        strokeWeight(2);
        translate(this.x, this.y)
        deckPile = rect(0, 0, this.width + 10, this.height + 10);
        image(this.img, 0, 0, this.width, this.height);
        pop();
    }
}