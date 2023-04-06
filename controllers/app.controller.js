const { sortBy } = require('underscore');
const App =require('../models/app.model');
const { user } = require('pg/lib/defaults');


class AppController {

    /**
      
     * @Mehod List 
     * @Descriptin To show list
     */
    async list(req, res) {
        try {
            let all_data = await App.find({isDeleted:false }).sort({ createdAt: -1 });
            // console.log(all_data);
            
            res.render('list', {
                title: "List",
                all_data
                
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * @Method create
     * @Description To show the add form
     */

    async create(req, res) {
        try {
            res.render('add', {
                title: "Add",
                success: req.flash('success'),
                error: req.flash('error')
                
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * @Method insert
     * @Description Insert data in db
     */
    async insert(req, res){
        try{

            console.log(req.body, 'req.body');
            console.log(req.file, 'req.file');

            // console.log('ehllo');
            let check_email = await App.find({email: req.body.email});
            console.log(check_email);
            if(!_.isEmpty(check_email)) {
                // console.log("Email already exists");
                req.flash('error','Email already exists!!!');
                res.redirect('/');
            } else {
                // console.log('hii');
                let check_contact = await App.find({contact: req.body.contact })
                // console.log(save_data);
                if(!_.isEmpty(check_contact)) {
                    // console.log("Contact already exists");
                    req.flash('error','Contact already exists!!!');
                    return res.redirect('/');
                } else {
                    req.body.image = req.file.filename;
                    let save_data =await App.create(req.body);
                    // let save_data = true;
                    console.log(save_data);
                    if(!_.isEmpty(save_data)){
                        // console.log('Data save sucessfully');
                        req.flash('success','Data saved successfully!!!');
                        return res.redirect('/');
                    }else{
                        // console.log('someting worng');
                        req.flash('error','Data save failed!!!');
                        return res.redirect('/');
                    }
                }
            }
        }catch(err){
            return err;
        }
    }
   
 
    /**
     * @Method Delete
     * @Description Delete data in db
     */
//    async hardDelete(req,res){
//        try{
//            let delete_data =await App.findByIdAndDelete(req.params.id)
//            if(!_.isEmpty(delete_data)){
//             console.log("Data is Deleted");
//             res.redirect('/')
            

//            }else{

//             console.log("data is not deleted");
//             res.redirect('/')
            

//            }
       
//    }catch(err){
//     throw err;

// }
//    }

   /**
     * @Method Delete
     * @Description Delete data in db
     */
   async softDelete(req,res){
        try{
            let delete_data =await App.findByIdAndUpdate(req.params.id, {isDeleted : true});
            if(!_.isEmpty(delete_data)){
            // console.log("Data is Deleted");
            req.flash('success','Data is Deleted!!!');
            return res.redirect('/')
            }else{
            // console.log("data is not deleted");
            req.flash('error','data is not deleted!!!');
            return res.redirect('/list')
            }
        
        }catch(err){
            throw err;
        }
    }
    /**
     * @Method edit
     * @Description To show the edit form
     */
    async edit(req, res) {
        try {
            let response = await App.findById(req.params.id);
            console.log(response);
            res.render('edit', {
                title: "Edit",
                response
            })
        } catch (err) {
            return err;
        }
    }

    /**
     * @Method update
     * @Description To show the updated form
     */
    async update(req, res) {
        try{
            let check_email = await App.find({ email: req.body.email, _id: { $ne: req.body.id } });
            if(!_.isEmpty(check_email)) {
                // console.log("Email already exists");
                req.flash('error','Email already exists!!!');
                return res.redirect('/');
            } else {
                let check_contact = await App.find({contact: req.body.contact, _id: { $ne: req.body.id } })
                // console.log(save_data);
                if(!_.isEmpty(check_contact)) {
                    // console.log("Contact already exists");
                    req.flash('error','Contact already exists!!!');
                    return res.redirect('/');
                } else {
                    let updated_obj = {
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact
                    }
                    if (!_.isEmpty(req.file)) {
                        req.body.image = req.file.filename;

                        fs.unlinkSync(`./public/uploads/${user_data.image}`);
                        update_obj.image = req.file.filename;

                    }
                    let updated_data =await App.findByIdAndUpdate(req.body.id, updated_obj);
                    console.log(updated_data);
                    if(_.isEmpty(updated_data) && updated_data.id){
                        // console.log('Data Update sucessfully');
                        req.flash('success','Data Update successfully!!!');
                        return res.redirect('/update');
                    }else{
                        // console.log('someting worng');
                        req.flash('error','something went wrong!!!')
                        return res.render('/');
                    }
                }
            }
        } catch (err) {
            return err;
        }
    }


    /**
     * @Method statusChange
     * @Description To change the status
     */
        async statusChange(req, res) {
            try {
                let user_data = await App.findById(req.params.id);
                console.log(user_data);
                let updated_status = user_data.status === 'Active' ? 'Inactive' : 'Active';    
                console.log(updated_status);
                let update_data = await App.findByIdAndUpdate(req.params.id, {status: updated_status})
                if(!_.isEmpty(user_data) && (update_data._id))
                    res.redirect('/');
            } catch (err) {
                return err;
            }
        }
    
}


module.exports =new AppController();