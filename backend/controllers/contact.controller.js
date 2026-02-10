import Contact from "../models/Contact.model.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/* ================= USER SIDE ================= */
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
    });

    await emitDashboardUpdate();

    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ADMIN SIDE ================= */

// GET all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//updatre contact
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete contact
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    await emitDashboardUpdate();
    
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
