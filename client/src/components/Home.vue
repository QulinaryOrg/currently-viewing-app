<template>
  <div class="container-fluid ">
    <header class="header">
      <div class="overlay-content">
        <img src="../../static/img/logo.png" class="img-responsive">
        <div class="col main-text">
          <h1>Currently Viewing App</h1>
        </div>
      </div>
    </header>
    <section class="content">
      <div class="own-info">
        <h1>Your IP</h1>
        <ul>
          <li class="ownIp">{{userInfo.ip}}</li>
        </ul>
        <hr />
      </div>
      <div class="online">
        <h1>Online Viewers</h1>
        <div class="paginate row">
          <div class="col-md-7">
            <h3>No of viewers per page</h3>
            <select v-model="size" class="form-control">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <h5 class="col-md-5">Total online : {{ipAddresses.length + 1}}</h5>
        </div> 
        <h5 > Click to see more information about each viewer</h5>
        <hr />
        <div class="list">
          <li v-for="(viewer, index) in paginateViewers" :key="index" @click="showDetailModal=true; viewDetails(viewer._id)" >{{viewer.ip}}</li>
          <h4 v-if="ipAddresses.length == 0">You are the only one online</h4>
        </div>
        <div :class="[pageNumber ? 'display' : '', 'previous']" @click="prevPage">
          &lt;
        </div>
        <div :class="[pageNumber < pageCount ? 'display' : '', 'next']" @click="nextPage">
          &gt;
        </div>
      </div>
      <b-modal v-model="showDetailModal">
        <h2>{{viewerDetails.ip}}</h2>
        Country <p>{{viewerDetails.country}}</p>
        Region <p>{{viewerDetails.region}}</p>
        City <p>{{viewerDetails.city}}</p>
        Time Zone <p>{{viewerDetails.timeZone}}</p>
        <p>Latitude : {{viewerDetails.latitude}}, Longitude : {{viewerDetails.longitude}}</p>
        Browser <p> {{viewerDetails.browser}}</p>
      </b-modal>
    </section>
    <footer class="fixed-bottom row">
      <p class="col-md-4">&copy; Everistus Olumese - 2018</p>
      <h3 class="col-md-4">Page : {{pageNumber + 1}} of {{ pageCount ? pageCount + 1 : 1 }}</h3>
      <div class="col-md-4">
        <div class="fb-like float-right" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
      </div>
    </footer>
  </div>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
//console.log(this);

