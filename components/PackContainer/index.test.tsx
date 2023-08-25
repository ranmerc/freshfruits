import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PackContainer from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFetchPrice from "@/hooks/useFetchPrice";
import { ReactNode } from "react";

// telling jest to load the mock implementation from __mocks__
jest.mock("@/hooks/useFetchPrice");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// satisfying ts error no mockImplementation
const mocked = useFetchPrice as jest.Mock;

describe("Pack container", () => {
  test("Renders loading view", () => {
    mocked.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
      isSuccess: false,
    }));
    render(<PackContainer id={1} />, { wrapper });

    expect(
      screen.getByRole("progressbar", { name: "Loading prices" })
    ).toBeInTheDocument();
  });

  test("Renders error view", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
      isSuccess: false,
    }));
    render(<PackContainer id={1} />, { wrapper });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Unable to load prices!")).toBeInTheDocument();
  });

  test("Renders heading", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        packs: [
          {
            type: "count",
            quantity: 1,
            price: 70,
            discountPrice: 70,
            inStock: true,
          },
          {
            type: "count",
            quantity: 6,
            price: 400,
            discountPrice: 300,
            inStock: false,
          },
        ],
      },
      isSuccess: true,
    }));

    render(<PackContainer id={1} />);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  test("Renders price packs", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        packs: [
          {
            type: "count",
            quantity: 1,
            price: 70,
            discountPrice: 70,
            inStock: true,
          },
          {
            type: "count",
            quantity: 6,
            price: 400,
            discountPrice: 300,
            inStock: false,
          },
        ],
      },
      isSuccess: true,
    }));

    render(<PackContainer id={1} />);

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
  });
});
