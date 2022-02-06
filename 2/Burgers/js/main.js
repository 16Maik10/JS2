"use strict"

//[price, calories] for each position
const menu = {
    small: [50, 20],
    big: [100, 40],
    cheese: [10, 20],
    salad: [20, 5],
    potato: [15,10],
    spice: [15, 0],
    mayonnaise: [20, 5]
}

class Hamburger{
    constructor(params){
        this.paramsOfOrder = params;
        this.totalCalory = 0;
        this.totalCost = 0;
    }

    cookBurger(){
        this.paramsOfOrder.forEach(el => {this.totalCost+=menu[el.value][0]; this.totalCalory+=menu[el.value][1];})
        return `Your burger costs ${this.totalCost} rub. (${this.totalCalory} calories)`;
    }
}

const resultEl = document.querySelector('.result');



document.querySelector('.burger').addEventListener('submit', (event)=>{
    event.preventDefault();
    const allChoises = document.querySelectorAll('input:checked');
    const currentOrder = new Hamburger(allChoises);
    resultEl.innerHTML = currentOrder.cookBurger();
})