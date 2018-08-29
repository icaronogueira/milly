const Igreja = require('../models/igreja');
var async = require('asyncawait/async');
var await = require('asyncawait/await');


// Retorna todas as igrejas do banco
exports.getIgrejas = async ((req,res) => {
      const results = await (Igreja.find({}));
      return res.status(200).json({
            result: results
      });
});


// exports.search = async ((req,res) => {
//       const searchName = req.body.company;
//       const regex = new RegExp(searchName,'gi');
//       const company = await (Company.find({"companyName": regex}));
      
//       if (company.length > 0) {
//             return res.status(200).json({message: "Search Results", results: company});
//       } else {
//             return res.status(200).json({message: "Search Results", results: []});
//       }
// });



// exports.createCompany = async ((req, res) => {

//       if (req.body.name ==undefined || req.body.address==undefined || req.body.city==undefined ||
//             req.body.country==undefined || req.body.sector==undefined || req.body.website==undefined) {
//             return res.status(200).json({error: "You cannot create company with empty fields."});
//       }

//       if (req.body.name =='' || req.body.address=='' || req.body.city=='' ||
//             req.body.country=='' || req.body.sector=='' || req.body.website=='') {
//             return res.status(200).json({error: "You cannot create company with empty fields."});
//       }

//       if (!validUrl.isUri(req.body.website)) {
//             return res.status(200).json({error: "Website not valid."});
//       }



//       const newCompany        = new Company();
//       newCompany.companyName  = req.body.name;
//       newCompany.address      = req.body.address;
//       newCompany.city         = req.body.city;
//       newCompany.country      = req.body.country;
//       newCompany.sector       = req.body.sector;
//       newCompany.website      = req.body.website;
//       newCompany.admin        = req.body.userId;

//       const companyData = await (newCompany.save());

//       await (User.update({
//             '_id': req.body.userId
//       }, {
//             $push: {
//                   companies: {
//                         company: companyData._id
//                   }
//             }
//       }));

//       return res.status(200).json({message: 'Company created successfully'});
// });
