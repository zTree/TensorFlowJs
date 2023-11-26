/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { MnistData, IMAGE_SIZE } from './data.js';

const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
//---------------------------------------------------------------------
function getModel() {
  const model = tf.sequential();

  const IMAGE_CHANNELS = 1;

  // In the first layer of our convolutional neural network we have
  // to specify the input shape. Then we specify some parameters for
  // the convolution operation that takes place in this layer.
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  const NUM_OUTPUT_CLASSES = 10;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}

//---------------------------------------------------------------------
async function train(model, data) {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', tab: 'Evaluation', styles: { height: 'auto', maxHeight: 'none' }
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

  const BATCH_SIZE = 512;
  const TRAIN_DATA_SIZE = 5500;
  const TEST_DATA_SIZE = 1000;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true,
    callbacks: fitCallbacks
  });
}

//---------------------------------------------------------------------
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function doPrediction(model, data, testDataSize = 500) {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const labels = testData.labels.argMax(-1);
  const preds = model.predict(testxs).argMax(-1);
  testxs.dispose();


  return [preds, labels];
}

async function showAccuracy(id, model, data) {
  const [preds, labels] = doPrediction(model, data);
  const z = await preds.data();
  console.log(z);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  const container = {name: `Accuracy-${id}`, tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}

async function showConfusion(id, model, data) {
  const [preds, labels] = doPrediction(model, data);
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = {name: `Confusion Matrix-${id}`, tab: 'Evaluation'};
  tfvis.render.confusionMatrix(container, {values: confusionMatrix, tickLabels: classNames});

  labels.dispose();
}

//---------------------------------------------------------------------
async function showExamples(data) {
  // Create a container in the visor
  const surface =
    tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});

  // Get the examples
  const examples = data.nextTestBatch(20);
  const numExamples = examples.xs.shape[0];

  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // Reshape the image to 28x28 px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1]);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px;';
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
}

function showTF() {
  tfvis.visor().open();
}

let data = new MnistData();
let dataLoaded = false;
let model = null;

async function run() {
  await data.load();
  await showExamples(data);
  dataLoaded = true;
  document.dispatchEvent(new Event('digit-data-ready'))
  window.parent.document.dispatchEvent(new Event('digit-data-ready'))
  model = getModel();
}

async function startTrain() {
  if (!dataLoaded) {
    return;
  }
  
  await showAccuracy('before', model, data);
  await showConfusion('before', model, data);
  
  tfvis.show.modelSummary({name: 'Model Architecture', tab: 'Evaluation'}, model);
  await train(model, data);

  // tfvis.visor().setActiveTab('Evaluation');
  await showAccuracy('after', model, data);
  await showConfusion('after', model, data);
}

async function checkCustomImage(imgData) {
  const batchSize = 1;
  const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);

  for (let i = 0; i < imgData.data.length / 4; i++) {
    // All channels hold an equal value since the image is grayscale, so
    // just read the red channel.
    batchImagesArray[i] = imgData.data[i * 4] / 255;
  }
  const xsData = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
  const xs = xsData.reshape([batchSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const preds = model.predict(xs).argMax(-1);
  xs.dispose();
  const pred = await preds.data();
  return pred;
}


document.addEventListener('DOMContentLoaded', run);
window.showTF = showTF;
window.startTrain = startTrain;
window.checkCustomImage = checkCustomImage;
