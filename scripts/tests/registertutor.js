/*
Test cases:
Success
User is already a tutor
User does not exist

Also tests changeDescription
*/

var deepstream = require("deepstream.io-client-js");

var client = deepstream("localhost:6020").on("error", (error) =>
{
  console.log(error);
});

client.login({username: "server", password: "sp"}, (success, data) =>
{
  if(!success) {return;}

  console.log("clientData:\n" + data);

  //Success
  client.rpc.make("registerTutor", {username: "test", categories: ["French", "Japanese", "French", "Latin", "Calculus"]}, (error, result) =>
  {
    if(error)
    {
      console.log(error)
      return;
    }

    console.log(result);

    //User is already a tutor
    client.rpc.make("registerTutor", {username: "test"}, (error, result) =>
    {
      if(error)
      {
        console.log(error)
        return;
      }

      console.log(result);

      //User does not exist
      client.rpc.make("registerTutor", {username: "test2"}, (error, result) =>
      {
        if(error)
        {
          console.log(error)
          return;
        }

        console.log(result);

        //Test changeDescription
        client.rpc.make("changeDescription", {username: "test", description: "Hello, I am a BigBlueTutor user."}, (error, result) =>
        {
          if(error)
          {
            console.log(error)
            return;
          }

          console.log(result);
        });
      });
    });
  });
});
