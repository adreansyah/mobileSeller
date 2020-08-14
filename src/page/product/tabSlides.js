import Displayed from "./Displayed";
import Soldout from "./Soldout";
import Hidden from "./Hidden";
import Periodover from "./Periodover";
import Evaluated from "./Evaluated";

export const tabSlides = [
  {
    uri: "displayed",
    orderStatus: "DISPLAYED",
    name: "Terdisplay",
    component: Displayed
  },
  {
    uri: "soldout",
    orderStatus: "SOLD_OUT",
    name: "Terjual Habis",
    component: Soldout
  },
  {
    uri: "hidden",
    orderStatus: "HIDDEN",
    name: "Disembunyikan",
    component: Hidden
  },
  {
    uri: "periodover",
    orderStatus: "PERIOD_OVER",
    name: "Periode Selesai",
    component: Periodover
  },
  {
    uri: "evaluated",
    orderStatus: "EVALUATED",
    name: "Dievaluasi",
    component: Evaluated
  }
];
