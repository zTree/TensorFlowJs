import { memo, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Loading from "../../loading";
import Iframe from "./iframe";

interface DigitRecognitionProps {
}


const DigitRecognitionContent = styled('div')({
  flexGrow: 1,
  position: 'relative',
});

const DigitRecognition = memo((props: DigitRecognitionProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onDataReady = () => {
      setLoaded(true);
    }
    document.addEventListener('digit-data-ready', onDataReady);

    return () => {
      document.removeEventListener('digit-data-ready', onDataReady);
    }
  });


  return (
    <DigitRecognitionContent {...props} >
      <Iframe />
      {!loaded && <Loading />}
    </DigitRecognitionContent>
  );
});

DigitRecognition.displayName = "DigitRecognition";

export default DigitRecognition;
