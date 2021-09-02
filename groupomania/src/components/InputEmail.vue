<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputEmail" class="align-self-start">Email :</label>
        <input type="email" v-model="input" class="form-control" name="email" id="inputEmail" aria-describedby="Aide email" placeholder="Exemple@exemple.com">
    </div>
</template>

<script>
export default {
  name: 'InputEmail',
};
</script>

<style>

</style>
