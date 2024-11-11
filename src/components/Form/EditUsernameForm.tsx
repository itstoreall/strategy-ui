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

const EditUsernameForm = ({ username, setUsername, update }: Props) => {
  return (
    <FormWrapper className="edit-username-form-wrapper">
      <h3 className="modal-title">Edit Name</h3>

      <FormContentContainer>
        <DefaultInput username={username} handleChange={setUsername} />
        <Button clickContent={update}>Update</Button>
      </FormContentContainer>
    </FormWrapper>
  );
};

export default EditUsernameForm;
