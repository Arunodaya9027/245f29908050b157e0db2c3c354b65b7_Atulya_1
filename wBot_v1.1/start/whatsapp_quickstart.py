import json
from dotenv import load_dotenv
import os
import requests
import aiohttp
import asyncio

# Load environment variables
load_dotenv()
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
RECIPIENT_WAIDS = os.getenv("RECIPIENT_WAID", ",").split(",")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERSION = os.getenv("VERSION")
APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")

# Function to send a template WhatsApp message
def send_whatsapp_message(recipient):
    url = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"
    headers = {"Authorization": "Bearer " + ACCESS_TOKEN, "Content-Type": "application/json"}
    data = {
        "messaging_product": "whatsapp",
        "to": recipient,
        "type": "template",
        "template": {"name": "hello_world", "language": {"code": "en_US"}},
    }
    response = requests.post(url, headers=headers, json=data)
    return response

# Function to send a custom text WhatsApp message
def send_text_message(recipient, text):
    url = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"
    headers = {"Authorization": "Bearer " + ACCESS_TOKEN, "Content-Type": "application/json"}
    data = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "text",
        "text": {"preview_url": False, "body": text},
    }
    response = requests.post(url, headers=headers, json=data)
    return response

# Send a template WhatsApp message to each recipient
for recipient_waid in RECIPIENT_WAIDS:
    response_template = send_whatsapp_message(recipient_waid)
    print("Template Message Status Code:", response_template.status_code)

# Send a custom text WhatsApp message to each recipient
for recipient_waid in RECIPIENT_WAIDS:
    response_text = send_text_message(recipient_waid, "Hello, this is a test message.")
    print("Text Message Status Code:", response_text.status_code)

# Send a custom text WhatsApp message asynchronously
async def send_message_async(recipient, text):
    url = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"
    headers = {"Authorization": f"Bearer {ACCESS_TOKEN}", "Content-Type": "application/json"}
    data = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "text",
        "text": {"preview_url": False, "body": text},
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=headers) as response:
            if response.status == 200:
                print("Async Status Code:", response.status)
                print("Async Content-type:", response.headers["content-type"])
                html = await response.text()
                print("Async Body:", html)
            else:
                print("Async Status Code:", response.status)
                print("Async Response:", response)

# Run the asynchronous message sending
for recipient_waid in RECIPIENT_WAIDS:
    asyncio.run(send_message_async(recipient_waid, "Async Test Message"))
