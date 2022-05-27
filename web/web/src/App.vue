<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/saved">Saved</router-link> |
    <router-link :to="{ name: 'posts', params: { sub: 'me_irl' } }" >Posts</router-link>
  </nav>

  <router-view/>

  <div>
    Made with <heart-outline style="color: red"></heart-outline> <a href="https://github.com/konstfish">@konstfish</a>
  </div>
</template>

<script>
import { HeartOutline } from 'mdue';

export default {
  components: {
    HeartOutline,
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983;
}

.masonry-container{
  position:relative;
  width:100%;
}

.post-title svg{
  font-size: 16px;
}

svg{
  vertical-align: middle;
}
</style>