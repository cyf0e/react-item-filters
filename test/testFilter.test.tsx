import { FilterProvider } from "../src/components/FilterProvider";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { DataContainer, FilterBase } from "../src/lib/filtering";
import "@testing-library/jest-dom/extend-expect";
import { useFilter } from "../src/hooks/useFilter";
import { useCheckboxFilter } from "../src/hooks/useCheckboxFilter";
import { SearchFilter } from "../src/lib/searchFilter";
import { useSearchFilter } from "../src/hooks/useSearchFilter";
import React from "react";
import { CheckboxPropType } from "../src/lib/checkboxFilter";
import { cleanPossibleValue } from "../src/lib/util";
const testData = [
  { firstName: "Michael", lastName: "Guy" },
  { firstName: "Peter", lastName: "Parker" },
];
type TestItem = typeof testData extends Array<infer R> ? R : undefined;
const GenericCheckBoxComponent = ({
  labelValue,
  filterChangeFunction,
}: CheckboxPropType<any>) => {
  return (
    <div>
      <input id={labelValue} type="checkbox" onChange={filterChangeFunction} />
      <label data-testid="labelElements" htmlFor={labelValue}>
        {labelValue}
      </label>
    </div>
  );
};
test("assign invalid data context to FilterBase throws error", () => {
  const fb = () =>
    new FilterBase([] as unknown as any, (el: any) => false).getDataContext();
  expect(fb).toThrowError();
  expect(() => {
    return new FilterBase(
      undefined as unknown as any,
      () => false
    ).getDataContext();
  }).toThrowError();
});
test("assigns data to DataContainer", () => {
  const c = new DataContainer([1, 2, 3, 4, 5]);
  expect(c.data).toStrictEqual([1, 2, 3, 4, 5]);
});
test("assign some invalid initial data to DataContainer throws error", () => {
  expect(() => new DataContainer(undefined as unknown as any[])).toThrowError(
    "Initial Data is undefined."
  );
});
test("assigning empty filter to DataContainer throws error", () => {
  const c = new DataContainer(testData);
  expect(() => c.addFilter(undefined as unknown as () => false)).toThrowError(
    "Filter function is undefined"
  );
});
test("DataContainer filtering properly filters data", () => {
  const c = new DataContainer<number>([1, 2, 3, 4, 5]);
  c.addFilter((n: number) => {
    return n > 3;
  });
  expect(c.getFilteredData()).toStrictEqual([4, 5]);
});

test("useCheckbox returns valid components", () => {
  function TestComponent() {
    const components = useCheckboxFilter((el: string) => {
      return el;
    }, GenericCheckBoxComponent);

    return <div>{components}</div>;
  }
  const data = ["red", "blue"];
  const items = render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={data}>{children}</FilterProvider>;
    },
  });
  const inputs = items.getAllByRole("checkbox") as HTMLInputElement[];
  expect(items.getByText("Red")).toContainHTML(
    '<label data-testid="labelElements" for="Red">Red</label>'
  );
  expect(items.getByText("Blue")).toContainHTML(
    '<label data-testid="labelElements" for="Blue">Blue</label>'
  );
  inputs.forEach((ie, i) => {
    expect(ie).toContainHTML(
      `<input id="${
        data[i][0].toUpperCase() + data[i].slice(1)
      }" type="checkbox" />`
    );
  });
});

test("Provider provides initial data", () => {
  const filteredData = renderHook(() => useFilter(), {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={testData}>{children}</FilterProvider>;
    },
  });
  expect(filteredData.result.current).toStrictEqual(testData);
});

test("Two different providers provide different data", () => {
  const filteredData = renderHook(() => useFilter(), {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={testData}>{children}</FilterProvider>;
    },
  });

  const filteredData2 = renderHook(() => useFilter(), {
    wrapper: ({ children }: { children?: any }) => {
      return (
        <FilterProvider initialData={[{ hello: "world" }]}>
          {children}
        </FilterProvider>
      );
    },
  });
  expect(filteredData.result.current).toStrictEqual(testData);
  expect(filteredData2.result.current).toStrictEqual([{ hello: "world" }]);
});

