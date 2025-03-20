/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from 'react';
import { clearSessions } from '@/src/lib/auth/clearSessionsServerAction';
import { getAllUsers } from '@/src/lib/auth/getAllUsersServerAction';
import useSelectMulti from '@/src/hooks/useSelectMulti';
import SelectMulti from '@/src/components/Form/SelectMulti';
import Button from '@/src/components/Button/Button';

const ClearSessionSection = () => {
  const [userOptions, setUserOptions] = useState<string[]>([]);
  const [sessionUserId, setSessionUserId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { openDropdownId, toggleDropdown } = useSelectMulti();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (userOptions.length) return;
    getAllUsers().then((res) => {
      if (res?.length) {
        const users = res.map((el) => el.id);
        setUserOptions(users);
      }
    });
  }, []);

  useEffect(() => {
    if (errorMsg) {
      alert(errorMsg);
    }
  }, [errorMsg]);

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
    <section className="section clear-session">
      <div className="section-content clear-session-section-content">
        <SelectMulti
          className="clear-session-section-content-select"
          options={userOptions.filter((opt) => opt !== sessionUserId)}
          placeholder={userOptions.length ? 'User' : 'No users'}
          onSelect={(value) => handleSelectChange(value)}
          isOpen={openDropdownId === 'user'}
          onToggle={() =>
            toggleDropdown(openDropdownId === 'user' ? '' : 'user')
          }
          isDisable={isPending}
          isReset={!sessionUserId || !!errorMsg}
        />

        <div className="clear-session-section-button-block">
          <Button
            className="clear-session-section-button"
            clickContent={handleClearSessions}
            disabled={isPending || !sessionUserId || !!errorMsg}
          >
            Delete session
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClearSessionSection;
