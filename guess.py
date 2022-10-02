import random

num = random.randint(1,9)
resultStr = 'randint is '+ str(num)
print (resultStr)

with open('result.txt','w') as f:
    f.write(resultStr)
