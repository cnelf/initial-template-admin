import { defineStore } from 'pinia';

export default defineStore('userStore', {
  state: () => ({
    firstName: 'firstName',
    lastName: 'lastName'
  }),
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`
  },
  actions: {
    setFirstName(payload) {
      this.firstName = payload;
    },
    setLastName(payload) {
      this.lastName = payload;
    }
  }
});
