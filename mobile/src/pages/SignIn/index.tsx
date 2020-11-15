import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { FormHandles } from '@unform/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import logoImg from '../../assets/images/logo.png';
import logotipoImg from '../../assets/images/logotipo.png';
import backgroundImg from '../../assets/images/backgroundImage.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  BackgroundImage,
  Header,
  WelcomeContainer,
  Title,
  Highlighted,
  Description,
  Form,
  LoginOptions,
  CheckboxLogin,
  LoginOptionsText,
  ScrollView,
} from './styles';

interface SignInFormData {
  cpf: string;
  password: string;
}

const SignIn: React.FC = () => {
  const kavRef = useRef<KeyboardAwareScrollView>(null);
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleClickForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const handleFormSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required().min(11).max(11),
          password: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });
        await signIn({
          cpf: data.cpf,
          password: data.password,
          remember: toggleCheckBox,
        });
      } catch (error) {
        console.log(error.message);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Ooops!', error.message);
      }
    },
    [signIn, toggleCheckBox],
  );

  return (
    <ScrollView
      ref={kavRef}
      onKeyboardDidShow={() => {
        kavRef.current?.scrollToEnd();
      }}
    >
      <Container>
        <BackgroundImage source={backgroundImg} />

        <Header>
          <Image source={logotipoImg} />
          <Image source={logoImg} />
        </Header>

        <WelcomeContainer>
          <Title>
            <Highlighted>Entregador, </Highlighted>
            você é nosso maior valor
          </Title>

          <Description>Faça seu login para começar suas entregas.</Description>
        </WelcomeContainer>

        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="number-pad"
            name="cpf"
            leftIcon="user"
            placeholder="CPF"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <Input
            ref={passwordInputRef}
            name="password"
            leftIcon="lock"
            placeholder="Senha"
            showPasswordIcon
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <LoginOptions>
            <CheckboxLogin>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                tintColors={{ true: '#ffc042', false: '#ffc042' }}
              />
              <TouchableOpacity
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
              >
                <LoginOptionsText>Lembrar-me</LoginOptionsText>
              </TouchableOpacity>
            </CheckboxLogin>
            <TouchableOpacity onPress={handleClickForgotPassword}>
              <LoginOptionsText>Esqueci minha senha</LoginOptionsText>
            </TouchableOpacity>
          </LoginOptions>

          <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
        </Form>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
