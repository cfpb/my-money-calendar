import React from 'react'
import clsx from 'clsx';
import { useCallback } from 'react';
import { formatCurrency, toCents } from '../../lib/currency-helpers';

import { closeRound } from '../../lib/icons';
import { Checkbox, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

export const CustomCheckBox = ( { id, name, onChange, checked, label, value = '1', castToBoolean = true, largeTarget = false, ...props } ) => {
  const changeHandler = useCallback(
    evt => {
      if ( castToBoolean ) evt.target.value = evt.target.checked;
      onChange( evt );
    },
    [ onChange, castToBoolean ]
  );

  const classes = clsx( 'm-form-field', 'm-form-field__checkbox', {
    'm-form-field__lg-target': largeTarget
  } );

  return (
    <div className={classes}>
      <Checkbox
        className='a-checkbox'
        type='checkbox'
        name={name}
        id={id}
        onChange={changeHandler}
        checked={checked}
        value={value}
        {...props}
      />
      <label className='a-label' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export const CustomTextField = ( {
  id,
  name,
  type = 'text',
  onChange,
  onBlur,
  label,
  value,
  errors,
  touched,
  required = false,
  ...props
} ) => {
  const fieldClasses = clsx( 'm-form-field', 'm-form-field__text', errors && touched && 'm-form-field__error' );
  const inputClasses = clsx( 'a-text-input', errors && touched && 'a-text-input__error' );

  return (
    <TextField
      label={required ? label : `${label} (optional)`}
      placeholder={label}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
      InputLabelProps={{
        shrink: true
      }}
      className={inputClasses}
      helperText={touched && errors ? errors : ''}
      error={touched && errors}
      fullWidth
    />
  )
};

export const DateField = ( { onChange, value, ...props } ) => <CustomTextField type='date' onChange={onChange} value={value} {...props} />;
export const CurrencyField = ( { id, name, onChange, onBlur, label, value, ...props } ) => {
  const handleChange = useCallback(
    evt => {
      evt.target.value = toCents( evt.target.value );
      onChange( evt );
    },
    [ value, onChange ]
  );

  return (
    <CustomTextField
      id={id}
      name={name}
      onChange={handleChange}
      onBlur={onBlur}
      label={label}
      inputMode='decimal'
      value={formatCurrency( value / 100, { symbol: false } )}
      {...props}
    />
  );
};

export const RadioButton = ( {
  id,
  name,
  onChange,
  label,
  value,
  checked = false,
  largeTarget = false,
  hint,
  ...props
} ) => {
  const classes = clsx( 'm-form-field', 'm-form-field__radio', {
    'm-form-field__lg-target': largeTarget
  } );

  return (
    <div className={classes}>
      <input
        className='a-radio'
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className='a-label' htmlFor={id}>
        {label}
        {hint && <small className='a-label_helper'>{hint}</small>}
      </label>
    </div>
  );
};

export const SelectField = ( {
  id,
  name,
  label,
  onChange,
  onBlur,
  value,
  placeholder = 'Select an option',
  options = [],
  errors,
  touched,
  ...props
} ) => {
  if(!value){
    value = ''
  }
  const fieldClasses = clsx( 'm-form-field', 'm-form-field__select', errors && touched && 'm-form-field__error' );
  const inputClasses = clsx( 'a-select', errors && touched && 'a-select__error' );

  const opts = [
    <MenuItem value={''} key='empty'>
      {placeholder}
    </MenuItem>,
    ...options.map( ( { label: optLabel, value: optVal } ) => <MenuItem value={optVal} key={optVal}>
      {optLabel}
    </MenuItem>
    )
  ];

  return (
    <FormControl error={touched && errors}>
      <InputLabel id={id + '-label'} className="select-label">{label}</InputLabel>
      <Select
        labelId={id + 'label'}
        id={id}
        name={name} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        {...props}
      >
        {opts}
      </Select>
      <FormHelperText>{touched && errors ? errors : ''}</FormHelperText>
      </FormControl>
  );


  // return (
  //   <div className={fieldClasses}>
  //     <label className='a-label a-label__heading' htmlFor={id}>
  //       {label}
  //     </label>
  //     <div className={inputClasses}>
  //       <select id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} {...props}>
  //         {opts}
  //       </select>
  //     </div>
  //     {errors && touched &&
  //       <div className='a-form-alert a-form-alert__error' role='alert'>
  //         <span dangerouslySetInnerHTML={{ __html: closeRound }} className='error-icon' />
  //         <span className='a-form-alert_text'>{errors}</span>
  //       </div>
  //     }
  //   </div>
  // );
};
