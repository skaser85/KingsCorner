class Deck {
    constructor(x, y, width, height, deckColor, borderColor, fillColor) {
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
        this.fillColor = fillColor;
        this.isActive = false;
        this.cards = [];
        this.cardsInPlay = [];
        this.isEmpty = false;
        
        this.backColors = ["blue", "gray", "green", "purple", "red", "yellow"];
        this.img = loadImage(`cards/${this.deckColor}_back.png`);
    }

    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    getCard() {
        let c = this.cards[0];
        this.cards.splice(0, 1);
        c.visible = true;
        c.backImg = this.img;
        this.cardsInPlay.push(c);
        return(c)
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
            fill(this.fillColor);
        } else {
            noFill();
        }
        stroke(this.borderColor);
        strokeWeight(2);
        translate(this.x, this.y)
        rect(0, 0, this.width, this.height);
        if(!this.isEmpty) {
            image(this.img, 0, 0, cardWidth, cardHeight);
        }
        pop();
    }
}