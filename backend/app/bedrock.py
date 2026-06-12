from app.models import Message,ChatRequest, ChatResponse
import boto3

def dolphin(message:str,history:list[Message]):
    # client = boto3.client('bedrock')
    client = boto3.client(
            "bedrock-runtime", region_name='us-east-1')
    # message = ChatRequest.message
    # history = ChatRequest.history

    response = client.converse(
        modelId= 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
        # messages=[{"role": history[i].role, "content": [{"text": history[i].content}]} for i in range(len(history))]
        messages=[{"role": msg.role, "content": [{"text": msg.content}]} for msg in history]
        )

    return response['output']['message']['content'][0]['text']

