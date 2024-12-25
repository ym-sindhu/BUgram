# **BUgram**

A social webapp 

---

## **Getting Started**

Follow these steps to set up the project on your local machine.

### **Prerequisites**
Make sure you have the following installed:
1. **Node.js** (download from [https://nodejs.org/](https://nodejs.org/))
2. **Git** (download from [https://git-scm.com/](https://git-scm.com/))

---

### **Setup Instructions**

1. **Clone the Repository**  
   Open a terminal and run the following command to clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. **Navigate to the Project Directory**
   Change into the directory where the project was cloned:
   ```bash
   cd your-repository
   ```
3. **Install Dependencies**
   Run the following command to install the dependencies listed in package.json and package-lock.json:
   ```bash
   npm install
   ```
### **Running the Project**
   Depending on how your project is set up, you can use one of the following commands:
   • To start the development server:
   ```bash
   npm run dev
   ```
   • To build the project:
   ```bash
   npm run build
   ```
   • To start the production server:
   ```bash
   npm start
   ```
### **Environment Variables**
The project requires environment variables, create a .env file in the root directory and add the required keys. An example .env file might look like this:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=example
PORT=5500
```

## **Common Issues**
```bash
Error: PORT already in use
```
Solution: Change the PORT in your .env file or terminate the process using the port.


```bash
Error: MODULE_NOT_FOUND
```
Solution: Ensure you ran npm install before starting the project.

## **License**
