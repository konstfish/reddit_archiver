<template>
  <h2>Reddit Archiver</h2>

  <div class="sub-overview-container">
    <div class="sub-overview-child" v-for="post in posts" v-bind:key="post.id">
          <h3>
            <star-outline @click="favSubreddit(post.subreddit, 1)" v-if="!post.favorite"></star-outline>
            <star v-if="post.favorite" @click="favSubreddit(post.subreddit, 0)"></star>
            <a :href="'posts/' + post.subreddit">{{ post.subreddit }}</a>
          </h3>
          <div class="sub-overview-preview" 
              :class="{ shake: current_animation == post.subreddit }" 
              @mouseover="current_animation = post.subreddit" 
              @mouseleave="current_animation = 0"
              :style="'height: ' + previews_heights[post.subreddit] + 'px'">
              <img  v-for="(preview, index) in previews[post.subreddit]" v-bind:key="preview.id"
                    v-lazy="{src: '/data_temp/' + post.subreddit + '/' + preview.file }" 
                    class="preview-image" 
                    :style="'margin-top: ' + preview.margin + 'px'"
                    :alt="index" />
          </div>
    </div>
  </div>
</template>

<script>
import { Star, StarOutline } from 'mdue';

export default {
  components: {
    Star,
    StarOutline,
  },

  data() {
    return {
      posts: [],
      previews: {},
      previews_heights: {},
      preview_fetched: false,
      current_animation: 0
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "/sub/getSubreddits"
        );

        this.posts = response.data;

        if(!this.preview_fetched){
          response.data.forEach(post => {
            this.getSubredditPreview(post.subreddit);
          });
        }
        this.previews_fetched = true;

      } catch (error) {
        console.log(error);
      }
    },

    async favSubreddit(subreddit, fav){
      try{
        await this.$http.post(
          "/sub/favSubreddit", {
              subreddit: subreddit,
              fav: fav,
          }
        );

        this.getData();

      } catch (error) {
        console.log(error);
      }
    },

    async getSubredditPreview(subreddit){
      const response = await this.$http.post(
        "/image/getSampleImages", {
            subreddit: subreddit,
        });

        //const max = Math.max(response.data[0].height, response.data[1].height, response.data[2].height)
        var max_height = 0;
        response.data.forEach(entry => {
          if(max_height < (180/entry.width) * entry.height){
            max_height = (180/entry.width) * entry.height;
            //console.log(subreddit, entry.title, max_height)
          }
        });

        response.data.forEach((entry, index) => {
          if(max_height != entry.height){
            var cur_height = (180/entry.width) * entry.height
            response.data[index]["margin"] = (max_height - cur_height) / 2
          }else{
            response.data[index]["margin"] = 0
          }
        });

        this.previews[subreddit] = response.data;
        this.previews_heights[subreddit] = max_height;
    },

    test(){
      console.log("e")
    },

  },

  created() {
    this.getData();
  },
};
</script>


<style>
/* todo cleanup */
@keyframes moveleft {
  0% { left: 0; }
  25% { left: 220px; }
  80% { left: 220px;}
  100% { left: 0; }
}

@keyframes rotate1 {
  0%{ transform: rotate(4deg); }
  25% { transform: rotate(-2deg); }
  80%{ transform: rotate(-2deg); }
  100%{  transform: rotate(4deg);  }
}

@keyframes rotate2 {
  0%{ transform: rotate(0deg); }
  25% { transform: rotate(-6deg); }
  80%{ transform: rotate(-6deg); }
  100%{  transform: rotate(0deg);  }
}

@keyframes rotate3 {
  0%{ transform: rotate(-4deg); }
  25% { transform: rotate(2deg); }
  80%{ transform: rotate(2deg); }
  100%{  transform: rotate(-4deg);}
}

@keyframes behind1 {
  0%{ z-index: 2; }
  45% { z-index: -1; }
  90% { z-index: -1; }
  99% { z-index: 2; }
}

@keyframes behind2 {
  0%{ z-index: 1; }
  55% { z-index: -2; }
  90% { z-index: -2; }
  100% { z-index: 1; }
}

.shake img:nth-child(1) {
  animation:  moveleft 1s ease-out 0s,
              rotate1 1s ease-out 0s,
              behind1 3s ease-out 0s;
}

.shake img:nth-child(2) {
  animation:  moveleft 1s ease-out 1s,
              rotate2 1s ease-out 1s, 
              behind2 2s linear 1s;
}

.shake img:nth-child(3) {
  animation:  moveleft 1s ease-out 2s,
              rotate3 1s linear 2s;
}

.sub-overview-preview img:nth-child(3) {
  transform: rotate(-4deg);
  z-index: 0;
}

.sub-overview-preview img:nth-child(2) {
  transform: rotate(0deg);
  z-index: 1;
}

.sub-overview-preview img:nth-child(1) {
  transform: rotate(4deg);
  z-index: 2;
}

.sub-overview-preview{
  position: relative;
  height: 320px;
}

.preview-image{
  transition: 0.1s;
  margin-left: 110px;
  position: absolute;
  top: 0;
  left: 0;
  border: 4px solid white;
  box-shadow: 0 0 4px black;
  border-radius: 6px;
  width: 180px;
}

.sub-overview-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.sub-overview-child{
  width: 400px;
}
</style>