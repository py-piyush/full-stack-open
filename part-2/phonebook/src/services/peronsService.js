import axios from "axios";

const baseUrl =
  "https://full-stack-open-production-72dc.up.railway.app/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personObj) => {
  return axios.post(baseUrl, personObj).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, changedNumber) => {
  return axios
    .put(`${baseUrl}/${id}`, changedNumber)
    .then((response) => response.data);
};

export default { getAll, create, deletePerson, update };
