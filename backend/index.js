// Importing
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./userModel');
const adminModel = require('./adminModel');
const companyModel = require('./companyModel');
const aluminiModel = require('./aluminiModel');
const facultyModel = require('./facultyModel');

// App Initialization
const JWT_SECRET = "AryaPradeep212";
const port = 9453;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://aryapradeep212:Arya@cluster0.zbd2evl.mongodb.net/?retryWrites=true&w=majority');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//user add
app.post('/register', async (req, res) => {
  const { reg_number, firstName, lastName, dob, email, department, phone, arrers, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await userModel.create({
      reg_number,
      firstName,
      lastName,
      dob,
      email,
      department,
      phone,
      arrers,
      password: hashedPassword,
    });
    return res.send({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

// User view
app.get('/viewuser', async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

// User details fetch (Single)
app.get("/singleuser", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    // Assuming user.dob is your date of birth field and it's in a format that can be parsed by Date
    // Convert it to IST format
      const dob = new Date(user.dob); // Convert the DOB to a Date object
      const istFormattedDob = dob.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      // Update the DOB in user object to the IST formatted string
      // Note: This modifies the user object temporarily for this response. It doesn't change the database.
      user.dob = istFormattedDob;
    
    const {reg_number, firstName, lastName, email, department, phone, arrers, password } = user

    const mk = {reg_number, firstName, lastName, email, department, phone, arrers, password, dob:istFormattedDob}

    res.json(mk);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user data');
  }
});


// Delete user
app.delete('/deleteuser/:id', async (req, res) => {
  var id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.send("Deleted");
});

// Update user
app.put('/updateuser', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT token
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.send("Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
});

// User login
app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ error: "User not found" });
    }
    if (user.blocked) {
      res.send({ status: "User Blocked" });
      return;
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1w",
      });
      if (res.status(201)) {
        return res.json({ status: "ok", data: token, user: user });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

app.post("/adminlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await adminModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1w",
    });
    res.status(200).json({ status: "ok", data: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Admin add
app.post('/createadmin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = new adminModel({
      username,
      password: hashedPassword,
    });
    await result.save();
    res.send("Data Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

// Homepage routing
app.post("/homepage", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    res.send({ status: "ok", data: user });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});

// Company details post
app.post("/addcompany", async (req, res) => {
  try {
    const { isbn, ...companyData } = req.body;
    const newCompany = new companyModel(companyData);
    await newCompany.save();
    res.status(201).send("Company added successfully");
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(400).send("Duplicate key error. Company with same details already exists.");
    } else {
      res.status(500).send("An error occurred while saving the data.");
    }
  }
});

// Company view
app.get('/viewcompany', async (req, res) => {
  try {
    const data = await companyModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

// Company details fetch (Single)
app.get("/singlecompany/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await companyModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

// Delete company
app.delete('/deletecompany/:id', async (req, res) => {
  var id = req.params.id;
  await companyModel.findByIdAndDelete(id);
  res.send("Deleted");
});

// Update company
app.put('/updatecompany/:id', async (req, res) => {
  let id = req.params.id;
  var result = await companyModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

  // Alumini details post
  app.post('/addalumini', async (req, res) => {
    try {
      const result = new aluminiModel(req.body);
      await result.save();
      res.send("Data Added");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while saving the data.");
    }
  });

// Alumini view
app.get('/viewalumini', async (req, res) => {
  try {
    const data = await aluminiModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

// Alumini details fetch (Single)
app.get("/singlealumini/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await aluminiModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

// Delete alumini
app.delete('/deletealumini/:id', async (req, res) => {
  var id = req.params.id;
  await aluminiModel.findByIdAndDelete(id);
  res.send("Deleted");
});

// Update alumini
app.put('/updatealumini/:id', async (req, res) => {
  let id = req.params.id;
  var result = await aluminiModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

// Faculty details post
app.post('/addfaculty', async (req, res) => {
  try {
    const result = new facultyModel(req.body);
    await result.save();
    res.send("Data Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the data.");
  }
});

// Faculty view
app.get('/viewfaculty', async (req, res) => {
  try {
    const data = await facultyModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

// Faculty details fetch (Single)
app.get("/singlefaculty/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await facultyModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch data");
  }
});

// Delete faculty
app.delete('/deletefaculty/:id', async (req, res) => {
  var id = req.params.id;
  await facultyModel.findByIdAndDelete(id);
  res.send("Deleted");
});

// Update faculty
app.put('/updatefaculty/:id', async (req, res) => {
  let id = req.params.id;
  var result = await facultyModel.findByIdAndUpdate(id, req.body);
  res.send("Updated");
});

// Port Checking
app.listen(port, () => {
  console.log('App listening on port 9453');
});