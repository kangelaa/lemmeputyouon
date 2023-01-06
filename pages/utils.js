//TODO: DELETE FIRST 2 FUNCTIONS FOR GAME UNUSED AND FROM EXPORT STATEMENT 
const getNumber = (curGuess) => {
    const i = curGuess + 1;
    var phrase = i.toString();
    switch (phrase) {
        case '1':
            phrase += 'st';
            break;
        case '2':
            phrase += 'nd';
            break;
        case '3':
            phrase += 'rd';
            break;
        default:
            phrase += 'th';
            break;
    }
    return phrase;
  }
  
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  }
  
  function turnIntoQuery(track,artist){
    let text = track + " artist:" + artist; //TODO: CHECK % conversion? also make sure track: should convert too in actual query chars
    for (let i=0; i<text.length; i++){
        text = setCharAt(text, i,transformSpecialChar(text[i]))
    }
    return text
  }
  
  function transformSpecialChar(char){
    switch(char){
        case ' ':
            return "%20";
            break;
        case '+':
            return "%2B";
            break;
        case '/':
            return "%2F";
            break;  
        case '\\':
            return "/";
            break;
        case '`':
            return "%60";
            break;
        case '@':
            return "%40";
            break;
        case '#':
            return "%23";
            break;
        case '$':
            return "%24";
            break;  
        case '^':
            return "%5E";
            break;
        case '&':
            return "%26";
            break;
        case '=':
            return "%3D";
            break;
        case ',':
            return "%2C";
            break;
        case ':':
            return "%3A";
            break;  
        case ';':
            return "%3B";
            break;
        case '{':
            return "%7B";
            break;
        case '}':
            return "%7D";
            break;
        case '|':
            return "%7C";
            break;
        default:
            return char;
    }
  }
  
  function setCharAt(str,index,chr){
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
  }
  
  function getNicheData(arr){
    // sort array by increasing popularity
    const sortedData = arr.sort((a,b) => a[4] - b[4])
  
     // delete zero popularity and duplicate items + invert popularity score  // TODO: CHECK ORDER OF THIS VERSUS COMBING THRU TOP X NUMBER?
     console.table(sortedData)
    if (sortedData.length !== 0 && sortedData[0] !== undefined){
        for (let i=0; i<sortedData.length-1; i++){
            if (sortedData[i][0] === sortedData[i+1][0] || sortedData[i][4] === 0){
                sortedData.splice(i,1)
                i--
                continue;
            }
            sortedData[i][4] = 100 - sortedData[i][4]
        }
        sortedData[sortedData.length-1][4] = 100 - sortedData[sortedData.length-1][4]
    }
  
    // assign ranks to top N and slice top N for display graphic
    let rank = 1;
    let nicheData = []
    const displayN = 5 // TODO: DECIDE THIS!
    if (arr.length >= displayN){ //remember ur checking the i+1 of array!
        nicheData = arr.slice(0,displayN);
        for (let i=0; i<displayN; i++){
            nicheData[i][6] = rank;
            if(i !== displayN-1 && arr[i][4] !== arr[i+1][4]){
                rank++;
            } 
        }
    } else {
        nicheData = arr;
        for (let i=0; i<arr.length; i++){
            nicheData[i][6] = rank;
            if(i !== arr.length-1 && arr[i][4] !== arr[i+1][4]){
                rank++;
            } 
        }
    }
    console.log(nicheData)
    return nicheData
    // NOTE: this function uses popularity ind = 4! assigns rank to ind = 6!
  }
  
  export {getNumber, getRandomInt, turnIntoQuery, transformSpecialChar, setCharAt, getNicheData};