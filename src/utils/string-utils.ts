/* eslint-disable no-extend-native */
/* eslint-disable radix */
import HostConfig from 'network/HostConfig';
declare global {
  interface String {
    toMd5(): string;
    formatPrice(): string;
    formatPhoneNumber(): string;
    isEmail(): boolean;
    isNickname(): boolean;
    isFullName(): boolean;
    isPhoneNumber(): boolean;
    isUrl(): boolean;
    unsignText(): string;
    regexSearchText(): string;
    removeWhiteSpace(): string;
    createUniqueText(): string;
    toUpperCaseFullName(): string;
    replaceAll(oldText: string, newText: string): string;
    toNumber(): number;
    absoluteUrl(): string;
    toDateObject(
      splitDate?: string,
      _format?: string,
      defaultValue?: string,
    ): string | Date;
    getPostTime(): string;
    completeDate(max_Date: Date, min_Date: Date): Promise<unknown>;
  }
  interface Number {
    formatPrice(): string;
    formatPhoneNumber(): string;
    toDateObject(
      splitDate?: string,
      _format?: string,
      defaultValue?: string,
    ): string | Date;
    compareDate(date: number): number;
    getPostTime(): string;
  }
  interface Date {
    ddmmyyyy(): string;
    isValidDate(): boolean;
    getHours12(): number;
    format(pattent: string): string;
    getAge(): number;
    compareDate(date: Date): number;
    getPostTime(): string;
    getFirstDateOfMonth(): string;
    getLastDateOfMonth(): string;
  }
}
const md5 = require('md5');

String.prototype.toMd5 = function () {
  return md5(this);
};
Number.prototype.formatPrice = function () {
  return this.toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    .replace('.00', '')
    .replace(/,/g, '.');
};
String.prototype.formatPrice = function () {
  let price = parseInt(String(this));
  return price
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    .replace('.00', '')
    .replace(/,/g, '.');
};
Number.prototype.formatPhoneNumber = function () {
  let phone = String(this);
  return phone.formatPhoneNumber();
};
String.prototype.formatPhoneNumber = function () {
  let phone = this;
  if (!phone) {
    return '';
  }
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, '');

  //check if number length equals to 10
  //reformat and return phone number
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};
String.prototype.isEmail = function () {
  // var re = /^([a-zA-Z0-9]){4,}\@[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,}$/g;
  var re =
    /^([a-zA-Z0-9]+((\.|_)?[a-zA-Z0-9]+)*)+\@[a-zA-Z0-9][a-zA-Z0-9-]{1,61}([a-zA-Z0-9].[a-zA-Z]{2,})+$/g;
  return re.test(this.toLowerCase());
};
String.prototype.isNickname = function () {
  var re = /^([a-zA-Z0-9_]){6,30}$/g;
  return re.test(this.toLowerCase());
};
String.prototype.isFullName = function () {
  var re = /[0-9~!@#$%^&*()+\-_=\[\]{};':"\\|,.<>\/?]/;
  return !re.test(String(this));
};

String.prototype.isPhoneNumber = function () {
  // var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  // var re = /^([0]|([\+84]))[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,5}$/g;
  var re = /^(\+?84|0|\(\+?84\))[1-9]\d{8,9}$/g;
  return re.test(String(this));
};

String.prototype.isUrl = function () {
  try {
    var str = this.toLowerCase();
    var re =
      /^(?:(?:https?|http):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return re.test(str);
  } catch (error) {
    return false;
  }
};

String.prototype.unsignText = function () {
  try {
    var str = String(this);
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
  } catch (error) {
    return '';
  }
};
String.prototype.regexSearchText = function () {
  try {
    var str = '.*' + String(this);
    str = str.replace(
      /a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
      '(a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)',
    );
    str = str.replace(/e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, '(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)');
    str = str.replace(/i|ì|í|ị|ỉ|ĩ/g, '(i|ì|í|ị|ỉ|ĩ)');
    str = str.replace(
      /o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
      '(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)',
    );
    str = str.replace(/u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, '(u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)');
    str = str.replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g, '(y|ỳ|ý|ỵ|ỷ|ỹ)');
    str = str.replace(/d|đ/g, '(d|đ)');
    str = str.replace(
      /A|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
      '(A|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)',
    );
    str = str.replace(/E|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, '(E|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)');
    str = str.replace(/I|Ì|Í|Ị|Ỉ|Ĩ/g, '(I|Ì|Í|Ị|Ỉ|Ĩ)');
    str = str.replace(
      /O|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
      '(O|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)',
    );
    str = str.replace(/U|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, '(U|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)');
    str = str.replace(/Y|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, '(Y|Ỳ|Ý|Ỵ|Ỷ|Ỹ)');
    str = str.replace(/D|Đ/g, '(D|Đ)');
    return str;
  } catch (error) {
    return '';
  }
};
String.prototype.removeWhiteSpace = function () {
  return this.replace(/ /g, '');
};
String.prototype.createUniqueText = function () {
  return this.unsignText().removeWhiteSpace();
};

String.prototype.toUpperCaseFullName = function () {
  let text = this;
  if (!text) {
    return '';
  }
  let a = text.split(' ').map(item => {
    let item2 = item + '';
    item2 = item2.charAt(0).toUpperCase() + item2.slice(1);
    return item2;
  });
  return a.join(' ');
};

export default {
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  },
};
String.prototype.replaceAll = function (oldText, newText) {
  let text = this.toString();
  while (text.indexOf(oldText) != -1) {
    text = text.replace(oldText, newText);
  }
  return text;
};
String.prototype.toNumber = function () {
  try {
    return parseInt(String(this));
  } catch (error) {}
  return 0;
};
String.prototype.absoluteUrl = function () {
  var _this = String(this);
  if (_this == '') {
    return _this;
  }

  if (_this.indexOf('http') == 0 || _this.indexOf('blob') == 0) {
    return _this;
  }
  let _this2 = _this.toLowerCase();
  if (
    _this2.endsWith('.jpg') ||
    _this2.endsWith('.png') ||
    _this2.endsWith('.gif') ||
    _this2.endsWith('.jpeg')
  ) {
    let image = HostConfig.BASE_URL + encodeURIComponent(_this + '');
    return image;
  }

  return HostConfig.BASE_URL + _this + '';
};

