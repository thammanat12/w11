import { createWebHistory, createRouter } from "vue-router";
const VaccineList = () => import('./components/VaccineList.vue');
const Vaccine = () => import('./components/Vaccine.vue');
const AddVaccine = () => import('./components/AddVaccine.vue');

const routes =  [
  {
    path: "/",
    alias: "/vaccine",
    name: "vaccine",
    component: VaccineList
  },
  {
    path: "/vaccine/:id",
    name: "vaccine-details",
    component: Vaccine
  },
  {
    path: "/add",
    name: "add",
    component: AddVaccine
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
