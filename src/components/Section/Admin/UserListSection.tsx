import { User } from '@/src/types';
import * as u from '@/src/utils';

type Props = {
  users: User[];
};

const config = {
  id: 'Id:',
  name: 'Name:',
  role: 'Role:',
  email: 'Email:',
  created: 'Created:',
  updeted: 'Updeted:',
  verified: 'Verified:',
  notVerified: 'Not verified',
  recent: 'Recent:',
  noSessions: 'No sessions',
};

const UserListSection = ({ users }: Props) => {
  return (
    <section className="section user-list">
      <div className="section-content user-list-section-content">
        <ul className="user-list-section-user-list">
          {users.map((user, idx) => {
            const { createdAt, updatedAt, emailVerified } = user;
            const dateAndTimeFormat = 'DD-MM-YY HH:mm:ss';
            const dateFormat = 'DD-MM-YY';
            return (
              <li key={idx} className="user-list-section-list-item">
                <div className="user-list-section-list-item-block-wrapper">
                  <div className="user-list-section-list-item-block">
                    <span className="user-list-section-list-item-block-value">
                      <span>{config.id}</span>
                      <span>{user.id}</span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.name}</span>
                      <span>{user.name}</span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.role}</span>
                      <span>{user.role}</span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.email}</span>
                      <span>{user.email}</span>
                    </span>
                  </div>

                  <div className="user-list-section-list-item-block">
                    <span className="user-list-section-list-item-block-value">
                      <span>{config.created}</span>
                      <span>{u.normalizeISODate(createdAt, dateFormat)}</span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.updeted}</span>
                      <span>{u.normalizeISODate(updatedAt, dateFormat)}</span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.verified}</span>
                      <span>
                        {user.emailVerified
                          ? u.normalizeISODate(emailVerified, dateFormat)
                          : config.notVerified}
                      </span>
                    </span>

                    <span className="user-list-section-list-item-block-value">
                      <span>{config.recent}</span>
                      <span>
                        {user?.sessions[0]?.updatedAt
                          ? u.normalizeKyivDate(
                              user.sessions[0].updatedAt,
                              dateAndTimeFormat
                            )
                          : config.noSessions}
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
