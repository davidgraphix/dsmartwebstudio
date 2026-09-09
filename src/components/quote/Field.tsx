"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const CONTROL =
  "w-full rounded-xl border bg-white px-4 text-[15px] text-ink transition-all duration-200 " +
  "placeholder:text-ink/30 focus:outline-none";

const STATE = {
  idle: "border-line focus:border-navy focus:ring-4 focus:ring-navy/10",
  error: "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/12",
} as const;

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink">
        {children}
        {required ? (
          <span className="ml-1 text-navy" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-[11px] font-normal text-ink/35">optional</span>
        )}
      </label>
      {hint ? <span className="text-[11.5px] text-ink/35">{hint}</span> : null}
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-red-600">
      <Icon name="close" size={12} className="shrink-0" />
      {message}
    </p>
  );
}

export function TextField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  const reactId = useId();
  const id = props.id || reactId;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, "h-12", error ? STATE.error : STATE.idle)}
        {...props}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  const reactId = useId();
  const id = props.id || reactId;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, "resize-y py-3 leading-relaxed", error ? STATE.error : STATE.idle)}
        {...props}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  error,
  required,
  options,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  const reactId = useId();
  const id = props.id || reactId;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            CONTROL,
            "h-12 cursor-pointer appearance-none pr-10",
            error ? STATE.error : STATE.idle,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink/40"
        />
      </div>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

/** Large tappable radio card used for the service, budget and timeline steps. */
export function OptionCard({
  checked,
  label,
  description,
  name,
  value,
  onChange,
}: {
  checked: boolean;
  label: string;
  description?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-200",
        checked
          ? "border-navy bg-navy/4 shadow-[0_10px_28px_-18px_rgba(2,22,127,0.6)]"
          : "border-line bg-white hover:border-navy/30 hover:bg-navy/[0.02]",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
          checked ? "border-navy bg-navy text-white" : "border-line group-hover:border-navy/40",
        )}
      >
        {checked ? <Icon name="check" size={11} strokeWidth={3} /> : null}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block text-[14px] leading-snug font-semibold",
            checked ? "text-navy" : "text-ink",
          )}
        >
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-[12.5px] text-ink/50">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
