// locationModel.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  // Add other fields related to the location if needed
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
