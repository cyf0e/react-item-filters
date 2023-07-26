import React, { useEffect, useRef, useState } from "react";
export const GenericCheckBoxComponent = ({
  setChecked,
  label,
  onFilterClear,
}: any) => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (onFilterClear) {
      return onFilterClear(() => setCheck(false));
    }
  }, []);
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
export const GenericSearchComponent = (props: any) => {
  useEffect(() => {
    return props.onFilterClear(() => {
      if (sref.current) {
        sref.current.value = "";
      }
    });
  }, []);
  const sref = useRef<HTMLInputElement>(null);
  return (
    <input
      ref={sref}
      type="text"
      onChange={(e) => {
        props.setSearchString(e.currentTarget.value);
      }}
    ></input>
  );
};
