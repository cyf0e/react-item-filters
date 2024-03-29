import React, { useEffect, useState } from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { cleanPossibleValue } from "../src/lib/util";
import {
  useCheckboxFilter,
  useFilter,
  useSearchFilter,
  DataContainer,
  FilterBase,
  FilterProvider,
  useClearFilter,
  CheckboxFilterProps,
  SearchFilterProps,
} from "../src/index";

jest.useFakeTimers();
const getTestPromiseData = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(["red", "blue"]);
    }, 1000);
  });

const testData = [
  { firstName: "Michael", lastName: "Guy" },
  { firstName: "Peter", lastName: "Parker" },
];
type TestItem = typeof testData extends Array<infer R> ? R : undefined;
const GenericCheckBoxComponent = ({
  setChecked,
  label,
  subscribe,
}: CheckboxFilterProps) => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (subscribe) {
      return subscribe("filterClear", () => setCheck(false));
    }
  }, [subscribe]);
  return (
    <div key={Math.random()}>
      <input
        id={label}
        type="checkbox"
        checked={check}
        onChange={(e) => {
          setCheck(!check);
          setChecked(label, e.currentTarget.checked);
        }}
      />
      <label data-testid="labelElements" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};
const GenericSearchComponent = (props: SearchFilterProps) => {
  return (
    <input
      type="text"
      onChange={(e) => props.setSearchString(e.currentTarget.value)}
    ></input>
  );
};
test("assign invalid data context to FilterBase throws error", () => {
  const fb = () =>
    new FilterBase({
      dataContainer: undefined as unknown as any,
      filterFunction: (el: any) => false,
      name: "anyname",
      filterClearFunction: () => {},
      filterGetValueFunction: () => {},
    }).getDataContainer();
  expect(fb).toThrowError();
  expect(() => {
    return new FilterBase({
      dataContainer: undefined as unknown as any,
      filterFunction: () => false,
      name: "name2",
      filterClearFunction: () => {},
      filterGetValueFunction: () => {},
    }).getDataContainer();
  }).toThrowError();
});
test("assigns data to DataContainer", () => {
  const c = new DataContainer({ data: [1, 2, 3, 4, 5] });
  expect(c.getInitialData()).toStrictEqual([1, 2, 3, 4, 5]);
});
test("assign some invalid initial data to DataContainer throws error", () => {
  expect(
    () => new DataContainer({ data: undefined as unknown as any[] })
  ).toThrowError("Initial Data is undefined.");
});
test("assigning empty filter to DataContainer throws error", () => {
  const c = new DataContainer({ data: testData });
  expect(() => c.addFilter(undefined as unknown as any)).toThrowError(
    "Filter function is undefined"
  );
});
test("DataContainer filtering properly filters data", () => {
  const c = new DataContainer<number>({ data: [1, 2, 3, 4, 5] });
  c.addFilter(
    new FilterBase({
      dataContainer: c,
      filterFunction: (n: number) => {
        return n > 3;
      },
      name: "testrandom",
      filterClearFunction: () => {},
      filterGetValueFunction: () => {},
    })
  );
  expect(c.getFilteredData()).toStrictEqual([4, 5]);
});
test("useCheckbox returns valid labels", () => {
  function TestComponent() {
    const components = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: string) => {
        return el;
      },
    });
    const labels = Array.from(components.labels ?? []);
    return (
      <div>
        {labels.map((label, i) => (
          <h1 key={i}>{label}</h1>
        ))}
      </div>
    );
  }
  const data = ["red", "blue"];
  const items = render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={data}>{children}</FilterProvider>;
    },
  });
  const labels = items.getAllByRole("heading");
  expect(labels).toHaveLength(2);
  expect(labels[0]).toHaveTextContent("Red");
  expect(labels[1]).toHaveTextContent("Blue");
});
test("useSearchFilter hook", () => {
  const TestComponent = () => {
    const fd = useFilter<TestItem>();
    const searchComp = useSearchFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => {
        return el.firstName;
      },
    });
    return (
      <div>
        <input
          onChange={(e) => {
            searchComp.setSearchString(e.currentTarget.value);
          }}
        ></input>
        {fd.data.map((f) => {
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
  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "peter" } });
  expect(screen.getByRole("textbox")).toHaveValue("peter");
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getByRole("heading")).toContainHTML("<h1>Peter</h1>");
});

