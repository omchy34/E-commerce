import express from 'express';
import { createAddress, fetchAddresses, fetchAddressById, deleteAddress } from '../controllers/Address.controller.js';
import {Auth} from "../middleware/user.middleware.js"

const router = express.Router();

router.post('/Addaddress', Auth,createAddress);
router.get('/FetchAddress', Auth ,fetchAddresses); 
router.get('/FetchAddress/:id', Auth ,fetchAddressById); 
router.delete('/DeleteAddress/:id',Auth, deleteAddress);

export default router;
