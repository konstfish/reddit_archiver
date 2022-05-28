<template>
    <div>
        Saved {{ imageCount }} images from {{ subredditCount }} subreddits.
    </div>
</template>

<script>

export default {

  data() {
    return {
      subredditCount: 0,
      imageCount: 0,
      isFetching: true
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://10.0.0.15:2701/sub/countSubreddits"
        );

        this.subredditCount = response.data;

        const response2 = await this.$http.get(
          "http://10.0.0.15:2701/image/countImages"
        );

        this.imageCount = response2.data;


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