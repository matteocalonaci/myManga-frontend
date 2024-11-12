<script>
//HOMEPAGE

import axios from 'axios';
import MangaList from '../components/MangaList.vue';

export default {
  name: "AppHome",
  components: {
    MangaList,
  },
  data() {
    return {
      mangas: [],
    };
  },
  created() {
  },
  methods: {

  }
}
</script>

<template>
  <div>

    <MangaList />

  </div>
</template>


<style scoped>
/* Add your styles here */
</style>