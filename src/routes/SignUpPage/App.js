function checkNumber(event) {
  if (
    event.key === "." ||
    event.key === "-" ||
    (event.key >= 0 && event.key <= 9)
  ) {
    return true;
  } else {
    return false;
  }
}
// export default SignUpPage;
