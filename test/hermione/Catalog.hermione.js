require("hermione");
const { adaptiveTest } = require("./test-utils/adaptiveTest");

describe("Каталог:", function () {
  const path = `http://localhost:3000/hw/store/catalog?bug_id=${
    process.env.BUG_ID || 0
  }`;

  adaptiveTest(path);
});
