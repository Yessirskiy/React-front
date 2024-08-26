function wordForm(number, nominative, genitiveSingular, genitivePlural) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return nominative;
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return genitiveSingular;
    } else {
      return genitivePlural;
    }
}

export default wordForm;