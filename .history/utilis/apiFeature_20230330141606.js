/* eslint-disable no-plusplus */

class ApiFeature{

   constructor( mongooseQuery, queryString) {

       this.mongooseQuery = mongooseQuery;
       this.queryString = queryString;
   } 

   filter() {

    let queryObject = {...this.queryString};

    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(item => delete queryObject[item]);

    let queryStr  = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    queryObject = JSON.parse(queryStr);
    console.log(queryObject, queryStr);
   
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr)); 

    return this

   }

   paginate() {
    const page = this.queryString.page * 1||1; 
    const limit = this.queryString.limit * 1|| 50;
    const skip = (page-1) * limit;

    const paginattion = {};
    paginattion.currentPage = page;
    paginattion.limit = limit;
    paginattion.totalPage =Math.round((this.mongooseQuery.countDocuments)/(limit));
    
    paginattion.prePage = page>1? --page: 1;
    paginattion.nextPage =page<=totalPage? ++page: totalPage;;
    this.mongooseQuery = this.mongooseQuery.find()
    .skip(skip)
    .limit(limit)
    .populate('catagory');

    return this;
   }

   sort() {
    if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.sort(sortBy); 
    } else 
       this.mongooseQuery = this.mongooseQuery.sort({ createdAt: - 1 });  
    
    return this;
   }

   search() {
    if(this.queryString.title || this.queryString.description ) {

        this.queryString.title = new RegExp(this.queryString.title, 'i');
        this.queryString.description = new RegExp(this.queryString.description, 'i');

        this.mongooseQuery= this.mongooseQuery.find({...this.queryString})

    }
     return this;
   }

   fileds() {
    if(this.queryString.fields) 
    {
        const fileds =this.queryString.fields.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.select(fileds); 
       }
   return this
   }
}

module.exports = ApiFeature;