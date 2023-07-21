import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ONE_EMP = gql`
  query GetUserQuery($userId: ID!) {
    getEmployee(userId: $userId) {
      last_name
      first_name
      reporting_to
      id
      reporting_person {
        last_name
        email
      }
    }
  }
`;

const GET_ALL_EMP = gql`
  query getUserQuery {
    getAllEmployee {
      last_name
      first_name
      reporting_to
      id
      reporting_person {
        last_name
        email
      }
    }
  }
`;

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  // const { data, loading, error } = useQuery(GET_ALL_EMP, {
  //   onCompleted: (data) => {
  //     setEmployeeData(data.getAllEmployee);
  //   },
  // });
  const { data, loading, error } = useQuery(GET_ONE_EMP, {
    variables: {
      userId: 41
    },
    onCompleted: (data) => {
      setEmployeeData(data.getEmployee);
    }
  });
  return (
    <div className="App">
      {loading
        ? "LOADING . . ."
        : error
        ? "ERROR OCCURS :("
        : JSON.stringify(employeeData)}
    </div>
  );
}

export default App;
