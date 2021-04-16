import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { ErrorResult, UserLoginMutation } from '../../generated/gql-types';
import { USER_LOGIN_MUTATION } from '../../graphql/User.graphql';
import { mockedDispatch } from '../../redux/redux-mock-helpers';
import { mockUser } from '../../redux/User/User.test-utils';
import { UserActionType } from '../../redux/User/User.types';
import LoginForm from './LoginForm';

const mockErrorResult = (message = 'We got can error!'): ErrorResult => ({
  __typename: 'ErrorResult',
  errorCode: 'code',
  message,
});

const mockLoginResponse = (
  result: UserLoginMutation['userLogin'],
): MockedResponse<UserLoginMutation> => ({
  request: {
    query: USER_LOGIN_MUTATION,
    variables: { email: '', password: '' },
  },
  result: {
    data: {
      userLogin: result,
    },
  },
});

describe('LoginForm', () => {
  it.each([['Email'], ['Password']])(
    'should update %s form field input',
    async (label) => {
      const { getByLabelText } = render(
        <MockedProvider>
          <LoginForm />
        </MockedProvider>,
      );
      const value = 'Test';

      const input = getByLabelText(label) as HTMLInputElement;

      await waitFor(() => fireEvent.change(input, { target: { value } }));

      expect(input.value).toBe(value);
    },
  );
  [
    {
      type: 'User',
      shouldDispatch: true,
      response: mockUser({}),
    },
    {
      type: 'ErrorResult',
      shouldDispatch: false,
      response: mockErrorResult(),
    },
  ].forEach(({ type, shouldDispatch, response }) => {
    it(`should ${shouldDispatch ? '' : 'not '}dispatch ${
      UserActionType.login
    } action
      if ${type} is returned`, async () => {
      const mock = mockLoginResponse(response);

      const { getByRole } = render(
        <MockedProvider mocks={[mock]}>
          <LoginForm />
        </MockedProvider>,
      );
      const loginButton = getByRole('button');

      fireEvent.click(loginButton);

      await waitFor(() => getByRole('progressbar'));
      expect(mockedDispatch).toBeCalledTimes(shouldDispatch ? 1 : 0);
    });
  });

  it(`should show error message if ErrorResult type is returned`, async () => {
    const message = 'Incorrect email or password';

    const mock = mockLoginResponse(mockErrorResult(message));

    const { getByRole, getByText } = render(
      <MockedProvider mocks={[mock]}>
        <LoginForm />
      </MockedProvider>,
    );
    const loginButton = getByRole('button');

    fireEvent.click(loginButton);

    const element = await waitFor(() => getByText(message));

    expect(element).toBeInTheDocument();
  });
});
