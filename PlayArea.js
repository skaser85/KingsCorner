class PlayArea {
    constructor(name, x, y, width, height, rotateDeg, borderColor, fillColor) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotateDeg = rotateDeg;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.isActive = false;
        this.isSelected = false;
        this.cards = [];
        if(this.rotateDeg === 0) {
            this.left = this.x - (this.width / 2);
            this.right = this.x + (this.width / 2);
            this.top = this.y - (this.height / 2);
            this.bottom = this.y + (this.height / 2);
        } else {
            // gross
            let rads = radians(this.rotateDeg);
            let rotX = this.x*cos(rads) - this.y*sin(rads);
            let rotY = this.x*sin(rads) + this.y*cos(rads);
            this.left = rotX - (this.width / 2);
            this.right = rotX + (this.width / 2);
            this.top = rotY - (this.height / 2);
            this.bottom = rotY + (this.height / 2);
        }
        this.offset = 25;
    }

    addTo(card) {
        if(card.pile) {
            card.pile.removeFrom(card);
        }
        card.pile = this;
        card.setCoords(this.x, this.y);
        card.setRotation(this.rotateDeg);
        this.cards.push(card);
    }

    removeFrom(card) {
        let cardIndex = this.cards.indexOf(card);
        this.cards.splice(cardIndex, 1);
        card.pile = null;
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

    setOffset(card, offset) {
        switch(this.name) {
            case "northPile":
                card.setCoords(this.x, this.y - offset);
                break;
            case "southPile":
                card.setCoords(this.x, this.y + offset);
                break;
            case "northEastPile":
                card.setCoords(this.x + offset, this.y - offset);
                break;
            case "southEastPile":
                card.setCoords(this.x + offset, this.y + offset);
                break;
            case "eastPile":
                card.setCoords(this.x + offset, this.y);
                break;
            case "northWestPile":
                card.setCoords(this.x - offset, this.y - offset);
                break;
            case "southWestPile":
                card.setCoords(this.x - offset, this.y + offset);
                break;
            case "westPile":
                card.setCoords(this.x - offset, this.y);
                break;
        }
    }

    draw() {
        push()
        if(this.isActive || this.isSelected) {
            fill(this.fillColor);
        } else {
            noFill();
        }
        stroke(this.borderColor);
        strokeWeight(2);
        translate(this.x, this.y);
        rotate(this.rotateDeg);
        rect(0, 0, this.width, this.height);
        pop();

        if(this.cards.length > 0) {
            this.offset = 25;
            for(let i = 0; i < this.cards.length; i++) {
                let card = this.cards[i];
                if(i === 0) {
                    card.setCoords(this.x, this.y);
                } else if(i === 1) {
                    this.setOffset(card, this.offset);
                } else {
                    this.offset += 10;
                    this.setOffset(card, this.offset);
                }                
                card.draw();
            }
        }
    }
}