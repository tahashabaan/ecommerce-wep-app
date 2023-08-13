const express = require('express');
const{getSubcatacoryServices, 
    createSubcatacoryService, 
    getSubcatacoryServiceById, 
    updataSubcatacoryServiceById,
    removeSubcatacoryServiceById
} 
= require('../services/subcatagoryServices')
const{getSubcatagoryValidator, createSubcatagoryValidator} = require('../utilis/validated/subCatagoryValidator')

const router  = express.Router();

router.route('/')
.get( getSubcatacoryServices)
.post(createSubcatagoryValidator, createSubcatacoryService)

router.route('/:id')
.get(getSubcatagoryValidator, getSubcatacoryServiceById)
.put(getSubcatagoryValidator, updataSubcatacoryServiceById)
.put(getSubcatagoryValidator, removeSubcatacoryServiceById)

module.exports = router;