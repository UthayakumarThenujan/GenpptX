from fastapi import FastAPI
from pydantic import BaseModel
from Template import *
from fastapi.middleware.cors import CORSMiddleware

class Topic(BaseModel):
    Topic : str
    NoContent: int

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

link = False
html = '<h1> No Presentations</h1>'

@app.post('/topic')
async def postTopic(topic:Topic):
    print(topic.NoContent)
    response = mainDo(topic.Topic, topic.NoContent)
    global link,html
    link,html=response
    print(link)  
    return True

@app.get('/link')
async def link():
    global link
    if link!=False:
        return link
    else:
        return False
    

@app.get('/convert')
async def convert():
    global html
    return html