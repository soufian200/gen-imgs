import mongoose from 'mongoose';

const strType = {
    type: String,
    required: true,
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({

    name: {
        ...strType,
        maxlength: 20,
    },

    email: {
        ...strType,
        maxlength: 50,
    },

    layers: [
        {
            folderName: strType, imgs: [{
                filename: strType,
                path: strType,
            }]
        }
    ]

})

export default mongoose.models.User || mongoose.model('User', UserSchema)