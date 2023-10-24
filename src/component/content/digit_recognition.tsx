import { memo, useRef, useEffect } from "react";
// import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { BasePath } from "../../common/config";

// import { CustomTheme, MediaStyles } from "../../common/config";

interface DigitRecognitionProps {
}


const DigitRecognitionContent = styled('div')({
  flexGrow: 1,
});

const Iframe = styled('iframe')(() => ({
  border: 0,
  verticalAlign: 'bottom',
  width: '100%',
  height: '100%',
}));

let iframeInitial = false;
const DigitRecognition = memo((props: DigitRecognitionProps) => {
  // const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeInitial) {
      return;
    }
    const iframe = iframeRef.current;
    if (iframe) {
      iframeInitial = true;
      console.log(iframe);

      let doc = null;
      if(iframe.contentDocument) {
        doc = iframe.contentDocument;
      } else if(iframe.contentWindow) {
        doc = iframe.contentWindow.document;
      }
      if (doc) {
        doc.open(); 
        doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  </style>

  <!-- Import TensorFlow.js -->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
  <!-- Import tfjs-vis -->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script>

  <!-- Import the data file -->
  <script src="${BasePath}/digit_recognition/data.js" type="module"></script>

  <!-- Import the main script file -->
  <script src="${BasePath}/digit_recognition/main.js" type="module"></script>

</head>
<body>
</body>
</html>`); 
        doc.close(); 
        // console.log(doc.body?.outerHTML)
        // const script = doc.createElement('script');
        // script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
        // script.onload = () => {
        //   console.log('tfjs loaded');
        // };
        // doc.body.appendChild(script);
      }

    }

    return () => {
      iframeInitial = false;
      console.log('unmount iframe');
    }
  });


  return (
    <DigitRecognitionContent {...props} >
      <Iframe id='digit-recognition' ref={iframeRef} />
    </DigitRecognitionContent>
  );
});

DigitRecognition.displayName = "DigitRecognition";

export default DigitRecognition;
