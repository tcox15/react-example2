const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const BookModel = require('./models/Book');
const { reset } = require('nodemon');
const IdeaModel = require('./models/Idea');

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hg3253975wf32i23ibwgw464yw22';


// mongodb+srv://venetia:Ey47hBF6SZMsVcv@books.79sov2e.mongodb.net/?retryWrites=true&w=majority
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// 1FRIZ8EMWAjsbDaN
// mongodb+srv://homiscide1:1FRIZ8EMWAjsbDaN@books.87tbi0y.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(4000);
        console.log('connected to server')
    })
    .catch(err => console.log(err));

app.post('/register', async (req, res) => {
    
    const {
        firstName,
        lastName,
        email,
        password} = req.body;

    try {
        const userDoc = await UserModel.create({
        firstName,
        lastName,
        email,
        password:bcrypt.hashSync(password, bcryptSalt)
    });
    res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req, res) => {
    
    const {email, password} = req.body;

    try {
        const userDoc = await UserModel.findOne({email});

        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    try {
                        if (token) {
                            res.cookie('token', token).json(userDoc).status(200);
                    }
                    }
                     catch(err) {
                        res.status(422).json(err);
                    }
                })
            } else {
                res.status(422).json('password incorrect');
            }
        } else {
            res.status(422).json('email not found');
        }
    } catch (e) {
        res.status(422).json(e);
    };
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const userDoc = { firstName, lastName, email, _id } = await UserModel.findById(userData.id);
            if (userDoc) {
                res.json({firstName, lastName, email, _id, token});
            } else {
                res.status(404).json('User not found');
            }
        })
    } else {
        res.status(401).json('No token available');
    }
});


app.post('/books', async (req, res) => {
    const {
        title, genre, synopsis, tags
    } = req.body;

    const {token} = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        try {
            const bookDoc = await BookModel.create({
                author: userData.id,
                title,
                genre,
                synopsis,
                tags
            });
            res.json(bookDoc);
        } catch (err) {
            res.status(422).json(err);
        }
    });
});


app.get('/user-books', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        try {
            const {id} = userData;
            res.json( await BookModel.find({author: id}));
        } catch (err) {
            res.status(422).json(err);
        }
    });
});

// Define a new route handler for GET requests to '/all-books'
app.get('/all-books', async (req, res) => {
    // Use the BookModel to find all books in the database. 
    // The 'populate' method replaces the 'author' field (which is an ObjectId) 
    // with the actual document from the UserModel collection.
    const books = await BookModel.find().populate('author', 'firstName lastName _id');
    
    // Send the books (with the author names included) as a JSON response
    res.json(books);
});

app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bookInfo = await BookModel.findById(id);
        res.json(bookInfo);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books', async (req, res) => {
    const {token} = req.cookies;
    const {id, title, genre, synopsis, tags, chapters, characters} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookDoc = await BookModel.findById(id);
        if (userData.id === bookDoc.author.toString()) {
            bookDoc.set({
                author: userData.id,
                title,
                genre,
                synopsis,
                tags,
            });
            await bookDoc.save();
            res.json('ok');
        }
    });
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await BookModel.findByIdAndDelete(id);
        res.json('deleted');
    } catch (err) {
        res.status(422).json(err);
    }
});

app.get('/:id/characters/', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookDoc = await BookModel.findById(id);
        if (userData.id === bookDoc.author.toString()) {
            res.json(bookDoc.characters);
        } else {
            res.json(err);
        }
    })
});

app.put('/:id/characters/new', async (req, res) => {
    const { id } = req.params;
    const { name, gender, race,
            appearance, personality, affiliations,
            powers, equipment, backgroundInfo } = req.body;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const bookDoc = await BookModel.findById(id);
        if (userData.id === bookDoc.author.toString()) {
            const characterData = {
                name,
                gender,
                race,
                appearance,
                personality,
                affiliations,
                powers,
                equipment,
                backgroundInfo
            }
            bookDoc.set({
            characters: [...bookDoc.characters, characterData]
        });
        await bookDoc.save();
        res.json('character saved')
        }
    });
});

