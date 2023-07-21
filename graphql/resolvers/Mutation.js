const { createEmployee, updateEmployee } = require("../../services/EmployeeService");
const { createMessage } = require("../../services/MessageService");



module.exports = {
  async createEmployee(parent, arg, ctx, info) {
    return await createEmployee(arg);
  },

  async updateEmployee(parent, arg, ctx, info) {
    return await updateEmployee(arg);
  },

  async createMessage(parent, arg, ctx, info) {
    return await createMessage(arg);
  },
};
