import matplotlib.pyplot as plt
from skimage import io

import imgPrep

import numpy as np
from sklearn import svm
from joblib import dump, load

svcclf = load('svcclf.joblib')

img = io.imread('images/guess.png')

data = imgPrep.imgPrep(img)

a = data.reshape(1,784)
p = svcclf.predict(a)
pStr = str(p)

with open('prediction.txt','w') as f:
    f.write(pStr)