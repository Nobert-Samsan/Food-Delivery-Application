import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) =>{

    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authurised Login Again"})

    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})      
    }
}

export default authMiddleware;



/* What is Middleware?
Middleware in Express.js is a function that processes HTTP requests before they reach the final route handler or response.
 Middleware functions can perform a variety of tasks, such as:

Modifying Request or Response Objects: Adding properties or methods.
Performing Operations: Like logging, authentication, or data validation.
Ending the Request-Response Cycle: By sending a response directly.
Middleware functions are executed in the order they are added to the Express app using app.use()

express.json() is a built-in middleware function in Express.js that parses incoming requests with JSON payloads

Purpose:

When you send a POST request with a JSON payload, the data is usually in a format like {"key": "value"}. 
Express needs to convert this JSON string into a JavaScript object so that you can work with it easily in your route handlers.




1. Request Processing Flow
When a client sends a request to an Express server, the request goes through a sequence of steps before a response is generated. Here’s a simplified flow:

Request Received:

The server receives an HTTP request from a client.
Middleware Processing:

The request passes through a series of middleware functions defined using app.use(). Middleware functions are used to perform various tasks such as logging, authentication, and data parsing.
Routing:

After passing through the middleware, the request reaches the routing phase, where it is matched to a specific route handler based on the request URL and HTTP method.
Final Route Handler:

The final route handler is the function that handles the request for a specific route. It processes the request, performs any necessary actions, and sends a response back to the client.
Response Sent:

The route handler sends the response to the client, completing the request-response cycle.
*/