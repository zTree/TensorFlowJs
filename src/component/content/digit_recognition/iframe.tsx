import { memo, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { BasePath, MenuID } from "../../../common/config";


const IframeWrap = styled('iframe')(() => ({
  border: 0,
  verticalAlign: 'bottom',
  width: '100%',
  height: '100%',
}));

let iframeInitial = false;
const Iframe = memo(() => {
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeInitial) {
      return;
    }
    const iframe = iframeRef.current;
    if (iframe) {
      iframeInitial = true;

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
  * {
    box-sizing: border-box;
  }
  body {
    padding: 20px;
  }
  #svg-container {
     
    overflow: hidden;
    width: 300px;
    height: 300px;
    border: 2px silver solid;
  }
  </style>

  <!-- Import TensorFlow.js -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script> -->
  <script src="${BasePath}/digit_recognition/tf@1.0.0.js"></script>
  <!-- Import tfjs-vis -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script> -->
  <script src="${BasePath}/digit_recognition/tf-vis@1.0.2.js"></script>

  <!-- Import the data file -->
  <script src="${BasePath}/digit_recognition/data.js" type="module"></script>

  <!-- Import the main script file -->
  <script src="${BasePath}/digit_recognition/main.js" type="module"></script>

  <script src="${BasePath}/digit_recognition/custom.js" type="module"></script>


</head>
<body>
  <h2 id="title">${t(MenuID.DigitRecognition)}</h2>
  <div style="display: flex; place-content: flex-end;"><button onclick="showTF()">Show</button></div>
  <div style="display: flex; place-content: flex-start;"><button id="clear">clear</button> <button id="train" onclick="startTrain()" disabled>Start Train</button></div>
  <div>
    <div id="svg-container"></div>
    <div id="svg-result"></div>
  </div>
</body>
</html>`); 
        doc.close(); 
      }

    }

    return () => {
      iframeInitial = false;
    }
  });


  return (
    <IframeWrap id='digit-recognition' ref={iframeRef} />
  );
});

Iframe.displayName = "Iframe";

export default Iframe;
