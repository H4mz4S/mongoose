//environment var from the .env file
require('dotenv').config();

//import mongoose
const mongoose=require('mongoose');

//connecto mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected!'))
.catch((err) => console.error('Database connection error:', err));

//create a Person
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]  
  });

//create a model from the schema
const Person = mongoose.model('Person',personSchema);

//create and save a record of a model 
const person =new Person({
    name:'hamza',
    age:23,
    favoriteFoods:['ma9rouna','kosksi']

});

// save the person
person.save(function(err,data){
    if(err){
        console.error('error saving',err)
    }else{
        console.log('saved',data);
    }
});

// Create Many Records 
const arrayOfPeople = [
    { name: 'oussema', age: 22, favoriteFoods: ['ma9rouna', 'kafteji'] },
    { name: 'aziz', age: 23, favoriteFoods: ['ma9loub', 'pizza'] },
    { name: 'omar', age: 22, favoriteFoods: ['salade', 'mar9a'] }
  ];
  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      console.error('Error creating people:', err);
    } else {
      console.log('People created:', people);
    }
  });

//Use model.find() to Search by name
Person.find({ name: 'hamza' }, function (err, people) {
    if (err) {
      console.error('Error finding people:', err);
    } else {
      console.log('People found:', people);
    }
  });

// Use model.findOne() by favorite food
Person.findOne({ favoriteFoods: 'salade' }, function (err, person) {
    if (err) {
      console.error('Error finding one person:', err);
    } else {
      console.log('Person found:', person);
    }
  });

// Use model.findById()by _id
const personId = '00000000';
Person.findById(personId, function (err, person) {
  if (err) {
    console.error('Error finding person by ID:', err);
  } else {
    console.log('Person found by ID:', person);
  }
});

//perform updates then save
Person.findById(personId, function (err, person) {
    if (err) {
      console.error('Error finding person by ID:', err);
    } else {
      person.favoriteFoods.push('pizza');
      person.save(function (err, updatedPerson) {
        if (err) {
          console.error('Error updating person:', err);
        } else {
          console.log('Person updated:', updatedPerson);
        }
      });
    }
  });

// new Upadates
Person.findOneAndUpdate(
    { name: 'aziz' },
    { age: 30 },
    { new: true },
    function (err, updatedPerson) {
      if (err) {
        console.error('Error updating person:', err);
      } else {
        console.log('Person updated:', updatedPerson);
      }
    }
  );
Person.findByIdAndRemove(personId, function (err, removedPerson) {
  if (err) {
    console.error('Error removing :', err);
  } else {
    console.log('Person removed:', removedPerson);
  }
});

// Chain Search Query Helpers 
Person.find({ favoriteFoods: 'pizza' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec(function (err, data) {
    if (err) {
      console.error('Error finding and filtering people:', err);
    } else {
      console.log('People found and filtered:', data);
    }
  });

