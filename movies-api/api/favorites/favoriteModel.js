import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  created_at: { type: Date, default: Date.now() }, // default value is set to the current date and time when a new document is created
});


// Ensure that each user can only have one favouite for each movie (no duplicates)
FavoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Favorite", FavoriteSchema);
