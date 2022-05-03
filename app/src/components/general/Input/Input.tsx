import React, { forwardRef } from 'react';
import { TChangeElHandler } from '$types/common';

export type IInputProps = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  id?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: TChangeElHandler<HTMLInputElement>;
  accept?: string;
  testid?: string;
  submitBtnText?: string;
  isControlled?: boolean;
};

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type,
      name,
      placeholder,
      value,
      id,
      required,
      className,
      disabled,
      checked,
      onChange,
      accept,
      testid,
      submitBtnText,
      isControlled = false,
    }: IInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={submitBtnText ? submitBtnText : isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : value}
      id={id}
      required={required}
      className={className}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      ref={ref}
      accept={accept}
      data-testid={testid}
    />
  )
);

export default Input;
