import { Circulator } from "circulator";

// solarized
// const colors = [
//   `#002b36`,
//   `#073642`,
//   `#586e75`,
//   `#657b83`,
//   `#839496`,
//   `#93a1a1`,
//   `#eee8d5`,
//   `#fdf6e3`,
//   `#b58900`,
//   `#cb4b16`,
//   `#dc322f`,
//   `#d33682`,
//   `#6c71c4`,
//   `#268bd2`,
//   `#2aa198`,
//   `#859900`,
// ]
// const colors = [`#56B949`, `#30499B`, `#EE4035`, `#F0A32F`]
// export const colors = [`#004777`, `#a30000`, `#ff7700`, `#efd28d`, `#00afb5`];
export const colors = [`#004777`, `#bb0a21`, `#ff7700`, `#efd28d`, `#00afb5`];
// const colors = [`#42ffdf`, `#2b8dff`, `#ff4874`, `#164187`, `#ff9c84`]

// http://colorbrewer2.org/?type=qualitative&scheme=Paired&n=12
// const colors = [
//   `#a6cee3`,
//   `#1f78b4`,
//   `#b2df8a`,
//   `#33a02c`,
//   `#fb9a99`,
//   `#e31a1c`,
//   `#fdbf6f`,
//   `#ff7f00`,
//   `#cab2d6`,
//   `#6a3d9a`,
//   `#ffff99`,
//   `#b15928`,
// ]

export const normalPalette = new Circulator(colors);
export const mirrorPalette = new Circulator(colors);
const step = Math.round(Math.random() * colors.length);
normalPalette.step(step);
mirrorPalette.step(step);