test("useCheckboxFilter Checking that a checkbox filters out the unchecked items", async () => {
  function TestComponent() {
    const filteredData: string[] = useFilter();
    const components = useCheckboxFilter((el: string) => {
      return el;
    }, GenericCheckBoxComponent);

    return (
      <div>
        {components}
        <div>
          {filteredData.map((e: string) => {
            return (
              <h1 data-testid={e} key={e}>
                {e}
              </h1>
            );
          })}
        </div>
      </div>
    );
  }
  const items = render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return (
        <FilterProvider initialData={["red", "blue"]}>
          {children}
        </FilterProvider>
      );
    },
  });
  expect(screen.getByTestId("red")).toContainHTML(
    "<h1 data-testid='red'>red</h1>"
  );
  expect(screen.getByTestId("blue")).toContainHTML(
    "<h1 data-testid='blue'>blue</h1>"
  );
  fireEvent.click(screen.getByLabelText("Red"));
  expect(screen.queryByTestId("blue")).toBeFalsy();
  expect(screen.queryByTestId("red")).toContainHTML(
    '<h1 data-testid="red">red</h1>'
  );
});
test("useCheckbox No selected checkbox displays all items", () => {
  function TestComponent() {
    const fd: TestItem[] = useFilter();
    const checkboxes = useCheckboxFilter(
      (el: TestItem) => el.firstName,
      GenericCheckBoxComponent
    );
    return (
      <div>
        {checkboxes}
        {fd.map((e) => (
          <h1 key={e.firstName}>{e.firstName}</h1>
        ))}
      </div>
    );
  }
  const res = render(<TestComponent />, {
    wrapper: ({ children }) => (
      <FilterProvider initialData={testData}>{children}</FilterProvider>
    ),
  });

  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Michael");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Peter");
});
test("Unselected checkbox displays hidden items again", () => {
  function TestComponent() {
    const fd: TestItem[] = useFilter();
    const checkboxes = useCheckboxFilter(
      (el: TestItem) => el.firstName,
      GenericCheckBoxComponent
    );
    return (
      <div>
        {checkboxes}
        {fd.map((e) => (
          <h1 key={e.firstName}>{e.firstName}</h1>
        ))}
      </div>
    );
  }
  const res = render(<TestComponent />, {
    wrapper: ({ children }) => (
      <FilterProvider initialData={testData}>{children}</FilterProvider>
    ),
  });

  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  fireEvent.click(screen.getByLabelText("Peter"));

  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getByRole("heading")).toHaveTextContent("Peter");
  fireEvent.click(screen.getByLabelText("Peter"));

  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Michael");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Peter");
});
test("useCheckbox works with nameMap", () => {
  function TestComponent() {
    const fd: TestItem[] = useFilter();
    const checkboxes = useCheckboxFilter(
      (el: TestItem) => el.firstName,
      GenericCheckBoxComponent,
      new Map([
        ["Peter", "Pete"],
        ["Michael", "Mike"],
      ])
    );
    return (
      <div>
        {checkboxes}
        {fd.map((e) => (
          <h1 key={e.firstName}>{e.firstName}</h1>
        ))}
      </div>
    );
  }
  const res = render(<TestComponent />, {
    wrapper: ({ children }) => (
      <FilterProvider initialData={testData}>{children}</FilterProvider>
    ),
  });

  expect(screen.getAllByTestId("labelElements")).toHaveLength(2);
  expect(screen.getAllByTestId("labelElements")[0]).toHaveTextContent("Pete");
  expect(screen.getAllByTestId("labelElements")[1]).toHaveTextContent("Mike");
  fireEvent.click(screen.getByLabelText("Pete"));
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getByRole("heading")).toHaveTextContent("Peter");
});
//TODO: split this test up into different tests, add tests to check if proper component is being returned
test("search filter component", () => {
  const searchFilterComp = ({
    filterChangeFunction,
  }: {
    filterChangeFunction: any;
  }) => {
    return (
      <div>
        <h1>Search</h1>
        <input type="text" onChange={filterChangeFunction} />
      </div>
    );
  };
  const dc = new DataContainer(["red", "white"]);
  const sf = new SearchFilter(dc, (el) => {
    return el;
  });
  const comp = sf.addSearchFilter(searchFilterComp);
  const res = render(<div>{comp}</div>);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "white" },
  });
  expect(dc.getFilteredData()).toEqual(["white"]);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "red" },
  });
  expect(dc.getFilteredData()).toEqual(["red"]);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "" },
  });
  expect(dc.getFilteredData()).toEqual(["red", "white"]);
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "r" },
  });
  expect(dc.getFilteredData()).toEqual(["red"]);
});

test("useSearchFilter hook", () => {
  const TestComponent = () => {
    const fd: TestItem[] = useFilter();
    const searchComp = useSearchFilter((el: TestItem) => {
      return el.firstName;
    });
    return (
      <div>
        {searchComp}
        {fd.map((f) => {
          return <h1 key={f.firstName}>{f.firstName}</h1>;
        })}
      </div>
    );
  };
  const res = render(<TestComponent />, {
    wrapper: ({ children }) => (
      <FilterProvider initialData={testData}>{children}</FilterProvider>
    ),
  });
  expect(screen.getByRole("textbox")).toContainHTML('<input type="text"/>');
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "peter" } });
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getByRole("heading")).toContainHTML("<h1>Peter</h1>");
});
test("useSearchFilter hook with array of strings returned from the selector function ", () => {
  const TestComponent = () => {
    const fd: TestItem[] = useFilter();
    const searchComp = useSearchFilter((el: TestItem) => {
      return [el.firstName, el.lastName];
    });
    return (
      <div>
        {searchComp}
        {fd.map((f) => {
          return <h1 key={f.firstName}>{f.firstName}</h1>;
        })}
      </div>
    );
  };
  const res = render(<TestComponent />, {
    wrapper: ({ children }) => (
      <FilterProvider initialData={testData}>{children}</FilterProvider>
    ),
  });

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "a" } });
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("Michael");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("Peter");
});

test("Clean possible values returns nicely parsed names", () => {
  const cleanPossibleValues = ["red", "blue", "light_blue"].map((pv) => {
    return cleanPossibleValue(pv);
  });
  expect(cleanPossibleValues).toEqual(["Red", "Blue", "Light Blue"]);
  //if possible value isnt a string do nothing
  expect(cleanPossibleValue({ a: 2 })).toEqual({ a: 2 });
});
test("unsupported possible values throw error", () => {
  const dc = new DataContainer(["a", "b", 2]);
  expect(() => {
    dc.getPossibleValues((el: any) => el);
  }).toThrowError(
    "A value returned from the selector function is not of type string. Only strings are curently supported."
  );
});
