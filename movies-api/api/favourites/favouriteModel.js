import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  created_at: { type: Date, default: Date.now },
});

FavouriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Favourite", FavouriteSchema);
