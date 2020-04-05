var app = new Vue({
    el: "#app",
    data: {
     currentPage: 'frontPage',
     register: {
         username: '',
         email: '',
         password: ''
     },
     login: {
         email: '',
         password: ''
     },
     errorMessage: '',
     tasks: [],
     newTask: { 
         title: ''
     },
     editTaskObj: {}
    },
    computed: {
        //task section
        backlogTask() {
            let result = []
            this.tasks.forEach(task => {
                if(task.category === 'BACKLOG') {
                    result.push(task)
                }
            })
            return result
        },

        todoTask() {
            let result = []
            this.tasks.forEach(task => {
                if(task.category === 'TODO') {
                    result.push(task)
                }
            })
            return result
        },

        ongoingTask() {
            let result = []
            this.tasks.forEach(task => {
                if(task.category === 'ONGOING') {
                    result.push(task)
                }
            })
            return result
        },

        doneTask() {
            let result = []
            this.tasks.forEach(task => {
                if(task.category === 'DONE') {
                    result.push(task)
                }
            })
            return result
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
        createUser() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/register`,
                data: {
                    username: this.register.username,
                    email: this.register.email,
                    password: this.register.password
                }
            })
            .then(user => {
                this.currentPage = 'login'
            })
            .catch(response => {
                console.log(response)
            })
        },
        loginUser() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/login`,
                data: {
                    email: this.login.email,
                    password: this.login.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('access_token', data.access_token)
                this.fetchAll()
                this.currentPage = 'dashboard'
            })
            .catch(response => {
                console.log(response)
            })
        },
        checkToken() {
            if(localStorage.getItem(`access_token`)) {
                this.currentPage = 'dashboard'
                this.fetchAll()
            } else {
                this.currentPage = 'frontPage'
            }
        },
        logout() {
            localStorage.removeItem(`access_token`)
            this.currentPage = 'frontPage'
        },
        //task section
        fetchAll() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.tasks = response.data.data
                console.log(response.data.data)
            })
            .catch(response => 
                console.log(response))
        },
        addTask() {
            axios({
                method: 'POST',
                url: `http://localhost:3000/tasks`,
                data: {title: this.newTask.title},
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.fetchAll()
                this.currentPage = 'dashboard'
            })
            .catch(response => 
                console.log(response))
        },
        renderEditTask(id) {
            this.currentPage = 'editFormPage'
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks/${id}`,
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
                url: `http://localhost:3000/tasks/${id}`,
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
                url: `http://localhost:3000/tasks/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.currentPage = 'dashboard'
                this.fetchAll()
            })
            .catch(response => {
                console.log(response)
            })
        }

    },
    created() {
        this.checkToken()
    }
})