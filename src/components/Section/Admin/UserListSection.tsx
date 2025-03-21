import { User } from '@/src/types';
import { normalizeDate } from '@/src/utils';

type Props = {
  users: User[];
};

const UserListSection = ({ users }: Props) => {
  // console.log('users:', users);

  return (
    <section className="section user-list">
      <div className="section-content user-list-section-content">
        <ul
          className="user-list-section-user-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {users.map((user, idx) => {
            return (
              <li key={idx} className="user-list-section-list-item">
                <div className="user-list-section-list-item-block-wrapper">
                  <div className="user-list-section-list-item-block">
                    <span>{user.name}</span>
                    <span>{user.role}</span>
                    <span>{user.id}</span>
                    <span>{user.email}</span>
                  </div>

                  <div className="user-list-section-list-item-block">
                    <span>{normalizeDate(user.createdAt, 'DD-MM-YY')}</span>
                    <span>{normalizeDate(user.updatedAt, 'DD-MM-YY')}</span>
                    <span>
                      {user.emailVerified
                        ? normalizeDate(user.emailVerified, 'DD-MM-YY')
                        : 'Not verified'}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default UserListSection;
