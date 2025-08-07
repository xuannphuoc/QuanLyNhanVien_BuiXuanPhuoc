export default class EmployeeList {
  constructor() {
    this.arr = [];
  }

  addEmployee(employee) {
    this.arr.push(employee);
  }

  findIndexEmployee(id) {
    let index = -1;

    for (let i = 0; i < this.arr.length; i++) {
      const employee = this.arr[i];
      if (employee.account === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  deleteEmployee(id) {
    const index = this.findIndexEmployee(id);

    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  getInfoEmployeeById(id) {
    const index = this.findIndexEmployee(id);
    return this.arr[index];
  }

  upadateEmployee(employee) {
    const index = this.findIndexEmployee(employee.account);
    if (index !== -1) {
      this.arr[index] = employee;
    }
  }

  rankEmployee() {}

  searchTypeEmployee(searchName) {
    let employeeSearch = [];

    for (let i = 0; i < this.arr.length; i++) {
        const employee = this.arr[i];
        const searchNameLowerCase = searchName.toLowerCase();
        const rankLowerCase = employee.rank.toLowerCase();

        if (rankLowerCase.indexOf(searchNameLowerCase) > -1) {
            employeeSearch.push(employee);
        }
    }

    return employeeSearch;
  }
}
