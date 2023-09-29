<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="vaccine">vaccine</label>
        <input
          type="text"
          class="form-control"
          id="vaccine"
          required
          v-model="vaccine.vaccine"
          name="vaccine"
        />
      </div>


      <button @click="saveVaccine" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVaccine">Add</button>
    </div>
  </div>
</template>

<script>
import VaccineDataService from "../services/VaccineDataService";

export default {
  name: "add-vaccine",
  data() {
    return {
      vaccine: {
        id: null,
        vaccine: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveVaccine() {
      var data = {
        vaccine: this.vaccine.vaccine,
      };

      VaccineDataService.create(data)
        .then(response => {
          this.vaccine.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newVaccine() {
      this.submitted = false;
      this.vaccine = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
