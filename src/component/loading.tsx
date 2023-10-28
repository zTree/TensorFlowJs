import { memo } from "react";
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
}


const LoadingWrap = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  zIndex: 999,
}));

const Loading = memo((props: LoadingProps) => {
  return (
    <LoadingWrap {...props} >
      <CircularProgress />
    </LoadingWrap>
  );
});

Loading.displayName = "Loading";

export default Loading;
