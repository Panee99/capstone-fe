import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets';

import _ from 'lodash';

// ----------------------------------------------------------------------

type PermissionBasedGuardProp = {
  hasContent?: boolean;
  permission?: string;
  children: React.ReactNode;
};

export default function PermissionBasedGuard({
  hasContent,
  permission,
  children,
}: PermissionBasedGuardProp) {
  // Logic here to get current user permission
  const { user } = useAuth();

  // const currentRole = 'user';
  const currentPermissions = user?.permissions;

  if (
    typeof permission !== 'undefined' &&
    typeof currentPermissions !== 'undefined' &&
    !currentPermissions.includes(permission)
  ) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Không có quyền
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Bạn không có quyền truy cập trang này
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
