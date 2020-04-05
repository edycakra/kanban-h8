<template>
        <!-- register  -->
        <div class="container has-text-centered"  v-if="currentPage === 'register'">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <h3 class="title has-text-black">Register</h3>
                    <!-- <p class="help is-danger">{{ errorMessage }}</p><hr> -->
                    <form id="register-form" @submit.prevent="createUser">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input is-success" type="text" placeholder="type your username here" id="usernameRegister" v-model="register.username" required>
                                <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left has-icons-right">
                              <input class="input is-danger" type="email" placeholder="type your email here" id="emailRegister" v-model="register.email" required>
                              <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left">
                              <input class="input is-link" type="password" placeholder="type your password here" id="passwordRegister" v-model="register.password" required>
                              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                            </div>
                        </div>
                        <button type="submit" class="button is-block is-primary is-fullwidth has-text-black">Register</button>
                    </form>
                </div>
                Already have an account? Login <a href="#" @click.prevent="showLogin">here</a>
            </div>
        </div>
</template>

<script>
import axios from '../config'
export default {
    name: 'RegisterForm',
    data() {
        return {
            register: {
                username: '',
                email: '',
                password: ''
            },
        }
    },
    props: ['currentPage'],
    methods: {
        createUser() {
            axios({
                method: 'POST',
                url: `/register`,
                data: {
                    username: this.register.username,
                    email: this.register.email,
                    password: this.register.password
                }
            })
            .then(user => {
                this.$emit('changePage','login')
            })
            .catch(response => {
                console.log(response)
            })
        },
        showLogin() {
            this.$emit('changePage', 'login')
        }
    }
}
</script>