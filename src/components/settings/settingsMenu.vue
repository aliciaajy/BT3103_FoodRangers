<template>
    <div>
      <Bar></Bar>
      <router-link class="ui button mini primary" to="/">Back Home</router-link>
        <div class="ui fluid vertical pointing menu">
            <div class="item">
                <router-link to="/profile">Profile</router-link>
            </div>
            <div class="item">
                <router-link to="/settings/password">Password</router-link>
            </div>
        </div>

       
    </div>
</template>

<script>


    export default {
        data() {
            return {
 
            }
        },

}
</script>

<style scoped>
   
</style>