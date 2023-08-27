const jwt = require('jsonwebtoken');

const prcessToken =  (req,res,next)=>{

    console.log("here");

    const token = req.cookies.token;
    if(token){
       try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.teacherId = decoded.id;
        res.locals.isAuthenticated = true;
       }
       catch(error){
        console.log(error);
        if (error instanceof jwt.TokenExpiredError) {
            console.log('Token has expired. Automatically logging out...');
            // Clear the token cookie and render the unauthorized error page
            res.clearCookie('token');
            return res.status(401).render('error-unauthorized');
          } 
       }
    }
    next();
}

module.exports = prcessToken;
