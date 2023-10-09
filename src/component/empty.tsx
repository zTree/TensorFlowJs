import { memo } from "react";
// import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

interface EmptyProps {
}


const EmptyContent = styled('div')({
  // display: 'flex'
});

const Empty = memo((props: EmptyProps) => {
  // const { t } = useTranslation();

  return (
    <EmptyContent {...props} >Empty</EmptyContent>
  );
});

Empty.displayName = "Empty";

export default Empty;
