const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// @route POST /notification/create
// @desc create a notification
// @access Private
exports.createNotification = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { type, title, description, context } = req.body;
    const notification = await Notification.create({ userId, type, title, description, context });
    res.status(201).json({ message: 'Notification created', notification });
})

// @route GET /notification/all
// @desc get all notification
// @access Private
exports.getAllNotification = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const notifications = await Notification.find({userId: userId})
    res.status(200).json({message: 'Successful in getting all notifications', notifications})
})

// @route GET /notification
// @desc get unread notification
// @access Private
exports.getUnreadNotification = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const unreadNotifications = await Notification.find({ userId, read: false });
    res.status(200).json({ message: 'Successful in getting unread notifications', unreadNotifications})
})

// @route PUT /notification
// @desc update a notification
// @access Private
exports.updateNotification = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const id = req.body.id
    const updatedNotification = await Notification.findOneAndUpdate({ userId, _id:id }, { $set: req.body }, { new: true, runValidators: true });
    res.status(200).json({ message: 'Successfully updated the notification', updatedNotification });
})

// @route PUT /notification/read
// @desc make all notification read
// @access Private
exports.markAllNotificationRead = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const notificationMarkedRead = await Notification.updateMany({ userId , read: { $eq: false}}, { $set: { read: true } }, { new: true });
    res.status(200).json({ message: 'Successfully updated the notification', notificationMarkedRead });
})

