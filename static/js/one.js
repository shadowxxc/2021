
// window.res =[]
// for (let index = 0; index < data.entries.length; index++) {
//   const e = data.entries[index].response.content;
//   if (e.mimeType === 'application/json') {
//     let data = e.text
//     if (e.encoding === 'base64') {
//       data = Base64.decode(data);
//     }
//     res = [...res, ...JSON.parse(data)]
//   }
// }
// console.log(JSON.stringify(res));

// type: 1:递增， 2：递减
function sortByMoney(data, min, max, type) {
  let sortArr =[]
  for (let i = 0; i < data.length; i++) {
    let price = Number(data[i].money);
    data[i].money = price
    if (price >= min && price <= max) {
      sortArr.push(data[i])
    }
  }

  if (type === 1) {
    sortArr = sortArr.sort(function(a,b){
      return a.money - b.money;
    })  
  }else{
    sortArr = sortArr.sort(function(a,b){
      return b.money - a.money;
    })  
  }
  console.log(sortArr);
  return sortArr
}


function search(data, searchText) {
  let searchArr =[]
  for (let i = 0; i < data.length; i++) {
    let text = data[i].title + data[i].groupname;
    if (text.indexOf(searchText) > -1) {
      searchArr.push(data[i])
    }
  }

  console.log(searchArr);
  return searchArr
}