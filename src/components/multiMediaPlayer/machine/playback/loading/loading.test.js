import { mediaStates } from "./media";
import { loadingStates } from "./index";

jest.mock("./media");

describe("SUB-STATE: loading", () => {
  it("returns a loading sub-state composed of parallel mediaStates", () => {
    mediaStates.mockImplementation(jest.fn((id) => `${id}_states`));

    const ids = ["sax", 13];
    const expectedStates = {
      type: "parallel",
      states: {
        media_sax: "sax_states",
        media_13: "13_states",
      },
    };

    expect(loadingStates(ids)).toEqual(expectedStates);
  });
});
