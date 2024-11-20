/* eslint-disable react-hooks/exhaustive-deps */
// import { FieldError } from 'react-hook-form';
import useCreateTokenForm from '@/src/hooks/token/useCreateTokenForm';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import TextInput from '@/src/components/Form/TextInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';
import { FieldError } from 'react-hook-form';

type Props = {
  fetchTokens: () => void;
};

const config = {
  formTitle: 'New Token',
  nameRequired: 'Name is required',
  symbolRequired: 'Symbol is required',
  add: 'Add',
  creating: 'Creating...',
};

const AddTokenForm = ({ fetchTokens }: Props) => {
  const { register, onSubmit, errors, isSubmitting, creationError } =
    useCreateTokenForm(fetchTokens);

  const addTokenError = creationError
    ? ({ message: creationError } as FieldError)
    : errors.symbol;

  return (
    <FormWrapper className="auth-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <Form handleSubmit={onSubmit}>
          <FormContentContainer>
            <TextInput
              type="text"
              placeholder="Token symbol (BTC)"
              disabled={isSubmitting}
              error={addTokenError}
              {...register('symbol', { required: config.symbolRequired })}
            />

            <TextInput
              type="text"
              placeholder="Token name (bitcoin)"
              disabled={isSubmitting}
              error={errors.name}
              {...register('name', { required: config.nameRequired })}
            />

            <Button disabled={isSubmitting || !!creationError} type="submit">
              {isSubmitting ? config.creating : config.add}
            </Button>
          </FormContentContainer>
        </Form>
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default AddTokenForm;
