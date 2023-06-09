require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect('MONGODB', { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Alec Blance',
    age: 22, 
    favoriteFoods: ['you', 'yieee']
  });
  person.save((err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;