import Employee from "../models/employee.js";
import EmployeeList from "../models/employeeList.js";
import Validation from "../models/validation.js";

const validate = new Validation();
const employeeList = new EmployeeList();

getLocalStorage();

export function getId(id) {
  return document.getElementById(id);
}

function getInfoEmployee(isAdd) {
  const account = getId("tknv").value;
  const name = getId("name").value;
  const email = getId("email").value;
  const password = getId("password").value;
  const date = getId("datepicker").value;
  const salary = getId("luongCB").value;
  const position = getId("chucvu").value;
  const hour = getId("gioLam").value;

  let isValid = true;

  /**
   * Validation
   */
  if (isAdd) {
    isValid &=
      validate.checkEmpty(account, "tbTKNV", "(*) Vui lòng nhập tài khoản") &&
      validate.checkExistAccount(
        account,
        "tbTKNV",
        "(*) Tài khoản đã tồn tại",
        employeeList.arr
      );
  }

  isValid &=
    validate.checkEmpty(name, "tbTen", "(*) Vui lòng nhập họ tên") &&
    validate.checkCharacterString(name, "tbTen", "(*) Vui nhập chuỗi chữ");
  isValid &=
    validate.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validate.checkEmail(email, "tbEmail", "(*) Vui nhập email hợp lệ");
  isValid &=
    validate.checkEmpty(password, "tbMatKhau", "(*) Vui lòng nhập mật khẩu") &&
    validate.checkPassword(password, "tbMatKhau", "(*) Vui nhập lại mật khẩu");
  isValid &=
    validate.checkEmpty(date, "tbNgay", "(*) Vui lòng nhập ngày tháng") &&
    validate.checkDate(date, "tbNgay", "(*) Vui nhập ngày/tháng hợp lệ");
  isValid &=
    validate.checkEmpty(salary, "tbLuongCB", "(*) Vui lòng nhập lương") &&
    validate.checkNumber(salary, "tbLuongCB", "(*) Vui lòng nhập số");
  isValid &= validate.checkSelectOption(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng nhập chức vụ"
  );
  isValid &=
    validate.checkEmpty(hour, "tbGiolam", "(*) Vui lòng nhập giờ làm") &&
    validate.checkNumber(hour, "tbGiolam", "(*) Vui lòng nhập số");

  if (!isValid) return;

  const employee = new Employee(
    account,
    name,
    email,
    password,
    date,
    salary,
    position,
    hour
  );

  employee.totalSalary();

  employee.rank = employee.getRank();
  return employee;
}

/**
 * Render employee
 */
function renderEmployeeList(data) {
  // Render employeeList.arr ra giao dien
  let contentHTML = "";

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    contentHTML += `
    <tr>
        <td>${employee.account}</td>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.date}</td>
        <td>${employee.position}</td>
        <td>${employee.calcSalary}</td>
        <td>${employee.rank}</td>
        <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit('${employee.account}')">Edit</button>
            <button class="btn btn-danger" onclick="handleDelete('${employee.account}')">Delete</button>
        </td>
    </tr>
    `;
  }

  getId("tableDanhSach").innerHTML = contentHTML;
}

/**
 * Add employee
 */
getId("btnThemNV").addEventListener("click", function () {
  const employee = getInfoEmployee(true);
  if (!employee) return;
  employeeList.addEmployee(employee);
  renderEmployeeList(employeeList.arr);
  setLocalStorage();

  getId("btnDong").click();

  resetForm();
});

/**
 * btnThem open modal
 */
getId("btnThem").onclick = function () {
  // update title
  getId("header-title").innerHTML = "Add account";

  //display "Them nguoi dung"
  getId("btnThemNV").style.display = "block";

  // hide btn "Cap nhat"
  getId("btnCapNhat").style.display = "none";

  // enable
  getId("tknv").disabled = false;
};

/**
 * Reset form
 */

function resetForm() {
  getId("form").reset();
}

/**
 * Edit employee
 */
function handleEdit(id) {
  console.log(id);
  // update title
  getId("header-title").innerHTML = "Edit account";
  //hide "Them nguoi dung"
  getId("btnThemNV").style.display = "none";
  // display btn "Cap nhat"
  getId("btnCapNhat").style.display = "block";

  const employee = employeeList.getInfoEmployeeById(id);

  if (employee) {
    getId("tknv").value = employee.account;
    // disable Id
    getId("tknv").disabled = true;

    getId("name").value = employee.name;
    getId("password").value = employee.password;
    getId("email").value = employee.email;
    getId("datepicker").value = employee.date;
    getId("luongCB").value = employee.salary;
    getId("chucvu").value = employee.position;
    getId("gioLam").value = employee.hour;
  }
}

window.handleEdit = handleEdit;

/**
 * Update employee
 */
getId("btnCapNhat").addEventListener("click", function () {
  const employee = getInfoEmployee(false);
  if (!employee) return;
  employeeList.upadateEmployee(employee);
  renderEmployeeList(employeeList.arr);
  setLocalStorage();

  getId("btnDong").click();
});

/**
 * Delete employee
 */
function handleDelete(id) {
  employeeList.deleteEmployee(id);
  renderEmployeeList(employeeList.arr);
  setLocalStorage();
}

window.handleDelete = handleDelete;
console.log(window);

/**
 * Rank employee
 */
// getId("rank").addEventListener("click", function () {
//   const rank = getId("rank").value;
//   console.log(rank);
// })

/**
 * Search type employee
 */
getId("searchName").addEventListener("keyup", function () {
  const searchName = getId("searchName").value;
  const employeeSearch = employeeList.searchTypeEmployee(searchName);
  renderEmployeeList(employeeSearch);
});

function setLocalStorage() {
  // convert employeeList.arr => string
  const dataString = JSON.stringify(employeeList.arr);
  localStorage.setItem("EMPLOYEE_LIST", dataString);
}

function getLocalStorage() {
  const dataString = localStorage.getItem("EMPLOYEE_LIST");

  if (!dataString) return;

  // convert string => JSON
  const dataJson = JSON.parse(dataString);
  // populate employeeList.arr
  employeeList.arr = dataJson;
  // re-render
  renderEmployeeList(employeeList.arr);
}
