import '../../../test-utils/mock-i18n';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, within } from '@testing-library/react';

import {
  InputValidationError,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from '../../../generated/gql-types';
import { UPDATE_USER_PROFILE_MUTATION } from '../../../graphql/User.graphql';
import { mockUser } from '../../../redux/User/User.test-utils';
import { mockedDispatch } from '../../../test-utils/redux-mock-helpers';
import ProfileUpdateForm from './ProfileUpdateForm';

const mockInputValidationError = (
  path: string,
  message: string,
): InputValidationError => ({
  __typename: 'InputValidationError',
  errorCode: 'code',
  message: 'message',
  errors: [
    {
      __typename: 'ValidationError',
      messages: [message],
      path,
    },
  ],
});

const mockUpdateProfileResponse = (
  result: UpdateUserProfileMutation['updateUserProfile'],
  variables: UpdateUserProfileMutationVariables,
): MockedResponse<UpdateUserProfileMutation> => ({
  request: {
    query: UPDATE_USER_PROFILE_MUTATION,
    variables,
  },
  result: {
    data: {
      updateUserProfile: result,
    },
  },
});

const renderForm = (
  response: UpdateUserProfileMutation['updateUserProfile'] = mockUser({}),
  initialUser = mockUser({}),
  input = {},
) => {
  const mock = mockUpdateProfileResponse(response, {
    input: Object.assign(
      {
        firstname: initialUser.firstname,
        lastname: initialUser.lastname,
        currentPassword: '',
      },
      input,
    ),
  });

  const component = render(
    <MockedProvider mocks={[mock]}>
      <ProfileUpdateForm user={initialUser} />
    </MockedProvider>,
  );

  return {
    ...component,
    pressUpdateBtnAndWait: async () => {
      const updateBtn = component.getByRole('button');

      await waitFor(() => fireEvent.click(updateBtn));

      await waitFor(() =>
        expect(component.queryByRole('progressbar')).not.toBeInTheDocument(),
      );
    },
    getInputs: (labels: string[]) =>
      labels.map(
        (label) => component.getByLabelText(label) as HTMLInputElement,
      ),
  };
};

describe('ProfileUpdateForm', () => {
  it('should be pre-filled with user firstname, lastname and email', () => {
    const user = mockUser({});

    const { getInputs } = renderForm(undefined, user);

    const [firstnameInput, lastnameInput, emailInput] = getInputs([
      'firstname',
      'lastname',
      'email',
    ]);

    expect(firstnameInput.value).toBe(user.firstname);
    expect(lastnameInput.value).toBe(user.lastname);
    expect(emailInput.value).toBe(user.email);
  });

  it(`should dispatch updateUser action when update is complete and user is
      returned `, async () => {
    const { pressUpdateBtnAndWait } = renderForm();

    await pressUpdateBtnAndWait();

    expect(mockedDispatch).toBeCalled();
  });

  it(`should not dispatch updateUser action when update is complete and 
      InputValidationError is returned `, async () => {
    const error = mockInputValidationError('', '');
    const { pressUpdateBtnAndWait } = renderForm(error);

    await pressUpdateBtnAndWait();

    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it(`after update mutation should update firstname and lastname input fields to
     updated ones and reset passwords inputs`, async () => {
    const userResponse = mockUser({
      firstname: 'NewFirstname',
      lastname: 'NewLastname',
    });

    const { pressUpdateBtnAndWait, getInputs, getByLabelText } = renderForm(
      userResponse,
    );

    await pressUpdateBtnAndWait();

    const [
      firstnameInput,
      lastnameInput,
      passwordInput,
      confirmPasswordInput,
    ] = getInputs([
      'firstname',
      'lastname',
      'new-password',
      'confirm-password',
    ]);
    const currentPasswordInput = getByLabelText(
      /current-password/,
    ) as HTMLInputElement;

    expect(firstnameInput.value).toBe(userResponse.firstname);
    expect(lastnameInput.value).toBe(userResponse.lastname);
    expect(passwordInput.value).toBe('');
    expect(confirmPasswordInput.value).toBe('');
    expect(currentPasswordInput.value).toBe('');
  });

  it.each([
    ['firstname', 'firstname'],
    ['lastname', 'lastname'],
    ['password', 'new-password'],
    ['currentPassword', /current-password/],
  ])(
    `should show error under %s field when validation error for this field is returned`,
    async (field, labelText) => {
      const message = 'Error message';
      const error = mockInputValidationError(field, message);

      const { pressUpdateBtnAndWait, getAllByRole } = renderForm(error);

      await pressUpdateBtnAndWait();

      const inputs = getAllByRole('form-input');
      const inputContainer = inputs.find((input) =>
        within(input).queryByLabelText(labelText),
      );

      expect(inputContainer).toBeDefined();
      if (!inputContainer) {
        return;
      }

      expect(within(inputContainer).getByText(message)).toBeInTheDocument();
    },
  );
  it(`should show error under confirmPassword field when passwords does not 
      match`, async () => {
    const { getInputs, pressUpdateBtnAndWait, getAllByRole } = renderForm();

    const [passwordInput] = getInputs(['new-password']);

    fireEvent.change(passwordInput, { target: { value: 'fake-password' } });

    await pressUpdateBtnAndWait();

    const inputContainer = getAllByRole('form-input').find((input) =>
      within(input).queryByLabelText('confirm-password'),
    );

    expect(inputContainer).toBeDefined();
    if (!inputContainer) {
      return;
    }

    expect(
      within(inputContainer).getByText('error.password-does-not-match'),
    ).toBeInTheDocument();
  });
});
