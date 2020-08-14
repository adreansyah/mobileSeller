// const BubbleChatReact = () => {
//   let isSwipes = [];
//   for (let i = 0; i < arr.length; i++) {
//     let useStat = arr[i].isSeller;
//     isSwipes[0] = {
//       isSeller: arr[0].isSeller,
//       position: "first"
//     };
//     isSwipes[i] = {
//       isSeller: arr[i].isSeller,
//       position:
//         arr[i - 1] !== undefined && arr[0].isSeller !== arr[i].isSeller
//           ? "first"
//           : "middle"
//     };
//     isSwipes[i] = {
//       isSeller: arr[i].isSeller,
//       position:
//         arr[i - 1] !== undefined && arr[i - 1].isSeller === arr[i].isSeller
//           ? arr[i + 1] !== undefined && arr[i + 1].isSeller !== arr[i].isSeller
//             ? "last"
//             : "middle"
//           : "first"
//     };
//     isSwipes[arr.length - 1] = {
//       isSeller: arr[arr.length - 1].isSeller,
//       position: "last"
//     };
//   }
//   return isSwipes;
// };


const Variables = [
    {
        names: "ukuran",
        label: ["43","44","45","46"]
    },
    {
        names: "warna",
        label: ["biru","kuning","hijau"]
    },
    {
        names: "pola",
        label: ["polkadot","sexy2gitu"]
    }
]



if(Variables.length === 1) {
    console.log(pola1(Variables));
}
else if(Variables.length === 2) {
    console.log(pola2(Variables));
}
else if(Variables.length === 3) {
    console.log(pola3(Variables));
}
