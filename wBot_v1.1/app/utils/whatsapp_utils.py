import logging
from flask import current_app, jsonify
import json
import requests
import mysql.connector
import datetime
#from app.services.openai_service import generate_response, check_if_thread_exists, store_thread, run_assistant, client
import re

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'arun@1234',
    'database': 'whatsappbot'
}

# Create a MySQL connection
db_connection = mysql.connector.connect(**db_config)
db_cursor = db_connection.cursor()

def log_http_response(response):
    logging.info(f"Status: {response.status_code}")
    logging.info(f"Content-type: {response.headers.get('content-type')}")
    logging.info(f"Body: {response.text}")


def get_text_message_input(recipient, text):
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {"preview_url": False, "body": text},
        }
    )


def generate_response(message_body, wa_id, name, user_id):
    # Return text in uppercase
    #return response.upper()

    # Check if there is already a thread_id for the wa_id
    '''
    thread_id = check_if_thread_exists(wa_id)

    # If a thread doesn't exist, create one and store it
    if thread_id is None:
        logging.info(f"Creating new thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.create()
        store_thread(wa_id, thread.id)
        thread_id = thread.id

    # Otherwise, retrieve the existing thread
    else:
        logging.info(f"Retrieving existing thread for {name} with wa_id {wa_id}")
        thread = client.beta.threads.retrieve(thread_id)

    # Add message to thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=message_body,
    )

    # Run the assistant and get the new message
    new_message = run_assistant(thread, name)
    '''

    # Run the assistant and get the new message
    if (message_body.lower().startswith('hi') or message_body.lower().startswith('hello') or message_body.lower().startswith('hey') or message_body.lower().startswith('hii') or message_body.lower().startswith('hiii') or message_body.lower().startswith('hiiii') or message_body.lower().startswith('hiiiii') or message_body.lower().startswith('hiiiiii') or message_body.lower().startswith('/help') or message_body.lower().startswith('good afternoon') or message_body.lower().startswith('good night') or message_body.lower().startswith('good evening') or message_body.lower().startswith('namaste') or message_body.lower().startswith('good morning') or message_body.lower().startswith('sas') or message_body.lower().startswith('radhe') or message_body.lower().startswith('ram') or message_body.lower().startswith('hey') or message_body.lower().startswith('hallo') or message_body.lower().startswith('  ') or message_body.lower().startswith(' ')):
        save_user_response(user_id, message_body, name, "user_normal_response", datetime.datetime.now())
        bot_reply = "Hey, I am Vikram, an AI Assistant, from Rajasthan Police. I am here to help you.\n\nPick an option to forwarding our conversation further: \n\n 1. /complaint -> if you want to do a commplaint to higher authority \n 2. /assist -> if you want to tell something more about the investigation to the police \n 3. /feedback -> if you want to give feedback to the police \n\n Or you can type your message to me directly. \n\n\n Note: You can type /help to see this message again."
        save_user_response(user_id, bot_reply, "bot", "bot_response", datetime.datetime.now())
        return bot_reply
    
    elif message_body.lower().startswith('/complaint'):
        save_user_response(user_id, "/complaint selected", name, "user_complaint", datetime.datetime.now())
        bot_reply = "ok, now tell me what you want to complain about."
        save_user_response(user_id, bot_reply, "bot", "bot_response", datetime.datetime.now())
        return bot_reply
    
    elif message_body.lower().startswith('/assist'):
        save_user_response(user_id, "/assist selected", name, "user_assist", datetime.datetime.now())
        bot_reply = "Ok, Now tell me what you want to tell about the investigation."
        save_user_response(user_id, bot_reply, "bot", "bot_response", datetime.datetime.now())
        return bot_reply
    
    elif message_body.lower().startswith('/feedback'):
        save_user_response(user_id, "/feedback selected", name, "user_feedback", datetime.datetime.now())
        bot_reply = "Ok, now tell me what you want to tell about your experience, about your complaint officer, their way to handling investigation, everything without hesitation."
        save_user_response(user_id, bot_reply, "bot", "bot_response", datetime.datetime.now())
        return bot_reply   

    else:
        save_user_response(user_id, message_body, name, "user_normal_response", datetime.datetime.now())
        bot_reply = "OK. I will forward your message to the police. Thank you for contacting us."
        save_user_response(user_id, bot_reply, "bot", "bot_response", datetime.datetime.now())
        return bot_reply

    return new_message

