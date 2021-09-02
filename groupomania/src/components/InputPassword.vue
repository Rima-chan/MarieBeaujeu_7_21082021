<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputPassword" class="align-self-start">Mot de passe :</label>
        <input type="password" v-model="input" class="form-control" name="password" id="inputPassword" aria-describedby="Mot de passe">
    </div>
</template>

<script>
export default {
  name: 'InputPassword',
};
</script>

<style>

</style>
