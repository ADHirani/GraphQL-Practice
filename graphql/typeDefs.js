const { default: gql } = require("graphql-tag");

module.exports = gql`
  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    reporting_to: ID!
    reporting_person: Employee
    sent_messages: [Message]
  }

  type Message {
    id: ID!
    message: String
    sender: ID!
    senderData: Employee
  }

  type Query {
    getEmployee(userId: ID!): Employee
    getAllEmployee: [Employee]
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String
    email: String!
    reportingTo: ID!
  }

  input updateEmployeeInput {
    first_name: String
    last_name: String
    email: String
    reporting_to: ID
  }

  input createMessageInput {
    message: String!
    sender: ID!
  }

  type Mutation {
    createEmployee(data: CreateEmployeeInput!): Employee
    updateEmployee(id: ID!, data: updateEmployeeInput!): Employee
    createMessage(messageData: createMessageInput): Message
  }

  type Subscription {
    receiveMessage: Message
  }
`;
