document.getElementById('form').addEventListener("submit",checkForm);


function brackets(str)
{
    let chars = str.split(''),
        stack = [],
        open = ['{', '(', '['],
        close = ['}', ')', ']'],
        closeIndex, 
        openIndex;
    // console.log(str);
    // console.log(chars);
    // len = chars.length;
    // console.log(len);
    // цикл не работает с len, если поставить чисто, то всё работает нормально
    for (i in str)
    {
        // if(str[i] == '"')
        // {
        //     if(qmarks !== true)
        //     {
        //         qmarks = true;
        //         continue;
        //     }            
        //     if(qmarks == true){
        //         if(qmarksClose == false){
        //             qmarksClose = true;
        //         }
        //     }
        //     if(qmarks !== qmarksClose){
        //         return false;
        //     }
        // }
        
        openIndex = open.indexOf(str[i]);
        console.log(openIndex);
        console.log(str[i]);
        if(openIndex !== -1)
        {
            stack.push(openIndex);
            continue;
        }
        
        console.log(stack)
        closeIndex = close.indexOf(str[i]);
        if(closeIndex !== -1)
        {
            if(stack.pop() !== closeIndex)
            {
                return false;
            }

        }
        console.log(closeIndex);
        console.log(str[i]);
        // document.getElementById('result').innerHTML+=closeIndex;
        
    }
        
    if(stack.length !== 0)
    {
        return false;
    }
    return true;
}

isJSON = function(json) {

    is_json = true; //true at first

    //Try-catch and JSON.parse function is used here.

    try {
        object = JSON.parse(json);
        document.getElementById('result').innerHTML+="<p>JSON валиден</p>";
    } catch (error) {
        is_json = false;
        document.getElementById('result').innerHTML+="<p>Json не валиден</p>";
        console.log("might be a problem in key or value's data type");
        // document.getElementById('result').innerHTML+="<p>might be a problem in key or value's data type</p>";
    }

    if (is_json !== true) {
        countCharacter = function(string,character) {
            count = 0;
            for (var i = 0; i < string.length; i++) {
                if (string.charAt(i) == character) { //counting : or ,
                    count ++;
                }
            }
            return count;
        }
    
        json = json.trim(); // remove whitespace, start and end spaces
        bracks = brackets(json);
        console.log(bracks);
        if (bracks !== true) {
            console.log("Brackets {} are not balanced")
            document.getElementById('result').innerHTML+="<p>Скобки {}, [], () не сбалансированы</p>";
        } else if((countCharacter(json, '"')%2) !== 0){
            document.getElementById('result').innerHTML+="<p>Проблема в ключе или значении</p>";
        } else{
            json = json.substring(1, json.length-1); //remove first and last brackets
            json = json.split('{');
            for (var i = 0; i < json.length; i++) {
                
                pairs = json[i];
                
                if ( !(countCharacter(json,':')-1 == countCharacter(json, ',')) ){
                    console.log("comma or colon are not balanced");
                    document.getElementById('result').innerHTML+="<p>Запятая или двоеточие не сбалансированы</p>";
                }
            }
            
    
        } 
        // }else {
    
        //     json = json.substring(1, json.length-1); //remove first and last brackets
        //     json = json.split(',');
    
    
        //     for (var i = 0; i < json.length; i++) {
            
        //         pairs = json[i];
        //         if (pairs.indexOf(':') == -1) { //if colon not exist in b/w
        //             console.log("No colon b/w key and value");
        //             document.getElementById('result').innerHTML+="<p>No colon b/w key and value</p>";
        //         }
        //     }
        // }
    }
    // return is_json;
};

function checkForm(event)
{
    event.preventDefault();
    jsonfile=document.getElementById('form').json.value;
    console.log(jsonfile);
    if(jsonfile=="")
        document.getElementById('error').innerHTML="<p>Введите файл</p>";
    else
    {
        let valid = isJSON(jsonfile);
    }

}

