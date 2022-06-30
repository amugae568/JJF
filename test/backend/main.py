from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson.objectid import ObjectId
import pymongo
import client


db = client.get_db()
app = FastAPI()

origins = [
	"http://localhost:3000",
	"localhost:3000"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

@app.get("/")
async def root():
	return { "message": "Hello World" }


@app.post("/login")
async def login(request : dict):

	response = {
		"message": "",
		"success": False
	}
	result = db.users.find_one({ 'id':request['id'] })

	if not result or result['password'] != request['password']:
		response['message'] = "password or id in not valid."
		return response
	
	response['success'] = True;
	response['message'] = "successed"
	return response


@app.post("/register")
async def register(request : dict):
	response = {
		"success": False,
		"message": ""
	}
	
	result = db.users.find_one({"id":request['id']})
	if result is not None:
		response['message'] = 'The id is already in use.'
		return response
	
	db.users.insert_one(request)
	response['success'] = True
	response['message'] = 'success'
	return response

@app.post("/setting")
async def setting(request : dict):
	res = {
		"success":False,
		"message":""
	}
	
	result = db.users.find_one({"id":request['id']})
	if result is None:
		res['message'] = 'user not found'
		return res
	
	if result['password'] != request['password']:
		res['message'] = "password or id is not matching."
		return res
	
	obj_id = ObjectId(result['_id'])
	db.users.update_one({'_id':obj_id}, { '$set':request})
	res['message'] = "successfully updated"
	res['success'] = True
	return res

@app.post("/delete")
async def delete_user(request : dict):
	res = {
		"success":False,
		"message":""
	}
	
	result = db.users.find_one({"id":request['id']})
	if result is None:
		res['message'] = 'user not found'
		return res
	
	if result['password'] != request['password']:
		res['message'] = "password or id is not matching."
		return res
	
	obj_id = ObjectId(result['_id'])
	db.users.delete_one({'_id':obj_id})
	res['message'] = "successfully deleted"
	res['success'] = True
	return res
