class Apifeatures{

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }

    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
   
        this.query=this.query.find({...keyword});
        //console.log(this);
        return this;
    }

    filter(){
        
        const queryCopy={...this.queryStr};
     
        const removeField =["keyword","page","limit"];
      
        removeField.forEach((key)=>delete queryCopy[key]);
      
        //filtering price and rating

        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
       this.query=this.query.find(JSON.parse(queryStr));
       //console.log(queryCopy);
       return this;
        
    }

    pagination(resultperpage){
        const currentpage=Number(this.queryStr.page)||1;
        console.log(currentpage);

        const skip=resultperpage*(currentpage-1);
        this.query=this.query.limit(resultperpage).skip(skip);
        return this;


    }
}
module.exports=Apifeatures;