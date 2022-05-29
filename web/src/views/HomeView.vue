<template>
  <div class="sub-overview-container">
    <div class="sub-overview-child" v-for="post in posts" v-bind:key="post.id">
          <h3>
            <star-outline @click="favSubreddit(post.subreddit, 1)" v-if="!post.favorite"></star-outline>
            <star v-if="post.favorite" @click="favSubreddit(post.subreddit, 0)"></star>
            <a :href="'posts/' + post.subreddit">{{ post.subreddit }}</a>
          </h3>
          <div class="sub-overview-preview">
              <img  v-for="(preview, index) in previews[post.subreddit]" v-bind:key="preview.id"
                    v-lazy="{src: '/data_temp/' + post.subreddit + '/' + preview.file }" 
                    class="preview-image"
                    :style="'z-index: ' + index + '; margin-top: ' + preview.margin + 'px'"
                    :alt="index" />

          </div>
    </div>
  </div>
</template>

<style>
.sub-overview-preview{
  position: relative;
  height: 320px;
}

.preview-image{
  transition: 0.1s;
  margin-left: 60px;
  position: absolute;
  top: 0;
  left: 0;
  border: 4px solid white;
  box-shadow: 0 0 4px black;
  border-radius: 6px;

  width: 180px;
}

.sub-overview-preview img:nth-child(2) {
  transform: rotate(-4deg);
}

.sub-overview-preview img:nth-child(1) {
  transform: rotate(4deg);
}

.sub-overview-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.sub-overview-child{
  width: 300px;
}
</style>

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
      preview_fetched: false
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://localhost:2701/sub/getSubreddits"
        );

        this.posts = response.data;
        console.log(this.posts);

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
          "http://localhost:2701/sub/favSubreddit", {
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
        "http://localhost:2701/image/getSampleImages", {
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
            console.log(subreddit, entry.title, cur_height, max_height)
          }else{
            response.data[index]["margin"] = 0
            console.log(subreddit, entry.title)
          }
        });

        this.previews[subreddit] = response.data;
    }

  },

  created() {
    this.getData();
  },
};
</script>