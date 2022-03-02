const product = {
    props: ['product'],
    template: `<figure class="productCard">
    <a class="product myLink" href="single_page.html">
      <img
        :src="product.img"
        alt="photo"
        class="product__photo"
      />
      <figcaption class="product__desc">
        <h4 class="product__title">{{product.name}}</h4>
        <p class="product__price">{{'$' + product.price.toFixed(2)}}</p>
      </figcaption>
    </a>
    <div class="addBox">
      <button class="addBox__button myLink" @click="$root.$refs.cart.addToCart(product)"> Add to cart </button>
    </div>
  </figure>`
};


const products = {
  components: {product},
  data(){
      return {
          catalogUrl: `/api/productCatalog`,
          products: []
      }
  },
  mounted(){
      this.$parent.getJson(this.catalogUrl)
          .then(data=>{
              for(let el of data){
                  this.products.push(el);
              }
          })
  },
  template: `<div class="itemsCardBox">
  <product v-for="item of products" :key="item.id" :product="item"></product>
  </div>`
}