test("DataContainer clearing all filters shows all data", () => {
  function TestComponent() {
    const clearAllFilters = useClearFilter();
    const fd = useFilter<string>();
    const components = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: string) => {
        return el;
      },
    });
    return (
      <div>
        <button
          onClick={() => {
            clearAllFilters();
          }}
        >
          Clear
        </button>
        {components.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={components.setChecked}
              subscribe={components.subscribe}
            />
          ) : null
        )}
        {fd.data.map((el) => (
          <h1 key={el}>{el}</h1>
        ))}
      </div>
    );
  }
  const data = ["red", "blue", "green"];
  const items = render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={data}>{children}</FilterProvider>;
    },
  });
  const button = screen.getByRole("button");
  expect(screen.getAllByRole("heading")).toHaveLength(3);
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  screen.getAllByRole("heading").forEach((heading) => {
    expect(heading.innerHTML).toEqual("red");
  });
  fireEvent.click(button);
  expect(screen.getAllByRole("heading")).toHaveLength(3);
  expect(screen.getAllByRole("heading")[0].innerHTML).toEqual("red");
  expect(screen.getAllByRole("heading")[1].innerHTML).toEqual("blue");
  expect(screen.getAllByRole("heading")[2].innerHTML).toEqual("green");
  expect(screen.getAllByRole("heading")[3]).toBeUndefined();

  //make sure filtering still works after
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  screen.getAllByRole("heading").forEach((heading) => {
    expect(heading.innerHTML).toEqual("red");
  });
});

test("Provider provides initial data", () => {
  const filteredData = renderHook(() => useFilter(), {
    wrapper: ({ children }: { children?: any }) => {
      return <FilterProvider initialData={testData}>{children}</FilterProvider>;
    },
  });
  expect(filteredData.result.current.data).toStrictEqual(testData);
});

test("Provider doesnt throw when initial data is []", () => {
  const renderProvider = () => {
    renderHook(() => useFilter(), {
      wrapper: ({ children }: { children?: any }) => {
        return <FilterProvider initialData={[]}>{children}</FilterProvider>;
      },
    });
  };
  expect(renderProvider).not.toThrow();
});

test("Passing a non array to Provider as inital data throws error", () => {
  //First two lines are a hack to disable error output from render()
  //https://stackoverflow.com/questions/64045789/stop-huge-error-output-from-testing-library

  const errorObject = console.error; //store the state of the object
  console.error = jest.fn(); // mock the object

  function TestComponent() {
    const fd = useFilter<TestItem>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => el.firstName,

      nameMap: new Map([
        ["Peter", "Pete"],
        ["Michael", "Mike"],
      ]),
    });
    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}
        {fd.data.map((e) => (
          <h1 key={e.firstName}>{e.firstName}</h1>
        ))}
      </div>
    );
  }
  const res = () => {
    render(
      <FilterProvider initialData={{ a: "red" } as unknown as any[]}>
        <TestComponent />
      </FilterProvider>
    );
  };

  expect(res).toThrowError();

  console.error = errorObject;
});
test("Async initial state update sets new state correctly", async () => {
  function TestComponent() {
    const fd = useFilter<string>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: string) => el,
    });

    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}
        {fd.data.map((e) => (
          <h1 key={e}>{e}</h1>
        ))}
      </div>
    );
  }
  const ParentComponent = ({ children }: { children: any }) => {
    const [startData, setStartData] = useState<any>([]);
    useEffect(() => {
      getTestPromiseData().then((res) => {
        act(() => {
          setStartData(res);
        });
      });
    }, []);
    return <FilterProvider initialData={startData}>{children}</FilterProvider>;
  };
  const res = render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return <ParentComponent>{children}</ParentComponent>;
    },
  });
  expect(screen.queryAllByRole("heading")).toHaveLength(0);
  jest.runAllTimers();
  await waitFor(() => res.getAllByRole("heading"));
  expect(screen.queryAllByRole("heading")).toHaveLength(2);
  expect(screen.queryAllByRole("heading")[0].innerHTML).toEqual("red");
  expect(screen.queryAllByRole("heading")[1].innerHTML).toEqual("blue");
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
  expect(filteredData.result.current.data).toStrictEqual(testData);
  expect(filteredData2.result.current.data).toStrictEqual([{ hello: "world" }]);
});

