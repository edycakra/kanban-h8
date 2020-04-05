<template> 
        <!-- login  -->
        <div class="container has-text-centered" v-if="currentPage === 'login'">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <h3 class="title has-text-black">Login</h3><hr>
                    <form id="login-form" @submit.prevent="loginUser">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left has-icons-right">
                              <input class="input is-danger" type="email" placeholder="type your email here" id="emailLogin" v-model="login.email" required>
                              <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left">
                              <input class="input is-link" type="password" placeholder="type your password here" id="passwordLogin" v-model="login.password" required>
                              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                            </div>
                        </div>
                        <button type="submit" class="button is-block is-primary is-fullwidth has-text-black">Login</button>
                    </form>
                </div>
                <p class="has-text-grey">
                    Not registered yet? Create a new account <a href="#" @click.prevent="showRegister">here</a>
                </p>
                or
                <p><g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError" >
                Sign in with Google
                </g-signin-button></p>
            </div>
        </div>
</template>

<script>
import axios from '../config'
export default {
    name: 'LoginForm',
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
            googleSignInParams: {
              client_id: '723559606797-1tj1i63gto78likd6lrmc5r6mogrkve9.apps.googleusercontent.com'
            }                       
        }
    },
    props: ['currentPage'],
    methods: {
        loginUser() {
            axios({
                method: 'POST',
                url: `/login`,
                data: {
                    email: this.login.email,
                    password: this.login.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.$emit('fetchAll')
                // this.currentPage = 'dashboard'
                this.$emit('changePage','dashboard')
            })
            .catch(response => {
                console.log(response)
            })
        },
        showRegister() {
            this.$emit('showRegister')
        },
        onSignInSuccess (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'POST',
                url: `/googleSignIn`,
                headers: {access_token: id_token}
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.$emit('fetchAll')
                // this.currentPage = 'dashboard'
                this.$emit('changePage','dashboard')
            })
            .catch(response => {
                console.log(response)
            })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>