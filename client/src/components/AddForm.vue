<template>
        <!-- add form  -->
        <div class="container has-text-centered"  v-if="currentPage === 'addFormPage'">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <form id="add-form" @submit.prevent="addTask">
                        <div class="field">
                            <h3 class="title has-text-black">Add New Task</h3><hr>
                            <label class="label">Title</label>
                            <div class="control has-icons-left has-icons-right">
                              <input class="input is-info" type="text" placeholder="type your task here" v-model="newTask.title" required>
                            </div>
                        </div>
                        <button class="button is-grey" @click="showDashboard">Cancel&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-times-circle"></i></button>
                        <button type="submit" class="button is-black">Submit&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-plus-circle"></i></button>
                    </form>
                </div> 
            </div>
        </div>
</template>

<script>
import axios from '../config'
export default {
    name: 'AddForm',
    props: ['currentPage', 'newTask'],
    methods: {
        addTask() {
            axios({
                method: 'POST',
                url: `/tasks`,
                data: {title: this.newTask.title},
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                this.$emit('fetchAll')
                this.$emit('changePage', 'dashboard')
            })
            .catch(response => 
                console.log(response))
        },
        showDashboard()   {
            this.$emit('showDashboard')
        }
    }
}
</script>