app.delete('/books/:id/character/:characterId', async (req, res) => {
    try {
        const { id, characterId } = req.params;
        const result = await BookModel.findByIdAndUpdate(
            id,
            { $pull: { characters: { _id: characterId.toString() } } },
            { new: true }
        );
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/books/:id/character/:characterId', async (req, res) => {
    try {
        const { id: bookId, characterId } = req.params;
        const bookInfo = await BookModel.findById(bookId);
        const characterInfo = bookInfo.characters.filter((character, index) => character._id.toString() === characterId);
        res.json(characterInfo);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/character/:characterId', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id: bookId, characterId } = req.params;
        const { name, gender, race, appearance, backgroundInfo, personality, affiliations, powers, equipment } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(bookId);
            if (userData.id === bookDoc.author.toString()) {
                const characterIndex = bookDoc.characters.findIndex(character => character._id.toString() === characterId);
                if (characterIndex !== -1) {
                    bookDoc.characters[characterIndex] = { name, gender, race, appearance, backgroundInfo, personality, affiliations, powers, equipment };
                    await bookDoc.save();
                }
            }
        });
        res.json('character changes saved');
    } catch (err) {
        res.status(422).json(err);
    }
});

app.get('/books/:id/chapters/chapterCount', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (bookDoc.chapters && bookDoc.chapters.length > 0) {
                res.json(bookDoc.chapters.length + 1);
            } else {
                res.json(1);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/chapters/new', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;
        const { title, content, chapterNumber } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                const utcDate = new Date(Date.now());
                const options = { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' };
                const centralDate = utcDate.toLocaleDateString('en-US', options);
                bookDoc.set({
                    chapters: [...bookDoc.chapters, {title, content, chapterNumber, dateCreated: centralDate}]
                });
                await bookDoc.save();
                res.json('chapter saved');
            }
        })
    } catch (err) {
        res.status(422).json(err);
    }
});


app.get('/books/:id/chapters', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                const chaptersData = bookDoc.chapters;
                res.json(chaptersData);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.get('/books/:id/chapter/:chapterIndex', async (req, res) => {
    try {
        const { id, chapterIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                const chapterData = bookDoc.chapters.find((id, index) => index === Number(chapterIndex));
                res.json(chapterData);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/chapter/:chapterIndex', async (req, res) => {
    try {
        const { id, chapterIndex } = req.params;
        const { title, content } = req.body;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                const chapter = bookDoc.chapters[Number(chapterIndex)];
                chapter.title = title;
                chapter.content = content;
                await bookDoc.save();
            }
        });
        res.json('chapter saved')
    } catch (err) {
        res.status(422).json(err);
    }
});

