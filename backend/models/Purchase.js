import mongoose from "mongoose";


const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});
const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;