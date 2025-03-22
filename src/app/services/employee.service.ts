import { Injectable } from '@angular/core';
import { GraphqlService } from './graphql.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private gql: GraphqlService) {}

  getEmployeeById(id: string) {
    const query = `
      query($id: ID!) {
        employeeById(id: $id) {
          _id
          first_name
          last_name
          email
          gender
          department
          designation
          salary
          date_of_joining
          employee_photo
        }
      }
    `;
    return this.gql.query(query, { id });
  }

  addEmployee(employee: any) {
    const mutation = `
      mutation AddEmployee(
        $first_name: String,
        $last_name: String,
        $email: String,
        $gender: String,
        $designation: String,
        $salary: Float,
        $date_of_joining: String,
        $department: String,
        $employee_photo: String
      ) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          _id
          first_name
        }
      }
    `;

    return this.gql.mutate(mutation, {
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      gender: employee.gender,
      designation: employee.designation,
      salary: employee.salary,
      date_of_joining: employee.date_of_joining,
      department: employee.department,
      employee_photo: employee.employee_photo
    });
  }

  updateEmployee(id: string, employee: any) {
    const mutation = `
      mutation UpdateEmployee(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $designation: String,
        $salary: Float,
        $date_of_joining: String,
        $department: String,
        $employee_photo: String
      ) {
        updateEmployee(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          _id
          first_name
        }
      }
    `;

    return this.gql.mutate(mutation, {
      id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      designation: employee.designation,
      salary: employee.salary,
      date_of_joining: employee.date_of_joining,
      department: employee.department,
      employee_photo: employee.employee_photo
    });
  }
}
