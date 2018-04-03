<template>
  <div class="container-fluid ">
  <header class="header">
     <div class="overlay-content row">
        <div class="col main-text">
          <h1>Currently viewing App</h1>
        </div>

      </div>
  
  </header>
  <section class="content">

          <div class="col online">
          <h1>Online Viewers</h1>

          <div class="list">
            <li v-for="(item, index) in ipAddresses" :key="index">{{item}}</li>
          </div>

          </div>
  </section>

  <footer class="fixed-bottom">
    <p>We are here</p>
  </footer>
  </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
export default {
  name: 'Home',
  data () {
    return {
      //this stores the ip address of visitors currently on line
     ipAddresses :["192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.4", "192.168.1.4","192.168.1.4","192.168.1.4","192.168.1.4","192.168.1.4"],
     userInfo : []
    }
  },

  mounted : function(){
    var self = this;
    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
     this.userInfo = data;
     self.ipAddresses.push(data.ip)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

   header{
    
    min-height: 10rem;
    background: url("../../static/img/bay-beach.jpeg") no-repeat center center;
    background-size: cover;
  }

 .content{
   margin-bottom: 2rem;
 }

  li{
    list-style: none;
    background-color: black;
    color:white;
    padding:.5rem;
    margin:.2rem;
    text-align: left;
    width: 100%;
    float: right;
    cursor: pointer;
    transition: transform 500ms;
    transition-delay :0s;
  }
   li:nth-child(odd){
    clear: both;
  }

   li:nth-child(even){
    clear: both;
  }
  .overlay-content{
    width :100%;
    height: 100%;
   
  }

  footer{
    
    max-height: 2rem;
    background-color:white;
    z-index: 200;
    box-shadow: -.5rem -.5rem .5rem white;
    padding: .2rem;
  }

  .container-fluid {
    
    padding: 0 !important;
    margin: 0 !important;
  }

  .main-text{
    margin: 0 !important;
    padding-top: .9rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: red;
    width: 100%;
    
    
  }

  .main-text h1{
    font-size: 2rem;
    text-shadow: 0 0 2rem black;
    color: red
    
    
  }

  .online{
    padding-top: .9rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: #000;
    margin:0 !important;
    width:100%
  }

  .online h1{
    font-size: 1rem;
     color: #000;
    
  }


  @media only screen  and (min-width:550px) {
  header{
    min-height: 20rem;
    background: url("../../static/img/bay-beach.jpeg") no-repeat center center;
    background-size: cover;
  }

  .overlay{
    position: absolute;
    top: 0;
    left:0;
    position: fixed;
    right: 0;
    min-height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }


  footer{
    
    max-height: 5rem;
    background-color:white;
   
    box-shadow: -1rem 1rem 1rem white;
    padding: .7rem;
  }

  .container-fluid{
    
    padding: 0 !important;
    margin: auto !important;
  }

  .main-text{
    margin: 0 !important;
    padding-top: 5rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: #fff;
    
    
  }

  .main-text h1{
    font-size: 5rem;
    text-shadow: 0 0 2rem black;

    
  }

  .online{
    padding-top: 1rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: #fff;
    margin:0 !important;
  }

  .online h1{
    font-size: 3rem;
    
    
  }

  li{
    
    width: 40%;
   
  }

  li:hover{
   transform: translateX(-20px);
  }

  li:nth-child(odd){
    float:left;
  }

li:nth-child(odd):hover{
    transform: translateX(20px);
  }

  li:nth-child(even){
    float:right;
    position: relative;
    
    top: -3rem;
  }
  

  }
</style>
