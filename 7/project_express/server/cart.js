let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount+=req.body.price;
    cart.countGoods++;
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    cart.amount+=req.body.price;
    cart.countGoods++;
    let find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let remove = (cart,req) => {
    cart.amount-=req.body.price;
    cart.countGoods--;
    let find = cart.contents.find(el => el.id === +req.params.id);
    if(find.quantity===1){
        cart.contents.splice(cart.contents.indexOf(find),1)
    }else{
    find.quantity -= req.body.quantity;
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove
};