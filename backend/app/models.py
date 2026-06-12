from pydantic import BaseModel
from typing import Literal

class Message(BaseModel):
    role:Literal["user","assistant"]
    content:str

class ChatRequest(BaseModel):
    message:str
    history: list[Message]

class ChatResponse(BaseModel):
    reply:str
