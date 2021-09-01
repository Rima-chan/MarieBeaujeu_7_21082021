<template>
  <div class="container">
    <div class="row">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-pills nav-header-pills">
            <li class="nav-item">
              <a href="#" class="nav-link active">Inscription</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link active">Connexion</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <h3 class="card-title">Inscrivez-vous !</h3>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
