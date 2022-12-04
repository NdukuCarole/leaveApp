import string from "./string";
import number from "./number";
import currency from "./currency";
import date from "./date";

const filters = [...string, ...number, ...currency, ...date];

export default filters;
