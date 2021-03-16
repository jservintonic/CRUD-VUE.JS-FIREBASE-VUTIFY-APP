<template>
    
        <div class="user-form">

        
            <v-btn @click="dialog = !dialog" color="primary" absolute

  :style="{left: '50%', top:'50%',  transform:'translateX(-50%)'}" v-if="!user" > Add a task or your contact </v-btn>
              <v-btn @click="dialog = !dialog" color="primary" v-else> Add a new task or your contact </v-btn>


         <v-dialog v-model="dialog" persistent width="600px">
             <v-card>
                 <v-card-title v-if="!user"> Add a task or your contact </v-card-title>
                 <v-card-title v-else> Add a new task or your contact </v-card-title>
                 <v-card-text>
                 <v-form
                 v-model="valid"
                 lazy-validation
                 ref="form"
                 >

                 <v-text-field
                    v-model="name"
                    :rules="fieldRules"
                    label="Name"
                    required
                    outlined
                ></v-text-field>

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    outlined
                ></v-text-field>

                   <v-text-field
                    v-model="phone"
                    :rules="fieldRules"
                    label="Phone"
                    required
                    outlined
                ></v-text-field>

                
                   <v-textarea
                    v-model="description"
                    :rules="phoneRules"
                    label="Description"
                    required
                    outlined
                ></v-textarea>

                <v-file-input
                    accept="image/*"
                    label="File input"
                    v-model="file"
                    show-size
                ></v-file-input>

                <p>RAR, ZIP, IMAGE AND ANY ATHERS FORMATS <a v-if="oldImage" :href="oldImage">link</a> </p>

                <v-btn
                    elevation="2"
                    color="primary"
                    @click="storeOrder"
                    :loading="isLoading"
                    v-if="!user"
                >

                Send
                        </v-btn>
                               <v-btn
                    elevation="2"
                    color="primary"
                    @click="updateuser"
                    :loading="isLoading"
                    v-else
                >

                Update
                        </v-btn>
                    </v-form>
                 </v-card-text>
                    <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                            >
                            Close
                        </v-btn>
                </v-card-actions>
             </v-card>
         </v-dialog>
       </div>
</template>


<script>

import { adminPanel, auth, storage } from '../firebase';
export default {
    components: {
    },
    name: 'UserDetails',
    props: ['user, index'],
    data() {
        return {
            isLoading: false,
            valid: false,
            dialog: false,
            name: '',
            email: '',
            phone: '',
            description: '',
            user:'',
            file: null,
            fieldRules: [
                v=> !!v || 'this field is required'
            ],
             phoneRules: [
                v => !!v || 'Phone is required',
                v => /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(v) || 'Phone must be valid'
            ],
            
            emailRules: [
                v => /.+@.+/.test(v) || 'Email must be valid'
                ],
            
            oldImage: '',
        
        }
    },

    methods: {
    

        resetForm() {
            this.$refs.form.reset()
        },

        async storeOrder() {
            try {
                this.isLoading = true
             

                //upload

                const fileRef = 'uploads/file' + this.file.name
                const snapshot = await storage.ref(fileRef).put(this.file)

                let data = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    description: this.description,
                    image: fileRef
                }

                const doc = await adminPanel.add(data)

                await this.resetForm()
                this.isLoading = false
                this.dialog = false
                this.$router.push({ name: 'Register' })


                } catch(e) {
                    console.log(e)
            }   

        }
    },
    mounted() {
        if(this.user) {
            this.name = this.user.name
            this.email = this.user.email
            this.phone = this.user.phone
            this.description = this.user.description
        }
      
    }
}
</script>


