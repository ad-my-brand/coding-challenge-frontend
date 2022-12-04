

import swal from "sweetalert";


export const sweetFailed = (title, msg) => {
  return swal({
    title: title,
    text: msg,
    icon: "error",
    buttons: true,
    dangerMode: true,
  });
};

export const sweetSuccess = (title, msg) => {
  return swal({
    title: title,
    text: msg,
    icon: "success",
  });
};


export const simpleSweet = (msg) => {
  return swal(msg);
};

