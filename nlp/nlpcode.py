import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from textblob import TextBlob



cred = credentials.Certificate('firebase-sdk.json')

firebase_admin.initialize_app(cred)


db=firestore.client()

docs = db.collection('post').stream()

for doc in docs:
    data = doc.to_dict()
    #print('user :   '+doc.id)
    comments = db.collection('post').document(doc.id).collection('comment').stream()
    for comment in comments:
        #print(comment.id)
        com = comment.to_dict()
        print(com['comment'])
        if com['flag']== 0 :
            peer=TextBlob(com['comment'])
            if(peer.sentiment.polarity>0):

                if(peer.sentiment.polarity>0.5):
                    polarity=10
                else:
                    polarity=7

            elif(peer.sentiment.polarity<0):
                if(peer.sentiment.polarity<-0.5):
                    polarity=0
                else:
                    polarity=2.5

            else:
                polarity=5
            print(polarity)
            db.collection('post').document(doc.id).collection('comment').document(comment.id).update({
                'flag' : 1
            })
            storerating = db.collection('user').document(com['userid']).collection('nlprating')
            storerating.add({
                'rating' : polarity,
                'postid' : doc.id,
                'commentid' : comment.id

            })
            
    # print('{} => {}'.format(doc.id, doc.to_dict()))
 