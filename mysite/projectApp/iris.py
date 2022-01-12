import pickle

# class iris:
def irispredict(X_test):
        # loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
        # print('pickle says hi')
        # result = loaded_model.predict(X_test)
    result = X_test+1
    print('iris says hi')
    return result