import { memo } from "react";
// import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

interface DigitRecognitionProps {
}


const DigitRecognitionContent = styled('div')({
  // display: 'flex'
});

const DigitRecognition = memo((props: DigitRecognitionProps) => {
  // const { t } = useTranslation();

  return (
    <DigitRecognitionContent {...props} >
      <iframe id='digit-recognition' />
    </DigitRecognitionContent>
  );
});

DigitRecognition.displayName = "DigitRecognition";

export default DigitRecognition;