Date.prototype.ddmmyyyy = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    (dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    this.getFullYear(),
  ].join('/');
};

Date.prototype.isValidDate = function () {
  return !isNaN(this.getTime());
};

String.prototype.toDateObject = function (
  splitDate: string,
  _format?: string,
  defaultValue?: string,
) {
  try {
    if (!_format) {
      if (splitDate) {
        if (splitDate == '/') {
          let dateParam = this.split(/[\s/:]/);
          dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
          return new Date(...(dateParam as ConstructorParameters<typeof Date>));
        } else {
          if (splitDate == '-') {
            let dateParam = this.split(/[\s-:]/);
            dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
            return new Date(
              ...(dateParam as ConstructorParameters<typeof Date>),
            );
          }
        }
      }
      return new Date(String(this));
    } else {
      var formatLowerCase = _format.toLowerCase();
      var formatItems = formatLowerCase.split(splitDate);
      var dateItems = this.split(splitDate);
      var monthIndex = formatItems.indexOf('mm');
      var dayIndex = formatItems.indexOf('dd');
      var yearIndex = formatItems.indexOf('yyyy');
      if (
        monthIndex == -1 ||
        dayIndex == -1 ||
        yearIndex == -1 ||
        dateItems.length <= Math.max(monthIndex, dayIndex, yearIndex)
      ) {
        return new Date(String(this));
      }
      var month = parseInt(dateItems[monthIndex]);
      month -= 1;
      var formatedDate = new Date(
        dateItems[yearIndex || ''],
        month,
        dateItems[dayIndex || ''],
      );
      return formatedDate;
    }
  } catch (e) {
    return defaultValue || new Date();
  }
};

Number.prototype.toDateObject = String.prototype.toDateObject;

Date.prototype.getHours12 = function () {
  var hours1 = this.getHours();
  var hours = hours1 % 12;
  hours = hours ? hours : hours1 >= 12 ? 12 : 0; // the hour '0' should be '12'
  return hours;
};

