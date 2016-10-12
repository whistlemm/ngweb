
exports.dbUrl = getDBUrl()

function getDBUrl(){
    if(process.env.NODE_ENV === 'production') {
        return 'mongodb://49425928cf484655bd9d209e74c0818f:e8927cd1ef584f29b95aa3d5247f97c0@mongo.duapp.com:8908/CmykthbmWwNfuyeFCyje'
    }

    return 'mongodb://localhost:27017/angular'
};
