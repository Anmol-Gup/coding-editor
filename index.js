var compile=document.querySelector('button');
var editor=document.querySelector('#editor');
var option=document.querySelector('select');
var message=document.querySelector('#message');
let response;

compile.addEventListener('click',function(){
  
  if(editor.value==="")
    alert('Enter Some Code!');
  else{
    var request=new XMLHttpRequest();
    request.open('POST',`https://codequotient.com/api/executeCode`);
    request.setRequestHeader('Content-Type',"application/JSON");
    
    /*request.addEventListener('load',function(){
      console.log(JSON.parse(request.responseText));
    })*/

    // sending data by coverting array to string
    request.send(JSON.stringify({code:editor.value,langId:option.value}));

    // load event
    request.addEventListener('load',function(){
    response=JSON.parse(request.responseText);  // coverting string to array

    // setting message as compiling on clicking compiler button
    message.innerHTML="Compiling...";
    
    var clear=setTimeout(function(){
        var data=new XMLHttpRequest();
        data.open('GET','https://codequotient.com/api/codeResult/'+response.codeId);
        data.send();

        data.addEventListener('load',function(){
          let arr=JSON.parse(data.responseText);
          let msg=JSON.parse(arr.data);
          
          if(arr.length===0)
          {
            alert('Some error occurred, not able to compile successfully!');
            clearTimeout(clear);    
          }
          else{
            if(msg.errors==='')
              message.innerHTML=msg.output;
            else
              message.innerHTML=msg.errors;
          }
          clearTimeout(clear);
        });
      },3000); 
    });
  }
});