Date.prototype.format = function (pattent) {
  var thu = /thu/g;
  var dd = /dd/g;
  var MM = /MM/g;
  var yyyy = /yyyy/g;
  var YYYY = /YYYY/g;
  var M = /M/g;
  var yy = /yy/g;
  var YY = /YY/g;
  var HH = /HH/g;
  var hh = /hh/g;
  var mm = /mm/g;
  var ss = /ss/g;
  var tt = /tt/g;

  var date = (this.getDate() > 9 ? '' : '0') + this.getDate();
  pattent = pattent.replace(dd, date);
  var month = String(this.getMonth() + 1); // getMonth() is zero-based
  month = (Number(month) > 9 ? '' : '0') + month;
  pattent = pattent.replace(MM, month);
  pattent = pattent.replace(M, month);
  var year = String(this.getFullYear());
  pattent = pattent.replace(YYYY, year);
  pattent = pattent.replace(yyyy, year);
  var _year = (year + '').substring(2);
  pattent = pattent.replace(yy, _year);
  pattent = pattent.replace(YY, _year);

  var hour = String(this.getHours());
  var hour12 = String(this.getHours12());
  pattent = pattent.replace(hh, hour12);
  hour = (Number(hour) > 9 ? '' : '0') + hour;
  pattent = pattent.replace(HH, hour);

  var minute = String(this.getMinutes());
  minute = (Number(minute) > 9 ? '' : '0') + minute;
  pattent = pattent.replace(mm, minute);

  var second = String(this.getSeconds());
  second = (Number(second) > 9 ? '' : '0') + second;
  pattent = pattent.replace(ss, second);

  var _tt = this.getHours() > 12 ? 'PM' : 'AM';
  pattent = pattent.replace(tt, _tt);

  var dateInWeek = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  var day = this.getDay();
  pattent = pattent.replace(thu, dateInWeek[day]);

  return pattent;
};

Date.prototype.getAge = function () {
  var date = new Date();
  if (date.getFullYear() < this.getFullYear()) {
    return 0;
  }
  if (date.getFullYear() === this.getFullYear()) {
    return 1;
  }
  return date.getFullYear() - this.getFullYear();
};

Date.prototype.compareDate = function (date) {
  if (this.ddmmyyyy() == date.ddmmyyyy()) {
    return 0;
  }
  return this.getTime() > date.getTime() ? 1 : -1;
};
Number.prototype.compareDate = function (timeMilisecond) {
  var date1 = timeMilisecond.toDateObject() as Date;
  var date = this.toDateObject() as Date;

  if (date.ddmmyyyy() == date1.ddmmyyyy()) {
    return 0;
  }
  return this > timeMilisecond ? 1 : -1;
};

String.prototype.getPostTime = function () {
  try {
    var date10Day = 86400 * 10;
    var dateOneDay = 86400;
    var dateOneHour = 3600;
    var dateOneMinute = 60;
    var dateDayName = ' ngày trước';
    var dateHourName = ' giờ trước';
    var dateMinuteName = ' phút trước';
    var dateJustNowName = 'Vừa xong';

    var _this = parseFloat(String(this) + '');
    var date = new Date();
    date.setTime(_this);
    var now = new Date().getTime();
    var totalTimeDiff = (now - _this) / 1000;
    if (totalTimeDiff > date10Day) {
      return date.format('dd-MM-yyyy HH:mm:ss');
    }
    if (totalTimeDiff > dateOneDay) {
      var day = parseInt(totalTimeDiff / dateOneDay + '');
      return day + dateDayName;
    }
    if (totalTimeDiff > dateOneHour) {
      var hour = parseInt(totalTimeDiff / dateOneHour + '');
      return hour + dateHourName;
    }
    if (totalTimeDiff > dateOneMinute) {
      var minute = parseInt(totalTimeDiff / dateOneMinute + '');
      return minute + dateMinuteName;
    } else {
      return dateJustNowName;
    }
  } catch (e) {
    return '';
  }
};

Number.prototype.getPostTime =
  String.prototype.getPostTime ||
  function (this: string) {
    return (this + '').getPostTime();
  };

