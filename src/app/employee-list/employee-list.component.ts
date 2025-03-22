import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../services/graphql.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm = '';

  constructor(private gql: GraphqlService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const query = `
      query {
        employees {
          _id
          first_name
          last_name
          email
          department
          designation
        }
      }
    `;
    this.gql.query(query).subscribe((res) => {
      this.employees = res.data.employees;
      this.filteredEmployees = [...this.employees];
    });
  }

  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.department?.toLowerCase().includes(term) ||
      emp.designation?.toLowerCase().includes(term)
    );
  }

  deleteEmployee(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        const mutation = `
          mutation($id: ID!) {
            deleteEmployee(id: $id) {
              _id
            }
          }
        `;
        this.gql.mutate(mutation, { id }).subscribe(() => {
          Swal.fire('Deleted!', 'Employee has been removed.', 'success');
          this.employees = this.employees.filter(emp => emp._id !== id);
          this.filterEmployees(); // refresh filtered list
        });
      }
    });
  }


  viewDetail(id: string) {
    this.router.navigate(['/employees/view', id]);
  }
  
  goToAdd() {
    this.router.navigate(['/employees/add']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/employees/edit', id]);
  }
}
