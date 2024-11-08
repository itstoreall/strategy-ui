import { Dispatch, SetStateAction } from 'react';
import useEditUsername from '@/src/hooks/auth/useEditUsername';
import Form from '@/src/components/Form/Form';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import FormWrapper from '../Container/FormWrapper';

type Props = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

const config = {
  usernameRequired: 'Username is required',
};

const EditUsernameameForm = ({ username, setUsername }: Props) => {
  const { register, onSubmit, watch } = useEditUsername(username);

  const handleSubmit = () => {
    const username = watch('username');
    setUsername(username);
    onSubmit();
  };

  return (
    <FormWrapper className="edit-username-form-wrapper">
      <h3 className="modal-title">Edit Name</h3>

      <Form className="edit-username-form" handleSubmit={handleSubmit}>
        <div className="edit-username-form-content">
          <TextInput
            placeholder="Enter name"
            // disabled={isPending}
            {...register('username', { required: config.usernameRequired })}
          />

          <Button className="update-field-button">Update</Button>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default EditUsernameameForm;
