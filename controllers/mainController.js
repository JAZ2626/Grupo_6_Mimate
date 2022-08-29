const express = require('express');
const path = require('path');

const controller = {
    
main: (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
}

}

module.exports = controller;


