import numpy as np
import matplotlib.pyplot as plt
from skimage import io
from skimage.transform import resize
from skimage.color import rgba2rgb
from skimage.color import rgb2gray
from PIL import Image


def imgPrep(image):
#    if __name__=="__main__":    
# in short, open image -> trim empty pixel around the number -> pad the number for later ML recognizing.
        imgTrimmed = trim(image)
        finalPNG = padImg(imgTrimmed)
        final = scaleImg(finalPNG)
        final = noiseReduce(final)

        return final
    
    

def trim(img):
# delete rows with empty pixels above and below written number
        templs = []
        for i in img:
            if i.any() != 0:
                    templs.append(i)
        tempArray = np.array(templs)
        
# rotate the image 90 degrees and delete again
        tempArrayRo = np.rot90(tempArray)

        templs = []
        for i in tempArrayRo:
            if i.any() != 0:
                    templs.append(i)
        tempArray2 = np.array(templs)
        
# rotate it back then output     
        croppedImg = np.rot90(tempArray2,3)

        return croppedImg


def padImg(croppedImg):
# get image width and height, add 1 row/column if it's a odd number
        imgW = croppedImg.shape[0]
        imgH = croppedImg.shape[1]
        imgTemp = croppedImg

        if imgW%2 != 0:
            imgW+=1
            imgTemp = np.pad(imgTemp,((1,0),(0,0),(0,0)))

        if imgH%2 != 0:
            imgH+=1
            imgTemp = np.pad(imgTemp,((0,0),(1,0),(0,0)))

# set the image output as a sqaure with the longer axis, then pad it to 120% of its size
        if imgW > imgH:
            imgPixel = imgW
        else:
            imgPixel = imgH

        imgPixel = int(imgPixel*1.2)

        padH = int((imgPixel - imgH)*0.5)
        padW = int((imgPixel - imgW)*0.5)

        pads = ((padW,padW),(padH,padH),(0,0))
        finalPNG = np.pad(imgTemp,pads,constant_values = 0)

        return finalPNG

def scaleImg(finalPNG):
# convert png to rgb -> rgb to gray -> scale to 28*28 

        final = rgba2rgb(finalPNG)
        final = rgb2gray(final)
# skimg turns the data value into 0-1, set it back to 255 range to work with ML model
        final = final*255
        
        final = resize(final, (28, 28)).astype('uint8')
# invert colour to work with ML model
        final = 255-final
        
        return final

    
def noiseReduce(data):
# loop and look up for value under 50 and set to 0 in the data array
    for i in range(0,len(data)):
        for k in range(0,len(data[i])):
            if data[i][k] < 50:
                data[i][k] = 0
# enhance writting to improve result           
        # elif data[i][k] > 200:
        #     data[i][k] = 255            
    return data



# For debugging

# image = io.imread('images/guess.png')
# imgPrep(image)
