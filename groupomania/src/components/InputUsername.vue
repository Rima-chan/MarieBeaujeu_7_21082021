<template>
    <div class="form-group d-flex flex-column my-3">
        <label for="inputUsername" class="align-self-start">Pseudo :</label>
        <input type="text" class="form-control" v-model="username" name="username" id="inputEmail" aria-describedby="Aide pseudo" placeholder="Marie B">
    </div>
</template>

<script>
export default {
  name: 'InputUsername',
};
</script>

<style lang="">

</style>
