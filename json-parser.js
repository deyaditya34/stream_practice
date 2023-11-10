let str = `"name": "Ajay", "phone": "1234512345"`;

function parseValue(str) {
  let curr = [];
  let i = str.indexOf('"') + 1;

  while (str[i] !== '"') {
    curr.push(str[i]);

    i++;
  }

  return curr.join("");
}

function buildObjProperty(str) {
  const property = [];

  while (property.length < 2) {
    const item = parseValue(str);
    str = str.substring(item.length + 2);

    property.push(item);
  }

  return {
    property: {
      [property[0]]: property[1],
    },
    str,
  };
}

function buildObject(str) {
  const result = buildObjProperty(str);

  console.log(result);

  buildObjProperty(result.str);
}

buildObject(str);