const axios = require("axios");
export default {
  name: "Home",
  data() {
    return {
      //this stores the ip address of visitors currently on line
      ipAddresses: [],
      userInfo: {},
      showDetailModal: false,
      currentUser: "",
      pageNumber: 0,
      size: 5,
      viewerDetails: {},
    };
  },

  methods: {
    nextPage: function() {
      this.pageNumber++;
    },

    prevPage: function() {
      this.pageNumber--;
    },

    viewDetails: function(id) {
      //console.log(id);
      this.viewerDetails = this.ipAddresses.filter(viewer => {
        return viewer._id === id;
      });
      //set viewerdetails to the first element of the returned array
      this.viewerDetails = this.viewerDetails[0];
    },

    deleteViewer: function(event) {
      //ie hack
      if (event) {
        event.returnValue = "event seems to need to be set";
      }
      this.$socket.emit("deleteViewer", this.currentUser);

      /* console.log("Called from somewhere");
      let url = `http://localhost:3000/api/delete/${this.currentUser}`;

      console.log(url);
      axios.delete(url, { data: null }).then(result => {
        return "Please click 'Stay on this Page' and we will give you candy";
      });*/
    }
  },

  sockets: {
    viewer(data) {
      console.log(data);
      if (data.id) {
        this.currentUser = data.id;
      }

      this.ipAddresses = data.data.filter(viewer => {
        return viewer._id != this.currentUser;
      });
    }
  },
  created: function() {
    /* this.$socket.on("viewer", function(data) {
      console.log(data);
    }); */
    let self = this;
    $(window).bind("beforeunload", function() {
      // console.log("self", self);
      self.deleteViewer();
      return "Do you really want to close?";
    });
    window.addEventListener("unload", this.deleteViewer);

    $.getJSON("http://freegeoip.net/json/?callback=?", function(data) {
      if (data) {
        let userAgent = window.navigator.userAgent;

        self.userInfo = {
          ip: data.ip,
          country: data.country_name,
          region: data.region_name,
          city: data.city,
          timeZone: data.time_zone,
          latitude: data.latitude,
          longitude: data.longitude,
          browser: userAgent
        };

        /* axios
          .post("http://localhost:3000/api/add", self.userInfo)
          .then(result => {
            self.currentUser = result.data.id;
            console.log("Current User", self.currentUser);
            self.ipAddresses = result.data.data.filter(viewer => {
              return viewer._id != self.currentUser;
            });

            // console.log("Current User", self.currentUser);
          }); */

        self.$socket.emit("viewerData", self.userInfo);
      }
    });
  },

  beforeDestroy: function() {
    // console.log("Before Destroy");
    this.deleteViewer();
  },

  computed: {
    pageCount: function() {
      let l = this.ipAddresses.length,
        s = parseInt(this.size);

      return Math.floor(l / s);
    },

    paginateViewers: function() {
      const start = this.pageNumber * parseInt(this.size),
        end = start + parseInt(this.size);

      return this.ipAddresses.slice(start, end);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  min-height: 10rem;
  background: url("../../static/img/bay-beach.jpeg") no-repeat center center;
  background-size: cover;
}

.overlay-content img{
  border-radius:50%;
  display: block;
  margin: 0rem auto;
  width: 5rem;
  height: 5rem;;
}
.content {
  margin-bottom: 20rem;
}

li.ownIp {
  width: 60%;
  list-style: none;
  background-color: white;
  color: black;
  padding: 0.5rem;
  margin: 0.2rem;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 500ms, background 500ms;
  transition-delay: 0s;
  box-shadow: 0 0 2rem black;
  font-size: 200%;
}

footer h3{
  text-align: center;
}

.previous,
.next {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2rem black;
  z-index: 200;
  position: fixed;
  top: 30rem;
  vertical-align: middle;
  padding: 0.5rem 0;
  text-shadow: 0 0 3rem black;
  cursor: pointer;
  display: none;
}

.previous {
  left: 20px;
}

.next {
  right: 20px;
}

.display {
  display: block;
}
.own-info ul {
  margin: 0 auto;
  padding: 0;
}

.paginate {
  width: 30%;
  margin: 1rem auto;
}
.own-info {
  padding-top: 0.9rem;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  color: #000;
  margin: 0 !important;
  width: 100%;
}
.list li {
  list-style: none;
  background-color: white;
  color: black;
  padding: 0.5rem;
  margin: 0.2rem;
  text-align: left;
  width: 100%;
  float: right;
  cursor: pointer;
  transition: transform 500ms, background 500ms;
  transition-delay: 0s;
  box-shadow: 0 0 2rem black;
}
.list li:nth-child(odd) {
  clear: both;
}

.list li:nth-child(even) {
  clear: both;
}
.overlay-content {
  width: 100%;
  height: 100%;
}

footer {
  max-height: 2rem;
  background-color: white;
  z-index: 200;
  box-shadow: -0.5rem -0.5rem 0.5rem white;
  padding: 0.2rem;
}

.container-fluid {
  padding: 0 !important;
  margin: 0 !important;
}

.main-text {
  margin: 0 !important;
  padding-top: 0.9rem;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  color: red;
  width: 100%;
}

.main-text h1 {
  font-size: 2rem;
  text-shadow: 0 0 2rem black;
  color: red;
}

.online {
  padding-top: 0.9rem;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  color: #000;
  margin: 0 !important;
  width: 100%;
}

.online h1 {
  font-size: 1rem;
  color: #000;
}

@media only screen and (min-width: 750px) {
  header {
    min-height: 30rem;
    background: url("../../static/img/bay-beach.jpeg") no-repeat center center;
    background-size: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    position: fixed;
    right: 0;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

.overlay-content img{
   width: 10rem;
  height: 10rem;
  display: block;
  margin: 0rem auto;
}
  footer {
    max-height: 5rem;
    background-color: white;

    box-shadow: -1rem 1rem 1rem white;
    padding: 0.7rem;
  }

  .container-fluid {
    padding: 0 !important;
    margin: auto !important;
  }

  .main-text {
    margin: 0 !important;
    padding-top: 5rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: #fff;
  }

  .main-text h1 {
    font-size: 5rem;
    text-shadow: 0 0 2rem black;
  }

  .online {
    padding-top: 1rem;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    color: black;
    margin: 0 !important;
  }

  .online h1 {
    font-size: 3rem;
  }

  .list li {
    width: 40%;
  }

  .list li:hover {
    transform: translateX(-20px);
    background-color: aqua;
  }

  .list li:nth-child(odd) {
    float: left;
  }

  .list li:nth-child(odd):hover {
    transform: translateX(20px);
  }

  .list li:nth-child(even) {
    float: right;
    position: relative;

    top: -3rem;
  }

  .content {
    margin-bottom: 20rem;
  }
}
</style>
