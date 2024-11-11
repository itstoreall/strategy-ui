import { Dispatch, SetStateAction } from 'react';
import Button from '@/src/components/Button/Button';
import FormWrapper from '../Container/FormWrapper';
import DefaultInput from './DefaultInput';
import FormContentContainer from '../Container/FormContent';

type Props = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  update: () => void;
};

const config = {
  formTitle: 'Edit Name',
  buttonText: 'Update',
};

const EditUsernameForm = ({ username, setUsername, update }: Props) => {
  return (
    <FormWrapper className="edit-username-form-wrapper">
      <h3 className="modal-title">{config.formTitle}</h3>

      <FormContentContainer>
        <DefaultInput username={username} handleChange={setUsername} />
        <Button clickContent={update}>{config.buttonText}</Button>
      </FormContentContainer>
    </FormWrapper>
  );
};

export default EditUsernameForm;
