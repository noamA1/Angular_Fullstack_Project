# Shopping App

I built the site as part of a full stack course, the site is a super online shopping site, where there is a presentation of products, categories, placing an order, adding to a shopping cart and viewing previous orders.
There are three types of users on the site:
Admin, who can add, update and delete products and categories as well as update order status.
An employee, who can view all the orders placed on the site and update the status of an order.
And a customer/user, who can make a purchase on the website, add products to his shopping cart and view past orders he made on the website.
On the site there is a preparation for using Google's recapcha, there is a need to add the key that can be found on Google's site.

Each product on the site has an available stock amount, where only the manager can view this data and update it as needed.

The technologies used are:
Server side: node.js
Databases: mongoDB and firebase
Client side: Angular 14

## Installation

To install the libraries included in the project, the following commands must be run:
for the backend:

```bash
    cd backend
    npm install
    npm start
```

for the frontend:

```bash
    cd frontend/client-angular
    npm install
    ng serve --o
```
