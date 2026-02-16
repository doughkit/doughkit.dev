// calculates how old I am at build time
birthday = new Date("1 4 08 GMT-5:00");
diff = new Date(Date.now() - birthday.getTime());
export default Math.abs(diff.getUTCFullYear() - 1970)