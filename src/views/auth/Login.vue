<template>
    
<v-row justify="center">
    <v-col md=4>
        <v-card elevation="2">
            <v-card-title>Please login your admin account</v-card-title> 
            <v-card-text >
                <v-form  
                ref="form"
                v-model="valid"
                lazy-validation>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
                required>
                </v-text-field>

                <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                outlined
                required
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                >
                </v-text-field>

                <v-btn
                    elevation="2"
                    color="primary"
                    @click="login"
                >
                Login
                
                </v-btn>

                </v-form>
<p class="pt-2"> Don't have an account yet?? <router-link :to="{ name: 'Register' }"> Register Now </router-link> </p>


            </v-card-text>

        </v-card>

    </v-col>

</v-row>

</template>

<script>
export default {
    data() {
        return {
            show: false,
            valid: false,
            name: '',
            email:'',
            password:'',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ],

            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be 8 characters or more'

            ]

        }
    },
    methods: {
        login() {
            const valid = this.$refs.form.validate()

            if (valid) {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
}
</script>

<style scoped lans="scss">
/* body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    color: #f4f2f2;
    background-image: linear-gradient(to right bottom, #01A6F8,  #0945BD);
    background-size: cover;
    background-repeat: no-repeat;

    min-height: 100vh;
} */

  body{
    background-color: #3366CC; /* Цвет фона веб-страницы */
   } 
</style>