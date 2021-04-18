<template>
<div>
    <section>
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h1>Admin</h1>
                <button class="ui pink submit button" @click="signout">Signout</button>
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td data-label="Name">{{user.email}}</td>
                            <select @change="changeRole(user.id, $event)">
                                <option :selected="user.role.supermarketAdmin" value="SupermarketAdmin">Supermarket Admin</option>
                                <option :selected="user.role.customer" value="customer">Customer</option>
                            </select>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
            users: [],
            user: null
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
        this.users = [];
        firebase
            .firestore()
            .collection("roles")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    console.log(doc.data());
                    if (!user.role.admin) this.users.push(user);
                });
            });
    },

    methods: {
        signout() {
            firebase
                .auth()
                .signOut()
                .then(
                    this.$router.push("/")
                );
        },

        changeRole(uid, event) {
            var addMessage = firebase.functions().httpsCallable("setUserRole");
            var data = { uid: uid, role: { [event.target.value]: true } };
            addMessage(data)
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>