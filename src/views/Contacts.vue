<template>
  <div>
   <UserDetails />
  </div>
</template>

<script>
// @ is an alias to /src

import UserDetails from '@/components/UserDetails.vue'
export default {
  name: 'Contacts',
  components: {
    UserDetails
  }
}
</script>
