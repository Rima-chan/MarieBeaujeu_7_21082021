<template>
  <div class="container">
    <div class="row d-flex justify-content-center mb-5 mt-3 mx-1">
      <div class="card col col-md-4 p-0">
        <div class="card-body">
          <ul class="nav nav-tabs no-wrap justify-content-center">
            <li class="nav-item">
              <router-link to="/connexion" class="nav-link text-dark px-4">Connexion</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/inscription" class="nav-link text-dark px-4">Inscription</router-link>
            </li>
          </ul>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginCard',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link-active {
  background-color: rgba(224, 224, 234, 0.8);
}
</style>
