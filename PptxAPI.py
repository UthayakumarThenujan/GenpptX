from configparser import ConfigParser
import google.generativeai as genai
import pptx
import streamlit as st
from pptx.util import Inches, Pt
import base64
from datetime import datetime
import os
import json
import pathlib
import textwrap
from IPython.display import display
from IPython.display import Markdown



def to_markdown(text):
  text = text.replace('•', '  *')
  indented_text = textwrap.indent(text, '> ', predicate=lambda _: True)
  indented_text += '>'
  return indented_text


current_datetime = datetime.now()
formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M%S")

config = ConfigParser()
config.read("credentials.ini")
api_key = config["API_KEY"]["google_api_key"]

genai.configure(api_key=api_key)


TITLE_FONT_SIZE = Pt(30)
SLIDE_FONT_SIZE = Pt(16)
model_gemini_pro = genai.GenerativeModel("gemini-pro")

safety_settings = [
    {
        "category": "HARM_CATEGORY_DANGEROUS",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]


def makeListFormatTitles(response):
    slide_titles=[]
    n=0
    y=[]

    for x in to_markdown(response.text):
        if x !=">":
            y.append(x)
        else:
            if n==0:
                result_string = 'Titles:'
                # Remove specific characters using list comprehension
                characters_to_remove = ['1', '2', '3','4','5','6','.','','*']
                result_string = ''.join(char for char in result_string if char not in characters_to_remove)
                slide_titles.append(result_string)
            else:
                result_string = ''.join(y)
                characters_to_remove = ['1', '2', '3','4','5','6','.','','*']
                result_string = ''.join(char for char in result_string if char not in characters_to_remove)
                slide_titles.append(result_string)
                y.clear()
            n=n+1
    return slide_titles[1:]


def makeTitles(response):
    y=[]

    for x in to_markdown(response.text):
        if x !=">":
            y.append(x)
        else:
            continue
    return ''.join(y)



def makeListFormatContent(response):
    slide_Content=[]
    n=0
    y=[]

    for x in to_markdown(response.text):
        if x !=">":
            y.append(x)
        else:
            if n==0:
                result_string = 'Titles:'
                characters_to_remove = ['1', '2', '3','4','5','6','.','','*']
                result_string = ''.join(char for char in result_string if char not in characters_to_remove)
                slide_Content.append(result_string)
            else:
                result_string = ''.join(y)
                characters_to_remove = ['1', '2', '3','4','5','6','.','','*']
                result_string = ''.join(char for char in result_string if char not in characters_to_remove)
                slide_Content.append(result_string)
                y.clear()
            n=n+1
    return list(filter(lambda item: item != '\n', slide_Content[1:]))


def generate_slide_title(topic):
    prompt = f"""Generate 5 slide titles for the given topic '{topic}."""
    response = model_gemini_pro.generate_content(
        prompt,safety_settings=safety_settings
    )
    return response


def generate_presentaion_title(topic):
    prompt = f"""to the presentation get the suitable title in maximum 2 words, about this topic {topic}: """
    response = model_gemini_pro.generate_content(
        prompt,safety_settings=safety_settings
    )
    return response


def generate_slide_content(slide_title):
    # prompt = f"""Generate content only for the slide: '{slide_title}. do not mention with slides, titles, get only content within the one placeholder"""
    prompt = f"""Generate content  for the slide: '{slide_title} in this format title:'' , content:'' , total words should be maximum 60 """
    response = model_gemini_pro.generate_content(
        prompt,safety_settings=safety_settings
    )
    return response

def GetListOfContent(Titles):
    content=[]
    for x in Titles:
        content.append(makeListFormatContent(generate_slide_content(x)))
    return content


def get_ppt_download_link(topic):
    ppt_filename = f"generated_ppt/{topic}_prasentation.pptx"

    with open(ppt_filename, "rb") as file:
        ppt_contents = file.read()

    b64_ppt = base64.b64encode(ppt_contents).decode()

    return f'<a href="data:application/vnd.openxmlformats-officedocument.presentation.presentation;base64,{b64_ppt}" download="{ppt_filename}">Download the Powerpoint presentation </a>'

