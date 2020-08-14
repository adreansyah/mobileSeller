export const formatRupiah = (angka, prefix) => {
  if (angka !== undefined) {
    let number = angka.toString(),
      number_string = number.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp" + rupiah : "";
  } else {
    return "";
  }
};

export const unique = (array, key = null, object = null) => {
  const { takeLast, checkLast, checkFirst  } = object === null ? { takeLast : false, checkLast : null, checkFirst : null } : object
  let a = array.concat();
  let init = checkLast && checkLast < a.length ? a.length - checkLast : 0
  let length = checkFirst && checkFirst < a.length ? checkFirst : a.length
  for (let i = init; i < length; ++i) {
    for (let j = i + 1; j < length; ++j) {
      if (key === null) {
        if (a[i] === a[j]) a.splice(j--, 1);
      } else {
        if (a[i][key] === a[j][key]) {
          if (object && takeLast === true) a[i] = a[j];
          a.splice(j--, 1);
          length--
        }
      }
    }
  }
  return a;
};

export const copyText = text => {
  // Setup element
  var element = null;
  element = document.createElement("input");
  element.setAttribute("id", "copyText");
  element.setAttribute("type", "text");
  element.setAttribute("value", text);
  element.setAttribute("style", "position:fixed");
  document.body.appendChild(element);
  element.select();

  try {
    // Copy element value
    var copied = document.execCommand("copy");

    // Remove element
    if (element) element.remove();

    if (copied) {
      console.log("Copied!");
      return true;
    } else {
      console.log("Unable to copy!");
      return false;
    }
  } catch (err) {
    console.log("Unsupported Browser!");
    return false;
  }
};

export const BubbleChat = (arr = []) => {
  let isSwipes = [];
  for (let i = 0; i < arr.length; i++) {
    isSwipes[0] = {
      ...arr[0],
      isSeller: arr[0].isSeller,
      position: "first"
    };
    isSwipes[i] = {
      ...arr[i],
      isSeller: arr[i].isSeller,
      position:
        arr[i - 1] !== undefined && arr[0].isSeller !== arr[i].isSeller
          ? "first"
          : "middle"
    };
    isSwipes[i] = {
      ...arr[i],
      isSeller: arr[i].isSeller,
      position:
        arr[i - 1] !== undefined && arr[i - 1].isSeller === arr[i].isSeller
          ? arr[i + 1] !== undefined && arr[i + 1].isSeller !== arr[i].isSeller
            ? "last"
            : "middle"
          : "first"
    };
    isSwipes[arr.length - 1] = {
      ...arr[arr.length - 1],
      isSeller: arr[arr.length - 1].isSeller,
      position:
        arr[i - 1] !== undefined && arr[i].isSeller !== arr[i - 1].isSeller
          ? "first"
          : "last"
    };
  }
  return isSwipes;
};