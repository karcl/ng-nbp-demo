#!/usr/bin/env python3

# A simple script to download all NBP data into current directory.
# Use only for development.

# Suggested use (assuming you are in project root directory):
#    cd data/
#    python3 ../tools/get-nbp-data.py

import re
import time
import os.path
import urllib.request as ureq

URL_ROOT = 'http://www.nbp.pl/kursy/xml'
URL_DIR = URL_ROOT + '/dir.txt'
XML_EXTENSION = '.xml'
ENCODING = 'iso-8859-2'

def retrieve_content_from(url):
    response = ureq.urlopen(url)
    return response.read().decode(ENCODING)

def save_content_to_file(content, filename):
    with open(filename, 'w') as output:
        output.write(content)

def url2filename(url):
    return url.split('/')[-1]

def download_info(url, filename):
    print('Downloading "%s" to "%s"' % (url, filename))

def download_all_xmls(xml_list):
    for xml in xml_list:
        xml_item = xml.strip()
        if (re.match(r'[abch]+.*', xml_item)):
            xml_file = xml_item + XML_EXTENSION
            url = URL_ROOT + '/' + xml_file
            if (not os.path.isfile(xml_file)):
                download_info(url, xml_file)
                xml_content = retrieve_content_from(url)
                save_content_to_file(xml_content, xml_file)
                time.sleep(3)

def clean_bad_chars(text):
    clean = [ ch for ch in list(text) if ch.isalnum() ]
    return ''.join(clean)

def download_all_files():
    dir_content = retrieve_content_from(URL_DIR);
    file_name = url2filename(URL_DIR)
    download_info(URL_DIR, file_name)
    save_content_to_file(dir_content, file_name)
    xml_list_raw = dir_content.split('\n')
    xml_list = [ clean_bad_chars(item) for item in xml_list_raw ]
    download_all_xmls(reversed(xml_list))

if __name__ == '__main__':
    download_all_files()
