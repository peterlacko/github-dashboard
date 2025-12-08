import type { GitHubUser } from '../types/github';
import { addHttpsProtocol } from '../utils/formatUrl';
import { LocationIcon, LinkIcon, TwitterIcon, CompanyIcon } from './icons';
import './UserLinks.css';

interface UserLinksProps {
  user: GitHubUser;
}

export default function UserLinks({ user }: UserLinksProps) {
  return (
    <div className="user-links">
      <div className={`link-item ${!user.location ? 'link-disabled' : ''}`}>
        <LocationIcon />
        <span className="text-preset-7">{user.location || 'Not Available'}</span>
      </div>

      <div className={`link-item ${!user.blog ? 'link-disabled' : ''}`}>
        <LinkIcon />
        {user.blog ? (
          <a
            href={addHttpsProtocol(user.blog)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-preset-7 link-anchor"
          >
            {user.blog}
          </a>
        ) : (
          <span className="text-preset-7">Not Available</span>
        )}
      </div>

      <div className={`link-item ${!user.twitter_username ? 'link-disabled' : ''}`}>
        <TwitterIcon />
        {user.twitter_username ? (
          <a
            href={`https://twitter.com/${user.twitter_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-preset-7 link-anchor"
          >
            @{user.twitter_username}
          </a>
        ) : (
          <span className="text-preset-7">Not Available</span>
        )}
      </div>

      <div className={`link-item ${!user.company ? 'link-disabled' : ''}`}>
        <CompanyIcon />
        <span className="text-preset-7">{user.company || 'Not Available'}</span>
      </div>
    </div>
  );
}
