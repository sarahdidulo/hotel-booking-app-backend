import Room from "../models/Room.js";

export const createRoom = async(req, res, next) => {
    try {
        const newRoom = await Room.create(req.body);
        newRoom.save();
        res.json({success: true, room_data: newRoom});
    } catch (err) { 
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const allRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms)
    } catch (err){
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const searchRoom = async(req, res, next) => {
    try {
        let id = req.params.id;
        const room = await Room.findById(id).exec();
        res.json({data: room, success: true});
    } catch (err){
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const updateRoom = async(req, res, next) => {
    try {
        let id = req.params.id;
        const filter = {_id : id};
        const update = { 
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            numberOfPersons: req.body.numberOfPersons,
            imageLink: req.body.imageLink
        }
        const updatedRoom = await Room.findOneAndUpdate(filter, update, {
            returnDocument: 'after'
        });
        
        res.json({success: true, room_data: updatedRoom});
    } catch (err) { 
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const deleteRoom = async(req, res, next) => {
    try {
        let id = req.params.id;
        const room = await Room.findByIdAndDelete(id);
        res.json({success: true, deleted_room: room});
    } catch (err){
        res.status(400).send(`ERROR: ${err}`);
    }
}
// export const uploadFile = async(req, res, next) => {
//     try{
//         res.send('Uploaded Successfully');
//     } catch (err) {
//         res.status(400).send(`ERROR: ${err}`)
//     }
// }