app.delete('/books/:id/chapter/:chapterIndex', async (req, res) => {
    try {
        const { id, chapterIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.chapters.splice(Number(chapterIndex), 1);
                await bookDoc.save();
                res.json(bookDoc.chapters);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/info', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { worldHistoryDetails, worldGeographyDetails, worldTechnologyDetails, worldEconomyDetails } = req.body;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                const worldInfo = {worldHistoryDetails, worldGeographyDetails, worldTechnologyDetails, worldEconomyDetails};
                const worldBuildingObject = bookDoc.worldBuilding;
                worldBuildingObject.worldHistoryDetails = worldHistoryDetails;
                worldBuildingObject.worldGeographyDetails = worldGeographyDetails;
                worldBuildingObject.worldTechnologyDetails = worldTechnologyDetails;
                worldBuildingObject.worldEconomyDetails = worldEconomyDetails;
                await bookDoc.save();
                res.json(worldInfo);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.get('/books/:id/world-building/info', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.worldBuilding);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/territories', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;
        const { territoryName, territoryDetails, placesInTerritory } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories = [...bookDoc.worldBuilding.territories, {territoryName, territoryDetails, placesInTerritory}];
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/territories/edit/:territoryIndex', async (req, res) => {
    try {
        const { id, territoryIndex } = req.params;
        const { token } = req.cookies;
        const { territoryName, territoryDetails } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories[territoryIndex].territoryName = territoryName;
                bookDoc.worldBuilding.territories[territoryIndex].territoryDetails = territoryDetails;
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.get('/books/:id/world-building/territories', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.delete('/books/:id/world-building/territories/:territoryIndex', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id, territoryIndex } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories.splice(Number(territoryIndex), 1);
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/territories/:territoryIndex', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id, territoryIndex } = req.params;
        const territoryIndexNum = Number(territoryIndex);
        const placeData = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories[territoryIndexNum].placesInTerritory = [...bookDoc.worldBuilding.territories[territoryIndexNum].placesInTerritory, placeData];
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/territories/:territoryIndex/places/:placeIndex/edit', async (req, res) => {
    try {
        const { id, territoryIndex, placeIndex } = req.params;
        const { placeName, placeDetails } = req.body;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories[territoryIndex].placesInTerritory[placeIndex].placeName = placeName;
                bookDoc.worldBuilding.territories[territoryIndex].placesInTerritory[placeIndex].placeDetails = placeDetails;
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.delete('/books/:id/world-building/territories/:territoryIndex/:placeInTerritoryIndex', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id, territoryIndex, placeInTerritoryIndex } = req.params;
        const territoryIndexNum = Number(territoryIndex);
        const placeInTerritoryIndexNum = Number(placeInTerritoryIndex);
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.territories[territoryIndexNum].placesInTerritory.splice(placeInTerritoryIndexNum, 1);
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.territories);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/race', async (req, res) => {
    try {
        const raceData = req.body;
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.races = [...bookDoc.worldBuilding.races, raceData];
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.races);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.delete('/books/:id/world-building/race/:raceIndex', async (req, res) => {
    try {
        const { id, raceIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.races.splice(Number(raceIndex), 1);
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.races);
            }
        });
    } catch (err) {res.status(422).json(err)}
});

app.get('/books/:id/world-building/races', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.worldBuilding.races);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/:raceIndex', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id, raceIndex } = req.params;
        const { newDetails } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.races[Number(raceIndex)].raceDetails = newDetails;
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.races);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/power-system/rank', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        const newRank = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.worldPowerSystem.powerSystemRankings = [...bookDoc.worldBuilding.worldPowerSystem.powerSystemRankings, newRank];
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.worldPowerSystem);
            }
        });
    } catch (err) {
        res.json(422).json(err)
    }
});

app.get('/books/:id/world-building/power-system', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.worldBuilding.worldPowerSystem);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.delete('/books/:id/world-building/power-system/rank/:rankIndex', async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id, rankIndex } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.worldPowerSystem.powerSystemRankings.splice(Number(rankIndex), 1);
                console.log(bookDoc.worldBuilding.worldPowerSystem.powerSystemRankings);
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.worldPowerSystem);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/power-system/details', async (req, res) => {
    try {
        const { powerSystemDetails } = req.body;
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.worldPowerSystem.powerSystemDetails = powerSystemDetails;
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.worldPowerSystem);
            }
        });
    } catch (err) {
        res.status(422).json(err);
    }
});

app.put('/books/:id/world-building/power-system/rank/:rankIndex', async (req, res) => {
    try {
        const { rankDescription } = req.body;
        const { token } = req.cookies;
        const { id, rankIndex } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.worldBuilding.worldPowerSystem.powerSystemRankings[Number(rankIndex)].rankDescription = rankDescription;
                await bookDoc.save();
                res.json(bookDoc.worldBuilding.worldPowerSystem);
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.get('/books/:id/outlines/checkOutlineNumber/:forChapterNumber', async (req, res) => {
    try {
        const { id, forChapterNumber } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                let outlineWithNumber = bookDoc.outlines.find(obj => obj.forChapterNumber === Number(forChapterNumber));
                if (outlineWithNumber) {
                    res.json(false);
                } else {res.json(true)}
            }
        });
    } catch (err) {res.status(422).json(err)}
});

