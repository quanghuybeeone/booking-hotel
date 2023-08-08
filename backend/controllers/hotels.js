import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next)=>{
    const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
        next(err)
    }
}
export const updateHotel = async (req, res, next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedHotel);
      } catch (err) {
        next(err)
    }
}
export const deleteHotel = async (req, res, next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel đã được xóa");
      } catch (err) {
        next(err)
    }
}
export const getHotel = async (req, res, next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
      } catch (err) {
        next(err)
    }
}

export const getHotels = async (req, res, next) => {
  const { min, max, limit, offset, ...others } = req.query;
  // console.log(req.query);
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 0, $lt: max || 10000000 },
    }).limit(limit).skip(offset);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next)=>{
  const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city=>{
      return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "homestay" });
    const resortCount = await Hotel.countDocuments({ type: "vila" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "homestay", count: apartmentCount },
      { type: "vila", count: resortCount }
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

