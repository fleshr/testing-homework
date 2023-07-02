require("hermione");
const { adaptiveTest } = require("./test-utils/adaptiveTest");

describe("Главная:", function () {
  const path = `http://localhost:3000/hw/store?bug_id=${
    process.env.BUG_ID || 0
  }`;

  adaptiveTest(path);
});
