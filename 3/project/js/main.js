const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        //this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
                 console.log(data);
                 this.render()
            });
    }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class ProductInBasket extends ProductItem{
    constructor(product, img = 'https://via.placeholder.com/50x100'){
        super(product, img);
        this.quantity = product.quantity;
    }

    render(){
        if(this.quantity === 0){
return ``;
    }
        return `<div class="addedProduct" data-id="${this.id}">
        <img src="${this.img}" alt="product_img" />
        <div class="addedProduct__desc">
          <h3>${this.title}</h3>
          <p class="quantity">Quantity: ${this.quantity}</p>
          <p>$${this.price} each</p>
        </div>
        <div class="addedProduct__action">
          <h3>$${this.price * this.quantity}</h3>
          <button class="buy-btn remove-btn">
            <i class="fa fa-times remove-btn" aria-hidden="true"></i>
          </button>
        </div>
      </div>`
    }
}

class Basket extends ProductsList{
    constructor(container = '.basket'){
        super(container);
    }

    _getProducts(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    render(){
        const block = document.querySelector(this.container);
        this.goods.contents
        for (let product of this.goods.contents){
            const productObj = new ProductInBasket(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }

    refresh(){
        Array.from(document.querySelector(this.container).children).forEach((el, ind) => {if(ind){el.remove()}});
    }

    addElement(product, list = basketList){
        const elInBasket = this.goods.contents.find(el => el.id_product == product.dataset.id);
        elInBasket.quantity++;
        this.refresh();
        this.render();
    }

    removeElement(product, list = basketList){
        const elInBasket = this.goods.contents.find(el => el.id_product == product.dataset.id);
        elInBasket.quantity = 0;
        product.remove();
    }

}

const basketMenuEl = document.querySelector('div.basket');
document.querySelector('button.btn-cart').addEventListener('click', e => basketMenuEl.classList.toggle('visibility'));

let productList = new ProductsList();
let basketList = new Basket();
console.log(productList.allProducts);

document.querySelector('.products').addEventListener('click', event => {
    if(!event.target.classList.contains('buy-btn')){
        return;
    }
    basketList.addElement(event.path.find(el => el.classList.contains('product-item')));
})

document.querySelector('.basket').addEventListener('click', event =>{
    if(!event.target.classList.contains('remove-btn')){
        return;
    }
    basketList.removeElement(event.path.find(el => el.classList.contains('addedProduct')));
})

