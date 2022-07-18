<template>
  <div class="repos">
    <h1>Repos liked</h1>
    <div v-if="allLikedRepos">
      <ul v-for="repo in allLikedRepos" v-bind:key="repo.id">
        <li>
          <span>{{ repo.name }}</span>
          <span class="float-end me-5">Liked</span>
        </li>
      </ul>
    </div>
    <h6 v-else>No data!</h6>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLikedRepos: this.$store.state.allLikedProps,
    };
  },
};
</script>
