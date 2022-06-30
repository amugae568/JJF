import pymongo
import urllib
import json


def get_db(db_name='db_test'):
	with open("pw", "r") as fp:
		text = fp.read()
		pw_json = json.loads(text)

	id = pw_json['id']
	pw = urllib.parse.quote(pw_json['pw'])
	form = f'mongodb+srv://{id}:{pw}@cluster0.0pacblr.mongodb.net/?retryWrites=true&w=majority'
	client = pymongo.MongoClient(form)
	
	return client[db_name]


if __name__ == '__main__':
	db = get_db()

