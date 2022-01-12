# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import numpy as np
import sklearn
from sklearn.model_selection import train_test_split
import joblib
import pickle
 
# Load dataset
from sklearn.datasets import load_iris
iris = load_iris()
 
X = iris.data
y = iris.target
 
# Split dataset into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3,
                        random_state = 2018)
 
# import KNeighborsClassifier model
from sklearn.neighbors import KNeighborsClassifier as KNN
knn = KNN(n_neighbors = 3)
 
# train model
knn.fit(X_train, y_train)
 
# Save the model as a pickle in a file
filename = 'finalized_model2.sav'
pickle.dump(knn, open(filename, 'wb'))
 
# Load the model from the file
#knn_from_joblib = joblib.load('KNNmodeliris.pkl')
 
# Use the loaded model to make predictions
#knn_from_joblib.predict(X_test)

#file = open ('C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\projectApp\\KNNmodeliris.pkl','rb')
#print(file)
#file.close()