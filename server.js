var express = require("express")
var app = express()
var port = process.env.port || 3004
const mongoose = require('mongoose');


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/myprojectDB');
  
  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
  });
  
  // 2. Define your schema and model
  const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
  });
  const Project = mongoose.model('Project', ProjectSchema);
  
  // 3. REST API route
  app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
  });
  
  app.post('/api/projects', async (req, res) => {
try {
// Allowlist: only keep fields we expect
const { title, image, link, description } = req.body;
const project = new Project({ title, image, link, 
description });
await project.save();  // schema validation runs here
res.status(201).json({
statusCode: 201,
message: "Project created successfully",
data: project
});
} catch (err) {
res.status(400).json({
statusCode: 400,
message: err.message
});
}
});
  // 4. Start server
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });



  