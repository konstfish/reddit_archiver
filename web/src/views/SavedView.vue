<template>
    <div class="masonry-container" v-if="!isFetching">
      <MasonryWall :items="posts" :gap="24" :column-width="300">
        <template #default="{ item }">
          <div :style="'width: 320px;'">
            <div class="post-title">
              <span>
                <bookmark v-if="item.saved"></bookmark> 
                <a :href="item.permalink">{{ item.title }}</a>
              </span>
            </div>
            <a :href="'/data_temp/' + item.subreddit + '/' + item.file" >
              <img v-lazy="{src: '/data_temp/' + item.subreddit + '/' + item.file }" 
                  :class="item.nsfw ? 'nsfw' : 'default'" 
                  :style="'width: 300px;'" />
            </a>
          </div>
        </template>
      </MasonryWall>
    </div> 
</template>

<script>
import { Bookmark } from 'mdue';

export default {
  components: {
    Bookmark,
  },

  data() {
    return {
      posts: [],
      isFetching: true
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://127.0.0.1:2701/image/getSavedImages", {
          }
        );

        this.posts = response.data;
        console.log(this.posts);
        this.isFetching = false
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