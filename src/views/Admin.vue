<template>
    <div class="admin">
                <v-btn :to= "{ name: 'AdminPanel'}" color="#0482E6" >OSPREY ADMIN PANEL №2</v-btn>
                    <v-btn :to= "{ name: 'Contacts'}"  class="mx-5" color="cyan" >main page</v-btn>
         
        <h1 color="#999"> Administrator, {{ userProfile.name }} </h1>
    <br>
        <v-row>
            <v-col md="2" v-for="(user, index) in users" :key="user.id">
                <v-card>
                    
                    <v-img 
                        v-if="user.image"
                        height="250"
                        :src="user.image"
                        lazy-src="https://via.placeholder.com/150/FF0000/FFFFFF?Text=Down.com"
                    >
                    </v-img>
                    <v-card-title> {{ user.name }} </v-card-title>
                    <v-card-text>
                        <p class="subtitle-1">Email: {{ user.email }}</p>
                        <p class="subtitle-1">Phone: {{ user.phone }}</p>
                        <p>{{ user.description }}</p>
                    </v-card-text>
                    <v-card-actions>
       
                        <v-btn color="red" @click="deleteConfirm(user.id, user.name)" text>Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    
    <v-dialog
    v-model="deleteDialog"
    max-width="400">

            <v-card>
                <v-card-title class="headline">
                    Delete Game?
                </v-card-title>

                <v-card-text> Are you sure you want to delete <b>{{ pUser }} </b> ? </v-card-text>

                    <v-card-actions>
                           <v-btn color="red" @click="deleteUser" text>Delete</v-btn>
                            <v-btn color="secondery" @click="deleteDialog = false" text>Close</v-btn>
                                
                    </v-card-actions>
                       
            </v-card>
        </v-dialog>
    </div>
</template>




<script>
import { mapState } from 'vuex'
import Contacts from '../views/Contacts.vue'
import { auth, storage, adminPanel } from '../firebase'
export default {
    components: {
        Contacts
    },
    data() {
        return {
             users: [],
             pId: null,
             pUser: null,
             deleteDialog: false,


        }

        
    },
    computed: {
        ...mapState(['userProfile'])
    },

    methods: {


        async getUsers() {
            try {

                const querySnapshot = await adminPanel.get()
                querySnapshot.forEach( async (doc) => {
                    let img = ''
                    if(doc.data().image) {
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    this.users.push({
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        description: doc.data().description,
                        image: img,
                        img: doc.data().image
                    })
                } )
            } catch(e) {
                console.log(e)
            }
        },
     
            


        async deleteConfirm(id, user) {
            this.deleteDialog = true
            this.pId = id
            this.pUser = user
        },

        async deleteUser() {
            try {
                await adminPanel.doc(this.pId).delete()
               

                //remove user from array
                this.users.splice(this.users.findIndex(x => x.id == this.pId), 1)
                this.deleteDialog = false
            
                //reset
                this.pId = null
                this.pUser = null


            } catch(e) {
                clonsole.log(e)
            }
        }
    },

    async mounted() {
        await this.getUsers()
    }
}
</script>

<style scoped>
.image { 
    height: 20px;
    width: 20px;
}
</style>