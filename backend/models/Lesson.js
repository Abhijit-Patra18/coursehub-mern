import mongoose from "mongoose";


const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;