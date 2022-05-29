# -*- coding: utf-8 -*-

"""
praw based scraper
"""

import praw
import requests
import json
import time
import os, sys
from datetime import datetime
from PIL import Image

url = 'http://rest:2701/'

limit = 100

image_types = ["jpeg", "jpg", "gif", "png"]

if os.environ.get('IN_DOCKER_CONTAINER'):
    image_folder = "/opt/data/"
else:
    image_folder = "../data_temp/"

with open('reddit_config.json', 'r') as f:
  data = json.load(f)

reddit = praw.Reddit(
    client_id=data["client_id"],
    client_secret=data["client_secret"],
    password=data["password"],
    user_agent=data["user_agent"],
    username=data["username"],
)

if(reddit.user.me() == "fISHICAL_"):
    print("[*] connected to reddit api")

def norm(fn):
    validchars = "-_."
    out = ""
    for c in fn:
      if str.isalpha(c) or str.isdigit(c) or (c in validchars):
        out += c
      else:
        out += "_"
    return out

def createSubreddit(subreddit):
    response = requests.get((url + 'sub/getSubreddit'),
                            data={'subreddit': subreddit},
                            headers={})

    if(subreddit not in response.text):
        response = requests.post((url + 'sub/addSubreddit'),
        data={
            'subreddit': subreddit,
            'favorite': 0
        },
        headers={})

def main():
    while True:
        upvoted = reddit.user.me().upvoted(limit=limit)

        for i, item in enumerate(upvoted):

            type_ending = item.url.split(".")[-1]

            data={
                'subreddit': item.subreddit.display_name,
                'created_utc': datetime.utcnow(),
                'title': item.title,
                'file': norm(item.title) + str(item.created_utc) + "." + type_ending,
                'nsfw': 1 if item.over_18 == True else 0,
                'saved': 1 if item.saved == True else 0,
                'permalink': "https://reddit.com" + item.permalink
            }

            response = requests.post((url + 'image/getImage'),
                data=data,
                headers={})

            if(data["subreddit"] not in response.text):
                if type_ending in image_types:
                    os.makedirs(image_folder + data["subreddit"], exist_ok=True)
                    
                    filename = image_folder + data["subreddit"] + "/"  + data["file"]

                    r = requests.get(item.url, allow_redirects=True)
                    open(filename, 'wb').write(r.content)

                    im = Image.open(filename)
                    print(im.size)
                    width, height = im.size

                    createSubreddit(data["subreddit"])

                    data["width"] = width
                    data["height"] = height

                    response = requests.post((url + 'image/addImage'),
                    data=data,
                    headers={})

                    if(response.status_code == 200):
                        pass

                    print(i, "-", data["title"], data["subreddit"])
        
        time.sleep(600)


if __name__ == '__main__':
    main()
