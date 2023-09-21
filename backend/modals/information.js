import  mongoose from 'mongoose'
const InformationSchema=new mongoose.Schema(
    {
        end_year: Number,
        intensity: Number,
        sector: String,
        topic: String,
        insight: String,
        url: String,
        region: String,
        start_year:Number,
        impact: Number,
        added: Date,
        published: Date,
        country: String,
        relevance: Number,
        pestle: String,
        source: String,
        title: String,
        likelihood: Number
        
    }
)

const Information=mongoose.model("Information",InformationSchema);

export default Information;