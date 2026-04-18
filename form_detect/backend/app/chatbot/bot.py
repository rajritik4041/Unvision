# def get_bot_response(message: str):
#     message = message.lower()

#     if "hello" in message:
#         return "Hello 👋"
#     return "Samajh nahi aaya 😅"
# from openai import OpenAI

# client = OpenAI(api_key="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")  # 👈 yaha key daalo

# def get_bot_response(message: str):
#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[{"role": "user", "content": message}]
#     )
#     return response.choices[0].message.content

# import google.generativeai as genai

# # 🔑 API Key set karo (yaha apni Gemini key daalo)
# genai.configure(api_key="AQ.Ab8RN6JQ7GaMTdI0ah3oQl7IwKqyqvpSwFCLumH0dTbTl-Eccg")

# # 🤖 Model initialize
# model = genai.GenerativeModel("gemini-pro")


# # 💬 Function for chatbot response
# def get_bot_response(message: str) -> str:
#     try:
#         response = model.generate_content(message)

#         # ⚠️ Safe handling (kabhi kabhi text empty hota hai)
#         if response and hasattr(response, "text"):
#             return response.text
#         else:
#             return "Kuch response nahi mila 😅"

#     except Exception as e:
#         print("Error:", e)
#         return "Server error aa gaya 😓"
# import google.generativeai as genai
# import os

# 🔑 API Key
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# genai.configure(api_key="AQ.Ab8RN6JQ7GaMTdI0ah3oQl7IwKqyqvpSwFCLumH0dTbTl-Eccg")
# # ✅ Correct model (UPDATED)
# # model = genai.GenerativeModel("gemini-1.5-flash")
# model = genai.GenerativeModel("gemini-1.5-flash-latest")

# def get_bot_response(message: str) -> str:
#     try:
#         response = model.generate_content(message)

#         return response.text if response.text else "No response 😅"

#     except Exception as e:
#         print("Error:", e)
#         return "Server error aa gaya 😓"
    
# from openai import OpenAI

# client = OpenAI(api_key="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")

# def get_bot_response(message: str) -> str:
#     try:
#         response = client.chat.completions.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {"role": "user", "content": message}
#             ]
#         )
#         return response.choices[0].message.content

#     except Exception as e:
#         print("Error:", e)
#         return "Server error aa gaya 😓"
# import google.generativeai as genai

# # genai.configure(api_key="YOUR_GEMINI_KEY")

# model = genai.GenerativeModel("gemini-1.5-flash")

# def get_bot_response(message: str):
#     try:
#         response = model.generate_content(message)
#         return response.text
#     except Exception as e:
#         print("Error:", e)
#         return "Error aa gaya 😅"
# import google.generativeai as genai


# model = genai.GenerativeModel("gemini-2.0-flash")  # ✅ correct
# # for m in genai.list_models():
# #     print(m.name)
# def get_bot_response(message: str):
#     try:
#         response = model.generate_content(message)
#         return response.text
#     except Exception as e:
#         print("Error:", e)
#         return "Error aa gaya 😅"

# import google.generativeai as genai
# import time
# # genai.configure(api_key="YOUR_GEMINI_KEY")

# genai.configure(api_key="AQ.Ab8RN6JQ7GaMTdI0ah3oQl7IwKqyqvpSwFCLumH0dTbTl-Eccg")
# model = genai.GenerativeModel("gemini-2.0-flash")  # ✅ best stable

# def get_bot_response(message: str):
#     try:
#         time.sleep(2)
#         response = model.generate_content(message)

#         if response.candidates:
#             return response.candidates[0].content.parts[0].text
        
#         return "No response मिला 😅"

#     except Exception as e:
#         print("Error:", e)
#         return "Server error 😓"
from groq import Groq

client = Groq(api_key="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")

def get_bot_response(message: str):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": message}
            ],
            model="llama-3.1-8b-instant"
        )

        return chat_completion.choices[0].message.content

    except Exception as e:
        print("Error:", e)
        return "Server error 😓"