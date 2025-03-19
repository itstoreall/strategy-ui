'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { clearSessions } from '@/src/lib/auth/clearSessionsServerAction';
import { getAllUsers } from '@/src/lib/auth/getAllUsersServerAction';
import useGlobalState from '@/src/hooks/useGlobalState';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import useModal from '@/src/hooks/useModal';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddTokenSection from '@/src/components/Section/Admin/AddTokenSection';
import AddTokenForm from '@/src/components/Form/Token/AddTokenForm';
import PageHeading from '@/src/components/Layout/PageHeading';
import SelectMulti from '@/src/components/Form/SelectMulti';
import MainLoader from '@/src/components/MainLoader';
import Button from '@/src/components/Button/Button';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [sessionUserId, setSessionUserId] = useState('');
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const { updatedTokens, fetchTokens } = useGlobalState();
  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const { RenderModal } = useModal();

  useEffect(() => {
    if (userOptions.length) return;
    getAllUsers().then((res) => {
      if (res?.length) {
        const users = res.map((el) => el.id);
        setUserOptions(users);
      }
    });
  }, []);

  // ---

  const handleSelectChange = (value: string) => {
    if (errorMsg) {
      setErrorMsg('');
    }
    setSessionUserId(value);
  };

  const handleClearSessions = async () => {
    if (sessionUserId) {
      startTransition(async () => {
        const isDeleted = await clearSessions(sessionUserId);
        if (isDeleted) {
          setSessionUserId('');
        } else {
          setErrorMsg('Failed to delete the session');
          setSessionUserId('');
        }
      });
    }
  };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {session && updatedTokens ? (
          <div className="main-content">
            <AddTokenSection tokens={updatedTokens} />

            <section>
              <SelectMulti
                options={userOptions.filter((opt) => opt !== sessionUserId)}
                placeholder={userOptions.length ? 'User' : 'No users'}
                onSelect={(value) => handleSelectChange(value)}
                isOpen={openDropdownId === 'user'}
                onToggle={() =>
                  toggleDropdown(openDropdownId === 'user' ? '' : 'user')
                }
                isDisable={isPending}
                isReset={!sessionUserId || !!errorMsg}
                isError={!!errorMsg}
                errorMsg={errorMsg}
              />
              <Button
                clickContent={handleClearSessions}
                disabled={isPending || !sessionUserId || !!errorMsg}
              >
                Delete
              </Button>
            </section>
          </div>
        ) : (
          <MainLoader />
        )}

        <RenderModal>
          <AddTokenForm fetchTokens={fetchTokens} />
        </RenderModal>
      </main>
    </PageContainer>
  );
};

export default Admin;
