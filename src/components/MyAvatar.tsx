// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.name}
      alt={user?.name}
      color={user?.avatar ? 'default' : createAvatar(user?.name || '').color}
      {...other}
    >
      {createAvatar(user?.name || '').name}
    </Avatar>
  );
}
