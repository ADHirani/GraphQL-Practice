const mySql = require("../config/db");
const uuid = require("uuid").v4

const getSingleEmployee = async (parent, { userId }) => {
  return await new Promise((resolve, reject) => {
    return mySql.query(
      "SELECT * FROM employee WHERE id=?",
      userId,
      (err, data) => {
        if (err) {
          reject(err);
          throw err;
        } else {
          return resolve(data[0]);
          // return data;
        }
      }
    );
  });
};

const getAllEmployee = async () => {
  return await new Promise((resolve, reject) => {
    mySql.query("SELECT * FROM employee WHERE id != 1", (err, data) => {
      if (err) {
        reject(err);
        throw err;
      } else {
        return resolve(data);
        // return data;
      }
    });
  });
};

const createEmployee = async (arg) => {


  const isUserExistInDB = await isUSerExists(arg);

  if (isUserExistInDB?.id) {
    throw new Error("User Already Exists.");
  }
  return await new Promise((resolve, reject) => {
    const query = "INSERT INTO employee(id,first_name, last_name, email, reporting_to) VALUES(?,?,?,?,?)"
    mySql.query(query, [
      uuid(),
      arg.data.firstName,
      arg.data.lastName,
      arg.data.email,
      arg.data.reportingTo,
    ], (err, data) => {
      if (err) {
        reject(err)
        throw new Error(err)
      } else {
         mySql.query("SELECT * FROM employee WHERE email = ?", arg.data.email, (err, data) => {
          if (err) {
            reject(err)
            throw new Error(err)
          } else {
            resolve(data[0])
          }
        })
      }
    });
  })
}

const isUSerExists = async (arg) => {
  return await new Promise((resolve, reject) => {
    mySql.query("SELECT * FROM employee WHERE email=?", arg.data.email, (err, data) => {
      if (err) {
        reject(err)
        throw new Error(err)
      } else {
        resolve(data[0])
      }
    }) 
  })
}

const isUSerExistsById = async (arg) => {
  return await new Promise((resolve, reject) => {
    mySql.query(
      "SELECT * FROM employee WHERE id=?",
      arg.id,
      (err, data) => {
        if (err) {
          reject(err);
          throw new Error(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
};

const updateEmployee = async (arg) => {
  const isUSerExistsinDB = await isUSerExistsById(arg);
  const isEmailisTaken = await isUSerExists(arg);
  if (!isUSerExistsinDB?.id) {
    throw new Error("user not found!");
  } else if (isEmailisTaken?.id && isEmailisTaken?.id !== arg.id) {
    throw new Error("email is taken!");
  }

    return await new Promise((resolve, reject) => {
      let query = "UPDATE employee SET";
      Object.keys(arg.data)?.map((item, index) => {
        query =
          query +
          ` employee.${item}="${arg.data[item]}" ${
            Object.keys(arg.data)?.length - 1 == index ? "" : ","
          }`;
      });
      query = query + "WHERE id=?";

      mySql.query(query, arg.id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          mySql.query(
            "SELECT * FROM employee WHERE employee.id = ?",
            arg.id,
            (err, result) => {
              if (err) {
                throw new Error(err);
              } else if (result[0].id) {
                resolve(result[0]);
              } else {
                reject("Something Went Wrong!");
              }
            }
          );
        }
      });
    });
}

module.exports = {
  getSingleEmployee,
  getAllEmployee,
  createEmployee,
  updateEmployee,
};