def save_user_response(user_id, response, by, response_column, timestamp):
    # Save the user's response to the database

    # If you want to save the current time in a SQL database, convert it to a string
    current_time_str = timestamp.strftime("%Y-%m-%d %H:%M:%S")
    if response_column == "user_normal_response":
        db_cursor.execute("INSERT INTO user_responses (user_id, response_from, user_normal_response, timestamp) VALUES (%s, %s, %s, %s)", (user_id, by, response, timestamp))
    
    elif response_column == "user_complaint":
        db_cursor.execute("INSERT INTO user_responses (user_id, response_from, user_complaint, timestamp) VALUES (%s, %s, %s, %s)", (user_id, by, response, timestamp))
    
    elif response_column == "user_assist":
        db_cursor.execute("INSERT INTO user_responses (user_id, response_from, user_assist, timestamp) VALUES (%s, %s, %s, %s)", (user_id, by, response, timestamp))
    
    elif response_column == "user_feedback":
        db_cursor.execute("INSERT INTO user_responses (user_id, response_from, user_feedback, timestamp) VALUES (%s, %s, %s, %s)", (user_id, by, response, timestamp))

    elif response_column == "bot_response":
        db_cursor.execute("INSERT INTO user_responses (user_id, response_from, bot_response, timestamp) VALUES (%s, %s, %s, %s)", (user_id, by, response, timestamp))

    db_connection.commit()

def send_message(data):
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {current_app.config['ACCESS_TOKEN']}",
    }

    url = f"https://graph.facebook.com/{current_app.config['VERSION']}/{current_app.config['PHONE_NUMBER_ID']}/messages"

    try:
        response = requests.post(
            url, data=data, headers=headers, timeout=10
        )  # 10 seconds timeout as an example
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
    except requests.Timeout:
        logging.error("Timeout occurred while sending message")
        return jsonify({"status": "error", "message": "Request timed out"}), 408
    except (
        requests.RequestException
    ) as e:  # This will catch any general request exception
        logging.error(f"Request failed due to: {e}")
        return jsonify({"status": "error", "message": "Failed to send message"}), 500
    else:
        # Process the response as normal
        log_http_response(response)
        return response


def process_text_for_whatsapp(text):
    # Remove brackets
    pattern = r"\【.*?\】"
    # Substitute the pattern with an empty string
    text = re.sub(pattern, "", text).strip()

    # Pattern to find double asterisks including the word(s) in between
    pattern = r"\*\*(.*?)\*\*"

    # Replacement pattern with single asterisks
    replacement = r"*\1*"

    # Substitute occurrences of the pattern with the replacement
    whatsapp_style_text = re.sub(pattern, replacement, text)

    return whatsapp_style_text


def process_whatsapp_message(body):
    wa_id = body["entry"][0]["changes"][0]["value"]["contacts"][0]["wa_id"]
    name = body["entry"][0]["changes"][0]["value"]["contacts"][0]["profile"]["name"]

    message = body["entry"][0]["changes"][0]["value"]["messages"][0]
    message_body = message["text"]["body"]

    # TODO: implement custom function here
    #response = generate_response(message_body)

    db_cursor.execute("SELECT id FROM users WHERE phone_number = %s", (wa_id,))
    existing_user = db_cursor.fetchone()

    if existing_user:
        user_id = existing_user[0]
    else:
        # Insert a new user into the database
        db_cursor.execute("INSERT INTO users (phone_number) VALUES (%s)", (wa_id,))
        db_connection.commit()
        user_id = db_cursor.lastrowid

    # OpenAI Integration
    response = generate_response(message_body, wa_id, name, user_id)
    response = process_text_for_whatsapp(response)

    data = get_text_message_input(current_app.config["RECIPIENT_WAID"], response)
    send_message(data)


def is_valid_whatsapp_message(body):
    """
    Check if the incoming webhook event has a valid WhatsApp message structure.
    """
    return (
        body.get("object")
        and body.get("entry")
        and body["entry"][0].get("changes")
        and body["entry"][0]["changes"][0].get("value")
        and body["entry"][0]["changes"][0]["value"].get("messages")
        and body["entry"][0]["changes"][0]["value"]["messages"][0]
    )
