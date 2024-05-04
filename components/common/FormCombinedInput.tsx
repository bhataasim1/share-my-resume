"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ModelFormInputType } from "@/types/types";
import { Button } from "../ui/button";

export interface FormCombinedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rows?: number;
  variant?: "outlined" | "filled" | "standard";
  type?: ModelFormInputType;
  dataTestId?: string;
  disabled?: boolean;
}

export const FormCombinedInput = React.forwardRef<
  HTMLInputElement,
  FormCombinedInputProps
>(
  (
    {
      className,
      type,
      rows = 1,
      variant = "outlined",
      dataTestId,
      disabled,
      ...props
    },
    ref
  ) => {
    const isTextarea = rows && rows > 1;
    const isPasswordInput = type === "password";

    const [showPassword, setShowPassword] = useState(false);

    const inputElement = isTextarea ? (
      // @ts-ignore
      <Textarea
        rows={rows}
        disabled={disabled}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    ) : isPasswordInput ? (
      <div className="relative">
        <Input
          disabled={disabled}
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
          ref={ref}
        />
        {/* Your custom password visibility toggle button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
      </div>
    ) : (
      <Input
        disabled={disabled}
        type={type || "text"}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );

    return isTextarea || isPasswordInput ? (
      <div className="relative">{inputElement}</div>
    ) : (
      inputElement
    );
  }
);

FormCombinedInput.displayName = "FormCombinedInput";
