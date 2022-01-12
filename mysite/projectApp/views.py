# from catdog import irispredict
from django.http.request import HttpRequest
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .Serializers import PostSerializer
from .models import imageData

from scipy import ndimage
import nibabel as nib
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


from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import pickle
import os




# Create your views here.
# @csrf_exempt
# def image(request):
#     if request.method=='GET':
#         return HttpResponse('hello')
#     if request.method=='POST':
#         # print('image received by backend yeehaw')
#         # body_unicode = request.body.decode('utf-8')
#         # body = json.loads(body_unicode)
#         # content = body['image']
#         # print(request.POST)
#         posts_serializer = PostSerializer(data=request.data)
#         if posts_serializer.is_valid():
#             posts_serializer.save()
#             return HttpResponse(posts_serializer.data)
#         # for key in request.POST:
#         #     print(key)
#         # image = request.POST.get('image')
#         # # title = request.data['title']
#         # title = image.name
#         # imageData.objects.create(title=title, image=image)
#         return HttpResponse({'message': 'image received by backend'},status=200)



# def irispredict(X_test):
#   #  knn_from_joblib = joblib.load('C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\projectApp\\KNNmodeliris.pkl')
#     loaded_model = pickle.load(open('C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\projectApp\\finalized_model.sav', 'rb'))
#     print('pickle says hi')
#     result = loaded_model.predict(X_test)
#     return result
    

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    # def get(self, request, *args, **kwargs):
    #     posts = Post.objects.all()
    #     serializer = PostSerializer(posts, many=True)
    #     return Response(serializer.data)


    def get_model(self,width=128, height=128, depth=64):
        print(width)
        print(height)
        print(depth)
        inputs = tensorflow.keras.Input((width, height, depth, 1))

        x = tensorflow.keras.layers.Conv3D(filters=64, kernel_size=3, activation="relu")(inputs)
        x = tensorflow.keras.layers.MaxPool3D(pool_size=2)(x)
        x = tensorflow.keras.layers.BatchNormalization()(x)

        x = tensorflow.keras.layers.Conv3D(filters=64, kernel_size=3, activation="relu")(x)
        x = tensorflow.keras.layers.MaxPool3D(pool_size=2)(x)
        x = tensorflow.keras.layers.BatchNormalization()(x)

        x = tensorflow.keras.layers.Conv3D(filters=128, kernel_size=3, activation="relu")(x)
        x = tensorflow.keras.layers.MaxPool3D(pool_size=2)(x)
        x = tensorflow.keras.layers.BatchNormalization()(x)

        x = tensorflow.keras.layers.Conv3D(filters=256, kernel_size=3, activation="relu")(x)
        x = tensorflow.keras.layers.MaxPool3D(pool_size=2)(x)
        x = tensorflow.keras.layers.BatchNormalization()(x)

        x = tensorflow.keras.layers.GlobalAveragePooling3D()(x)
        x = tensorflow.keras.layers.Dense(units=512, activation="relu")(x)
        x = tensorflow.keras.layers.Dropout(0.3)(x)

        outputs = tensorflow.keras.layers.Dense(units=1, activation="sigmoid")(x)

                # Define the model.
        model = tensorflow.keras.Model(inputs, outputs, name="3dcnn")
        return model


    def read_nifti_file(self,filepath):
        """Read and load volume"""
        print(filepath)
        # Read file
        scan = nib.load(filepath)
        # Get raw data
        scan = scan.get_fdata()
        return scan


    def normalize(self,volume):
        """Normalize the volume"""
        min = -1000
        max = 400
        volume[volume < min] = min
        volume[volume > max] = max
        volume = (volume - min) / (max - min)
        volume = volume.astype("float32")
        return volume


    def resize_volume(self,img):
        """Resize across z-axis"""
        # Set the desired depth
        desired_depth = 64
        desired_width = 128
        desired_height = 128
        # Get current depth
        current_depth = img.shape[-1]
        current_width = img.shape[0]
        current_height = img.shape[1]
        # Compute depth factor
        depth = current_depth / desired_depth
        width = current_width / desired_width
        height = current_height / desired_height
        depth_factor = 1 / depth
        width_factor = 1 / width
        height_factor = 1 / height
        # Rotate
        img = ndimage.rotate(img, 90, reshape=False)
        # Resize across z-axis
        img = ndimage.zoom(img, (width_factor, height_factor, depth_factor), order=1)
        return img


    def process_scan(self,path):
        """Read and resize volume"""
        # Read scan
        volume = self.read_nifti_file(path)
        # Normalize
        volume = self.normalize(volume)
        # Resize width, height and depth
        volume = self.resize_volume(volume)
        return volume


    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            path = 'C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\media\\catdogimage\\'
            image_path_precise = path+posts_serializer['title'].value +'\\'+ posts_serializer['title'].value
            print(image_path_precise)
            model = tensorflow.keras.models.load_model('C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\projectApp\\trainedmodel10epoch')
            # model.summary()
            # model = self.get_model()
            # model.summary()
            # model.load_weights('C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\projectApp\\3d_image_classification.h5')


            pth = 'C:\\Users\\ASUS\\projects\\RDprax1\\mysite\\media\\catdogimage\\study_0943.nii.gz\\study_0943.nii.gz'
            tester = np.array(self.process_scan(image_path_precise))
            prediction = model.predict(np.expand_dims(tester, axis=0))[0]
            print(prediction[0])

            directory = posts_serializer['title'].value

            finaldelpath = os.path.join(path,directory)
            os.remove(image_path_precise)
            os.rmdir(finaldelpath)

        #    os.remove(dirtoremove)
            output = {'prediction': str(prediction[0])}
            print(output)

            return JsonResponse(output)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)