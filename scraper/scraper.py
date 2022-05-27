# -*- coding: utf-8 -*-

"""
praw based scraper
"""

import praw
import requests
import json
#import pymongo
import time
import json
import os, sys
from PIL import Image

url = 'http://rest:2701/'

limit = 300

#mdbc = pymongo.MongoClient('mongodb://database:27017/')
#mdb = mdbc["reddit"]
#db_subreddits = mdb['subreddits']
#db_images = mdb['images']

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
else:
    print("[!] failed to connect to reddit api")

def norm(fn):
    validchars = "-_."
    out = ""
    for c in fn:
      if str.isalpha(c) or str.isdigit(c) or (c in validchars):
        out += c
      else:
        out += "_"
    return out

def main():
    while True:
        upvoted = reddit.user.me().upvoted(limit=limit)

        for i, item in enumerate(upvoted):
            subreddit = item.subreddit.display_name
            date = item.created_utc
            title = item.title
            type_ending = item.url.split(".")[-1]
            file = norm(item.title) + str(item.created_utc) + "." + type_ending
            nsfw = 1 if item.over_18 == True else 0
            saved = 1 if item.saved == True else 0
            permalink = "https://reddit.com" + item.permalink

            response = requests.post((url + 'image/getImage'),
                data={
                    'subreddit': subreddit,
                    'created_utc': date,
                    'title': title,
                    'file': file,
                    'nsfw': nsfw,
                    'saved': saved,
                    'permalink': permalink
                },
                headers={})

            if(subreddit not in response.text):
                image_types = ["jpeg", "jpg", "gif", "png"]
                if type_ending in image_types:
                    os.makedirs("/opt/data/" + subreddit, exist_ok=True)
                    
                    filename = "/opt/data/" + subreddit + "/"  + file

                    r = requests.get(item.url, allow_redirects=True)
                    open(filename, 'wb').write(r.content)

                    im = Image.open(filename)
                    print(im.size)
                    width, height = im.size

                    response = requests.get((url + 'sub/getSubreddit'),data={'subreddit': subreddit},headers={})

                    if(subreddit not in response.text):
                        response = requests.post((url + 'sub/addSubreddit'),
                        data={
                            'subreddit': subreddit,
                            'favorite': 0
                        },
                        headers={})
                        print("created subreddit", subreddit)

                    response = requests.post((url + 'image/addImage'),
                    data={
                        'subreddit': subreddit,
                        'created_utc': date,
                        'title': title,
                        'file': file,
                        'nsfw': nsfw,
                        'saved': saved,
                        'permalink': permalink,
                        'width': width,
                        'height': height
                    },
                    headers={})

                    if(response.status_code == 200):
                        pass

                    print(i, "-", title, item.subreddit.display_name)
        
        time.sleep(600)


if __name__ == '__main__':
    print("[*] main process")
    main()
