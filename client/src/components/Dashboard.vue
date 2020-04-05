<template>
        <!-- dashboard kanban-->
        <div class="container has-text-centered" v-if="currentPage === 'dashboard'">
            <div class="box">
                <h1 class="title has-text-black">Kanban Dashboard</h1><hr>
                <div class="columns is-centered cards-container">
                    <div class="column">
                        <article class="message is-black">
                            <div class="message-header">
                              <p>Back Log</p>
                            </div>
                            <div class="message-body">
                                <div class="board-item" v-for='task in backlogTask' v-bind:key="task.id">
                                    <div class="board-item-content box"><span>{{ task.title }}</span><br>
                                        <a href="#" @click="renderEditTask(task.id)"><i class="fas fa-edit"></i></a>
                                        <a href="#" @click="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></a>
                                    </div><br>
                                </div>
                            </div>
                            <button class="button is-black" @click="showAddForm">Add&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-plus-circle"></i></button>
                        </article>
                    </div>
                    <div class="column">
                        <article class="message is-warning">
                            <div class="message-header">
                              <p>Todo</p>
                            </div>
                            <div class="message-body">
                                <div class="board-item" v-for='task in todoTask' v-bind:key="task.id">
                                    <div class="board-item-content box"><span>{{ task.title }}</span><br>
                                        <a href="#" @click="renderEditTask(task.id)"><i class="fas fa-edit"></i></a>
                                        <a href="#" @click="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></a>
                                    </div><br>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="message is-info">
                            <div class="message-header">
                              <p>Ongoing</p>
                            </div>
                            <div class="message-body">
                                <div class="board-item" v-for='task in ongoingTask' v-bind:key="task.id">
                                    <div class="board-item-content box"><span>{{ task.title }}</span><br>
                                        <a href="#" @click="renderEditTask(task.id)"><i class="fas fa-edit"></i></a>
                                        <a href="#" @click="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></a>
                                    </div><br>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="column">
                        <article class="message is-success">
                            <div class="message-header">
                              <p>Done</p>
                            </div>
                            <div class="message-body">
                                <div class="board-item" v-for='task in doneTask' v-bind:key="task.id">
                                    <div class="board-item-content box"><span>{{ task.title }}</span><br>
                                        <a href="#" @click="renderEditTask(task.id)"><i class="fas fa-edit"></i></a>
                                        <a href="#" @click="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></a>
                                    </div><br>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>   
</template>

<script>
export default {
    name: 'Dashboard',
    props: ['currentPage', 'tasks'],
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
        showAddForm: function() {
            this.$emit('showAddForm')
        },
        renderEditTask: function(id) {
            this.$emit('renderEditTask', id)
        },
        deleteTask: function(id) {
            this.$emit('deleteTask', id)
        }
    }
}
</script>

<style>

</style>