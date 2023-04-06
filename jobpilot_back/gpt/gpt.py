import os
import openai

def init_openai():
    openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_gpt(prompt, max_tokens=1000, stop=None):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.8,
        max_tokens=max_tokens,
        stop=stop
    )
    return response.choices[0].text
    