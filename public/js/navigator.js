const nav = Vue.component('navigator', {
    props: ['userdata', 'loginFn', 'logoutFn'],
    data() {
        return {}
    },
    template: `
        <div id="navigator">
            <template v-if="userdata == ''">
                <button @click="loginFn()">Login with Google </button>
            </template>
            
            <template v-else>
                <img v-bind:src="userdata.photoURL" class="profile-photo" alt="profile picture" />
                <button @click="logoutFn()">Logout </button>
            </template>
        </div>
    `
})