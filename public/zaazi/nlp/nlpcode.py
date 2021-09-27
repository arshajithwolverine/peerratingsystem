import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



cred = credentials.Certificate('firebase-sdk.json')

firebase_admin.initialize_app(cred)


db=firestore.client()

doc_ref = db.collection('post')
docs = doc_ref.stream()

for doc in docs:
    print('{} => {}'.format(doc.id, doc.to_dict()))