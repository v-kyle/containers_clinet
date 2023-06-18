import React, { ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import htmlClasses from 'html-classes';
import Icon from '../Icon';

interface TextInputPros {
  value?: string;
  onChange?: (s: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  isTextarea?: boolean;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  containerStyle?: React.CSSProperties;
  onClean?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  defaultValue?: string;
  maxLength?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  children?: ReactNode;
  errorMessage?: string | null;

  'aria-label'?: string;
  autoComplete?: string;
  id?: string;
  name?: string;
  type?: string;
  onBlur?: any;
  onFocus?: any;
  onKeyPress?: any;
  inputRef?: React.MutableRefObject<any>;
}

const TextInput = ({
  value,
  onChange,
  label,
  placeholder,
  containerClass,
  labelClass,
  inputClass,
  containerStyle,
  isTextarea = false,
  onClean,
  onClick,
  disabled = false,
  defaultValue,
  maxLength,
  readOnly = false,
  autoFocus,
  children,
  errorMessage,

  'aria-label': ariaLabel,
  autoComplete,
  id,
  name,
  type,
  onBlur,
  onFocus,
  onKeyPress,
  inputRef,
}: TextInputPros) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleBlur = () => {
    onBlur && onBlur();
    setIsFocus(false);
  };

  const handleFocus = () => {
    onFocus && onFocus();
    setIsFocus(true);
  };

  const builtInputClassName = htmlClasses(
    'input-text w-100p',
    { _active: isFocus && !errorMessage, _disabled: disabled, _error: errorMessage },
    inputClass,
  );

  if (children)
    return (
      <div className={htmlClasses(containerClass)} style={containerStyle}>
        {children}
      </div>
    );

  return (
    <div className={htmlClasses(containerClass)} style={containerStyle}>
      {label && (
        <div
          className={htmlClasses('input-label mb-8', { _active: isFocus, 'c-text-fb-red': errorMessage }, labelClass)}
        >
          {label}
        </div>
      )}
      <div className="position-relative w-100p">
        {!isTextarea ? (
          <input
            type={type || 'text'}
            value={value}
            onChange={onChange}
            className={builtInputClassName}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={readOnly}
            onClick={onClick}
            autoFocus={autoFocus}
            aria-label={ariaLabel}
            autoComplete={autoComplete}
            id={id}
            name={name}
            onKeyPress={onKeyPress}
            ref={inputRef}
          />
        ) : (
          <textarea
            value={value}
            onChange={onChange}
            className={builtInputClassName}
            placeholder={placeholder}
            style={{ resize: 'none' }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            disabled={disabled}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={readOnly}
            onClick={onClick}
            autoFocus={autoFocus}
            aria-label={ariaLabel}
            autoComplete={autoComplete}
            id={id}
            name={name}
            onKeyPress={onKeyPress}
            ref={inputRef}
          />
        )}
        {onClean && value && value.length > 0 && onChange && (
          <div className="position-absolute t-18 r-14 z-5 c-b8-gray">
            <Icon type="close" size={12} onClick={onClean} />
          </div>
        )}
      </div>

      {errorMessage ? (
        <div className="fs-12 lh-16 mt-8 c-text-fb-red">{errorMessage}</div>
      ) : maxLength && value && value?.length >= maxLength ? (
        <div className="fs-12 lh-16 mt-8 c-text-fb-red">
          Максимальная длина {maxLength} символов
        </div>
      ) : (
        <div className="h-16" />
      )}
    </div>
  );
};

export default observer(TextInput);
