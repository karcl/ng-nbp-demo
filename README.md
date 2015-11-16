# ng-nbp-demo — angular tdd demo application

This is simple Angular project to retrieve and display NBP currency exchange rate data.
It also showcases some TDD using tools such as karma, jasmine, phantomjs.
The API provided by NBP alhtough crude proved to be quite tricky to use - it consists of
dir.txt file which contains list of other xml files which are encoded in ISO-8859-2.

To use it with angular I had figure it out how to covnvert XML data to JSON - x2js proved
to be great aid with dealing with this issue.


## Getting Started

1. git clone http://github.com/karcl/ng-nbp-demo
2. cd ng-nbp-demo
3. npm install
4. bower install
5. mkdir data
6. cd data
7. ../tools/get-nbp-data.py
8. gulp serve # runs server
9. gulp test # runs unit tests


## Directory Layout

To be done.


### End to end testing

To be done.

