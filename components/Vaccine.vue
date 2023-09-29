<template>
  <div v-if="currentVaccine" class="edit-form">
    <h4>Vaccine</h4>
    <form>
      <div class="form-group">
        <label for="vaccine">Vaccine</label>
        <input type="text" class="form-control" id="vaccine"
          v-model="currentVaccine.vaccine"
        />
      </div>


   
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentVaccine.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteVaccine"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateVaccine"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Vaccine...</p>
  </div>
</template>

<script>
import VaccineDataService from "../services/VaccineDataService";

export default {
  name: "vaccine",
  data() {
    return {
      currentVaccine: null,
      message: ''
    };
  },
  methods: {
    getVaccine(id) {
      VaccineDataService.get(id)
        .then(response => {
          this.currentVaccine = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentVaccine.id,
        vaccine: this.currentVaccine.vaccine,
        published: status
      };

      VaccineDataService.update(this.currentVaccine.id, data)
        .then(response => {
          console.log(response.data);
          this.currentVaccine.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateVaccine() {
      VaccineDataService.update(this.currentVaccine.id, this.currentVaccine)
        .then(response => {
          console.log(response.data);
          this.message = 'The vaccine was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteVaccine() {
      VaccineDataService.delete(this.currentVaccine.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "vaccine" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getVaccine(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
