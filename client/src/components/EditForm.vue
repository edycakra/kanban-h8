<template>
        <!-- edit form -->
        <div class="container has-text-left" v-if="currentPage === 'editFormPage'">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <form id="edit-form" @submit.prevent="editTask(editTaskObj.id)">
                        <div class="field">
                            <h3 class="title has-text-black">Edit Task</h3><hr>
                            <label class="label">Title</label>
                            <div class="control">
                              <input class="input is-info" type="text" placeholder="type your task here" v-model="editTaskObj.title" required>
                            </div>
                            <label class="label">Category</label>
                            <div class="control">
                                <div class="select">
                                  <select v-model="editTaskObj.category">
                                    <option selected disabled>Select</option>
                                    <option value="BACKLOG" class="has-text-black">BACKLOG</option>
                                    <option value="TODO" class="has-text-warning">TODO</option>
                                    <option value="ONGOING" class="has-text-link">ONGOING</option>
                                    <option value="DONE" class="has-text-success">DONE</option>
                                  </select>
                                </div>
                              </div>
                        </div>
                        <button class="button is-grey" @click="showDashboard">Cancel&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-times-circle"></i></button>
                        <button type="submit" class="button is-black">Edit&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-check-circle"></i></button>
                    </form>
                </div> 
            </div>
        </div>
</template>

<script>
export default {
    name:'EditForm',
    props: ['currentPage', 'editTaskObj'],
    methods: {
        editTask(id) {
            this.$emit('editTask', id)
        },
        showDashboard() {
            this.$emit('showDashboard')
        }
    }
}
</script>