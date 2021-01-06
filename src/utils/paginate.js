import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){

    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
    .slice(startIndex) //slices the items array into partitions for the corresponding page
    .take(pageSize) //Takes the amount of items from that array
    .value(); //re-converts this chain back into an array and return it
    
    
    //_.slice(items, startIndex);
    //_.take()
}