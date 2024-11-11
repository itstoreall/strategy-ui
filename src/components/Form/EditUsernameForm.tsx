import { Dispatch, SetStateAction } from 'react';
import Button from '@/src/components/Button/Button';
import FormWrapper from '../Container/FormWrapper';
import { UpdateSession } from 'next-auth/react';
import DefaultInput from './DefaultInput';
import FormContentContainer from '../Container/FormContent';

type Props = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  update: UpdateSession;
};

const EditUsernameForm = ({ username, setUsername, update }: Props) => {
  const handleClick = () => {
    update({ name: username });
  };

  return (
    <FormWrapper className="edit-username-form-wrapper">
      <h3 className="modal-title">Edit Name</h3>

      <FormContentContainer>
        <DefaultInput username={username} handleChange={setUsername} />
        <Button clickContent={handleClick}>Update</Button>
      </FormContentContainer>
    </FormWrapper>
  );
};

export default EditUsernameForm;
