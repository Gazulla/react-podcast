import { formatDuration } from "./utils/miscFunctions";

test("sformatDuration", () => {
  const formatedDate = formatDuration("45185521");
  expect(formatedDate).toBe("46:33");
});
