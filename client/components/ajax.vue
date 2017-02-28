<template>
    <div>
        <p>
        	<input type="button" value="click" @click="getName">
        </p>
        <div>
        	<ul>
        		<li v-for="item in select">
        			<span v-text="item.name"></span>
        			<span v-text="item.age"></span>
        		</li>
        	</ul>
        </div>
        <div>
        	<input v-model="insert.name" placeholder="name">
        	<input v-model="insert.age" placeholder="age">
        </div>
        <p>
        	<input type="button" value="submitForm" @click="submitForm">
        </p>
    </div>
</template>
<script>
import api from '../api.js'
export default {
    name: 'ajax',
    data() {
        return {
            select : [],
            insert : {
            	name: '',
            	age: ''
            }
        };
    },
    methods: {
        getName() {
        	var that = this;
            this.$http.get(api.dataget, {
                params: {
                    id: 12
                }
            }).then(response => {
                console.log(response.body);
                that.select = response.body;
                    // success callback
            }, error => {
                console.log(error)
            });
        },
        submitForm() {
            var name = this.insert.name,
                age = this.insert.age;
            this.$http.post(api.datapost, {
                name: name,
                age : age
            }).then(response => {
                // get status
                //response.status;
                // get status text
                //response.statusText;
                // get 'Expires' header
                //response.headers.get('Expires');

                console.log(response.body);

            }, response => {
                // error callback
            });
        }
    }
}
</script>
<style>
</style>
