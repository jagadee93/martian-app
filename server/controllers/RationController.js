const { json } = require("body-parser");
const Ration = require("../model/RationModel")

const viewInventory = async (req, res) => {

    const inventory = await Ration.find().exec();
    console.log(inventory);
    if (!inventory) return res.status(204).json({ "message": "no ration found" });
    res.json(inventory);
}


const addRation = async (req, res) => {
    console.log(req.body);
    const { PacketID, PacketType, PacketContent, calories, ExpiryDate, Quantity } = req?.body;
    const duplicate = await Ration.findOne({ "PacketID": PacketID }).exec();
    console.log(duplicate, "duplicate packet");
    if (duplicate) return res.status(409).json({ "message": "packet id must be unique" }); //conflict 
    console.log(PacketID, PacketType, PacketContent, calories, ExpiryDate, Quantity)
    if (!PacketType || !PacketID) return res.status(400).json({ "message": "Packet Type and Packet ID  is required" });
    try {
        const result = await Ration.create({
            "PacketID": PacketID,
            "PacketType": PacketType,
            "PacketContent": PacketContent,
            "calories": calories,
            "ExpiryDate": ExpiryDate,
            "Quantity": Quantity
        });
        console.log(result, "result");
        return res.status(201).json({ "success": `new packet ${PacketID} is added to inventory` });
    } catch (err) {
        return res.status(500).json({ "message": err.message });
    }
}


const DeleteRation = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ "message": "Packet ID is required" });
    const item = await Ration.findOne({ PacketID: req.params.id });
    if (!item) return res.status(204).json({ "message": "item not found" });
    const result = await item.deleteOne();
    console.log(result);
    return res.status(200).json({ "message": `item with id ${result.PacketID} successfully deleted ` });
}
const scheduleRation = async (req, res) => {
    // console.log("scheduleRation")
    const inventory = await Ration.find().select('PacketID  PacketType calories ExpiryDate Quantity')
    // console.log(inventory);
    if (!inventory) return res.status(204).json({ "message": "no ration found" });

    const dataArray = inventory?.map((each) => {
        return each.calories
    })

    const water = inventory?.map((each) => {
        return each.Quantity
    })

    const waterRemaining = water.filter(
        element => typeof element === 'number'
    );
    // console.log(waterRemaining);


    const sum = waterRemaining.reduce((partialSum, a) => partialSum + a, 0);
    console.log(sum,"sum of water"); 
    console.log(sum/2)
    const calories = dataArray.filter(
        element => typeof element === 'number'
    );
    let requiredCalories = 2500;
    let surviveDays = 0
    calories.sort((a, b) => b - a)
    let i = 0;
    while (i < calories.length) {
        if (requiredCalories <= calories[i]) {
            requiredCalories -= calories[i];
            i++;
        } else {
            if (requiredCalories === 0) {
                requiredCalories += 2500
                surviveDays += 1
            } else {
                requiredCalories -= calories[i]
                i++;
                surviveDays += 1
            }
        }
    }
    
    const surviveDays2=sum/2
    // console.log(surviveDays2)
    const result=surviveDays<surviveDays2?surviveDays:surviveDays2
    // console.log(surviveDays)
    res.json({result,inventory:inventory})


}

module.exports = {
    viewInventory,
    DeleteRation,
    addRation,
    scheduleRation
}

