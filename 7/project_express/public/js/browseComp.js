Vue.component('browse-menu', {
    data() {
       return  {
        urlForWomen: '/api/womenTopics', 
        urlForMen: '/api/menTopics',
        linksForWomen: [],
        linksForMen: [],
        show: false 
        }   
    }                        
    ,
    mounted(){
        this.$parent.getJson(this.urlForWomen)
            .then(data => {
                for(let el of data){
                    this.linksForWomen.push(el);
                }
            });
            this.$parent.getJson(this.urlForMen)
            .then(data => {
                for(let el of data){
                    this.linksForMen.push(el);
                }
            });
    },
    template: `<div class="browse" id="browseMenu" @click="show=!show">
    <span class="browse__name">Browse</span>
    <div class="browse__down" v-show="show">
      <h3 class="browse__subtitle">Women</h3>
      <a v-for="item of linksForWomen" :href=item.link class="browse__link myLink">{{item.name}}</a>
      <h3 class="browse__subtitle browse__subtitle_next">Men</h3>
      <a v-for="item of linksForMen" :href=item.link class="browse__link myLink">{{item.name}}</a>
    </div>
    <span class="fa fa-caret-right"></span>
  </div>`
});