require("hermione");
const { adaptiveTest } = require("./test-utils/adaptiveTest");

describe("Доставка:", function () {
  const path = `http://localhost:3000/hw/store/delivery?bug_id=${
    process.env.BUG_ID || 0
  }`;

  adaptiveTest(path);
});
