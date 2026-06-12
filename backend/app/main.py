from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Message,ChatRequest, ChatResponse
from dotenv import load_dotenv
from app.bedrock import dolphin

load_dotenv()

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins = ["http://localhost:4200"],
                   allow_methods = ["*"],
                   allow_headers = ["*"]
)

@app.post("/api/chat", response_model = ChatResponse)
#don't leave blanks between decorator and function
async def fed(request: ChatRequest):
    # return ChatResponse("Hello New World")
    return ChatResponse(reply=dolphin(request.message, request.history))




