// import { Dispatch, SetStateAction } from 'react';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import DefaultInput from '@/src/components/Form/DefaultInput';
import Title from '@/src/components/Layout/Title';

const config = {
  formTitle: 'Edit Name',
  buttonText: 'Update',
};

const CustomPriceForm = () => {
  return (
    <FormWrapper className="edit-username-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={config.formTitle} />

        <FormContentContainer>
          <DefaultInput value={'333'} handleChange={() => '444'} />
        </FormContentContainer>
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default CustomPriceForm;
