# Used Car Pricing API

## Features

- Users sign up with email/password
- Users get an estimate for how much their car is worth based on the make/model/year/mileage
- Users can report wha they sold their vehicles for
- Admin have to approve reported sales.

## Structure

### 1) Create a mew user and sign in

- POST /auth/signup
- Body - {email, password}

### 2) Sign in as an existing user

- POST /auth/signin
- Body - {email, password}

### 3) Get an estimate for the cars value

- GET /reports
- Query String - make, model, year, mileage, longitude, latitude

### 4) Report how much a vehicle sold for

- POST /reports
- Body - {make, model, year, mileage, longitude, latitude, price}

### 5) Approve or reject a report submitted by a user

- PATCH /reports/:id
- Body - {approved}
