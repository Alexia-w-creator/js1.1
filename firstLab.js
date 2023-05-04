document.getElementById('form').addEventListener("submit",checkForm);


function brackets(str)
{
    let chars = str.split(''),
        stack = [],
        open = ['{', '(', '['],
        close = ['}', ')', ']'],
        closeIndex, 
        openIndex,
        countB = 0;
    for (i in str)
    {     
        openIndex = open.indexOf(str[i]);
        // console.log(openIndex);
        // consol e.log(str[i]);
        if(openIndex !== -1)
        {
            stack.push(openIndex);
            countB++;
            continue;
        }
        
        // console.log(stack)
        closeIndex = close.indexOf(str[i]);
        if(closeIndex !== -1)
        {
            if(stack.pop() !== closeIndex)
            {
                document.getElementById('result').innerHTML+=countB;
                document.getElementById('result').innerHTML+=" cкобки {}, [], () не сбалансированы";
        
                return false;
            }

        }
        // console.log(closeIndex);
        // console.log(str[i]);
        
    }
        
    if(stack.length !== 0)
    {
        document.getElementById('result').innerHTML+=countB;
        document.getElementById('result').innerHTML+="<p>cкобки {}, [], () не сбалансированы</p>";
        return false;
    }
    return true;
}

isJSON = function(json) {

    is_json = true;

    try {
        JSON.parse(json);
        document.getElementById('result').innerHTML+="<p>JSON валиден</p>";
    } catch (error) {
        is_json = false;
        document.getElementById('result').innerHTML+="<p>Json не валиден</p>";
    }

    if (is_json !== true) {
        countCharacter = function(string,character) {
            count = 0;
            for (var i = 0; i < string.length; i++) {
                if (string[i] == character) { //counting : or ,
                    count ++;
                }
            }
            return count;
        }
    
        json = json.trim(); // remove whitespace, start and end spaces
        bracks = brackets(json);
        if (bracks !== true) {
            // document.getElementById('result').innerHTML+="<p>Скобки {}, [], () не сбалансированы</p>";

        } else if((countCharacter(json, '"')%2) !== 0)
        {
            document.getElementById('result').innerHTML+="<p>Проблема в ключе или значении</p>";
        } else
        {
            jsonsub = json.substring(1, json.length-1); //remove first and last brackets
            jsoncol = jsonsub.split(',');
            
            col = true;
            for (var i = 0; i < jsoncol.length; i++) {
            
                pairs = jsoncol[i];
                if(pairs[0] !== '}'){
                    if (pairs.indexOf(':') == -1) { //if colon not exist in b/w
                        col = false;
                    }
                }
            }

            if(col !== true)
            {
                document.getElementById('result').innerHTML+="<p>Нет двоеточия между ключом и значением</p>";
            } else 
            {
                jsoncom = jsonsub.split('{');
                cmorcl = true;
                for (var i = 0; i < jsoncom.length; i++) {
                    
                    pairs = jsoncom[i];
                    
                    if ( !(countCharacter(pairs,':')-1 == countCharacter(pairs, ',')) ){
                        cmorcl = false;
                    }
                }
                
                if(cmorcl !== true){
                    document.getElementById('result').innerHTML+="<p>Запятая или двоеточие не сбалансированы</p>";
                }
            }
        } 
    }
};

function checkForm(event)
{
    event.preventDefault();
    jsonfile=document.getElementById('form').json.value;
    if(jsonfile=="")
        document.getElementById('error').innerHTML="<p>Введите файл</p>";
    else
    {
        document.getElementById('result').innerHTML="";
        let valid = isJSON(jsonfile);
    }

}

