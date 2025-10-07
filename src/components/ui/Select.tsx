import React from "react";
import { cn } from "../../utils/cn";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  options?: SelectOption[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variant = "default",
      size = "md",
      id,
      children,
      options,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    const baseClasses =
      "w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      default: "bg-card border border-line text-foreground",
      outline: "bg-transparent border-2 border-line text-foreground",
      filled: "bg-gray-100 dark:bg-gray-800 border-0 text-foreground",
    } as const;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-5 py-3 text-lg rounded-lg",
    } as const;

    const selectClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      error && "border-red-500 focus:ring-red-500",
      className
    );

    const hasProvidedOptions = Array.isArray(options) && options.length > 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        <select id={selectId} className={selectClasses} ref={ref} {...props}>
          {hasProvidedOptions
            ? options!.map((opt) => (
                <option key={`${opt.value}`} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

export { Select };
