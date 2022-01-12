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
import pickle
import joblib
import dill

classifier=Sequential()

from keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(rescale = 1./255,
                                   shear_range = 0.2,
                                   zoom_range = 0.2,
                                   horizontal_flip = True)

# Generating images for the Test set
test_datagen = ImageDataGenerator(rescale = 1./255)
# Creating training set
training_set = train_datagen.flow_from_directory(directory=r'../../mysite/train/',
                                                 target_size = (64, 64),
                                                 batch_size = 32,
                                                 class_mode = 'binary')

# print(training_set)

# Creating the Test set
test_set = test_datagen.flow_from_directory(directory=r'../../mysite/test1/',
                                            target_size = (64, 64),
                                            batch_size = 32,
                                            class_mode = 'binary')

# print(test_set)

#step1-convolution
classifier.add(Convolution2D(32,3,3,input_shape=(64,64,3),activation='relu'))
#step2-maxpooling
classifier.add(MaxPooling2D(pool_size=(2,2)))
#step3-flattening
classifier.add(Flatten())
#step4-fullconnection
classifier.add(Dense(128,activation='relu'))
classifier.add(Dense(1,activation='sigmoid'))

opt = tensorflow.keras.optimizers.SGD(lr=0.001, momentum=0.9)
classifier.compile(optimizer=opt, loss='binary_crossentropy', metrics=['accuracy'])

classifier.fit_generator(training_set,steps_per_epoch=250,epochs=15,validation_data=test_set,validation_steps=2000)

classifier.save('saved_model3.pb')

# dill.loads(dill.dumps(classifier))

# with open('model_pkl', 'wb') as files:
#     pickle.dump(classifier, files)

# filename = 'finalized_model.sav'
# pickle.dump(classifier, open(filename, 'wb'))

def predict_image2(imagepath):
    prediction = predict_image(imagepath,classifier)
    return prediction

def predict_image(imagepath, classifier):
    predict = image.load_img(imagepath, target_size = (64, 64))   
    predict_modified = image.img_to_array(predict)
    predict_modified = predict_modified / 255
    predict_modified = np.expand_dims(predict_modified, axis = 0)
    result = classifier.predict(predict_modified)
    if result[0][0] >= 0.5:
        # prediction = 'dog'
        # probability = result[0][0]
        # print ("probability = " + str(probability))
        return {'animal':'dog','probability':result[0][0]}
        
    return {'animal':'cat','probability':1-result[0][0]}
