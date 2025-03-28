import { User } from '@/src/types';
import { normalizeDate } from '@/src/utils';

type Props = {
  users: User[];
};

const UserListSection = ({ users }: Props) => {
  return (
    <section className="section user-list">
      <div className="section-content user-list-section-content">
        <ul className="user-list-section-user-list">
          {users.map((user, idx) => {
            return (
              <li key={idx} className="user-list-section-list-item">
                <div className="user-list-section-list-item-block-wrapper">
                  <div className="user-list-section-list-item-block">
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Id:'}</span>
                      <span>{user.id}</span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Name:'}</span>
                      <span>{user.name}</span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Role:'}</span>
                      <span>{user.role}</span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Email:'}</span>
                      <span>{user.email}</span>
                    </span>
                  </div>

                  <div className="user-list-section-list-item-block">
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Created:'}</span>
                      <span>{normalizeDate(user.createdAt, 'DD-MM-YY')}</span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Updeted:'}</span>
                      <span>{normalizeDate(user.updatedAt, 'DD-MM-YY')}</span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Verified:'}</span>
                      <span>
                        {user.emailVerified
                          ? normalizeDate(user.emailVerified, 'DD-MM-YY')
                          : 'Not verified'}
                      </span>
                    </span>
                    <span className="user-list-section-list-item-block-value">
                      <span>{'Recent:'}</span>
                      <span>
                        {user?.sessions[0]?.updatedAt
                          ? normalizeDate(
                              user.sessions[0].updatedAt,
                              'DD-MM-YY HH:mm:ss'
                            )
                          : 'No sessions'}
                      </span>
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
