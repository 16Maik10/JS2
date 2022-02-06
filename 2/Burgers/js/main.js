"use strict"

const menu = {
    small: [50, 20],
    big: [100, 40],
    cheese: [10, 20],
    salad: [20, 5],
    potato: [15,10],
    spice: [15, 0],
    mayonnaise: [20, 5]
}

let totalCost, totalCalory;

function cookBurger(){
    totalCost = 0;
    totalCalory = 0;
    document.querySelectorAll('input:checked').forEach(el => 
        {totalCost+=menu[el.value][0];          
        totalCalory+=menu[el.value][1]});     
}

const resultEl = document.querySelector('.result');

document.querySelector('.burger').addEventListener('submit', (event)=>{
    event.preventDefault();
    cookBurger();
    resultEl.innerHTML = `Your burger costs ${totalCost} (${totalCalory} calories)`
})