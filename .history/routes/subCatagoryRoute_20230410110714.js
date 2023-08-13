const express = require('express');
const{getSubcatacoryServices, 
    createSubcatacoryService, 
    getSubcatacoryServiceById, 
    updataSubcatacoryServiceById,
    removeSubcatacoryServiceById,
    setCatagoryIdToBody,
    filterObj
} 
= require('../services/subcatagoryServices');
const{
     getSubcatagoryValidator,
     createSubcatagoryValidator} = require('../utilis/validated/subCatagoryValidator')
     const authService = require('../services/authService')

     authService.protect,
         authService.allowTo('mange', 'admin'),
const router  = express.Router({mergeParams: true});

router.route('/')
.get(filterObj, getSubcatacoryServices)
.post(setCatagoryIdToBody, createSubcatagoryValidator, createSubcatacoryService)

router.route('/:id')
.get(getSubcatagoryValidator, getSubcatacoryServiceById)
.put(getSubcatagoryValidator, updataSubcatacoryServiceById)
.delete(getSubcatagoryValidator, removeSubcatacoryServiceById)

module.exports = router;