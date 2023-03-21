const App =require('../models/app.model')


class AppController {

    /**
      
     * @Mehod List 
     * @Descriptin To show list
     */
    async list(req, res) {
        try {
            let all_data = await App.find({isDeleted:false });
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
                title: "Add"
                
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
            let check_email = await App.find({email: req.body.email});
            if(!_isEmpty(check_email)) {
                console.log("Email already exists");
                res.redirect('/');
            } else {
                let check_contact = await App.find({contact: req.body.contact })
                // console.log(save_data);
                if(!_isEmpty(check_contact)) {
                    console.log("Contact already exists");
                    res.redirect('/');
                } else {
                    let save_data =await App.create(req.body);
                    if(!_.isEmpty(save_data) && save_data.id){
                        console.log('Data save sucessfully');
                        res.redirect('/');
                    }else{
                        console.log('someting worng');
                        
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
            console.log("Data is Deleted");
            res.redirect('/')
            }else{
            console.log("data is not deleted");
            res.redirect('/')
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
            if(!_isEmpty(check_email)) {
                console.log("Email already exists");
                res.redirect('/');
            } else {
                let check_contact = await App.find({contact: req.body.contact, _id: { $ne: req.body.id } })
                // console.log(save_data);
                if(!_isEmpty(check_contact)) {
                    console.log("Contact already exists");
                    res.redirect('/');
                } else {
                    let updated_obj = {
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact
                    }
                    let updated_data =await App.findByIdAndUpdate(req.body.id, updated_obj);
                    console.log(updated_data);
                    if(_.isEmpty(updated_data) && updated_data.id){
                        console.log('Data Update sucessfully');
                        res.redirect('/');
                    }else{
                        console.log('someting worng');
                        res.render('/');
                    }
                }
            }
        } catch (err) {
            return err;
        }
    }
}


module.exports =new AppController();