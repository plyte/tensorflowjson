const tf = require('@tensorflow/tfjs');
const specify_layers = require('./specify_layers');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.


json_string = 
{
  "number_of_layers": 2,
  "layers": [
    {"type": "dense", "units": 100, "activation": "relu", "inputShape": [10]},
    {"type": "dense", "units": 1, "activation": "linear", "inputShape": [null]}
  ],
  "optimizer": "sgd",
  "loss": "meanSquaredError",
  "epochs": 100
}

const model = tf.sequential();

model_architecture = specify_layers.specify_layers(model, json_string);

/* model_architecture.compile({optimizer: json_string["optimizer"], loss: json_string["loss"]});

const xs = tf.randomNormal([100, 10]);
const ys = tf.randomNormal([100, 1]);

model_architecture.fit(xs, ys, {
  epochs: json_string["epochs"],
  callbacks: {
    onEpochEnd: async (epoch, log) => {
      console.log(`Epoch ${epoch}: loss = ${log.loss}`);
    }
  }
}); */