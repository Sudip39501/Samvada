const responce =(res,statusCode,message,data=null)=>{
    if(!res){
        console.log("res object is null");
        return;
    }
    const responseObject ={
        status: statusCode<400?"success":"error",
        message: message,
        data: data
    }

    res.status(statusCode).json(responseObject);
}

module.exports = responce;
