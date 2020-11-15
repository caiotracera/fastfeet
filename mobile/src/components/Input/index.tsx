import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, LeftIcon, RightIcon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  leftIcon: string;
  showPasswordIcon?: boolean;
  containerStyle?: Record<string, unknown>; // same as containerStyle?: {}
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, leftIcon, showPasswordIcon, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <LeftIcon
        name={leftIcon}
        size={20}
        color={isFocused || isFilled ? '#4C33CC' : '#ffc042'}
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#bebccc"
        onFocus={handleInputFocus}
        secureTextEntry={showPasswordIcon && !showPassword}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />

      {showPasswordIcon && (
        <TouchableOpacity onPress={handleShowPassword}>
          <RightIcon
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#4C33CC"
          />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default forwardRef(Input);
