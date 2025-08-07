import { getId } from "../controller/main.js";

export default class Employee {
  constructor(
    _account,
    _name,
    _email,
    _password,
    _date,
    _salary,
    _position,
    _hour,
    _rank
  ) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.salary = _salary;
    this.position = _position;
    this.hour = _hour;
    this.rank = _rank;
    this.calcSalary = 0;
    this.calcRank = 0;
  }

  totalSalary() {
    let heSo = 1;

    if (this.position === "Sếp") {
      heSo = 3;
    } else if (this.position === "Trưởng phòng") {
      heSo = 2;
    }

    this.calcSalary = this.salary * heSo;
    return this.calcSalary;
  }

  getRank() {
    const hour = this.hour * 1;
    if (hour >= 192) {
      return "Nhân viên xuất sắc";
    } else if (hour >= 176) {
      return "Nhân viên giỏi";
    } else if (hour >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  }
}
