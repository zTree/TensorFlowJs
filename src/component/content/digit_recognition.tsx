import { memo } from "react";
// import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
// import { CustomTheme, MediaStyles } from "../../common/config";

interface DigitRecognitionProps {
}


const DigitRecognitionContent = styled('div')({
  // display: 'flex'
});

const Iframe = styled('iframe')(() => ({
  border: 0,
  verticalAlign: 'bottom',
  width: '100%',
  height: '100%',
}));


const DigitRecognition = memo((props: DigitRecognitionProps) => {
  // const { t } = useTranslation();

  return (
    <DigitRecognitionContent {...props} >
      <Iframe id='digit-recognition' />
    </DigitRecognitionContent>
  );
});

DigitRecognition.displayName = "DigitRecognition";

export default DigitRecognition;
