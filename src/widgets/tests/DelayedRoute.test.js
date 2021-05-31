import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DelayedRoutes from "../DelayedRoutes";

it("Renders the delayed route widget component", async () => {
  /**
   * Test plan:
   * - Verify widget is rendered
   * - check content in widget is rendered
   * - Click to collapse the widget
   * - check data content is not visible now
   * - Click to expand the widget
   * - check content in widget is rendered
   */
  render(<DelayedRoutes />);
  let widgetHeading = screen.getByText(/delayed routes/i)
  expect(widgetHeading).toBeInTheDocument();

  let item = screen.getByText(/Western Ring Rd/i)
  expect(item).toBeInTheDocument();

  // Lets collapse the component now
  userEvent.click(widgetHeading);

  // Wait for animation to complete and verify element to be null
  await waitFor(() => expect(screen.queryByText(/Western Ring Rd/i)).toBeNull());

  // Lets expand the component now
  userEvent.click(widgetHeading);

  // Wait for animation to complete and verify element to be in the document
  await waitFor(() => expect(screen.queryByText(/Western Ring Rd/i)).toBeInTheDocument());
});
