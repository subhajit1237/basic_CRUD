const App =require('../models/app.model')


class AppController {

    /**
      
     * @Mehod List 
     * @Descriptin To show list
     */
    async list(req, res) {
        try {
            let all_data = await App.find({isDeleted:false });
            console.log(all_data);
            
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
        console.log("here");
        
        let save_data =await App.create(req.body);
        console.log(save_data);
        
        if(save_data && save_data.id){
            console.log('Data save sucessfully');
            res.redirect('/');
        }else{
            console.log('someting worng');
            
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
//            if(delete_data){
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
        if(delete_data){
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
}


module.exports =new AppController();