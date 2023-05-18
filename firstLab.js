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
        if(openIndex !== -1)
        {
            stack.push(openIndex);
            countB++;
            continue;
        }

        
        // console.log(stack)
        closeIndex = close.indexOf(str[i]);
        // console.log(closeIndex);
        if(closeIndex !== -1)
        {
            if(stack.pop() !== closeIndex)
            {

                document.getElementById('result').innerHTML+="<p>Cкобки {}, [], () не сбалансированы";
        
                return false;
            }
        }
        
    }
 
    if(stack.length !== 0)
    {
        document.getElementById('result').innerHTML+="<p>Скобки {}, [], () не сбалансированы";
        return false;
    }
    return true;
}

function err(error, json){
    error_ = String(error).split(' ');
        typeError = error_[0];
        pos = Number(error_[error_.length-1]);
        console.log(pos);
        let p= 0;
        
        let stroka = 0;
        while(p < pos){
        
            if(json[p] == '\n'){
                stroka++;
            }
            p++;
        }
        if(typeError == 'SyntaxError:')
        {
            document.getElementById('result').innerHTML+="Синтаксическая ошибка в строке ";
            document.getElementById('result').innerHTML+=stroka;
            // document.getElementById('result').innerHTML+="</p>";
        }else
        {
            document.getElementById('result').innerHTML+="Ошибка в строке";
            document.getElementById('result').innerHTML+=stroka;
            // document.getElementById('result').innerHTML+="</p>";
        }
}

isJSON = function(json) {



    is_json = true;
    let SyntaxError = 0;
     

    try {
        JSON.parse(json);
        document.getElementById('result').innerHTML+="<p>JSON валиден</p>";
    } catch (error) {
        is_json = false;
        error_= error;
        console.log(error);
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
            err(error_, json);

        } else if((countCharacter(json, '"')%2) !== 0)
        {
            err(error_, json);
            document.getElementById('result').innerHTML+="<p>Проблема в ключе или значении</p>";
        } else
        {
            jsonsub = json.substring(1, json.length-1); //remove first and last brackets
            jsoncol = jsonsub.split(',');
            
            col = true;
            for (var i = 0; i < jsoncol.length; i++) {
                some = jsoncol[i].split(':');
                key = some[0];
                pairs = jsoncol[i];
                if(pairs[0] !== '}'){
                    if (pairs.indexOf(':') == -1 && pairs.indexOf('"') !== -1) { //if colon not exist in b/w
                        col = false;
                        // key_ = key;
                        break;
                    }
                }
            }

            if(col !== true)
            {
                document.getElementById('result').innerHTML+="<p>Нет двоеточия между";
                document.getElementById('result').innerHTML+=key;
                document.getElementById('result').innerHTML+="</p>";
                

            } else 
            {
                jsoncom = jsonsub.split('{');
                cmorcl = true;
                for (var i = 0; i < jsoncom.length; i++) {
                    some = jsoncom[i].split(',');
                    key = some[0];
                    pairs = jsoncom[i];
                    
                    if ( !(countCharacter(pairs,':')-1 == countCharacter(pairs, ',')) ){
                        cmorcl = false;
                    }
                }
                
                if(cmorcl !== true){
                    document.getElementById('result').innerHTML+="<p>Запятая или двоеточие не сбалансированы в";
                    document.getElementById('result').innerHTML+=key;
                    document.getElementById('result').innerHTML+="</p>";
    
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
