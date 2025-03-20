import { User } from '@/src/types';

type Props = {
  users: User[];
};

const UserListSection = ({ users }: Props) => {
  // console.log('users:', users);

  return (
    <section className="section user-list">
      <div className="section-content user-list-section-content">
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {users.map((user, idx) => {
            return (
              <li key={idx}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // gap: '1rem',
                  }}
                >
                  <span>{user.id}</span>
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <span>
                    {user.emailVerified ? user.emailVerified.toString() : null}
                  </span>
                  <span>{user.role}</span>
                  <span>{user.createdAt.toString()}</span>
                  <span>{user.updatedAt.toString()}</span>
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
