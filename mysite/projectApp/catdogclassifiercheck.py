import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Convolution2D
from keras.layers import MaxPooling2D
from keras.layers import Dense
from keras.layers import Flatten
from keras import metrics, optimizers, losses
import tensorflow
import joblib
from keras.models import load_model

path = 'C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\media\\catdogimage\\dog\\dog.jpg'

# with open('model_pkl' , 'rb') as f:
#     lr = pickle.load(f)

lr = load_model('saved_model2.pb')

predict = tensorflow.keras.utils.load_img(path, target_size = (64, 64))   
predict_modified = tensorflow.keras.utils.img_to_array(predict)
predict_modified = predict_modified / 255
predict_modified = np.expand_dims(predict_modified, axis = 0)
prediction = lr.predict(predict_modified)

print(prediction)