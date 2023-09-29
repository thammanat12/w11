<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by vaccine"
          v-model="vaccine"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchVaccine"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Vaccines List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(vaccine, index) in vaccines"
          :key="index"
          @click="setActiveVaccine(vaccine, index)"
        >
          {{ vaccine.vaccine }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllVaccines">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentVaccine">
        <h4>Vaccine</h4>
        <div>
          <label><strong>Vaccine :</strong></label> {{ currentVaccine.vaccine }}
        </div>
    
        <router-link :to="'/vaccine/' + currentVaccine.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Vaccine...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VaccineDataService from "../services/VaccineDataService";

export default {
  name: "vaccine-list",
  data() {
    return {
      vaccines: [],
      currentVaccine: null,
      currentIndex: -1,
      vaccine: ""
    };
  },
  methods: {
    retrieveVaccines() {
      VaccineDataService.getAll()
        .then(response => {
          this.vaccines = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveVaccines();
      this.currentVaccine = null;
      this.currentIndex = -1;
    },

    setActiveVaccine(vaccine, index) {
      this.currentVaccine = vaccine;
      this.currentIndex = vaccine ? index : -1;
    },

    removeAllVaccines() {
      VaccineDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchVaccine() {
      VaccineDataService.findByVaccine(this.vaccine)
        .then(response => {
          this.vaccines = response.data;
          this.setActiveVaccine(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveVaccines();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
