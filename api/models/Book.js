const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    title: String,
    tags: [String],
    genre: String,
    synopsis: String,
    status: String,
    publicationDate: Date,
    characters: [{
        name: String,
        appearance: [String],
        personality: [String],
        affiliations: [String],
        gender: String,
        race: String,
        backgroundInfo: String,
        powers: [{
            powerType: String,
            powersOfType: [String]
        }],
        equipment: [{
            equipmentType: String,
            equipmentName: String,
            equipmentDescription: String,
        }],
    }],
    chapters: [{
        title: String,
        content: String,
        chapterNumber: Number,
        dateCreated: {type: Date, default: Date.now},
    }],
    outlines : [{
        forChapterNumber: Number,
        content: String,
    }],
    worldBuilding: {
        territories: [{
            territoryName: String,
            territoryDetails: String,
            placesInTerritory: [{
                placeName: String,
                placeDetails: String,
            }],
        }],
        races: [{
            raceName: String,
            raceDetails: String,
        }],
        worldHistoryDetails: String,
        worldGeographyDetails: String,
        worldTechnologyDetails: String,
        worldEconomyDetails: String,
        worldPowerSystem: {
            powerSystemDetails: String,
            powerSystemRankings: [{
                rankName: String,
                rankDescription: String,
            }],
        },
    },
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;