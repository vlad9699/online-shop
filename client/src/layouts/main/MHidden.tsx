import PropTypes from 'prop-types'
// material
import { useMediaQuery } from '@mui/material'

// ----------------------------------------------------------------------

MHidden.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf([
    'xsDown',
    'smDown',
    'mdDown',
    'lgDown',
    'xlDown',
    'xsUp',
    'smUp',
    'mdUp',
    'lgUp',
    'xlUp'
  ]).isRequired
};

export default function MHidden({ width, children }:any):any {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme:any) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme:any) => theme.breakpoints.down(breakpoint));


  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}
