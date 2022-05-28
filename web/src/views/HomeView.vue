<template>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>
        <star-outline @click="favSubreddit(post.subreddit, 1)" v-if="!post.favorite"></star-outline>
        <star v-if="post.favorite" @click="favSubreddit(post.subreddit, 0)"></star>
        <a :href="'posts/' + post.subreddit">{{ post.subreddit }}</a>
      </h2>
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
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://10.0.0.15:2701/sub/getSubreddits"
        );

        this.posts = response.data;
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },

    async favSubreddit(subreddit, fav){
      try{
        await this.$http.post(
          "http://10.0.0.15:2701/sub/favSubreddit", {
              subreddit: subreddit,
              fav: fav,
          }
        );

        this.getData();

      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>