Date.prototype.getPostTime =
  Date.prototype.getPostTime ||
  function (this: Date) {
    return this.getTime().getPostTime();
  };

Date.prototype.getFirstDateOfMonth =
  Date.prototype.getLastDateOfMonth ||
  function (this: Date) {
    return (this.format('yyyy-MM-') + '01').toDateObject();
  };

Date.prototype.getLastDateOfMonth =
  Date.prototype.getLastDateOfMonth ||
  function (this: Date) {
    for (let i = 31; i > 0; i--) {
      try {
        let date = (
          this.format('yyyy-MM-') +
          (i < 10 ? '0' : '') +
          i
        ).toDateObject() as Date;
        if (date.isValidDate() && date.getDate() == i) {
          return date;
        }
      } catch (error) {}
    }
    return this;
  };

/*


  */
// eslint-disable-next-line no-extend-native
String.prototype.completeDate = function (max_Date, min_Date) {
  // eslint-disable-next-line consistent-this
  let text = this;
  return new Promise((resolve, reject) => {
    try {
      if (!text) {
        reject({
          code: 1,
          message: 'Không được truyền rỗng',
        });
        return;
      }
      text = text.trim();
      if (text.length > 10) {
        reject({
          code: 2,
          message: 'Vui lòng nhập đúng định dạng ngày tháng',
        });
        return;
      }
      let _date = text.toDateObject() as Date;
      var year = new Date().getFullYear();
      var date = '';
      if (text.length === 4) {
        date = '01/01/' + text;
      } else if (text.length === 5) {
        date = text[3] + text[4] + '/' + text[0] + text[1] + '/' + year;
      } else if (text.length === 6) {
        var year = new Date().getFullYear();

        if (
          parseInt(year.toString().substr(-2)) < parseInt(text[4] + text[5])
        ) {
          date =
            text[2] +
            text[3] +
            '/' +
            text[0] +
            text[1] +
            '/' +
            (parseInt(year.toString().substr(0, 2)) - 1) +
            text[4] +
            text[5];
        } else {
          date =
            text[2] +
            text[3] +
            '/' +
            text[0] +
            text[1] +
            '/' +
            year.toString().substr(0, 2) +
            text[4] +
            text[5];
        }
      } else if (text.length === 8) {
        if (text.indexOf('/') != -1) {
          return this.fixBOD2(text.replace(/\//g, ''), max_Date, min_Date);
        } else {
          date =
            text[2] +
            text[3] +
            '/' +
            text[0] +
            text[1] +
            '/' +
            text[4] +
            text[5] +
            text[6] +
            text[7];
        }
      } else if (text.length === 10) {
        date =
          text[3] +
          text[4] +
          '/' +
          text[0] +
          text[1] +
          '/' +
          text[6] +
          text[7] +
          text[8] +
          text[9];
      } else if (text.length === 7) {
        date = '';
      } else {
        var temp = text.split('/');
        date =
          temp[1][0] +
          temp[1][1] +
          '/' +
          temp[0][0] +
          temp[0][1] +
          '/' +
          temp[2][0] +
          temp[2][1] +
          temp[2][2] +
          temp[2][3];
      }

      _date = date.toDateObject() as Date;
      if (!_date.isValidDate()) {
        reject({
          code: 2,
          message: 'Vui lòng nhập đúng định dạng ngày tháng',
        });
      } else {
        if (min_Date != undefined && _date < min_Date) {
          reject({
            date: min_Date,
            code: 3,
            message:
              'Vui lòng nhập ngày lớn hơn ' + min_Date.format('dd/MM/yyyy'),
          });
          return;
        }
        if (max_Date != undefined && _date > max_Date) {
          reject({
            date: max_Date,
            code: 4,
            message:
              'Vui lòng nhập ngày nhỏ hơn ' + max_Date.format('dd/MM/yyyy'),
          });
          return;
        }
        resolve(_date);
      }
    } catch (e) {
      console.log(e);
      reject({
        code: 2,
        message: 'Vui lòng nhập đúng định dạng ngày tháng',
      });
      return;
    }
  });
};
