<template>
<div>
        <h1> Administrator, {{ userProfile.name }} </h1>
        <div class="my-2">
     <v-btn mt="2" :to= "{ name: 'Admin'}" color="#0482E6" @click="deleteUser" blue darken-1>OSPREY ADMIN PANEL №1</v-btn>
     </div>
    <br>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>   <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
            <th class="text-left">
            Phone
          </th>
            <th class="text-left">
            Description
          </th>
             </th>
                   <th class="text-left">
            Action
          </th>
            <th class="text-left">
            Complite
          </th>
             
             

     
    
    <v-dialog
    v-model="deleteDialog"
    max-width="400">

            <v-card>
                <v-card-title class="headline">
                    Delete Order?
                </v-card-title>

                <v-card-text> Are you sure you want to delete <b>{{ pUser }} </b> ? </v-card-text>

                    <v-card-actions>
                           <v-btn color="red" @click="deleteUser" text>Delete</v-btn>
                            <v-btn color="secondery" @click="deleteDialog = false" text>Close</v-btn>
                                
                    </v-card-actions>
                       
            </v-card>
        </v-dialog>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users" :key="user.id"
        >
        <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
           <td>{{ user.phone }}</td>
             <td>{{ user.description }}</td>
                  <td> 
                    <v-card-actions>   
                        <v-btn  @click="doSomeThing" >in work</v-btn>
                    </v-card-actions>
                  </td>
             
                    <td> 
                    <v-card-actions>
                        <v-btn  blue darken-1  @click="deleteConfirm(user.id, user.name)" >Delete</v-btn>
                    </v-card-actions>
                    </td> 
        </tr>
      </tbody>
           
    </template>
  </v-simple-table>
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
    width: 50px ;

}
</style>