test("useCheckboxFilter Checking that a custom checkbox filters out the unchecked items", async () => {
  function TestComponent() {
    const filteredData = useFilter<string>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: string) => {
        return el;
      },
    });

    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}

        <div>
          {filteredData.data.map((e: string) => {
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
  render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return (
        <FilterProvider initialData={["red", "blue"]}>
          {children}
        </FilterProvider>
      );
    },
  });

  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("blue");
  fireEvent.click(screen.getByLabelText("Red"));
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
  expect(screen.queryByTestId("blue")).toBeFalsy();
});
test("useCheckboxFilter default checkbox filters out the unchecked items", async () => {
  function TestComponent() {
    const filteredData = useFilter<string>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: string) => {
        return el;
      },
    });
    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}

        <div>
          {filteredData.data.map((e: string) => {
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
  render(<TestComponent />, {
    wrapper: ({ children }: { children?: any }) => {
      return (
        <FilterProvider initialData={["red", "blue"]}>
          {children}
        </FilterProvider>
      );
    },
  });
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("blue");
  fireEvent.click(screen.getByLabelText("Red"));
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
  expect(screen.queryByTestId("blue")).toBeFalsy();
});
test("useCheckbox No selected checkbox displays all items", () => {
  function TestComponent() {
    const fd = useFilter<TestItem>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => el.firstName,
    });
    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}
        {fd.data.map((e) => (
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
    const fd = useFilter<TestItem>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => el.firstName,
    });
    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}
        {fd.data.map((e) => (
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
    const fd = useFilter<TestItem>();
    const checkboxes = useCheckboxFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => el.firstName,
      nameMap: new Map([
        ["Peter", "Pete"],
        ["Michael", "Mike"],
      ]),
    });
    return (
      <div>
        {checkboxes.labels.map((label) =>
          label ? (
            <GenericCheckBoxComponent
              key={label}
              label={label}
              setChecked={checkboxes.setChecked}
              subscribe={checkboxes.subscribe}
            />
          ) : null
        )}
        {fd.data.map((e) => (
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
  const Test = () => {
    const fd = useFilter<string>();
    const sf = useSearchFilter({
      name: "randomSearchFilter",
      selectorFunction: (el: string) => {
        return el;
      },
    });
    return (
      <>
        <GenericSearchComponent
          subscribe={sf.subscribe}
          setSearchString={sf.setSearchString}
        />
        {fd.data.map((c: string) => (
          <h1 key={c}>{c}</h1>
        ))}
      </>
    );
  };
  const res = render(
    <div>
      <FilterProvider initialData={["red", "white"]}>
        <Test />
      </FilterProvider>
    </div>
  );
  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "white" },
  });
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("white");

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "red" },
  });
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "" },
  });
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
  expect(screen.getAllByRole("heading")[1]).toHaveTextContent("white");

  fireEvent.change(screen.getByRole("textbox"), {
    target: { value: "r" },
  });
  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getAllByRole("heading")[0]).toHaveTextContent("red");
});

test("useSearchFilter hook with fuzzy search", () => {
  const TestComponent = () => {
    const fd = useFilter<TestItem>();
    const searchComp = useSearchFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => {
        return el.firstName;
      },

      fuzzy: true,
    });
    return (
      <div>
        <GenericSearchComponent
          subscribe={searchComp.subscribe}
          setSearchString={searchComp.setSearchString}
        />
        {fd.data.map((f) => {
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
  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(screen.getAllByRole("heading")).toHaveLength(2);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "ptr" } });

  expect(screen.getByRole("textbox")).toHaveValue("ptr");

  expect(screen.getAllByRole("heading")).toHaveLength(1);
  expect(screen.getByRole("heading")).toContainHTML("<h1>Peter</h1>");
});
test("useSearchFilter hook with array of strings returned from the selector function ", () => {
  const TestComponent = () => {
    const fd = useFilter<TestItem>();
    const searchComp = useSearchFilter({
      name: "somerandomName",
      selectorFunction: (el: TestItem) => {
        return [el.firstName, el.lastName];
      },
    });
    return (
      <div>
        <GenericSearchComponent
          setSearchString={searchComp.setSearchString}
          subscribe={searchComp.subscribe}
        />
        {fd.data.map((f) => {
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
  const dc = new DataContainer({ data: ["a", "b", 2] });
  expect(() => {
    dc.getPossibleValues((el: any) => el);
  }).toThrowError(
    "A value returned from the selector function is not of type string. Only strings are curently supported."
  );
});
