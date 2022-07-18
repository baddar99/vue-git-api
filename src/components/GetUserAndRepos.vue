<template>
  <div class="card text-center m-3"></div>

  <div class="row">
    <div class="col-3">
      <h5>Enter Git user</h5>
      <input
        @input="debounceInput"
        v-model="searchTerm"
        placeholder="Type name here..."
      />
      <table
        v-if="allUsers.length"
        class="table is-bordered is-striped is-hoverable is-fullwidth"
      >
        <tbody>
          <tr v-for="user in allUsers" v-bind:key="user.id">
            <td @click="selectUser(user)" role="button">{{ user.login }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-6">
      <h5>User Detail</h5>
      <div class="flex-container" v-if="currentUser">
        <div class="flex-item-left">
          <img
            v-bind:src="currentUser.avatar_url"
            v-bind:alt="currentUser.login"
            style="width: 250px"
          />
        </div>
        <div class="flex-item-right">
          <p>
            Full Name: <strong>{{ currentUser.name }}</strong
            ><br />
            User Name: <strong>{{ currentUser.login }}</strong
            ><br />
            Bio:
            <strong>{{ currentUser.bio }}</strong
            ><br />
            Blog URL:
            <strong>{{ currentUser.blog }}</strong
            ><br />
            User Created Date:
            <strong>{{ new Date(currentUser.created_at) }}</strong
            ><br />
            Last Updated: <strong>{{ new Date(currentUser.updated_at) }}</strong
            ><br />
          </p>
        </div>
      </div>
      <h6 v-else>No data!</h6>
    </div>
    <div class="col-3">
      <h5>User's Repo</h5>
      <div v-if="currentUserRepos">
        <ul v-for="repo in currentUserRepos" v-bind:key="repo.id">
          <li>
            <span>{{ repo.name }}</span>
            <button @click="likeRepo(repo)" class="float-end me-5">
              {{ likedRepos.includes(repo.id) ? 'Liked' : 'Like' }}
            </button>
          </li>
        </ul>
      </div>
      <h6 v-else>No data!</h6>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  data() {
    return {
      allUsers: 0,
      currentUser: null,
      currentUserRepos: null,
      searchTerm: '',
      likedRepos: [],
    };
  },
  methods: {
    likeRepo(repo) {
      this.likedRepos = [...this.likedRepos, repo.id];
      this.$store.state.allLikedProps = [
        ...this.$store.state.allLikedProps,
        repo,
      ];
    },
    async selectUser(user) {
      const currentUser = await axios.get(user.url);

      const response = await axios.get(user.repos_url);

      this.searchTerm = '';
      this.currentUser = currentUser.data;
      this.currentUserRepos = response.data;
      this.allUsers = 0;
    },

    debounceInput: debounce(async function (e) {
      if (!e.target.value) {
        this.allUsers = 0;
        return;
      }
      const response = await axios.get(
        `https://api.github.com/search/users?per_page=10&q=${e.target.value}`
      );
      this.allUsers = response.data.items;
    }, 250),
  },
};
</script>
