import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import employeesData from '../../../shared/api/employees.json';
import { Employee } from '../../../shared/types';
import { EmployeeState } from './types';

const initialState: EmployeeState = {
  employees: employeesData as Employee[],
  filter: {},
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Omit<Employee, 'id'>>) {
      const newId = Math.max(...state.employees.map(e => e.id)) + 1;
      state.employees.push({ ...action.payload, id: newId });
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    setFilter(state, action: PayloadAction<EmployeeState['filter']>) {
      state.filter = action.payload;
    },
    removeEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, setFilter, removeEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
