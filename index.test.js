import React from "react";
import { render, cleanup } from "react-testing-library";

import { useTrackingIsLoaded } from "./src/index.js";

function EffectfulComponent() {
  const [status, error] = useTrackingIsLoaded();
  return (
    <>
        <div>
            {status ? "Loaded" : "Not Loaded"}      
        </div>
        <div>
            {error ? "Error" : null}
        </div>
    </>
  );
}

window.requestAnimationFrame = fn => setTimeout(fn, 16);
window.cancelAnimationFrame = id => clearTimeout(id);

jest.useFakeTimers();

afterEach(() => {
  cleanup();
  window.ga = undefined;
});

test("it renders the Not loaded message", () => {
  const { container } = render(<EffectfulComponent />);
  const div = container.firstChild;
  expect(div.textContent).toBe("Not Loaded");
});

test("it renders the loaded message if GA has been already loaded", () => {
  window.ga = jest.fn();
  const { container } = render(<EffectfulComponent />);
  const div = container.firstChild;
  expect(div.textContent).toBe("Loaded");
});

test("it renders the loaded message after GA has finished loading", () => {
  const { container, rerender } = render(<EffectfulComponent />);
  const div = container.firstChild;
  expect(div.textContent).toBe("Not Loaded");
  window.ga = jest.fn();
  rerender(<EffectfulComponent />);
  jest.runOnlyPendingTimers();
  expect(div.textContent).toBe("Loaded");
});

test("it renders the error message if GA hasn't finished loading in time", () => {
    const { container, rerender } = render(<EffectfulComponent />);
    const div = container.firstChild;
    const divError = container.lastChild;
    expect(div.textContent).toBe("Not Loaded");
    jest.runOnlyPendingTimers();
    expect(divError.textContent).toBe("Error");
  });
