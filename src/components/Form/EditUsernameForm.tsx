import { Dispatch, SetStateAction } from 'react';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import DefaultInput from '@/src/components/Form/DefaultInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

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
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <FormContentContainer>
          <DefaultInput value={username} handleChange={setUsername} />
          <Button clickContent={update}>{config.buttonText}</Button>
        </FormContentContainer>
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default EditUsernameForm;
