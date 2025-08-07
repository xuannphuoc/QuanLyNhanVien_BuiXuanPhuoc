import { getId } from "../controller/main.js";

export default class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }

    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }

  checkSelectOption(idSelect, divId, mess) {
    const element = getId(idSelect);
    if (element.selectedIndex !== 0) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkCharacterString(value, divId, mess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkNumber(value, divId, mess) {
    const letter = /^[0-9]+$/;
    if (value.match(letter)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkEmail(value, divId, mess) {
    const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkPassword(value, divId, mess) {
    const letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkDate(value, divId, mess) {
    const letter =
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (value.match(letter)) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }

  checkExistAccount(value, divId, mess, employeeList) {
    let exist = false;
    for (let i = 0; i < employeeList.length; i++) {
      const employee = employeeList[i];
      if (employee.account === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }
}
