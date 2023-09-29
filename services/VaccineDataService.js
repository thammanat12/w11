import http from "../http-common";

class VaccineDataService {
  getAll() {
    return http.get("/vaccine");
  }

  get(id) {
    return http.get(`/vaccine/${id}`);
  }

  create(data) {
    return http.post("/vaccine", data);
  }

  update(id, data) {
    return http.put(`/vaccine/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vaccine/${id}`);

  }


  findByVaccine(vaccine){
    return http.get(`/vaccine/search/${vaccine}`);
  }
}

export default new VaccineDataService();
