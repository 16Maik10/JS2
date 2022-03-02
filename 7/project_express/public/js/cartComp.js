const cartItem = {
  props:['product'],
   template: `<figure class="addedProduct" :key="product.id">
   <img
     :src="product.img"
     alt="s"
     width="72px"
     height="85px"
   />
   <figcaption class="addedProduct__descBlock">
     <p class="addedProduct__name">{{product.name}}</p>
     <div class="addedProduct__rating">
       <i class="fa fa-star"></i>
       <i class="fa fa-star"></i>
       <i class="fa fa-star"></i>
       <i class="fa fa-star"></i>
       <i class="fa fa-star-half-o" aria-hidden="true"></i>
     </div>
     <p class="addedProduct__price"><span>{{product.quantity}}</span> x <span>{{product.price.toFixed(2)}}</span></p>
   </figcaption>
   <button class="Cart-list__button addedProduct__button button" @click=$parent.remove(product)>
     <i class="fa fa-times-circle" aria-hidden="true"></i>
   </button>
   </figure>`
};


const cart = {
  components: {cartItem},
  data(){
      return {
          show: false,
          cartItems: [],
          amount: 0,
          countGoods: 0
      }
  },
  methods: {
    addToCart(item){
      this.countGoods++;
      let find = this.cartItems.find(el => el.id === item.id);
      if(find){
          this.amount += find.price;
          this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1, price: find.price})
              .then(data => {
                  if(data.result === 1){
                      find.quantity++
                  }
              })
      } else {
          const prod = Object.assign({quantity: 1}, item);
          this.amount += prod.price;
          this.$parent.postJson(`/api/cart`, prod)
              .then(data => {
                  if(data.result === 1){
                      this.cartItems.push(prod)
                  }
              })
      }

  },
  remove(item){
    this.countGoods--;
    let find = this.cartItems.find(el => el.id === item.id);
    this.amount -= find.price;
    if(find.quantity===1){
      this.cartItems.splice(this.cartItems.indexOf(find),1)
    }
    this.$parent.deleteJson(`/api/cart/${find.id}`, {quantity: 1, price: find.price})
        .then(data => {
            if(data.result === 1){
                find.quantity--
            }
        })
  }
  },
  mounted(){
    this.$parent.getJson(`/api/cart`)
        .then(data => {
            this.amount = data.amount;
            this.countGoods = data.countGoods;
            for (let item of data.contents){
                this.$data.cartItems.push(item);
            }
        });
},
  template: `<div><div class="cart-menu" v-show=show>
  <p class="cart-menu__status" v-show="!cartItems[0]">В корзине пусто</p>
  <div class="cart-menu__goods">
  <cart-item v-for="item of cartItems" :key="item.id" :product="item"></cart-item>
  </div>
  <div class="cart-menu__total" v-show="cartItems[0]">
    <p>total</p>
    <p class="cart-menu__total_value">{{amount.toFixed(2)}}</p>
  </div>
  <a
    class="cart-menu__btn-check featuredItems__button myLink"
    href="checkout.html"
    >CHECKOUT</a
  >
  <a
    class="cart-button cart-menu__btn-cart myLink"
    href="shoping_cart.html"
    >go to cart</a
  >
</div>
<button class="headerTop__cart button" @click="show=!show"
  ><div class="headerTop__cartCounter">{{countGoods}}</div></button
></div>`
}

