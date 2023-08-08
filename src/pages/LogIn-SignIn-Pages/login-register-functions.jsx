export async function Login(data={}){
    try{
      const response = await fetch(
        "http://localhost:56935/api/loginregister/login",
        {method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      }).then(response => response.json());
      console.log(response);
        console.log("true");
  
        window.open("/mainpage");
      return response;
    }
    catch(exception){
      console.log(exception);
      return false;
    }
    
  }
  
export function convertData(username, password) {
    var obj = {
      "username": username,
      "password": password
    };
    return obj;
  }

export async function Register(data={}){
    const response = await fetch(
        "http://localhost:56935/api/loginregister",{
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), //post işlemine devam et
            
        }
    );
    
    if(response.status == 204){
        console.log("already exists");
        return true;
    }else{
        response => response.json()
        console.log(response);
        return false;
    }
    
    
}
