export default function find(source, dest, i = 0){

    var findElement = dest[i];
    if (!source[findElement] && source[findElement] !== null) {return 'Not Found'}
    else if ((source[findElement] || source[findElement] === null)  && i == (dest.length - 1)) { return source[findElement];}
    else if (source[findElement] || source[findElement] === null) {
        i++;
        return find(source[findElement], dest, i);
    }

}