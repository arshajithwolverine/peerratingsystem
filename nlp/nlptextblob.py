from textblob import TextBlob
peer=TextBlob("this is good")


if(peer.sentiment.polarity>0):

    if(peer.sentiment.polarity>0.5):
        polarity=2
    else:
        polarity=1

elif(peer.sentiment.polarity<0):
    if(peer.sentiment.polarity<-0.5):
        polarity=-2
    else:
        polarity=-1

else:
    polarity=0
print(polarity)