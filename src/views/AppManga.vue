<script>
//HOMEPAGE

import axios from 'axios';
import MangaList from '../components/MangaList.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: "AppManga",
  components: {
    MangaList,
    AppFooter
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
    <AppFooter />


  </div>
</template>


<style scoped>
/* Add your styles here */
</style>