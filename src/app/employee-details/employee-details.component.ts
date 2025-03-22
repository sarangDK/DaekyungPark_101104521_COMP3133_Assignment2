import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-employee-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = null;
  employeeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (res) => {
          this.employee = res.data.employeeById;
        },
        error: (err) => {
          console.error('Failed to load employee:', err);
        }
      });
    }
  }
}
