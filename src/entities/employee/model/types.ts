import { Employee } from "../../../shared/types";

export interface EmployeeState {
  employees: Employee[];
  filter: {
    role?: 'driver' | 'waiter' | 'cook';
    isArchive?: boolean;
  };
}