app.put('/books/:id/outlines/new', async (req, res) => {
    try {
        const { forChapterNumber, content } = req.body;
        const outlineData = {forChapterNumber, content};
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.outlines = [...bookDoc.outlines, outlineData];
                await bookDoc.save();
                res.json(bookDoc.outlines);
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.get('/books/:id/outlines', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.outlines);
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.delete('/books/:id/outlines/:outlineIndex', async (req, res) => {
    try {
        const { id, outlineIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.outlines.splice(Number(outlineIndex), 1);
                await bookDoc.save();
                res.json(bookDoc.outlines);
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.get('/books/:id/outlines/:outlineIndex', async (req, res) => {
    try {
        const { id, outlineIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                res.json(bookDoc.outlines[Number(outlineIndex)]);
            }
        });
    } catch (err) {res.status(422).json(err)}
});

app.put('/books/:id/outlines/:outlineIndex', async (req, res) => {
    try {
        const { id, outlineIndex } = req.params;
        const { content } = req.body;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const bookDoc = await BookModel.findById(id);
            if (userData.id === bookDoc.author.toString()) {
                bookDoc.outlines[outlineIndex].content = content;
                await bookDoc.save();
                res.json('outline edit saved');
            }
        });
    } catch (err) {res.status(422).json(err)}
});

app.post('/ideas', async (req, res) => {
    try {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const existingIdeaDoc = await IdeaModel.findOne({ author: userData.id });
            if (existingIdeaDoc) {
                res.status(409).json('Idea document already exists');
            } else {
                await IdeaModel.create({
                    author: userData.id,
                    ideas: [],
                });
                res.json('Idea document created');
            }
        })
    } catch (err) {res.status(422).json(err)}
});

app.get('/ideas', async (req, res) => {
    try {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { id } = userData;
            const ideaDoc = await IdeaModel.findOne({ author: id });
            res.json(ideaDoc);
        })
    } catch (err) {res.status(422).json(err)}
});

app.put('/ideas/new', async (req, res) => {
    try {
        const { title, content } = req.body;
        const { token } = req.cookies;
        const newIdea = { title, content };
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { id } = userData;
            const ideaDoc = await IdeaModel.findOne({ author: id });
            ideaDoc.ideas = [...ideaDoc.ideas, newIdea];
            await ideaDoc.save();
            res.json('idea saved');
        }
    )} 
    catch (err) {
        res.status(422).json(err)
    }
});

app.delete('/ideas/delete/:ideaIndex', async (req, res) => {
    try {
        const { ideaIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { id } = userData;
            const ideaDoc = await IdeaModel.findOne({ author: id });
            ideaDoc.ideas.splice(Number(ideaIndex), 1);
            await ideaDoc.save();
            res.json(ideaDoc)
        })
    } catch (err) {res.status(422).json(err)}
});

app.get('/ideas/:ideaIndex', async (req, res) => {
    try {
        const { ideaIndex } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { id } = userData;
            const ideaDoc = await IdeaModel.findOne({ author: id });
            res.json(ideaDoc.ideas[Number(ideaIndex)]);
        });
    } catch (err) {res.status(422).json(err)}
});

app.put('/ideas/save/:ideaIndex', async (req, res) => {
    try {
        const { ideaIndex } = req.params;
        const editedIdea = req.body;
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { id } = userData;
            const ideaDoc = await IdeaModel.findOne({ author: id });
            ideaDoc.ideas[Number(ideaIndex)] = editedIdea;
            await ideaDoc.save();
            res.json(ideaDoc.ideas[Number(ideaIndex)]); 
        })
    } catch (err) {res.status(422).json(err)}
});