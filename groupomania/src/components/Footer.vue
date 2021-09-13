<template>
    <footer class="w-100 bg-dark text-white">
        <div class="container d-flex flex-column">
            <div class="row d-flex justify-content-center">
                <div class="col-2 mt-3">
                    <img src="../assets/logo-white.png" alt="Groupomania logo bas de page" class="img-fluid py-2 logo">
                </div>
            </div>
            <div class="row">
                <ul class="list-unstyled list-inline text-center mb-3 mt-3">
                    <li class="list-inline-item">
                        <a href="/" class="text-decoration-none text-white">Plus d'infos</a>
                    </li>
                    <li class="list-inline-item">|</li>
                    <li class="list-inline-item">
                        <a href="mailto:groupomania@groupomania.fr" class="text-decoration-none text-white">Signaler un problème</a>
                    </li>
                </ul>
            </div>
            <div class="row">

            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>

.logo {
    max-height: 100px;
}

</style>
