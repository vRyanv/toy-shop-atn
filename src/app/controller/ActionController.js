const model = require('../model/Model')
const {unlink} = require('node:fs')

class ActionController{
   viewPro(req, res){
      let shopId = req.shopId
      const handleGetPro = async () => {
         const proList = await model.getPro(shopId)
         const cateList = await model.getCate()
         const supList = await model.getSup()
         res.render('dashboard.ejs', {target:'product', proList, cateList, supList})
      }
      handleGetPro()
   }

   findPro(req, res){
      let proName = req.params.name
      let shopId = req.shopId
      model.findPro(shopId, proName).then((result) => {
         if(result.length !== 0){
            res.send({status:200, product: result})
         } else {
            res.send({status:404, mess: 'Not found product'})
         }
      })
   }

   createPro(req, res){
         if(req.hasImage){
            let product = {
               name: req.body.proName,
               cateId: req.body.cateId,
               supId: req.body.supId,
               image: req.file.filename,
               price: req.body.price,
               quantity: req.body.quantity,
            }
            model.createPro(req.shopId, product).then((result) => {
               if(result.rowCount !== 0){
                  res.send({status:200, mess: 'add product success'})
               } else {
                  res.send({status:400, mess: 'add product fail'})
               }
            })
         } else {
            res.send({status:400, mess: 'add product fail'})
         }
   }

   deletePro(req, res){
      let proId = req.body.proId
      model.deletePro(proId).then((result) => {
         if(result.length !== 0){
            unlink('src/public/images/'+ result[0].pro_image, (err) => {
               res.send({status:200, mess: 'delete product success'})
            });
         } else {
            res.send({status:400, mess: 'delete product fail'})
         }
      })
   }

   viewCate(req, res){
      model.getCate().then((category) => {
         res.render('dashboard.ejs', {target:'category', cateList:category})
      })
   }

   createCate(req, res){
      let cateName = req.body.cateName
      model.createCate(cateName).then((result) => {
         if(result.rowCount !== 0){
            res.send({status:200, mess:'add category success'})
         } else {
            res.send({status:400, mess:'add category fail'})
         }
      })
   }

   viewSup(req, res){
      model.getSup().then((supplier) => {
         res.render('dashboard', {target:'supplier', supList:supplier})
      })
   }

   createSup(req, res){
      let supName = req.body.supName
      let address = req.body.address
      model.createSup(supName, address)
          .then((result) => {
             if(result.rowCount !== 0){
                res.send({status:200, mess:'add supplier success'})
             } else {
                res.send({status:400, mess:'add supplier fail'})
             }
          })
   }



}

module.exports = new ActionController