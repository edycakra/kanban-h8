<template>
        <!-- navbar -->
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="#">KANBAN</a>
            </div>
            <div id="kanbanNavbar" class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button is-primary has-text-black" @click="showRegister" v-if="currentPage === 'frontPage'"><strong>Register</strong></a>
                        <a class="button is-link has-text-black" @click="showLogin" v-if="currentPage === 'frontPage'"><strong>Login</strong></a>
                        <a class="button is-danger has-text-black" @click="logout" v-if="currentPage === 'dashboard'"><strong>Logout</strong></a>
                        </div>
                    </div>
                </div>
            </div>
        </nav> 
</template>

<script>
export default {
    name: 'MainNavbar',
    props: ['currentPage'],
    methods: {
        showDashboard: function() {
            this.$emit('showDashboard')
        },
        showRegister: function() {
            this.$emit('showRegister')
        },
        showLogin: function() {
            this.$emit('showLogin')
        },
        logout: function() {
            this.$emit('logout')
        }
    }
}
</script>
