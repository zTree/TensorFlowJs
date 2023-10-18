import { memo } from "react";
// import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

interface TestProps {
}


const TestContent = styled('div')({
  // display: 'flex'
});

const Test = memo((props: TestProps) => {
  // const { t } = useTranslation();

  return (
    <TestContent {...props} >Test</TestContent>
  );
});

Test.displayName = "Test";

export default Test;
