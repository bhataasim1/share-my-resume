import React, { useEffect, useState } from "react";
import Select, { components, ControlProps, OptionProps } from "react-select";
import { on } from "events";

export interface DropdownOption {
  label: string;
  value: string | number | boolean;
  onClick?: (e: any) => void;
  disabled?: boolean;
  visible?: boolean;
  route?: string;
  confirm?: boolean | any;
}

export interface FormSelectInputProps {
  onChange: (value: any | any[]) => void;
  placeholder?: string;
  value?: string | string[] | number | number[];
  options?: DropdownOption[]; //how to define the Type here...
  animated?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  create?: boolean;
  onClickCreate?: () => void;
}
// Ref<Select<DropdownOption, boolean, GroupBase<any>>>
export const FormSelectInput = React.forwardRef<any, FormSelectInputProps>(
  (
    {
      onChange,
      placeholder,
      value,
      options = [],
      animated,
      multiple = false,
      searchable = false,
      create = false,
      onClickCreate,
      ...props
    }: FormSelectInputProps,
    ref
  ) => {
    const [selectedItems, setSelectedItems] = useState<DropdownOption[]>([]);

    const handleOnChange = (
      selectedOption: DropdownOption | DropdownOption[]
    ) => {
      // Initialize final selected items based on the type of selected option
      const finalValues = Array.isArray(selectedOption)
        ? selectedOption
        : [selectedOption];

      // Update state and call onChange with the values of the selected items
      setSelectedItems(finalValues);
      onChange(finalValues.map((option) => option.value.toString()));
    };

    useEffect(() => {
      if (!value) {
        setSelectedItems([]); // Set selectedItems to empty array if value is empty
        return;
      }
      let finalValue: DropdownOption[] = [];

      // Attempt to parse the value if it's a string, otherwise log an error
      if (typeof value === "string") {
        try {
          //eslint-disable-next-line
          value = JSON.parse(value);
        } catch (e) {
          console.error(
            "Error parsing JSON value in FormSelectInput component",
            e
          );
          value = [];
        }
      }

      if (Array.isArray(value)) {
        finalValue = options.filter((option) =>
          (value as string[]).includes(option.value.toString())
        );
      }
      if (typeof value === "number") {
        finalValue = options.filter((option) => option.value === value);
      }
      setSelectedItems(finalValue);
    }, [value, options, multiple]);

    // Custom Control component as previously defined
    const CustomControl = (props: ControlProps<any>) => (
      <components.Control {...props} />
    );

    const CustomMenuList = (props: any) => {
      return (
        <components.MenuList {...props}>
          {create && (
            <components.Option
              {...props}
              innerProps={{
                ...props.innerProps,
                style: {
                  marginBottom: "8px",
                  width: "100%",
                  borderWidth: "1px",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "center",
                },
                onClick: () => onClickCreate && onClickCreate(),
              }}
            >
              Create New
            </components.Option>
          )}
          {props.children}
        </components.MenuList>
      );
    };

    const customComponents = {
      Control: CustomControl,
      MenuList: CustomMenuList,
    };

    const customStyles = {
      option: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused
          ? "hsl(var(--background))"
          : "hsl(var(--foreground))",
        backgroundColor: state.isFocused
          ? "hsl(var(--foreground))"
          : "hsl(var(--background))",
        "&:active": {
          backgroundColor: state.isFocused
            ? "hsl(var(--foreground))"
            : "hsl(var(--background))",
        },
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "var(--card)",
        "&:hover": { borderColor: "var(--input)" },
        boxShadow: state.isFocused ? "var(--ring)" : "none",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "var(--foreground)",
        backgroundColor: "var(--card-foreground)",
      }),
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "var(--card-foreground)",
        boxShadow: state.isFocused ? "none" : "none",
      }),
      menu: (provided: any) => ({
        ...provided,
        backgroundColor: "hsl(var(--background))",
        boxShadow: "none",
      }),
      menuList: (provided: any) => ({
        ...provided,
        backgroundColor: "var(--foreground)",
      }),
    };

    return (
      <>
        {/*<div>{JSON.stringify(selectedItems)}</div>*/}
        <Select
          ref={ref}
          onChange={handleOnChange as any}
          placeholder={placeholder}
          defaultValue={selectedItems}
          value={selectedItems}
          styles={customStyles}
          options={options}
          components={customComponents}
          isMulti={multiple}
          openMenuOnClick={true}
          openMenuOnFocus={true}
          isSearchable={searchable}
          {...props}
          theme={(theme) => ({
            ...theme,

            colors: {
              ...theme.colors,
              primary25: "white",
              primary: "bg-background",
            },
          })}
        ></Select>
      </>
    );
  }
);

FormSelectInput.displayName = "FormSelectInput";
