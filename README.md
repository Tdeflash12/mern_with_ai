# JavaScript Backend & MongoDB Notes

## JSON (JavaScript Object Notation)

* Text-based structured data
* Most common format used in APIs

### Conversion

* JSON → JS Object → `JSON.parse()`
* JS Object → JSON → `JSON.stringify()`



# REST API

**REST** – Representational State Transfer

* JSON-based data
* Uses HTTP Methods
* API – Application Program Interface

---

# Naming Conventions (Cases)

* Sentence case: `Hello world`
* Camel case: `helloWorld`
* Pascal case: `HelloWorld`
* Kebab case: `hello-world`
* Snake case: `hello_world`

---

# DRY Technique

**DRY** – Don't Repeat Yourself

---

# Layered Architecture

## 1. Presentation Layer (Frontend)

Handles UI and user interaction.

## 2. API Layer

### Route

* URL Endpoint

### Controller

* Handles HTTP requests & responses
* Sends status codes
* Should be a dumb function (no computation)

---

## 3. Business Logic Layer

### Service

* Pure business logic & computation
* Service methods/functions can communicate with each other

---

## 4. Data Access Layer

* Models
* Repositories
* Schemas
* SQL

---

# Import / Export

Used to share modules between files.

---

# Request Object

* `params`
* `query`
* `body`
* `file`

---

# Logging

Used to track application activity and errors.

---

# MongoDB

* Non-relational database
* Data stored in **Collections & Documents**

| SQL    | MongoDB    |
| ------ | ---------- |
| Table  | Collection |
| Row    | Document   |
| Column | Field      |

---

## MongoDB Tools

* Shell – Terminal
* Compass – Local GUI
* Atlas – Cloud

---

## MongoDB Shell Commands

* `mongosh` → Initialize MongoDB
* `show dbs` → Show database list
* `use <db_name>` → Use database
* `cls` → Clear screen
* `show collections` → Show collections

---

# CRUD Operations

## Create

### insertOne

```
db.products.insertOne({ name: "Iphone 14", price: 1800 })
```

### insertMany

```
db.products.insertMany([])
```

---

## Read

### find

```
db.products.find()
db.products.find({ category: "Monitors" })
```

### findOne

```
db.products.findOne({ name: "Iphone 14" })
```

### countDocuments

```
db.products.countDocuments()
```

---

## Update

### updateOne

```
db.products.updateOne(
  { name: "Iphone 14" },
  { $set: { name: "Iphone 14 pro max" } }
)
```

---

## Delete

### deleteOne

```
db.products.deleteOne({ name: "Iphone 14 pro max" })
```

---

# Complex Filters

* `$eq` – Equal
* `$ne` – Not equal
* `$gt / $gte` – Greater than
* `$lt / $lte` – Less than
* `$in`
* `$and`
* `$or`
* `$not`

### Example

```
db.products.find({ price: { $gt: 3000 } })
db.products.find({ $or: [{ price: 2000 }, { category: "Monitors" }] })
```

---

# Sorting, Limit & Skip

### Sort

```
db.products.find().sort({ price: 1 })   // 1 = asc, -1 = desc
```

### Limit

```
db.products.find().limit(2)
```

### Skip

```
db.products.find().skip(3)
```

---

# Mongoose

* ODM of MongoDB for Node.js
* Schema validation
* Models
* Middleware
* Relationships

### Schema

Structure/rule of document data.

### Model

Class built from schema to interact with database.
Always **singular** and **PascalCase** (e.g., `Product`, `ProductOrder`).

---

# Encryption & Decryption

### Encryption

Converting readable text into unreadable cipher text.
Example:

```
hello → asa8s90a8w90N&*BOIIuihb
```

### Decryption

Cipher text → readable text

---

## Types of Encryption

### Symmetric

* Same key for encryption & decryption
* Example: AES

### Asymmetric

* Public key & Private key
* Example: RSA

---

# Hashing

One-way encryption.

Example:

Register:

```
Test123456 → hashed_value
```

Login:

```
Test123456 → hashed_value (compare)
```

### Salt

Adding random text to hash for extra security.

---

# Authentication

* Login success
* Token generated → JWT
* Store token in:

  * Cookie storage
  * Session storage
  * Local storage

Token must be appended in every request.

---

# JWT – JSON Web Token

* Used for authentication
* Self-verified
* Tamper-proof

### Structure

* Header
* Payload
* Signature

---

# Storage Comparison

## Cookie

* Stored in server & browser
* Size: 4KB
* Expiry can be set
* Available in all tabs

## Session Storage

* Browser only
* Size: 5MB
* Expires when tab closes
* Available in one tab only

## Local Storage

* Browser only
* Size: 5MB–10MB
* Never expires
* Available in all tabs

---

# Middleware

Function between request & response.

```
Browser → Request → Server (Middleware) → Response → Browser
```

### Capabilities

* Access request & response
* Calls `next()`

### Usage

* Logging
* Authentication & Authorization
* Error handling
* Modify request data

---

# Authentication vs Authorization

* **Authentication** → Is user logged in?
* **Authorization** → Is user allowed?

## RBAC – Role Based Access Control

### Single Role

Access hierarchy

### Multiple Roles

* USER → Purchase
* MERCHANT → Product management
* ADMIN → User & order management

---

# Product Order Structure

* userId
* productItems

  * productId
  * quantity
* status
* orderNumber
* totalPrice
* shippingAddress

---

# File Upload

1. Body → FormData → Multer
2. Temporary storage → `/uploads` (Buffer)
3. Upload to Cloudinary (Storage bucket)
4. Store filePath/url in database

---

# Payment Integration (Example: Khalti)

1. Initialize payment → Generate URL
2. User completes payment in Khalti portal
3. Redirect to return URL
4. Update payment status in system

---

# Reset Password Flow

1. User clicks **Forgot Password**
2. Email sent with reset token & link
3. Store token in DB
4. User submits:

   * newPassword
   * confirmPassword
   * token
5. Update password

---

# Code Semantics & Best Practices

* Code readability
* Proper formatting
* Organized folder structure
* Proper naming

## Naming Rules

* JS files → camelCase
* HTML/CSS → kebab-case
* Variables → noun
* Functions → verb
* Routes → lowercase kebab-case
* Always check singular/plural

Add blank lines:

* Above & below `if/else`
* Loops
* Function calls

---

# Debugging

Process of finding errors.

### Steps

1. Check root `app.js`
2. Check routes (spelling & order)
3. Check controllers (params & arguments)
4. Check services (params & arguments)

---

# AI Integration

* Gemini

---

# Multi-Vendor System

Each merchant can:

* Fetch their created products
* View orders on their products
* Update/Delete their products

---

# Future Improvements (Todos)

* Deployment
* TypeScript
* SMS Integration
# mern_with_ai
