<template>
  <div class="homepage">
        <img src="https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
        <MainNavbar :currentPage='currentPage' @showDashboard='showDashboard' @showRegister='showRegister' @showLogin='showLogin' @logout='logout'></MainNavbar>
        <RegisterForm :currentPage='currentPage' @changePage='changePage'></RegisterForm>
        <LoginForm :currentPage='currentPage' @changePage="changePage" @fetchAll="fetchAll" @showRegister="showRegister"></LoginForm>
        <Dashboard :currentPage='currentPage' :tasks='tasks' @showAddForm='showAddForm' @renderEditTask='renderEditTask' @deleteTask='deleteTask'></Dashboard>
        <AddForm :newTask='newTask' :currentPage='currentPage' @fetchAll='fetchAll' @changePage='changePage' @showDashboard='showDashboard'></AddForm>
        <EditForm :currentPage='currentPage' :editTaskObj='editTaskObj' @editTask='editTask' @showDashboard='showDashboard'></EditForm>
  </div>
</template>

<script>
import MainNavbar from './components/MainNavbar'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'
import axios from './config'

export default {
  name: 'App',
  components: {
      MainNavbar,
      RegisterForm,
      LoginForm,
      Dashboard,
      AddForm,
      EditForm
  },
  data() {
    return {
     currentPage: 'frontPage',
     errorMessage: '',
     tasks: [],
     newTask: { 
         title: ''
     },
     editTaskObj: {}      
    }
  },

    methods: {
        showRegister: function() {
            this.currentPage = 'register'
        },
        showLogin: function() {
            this.currentPage = 'login'
        },
        showAddForm: function() {
            this.currentPage = 'addFormPage'
        },
        showEditForm: function() {
            this.currentPage = 'editFormPage'
        },
        showDashboard: function() {
            this.currentPage = 'dashboard'
        },
        //user section
        checkToken() {
            if(localStorage.getItem(`access_token`)) {
                console.log('masuk checkToken')
                this.currentPage = 'dashboard'
                this.fetchAll()
            } else {
                this.currentPage = 'frontPage'
            }
        },
        logout() {
            const auth2 = gapi.auth2.getAuthInstance();
            if (auth2) {
                auth2.signOut().then(function () {
                console.log('user signed out');
                localStorage.removeItem(`access_token`)
            });   
            }
            localStorage.removeItem(`access_token`)       
            this.currentPage = 'frontPage'
        },
        //task section
        fetchAll() {
            axios({
                method: 'GET',
                url: `/tasks`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.tasks = response.data.data
                console.log(response.data.data)
            })
            .catch(response => 
                console.log(response))
        },
        renderEditTask(id) {
            this.currentPage = 'editFormPage'
            axios({
                method: 'GET',
                url: `/tasks/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                console.log(response.data.data)
                this.editTaskObj = response.data.data
            })
            .catch(response => {
                this.response
            })
        },
        editTask(id) {
            axios({
                method: 'PUT',
                url: `/tasks/${id}`,
                data: {
                    title: this.editTaskObj.title,
                    category: this.editTaskObj.category
                },
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.currentPage = 'dashboard'
                this.fetchAll()
            })
            .catch(response => {
                console.log(response)
            })
        },
        deleteTask(id) {
            axios({
                method: 'DELETE',
                url: `/tasks/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.currentPage = 'dashboard'
                this.fetchAll()
            })
            .catch(response => {
                console.log(response)
            })
        },
        changePage(currentPage) {
            this.currentPage = currentPage
        }

    },
    created() {
        this.checkToken()
        
    }
}
</script>

<style lang="scss" scoped>
    .homepage {
        position: relative;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: -9999;
        }
    }
</style>