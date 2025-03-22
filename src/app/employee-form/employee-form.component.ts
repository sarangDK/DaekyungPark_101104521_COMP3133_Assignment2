import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  isEdit = false;
  employeeId: string | null = null;

  employee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    department: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    employee_photo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.employeeId;

    if (this.isEdit && this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(res => {
        this.employee = res.data.employeeById;
      });
    }
  }

  save() {
    if (this.isEdit && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
        next: () => {
          Swal.fire('✅ Updated', 'Employee updated successfully!', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Update Error:', err);
          Swal.fire('❌ Error', 'Failed to update employee', 'error');
        }
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          Swal.fire('🎉 Added', 'Employee added successfully!', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Add Error:', err);
          Swal.fire('❌ Error', 'Failed to add employee', 'error');
        }
      });
    }
  }
}
