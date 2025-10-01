/* eslint-disable react-hooks/exhaustive-deps */
import useModal from '@/src/hooks/useModal';
import { FormEvent } from '@/src/types';
import { vars } from '@/src/config';
import FormWrapper from '@/src/components/Container/FormWrapper';
import FormBackdropContainer from '@/src/components/Container/FormBackdrop';
import FormContentContainer from '@/src/components/Container/FormContent';
import DefaultInput from '@/src/components/Form/DefaultInput';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';
import Form from '@/src/components/Form/Form';

type Props = {
  closePrice: string;
  isSubmit: boolean;
  handleClosePrice: (price: string) => void;
  confirmCloseOrdersSubmit: () => void;
};

const config = {
  submit: 'Submit',
};

const ClosePriceForm = (props: Props) => {
  const { closePrice, confirmCloseOrdersSubmit, handleClosePrice } = props;

  const { closeModal } = useModal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    confirmCloseOrdersSubmit();
  };

  return (
    <FormWrapper className="general-form-wrapper">
      <FormBackdropContainer>
        <Title tag={'h3'} className="form-title" text={'Selling price'} />

        <Form handleSubmit={(e) => handleSubmit(e)}>
          <FormContentContainer>
            <DefaultInput
              type="text"
              placeholder="Price"
              value={closePrice.toString()}
              handleChange={(e) => handleClosePrice(e)}
              disabled={false}
            />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button type="submit">{config.submit}</Button>

              <Button
                style={{ flex: '0 0 47px', backgroundColor: vars.lightRed }}
                clickContent={closeModal}
                type="button"
              >
                {null}
              </Button>
            </div>
          </FormContentContainer>
        </Form>
      </FormBackdropContainer>
    </FormWrapper>
  );
};

export default ClosePriceForm;
