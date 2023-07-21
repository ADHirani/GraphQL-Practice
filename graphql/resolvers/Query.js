const { getAllEmployee, getSingleEmployee } = require("../../services/EmployeeService");


module.exports = {
  getEmployee: async (parent, params) => getSingleEmployee(parent, params),
  getAllEmployee: async (parent, params) => getAllEmployee(parent, params),
};
