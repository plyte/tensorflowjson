const tf = require('@tensorflow/tfjs');

// Load the binding:
require('@tensorflow/tfjs-node');  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

// ToDo: Create a function that aquires all of these values to make sure we are constantly up to date
const adv_act_check = ["elu", "leakyReLU", "softmax", "thresholdedReLU"];
const bas_lay_check = ["activation", "dense", "dropout", "embedding", "flatten", "permute", "repeatVector", "reshape"];
const con_lay_check = ["conv1d", "conv2d", "conv2dTranspose", "cropping2D", "depthwiseConv2d", "separableConv2d", "upSampling2d"];

// ToDo: move to helper functions
function key_exists(json_val, param)
{
    return (json_val.hasOwnProperty(param) ? true: true);
}

function advanced_activate(model, layer, i) 
{
    var type = layer["type"];
    switch(type)
    {
        case "elu":
            if (i == 0) {
                model.add(tf.layers.elu(
                    inputShape = layer["inputShape"]
                ))   
            }
            else {
                model.add(tf.layers.elu())
            }
        
        case "leakyReLU":
            if (i == 0) {
                model.add(tf.layers.leakyReLU(
                    inputShape = layer["inputShape"]
                ))   
            }
            else {
                model.add(tf.layers.leakyReLU())
            }
    }
    return model;
}

function basic_layer(model, layer, i)
{
    var type = layer["type"];
    switch(type)
    {
        case "activation":
            model.add(tf.layers.activation(
                {
                    ...layer
                    //activation: (key_exists(layer, "activation") ? true: layer["activation"])
                     
                })
            )

        case "dense":
            model.add(tf.layers.dense(
                {
                    ...layer
                })
            )
    }
    return model;
}

function convolutional_layer(model, json_string)
{

}

function merge_layer(model, json_string)
{

}

function normalization(model, json_string)
{

}


module.exports = {
    specify_layers: function(model, json_string) 
    {
        var i;
        for (i = 0; i < json_string["number_of_layers"]; i++)
        {
            var layer = json_string["layers"][i];
            var type = layer["type"];

            if (adv_act_check.includes(type))
            {
                model = advanced_activate(model, layer, i);
            }
            else if (bas_lay_check.includes(type))
            {
                model = basic_layer(model, layer, i);
            }
            else
            {
                console.log("Truth value not checked");
            }
            /* switch(layer["type"])
            {
                case adv_act_check.includes(layer["type"]):
                    break;
                case bas_lay_check.includes(layer["type"]):
                    model = basic_layer(model, layer, i);
                    break;
                default:
                    console.log("Layer " + i + " value " + layer["type"] + " does not meet criteria");
            } */
            
        }

        return model;
    }
}